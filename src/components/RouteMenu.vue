<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ElMenu, ElMenuItem } from 'element-plus';

const router = useRouter();
const routes = router.getRoutes();

function handleMenuSelect(path: string) {
  router.push(path);
}

(window as any).router = router;
</script>

<template>
  <ElMenu @select="handleMenuSelect" class="grow">
    <ElMenuItem v-for="route in routes" :key="route.path" :index="route.path">
      {{ route.meta?.title || route.name }}
    </ElMenuItem>
  </ElMenu>
</template>
