<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { NSplit, NButton, NButtonGroup, NSelect } from 'naive-ui';
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
  <div class="flex flex-col grow">
    <NButtonGroup size="small" class="gap-1 mb-1">
      <slot name="toolbar" />
      <NSelect
        v-if="props.codeOptions.length > 0"
        v-model:value="codeSelect"
        size="tiny"
        style="width: 200px"
        :options="props.codeOptions"
        @update-value="handleCodeChange"
      />
      <NButton text @click="evalScript(modelValue)">运行</NButton>
    </NButtonGroup>
    <NSplit pane1-class="flex flex-col" pane2-class="flex flex-col">
      <template #1>
        <MonacoEditor
          v-model="modelValue"
          :editorOptions="props.editorOptions"
        />
      </template>
      <template #2>
        <slot name="default" v-if="showDefSlot" />
      </template>
    </NSplit>
  </div>
</template>
