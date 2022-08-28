import React from "react";
import { FTNode } from "../helpers/file-tree";

/**
 * useSelectedRows is a hook that manages which rows in a list are
 * selected at any given time. It can handle multiple selected items of
 * different kinds of objects, but is currently expecting to receieve only
 * FTNodes (fileTreeNode objects).
 *
 * TODO: Currently does not support automatically adding all selections in
 * a line.
 * */
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
