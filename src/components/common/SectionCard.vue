<template>
  <div class="section-card">
    <slot name="icon"></slot>
    <span class="section-card__title"> {{ title }} </span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true,
    },
  },
});
</script>
