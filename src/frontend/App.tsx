import * as React from "react";
import { render } from "react-dom";
import FileTreePage from "./pages/file-tree-page";

// TEMP
// import VirtualTestPage from "../frontend/components/virtual-list";

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

  //   componentDidMount() {
  //     this.getTime();
  //     setInterval(this.getTime, 2000);
  //   }

  render() {
    return (
      <>
        <h1>File Explorer</h1>
        <FileTreePage />
      </>
    );
  }

  //   private getTime = async () => {
  //     const response = await fetch("/api/time", { method: "GET" });
  //     if (response.ok) {
  //       this.setState({ time: await response.text() });
  //     }
  //   };
}

export function start() {
  const rootElem = document.getElementById("main");
  render(<App name="Hello World" />, rootElem);
}
