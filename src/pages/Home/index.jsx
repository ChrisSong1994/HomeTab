import React from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import Setting from "./components/Setting";
import ShortcutkLinks from "./components/ShortcutkLinks";
import { useStore } from "@/hooks";
import styles from "./index.less";

function Home() {
  const [store] = useStore();

  return (
    <div
      className={styles["layout"]}
      style={{ backgroundImage: `url(${store.backgroundUrl})` }}
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
