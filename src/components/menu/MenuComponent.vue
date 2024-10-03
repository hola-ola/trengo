<script lang="ts" setup>
import { onMounted } from "vue";
import SubmenuComponent from "./SubmenuComponent.vue";
import MenuFooter from "./MenuFooter.vue";

import { useMenuStore } from "@/stores/menu";
const menuStore = useMenuStore();

onMounted(async () => {
  await menuStore.fetchMenu();
});
</script>

<template>
  <el-menu class="menu" unique-opened>
    <template #default>
      <template v-for="(submenu, index) in menuStore.menu" :key="`submenu-${index}`">
        <SubmenuComponent :submenu="submenu" :index="index.toString()" />
      </template>
      <MenuFooter text="Create conversation"/>
    </template>
  </el-menu>
</template>
