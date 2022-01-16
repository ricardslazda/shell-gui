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
p,a,h1,h2,h3,body {
  font-family: "Lato", sans-serif;
}
#content {
  width: 100%;
  padding: 0;
  min-height: calc(100vh - 30px);
  transition: all 0.3s;
  background: #F9F9FC;
}

.app-wrapper {
  min-height: calc(100vh - 30px);
}
</style>