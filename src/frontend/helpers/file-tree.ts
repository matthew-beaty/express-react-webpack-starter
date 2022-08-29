/** A base class for File/Folder Nodes */
class FFNode {
  id: string;
  name: string;

  constructor(name: string) {
    /** TODO: id should be universally unique ID's. Since it's unclear
     * in this app whether we would generate them client side or server side,
     * the current code throughout uses name for now. This could cause bugs related to
     * moving folders / renaming / and/or opening the correct folder.
     */

    this.id = name;
    this.name = name;
  }
}

/** Represents File node for a File Tree */
export class FileNode extends FFNode {
  parent: FolderNode;

  constructor(name: string) {
    super(name);

    this.name = name;
    this.parent = null;
  }
}

/** Represents Folder node for a File Tree */
export class FolderNode extends FFNode {
  content: Map<string, FileNode | FolderNode>;
  parent: FolderNode;
  isRoot: boolean;

  constructor(name: string, isRoot = false) {
    super(name);
    this.content = new Map();
    this.parent = null;
    this.isRoot = isRoot;
  }

  getFolder(name: string) {
    let node = this.content.get(name);

    if (node instanceof FolderNode) {
      return node;
    }
    return null;
  }

  /** Return only subfolders within this folder */
  subFolders(): FolderNode[] {
    return Array.from(this.content.values()).filter(
      (n): n is FolderNode => n instanceof FolderNode
    );
  }

  /** Add a new file or folder node as content (children) to this folder */
  add(name: string, isFolder = false) {
    if (name === null || name === undefined || name.trim() === "")
      throw new Error("Name field is required");

    let newName = name.trim();

    let newNode = isFolder ? new FolderNode(newName) : new FileNode(newName);
    newNode.parent = this;

    this.content.set(newNode.name, newNode);

    return newNode;
  }

  /** Remove the named file/folder node from this folder */
  remove(name: string) {
    let node = this.content.get(name);
    if (node) {
      node.parent = null;
    }
    this.content.delete(name);
  }
}

export type FTNode = FolderNode | FileNode;

/** Represents a Tree of files and folders */
export class FileTree {
  root: FolderNode;
  currentFolder: FolderNode;

  constructor() {
    this.root = new FolderNode("/", true);
    this.currentFolder = this.root;
  }

  /** Set the current folder to the provided folder */
  openFolder(node: FolderNode | FileNode) {
    if (node instanceof FolderNode) {
      this.currentFolder = node;
    }
  }

  /** Set the current folder to the current folder's parent */
  closeFolder() {
    if (this.currentFolder === this.root)
      throw new Error("Root folder has no parent");
    this.currentFolder = this.currentFolder.parent;
  }

  /** Remove all files/folders from the tree */
  removeNodes(nodes: FTNode[]) {
    nodes.forEach((n) => {
      if (n instanceof FolderNode && n.isRoot)
        throw new Error("Root folder cannot be removed");
      let parent = n.parent;
      n.parent = null;

      parent.content.delete(n.name);
    });
  }

  /** Function useful for creating test data - should not be used in production */
  generateContent() {
    // TODO: use faker to generate better filenames
    function addContent(node: FolderNode, num: number) {
      for (let i = 0; i < num; i++) {
        node.add(`folder ${i}`, true);
        node.add(`file ${i}`, false);
      }
    }

    function addDeepContent(node: FolderNode, layer: number) {
      let lastNode: any = node;
      for (let i = 0; i < layer; i++) {
        lastNode = lastNode.add(`Deep Folder ${i}`, true);
      }
    }

    this.root.content = new Map();
    addDeepContent(this.root, 20);
    this.root.add("big folder", true);
    this.root.add("smol item folder", true);
    this.root.add("empty folder", true);
    this.root.add("stuff folder", true);
    addContent(this.root.getFolder("big folder"), 10000);
    addContent(this.root.getFolder("smol item folder"), 1);

    addContent(this.root, 100);

    for (let folder of this.root.subFolders()) {
      addContent(folder, 1000);
    }
  }

  search(text: string) {
    let nodes: FTNode[] = [];

    function traverse(node: FTNode) {
      if (node instanceof FolderNode && node.content) {
        Array.from(node.content.values()).forEach((n: any) => {
          if (n.name === text) nodes.push(n);

          if (node instanceof FolderNode && n.content) traverse(n);
        });
      }
    }

    traverse(this.root);

    return nodes;
  }
}
