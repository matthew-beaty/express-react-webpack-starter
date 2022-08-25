import Folder from "../components/folder";
import React from "react";
import useSelectedRows from "../hooks/use-selected-rows";
import { FileTree } from "../file-tree";

interface FileTreeProps {}

// TODO: Move tree generation to a perm. location.
// This was for prototyping
let tree = new FileTree();

const FileTreePage = ({}: FileTreeProps) => {
  let selectionAPI = useSelectedRows();

  let [name, setName] = React.useState("");

  let root = tree.root;

  // TODO: sort should work for number strings
  // TODO: ideally folders appear before files?
  // content.sort((a, b) => a.name.localeCompare(b.name));

  let { selected } = selectionAPI;

  const deleteItems = () => {
    tree.removeNodes(selected);
    selectionAPI.clearAll();
  };

  const generateDemo = () => {
    tree.generateContent();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const addFolder = () => {
    // TODO FIX ANY
    let selectedNode: any = Array.from(selected)[0];

    if (selectedNode) {
      selectedNode.add(name, true);
      setName("");
    } else {
      tree.root.add(name, true);
      setName("");
    }
  };

  console.log(tree);

  return (
    <>
      <div>
        <button onClick={deleteItems} disabled={selected.size === 0}>
          Delete
        </button>

        <button onClick={addFolder}>New Folder</button>
        <button>New File</button>

        <button onClick={generateDemo}>Generate Demo Content</button>
      </div>

      <div>
        <label>
          Name: <input onChange={onChange} value={name} />
        </label>
      </div>

      <div>
        <Folder key={root.id} node={root} selectionAPI={selectionAPI} />
      </div>
    </>
  );
};

export default FileTreePage;
