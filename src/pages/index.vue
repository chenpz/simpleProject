<template>
  <div>
    <input type="text" v-model="loginName">
    <input type="password" v-model="password">
    <button @click="submit">提交</button>
    <button @click="drawingImg">画多边形</button>
    <div style="margin-top: 88px; width: 100%; height: 800px; border:1px solid red;" id="mapDome"></div>
  </div>
</template>
<script>
import { postHttp } from '../http'
// import { SUCCESS } from '../http/httpConst'

export default {
  data () {
    return {
      loginName: '',
      password: '',
      map: null
    }
  },
  mounted () {
    this.initMap()
  },
  methods: {
    async submit () {
      let params = { username: this.loginName, password: this.password }
      let result = await postHttp({ url: '/api/user/login', params })
      console.log(result)
      // if (result && result.code === SUCCESS) {}
    },
    initMap () {
      /* eslint-disable no-undef */
      this.map = new BMap.Map('mapDome')
      // 初始化地图 设置中心点
      this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 11)
      this.map.enableScrollWheelZoom(false)
      let myCity = new BMap.LocalCity()
      myCity.get((result) => {
        this.map.setCenter(result.name)
        console.log(result.name)
      })
    },
    // 画多边形
    drawingImg () {
      var overlays = []
      var overlaycomplete = (e) => {
        overlays.push(e.overlay)
      }
      var styleOptions = {
        strokeColor: 'orange',    // 边线颜色。
        fillColor: 'orange',      // 填充颜色。当参数为空时，圆形将没有填充效果。
        strokeWeight: 3,       // 边线的宽度，以像素为单位。
        strokeOpacity: 0.8,    // 边线透明度，取值范围0 - 1。
        fillOpacity: 0.6,      // 填充的透明度，取值范围0 - 1。
        strokeStyle: 'solid'   // 边线的样式，solid或dashed。
      }
      var drawingManager = new BMapLib.DrawingManager(this.map, {
        isOpen: true,                                         // 是否开启绘制模式
        enableDrawingTool: false,                              // 是否显示工具栏
        drawingMode: BMAP_DRAWING_POLYGON,                    // 绘制模式  多边形
        polygonOptions: styleOptions                          // 多边形的样式
      })
      // 添加鼠标绘制工具监听事件，用于获取绘制结果
      drawingManager.addEventListener('overlaycomplete', overlaycomplete)
    }
  }
}
</script>