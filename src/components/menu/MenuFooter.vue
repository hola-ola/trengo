<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const props = defineProps({
  icon: {
    type: String,
    default: "fa-comment",
  },
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="footer">
    <p><font-awesome-icon :icon="props.icon" class="footer__icon" />{{ props.text }}</p>
  </div>
</template>
