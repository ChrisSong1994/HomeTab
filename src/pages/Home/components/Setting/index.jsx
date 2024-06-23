import React, { useState } from "react";
import {
  EditFilled,
  CloseOutlined,
  CheckCircleFilled,
} from "@ant-design/icons";
import { FloatButton, Drawer, Form, Segmented } from "antd";

import Event from "@/utils/event";
import { useStore } from "@/hooks";
import { THEME_BG_LIST } from "@/constants";
import styles from "./index.less";

const Setting = () => {
  const [open, setOpen] = useState(false);
  const [store, setStore] = useStore();

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckBgImage = (url) => {
    setStore({ backgroundUrl: url });
    Event.emit("STORE_BG_CHANGE", url);
  };

  // const handleShortcutLinkTarget = (target) => {
  //   setStore({ shortcutLinkTarget: target });
  //   Event.emit("STORE_LINK_TARGET_CHANGE", target);
  // };

  return (
    <div>
      <FloatButton
        onClick={() => {
          setOpen(true);
        }}
        icon={<EditFilled />}
      />
      <Drawer
        title="设置"
        placement="right"
        width={420}
        maskClosable={false}
        closeIcon={false}
        mask={false}
        open={open}
        extra={<CloseOutlined onClick={handleClose} />}
      >
        {/* <Form.Item label="快捷连接打开方式">
          <Segmented
            options={[
              { label: "该窗口", value: "_self" },
              { label: "新窗口", value: "_blank" },
            ]}
            value={store.shortcutLinkTarget}
            onChange={handleShortcutLinkTarget}
          />
        </Form.Item> */}

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
      </Drawer>
    </div>
  );
};

export default Setting;
