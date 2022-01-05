<template>
  <div class="modal fade" id="addShellScriptModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Add a Shell Script</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label class="form-label">File path</label>
              <input class="form-control" type="file" ref="file" @change="handleFileUpload()">
            </div>
            <div class="mb-3">
              <label class="form-label">Script Name</label>
              <input type="text" class="form-control" v-model="name">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="saveOrUpdateShellScript">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddShellScript",
  data() {
    return {
      file: Object,
      name: String,
    }
  },
  props: {
    existingFilePath: String,
    existingName: String,
  },
  mounted() {
    this.filePath = this.existingFilePath;
    this.name = this.existingName;
  },
  methods: {
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    saveOrUpdateShellScript() {
      this.$emit("script-saved", {
        filePath: this.file.path,
        scriptName: this.name,
      })
    }
  }
}
</script>