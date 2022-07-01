import React, { useEffect, useState } from 'react';

export default function useEditorSelection(editor) {
  const [selection, setSelection] = useState({ to: 0, from: 0 });
  const onSelectionUpdate = ({ editor }) => {
    setSelection({
      to: editor.view.state.selection.to,
      from: editor.view.state.selection.from,
    });
  };

  useEffect(() => {
    if (!editor) return;
    editor.on('selectionUpdate', onSelectionUpdate);
    return () => editor.off('selectionUpdate', onSelectionUpdate);
  }, [editor]);

  return selection;
}
