<template>
  <header class="header">
    <nav class="nav">
      <div class="header__logo">
        <router-link class="header__logo-link" :to="{ name: 'main.home' }">
          <img
            src="@/assets/icons/logos/logo-white.svg"
            alt="Logo"
            class="header__logo-img"
          />
          <span class="header__logo-title"> iLink </span>
        </router-link>
      </div>
      <ul class="nav__list">
        <li class="nav__list-item nav__list-logout">
          <span @click="logout" class="nav__link">
            <img src="@/assets/icons/logout.svg" alt="" />
          </span>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  name: "TheHeader",
  setup() {
    const router = useRouter();
    const store = useStore();
    const logout = async () => {
      await store.dispatch("logout");
      await router.push({ name: "auth.login" });
    };

    return {
      logout,
    };
  },
});
</script>
