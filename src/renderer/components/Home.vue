<template>
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
              <button type="button" :class="['btn btn-danger', {'disabled' : isStopping(script.status)}]" @click="stopScript(script)">
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
    }
  },
  mounted() {
    shellScriptEventHandler.handleExecuteShellScriptResponse(function (payload) {
      let index = this.scripts.findIndex(script => script.id === payload.scriptId);

      if (payload.error) {
        console.log(payload.error);
        return;
      }

      if (!this.scripts[index]) {
        console.log("Script not found!");
        return;
      }

      this.scripts[index].status = ShellScript.STATUS_EXECUTING;

      if (payload.output) {
        this.scripts[index].output += payload.output;
      }

      if (payload.hasExecuted) {
        this.scripts[index].output = "Executed";
        this.scripts[index].status = ShellScript.STATUS_EXECUTED;
      }

      if (payload.isKilled) {
        this.scripts[index].output = "Stopped";
        this.scripts[index].status = ShellScript.STATUS_STOPPED;
      }
    }.bind(this));

    shellScriptEventHandler.handleKillShellScriptResponse(function (payload) {
      let index = this.scripts.findIndex(script => script.id === payload.scriptId);

      if (!this.scripts[index]) {
        console.log("Script not found!");
        return;
      }

      if (payload.error) {
        console.log(payload.error);
        return;
      }

      this.scripts[index].status = ShellScript.STATUS_STOPPING;
    }.bind(this));

    this.getScripts();
  },
  methods: {
    saveScript(data) {
      shellScriptRepository.createRecord(data.filePath, data.scriptName);
      this.getScripts();
    },
    getScripts() {
      shellScriptRepository.getScripts().then(res => this.scripts = res);
    },
    executeScript(script) {
      shellScriptEventHandler.sendExecuteShellScriptEvent({
        "scriptId": script.id,
        "path": script.filePath,
      })
    },
    stopScript(script) {
      shellScriptEventHandler.sendKillShellScriptEvent({
        "scriptId": script.id,
      });

      let index = this.scripts.findIndex(dataScript => dataScript.id === script.id);
      if (!this.scripts[index]) {
        console.log("Script not found!");
        return;
      }

      this.scripts[index].isStopping = true;
    },
    isStopping(status) {
      return status === ShellScript.STATUS_STOPPING;
    }
  }
}
</script>