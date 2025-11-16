import { parse, compileTemplate } from 'vue/compiler-sfc';

const codeStr = `<template>
  <div class="test-wrap">
    <div>{{ val }}</div>
    <NButton @click="handleSubClick">-</NButton>
    <NButton @click="handleAddClick">+</NButton>
  </div>
</template>
`;

const container = document.getElementById('res-container');

const id = 'test1';
// 编译vue组件
const styleDoms = [];
const parseResult = parse(codeStr);
const descriptor = parseResult.descriptor;
// 编译模板
const result = compileTemplate(descriptor, { id, scoped: true, filename: 'test1-1' });
container.innerText = result.code;
