import { useState } from 'react';
import { exec, getCodeOptions } from '@web-test/common';
import PlayGround from '@/components/PlayGround';

const codes = import.meta.glob<string>('#/codes/g6-v4/**/*.js', {
  eager: true,
  query: 'raw',
  import: 'default',
});

function G6Test() {
  const [codeContent, setCodeContent] = useState('');
  const [codeOptions] = useState<any[]>(() => getCodeOptions(codes));
  function handleEval(code: string) {
    exec(code);
  }
  return (
    <PlayGround value={codeContent} codeOptions={codeOptions} onChange={setCodeContent} onEval={handleEval}>
      <div id="g6v4-container" className="flex-1"></div>
    </PlayGround>
  );
}

export default G6Test;
export const meta = {
  title: 'g6(4.x)测试',
};
