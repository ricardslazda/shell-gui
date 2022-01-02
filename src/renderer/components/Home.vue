<template>
  <div>
    <button @click="readFile('./input.txt')">
      READ FILE
    </button>
    <h1>Home page</h1>
  </div>
</template>

<script>
export default {
  name: 'Home',
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
  }
}
</script>