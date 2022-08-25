import React from "react";
import { FolderNode, FTNode } from "../file-tree";
import File from "../components/file";

interface FolderProps {
  node: FolderNode;
  selectionAPI: any;
}

const styles = {
  indentedContainer: {
    marginLeft: "4px",
    padding: "8px 20px",
  },
  selected: {
    backgroundColor: "#98bdfa",
  },
};

const Folder = ({ node, selectionAPI }: FolderProps) => {
  let { name, content } = node;
  let [isExpanded, setExpanded] = React.useState(false);
  let { selected, toggleSelection } = selectionAPI;

  // TODO: sort should work for number strings
  // TODO: ideally folders appear before files
  let sortedContent = Array.from(content.values()).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  const toggleExpanded = () => {
    setExpanded(!isExpanded);
  };

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
    <>
      <div
        style={selected.has(node) ? styles.selected : {}}
        onClick={(e) => toggleSelected(e, node)}
      >
        <span onClick={toggleExpanded}>{isExpanded ? "<" : ">"} </span>
        {name}
      </div>

      {isExpanded && sortedContent.length !== 0 && (
        <div style={styles.indentedContainer}>
          <div>
            {sortedContent.map((d) =>
              "content" in d ? (
                <Folder key={d.id} node={d} selectionAPI={selectionAPI} />
              ) : (
                <File key={d.id} node={d} selectionAPI={selectionAPI} />
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Folder;
