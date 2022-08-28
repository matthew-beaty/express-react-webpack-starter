import React from "react";
import { FolderNode } from "../helpers/file-tree";
import { getPath } from "../helpers/common";

interface PathBarProps {
  currentFolder: FolderNode;
  openFolderHandler: (node: FolderNode) => void;
}

/** UI for displaying the current file path */
const PathBar = ({ currentFolder, openFolderHandler }: PathBarProps) => {
  // Don't render if there is no content
  if (currentFolder.name === "empty") return <></>;

  let path: FolderNode[] = getPath(currentFolder);

  if (path.length > 6) {
    path = path.slice(-6);
  }

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {path.map((node) => (
        <div
          onClick={() => openFolderHandler(node)}
          style={{
            padding: "10px",
            margin: "10px",
            cursor: currentFolder !== node ? "pointer" : "default",
          }}
        >
          {node.name}
        </div>
      ))}
    </div>
  );
};

export default PathBar;
