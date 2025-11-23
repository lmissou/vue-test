// @ts-ignore
import babel from '@babel/standalone';

export default function compileJsx(codeStr: string) {
  const res = babel.transform(codeStr, { presets: ['react'] });
  return res?.code ?? '';
}
