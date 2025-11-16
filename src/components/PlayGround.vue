<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { NSplit, NSelect, NIcon } from 'naive-ui';
import { VideoPlay } from '@element-plus/icons-vue';
import MonacoEditor from './MonacoEditor.vue';

const props = withDefaults(
  defineProps<{
    editorOptions?: any;
    beforeEvalCode?: (code: string) => string;
    codeOptions?: any[];
  }>(),
  {
    editorOptions: () => ({}),
    codeOptions: () => [],
  }
);
const modelValue = defineModel<string>({ default: '' });

const showDefSlot = ref(true);
function refreshDefSlot() {
  showDefSlot.value = false;
  nextTick(() => {
    showDefSlot.value = true;
  });
}
function evalScript(codeStr: string) {
  refreshDefSlot();
  const scriptDom = document.createElement('script');
  scriptDom.type = 'module';
  if (props.beforeEvalCode) {
    scriptDom.innerHTML = props.beforeEvalCode(codeStr);
  } else {
    scriptDom.innerHTML = codeStr;
  }
  document.head.append(scriptDom);
  document.head.removeChild(scriptDom);
}

const codeSelect = ref('');
if (props.codeOptions.length > 0) {
  codeSelect.value = props.codeOptions[0].value;
  modelValue.value = props.codeOptions[0].content;
}
function handleCodeChange(_value: string, option: any) {
  modelValue.value = option.content;
}

onMounted(() => {
  evalScript(modelValue.value);
});
</script>

<template>
  <div class="flex flex-col flex-1 overflow-auto">
    <div class="flex flex-row justify-start items-center gap-1 mb-1 text-base">
      <slot name="toolbar" />
      <NSelect
        v-if="props.codeOptions.length > 0"
        v-model:value="codeSelect"
        size="small"
        style="width: 200px"
        :options="props.codeOptions"
        @update-value="handleCodeChange"
      />
      <NIcon @click="evalScript(modelValue)">
        <VideoPlay />
      </NIcon>
    </div>
    <NSplit
      class="overflow-auto"
      pane1-class="flex flex-col"
      pane2-class="flex flex-col"
      :default-size="0.4"
    >
      <template #1>
        <MonacoEditor
          v-model="modelValue"
          :editorOptions="props.editorOptions"
        />
      </template>
      <template #2>
        <div class="flex flex-col flex-1 overflow-auto">
          <slot name="default" v-if="showDefSlot" />
        </div>
      </template>
    </NSplit>
  </div>
</template>
