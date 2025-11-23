<script setup lang="ts">
import { ref } from 'vue';
import { exec, getCodeOptions } from '@web-test/common';
import PlayGround from '@/components/PlayGround.vue';

const codeContent = ref('');
const codeOptions = ref<any[]>([]);

const codes = import.meta.glob<string>('#/codes/g6-v4/**/*.js', {
  eager: true,
  query: 'raw',
  import: 'default',
});
codeOptions.value = getCodeOptions(codes);

function handleEval(code: string) {
  exec(code);
}
</script>

<template>
  <PlayGround v-model="codeContent" :code-options="codeOptions" @eval="handleEval">
    <div id="g6v4-container" class="flex-1"></div>
  </PlayGround>
</template>

<script lang="ts">
export const meta = { title: 'antv/g6(4.x)测试' };
</script>
