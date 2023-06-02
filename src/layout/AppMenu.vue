<script setup>
import { ref } from "vue";

import AppMenuItem from "./AppMenuItem.vue";

const model = ref([
  {
    label: "Home",
    items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }],
  },
  {
    label: "Aricles manage",
    items: [
      { label: "Write", icon: "pi pi-fw pi-pencil", to: "/write" },
      {
        label: "Topic Search",
        icon: "pi pi-fw pi-search",
        to: "/topic-search",
      },
      { label: "My Articles", icon: "pi pi-fw pi-list", to: "/articles" },
      {
        label: "My Page",
        icon: "pi pi-fw pi-id-card",
        to: "/profile-dyal-code-blog",
        target: "_blank",
      },

      {
        label: "comments",
        icon: "pi pi-fw pi-comments",
        to: "/comments",
      },
    ],
  },
  {
    label: "Statistics",
    items: [
      {
        label: "Profile Vistor",
        icon: "pi pi-fw pi-eye",
        to: "/statistics/profile-vistor",
        badge: "NEW",
      },
      {
        label: "Followers",
        icon: "pi pi-fw pi-user-plus",
        to: "/statistics/followers",
        badge: "NEW",
      },
      {
        label: "Saves",
        icon: "pi pi-fw pi-bookmark",
        to: "/statistics/saves",
        badge: "NEW",
      },
      {
        label: "Read Article",
        icon: "pi pi-fw pi-eye",
        to: "/statistics/read-article",
        target: "NEW",
      },
    ],
  },
  {
    label: "Settings",
    items: [
      {
        label: "Account Setting",
        icon: "pi pi-fw pi-user-edit",
        to: "/settings/account",
      },
      {
        label: "Password Setting",
        icon: "pi pi-fw pi-lock",
        to: "/settings/password",
      },
      {
        label: "Notification Setting",
        icon: "pi pi-fw pi-bell",
        to: "/settings/notification",
      },
    ],
  },
  {
    label: "Users",
    items: [
      {
        label: "Users Liste",
        icon: "pi pi-fw pi-users",
        to: "/users",
      },
    ],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
