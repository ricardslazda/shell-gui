<template>
  <div>
    <div v-if="this.activeView === this.constants.VIEWS.ADD">
      <AddEditShellScript
          @back="this.activeView = this.constants.VIEWS.HOME"
          @script-saved="onScriptSaved()"
      />
    </div>
    <div v-if="this.activeView === this.constants.VIEWS.EDIT">
      <AddEditShellScript
          :script-id="activeScript.id"
          @back="this.activeView = this.constants.VIEWS.HOME"
          @script-saved="onScriptSaved()"
      />
    </div>
    <div v-if="this.activeView === this.constants.VIEWS.HOME">
      <ShellScripts
          :shell-script-array="this.scripts"
          @edit-clicked="editScript"
          @run-clicked="runScript"
          @delete-clicked="deleteScript"
      />
      <div>
        <ShellScriptOutputModal/>
      </div>
      <div>
        <AddShellScriptButton @clicked="addScript"/>
      </div>
    </div>
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
import {STATUS} from "@/models/models.shell-script";
import * as shellScriptRepository from "@/repositories/repository.shell-scripts";
import * as shellScriptEventHandler from "@/eventHandlers/event-handler.shell-script";
import AddEditShellScript from "@/components/Home/Add-Edit-Shell-Script";
import ShellScriptOutputModal from "@/components/Home/Shell-Script-Output";
import ShellScripts from "@/components/Home/Shell-Scripts";
import AddShellScriptButton from "@/components/Home/Add-Shell-Script-Button";

const VIEWS = Object.freeze({
  HOME: 0,
  ADD: 1,
  EDIT: 2,
});

export default {
  name: "Home",
  components: {
    ShellScriptOutputModal,
    AddEditShellScript,
    ShellScripts,
    AddShellScriptButton
  },
  data() {
    return {
      scripts: [],
      error: "",
      activeView: VIEWS.HOME,
      constants: {},
      activeScript: null,
    }
  },
  async created() {
    this.constants.VIEWS = VIEWS;
    shellScriptEventHandler.onExecuteShellScript(this.executeShellScriptCallback())
    shellScriptEventHandler.onKillShellScript(this.killShellScriptCallback());
    await this.loadScripts();
  },
  methods: {
    async loadScripts() {
      this.scripts = await shellScriptRepository.getScripts();
    },
    async getScripts() {
      return shellScriptRepository.getScripts();
    },
    runScript(script) {
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
        console.log("callback");
        console.log(payload);
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
    },
    async onScriptSaved() {
      await this.loadScripts();
      this.activeView = this.constants.VIEWS.HOME;
    },
    editScript(script) {
      this.activeScript = script;
      this.activeView = this.constants.VIEWS.EDIT;
    },
    addScript() {
      this.activeScript = null;
      this.activeView = this.constants.VIEWS.ADD;
    }
  }
}
</script>

<style lang="scss">
.home {
  padding-left: 40px !important;
}

p, li {
  margin: 0 !important;
}
</style>