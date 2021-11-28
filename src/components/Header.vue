<template>
  <nav class="header bg-primary position-fixed top-0 start-0 rounded-4 py-9">
    <a href="#" class="navbar-brand d-block border-bottom border-white px-6 pb-12 me-0">
      <img src="../assets/img/gobus.svg" alt=""></a>
    <ul class="navbar-nav mt-8">
      <li class="nav-item px-10 mb-10">
        <router-link to="/" class="nav-link rounded-4 text-center p-5" :class="{ active: theme === 'nearBusStop' }" @click.prevent="theme = 'nearBusStop'">
          <img src="../assets/img/bx_bx-map-pin.svg" alt="near icon">
        </router-link>
      </li>
      <li class="nav-item px-10 mb-10">
        <router-link to="/busroutes" class="nav-link rounded-4 text-center p-5" :class="{ active: theme === 'busroutes' }" @click.prevent="theme = 'busroutes'">
          <img src="../assets/img/searchicon.svg" alt="bus routes icon">
        </router-link>
      </li>
      <li class="nav-item px-10">
        <router-link to="/news" class="nav-link rounded-4 text-center p-5" :class="{ active: theme === 'news' }" @click.prevent="theme = 'news'">
          <img src="../assets/img/bell.svg" alt="news icon">
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      theme: 'nearBusStop'
    }
  },
  mounted () {
    this.$store.dispatch('getRoutes')
  }
}
</script>
