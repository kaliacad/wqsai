import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";

export  function MonacoEditor({ text }) {
  const editorRef = useRef(null);
  const safeText = typeof text === "string" ? text : "";
  const query = safeText.replace("```sparql", "").replace("```", "");
  const [currentValue, setCurrentValue] = useState(query);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  // keep editor in sync when new SPARQL text arrives (e.g., from AI)
  useEffect(() => {
    setCurrentValue(query);
  }, [query]);

  return (
    <div className="flex-1 h-full min-h-0 flex flex-col">
      <Editor
        className="flex-1 min-h-0"
        height="300px"
        defaultLanguage="sparql"
        value={currentValue}
        onChange={(value) => setCurrentValue(value || "")}
        onMount={handleEditorDidMount}
        theme="vs-light"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: "on",
          folding: true,
          lineDecorationsWidth: 10,
          lineNumbersMinChars: 3,
          readOnly: false,
        }}
      />
    </div>
  );
}
