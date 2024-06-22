import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";

import { useStore } from "@/hooks";
import styles from "./index.less";

const THEME_BG_LIST = [
  {
    url: "/public/images/default_theme_bg.png",
  },
  {
    url: "/public/images/theme_bg1.jpeg",
  },
  {
    url: "/public/images/theme_bg2.jpeg",
  },
  {
    url: "/public/images/theme_bg3.jpeg",
  },
  {
    url: "/public/images/theme_bg4.jpeg",
  },
  {
    url: "/public/images/theme_bg5.jpeg",
  },
  {
    url: "/public/images/theme_bg6.jpeg",
  },
  {
    url: "/public/images/theme_bg7.jpeg",
  },
];

const BgImages = () => {
  const [store, setStore] = useStore();

  const handleCheckBgImage = (url) => {
    setStore({ backgroundUrl: url });
  };

  return (
    <div className={styles["setting-bg-images"]}>
      {THEME_BG_LIST.map((item) => {
        return (
          <div
            className={styles["setting-bg-images-item"]}
            key={item.url}
            style={{ backgroundImage: `url(${item.url})` }}
            onClick={() => handleCheckBgImage(item.url)}
          >
            {store.backgroundUrl === item.url ? (
              <div className={styles["setting-bg-images-item-checked"]}>
                <CheckCircleFilled />
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default BgImages;
