<template>
  <div class="about container pt-13">
    <div class="d-flex justify-content-between align-items-center mb-10">
      <h1 class="fs-3 fw-bold text-primary">Bus Stop<span class="border-start border-primary border-3 d-block-inline ms-6 ps-6">附近站牌</span></h1>
      <Search></Search>
    </div>
    <div class="bg-white rounded-4 py-13 px-14">
      <h2 class="fs-5 fw-bold mb-7">附近的站牌</h2>
      <div class="btn-group w-100" role="group">
        <button type="button" class="leftBtn btn btn-primary-lighter text-white" @click.prevent="range = '100'; getNearStop(this.$store.state.latitude, this.$store.state.longitude, 100)" :class="{ activeBtn: range === '100' }">100 m</button>
        <button type="button" class="rightBtn btn btn-primary-lighter text-white" @click.prevent="range = '300'; getNearStop(this.$store.state.latitude, this.$store.state.longitude, 300)" :class="{ activeBtn: range === '300' }">300 m</button>
      </div>
      <div class="px-15 py-7 bg-light" v-for="near in nearList" :key="near">
        <h3 class="fs-5 fw-bold text-primary mb-1">{{ near.StationName.Zh_tw }}(向{{ near.Bearing }})</h3>
        <p class="fs-5 mb-0">
          <span v-for="stop in near.Stops" :key="stop" class="me-2">
            {{ stop.RouteName.Zh_tw }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'

export default {
  data () {
    return {
      nearList: '',
      range: '100',
      bearing: {
        E: '東行',
        W: '西行',
        S: '南行',
        N: '北行',
        SE: '東南行',
        NE: '東北行',
        SW: '西南行',
        NW: '西北行'
      }
    }
  },
  components: {
    Search
  },
  methods: {
    getNearStop (lat, long, dist) {
      const url = `https://ptx.transportdata.tw/MOTC/v2/Bus/Station/NearBy?$spatialFilter=nearby(${lat}, ${long}, ${dist})`
      this.$http.get(url, { header: this.$store.dispatch('GetAuthorizationHeader') })
        .then((res) => {
          this.nearList = res.data
          // 方位角中文
          this.nearList.forEach(item1 => {
            item1.Bearing = this.bearing[item1.Bearing]
          })
        })
    }
  },
  mounted () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.$store.commit('getLongitude', position.coords.longitude)
          this.$store.commit('getLatitude', position.coords.latitude)
          this.getNearStop(this.$store.state.latitude, this.$store.state.longitude, parseInt(this.range))
        },
        // 錯誤訊息
        (e) => {
          const msg = e.code
          const dd = e.message
          console.error(msg)
          console.error(dd)
        }
      )
    } else {
      this.$router.push('/busroutes')
    }
  }
}
</script>
