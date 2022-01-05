<template>
  <h1>About Page</h1>
  <div>
    Path
    <input type="text" v-model="filepath">
    Path
    <input type="text" v-model="name">
    <button @click="addScript">Add script</button>
    <button @click="getScripts">Get script</button>
  </div>
  <div>
    <p v-for="script in scripts" v-bind:key="script.id">
      {{ script.id }}
      {{ script.path }}
    </p>
  </div>
</template>

<script>
import {ShellScriptRepository} from "../repositories/repository.shell-scripts";
export default {
  name: 'About',
  data() {
    return {
      filepath: String,
      name: String,
      scripts: Array
    }
  },
  methods: {
    addScript() {
      const ssp = new ShellScriptRepository();
      ssp.createTable().then(() => ssp.createRecord("test"));
      this.getScripts();
    },
    getScripts() {
      const ssp = new ShellScriptRepository();
      ssp.getScripts().then((result) => {
        this.scripts = result;
      });
    }
  }
}
</script>