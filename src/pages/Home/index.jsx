import React, { useEffect } from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import Setting from "./components/Setting";
import ShortcutkLinks from "./components/ShortcutkLinks";
import THEME_BG from "@/assets/images/theme_bg.png";
import styles from "./index.less";

function Home() {
  // if (chrome?.bookmarks?.getTree) {
  //   chrome.bookmarks
  //     .getTree()
  //     .then((bookmarkTreeNodes) => {
  //       console.log(bookmarkTreeNodes);
  //       // 处理书签数据...
  //     })
  //     .catch((error) => console.error(error));
  // }

  return (
    <div
      className={styles["layout"]}
      style={{ backgroundImage: `url(${THEME_BG})` }}
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
