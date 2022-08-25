/** A base class for File/Folder Nodes */
class FFNode {
  /** Note - should be globally unique ID's. Since it's unclear in this app whether we generate them
   * client side or server side, this will work for now.
   */
  id: string;
  name: string;

  constructor(name: string) {
    this.name = name;
    this.id = name;
  }
}

/** A File Node */
export class FileNode extends FFNode {
  parent: FolderNode;

  constructor(name: string) {
    super(name);

    this.name = name;
    this.parent = null;
  }
}

/** A Folder Node */
export class FolderNode extends FFNode {
  content: Map<string, FileNode | FolderNode>;
  parent: FolderNode;

  constructor(name: string) {
    super(name);
    this.content = new Map();
    this.parent = null;
  }

  getFolder(name: string) {
    let node = this.content.get(name);

    if (node instanceof FolderNode) {
      return node;
    }
    return null;
  }

  subFolders(): FolderNode[] {
    return Array.from(this.content.values()).filter(
      (n): n is FolderNode => n instanceof FolderNode
    );
  }

  subFiles(): FileNode[] {
    return Array.from(this.content.values()).filter(
      (n): n is FolderNode => n instanceof FileNode
    );
  }

  add(name: string, isFolder = false) {
    if (name === null || name === undefined || name.trim() === "")
      throw new Error("Name field is required");

    let newName = name.trim();

    let newNode = isFolder ? new FolderNode(newName) : new FileNode(newName);
    newNode.parent = this;

    this.content.set(newNode.name, newNode);
  }

  remove(name: string) {
    let node = this.content.get(name);
    if (node) {
      node.parent = null;
    }
    this.content.delete(name);
  }
}

export type FTNode = FolderNode | FileNode;

export class FileTree {
  root: FolderNode;
  currentFolder: FolderNode;

  constructor() {
    this.root = new FolderNode("/");
    this.currentFolder = this.root;
  }

  openFolder(node: FolderNode | FileNode) {
    if (node instanceof FolderNode) {
      this.currentFolder = node;
    }
  }

  closeFolder() {
    this.currentFolder = this.currentFolder.parent;
  }

  removeNodes(nodes: FTNode[]) {
    nodes.forEach((n) => {
      let parent = n.parent;
      n.parent = null;

      parent.content.delete(n.name);
    });
  }

  generateContent() {
    // TODO: use faker to generate better filenames
    function addContent(node: FolderNode, num: number) {
      for (let i = 0; i < num; i++) {
        node.add(`folder ${i}`, true);
        node.add(`file ${i}`, false);
      }
    }

    this.root.content = new Map();
    this.root.add("big Folder", true);
    addContent(this.root.getFolder("big Folder"), 10000);

    addContent(this.root, 100);

    for (let folder of this.root.subFolders()) {
      addContent(folder, 1000);
    }
  }
}
