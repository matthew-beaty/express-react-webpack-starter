import React from "react";
import { FTNode, FolderNode } from "../helpers/file-tree";
import Row from "../components/row";
import { UseSelectedRowsHook } from "../hooks/use-selected-rows";

interface FolderProps {
  node: FolderNode;
  selectionAPI: UseSelectedRowsHook;
  openFolder: () => void;
}

export const ClosedFolder = ({
  node,
  selectionAPI,
  openFolder,
}: FolderProps) => {
  const { selected, toggleSelection } = selectionAPI;

  const toggleSelected = (
    e: React.MouseEvent<Element, MouseEvent>,
    node: FTNode
  ) => {
    e.preventDefault();
    toggleSelection(e, node);
  };

  return (
    <Row
      onClick={(e: React.MouseEvent<Element, MouseEvent>) =>
        toggleSelected(e, node)
      }
      isSelected={selected.has(node)}
    >
      <button
        style={{
          border: "none",
          backgroundColor: "inherit",
          cursor: "pointer",
        }}
        onClick={openFolder}
      >
        {node.name}
      </button>
    </Row>
  );
};

export default ClosedFolder;
