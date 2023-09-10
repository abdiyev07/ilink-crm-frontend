<template>
  <div class="page-wrapper">
    <TheHeader />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TheHeader from "@/components/common/TheHeader.vue";

export default defineComponent({
  name: "MainLayout",
  components: {
    TheHeader,
  },
});
</script>
