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

const tree = new FileTree();
const emptyFolder = new FolderNode("empty");
enum CreateUIState {
  None = 0,
  CreateFolder,
  CreateFile,
}

/**
 * FileTreePage
 *
 * Page for displaying our default file tree explorer.
 *
 */
const FileTreePage = () => {
  let selectionAPI = useSelectedRows();

  let [name, setName] = React.useState("");
  let [showCreateUI, setCreateUI] = React.useState(CreateUIState.None);
  let [currentFolder, setCurrentFolder] = React.useState(emptyFolder);

  /** Onclick Hanlders */

  /** Create a new folder object within selected parent folder */
  const toggleCreateUI = (isFolder: boolean) => {
    setCreateUI(
      isFolder ? CreateUIState.CreateFolder : CreateUIState.CreateFile
    );
  };
  const addNode = () => {
    console.log(currentFolder);
    let isFolder = showCreateUI === CreateUIState.CreateFolder;
    currentFolder.add(name, isFolder);
    setName("");
    setCreateUI(CreateUIState.None);
  };

  /** Delete one or more selected files/folders */
  const deleteItems = () => {
    tree.removeNodes(selectionAPI.selected);
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
  const openFolder = (node: any) => {
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
          <Button
            onClick={deleteItems}
            isDisabled={selectionAPI.selected.size === 0}
          >
            Delete
          </Button>
          <Button
            onClick={() => openFolder(Array.from(selectionAPI.selected)[0])}
            isDisabled={selectionAPI.selected.size === 0}
          >
            Open Folder
          </Button>
        </div>

        <div>
          <Button onClick={() => toggleCreateUI(true)}>New Folder</Button>
          <Button onClick={() => toggleCreateUI(false)}>New File</Button>
        </div>

        {
          // TODO: Generate Demo button should be removed before release
        }
        <div>
          <Button onClick={generateDemo}>Generate Demo Content</Button>
        </div>
      </div>

      {showCreateUI !== CreateUIState.None && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "50px",
            alignItems: "center",
          }}
        >
          <input
            style={{ width: "300px", height: "20px" }}
            onChange={onChange}
            value={name}
            placeholder="name"
          />
          <Button onClick={addNode} isDisabled={false}>
            Create
          </Button>
        </div>
      )}

      <PathBar currentFolder={currentFolder} openFolder={openFolder}></PathBar>
      <div>
        <Folder
          key={currentFolder.id}
          node={currentFolder}
          selectionAPI={selectionAPI}
          openFolder={openFolder}
        />
      </div>
    </>
  );
};

export default FileTreePage;
