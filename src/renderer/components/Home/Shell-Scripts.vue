<template>
  <div class="container shell-scripts">
    <h3 class="main_title">
      Scripts
    </h3>
    <div class="script-container mb-3" v-for="script in scripts" v-bind:key="script.id">
      <div class="script__name-container">
        <p class="script__name-text">
          {{ script.scriptName }}
        </p>
      </div>
      <div class="script__actions">
        <div class="script__status-container">
          <div>
            <p class="script__status-badge">
              <i class="fas fa-check-circle script__status-badge-icon"></i>
              {{ script.getStatusByName() }}
            </p>
          </div>
        </div>
        <div class="script__actions-container">
          <a href="#" class="script__actions-icon-pen" data-bs-toggle="dropdown" aria-expanded="false">
            <i class="fas fa-ellipsis-v"></i>
          </a>
          <ul class="dropdown-menu">
            <li>
              <a href="#" class="script__actions dropdown-item d-flex align-items-center" @click="this.$emit('run-clicked', script)">
                <i class="fas fa-play"></i>
                <p class="script__actions-icon">
                  Run
                </p>
              </a>
            </li>
            <li>
              <a href="#" class="script__actions dropdown-item d-flex align-items-center" data-bs-toggle="modal" data-bs-target="#scriptOutput">
                <i class="fas fa-table"></i>
                <p class="script__actions-icon">
                  Output
                </p>
              </a>
            </li>
            <li><hr class="dropdown-divider"></li>
            <li>
              <a href="#" class="script__actions dropdown-item d-flex align-items-center" @click="this.$emit('edit-clicked', script)">
                <i class="fas fa-pen"></i>
                <p class="script__actions-icon">
                  Edit
                </p>
              </a>
            </li>
            <li>
              <a href="#" class="script__actions dropdown-item d-flex align-items-center" @click="this.$emit('delete-clicked', script)">
                <i class="fas fa-trash-alt"></i>
                <p class="script__actions-icon">
                  Delete
                </p>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShellScripts",
  props: {
    shellScriptArray: Array
  },
  data() {
    return {
      scripts: {}
    }
  },
  created() {
    this.scripts = this.shellScriptArray;
  },
  watch: {
    shellScriptArray: function (scripts) {
      this.scripts = scripts;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/global";

ul.dropdown-menu>li.active>a:hover{
  background: #419641 !important;
}

ul.dropdown-menu>li.active>a{
  background: #51AB51 !important;
}

.shell-scripts {
  padding-left: 40px;
}

.main_title {
  margin-top: 40px;
  margin-bottom: 20px;
}

.script {
  &-container {
    width: 500px;
    height: 80px;
    background: white;
    border: solid rgba(0, 0, 0, 0.1) 1px;
    display: flex;
  }

  &__name {
    &-container {
      width: 360px;
      padding-left: 18px;
      display: flex;
      align-items: center;
      overflow: hidden;
    }

    &-text {
      margin: 0;
    }
  }

  &__actions {
    &-container {
      width: 140px;
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
      align-items: center;
      height: 45px;
      font-size: 20px;
    }

    &-icon {
      color: $font-color;
      margin-left: 10px !important;

      &-pen {
        margin-right: 8px;
        color: $font-color;
      }

      &:first-child {
        margin-right: 18px;
      }
    }
  }

  &__status {
    &-container {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 10px;
      height: 35px;
    }

    &-badge {
      background: #EDEDED;
      color: $font-color;
      border-radius: 10px;
      padding: 2px 10px;
      display: flex;
      align-items: center;
      font-size: 12px;

      &-icon {
        margin-right: 6px;
        color: green;
      }
    }
  }
}
</style>