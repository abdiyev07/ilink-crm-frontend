<template>
  <!--  <q-btn @click="openModal" color="primary" no-caps label="Добавить заявку" />-->
  <q-btn class="q-ml-auto" @click="openModal">Добавить клиента</q-btn>
  <q-dialog v-model="isModalVisible">
    <q-card>
      <div class="q-pa-md" style="min-width: 550px">
        <div class="mb-3 bold">Заполните необходимые данные:</div>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input v-model.trim="client.phone_number" label="Номер телефона" />
          <q-input v-model.trim="client.full_name" label="ФИО клиента" />
          <q-input
            v-model.trim="client.processed_employee_name"
            label="ФИО сотрудника"
          />
          <q-input v-model.trim="client.tariff_name" label="Название тарифа" />
          <q-toggle
            v-model="client.has_tv"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
            label="Имеется ТВ"
          />
          <q-card-actions align="center">
            <q-btn
              label="Добавить"
              type="submit"
              color="primary"
              :loading="isLoading"
            />
          </q-card-actions>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useQuasar } from "quasar";
import clientsApi from "@/api/clients.api";

const emit = defineEmits(["refetch"]);

const $q = useQuasar();
const isModalVisible = ref(false);
const isLoading = ref(false);

const client = ref({
  phone_number: "",
  full_name: "",
  processed_employee_name: "",
  tariff_name: "",
  has_tv: false,
});

const onSubmit = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
    await clientsApi.add({ ...client.value });
    $q.notify({
      message: "Клиент успешно добавлена",
      position: "top-right",
      timeout: 5000,
      icon: "done",
    });
    emit("refetch");
    hideModal();
  } finally {
    isLoading.value = false;
  }
};

const openModal = () => {
  isModalVisible.value = true;
};

const hideModal = () => {
  isModalVisible.value = false;
};
</script>
