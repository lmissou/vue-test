<script setup lang="ts">
import PlayGround from '@/components/PlayGround.vue';
import initValue from './code.js?raw';
</script>

<template>
  <PlayGround container-id="echarts-container" :init-value="initValue" />
</template>

<script lang="ts">
export const meta = { title: 'echarts测试' };
</script>
