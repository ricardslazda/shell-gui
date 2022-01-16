<template>
  <div class="container add-edit">
    <h3 class="form__header">New Script</h3>
    <hr/>
    <div class="form__wrapper">
      <form>
        <div class="form__script-details-container">
          <p class="form__script-details">
            Details
          </p>
        </div>
        <div class="mb-3 form-group">
          <label class="form-label">Script name*</label>
          <input type="text" class="form-control" v-model="script.scriptName">
        </div>
        <div class="mb-3 form-group">
          <label class="form-label">File path*</label>
          <input class="form-control" type="file" ref="file" @change="handleFileUpload()">
        </div>
        <div class="form__arguments-container">
          <label class="form-check-label form__arguments-text">Arguments</label>
          <label class="switch">
            <input type="checkbox" v-model="hasArguments">
            <span class="slider round"></span>
          </label>
        </div>
        <div v-if="hasArguments" class="mb-3">
          <div class="row" v-for="(argument, index) in this.argumentArray" :key="index">
            <div class="col-4">
<!--              <label for="inputState" class="form-label">Type</label>-->
              <select id="inputState" class="form-select" v-model="argument.type">
                <option v-for="(TYPE, index) in this.constants.TYPES" :key="index">{{ TYPE }}</option>
              </select>
            </div>
            <div class="col-6">
              <div v-if="argument.type === this.constants.TYPES.POSITIONAL" class="mb-3">
<!--                <label for="inputPositionalArgument" class="form-label">Argument</label>-->
                <input type="text" class="form-control" id="inputPositionalArgument"
                       v-model="argument.positionalArgumentValue">
              </div>
              <div v-else-if="argument.type === this.constants.TYPES.FLAG">
<!--                <label for="inputFlag" class="form-label">Argument</label>-->
                <div class="input-group mb-3">
                  <select class="form-select input-group-text" v-model="argument.flagPrefixOption">
                    <option v-for="(FLAG_PREFIX_OPTION, index) in this.constants.FLAG_PREFIX_OPTIONS" :key="index">
                      {{ FLAG_PREFIX_OPTION }}
                    </option>
                  </select>
                  <input type="text" class="form-control" id="inputFlag" v-model="argument.flagPrefixValue">
                  <select class="form-select input-group-text" v-model="argument.flagMiddleSyntaxOption">
                    <option v-for="(FLAG_MIDDLE_SYNTAX, index) in this.constants.FLAG_MIDDLE_SYNTAX_LIST" :key="index">
                      {{ FLAG_MIDDLE_SYNTAX }}
                    </option>
                  </select>
                  <input type="text" class="form-control" id="inputArgument" v-model="argument.flagArgumentValue">
                </div>
              </div>
            </div>
            <div class="col-2">
<!--              <label class="form-label" for="removeArgument">Remove</label>-->
<!--              <button class="btn btn-danger" id="removeArgument" @click.prevent="removeArgument(index)">-</button>-->
              <button type="button" class="btn form__add-button" @click="removeArgument(index)">-</button>
            </div>
          </div>
          <div class="row">
            <div class="col-2 form__add-container">
              <button class="btn form__add-button" @click.prevent="addArgument">+</button>
            </div>
          </div>
        </div>
      </form>
      <div class="form__save-container">
        <router-link to="/">
          <a href="" class="form__back-link">Go back</a>
        </router-link>
        <button type="button" class="btn form__save-button" data-bs-dismiss="modal" @click="saveShellScript">Save</button>
      </div>
    </div>
  </div>
</template>

<script type="module">
import {ShellScript} from "@/models/models.shell-script";
import {ScriptArgument, FLAG_PREFIX_OPTIONS, FLAG_MIDDLE_SYNTAX_LIST, TYPES} from "@/models/models.script-argument";

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
      this.argumentArray = [new ScriptArgument()];
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
      this.$emit("script-saved", this.script, this.argumentArray)
    },
    removeArgument(index) {
      this.argumentArray.splice(index, 1);
    },
    addArgument() {
      this.argumentArray.push(new ScriptArgument())
    }
  }
}
</script>

<style lang="scss" scoped>
.add-edit {
  padding-left: 40px !important;
}

.form {
  &__header{
    margin-top: 40px;
    margin-bottom: 20px;
  }

  &__add {
    &-button {
      color: #303030;
      background-color: white;
      border: 1px solid gray;
    }

    &-container {
      margin-top: 20px;
    }
  }

  &__back-link {
    text-decoration: none;
    color: #303030;
    font-weight: bold;
  }

  &__save {
    &-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-button {
      border-radius: 10px;
      background: #303030;
      color: white;

      &:hover {
        color: white;
      }
    }
  }

  &__wrapper {
    width: 500px;
  }

  &__arguments {
    &-container {
      margin-top: 30px;
      display: flex;
      margin-bottom: 30px;
      align-items: center;
    }

    &-text {
      font-weight: bold;
      margin-right: 20px;
    }
  }

  &__script-details {
    &-container {
      margin-bottom: 20px;
    }

    font-family: 'Lato', sans-serif;
    font-weight: 700;
  }
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>