import { useState } from 'react';
import { compileVue, execVue, getCodeOptions } from '@web-test/common';
import PlayGround from '@/components/PlayGround';

const codes = import.meta.glob<string>('#/codes/vue/**/*.vue', {
  eager: true,
  query: 'raw',
  import: 'default',
});

function VueTest() {
  const [codeContent, setCodeContent] = useState('');
  const [codeOptions] = useState<any[]>(() => getCodeOptions(codes));
  const [styles, setStyles] = useState<any[]>([]);
  function handleEval(code: string) {
    const id = 'test';
    const result = compileVue(code, id);
    setStyles(result.styles);
    const { render, component } = result;
    execVue(id, '#v-root', { render, component });
  }
  return (
    <PlayGround value={codeContent} codeOptions={codeOptions} editorOptions={{ language: 'html' }} onChange={setCodeContent} onEval={handleEval}>
      <div className="flex-1">
        {styles.map((item, index) => (
          <style key={index}>{item.code}</style>
        ))}
        <div id="v-root"></div>
      </div>
    </PlayGround>
  );
}

export default VueTest;
export const meta = {
  title: 'vue测试',
};
