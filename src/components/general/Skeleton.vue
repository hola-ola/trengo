<template>
  <div class="skeleton">
    <el-skeleton :rows="5"> </el-skeleton>

    <div class="skeleton__grid">
      <el-skeleton :count="3">
        <template #template>
          <el-skeleton-item variant="rect" class="skeleton__grid__item" />
        </template>
      </el-skeleton>
      <el-skeleton :count="3">
        <template #template>
          <el-skeleton-item variant="rect" class="skeleton__grid__item" />
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script setup></script>
