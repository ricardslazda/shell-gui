<template>
  <nav :class="['sidebar']">
    <div class="sidebar__menu">
      <a href="#">
        <i class="fas fa-cog sidebar__menu-settings-icon"></i>
      </a>
    </div>
    <ul class="sidebar__list components mb-5">
      <li class="sidebar__list-item active">
        <a href="#" class="sidebar__list-link"><span class="fa fa-home sidebar__list-link-icon"></span> Scripts</a>
      </li>
      <li class="sidebar__list-item">
        <a href="#" class="sidebar__list-link"><span class="fa fa-user sidebar__list-link-icon"></span> Cron Jobs</a>
      </li>
    </ul>

    <div class="footer d-none">
      <img src="../../assets/images/logo.svg" alt="logo" class="footer__image">
    </div>
  </nav>
</template>

<script>
export default {
  name: "Sidebar",
}
</script>

<style lang="scss" scoped>
$font-color: #303030;
a {
  color: $font-color;
  text-decoration: none !important;
  font-size: 18px;

  &:hover {
    background-color: rgb(249, 249, 252);
  }
}

.sidebar {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 300px;
  background: white;
  border-right: solid rgba(0, 0, 0, .1) 1px;
  color: #fff;
  transition: all 0.3s;

  .sidebar__list {
    padding: 0;

    &-item {
      font-size: 16px;
    }

    &-link {
      padding: 10px 30px;
      display: block;
      color: $font-color;
      border-bottom: 1px solid rgba(255, 255, 255, .1);

      &-icon {
        margin-right: 15px;
        font-size: 22px;
      }
    }
  }

  &__menu {
    margin-left: 30px;
    margin-top: 30px;
    margin-bottom: 30px;

    &-settings-icon {
      color: $font-color;
      font-size: 20px;
    }
  }
}

.footer {
  padding: 0 30px;
  margin-top: auto;
  color: black;

  &__image {
    height: 60px;
    margin-bottom: 50px;
    margin-left: 10px;
    opacity: .3;
  }
}

.active {
  background-color: rgb(249, 249, 252)
}

</style>