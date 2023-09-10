import { RouteRecordRaw } from "vue-router";
import MainLayout from "@/layout/MainLayout.vue";
import EmptyLayout from "@/layout/EmptyLayout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/auth",
    component: EmptyLayout,
    redirect: "/auth/login",
    children: [
      {
        path: "login",
        name: "auth.login",
        component: () =>
          import(
            /* webpackChunkName: "LoginPage" */ "@/views/Auth/LoginPage.vue"
          ),
      },
    ],
  },
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "main.home",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "MainPage" */ "@/views/Main/MainPage.vue"
          ),
      },
      {
        path: "orders",
        name: "main.orders",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "OrdersPage" */ "@/views/Order/OrdersPage.vue"
          ),
      },
      {
        path: "clients",
        name: "main.clients",
        meta: {
          requiresAuth: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "ClientsPage" */ "@/views/Clients/ClientsPage.vue"
          ),
      },
      // {
      //   path: "transfer-money",
      //   name: "main.transfer-money",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "TransactionsPage" */ "@/views/MoneyTransfer/MoneyTransferPage.vue"
      //     ),
      // },
      // {
      //   path: "feedback-messages",
      //   name: "main.feedback-messages",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "TransactionsPage" */ "@/views/FeedbackMessages/FeedbackMessages.vue"
      //     ),
      // },
      // {
      //   path: "wipon-users",
      //   name: "main.wipon-users",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "MainPage" */ "@/views/WiponUsers/WiponUsersPage.vue"
      //     ),
      // },
      // {
      //   path: "wipon-users/:id",
      //   name: "main.wipon-users-details",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "MainPage" */ "@/views/WiponUsers/WiponUserDetailsPage.vue"
      //     ),
      // },
      // {
      //   path: "reports",
      //   name: "main.reports",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "ReportsPage" */ "@/views/Reports/ReportsPage.vue"
      //     ),
      // },
      // {
      //   path: "reports/activations",
      //   name: "main.reports.activations",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "ActivationsReportPage" */ "@/views/Reports/pages/ActivationsReportPage.vue"
      //     ),
      // },
      // {
      //   path: "reports/refills",
      //   name: "main.reports.refills",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "RefillsReportPage" */ "@/views/Reports/pages/RefillsReportPage.vue"
      //     ),
      // },
      // {
      //   path: "reports/refunds",
      //   name: "main.reports.refunds",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "RefundsReportPage" */ "@/views/Reports/pages/RefundsReportPage.vue"
      //     ),
      // },
      // {
      //   path: "reports/expiring-subs",
      //   name: "main.reports.expiring-subs",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "ExpiringSubsReportPage" */ "@/views/Reports/pages/ExpiringSubsReportPage.vue"
      //     ),
      // },
      // {
      //   path: "reports/expired-subs",
      //   name: "main.reports.expired-subs",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "ExpiringSubsReportPage" */ "@/views/Reports/pages/AlreadyExpiredSubsReportPage.vue"
      //     ),
      // },
      // {
      //   path: "reports/balance-info",
      //   name: "main.reports.balance-info",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "BalanceInfoPage" */ "@/views/Reports/pages/BalanceInfoPage.vue"
      //     ),
      // },
      // {
      //   path: "licenses",
      //   name: "main.licenses",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "LicensesPage" */ "@/views/Licenses/LicensesPage.vue"
      //     ),
      // },
      // {
      //   path: "licenses/add",
      //   name: "main.licenses.add",
      //   meta: {
      //     requiresAuth: true,
      //   },
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "AddLicensePage" */ "@/views/Licenses/AddLicensePage.vue"
      //     ),
      // },
    ],
  },
];

export default routes;
