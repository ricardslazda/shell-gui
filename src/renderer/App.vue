<template>
  <div id="content">
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
body {
  font-family: "Lato", sans-serif !important;
  color: #303030;
}

#content {
  width: 100%;
  min-height: calc(100vh - 30px);
  background: #F9F9FC;
}

.app-wrapper {
  min-height: calc(100vh - 30px);
}
</style>