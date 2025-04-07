<template>
  <div id="cesiumContainer" class="map-container"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useCesium } from './useCesium'

const props = defineProps({
  selectedLayer: String,
})

const { viewer, loadWmsLayer } = useCesium('cesiumContainer')

watch(
  () => props.selectedLayer,
  (newVal) => {
    if (newVal) {
      loadWmsLayer(newVal)
    }
  },
)
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 90vh;
}
</style>
