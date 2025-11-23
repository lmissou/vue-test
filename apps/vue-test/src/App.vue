<script setup lang="ts">
import type { GlobalThemeOverrides } from 'naive-ui';
import Layout from './components/Layout.vue';
import RouteMenu from './components/RouteMenu.vue';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#409EFF',
    primaryColorHover: '#409EFF',
    primaryColorPressed: '#409EFF',
  },
};
</script>

<template>
  <NConfigProvider class="flex flex-col flex-1 overflow-auto" :theme-overrides="themeOverrides">
    <Layout>
      <template #aside>
        <RouteMenu />
      </template>
      <template #default>
        <RouterView />
      </template>
    </Layout>
  </NConfigProvider>
</template>
