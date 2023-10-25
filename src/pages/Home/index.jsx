import React from "react";
import { Button } from "antd";
import styles from "./index.less";

function Home() {
  return (
    <div className={styles["wrap"]}>
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Button type="primary">按钮</Button>
      </header>
    </div>
  );
}

export default Home;
