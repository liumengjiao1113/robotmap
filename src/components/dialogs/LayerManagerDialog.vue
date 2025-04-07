<template>
  <el-dialog v-model="visible" title="图层管理">
    <el-table :data="layers" @current-change="handleSelect">
      <el-table-column prop="name" label="图层名称" />
      <el-table-column prop="date" label="创建时间" />
    </el-table>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="confirmSelection">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { fetchLayers } from '@/api/layerApi'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'selected'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const layers = ref([])
const selectedLayer = ref(null)

onMounted(async () => {
  layers.value = await fetchLayers()
})

const handleSelect = (layer) => {
  selectedLayer.value = layer?.name
}

const confirmSelection = () => {
  if (selectedLayer.value) {
    emit('selected', selectedLayer.value)
    visible.value = false
  }
}
</script>
