import React from "react";
import { FolderNode, FTNode } from "../helpers/file-tree";
import File from "../components/file";
import VirtualList from "../components/virtual-list";

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

export const ClosedFolder = ({ node, selectionAPI }: FolderProps) => {
  const { selected, toggleSelection } = selectionAPI;

  const toggleSelected = (e: React.MouseEvent, node: FTNode) => {
    e.preventDefault();
    toggleSelection(e, node);
  };
  return (
    <div
      style={selected.has(node) ? styles.selected : {}}
      onClick={(e) => toggleSelected(e, node)}
    >
      {/* <span onClick={toggleExpanded}>{isExpanded ? "<" : ">"} </span> */}
      {node.name}
    </div>
  );
};

/** UI for representing a folder in a file tree */
const Folder = ({ node, selectionAPI }: FolderProps) => {
  // let [isExpanded, setExpanded] = React.useState(false);

  // TODO: sort should work for number strings
  // TODO: ideally folders appear before files
  // let sortedContent = Array.from(content.values()).sort((a, b) =>
  //   a.name.localeCompare(b.name)
  // );

  // NOTE: This sort is significantly better, but we don't want to do sort on every render
  // We should move sort to happen on significant actions once, and then render can be fast.
  console.log(node);

  let sortedContent = Array.from(node.content.values()).sort((a, b) =>
    a.name.localeCompare(b.name, navigator.languages[0] || navigator.language, {
      numeric: true,
      ignorePunctuation: true,
    })
  );

  return (
    <>
      {/* {isExpanded &&  */}
      {sortedContent.length !== 0 && (
        <div style={styles.indentedContainer}>
          <div>
            <VirtualList>
              {sortedContent.map((d) =>
                "content" in d ? (
                  <ClosedFolder
                    key={d.id}
                    node={d}
                    selectionAPI={selectionAPI}
                  />
                ) : (
                  <File key={d.id} node={d} selectionAPI={selectionAPI} />
                )
              )}
            </VirtualList>
          </div>
        </div>
      )}
    </>
  );
};

export default Folder;