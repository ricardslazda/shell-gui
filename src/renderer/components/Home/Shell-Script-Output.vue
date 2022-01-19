<template>
  <div class="modal fade" id="scriptOutput" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Output</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="termynal" data-termynal>
            <span data-ty="input">Starting script...</span>
            <span data-ty>1</span>
            <span data-ty>2</span>
            <span data-ty>3</span>
            <span data-ty="input">Script has been executed!</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShellScriptOutputModal",
  props: {
    output: Array
  }
}
</script>

<style lang="scss" scoped>
@import "../../libraries/termynal/termynal";
</style>