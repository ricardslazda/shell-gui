<template>
  <div>
    <menubar/>
    <div class="app-wrapper d-flex flex-row">
      <sidebar/>
      <router-view/>
    </div>
  </div>
</template>
<script>
import Menubar from "@/components/Menubar";
import Sidebar from "@/components/Sidebar.vue"

export default {
  components: {Sidebar, Menubar}
}
</script>

<style lang="scss">
.app-wrapper {
  height: 100%;
}
</style>