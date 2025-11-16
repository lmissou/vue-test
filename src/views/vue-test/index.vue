<script setup lang="ts">
import { compile, mount } from '@/common/compileVue';
import PlayGround from '@/components/PlayGround.vue';
import initValue from './code.vue?raw';

let lastDestroy: Function;
function handleCodeStr(codeStr: string) {
  const id = 'testComp';
  if (lastDestroy) {
    lastDestroy();
  }
  const { result, destroy } = compile(codeStr, id);
  lastDestroy = destroy;
  return mount(result, '#v-root', id);
}
</script>

<template>
  <PlayGround
    container-id="v-root"
    :init-value="initValue"
    :editor-options="{ language: 'html' }"
    :before-eval-code="handleCodeStr"
  />
</template>

<script lang="ts">
export const meta = { title: 'vue测试' };
</script>
