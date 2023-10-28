import React from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import THEME_BG from "../../assets/images/theme_bg.png";
import styles from "./index.less";

function Home() {
  return (
    <div
      className={styles["layout"]}
      style={{ backgroundImage: `url(${THEME_BG})` }}
    >
      <Header />
      <section className={styles["content"]}>
        <Search />
      </section>
    </div>
  );
}

export default Home;
