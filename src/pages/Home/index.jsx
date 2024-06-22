import React from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import Setting from "./components/Setting";
import ShortcutkLinks from "./components/ShortcutkLinks";
import StoreInstance, { DEFAULT_STORE } from "@/store";
import styles from "./index.less";

function Home() {
  const backgroundImage =
    StoreInstance.getData().backgroundUrl || DEFAULT_STORE.backgroundUrl;
  return (
    <div
      className={styles["layout"]}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Header />
      <section className={styles["content"]}>
        <Search />
        <ShortcutkLinks />
        <Setting />
      </section>
    </div>
  );
}

export default Home;
