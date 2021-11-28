<template>
  <div class="search position-relative">
    <input type="text" class="searchbar form-control rounded-4 fs-5 text-center bg-white py-4" placeholder="快速搜尋" v-model="search">
    <a href="#" class="searchBtn position-absolute" @click.prevent="gotoBus"><img src="../assets/img/searchbtn.png" alt="search btn"></a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
    gotoBus () {
      this.$router.push('/busroutes')
      this.$store.commit('getSearch', this.search)
    }
  }
}
</script>
