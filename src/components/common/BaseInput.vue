<template>
  <div class="base-input" :class="{ 'base-input_light': light }">
    <label v-if="label" class="base-input__label">{{ label }}</label>
    <div
      :class="{
        'base-input__wrapper_focused': focused,
        'base-input__wrapper--error': getErrors.length,
      }"
      class="base-input__wrapper"
    >
      <div v-if="prefix" class="base-input__prefix">{{ prefix }}</div>
      <input
        v-model="inputValue"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :disabled="disabled"
        :required="required"
        :type="inputType"
        :class="{
          'base-input__input_no-left-padding': prefix,
          'base-input__input--error': getErrors.length,
        }"
        class="base-input__input"
        @focus="focused = true"
        @blur="focused = false"
      />
    </div>
    <div v-for="error in getErrors" :key="error.type">
      <p class="base-input__error-item">{{ error.text }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, SetupContext } from "vue";
export default defineComponent({
  name: "BaseInput",
  props: {
    modelValue: {
      type: [String, Number],
      default: "",
    },
    inputType: {
      type: [String, Number],
      default: "text",
    },
    name: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    light: {
      type: Boolean,
      default: false,
    },
    autofocus: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: false,
    },
    prefix: {
      type: String,
      default: null,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }: SetupContext) {
    const focused = ref(false);
    const getErrors = computed(() =>
      props.errors.filter((i: any) => i.type === props.name)
    );
    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => emit("update:modelValue", value),
    });
    return {
      inputValue,
      focused,
      getErrors,
    };
  },
});
</script>
