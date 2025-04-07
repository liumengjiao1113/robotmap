<template>
  <div class="home-container">
    <header class="home-header">
      <h1 class="header-title">ROBOTMAP</h1>
      <RouteControls
        @create-map="showCreateMapDialog = true"
        @show-layers="showLayerManagerDialog = true"
      />
    </header>

    <MapViewer ref="mapViewer" :selected-layer="selectedLayer" />

    <CreateMapDialog v-model="showCreateMapDialog" @created="handleLayerCreated" />

    <LayerManagerDialog v-model="showLayerManagerDialog" @selected="handleLayerSelected" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MapViewer from '../components/map/MapViewer.vue' // 统一使用小写路径
import RouteControls from '../components/map/RouteControls.vue'
import CreateMapDialog from '../components/dialogs/CreateMapDialog.vue'
import LayerManagerDialog from '../components/dialogs/LayerManagerDialog.vue'

const selectedLayer = ref(null)
const showCreateMapDialog = ref(false)
const showLayerManagerDialog = ref(false)

const handleLayerSelected = (layerName) => {
  selectedLayer.value = layerName
}

const handleLayerCreated = () => {
  showCreateMapDialog.value = false
}
</script>

<style scoped lang="scss">
.home-header {
  background-color: #082631;
  height: 10vh;
  display: flex;
  justify-content: space-between;

  .header-title {
    font-size: 3rem;
    font-style: italic;
    color: #fff;
    margin-left: 2vw;
    text-shadow: 3px 3px 8px rgba(255, 255, 255, 0.5); /* 修复透明度值 */
  }

  .header-nav {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 1.8rem;
    text-align: center;
    color: #fff;
    display: flex;

    .maps,
    .create,
    .upload {
      width: 200px;
      height: 100%;
      display: grid;
      place-items: center;
      margin-left: 10px;
      cursor: pointer;

      &:hover {
        color: #9bc5ef;
      }
    }

    .create {
      font-size: 1.8rem;
    }
  }
}
</style>
