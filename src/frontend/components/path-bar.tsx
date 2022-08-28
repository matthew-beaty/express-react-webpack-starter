import React from "react";
import { FolderNode } from "../helpers/file-tree";

interface PathBarProps {
  currentFolder: FolderNode;
  openFolderHandler: (node: FolderNode) => void;
}

const PathBar = ({ currentFolder, openFolderHandler }: PathBarProps) => {
  let path: FolderNode[] = [];

  if (currentFolder.name === "empty") return <></>;
  const getPath = (currentFolder: FolderNode) => {
    path.push(currentFolder);

    if (currentFolder.parent) {
      let parent = currentFolder.parent;

      if (parent) getPath(parent);
    }
  };

  getPath(currentFolder);
  path.reverse();

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {path.map((node) => (
        <div
          onClick={() => openFolderHandler(node)}
          style={{ padding: "10px", margin: "10px" }}
        >
          {node.name}
        </div>
      ))}
    </div>
  );
};

export default PathBar;
