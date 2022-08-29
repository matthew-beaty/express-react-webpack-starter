import React from "react";
import { FolderNode, FTNode } from "../helpers/file-tree";
import File from "../components/file";
import VirtualList from "../components/virtual-list";
import ClosedFolder from "./closed-folder";

interface FolderProps {
  node: FolderNode;
  selectionAPI: any;
  openFolder: any;
  showSearch: boolean;
  searchNodes: FTNode[];
}

/** UI for representing a folder in a file tree */
const Folder = ({
  node,
  selectionAPI,
  openFolder,
  showSearch = false,
  searchNodes = [],
}: FolderProps) => {
  // When searching, show the matching nodes instead of the current folder content
  let nodes = showSearch ? searchNodes : Array.from(node.content.values());

  // NOTE: This sort is great because it sorts numbers inside of strings properly,
  // but we don't want to do sort on every render
  // We should move sort to happen on significant actions once, and then render can be fast.
  let sortedContent = nodes.sort((a: any, b: any) =>
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
