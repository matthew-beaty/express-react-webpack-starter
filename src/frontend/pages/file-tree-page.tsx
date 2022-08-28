import React from "react";
import useSelectedRows from "../hooks/use-selected-rows";
import Folder from "../components/folder";
import { FileTree, FolderNode } from "../helpers/file-tree";
import PathBar from "../components/path-bar";

/**
 * TODO: Move tree generation to a perm. location.
 * This location is for prototyping. Ideally, we would ingest
 * data once at the network layer, convert that data into this tree
 * shape.
 */
let tree = new FileTree();

const emptyFolder = new FolderNode("empty");

interface FileTreeProps {}

/**
 * FileTreePage
 *
 * Page for displaying our default file tree explorer.
 *
 */
const FileTreePage = ({}: FileTreeProps) => {
  let selectionAPI = useSelectedRows();

  let [name, setName] = React.useState("");

  let [currentFolder, setCurrentFolder] = React.useState(emptyFolder);

  // TODO: sort should work for number strings
  // TODO: ideally folders appear before files?
  // content.sort((a, b) => a.name.localeCompare(b.name));

  let { selected } = selectionAPI;
  console.log(selected);

  /** Onclick Hanlders */

  /** Create a new folder object within selected parent folder */
  const addFolder = () => {
    // TODO FIX ANY
    currentFolder.add(name, true);
    setName("");
  };

  /** Delete one or more selected files/folders */
  const deleteItems = () => {
    tree.removeNodes(selected);
    selectionAPI.clearAll();
  };

  /** Generate content for demo'ing. TODO: Remove before releasing */
  const generateDemo = () => {
    console.log("generating content");
    tree.generateContent();
    console.log(tree);
    setCurrentFolder(tree.root);
  };

  /** Onchange for name handler - NOTE: could be generalized */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  /** Set the current folder to the expanded folder */
  const currentFolderOnclick = (node: any) => {
    console.log(node);
    tree.openFolder(node);
    setCurrentFolder(node);
  };
  /** Set the current folder to the current folder's parent */
  const goToPareentFolder = () => {
    if (currentFolder.parent.name === "root") return;
    let parentFolder = currentFolder.parent;
    tree.openFolder(parentFolder);
    setCurrentFolder(parentFolder);
  };

  console.log(selected);

  return (
    <>
      <div style={{ display: "flex" }}>
        <button onClick={deleteItems} disabled={selected.size === 0}>
          Delete
        </button>

        <button onClick={addFolder}>New Folder</button>
        <button>New File</button>
        <button onClick={() => currentFolderOnclick(Array.from(selected)[0])}>
          View Current Folder
        </button>
        <button onClick={() => goToPareentFolder()}>Go to Parent Folder</button>

        {
          // TODO: Generate Demo button should be removed before release
        }
        <button onClick={generateDemo}>Generate Demo Content</button>
      </div>

      <div>
        <label>
          Name: <input onChange={onChange} value={name} />
        </label>
      </div>

      <PathBar
        currentFolder={currentFolder}
        openFolderHandler={currentFolderOnclick}
      ></PathBar>
      <div style={{ width: "250px" }}>
        <Folder
          key={currentFolder.id}
          node={currentFolder}
          selectionAPI={selectionAPI}
        />
      </div>
    </>
  );
};

export default FileTreePage;
