<template>
  <div>
    <button @click="sendReadFileEvent(file.path)">
      READ FILE
    </button>
    <button @click="sendExecuteShellScriptEvent(file.path)">
      EXECUTE SHELL SCRIPT
    </button>
    <button @click="sendKillShellScriptEvent()">
      KILL SHELL SCRIPT
    </button>
    <label class="file-select">
      <div class="select-button">
        <span v-if="file">Selected File: {{ file.name }}</span>
        <span v-else>Select File</span>
      </div>
      <input type="file" ref="file" @change="handleFileUpload()"/>
    </label>
    <h1>Home page</h1>
    <div>
      shell output
      <p>
        {{this.shellScriptOutput}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      file: Object,
      shellScriptOutput: String,
    }
  },
  created() {
    this.setReadFileEventHandler();
    this.setExecuteShellScriptHandler();
  },
  methods: {
    setReadFileEventHandler() {
      window.ipc.on('READ_FILE', (payload) => {
        if (payload.error) {
          alert(payload.error);
          return;
        }

        console.log(payload.content);
      });
    },
    sendReadFileEvent(path) {
      const payload = {path};
      window.ipc.send('READ_FILE', payload);
    },
    setExecuteShellScriptHandler() {
      window.ipc.on('EXECUTE_SHELL_SCRIPT', (payload) => {
        this.shellScriptOutput += payload.output;
      });
    },
    sendExecuteShellScriptEvent(path) {
      const payload = {path};
      window.ipc.send('EXECUTE_SHELL_SCRIPT', payload);
    },
    sendKillShellScriptEvent() {
      window.ipc.send('KILL_SHELL_SCRIPT');
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
}
</script>