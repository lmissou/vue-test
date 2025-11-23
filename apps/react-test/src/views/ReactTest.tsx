import { useState } from 'react';
import { compileJsx, execReact, getCodeOptions } from '@web-test/common';
import PlayGround from '@/components/PlayGround';

const codes = import.meta.glob<string>('#/codes/react/**/*.jsx', {
  eager: true,
  query: 'raw',
  import: 'default',
});

function VueTest() {
  const [codeContent, setCodeContent] = useState('');
  const [codeOptions] = useState<any[]>(() => getCodeOptions(codes));
  function handleEval(codeStr: string) {
    const result = compileJsx(codeStr);
    execReact(result, '#v-root');
  }
  return (
    <PlayGround value={codeContent} codeOptions={codeOptions} onChange={setCodeContent} onEval={handleEval}>
      <div className="flex-1">
        <div id="v-root"></div>
      </div>
    </PlayGround>
  );
}

export default VueTest;
export const meta = {
  title: 'react测试',
};
