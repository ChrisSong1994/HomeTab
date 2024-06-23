import React, { useContext, useEffect, useState } from "react";

import Event from "@/utils/event";
import StoreInstance from "@/store";
import styles from "./index.less";

const Layout = ({ children }) => {
  const [bgUrl, setBgUrl] = useState(StoreInstance.getData().backgroundUrl);

  useEffect(() => {
    Event.on("STORE_BG_CHANGE", (url) => {
      setBgUrl(url);
    });
  }, []);

  return (
    <div
      className={styles["layout"]}
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {children}
    </div>
  );
};

export default Layout;
