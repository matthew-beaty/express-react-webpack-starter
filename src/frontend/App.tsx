import * as React from "react";
import { render } from "react-dom";
import FileTreePage from "./pages/file-tree-page";

interface AppProps {
  name: string;
}

interface AppState {
  time: string;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      time: null,
    };
  }

  render() {
    return (
      <div style={{ margin: "auto", maxWidth: "800px" }}>
        <h1>File Explorer</h1>
        <FileTreePage />
      </div>
    );
  }
}

export function start() {
  const rootElem = document.getElementById("main");
  render(<App name="Hello World" />, rootElem);
}
