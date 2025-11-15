<script setup lang="ts">
import PlayGround from '@/components/PlayGround.vue';
import initValue from './code.js?raw';
</script>

<template>
  <PlayGround container-id="g6v4-container" :init-value="initValue" />
</template>

<script lang="ts">
export const meta = { title: 'antv/g6(4.x)测试' };
</script>
