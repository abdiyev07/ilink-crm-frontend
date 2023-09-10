<template>
  <section class="section main-section">
    <h4 class="section__title mb-2">Служебный кабинет iLink</h4>
    <div class="flex-list">
      <SectionCard @click="toOrdersPage" title="Заявки">
        <template v-slot:icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="section-card__icon"
            viewBox="0 0 16 16"
          >
            <path
              d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5V4zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1H4z"
            />
            <path
              d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1z"
            />
          </svg>
        </template>
      </SectionCard>
      <SectionCard @click="toUsersPage" title="Запросы на подключение">
        <template v-slot:icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="currentColor"
            class="section-card__icon"
            viewBox="0 0 16 16"
          >
            <path
              d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
            />
          </svg>
        </template>
      </SectionCard>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SectionCard from "@/components/common/SectionCard.vue";

export default defineComponent({
  name: "MainPage",
  components: {
    SectionCard,
  },
  data: () => ({
    isActivationModalVisible: false,
    isLoading: false,
  }),
  methods: {
    toOrdersPage() {
      this.$router.push({ name: "main.orders" });
    },
    toUsersPage() {
      this.$router.push({ name: "main.clients" });
    },
  },
});
</script>
