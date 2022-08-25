import Folder from "../components/folder";
import React from "react";
import useSelectedRows from "../hooks/use-selected-rows";
import { FileTree } from "../file-tree";

interface FileTreeProps {}

// TODO: Move the content generation to a perm. location.
// This was for prototyping
let tree = new FileTree();
tree.generateContent();

const FileTreePage = ({}: FileTreeProps) => {
  let selectionAPI = useSelectedRows();

  let root = tree.root;

  // TODO: sort should work for number strings
  // TODO: ideally folders appear before files?
  // content.sort((a, b) => a.name.localeCompare(b.name));

  let { selected } = selectionAPI;

  const deleteItems = () => {
    tree.removeNodes(selected);
    selectionAPI.clearAll();
  };

  return (
    <>
      <div>
        <button onClick={deleteItems} disabled={selected.size === 0}>
          Delete
        </button>

        <button>New Folder</button>
        <button>New File</button>
      </div>

      <div>
        <Folder key={root.id} node={root} selectionAPI={selectionAPI} />
      </div>
    </>
  );
};

export default FileTreePage;
