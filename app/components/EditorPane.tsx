'use client';

import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';

type EditorPaneProps = {
  language: string;
  value: string;
  onChange: (value: string | undefined) => void;
};

export default function EditorPane({ language, value, onChange }: EditorPaneProps) {
  const getLanguageExtension = (language: string) => {
    switch (language) {
      case 'html':
        return [html()];
      case 'css':
        return [css()];
      case 'javascript':
        return [javascript()];
      default:
        return [];
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full rounded-lg shadow-lg overflow-hidden">
      <div className="bg-[#191919] text-white p-2 flex items-center rounded-t-lg">
        <img src={`/icons/${language}.png`} alt={language} className="w-6 h-6 mr-2" />
        <span className="uppercase">{language}</span>
      </div>
      <div className="flex-1 overflow-hidden">
        <CodeMirror
          value={value}
          height="100%"
          extensions={getLanguageExtension(language)}
          theme={tokyoNight}
          onChange={(value) => onChange(value)}
          className="h-full"
        />
      </div>
    </div>
  );
}