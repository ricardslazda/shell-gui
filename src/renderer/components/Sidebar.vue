<template>
  <nav :class="['sidebar', {'sidebar__expanded': !this.isExpanded}]">
    <ul class="sidebar__list components mb-5">
      <li class="sidebar__list-item active">
        <a href="#" class="sidebar__list-link"><span class="fa fa-home sidebar__list-link-icon"></span> Scripts</a>
      </li>
      <li class="sidebar__list-item">
        <a href="#" class="sidebar__list-link"><span class="fa fa-user sidebar__list-link-icon"></span> Cron Jobs</a>
      </li>
      <button type="button" id="sidebarCollapse" class="btn btn-primary" @click="toggleSidebar()">
        <i class="fa fa-bars"></i>
      </button>
    </ul>

    <div class="footer">
      <p>
        Version 1.0
      </p>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      isExpanded: false
    }
  },
  methods: {
    toggleSidebar() {
      this.isExpanded = !this.isExpanded;
    }
  }
}
</script>

<style lang="scss">
a {
  color: rgb(26, 28, 30);
  text-decoration: none !important;

  &:hover, &:focus {
    background-color: rgb(41, 51, 52);
  }
}

.sidebar {
  min-width: 300px;
  max-width: 300px;
  background: rgb(26, 28, 30);
  color: #fff;
  transition: all 0.3s;

  &.sidebar__expanded {
    min-width: 80px;
    max-width: 80px;
    text-align: center;

    .sidebar__list {
      &-item {
        font-size: 14px;
      }

      &-link {
        padding: 10px 0;

        &-icon {
          margin-right: 0;
          display: block;
          font-size: 24px;
        }
      }
    }

    .footer {
      display: none;
    }
  }

  .sidebar__list {
    padding: 0;

    &-item {
      font-size: 16px;
    }

    &-link {
      padding: 10px 30px;
      display: block;
      color: rgba(153, 157, 160);
      border-bottom: 1px solid rgba(255, 255, 255, .1);

      &-icon {
        margin-right: 15px;
      }

      &:hover {
        color: white;
      }
    }
  }
}

.footer {
  padding: 0 30px;
}

</style>