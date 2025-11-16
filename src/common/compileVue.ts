import {
  parse,
  compileScript,
  compileStyle,
  compileTemplate,
} from 'vue/compiler-sfc';

// 编译vue组件
export function compile(codeStr: string, id: string = 'tmp') {
  const styleDoms: any[] = [];
  const parseResult = parse(codeStr, {
    filename: id,
  });
  const descriptor = parseResult.descriptor;
  // 样式是否有scoped
  let scoped = false;
  // 处理新样式，添加到head
  descriptor.styles.forEach((style) => {
    if (style.scoped) {
      scoped = true;
    }
    const styleResult = compileStyle({
      id,
      source: style.content,
      scoped: !!style.scoped,
      filename: id,
    });
    const dom = document.createElement('style');
    dom.innerHTML = styleResult.code;
    document.head.append(dom);
    styleDoms.push(dom);
  });
  // 编译组件代码和模板
  const script = compileScript(descriptor, { id });
  const scriptResult = script.content.replace(
    'export default ',
    'const _sfc_main = '
  );
  // 编译模板
  const template = compileTemplate({
    id,
    filename: id,
    source: descriptor.template?.content ?? '',
    scoped,
    compilerOptions: {
      bindingMetadata: {
        ...script.bindings,
        __isScriptSetup: script.setup ? true : undefined,
      } as any,
    },
  });
  const templateResult = template.code.replace(
    'export function render',
    `const _sfc_render = function render`
  );
  function destroy() {
    // 移除旧的样式
    styleDoms.forEach((dom) => {
      if (dom.parentNode === document.head) {
        document.head.removeChild(dom);
      }
    });
    styleDoms.splice(0);
  }
  const result = `${scriptResult}
${templateResult}

_sfc_main.render = _sfc_render;
_sfc_main.__scopeId = 'data-v-${id}';
const ${id} = defineComponent(_sfc_main);

`;
  // const result = `${scriptResult}\n\n`;
  return { result, destroy };
}

export function mount(result: string, containerId: string, id: string = 'tmp') {
  return `import { createApp, defineComponent } from 'vue';
import * as Vue from 'vue';

${result}

const app = createApp(${id});
app.mount('${containerId}');`;
}
