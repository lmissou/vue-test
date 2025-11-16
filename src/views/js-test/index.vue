<script setup lang="ts">
import PlayGround from '@/components/PlayGround.vue';
import initValue from './code.js?raw';
</script>

<template>
  <PlayGround container-id="res-container" :init-value="initValue" />
</template>

<script lang="ts">
export const meta = { title: 'js测试' };
</script>
