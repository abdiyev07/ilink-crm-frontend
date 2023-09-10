<template>
  <svg
    @click="back"
    xmlns="http://www.w3.org/2000/svg"
    width="26"
    height="26"
    fill="#343a40"
    class="bi bi-arrow-left"
    viewBox="0 0 16 16"
    style="cursor: pointer"
  >
    <path
      fill-rule="evenodd"
      d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
    />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "GoBackIcon",
  props: {
    backRouteName: {
      type: String,
      required: true,
    },
  },
  methods: {
    back() {
      this.$router.push({ name: this.backRouteName });
    },
  },
});
</script>
