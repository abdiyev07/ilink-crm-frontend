<template>
  <section class="section">
    <h4 class="section__title section__title_centered">
      Потенциальные клиенты
    </h4>
    <div class="flex mb-2">
      <GoBackIcon back-route-name="main.home" />
      <AddClientModal class="q-ml-auto" @refetch="fetchClients" />
    </div>
    <q-form @submit.prevent="addQuery" class="row align-center q-gutter-md">
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
                      <q-item-section>Изменить данные</q-item-section>
                    </q-item>
                    <q-item @click="deleteClient(props.row)" clickable>
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
    <UpdateClientModal ref="updateClientModalRef" />
  </section>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import clientsApi from "@/api/clients.api";
import GoBackIcon from "@/components/icon-components/GoBackIcon";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import AddClientModal from "@/views/Clients/components/AddClientModal.vue";
import UpdateClientModal from "@/views/Clients/components/UpdateClientModal.vue";

export default defineComponent({
  name: "ClientsPage",
  components: {
    UpdateClientModal,
    AddClientModal,
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
    const phoneNumber = ref("");
    const updateClientModalRef = ref(null);
    const columns = [
      {
        name: "id",
        align: "left",
        label: "Номер",
        field: "id",
      },
      {
        name: "phone_number",
        required: true,
        label: "Номер телефона",
        align: "center",
        field: (row) => row.phone_number,
        format: (val) => `${val}`,
      },
      {
        name: "full_name",
        align: "center",
        label: "ФИО",
        field: "full_name",
      },
      {
        name: "processed_employee_name",
        align: "center",
        label: "ФИО сотрудника",
        field: "processed_employee_name",
      },
      {
        name: "tariff_name",
        align: "center",
        label: "Тариф",
        field: "tariff_name",
      },
      {
        name: "has_tv",
        align: "center",
        label: "Имеется ТВ",
        field: "has_tv",
        format: (val) => (val ? "Да" : "Нет"),
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

      await router.push({ query });
      await fetchClients();
    };

    const formatDate = (date) => {
      if (!date) return "";
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "Asia/Almaty",
      };

      return new Intl.DateTimeFormat("kk-KK", options).format(new Date(date));
    };

    const showUpdateOrderModal = (orderData) => {
      updateClientModalRef.value.openModal(orderData);
    };

    const changePage = async (newPage) => {
      await router.push({ query: { page: newPage } });
      await fetchClients();
    };

    const list = ref([]);

    const getQueryForRequest = () => {
      const query = {
        page: pagination.value.page,
      };

      if (phoneNumber.value) {
        query.phoneNumber = phoneNumber.value;
      }

      return query;
    };

    const fetchClients = async () => {
      try {
        isLoading.value = true;
        const { data } = await clientsApi.getList(getQueryForRequest());
        pagination.value.page = Number(data?.current_page) || 1;
        pagination.value.rowsPerPage = Number(data?.per_page) || 20;
        pagesNumber.value = Number(data?.last_page) || 1;
        list.value = data.data;
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(async () => {
      if (route.query.phoneNumber) {
        phoneNumber.value = route.query.phoneNumber;
      }
      await fetchClients();
    });

    const deleteClient = (client) => {
      $q.dialog({
        title: "Удалить клиента",
        message: `Вы действительно хотите удалить клиента с ID ${client.id}?`,
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await clientsApi.delete(client.id);
        $q.notify({
          message: "Клиент успешно удалена",
          position: "top-right",
          timeout: 3500,
          icon: "done",
        });
        await fetchClients();
      });
    };

    return {
      isLoading,
      phoneNumber,
      columns,
      list,
      pagination,
      pagesNumber,
      updateClientModalRef,
      addQuery,
      deleteClient,
      changePage,
      showUpdateOrderModal,
      fetchClients,
    };
  },
});
</script>
