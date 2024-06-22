import React, { useEffect } from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import Setting from "./components/Setting";
import ShortcutkLinks from "./components/ShortcutkLinks";
import THEME_BG from "@/assets/images/theme_bg.png";
import StoreInstance from "@/store";
import styles from "./index.less";

function Home() {
  const backgroundImage = StoreInstance.getData().backgroundUrl;

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
