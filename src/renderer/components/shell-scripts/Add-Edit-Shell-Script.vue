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
            <div class="mb-3 form-group">
              <label class="form-label">File path</label>
              <input class="form-control" type="file" ref="file" @change="handleFileUpload()">
            </div>
            <div class="mb-3 form-group">
              <label class="form-label">Script Name</label>
              <input type="text" class="form-control" v-model="script.scriptName">
            </div>
            <div class="form-check">
              <input type="checkbox" class="form-check-input" :value="true" v-model="hasArguments">
              <label class="form-check-label">Script has arguments</label>
            </div>
            <div v-if="hasArguments" class="mb-3">
              <div class="row" v-for="(argument, index) in this.argumentArray" :key="index">
                <div class="col-4">
                  <label for="inputState" class="form-label">Type</label>
                  <select id="inputState" class="form-select" v-model="argument.type">
                    <option v-for="(TYPE, index) in this.constants.TYPES" :key="index">{{ TYPE }}</option>
                  </select>
                </div>
                <div class="col-6">
                  <div v-if="argument.type === this.constants.TYPES.POSITIONAL">
                    <label for="inputPositionalArgument" class="form-label">Argument</label>
                    <input type="text" class="form-control" id="inputPositionalArgument" v-model="argument.positionalArgumentValue">
                  </div>
                  <div v-else-if="argument.type === this.constants.TYPES.FLAG">
                    <label for="inputFlag" class="form-label">Argument</label>
                    <div class="input-group mb-3">
                      <select class="form-select input-group-text" v-model="argument.flagPrefixOption">
                        <option v-for="(FLAG_PREFIX_OPTION, index) in this.constants.FLAG_PREFIX_OPTIONS" :key="index">{{ FLAG_PREFIX_OPTION }}</option>
                      </select>
                      <input type="text" class="form-control" id="inputFlag" v-model="argument.flagPrefixValue">
                      <select class="form-select input-group-text" v-model="argument.flagMiddleSyntaxOption">
                        <option v-for="(FLAG_MIDDLE_SYNTAX, index) in this.constants.FLAG_MIDDLE_SYNTAX_LIST" :key="index">{{ FLAG_MIDDLE_SYNTAX }}</option>
                      </select>
                      <input type="text" class="form-control" id="inputArgument" v-model="argument.flagArgumentValue">
                    </div>
                  </div>
                </div>
                <div class="col-2">
                  <label class="form-label" for="removeArgument">Remove</label>
                  <button class="btn btn-danger" id="removeArgument" @click.prevent="removeArgument(index)">-</button>
                </div>
              </div>
              <div class="row">
                <div class="col-2">
                  <button class="btn btn-primary" @click.prevent="addArgument">+</button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="saveShellScript">Save</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="module">
import {ShellScript} from "@/models/models.shell-script";
import {Argument, FLAG_PREFIX_OPTIONS, FLAG_MIDDLE_SYNTAX_LIST, TYPES} from "@/models/models.argument";

export default {
  name: "AddShellScript",
  data() {
    return {
      script: {},
      argumentArray: null,
      hasArguments: false,
      constants: {}
    }
  },
  props: {
    scriptProp: ShellScript
  },
  mounted() {
    this.constants.FLAG_PREFIX_OPTIONS = FLAG_PREFIX_OPTIONS;
    this.constants.FLAG_MIDDLE_SYNTAX_LIST = FLAG_MIDDLE_SYNTAX_LIST;
    this.constants.TYPES = TYPES;

    if (this.scriptProp) {
      this.script = this.scriptProp;
      this.argumentArray = [];
    } else {
      this.script = new ShellScript();
      this.argumentArray = [new Argument()];
    }
  },
  computed: {
    isEditing: () => this.scriptProp,
  },
  methods: {
    handleFileUpload() {
      this.script.filePath = this.$refs.file.files[0];
    },
    saveShellScript() {
      this.$emit("script-saved", this.script)
    },
    removeArgument(index) {
      this.argumentArray.splice(index, 1);
    },
    addArgument() {
      this.argumentArray.push(new Argument())
    }
  }
}
</script>