<template>
  <div class="about container pt-13">
    <div class="d-flex justify-content-between align-items-center mb-10">
      <h1 class="fs-3 fw-bold text-primary">Latest News <span class="border-start border-primary border-3 d-block-inline ms-6 ps-6">最新消息</span></h1>
      <Search></Search>
    </div>
    <div class="bg-white rounded-4 py-13 px-14">
      <h2 class="fs-5 fw-bold mb-7">最新消息</h2>
      <div v-for="news in newsList" :key="news" class="px-15 py-7 bg-light">
        <h3 class="fs-5 fw-bold text-primary mb-1">{{ news.newsDate }}</h3>
        <p class="fs-5 mb-0">{{ news.Description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'

export default {
  data () {
    return {
      newsList: ''
    }
  },
  components: {
    Search
  },
  methods: {
    getNews () {
      const url = 'https://ptx.transportdata.tw/MOTC/v2/Bus/News/City/Taipei'
      this.$http.get(url, { header: this.$store.dispatch('GetAuthorizationHeader') })
        .then((res) => {
          this.newsList = res.data
          this.newsList.forEach((item) => {
            item.newsDate = item.PublishTime.split('T')[0]
          })
        })
    }
  },
  mounted () {
    this.getNews()
  }
}
</script>
