<template>
  <!--  <q-btn @click="openModal" color="primary" no-caps label="Добавить заявку" />-->
  <q-btn class="q-ml-auto" @click="openModal">Сгенерировать Excel</q-btn>
  <q-dialog v-model="isModalVisible">
    <q-card>
      <div class="q-pa-md" style="min-width: 550px; min-height: 350px">
        <q-form @submit.prevent="onSubmit" class="q-gutter-md">
          <CustomDatePicker v-show="!isLoading" @datePicked="setDates" />
          <q-card-actions align="center">
            <q-btn
              label="Сгенерировать"
              type="submit"
              color="primary"
              :disable="isDatesPicked"
              :loading="isLoading"
            />
          </q-card-actions>
        </q-form>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { useQuasar } from "quasar";
import ordersApi from "@/api/order.api";
import CustomDatePicker from "@/components/common/DatePicker.vue";
import { downloadBlob } from "@/helpers/utils/download.utils";
import { formatBlobErrorToMsg } from "@/helpers/utils/format.utils";

const $q = useQuasar();
const isModalVisible = ref(false);
const isLoading = ref(false);

const dates = reactive({
  from: "",
  to: "",
});
const isDatesPicked = computed(() => {
  return !dates.from;
});

const setDates = (pickedDates) => {
  dates.from = pickedDates.start.toISOString().split("T")[0];
  dates.to = pickedDates.end.toISOString().split("T")[0];
};

const onSubmit = async () => {
  if (isLoading.value) return;
  isLoading.value = true;
  try {
    const response = await ordersApi.generateExcel({
      start: dates.from,
      end: dates.to,
    });
    $q.notify({
      message: "Клиент успешно добавлена",
      position: "top-right",
      timeout: 5000,
      icon: "done",
    });
    const fileName = `ilink-orders_${dates.from}-${dates.to}.xlsx`;
    downloadBlob(response, fileName);
    hideModal();
  } catch (e) {
    await formatBlobErrorToMsg(e);
  } finally {
    isLoading.value = false;
  }
};

const openModal = () => {
  isModalVisible.value = true;
};

const hideModal = () => {
  dates.from = "";
  dates.to = "";
  isModalVisible.value = false;
};
</script>
