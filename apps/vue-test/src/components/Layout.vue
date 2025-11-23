<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutSider } from 'naive-ui';
import { useLayoutStore } from '@/store/layout';

const { siderCollapsed } = storeToRefs(useLayoutStore());
</script>

<template>
  <NLayout content-class="flex flex-col">
    <NLayoutHeader class="flex flex-row items-center min-h-10 px-4" bordered> 代码测试 </NLayoutHeader>
    <NLayout has-sider content-class="bg-[#f3f3f3]">
      <NLayoutSider show-trigger="arrow-circle" :collapsed-width="0" v-model:collapsed="siderCollapsed">
        <slot name="aside" />
      </NLayoutSider>
      <NLayoutContent class="m-2.5 rounded-md bg-white" content-class="flex flex-col">
        <slot name="default" />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
