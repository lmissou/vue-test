import { useEffect, useImperativeHandle, useRef, type Ref } from 'react';
import * as monaco from 'monaco-editor';
import '@/common/initMonaco';

type EditorRef = {
  editor: monaco.editor.IStandaloneCodeEditor | null;
};

type Props = {
  value: string;
  onChange: (val: string) => void;
  editorOptions?: any;
  ref?: Ref<EditorRef>;
};

const defaultOptions = {
  automaticLayout: true,
  tabSize: 2,
  language: 'javascript',
};

function MonacoEditor(props: Props) {
  const editor = useRef<monaco.editor.IStandaloneCodeEditor>(null);
  const editorDom = useRef<HTMLDivElement>(null);
  function initEditor() {
    if (editor.current) {
      return;
    }
    editor.current = monaco.editor.create(editorDom.current!, Object.assign({ ...defaultOptions }, props.editorOptions));
    editor.current?.onDidChangeModelContent(() => {
      props.onChange(editor.current?.getValue() ?? '');
    });
  }
  useImperativeHandle(props.ref, () => ({
    editor: editor.current,
  }));
  useEffect(() => {
    const editorValue = editor.current?.getValue();
    if (editorValue === props.value) {
      return;
    }
    editor.current?.setValue(props.value);
  }, [props.value]);
  useEffect(() => {
    initEditor();
  }, []);
  return <div ref={editorDom} className="flex-1 min-w-0 min-h-0"></div>;
}

export default MonacoEditor;
