<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { VueDraggable } from "vue-draggable-plus";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { DefaultPopover } from "@/utils/GeneralConstants";
import type { MenuItem } from "@/utils/GeneralInterfaces";

import { useMenuStore } from "@/stores/menu";
const menuStore = useMenuStore();

interface AddMenuItemProps {
  placement?: string;
  width?: number;
  show: boolean;
  submenuId: string;
}
const props = defineProps<AddMenuItemProps>();

const visible = ref<boolean>(props.show);
const newItemLabel = ref<string>("");
const items = ref<MenuItem[]>([...menuStore.submenuItems(props.submenuId)]);
const itemType: string = menuStore.submenuItemType(props.submenuId) ?? "item";

const addItem = function (): void {
  const labelLength = newItemLabel.value?.trim()?.length;
  if (labelLength === 0) {
    ElMessage({
      message: "Item's label can't be empty",
      type: "warning",
    });
  } else if (labelLength < 3) {
    ElMessage({
      message: "Item's label needs to consist of minimum three characters",
      type: "warning",
    });
  } else {
    menuStore.addMenuItem(props.submenuId, newItemLabel.value);
    items.value = menuStore.submenuItems(props.submenuId);
    newItemLabel.value = "";
  }
};

const deleteItem = function (index: number): void {
  if (!index && index !== 0) {
    console.error("Incorrect input data");
  }
  if (items.value[index]) {
    items.value.splice(index, 1);
  }
};

const clickedApply = ref<boolean>(false);

const applyChanges = function (): void {
  clickedApply.value = true;
  menuStore.updateSubmenuItems(props.submenuId, items.value);
  ElMessage({
    message: "Your changes have been saved",
    type: "success",
    customClass: "message-success",
  });
  reset();
};

const cancelChanges = function (): void {
  items.value = menuStore.submenuItems(props.submenuId);
  ElMessage({
    message: "Your changes have been cancelled",
    customClass: "message-info",
  });
  reset();
};

const reset = function (): void {
  visible.value = false;
  newItemLabel.value = "";
};

const close = function (): void {
  if (!clickedApply.value) {
    items.value = menuStore.submenuItems(props.submenuId);
    clickedApply.value = false;
  }
  reset();
};

interface PopperStyle {
  backgroundColor: string;
  boxShadow: string;
  color: string;
}

const popperStyle: PopperStyle = {
  backgroundColor: "var(--background-color--background-secondary)",
  boxShadow: "none",
  color: "var(--text-color--text-primary)",
};
</script>

<template>
  <el-popover
    v-model:visible="visible"
    :placement="placement ?? DefaultPopover.PLACEMENT"
    :width="width ?? DefaultPopover.WIDTH"
    trigger="click"
    :show-arrow="false"
    :popper-style="popperStyle"
    @hide="close"
  >
    <div>
      <!--Input field to type new item name/type-->
      <el-input
        v-model="newItemLabel"
        :placeholder="`Type to add ${itemType}...`"
        minlength="3"
        maxlength="20"
        show-word-limit
        @change="addItem"
      >
        <template #append>
          <el-button :disabled="!newItemLabel || newItemLabel?.length < 3" round>
            <font-awesome-icon icon="fa-plus" @click="addItem" /> </el-button
        ></template>
      </el-input>

      <!--List of items updated in real-time-->
      <ul class="popover__items">
        <VueDraggable ref="el" v-model="items">
          <li v-for="(item, index) in items" :key="index" class="popover__items__item">
            <span>
              <font-awesome-icon
                class="popover__items__item-icon"
                icon="fa-grip-vertical"
                v-if="items && items.length > 1"
              />
              <font-awesome-icon class="popover__items__item-icon" :icon="item.icon ?? 'fa-check'" />
              {{ item.label }}
            </span>
            <font-awesome-icon class="popover__items__item-icon" icon="fa-trash" @click="deleteItem(index)" />
          </li>
        </VueDraggable>
      </ul>

      <el-divider />
      <!--Button to cancel/confirm the changes (items order)-->
      <div class="popover__buttons">
        <el-button text @click="cancelChanges" round>Cancel</el-button>
        <el-button type="primary" @click="applyChanges" round> Apply </el-button>
      </div>
    </div>
    <!-- Reference slot for the trigger element -->
    <template #reference>
      <slot name="reference"></slot>
    </template>
  </el-popover>
</template>

<style scoped lang="scss">
.popover__items {
  @apply flex flex-col w-full px-2 list-none;

  &__item {
    @apply flex flex-row justify-between items-center p-2 cursor-pointer;

    &-icon {
      @apply mr-2 cursor-pointer;
    }
  }
}
.popover__buttons {
  @apply flex justify-end gap-2;
  .el-button--primary:hover {
    background-color: var(--background--background-blue);
  }

  .is-text {
    @apply text-gray-800 border border-transparent hover:border-gray-800;
  }
}
</style>
