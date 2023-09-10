<template>
  <section class="section login-section">
    <form class="card login-card" @submit.prevent="handleFormSubmit">
      <h4 class="login-card__title">Авторизация в Wipon (Служебный кабинет)</h4>
      <base-input
        v-model="phone"
        label="Телефон"
        prefix="+7"
        v-mask="'(###) ###-##-##'"
        light
        autofocus
      />
      <base-input
        v-model="password"
        input-type="password"
        label="Пароль"
        light
        class="mb-1"
      />
      <base-button
        type="primary"
        html-type="submit"
        filled
        block
        :loading="isLoading"
        :disabled="!isFormFilledCorrectly"
        >Войти</base-button
      >
    </form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "vuex";
import BaseInput from "@/components/common/BaseInput.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import authApi from "@/api/auth.api";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "LoginPage",
  components: { BaseButton, BaseInput },

  setup() {
    const store = useStore();
    const router = useRouter();
    const isLoading = ref(false);
    const phone = ref("");
    const password = ref("");

    const clearMaskedPhoneNumber = () => {
      return phone.value.replaceAll(/[() -]/g, "");
    };

    const isPhoneValid = computed(() => phone.value.length === 15);
    const isFormFilledCorrectly = computed(
      () => isPhoneValid.value && password.value.length
    );

    const handleFormSubmit = async () => {
      const clearedPhone = clearMaskedPhoneNumber();
      const phoneWithPrefix = `+7${clearedPhone}`;
      if (!isFormFilledCorrectly.value) return;
      isLoading.value = true;
      try {
        const payload = {
          phone_number: phoneWithPrefix,
          password: password.value,
        };
        const { data } = await authApi.login(payload);
        store.commit("setToken", data);
        await router.push({ name: "main.home" });
      } finally {
        isLoading.value = false;
      }
    };

    return {
      isLoading,
      phone,
      password,
      isFormFilledCorrectly,
      handleFormSubmit,
    };
  },
});
</script>
