<script setup lang="ts">
import { onMounted } from "vue";
import MenuComponent from "@/components/menu/MenuComponent.vue";
import Skeleton from "@/components/general/Skeleton.vue";

import { useMenuStore } from "@/stores/menu";
const menuStore = useMenuStore();

onMounted(() => {
  menuStore.fetchMenu();
});
</script>

<template>
  <div>
    <Skeleton />
    <MenuComponent :menu="menuStore.menu" class="menu" />
  </div>
</template>
