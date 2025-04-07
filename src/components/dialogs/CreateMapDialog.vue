<template>
  <el-dialog v-model="visible" title="Create layer">
    <el-form :model="form" :rules="rules" ref="formRef">
      <el-form-item label="Layer name" prop="layerName">
        <el-input v-model="form.layerName" />
      </el-form-item>
      <el-upload :file-list="fileList" :before-upload="handleUpload">
        <el-button type="primary">上传TIF文件</el-button>
      </el-upload>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { uploadLayer } from '@/api/layerApi'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'created'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const form = ref({ layerName: '' })
const fileList = ref([])
const rules = {
  layerName: [
    { required: true, message: '请输入图层名称' },
    { pattern: /^[\w-]+$/, message: '只允许字母、数字和下划线' },
  ],
}

const handleUpload = (file) => {
  if (file.type !== 'image/tiff') {
    ElMessage.error('仅支持TIF文件')
    return false
  }
  return true
}

const handleSubmit = async () => {
  const formData = new FormData()
  formData.append('name', form.value.layerName)
  formData.append('file', fileList.value[0].raw)

  try {
    await uploadLayer(formData)
    emit('created')
    ElMessage.success('图层创建成功')
  } catch (error) {
    ElMessage.error('创建失败: ' + error.message)
  }
}
</script>
