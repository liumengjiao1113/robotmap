import { ref, onMounted } from 'vue'
import * as Cesium from 'cesium'
import { ElMessage } from 'element-plus'

export const useCesium = (containerId) => {
  const viewer = ref(null)
  const currentCoordinates = ref({
    longitude: 0,
    latitude: 0,
    altitude: 0,
  })

  const initViewer = () => {
    viewer.value = new Cesium.Viewer(containerId, {
      animation: false,
      baseLayerPicker: false,
      fullscreenButton: false,
      // ...其他配置
    })

    // 坐标跟踪逻辑
    viewer.value.scene.preUpdate.addEventListener(() => {
      const position = viewer.value.camera.position
      const cartographic = Cesium.Cartographic.fromCartesian(position)
      currentCoordinates.value = {
        longitude: Cesium.Math.toDegrees(cartographic.longitude),
        latitude: Cesium.Math.toDegrees(cartographic.latitude),
        altitude: cartographic.height,
      }
    })
  }

  const loadWmsLayer = (layerName) => {
    const provider = new Cesium.WebMapServiceImageryProvider({
      url: `http://your-geoserver/${layerName}/wms`,
      layers: layerName,
      parameters: {
        /* WMS参数 */
      },
    })

    viewer.value.imageryLayers.addImageryProvider(provider)
    ElMessage.success(`图层 ${layerName} 加载成功`)
  }

  onMounted(initViewer)

  return {
    viewer,
    currentCoordinates,
    loadWmsLayer,
  }
}
