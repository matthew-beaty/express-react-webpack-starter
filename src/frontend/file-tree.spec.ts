import { FileTree } from "./file-tree";

describe("FileTree tests", () => {
  it("Add a file", () => {
    let tree = new FileTree();
    tree.root.add("test file", false);
    expect(tree.root.content.has("test file")).toBe(true);
  });

  it("Add a file or folder - throws error on empty name field", () => {
    let tree = new FileTree();
    expect(() => tree.root.add("")).toThrowError();
    expect(() => tree.root.add(null)).toThrowError();
    expect(() => tree.root.add(undefined)).toThrowError();
  });

  it("Add a folder", () => {
    let tree = new FileTree();
    tree.root.add("test folder", true);
    expect(tree.root.content.has("test folder")).toBe(true);
  });

  it("Remove a file", () => {
    let tree = new FileTree();
    tree.root.add("test file", false);
    tree.root.remove("test file");
    expect(tree.root.content.has("test file")).toBe(false);
  });

  it("Remove a folder", () => {
    let tree = new FileTree();
    tree.root.add("test folder", true);
    tree.root.remove("test folder");

    expect(tree.root.content.has("test folder")).toBe(false);
  });
});
