<template>
  <q-dialog v-model="isModalVisible">
    <q-card>
      <div class="q-pa-md" style="min-width: 550px">
        <div class="mb-3 bold">
          Изменение данных клиента номер {{ client.id || "" }}:
        </div>
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
          <q-input v-model.trim="client.address" label="Адрес клиента" />
          <q-card-actions align="center">
            <q-btn
              label="Изменить"
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
import { ref, defineEmits, defineExpose } from "vue";
import { useQuasar } from "quasar";
import clientsApi from "@/api/clients.api";

const emit = defineEmits(["refetch"]);

const $q = useQuasar();
const isModalVisible = ref(false);
const isLoading = ref(false);

const client = ref({
  id: null,
  phone_number: "",
  full_name: "",
  processed_employee_name: "",
  tariff_name: "",
  has_tv: false,
  address: "",
});

const onSubmit = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
    await clientsApi.update(client.value.id, { ...client.value });
    $q.notify({
      message: "Клиент успешно изменен",
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

const openModal = (clientData) => {
  client.value = clientData;
  isModalVisible.value = true;
};

const hideModal = () => {
  client.value = {
    phone_number: "",
    full_name: "",
    processed_employee_name: "",
    tariff_name: "",
    has_tv: false,
  };
  isModalVisible.value = false;
};

defineExpose({
  openModal,
});
</script>
