<template>
  <!--  <q-btn class="q-ml-auto" @click="openModal">Изменить заявку</q-btn>-->
  <q-dialog v-model="isModalVisible">
    <q-card>
      <div class="q-pa-md" style="min-width: 550px">
        <div class="mb-3 bold">
          Изменение заявки номер {{ order.id || "" }}:
        </div>
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
          <DatePicker
            v-model="order.fixed_at"
            :popover="{ visibility: 'click' }"
          >
            <template v-slot="{ inputValue, togglePopover }">
              <div @click="togglePopover()" class="dates-range">
                <span v-show="!inputValue.start" class="dates-range__text">
                  Дата исправления
                </span>
                <span
                  v-show="order.fixed_at"
                  class="dates-range__text_selected"
                >
                  {{ filterDate(order.fixed_at) }}
                  <span @click.stop="order.fixed_at = ''" class="q-ml-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="18px"
                      viewBox="0 0 24 24"
                      width="18px"
                      fill="#000000"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path
                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                      />
                    </svg>
                  </span>
                </span>
              </div>
            </template>
          </DatePicker>
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
  fixed_at: "",
  id: null,
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
    await ordersApi.update(order.value.id, { ...order.value });
    console.log(order.value);
    $q.notify({
      message: "Заявка успешно изменена",
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

const openModal = (orderData) => {
  if (orderData.fixed_at) {
    orderData.fixed_at = new Date(orderData.fixed_at);
  }
  order.value = orderData;
  isModalVisible.value = true;
};

const hideModal = () => {
  order.value = {
    contact_phone_number: "",
    work_type: "",
    client_type: "",
    status: "",
    csi: "",
    executors: "",
    address: "",
    is_free: true,
    breakdown_reason: "",
    fixed_at: "",
    id: null,
  };
  isModalVisible.value = false;
};

defineExpose({
  openModal,
});
</script>

<style lang="scss">
.dates-range {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.375rem;
  color: grey;
  cursor: pointer;
  margin-top: 5px;

  &__text {
    &_selected {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #000;
    }
  }
}
</style>
