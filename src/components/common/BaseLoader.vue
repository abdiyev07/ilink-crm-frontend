<template>
  <div
    :class="{
      'base-loader_primary': type === 'primary',
      'base-loader_light': type === 'light',
      'base-loader_danger': type === 'danger',
      'base-loader_large': size === 'large',
    }"
    class="base-loader"
  />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseLoader",
  props: {
    type: {
      type: String,
      default: "default",
    },
    size: {
      type: String,
      default: "small",
    },
  },
});
</script>
