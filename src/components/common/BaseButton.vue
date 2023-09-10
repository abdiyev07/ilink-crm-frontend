<template>
  <button
    :type="htmlType"
    :class="{
      'base-button_primary': type === 'primary',
      'base-button_danger': type === 'danger',
      'base-button_filled': filled,
      'base-button_disabled': isButtonDisabled,
      block,
      'base-button-small': small,
    }"
    class="base-button"
    @click="handleClick"
    :disabled="isButtonDisabled"
  >
    <slot />
    <BaseLoader v-show="loading" />
  </button>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import BaseLoader from "@/components/common/BaseLoader.vue";

export default defineComponent({
  name: "BaseButton",
  components: { BaseLoader },
  props: {
    type: {
      type: String,
      default: "default",
    },
    filled: {
      type: Boolean,
      default: false,
    },
    htmlType: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    block: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const isButtonDisabled = computed(() => {
      if (props.loading) return true;
      return !!props.disabled;
    });
    const handleClick = () => {
      if (isButtonDisabled.value) return;
      emit("btn-click");
    };

    return {
      isButtonDisabled,
      handleClick,
    };
  },
});
</script>
