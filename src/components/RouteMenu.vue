<script setup lang="ts">
import { NMenu } from 'naive-ui';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const routes = router.getRoutes();

const menus = computed(() =>
  routes.map((route) => ({
    key: route.path,
    label: route.meta?.title ?? route.path,
  }))
);

function handleMenuSelect(path: string) {
  router.push(path);
}

(window as any).router = router;
</script>

<template>
  <NMenu class="grow" :options="menus" @update:value="handleMenuSelect" />
</template>
