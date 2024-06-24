import React from "react";

import { useStore } from "@/hooks";
import styles from "./index.less";

const Layout = ({ children }) => {
  const [store] = useStore();

  return (
    <div
      className={styles["layout"]}
      style={{ backgroundImage: `url(${store.backgroundUrl})` }}
    >
      {children}
    </div>
  );
};

export default Layout;
