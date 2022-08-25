import React from "react";
import { FileNode, FTNode } from "../file-tree";

interface FileProps {
  node: FileNode;
  selectionAPI: any;
}

// TODO: Temp style
const styles = {
  indentedContainer: {
    marginLeft: "4px",
    padding: "8px 20px",
  },
  selected: {
    backgroundColor: "#98bdfa",
  },
};

const File = ({ node, selectionAPI }: FileProps) => {
  let { selected, toggleSelection } = selectionAPI;
  let { name } = node;

  const toggleSelected = (e: React.MouseEvent, node: FTNode) => {
    e.preventDefault();
    // don't select row when clicking on expand/collapse arrow.
    // NOTE: this could be improved and could break if the HTML changes, but its
    // a slight quality of life improvement for now.

    // if (e.currentTarget.firstChild.nodeName !== "SPAN") {
    toggleSelection(e, node);
    // }
  };

  return (
    <div
      style={selected.has(node) ? styles.selected : {}}
      onClick={(e) => toggleSelected(e, node)}
    >
      {name}
    </div>
  );
};

export default File;
