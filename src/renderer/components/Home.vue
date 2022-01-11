<template ref="homeRef">
  <div class="container">
    <div class="row">
      <div class="col-4">
        <div>
          <div v-for="script in scripts" v-bind:key="script.id">
            <div>
              <p>
                {{ script.scriptName }}
              </p>
              <p v-if="script.output">
                {{ script.output }}
              </p>
            </div>
            <div>
              <button type="button" class="btn btn-primary" @click="executeScript(script)">
                Run
              </button>
              <button type="button" :class="['btn btn-danger', {'disabled' : script.isStopping()}]"
                      @click="stopScript(script)">
                Stop
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addShellScriptModal">
          Add Script
        </button>
      </div>
      <p v-if="this.error">
        {{ this.error }}
      </p>
    </div>
  </div>
  <div>
    <AddShellScript @script-saved="saveScript"/>
  </div>
</template>

<script>
import * as shellScriptRepository from "@/repositories/repository.shell-scripts";
import * as shellScriptEventHandler from "@/eventHandlers/event-handler.shell-script";
import AddShellScript from "@/components/shell-scripts/Add-Shell-Script";
import {ShellScript} from "@/models/models.shell-script";

export default {
  name: "Home",
  components: {
    AddShellScript
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
    saveScript(data) {
      shellScriptRepository.createRecord(data.filePath, data.scriptName);
      this.getScripts();
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

        script.status = ShellScript.STATUS_EXECUTING;

        if (payload.output) {
          script.output += payload.output;
        }

        if (payload.hasExecuted) {
          script.output = "Executed";
          script.status = ShellScript.STATUS_EXECUTED;
        }

        if (payload.isKilled) {
          script.output = "Stopped";
          script.status = ShellScript.STATUS_STOPPED;
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

        script.status = ShellScript.STATUS_STOPPING;
      }
    },
    showError(error) {
      this.error = error;
    }
  }
}
</script>