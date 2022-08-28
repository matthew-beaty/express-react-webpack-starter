import React from "react";
import useSelectedRows from "../hooks/use-selected-rows";
import Folder from "../components/folder";
import { FileTree, FolderNode } from "../helpers/file-tree";
import PathBar from "../components/path-bar";
import Button from "../components/button";

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
    tree.generateContent();
    setCurrentFolder(tree.root);
  };

  /** Onchange for name handler - NOTE: could be generalized */
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  /** Set the current folder to the expanded folder */
  const currentFolderOnclick = (node: any) => {
    tree.openFolder(node);
    setCurrentFolder(node);

    selectionAPI.clearAll();
  };
  /** Set the current folder to the current folder's parent */
  const goToPareentFolder = () => {
    if (currentFolder.parent.name === "root") return;
    let parentFolder = currentFolder.parent;
    tree.openFolder(parentFolder);
    setCurrentFolder(parentFolder);

    selectionAPI.clearAll();
  };

  console.log(currentFolder.name);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button
            onClick={() => goToPareentFolder()}
            isDisabled={
              currentFolder.name === "/" || currentFolder.name === "empty"
            }
          >
            Back
          </Button>
          <Button onClick={deleteItems} isDisabled={selected.size === 0}>
            Delete
          </Button>
          <Button
            onClick={() => currentFolderOnclick(Array.from(selected)[0])}
            isDisabled={selected.size === 0}
          >
            Open Folder
          </Button>
        </div>

        <div>
          <Button onClick={addFolder}>New Folder</Button>
          <Button>New File</Button>
        </div>

        {
          // TODO: Generate Demo button should be removed before release
        }
        <div>
          <Button onClick={generateDemo}>Generate Demo Content</Button>
        </div>
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
      <div>
        <Folder
          key={currentFolder.id}
          node={currentFolder}
          selectionAPI={selectionAPI}
          openFolderHandler={currentFolderOnclick}
        />
      </div>
    </>
  );
};

export default FileTreePage;
