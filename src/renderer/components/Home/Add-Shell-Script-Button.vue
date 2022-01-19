<template>
  <div>
    <a href="#" class="btn-circle" @click="this.$emit('clicked')"></a>
  </div>
</template>

<script>
export default {
  name: "AddShellScriptButton"
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global";

.btn-circle {
  bottom: 40px;
  right: 40px;
  position: absolute;
  z-index: 2;
  display: block;
  width: 60px;
  height: 60px;
  background: #2196F3;
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
</style>