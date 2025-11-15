<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as monaco from 'monaco-editor';
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import { NButton, NButtonGroup, NSplit } from 'naive-ui';

const props = withDefaults(
  defineProps<{
    containerId?: string;
    initValue?: string;
    editorOptions?: any;
    beforeEvalCode?: (code: string) => string;
  }>(),
  {
    containerId: 'container',
    initValue: '',
  }
);

if (!window.MonacoEnvironment) {
  window.MonacoEnvironment = {
    getWorker(_workerId, label) {
      if (label === 'javascript' || label === 'typescript') {
        return new TsWorker();
      }
      if (label === 'html') {
        return new HtmlWorker();
      }
      return new EditorWorker();
    },
  };
}
const defaultOptions = {
  automaticLayout: true,
  tabSize: 2,
  language: 'javascript',
};

let subAppRoot: HTMLDivElement;
let editor: monaco.editor.IStandaloneCodeEditor;
const modelValue = ref(props.initValue);

const editorDom = ref<HTMLDivElement>();
const resultDom = ref<HTMLDivElement>();

function initEditor() {
  if (editor) {
    return;
  }
  editor = monaco.editor.create(
    editorDom.value!,
    Object.assign({ ...defaultOptions }, props.editorOptions)
  );
  editor.setValue(modelValue.value);
  editor.onDidChangeModelContent(() => {
    modelValue.value = editor.getValue();
  });
}
function initSubApp() {
  subAppRoot = document.createElement('div');
  subAppRoot.id = props.containerId;
  subAppRoot.style.flexGrow = '1';
  subAppRoot.style.overflow = 'hidden';
  resultDom.value!.innerHTML = '';
  resultDom.value!.append(subAppRoot);
}

function evalScript(codeStr: string) {
  initSubApp();
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

onMounted(() => {
  initEditor();
  evalScript(modelValue.value);
});
</script>

<template>
  <div class="flex flex-col grow">
    <NButtonGroup size="small">
      <NButton text @click="evalScript(modelValue)">运行</NButton>
    </NButtonGroup>
    <NSplit pane1-class="flex flex-col" pane2-class="flex flex-col">
      <template #1>
        <div ref="editorDom" class="grow"></div>
      </template>
      <template #2>
        <div ref="resultDom" class="flex flex-col grow p-[10px]" />
      </template>
    </NSplit>
  </div>
</template>
