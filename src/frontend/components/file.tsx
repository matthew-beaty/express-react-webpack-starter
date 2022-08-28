import React from "react";
import { FileNode, FTNode } from "../helpers/file-tree";
import Row from "../components/row";

interface FileProps {
  node: FileNode;
  selectionAPI: any;
}

/** UI to represent a File in a file tree */
const File = ({ node, selectionAPI }: FileProps) => {
  let { selected, toggleSelection } = selectionAPI;
  let { name } = node;

  const toggleSelected = (e: React.MouseEvent, node: FTNode) => {
    e.preventDefault();
    // TODO: don't select row when clicking on expand/collapse arrow.
    // NOTE: this could be improved and could break if the HTML changes, but its
    // a slight quality of life improvement for now.

    toggleSelection(e, node);
  };

  return (
    <Row
      isSelected={selected.has(node)}
      onClick={(e: any) => toggleSelected(e, node)}
    >
      {name}
    </Row>
  );
};

export default File;
