<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutSider } from 'naive-ui';
</script>

<template>
  <NLayout content-class="flex flex-col">
    <NLayoutHeader class="h-[40px]" bordered>header</NLayoutHeader>
    <NLayout class="bg-[#f3f3f3]" has-sider content-class="">
      <NLayoutSider show-trigger="arrow-circle" :collapsed-width="0">
        <slot name="aside" />
      </NLayoutSider>
      <NLayoutContent content-class="flex flex-col p-[10px] bg-[#f3f3f3]">
        <div class="flex flex-col grow p-[10px] rounded-md bg-white">
          <slot name="default" />
        </div>
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>
