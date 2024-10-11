<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

interface MenuFooterProps {
  icon?: string;
  text: string;
}
const props = defineProps<MenuFooterProps>();
</script>

<template>
  <div class="footer">
    <p><font-awesome-icon :icon="props.icon ?? 'fa-comment'" class="footer__icon" />{{ props.text }}</p>
  </div>
</template>
