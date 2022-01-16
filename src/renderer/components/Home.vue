<template>
    <div class="container home">
      <h3 class="script__title">
        Scripts
      </h3>
      <div class="script-container mb-3" v-for="script in scripts" v-bind:key="script.id">
        <div class="script__name">
          <p class="script__name-text">
            {{ script.scriptName }}
          </p>
        </div>
        <div class="script__actions">
          <div class="script__status-container">
            <div>
              <p class="script__status-badge">
                <i class="fas fa-check-circle script__status-badge-icon"></i>
                {{ script.getStatusByName() }}
              </p>
            </div>
          </div>
          <div class="script__actions-container">
            <a href="#" class="script__actions-icon-pen">
              <router-link :to="{ name: 'AddEditShellScript', params: {scriptId: script.id}}">
                <i class="fas fa-pen"></i>
              </router-link>
            </a>
            <a href="#" class="script__actions-icon" data-bs-toggle="modal" data-bs-target="#scriptOutput">
              <i class="fas fa-table"></i>
            </a>
            <a href="#" class="script__actions-icon">
              <i class="fas fa-play"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  <router-link to="/add-edit-shell-script">
    <a href="#" class="btn-circle"></a>
  </router-link>
  <div>
    <Output/>
  </div>
</template>

<!--<template>-->
<!--  <div id="content" style="background: #F9F9FC">-->
<!--    <div class="container">-->
<!--      <div class="row">-->
<!--        <div class="col-4">-->
<!--          <div>-->
<!--            <div v-for="script in scripts" v-bind:key="script.id">-->
<!--              <div>-->
<!--                <p>-->
<!--                  {{ script.scriptName }}-->
<!--                </p>-->
<!--                <p v-if="script.output">-->
<!--                  {{ script.output }}-->
<!--                </p>-->
<!--              </div>-->
<!--              <div>-->
<!--                <button type="button" class="btn btn-primary" @click="executeScript(script)">-->
<!--                  Run-->
<!--                </button>-->
<!--                <button type="button" :class="['btn btn-danger', {'disabled' : script.isStopping()}]"-->
<!--                        @click="stopScript(script)">-->
<!--                  Stop-->
<!--                </button>-->
<!--                <button class="btn btn-info" @click="editScript(script)">-->
<!--                  Edit-->
<!--                </button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="col-6">-->
<!--          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addShellScriptModal">-->
<!--            Add Script-->
<!--          </button>-->
<!--        </div>-->
<!--        <p v-if="this.error">-->
<!--          {{ this.error }}-->
<!--        </p>-->
<!--      </div>-->
<!--    </div>-->
<!--    <div>-->
<!--      <AddShellScript @script-saved="saveScript"/>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<script>
import * as shellScriptRepository from "@/repositories/repository.shell-scripts";
import * as shellScriptArgumentRepository from "@/repositories/repository.script-arguments";
import * as shellScriptEventHandler from "@/eventHandlers/event-handler.shell-script";
import Output from "@/components/shell-scripts/Output";
import {STATUS} from "@/models/models.shell-script";

export default {
  name: "Home",
  components: {
    Output
  },
  data() {
    return {
      scripts: [],
      error: ""
    }
  },
  mounted() {
    shellScriptEventHandler.onExecuteShellScript(this.executeShellScriptCallback())
    shellScriptEventHandler.onKillShellScript(this.killShellScriptCallback());
    this.getScripts();
  },
  methods: {
    async saveScript(script, argumentArray) {
      await shellScriptRepository.createRecord(script);
      const scriptId = await shellScriptRepository.getLastRowId();

      argumentArray.forEach((argument) => {
        shellScriptArgumentRepository.createRecord(scriptId, argument)
      })

      await this.getScripts();
    },
    async getScripts() {
      this.scripts = await shellScriptRepository.getScripts();
    },
    executeScript(script) {
      if (script.canBeExecuted()) {
        shellScriptEventHandler.sendExecuteShellScript({
          "scriptId": script.id,
          "path": script.filePath,
        })
      }
    },
    stopScript(script) {
      if (script.canBeStopped()) {
        shellScriptEventHandler.sendKillShellScript({
          "scriptId": script.id,
        });
      }
    },
    getScript(id) {
      let script = this.scripts.find(script => script.id === id);

      if (!script) {
        this.showError("Script not found!")

        return;
      }

      return script;
    },
    executeShellScriptCallback() {
      return payload => {
        let script = this.getScript(payload.scriptId);

        if (payload.error) {
          this.showError(payload.error);

          return;
        }

        script.status = STATUS.EXECUTING;

        if (payload.output) {
          script.output += payload.output;
        }

        if (payload.hasExecuted) {
          script.output = "Executed";
          script.status = STATUS.EXECUTED;
        }

        if (payload.isKilled) {
          script.output = "Stopped";
          script.status = STATUS.STOPPED;
        }
      }
    },
    killShellScriptCallback() {
      return payload => {
        let script = this.getScript(payload.scriptId);

        if (payload.error) {
          this.showError(payload.error);

          return;
        }

        script.status = STATUS.STOPPING;
      }
    },
    showError(error) {
      this.error = error;
    }
  }
}
</script>

<style lang="scss">
.home {
  padding-left: 40px !important;
}

p {
  margin-bottom: 0 !important;
}

.btn-circle {
  bottom: 40px;
  right: 40px;
  position: absolute;
  z-index: 2;
  display: block;
  width: 60px;
  height: 60px;
  background: #303030;
  border-radius: 50%;
}

.btn-circle:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 40px;
  height: 4px;
  background: #fff;
  transform: translate(-50%, -50%);
}

.btn-circle:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  display: block;
  width: 4px;
  height: 40px;
  background: #fff;
  transform: translate(-50%, -50%);
}

.script {
  &__title {
    margin-top: 40px;
    margin-bottom: 20px !important;
  }

  &-container {
    width: 500px;
    height: 80px;
    background: white;
    border: solid rgba(0, 0, 0, 0.1) 1px;
    display: flex;
  }

  &__name {
    width: 360px;
    padding-left: 18px;
    display: flex;
    align-items: center;
    overflow: hidden;

    &-text {
      margin: 0;
    }
  }

  &__actions {
    &-container {
      width: 140px;
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
      align-items: center;
      height: 45px;
      font-size: 20px;
    }

    &-icon {
      color: #303030;
      margin-right: 12px;

      &-pen {
        margin-right: 8px;
        color: #303030;
      }

      &:first-child {
        margin-right: 18px;
      }
    }
  }

  &__status {
    &-container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 10px;
      height: 35px;
    }

    &-badge {
      background: #EDEDED;
      color: #303030;
      border-radius: 10px;
      padding: 2px 10px;
      display: flex;
      align-items: center;
      font-size: 12px;

      &-icon {
        margin-right: 6px;
        color: green;
      }
    }
  }
}
</style>