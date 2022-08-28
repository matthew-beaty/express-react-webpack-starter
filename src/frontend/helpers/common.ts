import { FolderNode } from "./file-tree";

// Get the path up to the root folder of the currentFolder
export const getPath = (currentFolder: FolderNode) => {
  let path: FolderNode[] = [];
  function recurse(node: FolderNode) {
    path.push(node);
    if (node.parent) recurse(node.parent);
  }
  recurse(currentFolder);

  return path.reverse();
};
