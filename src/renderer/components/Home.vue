<template>
  <div>
    <button @click="readFile(file.path)">
      READ FILE
    </button>
    <label class="file-select">
      <div class="select-button">
        <span v-if="file">Selected File: {{ file.name }}</span>
        <span v-else>Select File</span>
      </div>
      <input type="file" ref="file" @change="handleFileUpload()"/>
    </label>
    <h1>Home page</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      file: Object
    }
  },
  created() {
    window.ipc.on('READ_FILE', (payload) => {
      console.log(payload.content);
    });
  },
  methods: {
    readFile(path) {
      const payload = {path};
      window.ipc.send('READ_FILE', payload);
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
}
</script>