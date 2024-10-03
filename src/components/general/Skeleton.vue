<template>
  <div class="skeleton">
    <el-skeleton :rows="5"> </el-skeleton>

    <div class="grid">
      <el-skeleton :count="3">
        <template #template>
          <el-skeleton-item variant="rect" class="grid-item" />
        </template>
      </el-skeleton>
      <el-skeleton :count="3">
        <template #template>
          <el-skeleton-item variant="rect" class="grid-item" />
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup></script>
