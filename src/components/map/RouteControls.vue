<template>
  <div class="header-nav">
    <div class="upload" @click="$emit('create-map')">Create Map</div>
    <div class="maps" @click="$emit('show-layers')">Your Maps</div>
    <el-dropdown trigger="click">
      <div class="create">Create Route</div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="$emit('start-drawing')">开始绘制</el-dropdown-item>
          <el-dropdown-item @click="$emit('undo-drawing')">撤销上一步</el-dropdown-item>
          <el-dropdown-item @click="$emit('clear-route')">清除路线</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped>
/* 原有导航样式 */
.header-nav {
  display: flex;
  /* 其他样式 */
}
</style>
