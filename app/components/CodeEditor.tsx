'use client';

import { useState, useEffect, useRef } from 'react';
import { Resizable } from 're-resizable';
import EditorPane from './EditorPane';

export default function CodeEditor() {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [output, setOutput] = useState('');
  const [editorHeight, setEditorHeight] = useState('50vh');
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOutput(`
        <html>
          <head>
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>${js}</script>
          </body>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <div className="h-screen flex flex-col">
      <Resizable
        size={{ width: '100%', height: editorHeight }}
        onResizeStop={(e, direction, ref, d) => {
          setEditorHeight(`calc(${editorHeight} + ${d.height}px)`);
        }}
        enable={{ bottom: true }}
        minHeight="20vh"
        maxHeight="80vh"
      >
        <div className="flex h-full">
          <EditorPane language="html" value={html} onChange={(value) => setHtml(value ?? '')} />
          <EditorPane language="css" value={css} onChange={(value) => setCss(value ?? '')} />
          <EditorPane language="javascript" value={js} onChange={(value) => setJs(value ?? '')} />
        </div>
      </Resizable>
      <div ref={resultRef} className="flex-grow bg-white">
        <iframe
          title="output"
          sandbox="allow-scripts"
          srcDoc={output}
          className="w-full h-full border-none"
        />
      </div>
    </div>
  );
}