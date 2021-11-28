import { createStore } from 'vuex'
import JsSHA from 'jssha'
import axios from 'axios'

export default createStore({
  state: {
    longitude: '',
    latitude: '',
    routesList: '',
    search: ''
  },
  mutations: {
    getLongitude (state, long) {
      state.longitude = long
    },
    getLatitude (state, lat) {
      state.latitude = lat
    },
    getRoutes (state, list) {
      state.routesList = list
    },
    getSearch (state, search) {
      state.search = search
    }
  },
  actions: {
    GetAuthorizationHeader () {
      const GMTString = new Date().toGMTString()
      const ShaObj = new JsSHA('SHA-1', 'TEXT')
      ShaObj.setHMACKey(process.env.VUE_APP_APPKEY, 'TEXT')
      ShaObj.update('x-date: ' + GMTString)
      /* eslint-disable */
      const HMAC = ShaObj.getHMAC('B64')
      const Authorization =
        'hmac username=\"' + process.env.VUE_APP_APPID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"'
      return { Authorization, 'X-Date': GMTString }
    },
    getRoutes({ dispatch, commit }) {
      const url = 'https://ptx.transportdata.tw/MOTC/v2/Bus/Route/City/Taipei'
      axios.get(url, { headers: dispatch('GetAuthorizationHeader') })
        .then((res) => {
          const data = res.data
          res.data.sort((a, b) => b.RouteName.Zh_tw - a.RouteName.Zh_tw)
          commit('getRoutes', data)
        })
    }
  },
  modules: {
  }
})
