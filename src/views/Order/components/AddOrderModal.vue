<template>
  <!--  <q-btn @click="openModal" color="primary" no-caps label="Добавить заявку" />-->
  <q-btn class="q-ml-auto" @click="openModal">Добавить заявку</q-btn>
  <q-dialog v-model="isModalVisible">
    <q-card>
      <div class="q-pa-md" style="min-width: 550px">
        <div class="mb-3 bold">Заполните необходимые данные:</div>
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <q-input
            v-model.trim="order.contact_phone_number"
            label="Номер телефона"
          />
          <q-select
            filled
            v-model="order.client_type"
            :options="clientTypeList"
            label="Тип клиента"
            emit-value
            map-options
          />
          <q-select
            filled
            v-model="order.work_type"
            :options="workTypes"
            label="Тип работы"
            emit-value
            map-options
          />
          <q-toggle
            v-model="order.is_free"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
            label="Платно"
          />
          <q-input v-model.trim="order.breakdown_reason" label="Причина" />
          <q-select
            filled
            v-model="order.status"
            :options="statusList"
            label="Статус"
            emit-value
            map-options
          />
          <q-input
            v-model.trim="order.executors"
            label="Монтажная бригада (ФИО)"
          />
          <q-select
            filled
            v-model="order.csi"
            :options="csiList"
            label="CSI"
            emit-value
            map-options
          />
          <q-input v-model.trim="order.address" label="Адрес/ссылка" />
          <q-input v-model.trim="order.client_uid" label="UID клиента" />
          <q-select
            filled
            v-model="order.sub_provider"
            :options="subProviderList"
            label="Суб. провайдер"
            emit-value
            map-options
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
import ordersApi from "@/api/order.api";
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";

const emit = defineEmits(["refetch"]);

const $q = useQuasar();
const isModalVisible = ref(false);
const isLoading = ref(false);

const order = ref({
  contact_phone_number: "",
  work_type: "",
  client_type: "",
  status: "",
  csi: "",
  executors: "",
  address: "",
  is_free: true,
  breakdown_reason: "",
  client_uid: "",
  sub_provider: "",
});

const workTypes = ref([
  { label: "Замена коннектора", value: "Замена коннектора" },
  { label: "Замена роутера", value: "Замена роутера" },
  { label: "Обрыв кабеля ИНДУР", value: "Обрыв кабеля ИНДУР" },
  { label: "Обрыв кабеля ОУТДУР", value: "Обрыв кабеля ОУТДУР" },
  { label: "Перенастройки роутера", value: "Перенастройки роутера" },
  { label: "Проблема с ОРКА", value: "Проблема с ОРКА" },
  { label: "Низкая скорость", value: "Низкая скорость" },
]);

const statusList = ref([
  { label: "В работе", value: "В работе" },
  { label: "Отменен", value: "Отменен" },
  { label: "Перенесен", value: "Перенесен" },
  { label: "Закрыт", value: "Закрыт" },
]);

const clientTypeList = ref([
  { label: "Физ. лицо", value: "Физ. лицо" },
  { label: "Юр. лицо", value: "Юр. лицо" },
]);

const csiList = ref([
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
]);

const subProviderList = ref([
  { label: "i-Link Net", value: "i-Link Net" },
  { label: "Барс iLink", value: "Барс iLink" },
  { label: "iLink Net-2", value: "iLink Net-2" },
  { label: "iLink Net-X", value: "iLink Net-X" },
  { label: "iLink Telecom", value: "iLink Telecom" },
  { label: "Telecom-17", value: "Telecom-17" },
]);

const filterDate = (date) => {
  if (!date) return "";
  return new Intl.DateTimeFormat("kz-KZ", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Almaty",
  }).format(date);
};

const onSubmit = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
    await ordersApi.add({ ...order.value });
    $q.notify({
      message: "Заявка успешно добавлена",
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
