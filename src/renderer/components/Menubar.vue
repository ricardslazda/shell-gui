<template>
  <div class="menubar"></div>
</template>

<script>
export default {
  name: "Menubar"
}
</script>

<style lang="scss">
.menubar {
  height: 30px;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  border-bottom: solid rgba(0, 0, 0, 0.1) 1px;
}
</style>