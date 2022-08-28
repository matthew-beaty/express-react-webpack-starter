import React from "react";
import throttle from "../helpers/throttle";

const amountRows = 100;
const rowHeight = 40;
const amountRowsBuffered = 2;

type DataItem = {
  index: number;
  text: string;
  top: number;
};

const styles = {
  list: "",
  rows: "height: 40px",
};

interface RowProps {
  children: any;
  style: any;
}

let windowHeight = window.innerHeight;

const Row = ({ style, children }: RowProps) => {
  return <div style={style}>{children}</div>;
};

interface VirtualListProps {
  children: any;
}

const VirtualList = ({ children }: VirtualListProps) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  const rowsRef = React.useRef();
  const arrayChildren = React.Children.toArray(children);

  const data: DataItem[] = [];
  for (let index = 0; index < amountRows; index++) {
    data.push({ index, text: `Index ${index}`, top: index * rowHeight });
  }

  const indexStart = Math.max(
    Math.floor(scrollTop / rowHeight) - amountRowsBuffered,
    0
  );

  const indexEnd = Math.min(
    Math.ceil((scrollTop + windowHeight) / rowHeight - 1) + amountRowsBuffered,
    amountRows - 1
  );

  const update = (e: any) => {
    setScrollTop(e.target.scrollTop);
    console.log(e.target.scrollTop);
  };

  const throttledUpdate = throttle(update, 50);

  return (
    <div
      className={styles.list}
      onScroll={throttledUpdate}
      style={{ height: windowHeight, overflowY: "scroll" }}
    >
      <div
        className={styles.rows}
        style={{ height: amountRows * rowHeight, position: "relative" }}
        ref={rowsRef}
      >
        {[...arrayChildren]
          .slice(indexStart, indexEnd + 1)
          .map((item, index) => (
            <Row
              key={index}
              style={{
                top: index * rowHeight,
                height: "40px",
                position: "absolute",
              }}
            >
              {item}
            </Row>
          ))}
      </div>
    </div>
  );
};

export default VirtualList;
