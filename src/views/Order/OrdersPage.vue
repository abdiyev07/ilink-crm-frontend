<template>
  <section class="section">
    <h4 class="section__title section__title_centered">Заявки</h4>
    <div class="flex mb-2">
      <GoBackIcon back-route-name="main.home" />
      <AddOrderModal @refetch="fetchOrders" />
    </div>
    <q-form @submit.prevent="addQuery" class="row align-center q-gutter-md">
      <q-input filled v-model="orderId" label="Номер заявки" lazy-rules />

      <q-input filled v-model="phoneNumber" label="Номер телефона" lazy-rules />

      <div>
        <q-btn
          label="Поиск"
          type="submit"
          color="primary"
          :loading="isLoading"
        />
      </div>
    </q-form>
    <div class="mb-2 flex justify-end">
      <GenerateExcelOfOrdersListModal />
    </div>
    <div class="q-mt-lg">
      <q-table
        :loading="isLoading"
        :columns="columns"
        :rows="list"
        row-key="id"
        hide-no-data
        style="width: 100%"
        :pagination="pagination"
        hide-pagination
      >
        <template v-slot:body-cell-action="props">
          <q-tr :props="props">
            <q-td key="action" :props="props" class="full-width">
              <q-btn color="grey-7" round flat icon="more_vert">
                <q-menu cover auto-close>
                  <q-list>
                    <q-item @click="showUpdateOrderModal(props.row)" clickable>
                      <q-item-section>Изменить заявку</q-item-section>
                    </q-item>
                    <q-item @click="deleteOrder(props.row)" clickable>
                      <q-item-section>Удалить</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        :max-pages="6"
        size="sm"
        @update:model-value="changePage"
      />
    </div>
    <UpdateOrderModal ref="updateOrderRef" @refetch="fetchOrders" />
  </section>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import ordersApi from "@/api/order.api";
import GoBackIcon from "@/components/icon-components/GoBackIcon";
import { useRoute, useRouter } from "vue-router";
import AddOrderModal from "@/views/Order/components/AddOrderModal.vue";
import { useQuasar } from "quasar";
import UpdateOrderModal from "@/views/Order/components/UpdateOrderModal.vue";
import GenerateExcelOfOrdersListModal from "@/views/Order/components/GenerateExcelOfOrdersListModal.vue";

export default defineComponent({
  name: "OrdersPage",
  components: {
    GenerateExcelOfOrdersListModal,
    UpdateOrderModal,
    AddOrderModal,
    GoBackIcon,
  },
  beforeRouteEnter(to, from, next) {
    if (!to.query.page) {
      return next({ name: to.name, query: { page: 1 } });
    }
    next();
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();
    const isLoading = ref(false);
    const updateOrderRef = ref(null);
    const orderId = ref("");
    const phoneNumber = ref("");
    const columns = [
      {
        name: "id",
        align: "left",
        label: "Номер",
        field: "id",
      },
      {
        name: "contact_phone_number",
        required: true,
        label: "Номер телефона",
        align: "center",
        field: (row) => row.contact_phone_number,
        format: (val) => `${val}`,
      },
      {
        name: "fixed_at",
        align: "center",
        label: "Дата устранения",
        field: "fixed_at",
        format: (val) => formatDate(val, true),
      },
      {
        name: "is_free",
        align: "center",
        label: "Бесплатно/платно",
        field: "is_free",
        format: (val) => (val ? "Бесплатно" : "Платно"),
      },
      {
        name: "work_type",
        align: "center",
        label: "Тип работы",
        field: "work_type",
      },
      {
        name: "breakdown_reason",
        align: "center",
        label: "Причина",
        field: "breakdown_reason",
      },
      {
        name: "client_type",
        align: "center",
        label: "Тип клиента",
        field: "client_type",
      },
      {
        name: "status",
        align: "center",
        label: "Статус",
        field: "status",
      },
      {
        name: "csi",
        align: "center",
        label: "CSI",
        field: "csi",
      },
      {
        name: "client_uid",
        align: "center",
        label: "UID клиента",
        field: "client_uid",
      },
      {
        name: "sub_provider",
        align: "center",
        label: "Суб. провайдер",
        field: "sub_provider",
      },
      {
        name: "executors",
        align: "center",
        label: "Монтажная бригада",
        field: "executors",
      },
      {
        name: "address",
        align: "center",
        label: "Адрес",
        field: "address",
      },
      {
        name: "created_at",
        align: "center",
        label: "Дата создания заявки",
        field: "created_at",
        format: (val) => formatDate(val),
      },
      {
        name: "action",
        align: "left",
        label: "Действия",
        field: "action",
      },
    ];

    const pagination = ref({
      page: Number(route.query.page),
      rowsNumber: 1,
      rowsPerPage: 20,
    });

    const pagesNumber = ref(5);

    const addQuery = async () => {
      const query = { page: pagination.value.page };
      if (phoneNumber.value) {
        query.phoneNumber = phoneNumber.value;
      }
      if (orderId.value) {
        query.orderId = orderId.value;
      }

      await router.push({ query });
      await fetchOrders();
    };

    const formatDate = (date, showHours = true) => {
      if (!date) return "";
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "Asia/Almaty",
      };

      if (showHours) {
        options.hour = "2-digit";
        options.minute = "2-digit";
        options.second = "2-digit";
      }

      return new Intl.DateTimeFormat("kk-KK", options).format(new Date(date));
    };

    const showUpdateOrderModal = (orderData) => {
      updateOrderRef.value.openModal(orderData);
    };

    const changePage = async (newPage) => {
      await router.push({ query: { page: newPage } });
      await fetchOrders();
    };

    const list = ref([]);

    const getQueryForRequest = () => {
      const query = {
        page: pagination.value.page,
      };

      if (phoneNumber.value) {
        query.phoneNumber = phoneNumber.value;
      }
      if (orderId.value) {
        query.orderId = orderId.value;
      }

      return query;
    };

    const fetchOrders = async () => {
      try {
        isLoading.value = true;
        const { data } = await ordersApi.getList(getQueryForRequest());
        pagination.value.page = Number(data?.current_page) || 1;
        pagination.value.rowsPerPage = Number(data?.per_page) || 20;
        pagesNumber.value = Number(data?.last_page) || 1;
        list.value = data.data;
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(async () => {
      if (route.query.orderId) {
        orderId.value = route.query.orderId;
      }
      if (route.query.phoneNumber) {
        phoneNumber.value = route.query.phoneNumber;
      }
      await fetchOrders();
    });

    const deleteOrder = (order) => {
      $q.dialog({
        title: "Удалить заявку",
        message: `Вы действительно хотите удалить заявку с ID ${order.id}?`,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await ordersApi.delete(order.id);
        $q.notify({
          message: "Заявка успешно удалена",
          position: "top-right",
          timeout: 3500,
          icon: "done",
        });
        await fetchOrders();
      });
    };

    return {
      isLoading,
      phoneNumber,
      orderId,
      columns,
      list,
      pagination,
      pagesNumber,
      updateOrderRef,
      addQuery,
      deleteOrder,
      changePage,
      showUpdateOrderModal,
      fetchOrders,
    };
  },
});
</script>
