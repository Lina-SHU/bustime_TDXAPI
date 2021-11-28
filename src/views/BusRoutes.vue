<template>
  <div class="container pt-13">
    <div class="d-flex justify-content-between align-items-center mb-10">
      <h1 class="fs-3 fw-bold text-primary">Road Search<span class="border-start border-primary border-3 d-block-inline ms-6 ps-6">路線搜尋</span></h1>
      <Search></Search>
    </div>
    <div class="row">
      <div class="col-md-4">
        <div class="selectRoute bg-white rounded-4 pt-11 pb-13 px-13 mb-8">
          <h2 class="fs-4 mb-8">Where are you going?</h2>
          <select class="form-select bg-white border-0 mb-9 w-50" disabled>
            <option selected>臺北市</option>
          </select>
          <select class="form-select bg-white border-0 mb-9 w-50" v-model="selectRoute">
            <option value="" selected disabled>選擇 路線</option>
            <option :value="stop.RouteName.Zh_tw" v-for="stop in $store.state.routesList" :key="stop">{{ stop.RouteName.Zh_tw }}</option>
          </select>
          <button class="btn btn-primary rounded-5 w-100"  @click="getBusStop(this.selectRoute)">搜尋</button>
        </div>
        <div v-if="goList" class="btn-group w-100" role="group">
          <button type="button" class="leftBtn btn btn-primary-lighter text-white fs-8 fw-bold" :class="{ activeBtn: direction === 'go' }" @click.prevent="direction = 'go'">往 公教住宅</button>
          <button type="button" class="rightBtn btn btn-primary-lighter text-white fs-8 fw-bold" :class="{ activeBtn: direction === 'back' }" @click.prevent="direction = 'back'">往 中和</button>
        </div>
        <div class="results">
          <table class="table bg-white">
            <tbody>
              <template v-if="direction === 'go'">
                <tr v-for="go in goList.Stops" :key="go">
                  <td class="ps-md-10" width="50%">
                    <img src="../assets/img/stop.png" alt="bus stop icon">
                    {{ go.StopName.Zh_tw }}
                  </td>
                  <td class="fw-bold"></td>
                  <td></td>
                </tr>
              </template>
              <template v-if="direction === 'back'">
                <tr v-for="back in backList.Stops" :key="back">
                  <td class="ps-md-10" width="50%">
                    <img src="../assets/img/stop.png" alt="bus stop icon">
                    {{ back.StopName.Zh_tw }}
                  </td>
                  <td class="fw-bold"></td>
                  <td></td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-8">
        <Map></Map>
      </div>
    </div>
  </div>
</template>

<script>
import Search from '@/components/Search.vue'
import Map from '@/components/Map.vue'

export default {
  data () {
    return {
      direction: 'go',
      selectRoute: '',
      goList: '',
      backList: ''
    }
  },
  components: {
    Search,
    Map
  },
  methods: {
    getBusStop (route) {
      const url = `https://ptx.transportdata.tw/MOTC/v2/Bus/StopOfRoute/City/Taipei/${route}`
      this.$http.get(url, { headers: this.$store.dispatch('GetAuthorizationHeader') })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.length !== 0) {
              res.data.forEach((item) => {
                if (item.RouteName.Zh_tw === route && item.Direction === 0) {
                  this.goList = item
                } else if (item.RouteName.Zh_tw === route && item.Direction === 1) {
                  this.backList = item
                }
              })
            } else {
              this.goList = ''
              this.backList = ''
            }
          }
        })
    }
  },
  watch: {
    '$store.state.search' (n) {
      this.selectRoute = n
      this.getBusStop(n)
    }
  }
}
</script>
