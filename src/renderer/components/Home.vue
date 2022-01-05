<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addShellScriptModal">Add Script</button>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-4">
      <div>
        <div v-for="script in scripts" v-bind:key="script.id">
          <p>
            {{ script.filePath }}
          </p>
          <p>
            {{ script.scriptName }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div>
    <AddShellScript @script-saved="handleScriptSaved"/>
  </div>
</template>

<script>
import * as shellScriptRepository from "../repositories/repository.shell-scripts";
import AddShellScript from "./shell-scripts/Add-Shell-Script";

export default {
  name: "Home",
  components: {
    AddShellScript
  },
  data() {
    return {
      scripts: Array
    }
  },
  mounted() {
    this.getScripts();
  },
  methods: {
    handleScriptSaved(data) {
      console.log(data)
      shellScriptRepository.createRecord(data.filePath, data.scriptName);
      this.getScripts();
    },
    getScripts() {
      shellScriptRepository.getScripts().then((res) => this.scripts = res);
    }
  }
}
</script>