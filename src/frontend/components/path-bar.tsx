import React from "react";
import { FolderNode } from "../helpers/file-tree";
import { getPath } from "../helpers/common";

interface PathBarProps {
  currentFolder: FolderNode;
  openFolder: (node: FolderNode) => void;
}

/** UI for displaying the current file path
 *
 * NOTE: Improvements I'd want to make:
 * - long folder names can cause the component to overflow
 * - would be nice to have 'home/root' always the first option
 */
const PathBar = ({ currentFolder, openFolder }: PathBarProps) => {
  // Don't render if there is no content
  if (currentFolder.name === "empty") return <></>;

  let path: FolderNode[] = getPath(currentFolder);
  if (path.length > 6) path = path.slice(-6);

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {path.map((node) => (
        <div
          onClick={() => openFolder(node)}
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
