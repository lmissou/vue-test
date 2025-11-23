<script setup lang="ts">
import { ref } from 'vue';
import { compileJsx, execReact, getCodeOptions } from '@web-test/common';
import PlayGround from '@/components/PlayGround.vue';

const codeContent = ref('');
const codeOptions = ref<any[]>([]);

const codes = import.meta.glob<string>('#/codes/react/**/*.jsx', {
  eager: true,
  query: 'raw',
  import: 'default',
});
codeOptions.value = getCodeOptions(codes);

function handleEval(codeStr: string) {
  const result = compileJsx(codeStr);
  execReact(result, '#v-root');
}
</script>

<template>
  <PlayGround v-model="codeContent" :code-options="codeOptions" @eval="handleEval">
    <div class="flex-1">
      <div id="v-root"></div>
    </div>
  </PlayGround>
</template>

<script lang="ts">
export const meta = { title: 'react测试' };
</script>
