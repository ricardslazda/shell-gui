<template>
  <div class="app-wrapper d-flex flex-row">
    <sidebar/>
    <router-view />
  </div>
</template>
<script>
import Sidebar from "@/components/Sidebar.vue"

export default {
  components: {Sidebar}
}
</script>

<style lang="scss">
  .app-wrapper {
    height: 100%;
  }
</style>