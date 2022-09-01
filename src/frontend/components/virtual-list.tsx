import React from "react";
import throttle from "../helpers/throttle";

const amountRows = 200;
const rowHeight = 40;
const amountRowsBuffered = 4;
let windowHeight = 600;

interface RowProps {
  children: React.ReactNode;
  style: {};
}

const Row = ({ style, children }: RowProps) => {
  return <div style={style}>{children}</div>;
};

interface VirtualListProps {
  children: React.ReactNode;
}

const VirtualList = ({ children }: VirtualListProps) => {
  const [scrollTop, setScrollTop] = React.useState(0);
  const rowsRef = React.useRef();
  const arrayChildren = React.Children.toArray(children);

  const indexStart = Math.max(
    Math.floor(scrollTop / rowHeight) - amountRowsBuffered,
    0
  );

  const indexEnd = Math.min(
    Math.ceil(Math.floor((scrollTop + windowHeight) / rowHeight)) +
      amountRowsBuffered,
    amountRows - 1
  );

  const update = (e: any) => {
    setScrollTop(e.target.scrollTop);
  };

  // TODO: throttle doesn't appear to be working
  const throttledUpdate = throttle(update, 500);

  let childrenSlice = arrayChildren.slice(indexStart, indexEnd);

  return (
    <div
      onScroll={throttledUpdate}
      style={{ height: `${windowHeight}px`, overflowY: "scroll" }}
    >
      <div
        style={{
          height: `${amountRows * rowHeight}px`,
          width: "800px",
          position: "relative",
        }}
        ref={rowsRef}
      >
        {childrenSlice.map((item, index) => (
          <Row
            key={index}
            style={{
              top: `${(indexStart + index) * rowHeight}px`,
              height: "40px",
              width: "inherit",
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
