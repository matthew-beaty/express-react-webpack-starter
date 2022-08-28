import React from "react";
import { FolderNode } from "../helpers/file-tree";
import File from "../components/file";
import VirtualList from "../components/virtual-list";
import ClosedFolder from "./closed-folder";

interface FolderProps {
  node: FolderNode;
  selectionAPI: any;
  openFolder: any;
}

/** UI for representing a folder in a file tree */
const Folder = ({ node, selectionAPI, openFolder }: FolderProps) => {
  // NOTE: This sort is significantly better, but we don't want to do sort on every render
  // We should move sort to happen on significant actions once, and then render can be fast.

  let sortedContent = Array.from(node.content.values()).sort((a, b) =>
    a.name.localeCompare(b.name, navigator.languages[0] || navigator.language, {
      numeric: true,
      ignorePunctuation: true,
    })
  );

  return (
    <>
      {sortedContent.length !== 0 && (
        <VirtualList>
          {sortedContent.map((d) =>
            "content" in d ? (
              <ClosedFolder
                key={d.id}
                node={d}
                selectionAPI={selectionAPI}
                openFolder={() => openFolder(d)}
              />
            ) : (
              <File key={d.id} node={d} selectionAPI={selectionAPI} />
            )
          )}
        </VirtualList>
      )}
    </>
  );
};

export default Folder;
