<script setup lang="ts">
import { ref, computed } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { Submenu } from "@/utils/GeneralInterfaces";

import ChevronUp from "@/components/icons/ChevronUp.vue";
import ChevronDown from "@/components/icons/ChevronDown.vue";
import AddMenuItem from "@/components/menu/AddMenuItem.vue";

interface SubmenuComponentProps {
  submenu: Submenu,
  index: string,
}

const props = defineProps<SubmenuComponentProps>();

const itemType = computed(() => props.submenu.itemType ?? "item");
const addMenuItemVisible = ref(false);
</script>

<template>
  <el-sub-menu :index="index" class="submenu" :expand-close-icon="ChevronUp" :expand-open-icon="ChevronDown">
    <template #title>
      <span class="submenu__title-container">
        <span>
          {{ submenu.label }}
        </span>
        <AddMenuItem :show="addMenuItemVisible" :submenu-id="submenu.id">
          <template #reference>
            <span class="add-icon" @click.stop="addMenuItemVisible = !addMenuItemVisible">
              <el-tooltip class="box-item" effect="dark" :content="`Add ${itemType}`" placement="top">
                <font-awesome-icon icon="fa-plus" />
              </el-tooltip>
            </span>
          </template>
        </AddMenuItem>
      </span>
    </template>
    <div v-for="(item, itemIndex) in submenu?.items" :key="`menu-item-${index}`">
      <el-menu-item :index="`${index}-${itemIndex.toString()}`">
        <template #default>
          <font-awesome-icon :icon="item.icon ?? 'fa-check'" />
          {{ item.label }}
        </template>
      </el-menu-item>
    </div>
  </el-sub-menu>
</template>
