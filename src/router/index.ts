import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import loginView from "../views/loginView.vue";
import AppLayout from "@/layout/AppLayout.vue";
import TopicSearchView from "@/views/manage-article/TopicSearchView.vue";
import WriteView from "@/views/manage-article/WriteView.vue";
import UpdateAricleView from "@/views/manage-article/UpdateAticleView.vue";
import ArticlesView from "@/views/manage-article/ArticlesView.vue";
import CommentView from "@/views/manage-article/CommentView.vue";
import FollowersView from "@/views/statistics/FollowersView.vue";
import ReadArticleView from "@/views/statistics/ReadArticleView.vue";
import VisitorProfileView from "@/views/statistics/VisitorProfileView.vue";
import SavesView from "@/views/statistics/SavesView.vue";
import AccountView from "@/views/settings/AccountView.vue";
import PasswordView from "@/views/settings/PasswordView.vue";
import NotificationView from "@/views/settings/NotificationView.vue";
import UsersListeView from "@/views/Users/UsersListeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: AppLayout,
    children: [
      {
        path: "/",
        name: "home",
        component: HomeView,
      },
      {
        path: "/write",
        name: "write",
        component: WriteView,
      },
      {
        path: "/articles",
        name: "articles",
        component: ArticlesView,
      },
      {
        path: "/update/:id",
        name: "update",
        component: UpdateAricleView,
      },
      {
        path: "/topic-search",
        name: "topic-search",
        component: TopicSearchView,
      },
      {
        path: "/comments",
        name: "comments",
        component: CommentView,
      },
      {
        path: "statistics/profile-vistor",
        name: "vistor-profile",
        component: VisitorProfileView,
      },
      {
        path: "statistics/saves",
        name: "saves",
        component: SavesView,
      },
      {
        path: "statistics/read-article",
        name: "read-article",
        component: ReadArticleView,
      },
      {
        path: "statistics/followers",
        name: "followers",
        component: FollowersView,
      },
      {
        path: "settings/account",
        name: "account",
        component: AccountView,
      },
      {
        path: "settings/password",
        name: "password",
        component: PasswordView,
      },
      {
        path: "settings/notification",
        name: "notification",
        component: NotificationView,
      },
      // users
      {
        path: "users",
        name: "users",
        component: UsersListeView,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: loginView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
