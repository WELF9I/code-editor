'use client';

import { useState, useEffect, useRef } from 'react';
import { Resizable } from 're-resizable';
import EditorPane from './EditorPane';

export default function CodeEditor() {
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [javascript, setJavascript] = useState('');
  const [output, setOutput] = useState('');
  const [editorHeight, setEditorHeight] = useState('50vh');
  const resultRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const outputContent = `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${css}</style>
          </head>
          <body>
            ${html}
            <script>
              ${javascript}
            </script>
          </body>
        </html>
      `;

      setOutput(outputContent);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, javascript]);

  useEffect(() => {
    if (resultRef.current) {
      resultRef.current.srcdoc = output;
    }
  }, [output]);

  return (
    <div className="h-screen flex flex-col p-4">
      <Resizable
        size={{ width: '100%', height: editorHeight }}
        onResizeStop={(e, direction, ref, d) => {
          setEditorHeight(`calc(${editorHeight} + ${d.height}px)`);
        }}
        enable={{ bottom: true }}
        minHeight="20vh"
        maxHeight="80vh"
        className="bg-black rounded-lg shadow-lg"
      >
        <div className="flex flex-wrap h-full mb-5">
          <EditorPane language="html" value={html} onChange={(value) => setHtml(value ?? '')} />
          <EditorPane language="css" value={css} onChange={(value) => setCss(value ?? '')} />
          <EditorPane language="javascript" value={javascript} onChange={(value) => setJavascript(value ?? '')} />
        </div>
      </Resizable>
      <div ref={resultRef} className="flex-grow bg-white mt-4 rounded-lg shadow-lg overflow-hidden">
      <iframe
        title="output"
        sandbox="allow-scripts allow-popups allow-modals"
        srcDoc={output}
        className="w-full h-full border-none"
      ></iframe>
      </div>
    </div>
  );
}