<template>
  <div id="map">
    <img class="w-100" src="../assets/img/map.png" alt="map images">
  </div>
</template>

<script>
import L from 'leaflet'

var mymap = ''
export default {
  methods: {
    getMap (lat = 25.03, long = 121.55) {
      mymap = L.map('map', {
        center: [lat, long],
        zoom: 16
      })
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/">OSM</a> contributors'
      }).addTo(mymap)
    }
  },
  mounted () {
    // this.getMap(this.$store.state.latitude, this.$store.state.longitude)
  }
}
</script>
