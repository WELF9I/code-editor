'use client';

import { Editor } from '@monaco-editor/react';

type EditorPaneProps = {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
}

export default function EditorPane({ language, value, onChange }: EditorPaneProps) {
  return (
    <div className="flex-1 h-full">
      <div className="bg-gray-800 text-white p-2 flex items-center">
        <img src={`/icons/${language}.svg`} alt={language} className="w-5 h-5 mr-2" />
        <span className="uppercase">{language}</span>
      </div>
      <Editor
        height="calc(100% - 40px)"
        language={language}
        value={value}
        onChange={(value) => onChange(value ?? '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
        }}
      />
    </div>
  );
}