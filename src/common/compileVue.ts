import { parse, compileScript, compileStyle } from 'vue/compiler-sfc';

// 编译vue组件
export function compile(codeStr: string, id: string = 'tmp') {
  const styleDoms: any[] = [];
  const parseResult = parse(codeStr);
  const descriptor = parseResult.descriptor;
  // 样式是否有scoped
  let scoped = false;
  // 处理新样式，添加到head
  descriptor.styles.forEach((style) => {
    if (style.attrs.scoped) {
      scoped = true;
    }
    const styleResult = compileStyle({
      id,
      source: style.content,
      scoped: !!style.attrs.scoped,
      filename: '',
    });
    const dom = document.createElement('style');
    dom.innerHTML = styleResult.code;
    document.head.append(dom);
    styleDoms.push(dom);
  });
  // 编译组件代码和模板
  const script = compileScript(descriptor, {
    id,
    inlineTemplate: true,
    templateOptions: { id, scoped, slotted: true, filename: '' },
  });
  const result = script.content.replace('export default ', `const ${id} = `);
  function destroy() {
    // 移除旧的样式
    styleDoms.forEach((dom) => {
      if (dom.parentNode === document.head) {
        document.head.removeChild(dom);
      }
    });
    styleDoms.splice(0);
  }
  return { result, destroy };
}

export function mount(result: string, id: string = 'tmp') {
  return `import { createApp } from 'vue';
import * as Vue from 'vue';
window.Vue = Vue;

${result}

const app = createApp(${id});
app.mount('#v-root');`;
}
