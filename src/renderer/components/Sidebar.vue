<template>
  <div class="sidebar p-3 text-white bg-dark">
    <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
      <svg class="bi me-2" width="40" height="32">
        <use xlink:href="#bootstrap"></use>
      </svg>
      <span class="fs-4">Sidebar</span>
    </a>
    <hr>
    <ul class="nav nav-pills flex-column mb-auto">
      <router-link to="/">
        <li class="nav-item">
          <a href="#" class="nav-link active" aria-current="page">
            <i class="fas fa-book"></i>
            Scripts
          </a>
        </li>
      </router-link>
      <router-link to="/about" class="sidebar__link">
        <li>
          <a href="#" class="nav-link text-white">
            <i class="fas fa-business-time"></i>
            Cron Jobs
          </a>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<style lang="scss">
.sidebar {
  width: 280px;
  &__link {
    text-decoration: none;
    cursor: pointer;
  }
}
</style>