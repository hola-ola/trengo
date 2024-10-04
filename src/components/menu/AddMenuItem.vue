<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { VueDraggable } from "vue-draggable-plus";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import type { MenuItem } from "@/utils/GeneralInterfaces";
import { DefaultPopover } from "@/utils/GeneralConstants";

import { useMenuStore } from "@/stores/menu";
const menuStore = useMenuStore();

const props = defineProps({
  placement: {
    type: String,
    default: DefaultPopover.PLACEMENT,
  },
  width: {
    type: Number,
    default: DefaultPopover.WIDTH,
  },
  show: {
    type: Boolean,
    default: false,
  },
  submenuId: {
    type: String,
    required: true,
  },
});

const visible = ref<boolean>(props.show);
const newItemLabel = ref<string>("");
const itemType = menuStore.submenuItemType(props.submenuId) ?? "item";
const items = ref<MenuItem[]>(menuStore.submenuItems(props.submenuId));

const addItem = function () {
  menuStore.addMenuItem(props.submenuId, newItemLabel.value);
  items.value = menuStore.submenuItems(props.submenuId);
  newItemLabel.value = "";
};

const deleteItem = function (index: number) {
  menuStore.deleteMenuItem(props.submenuId, index);
  items.value = menuStore.submenuItems(props.submenuId);
};

const clickedApply = ref(false);

const applyChanges = function () {
  clickedApply.value = true;
  menuStore.updateSubmenuItemsOrder(props.submenuId, items.value);
  ElMessage({
    message: "Your changes have been saved",
    type: "success",
    customClass: "message-success",
  });
  reset();
};

const cancelChanges = function () {
  items.value = menuStore.submenuItems(props.submenuId);
  ElMessage({
    message: "Your changes have been cancelled",
    customClass: "message-info",
  });
  reset();
};

const reset = function () {
  visible.value = false;
  newItemLabel.value = "";
};

const close = function () {
  if (!clickedApply.value) {
    items.value = menuStore.submenuItems(props.submenuId);
    clickedApply.value = false;
  }
  reset();
};

const popperStyle = {
  backgroundColor: "var(--background-color--background-secondary)",
  boxShadow: "none",
  color: "var(--text-color--text-primary)",
};
</script>

<template>
  <el-popover
    v-model:visible="visible"
    :placement="DefaultPopover.PLACEMENT"
    :width="width"
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
