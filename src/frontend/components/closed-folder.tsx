import React from "react";
import { FTNode, FolderNode } from "../helpers/file-tree";
import Row from "../components/row";

interface FolderProps {
  node: FolderNode;
  selectionAPI: any;
  openFolder: any;
}

export const ClosedFolder = ({
  node,
  selectionAPI,
  openFolder,
}: FolderProps) => {
  const { selected, toggleSelection } = selectionAPI;

  const toggleSelected = (e: React.MouseEvent, node: FTNode) => {
    e.preventDefault();
    toggleSelection(e, node);
  };

  return (
    <Row
      onClick={(e: any) => toggleSelected(e, node)}
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
