import React from "react";
import { FTNode } from "../file-tree";

export default function useSelectedRows() {
  // TODO: Fix any
  let [selected, setSelected]: any = React.useState(new Set());

  function toggleSelection(e: React.MouseEvent, fsNode: FTNode) {
    if (selected.has(fsNode)) {
      let newSelected = new Set(selected);
      newSelected.delete(fsNode);
      setSelected(newSelected);
    } else if (!e.shiftKey || selected.size === 0) {
      let newSelected: Set<FTNode> = new Set();
      newSelected.add(fsNode);
      setSelected(newSelected);
      // BUG: Shift allows multiple selection, but doesn't select
      // all rows in a line.
    } else if (e.shiftKey) {
      let newSelected = new Set(selected);
      newSelected.add(fsNode);
      setSelected(newSelected);
    }
  }

  function clearAll() {
    setSelected(new Set());
  }

  return { selected, toggleSelection, clearAll };
}
