import React from "react";
import { CheckCircleFilled } from "@ant-design/icons";

import Event from "@/utils/event";
import { useStore } from "@/hooks";
import { THEME_BG_LIST } from "@/constants";
import styles from "./index.less";

const BgImages = () => {
  const [store, setStore] = useStore();

  const handleCheckBgImage = (url) => {
    setStore({ backgroundUrl: url });
    Event.emit("STORE_BG_CHANGE", url);
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
