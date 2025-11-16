<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import * as monaco from 'monaco-editor';
import '@/common/initMonaco';

const props = withDefaults(
  defineProps<{
    editorOptions?: any;
  }>(),
  {
    editorOptions: () => ({}),
  }
);
const modelValue = defineModel<string>({ default: '' });

const defaultOptions = {
  automaticLayout: true,
  tabSize: 2,
  language: 'javascript',
};

let editor: monaco.editor.IStandaloneCodeEditor;

const editorDom = ref<HTMLDivElement>();

function initEditor() {
  if (editor) {
    return;
  }
  editor = monaco.editor.create(
    editorDom.value!,
    Object.assign({ ...defaultOptions }, props.editorOptions)
  );
  watch(
    () => modelValue.value,
    (val) => {
      const editorValue = editor.getValue();
      if (editorValue === val) {
        return;
      }
      editor.setValue(modelValue.value);
    },
    {
      immediate: true,
    }
  );
  editor.onDidChangeModelContent(() => {
    modelValue.value = editor.getValue();
  });
}
onMounted(() => {
  initEditor();
});
</script>

<template>
  <div ref="editorDom" class="flex-1"></div>
</template>
