import React from "react";

const styles = {
  indentedContainer: {
    marginLeft: "4px",
    padding: "8px 20px",
    height: "100%",
    width: "100%",
  },
  row: {
    minWidth: "250px",
    padding: "10px",
    height: "20px",
  },
  highlighted: {
    backgroundColor: "aliceblue",
  },
  selected: {
    backgroundColor: "#98bdfa",
  },
};

interface RowProps {
  isSelected: boolean;
  onClick: any;
  children: any;
}

const Row = ({ isSelected, onClick, children }: RowProps) => {
  let [isHighlighted, setIsHighlighted] = React.useState(false);

  let rowStyle = styles.row;
  rowStyle = isHighlighted ? { ...rowStyle, ...styles.highlighted } : rowStyle;
  rowStyle = isSelected ? { ...rowStyle, ...styles.selected } : rowStyle;

  return (
    <div
      style={rowStyle}
      onClick={onClick}
      onMouseOver={() => setIsHighlighted(true)}
      onMouseOut={() => setIsHighlighted(false)}
    >
      {children}
    </div>
  );
};

export default Row;
