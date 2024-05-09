import React from "react";
import { createPortal, createRoot } from "react-dom";

import DraggableModal, {
  createDraggableModal,
} from "@/components/DraggableModal";
import ColorIcon from "@/assets/svgs/color.svg";
import RegexpIcon from "@/assets/svgs/regexp.svg";
import JsonIcon from "@/assets/svgs/json.svg";
import QrcodeIcon from "@/assets/svgs/qrcode.svg";
import styles from "./index.less";

const TOOLS_MENUS = [
  {
    title: "JSON",
    key: "json",
    icon: JsonIcon,
  },
  {
    title: "正则",
    key: "regexp",
    icon: RegexpIcon,
  },
  {
    title: "颜色",
    key: "color",
    icon: ColorIcon,
  },
  {
    title: "二维码",
    key: "qrcode",
    icon: QrcodeIcon,
  },
];

const Tools = () => {
  const handleCreateToolModal = () => {
    createDraggableModal();
  };
  return (
    <div className={styles["tools"]}>
      {TOOLS_MENUS.map((item) => {
        return (
          <div
            className={styles["tools-item"]}
            key={item.key}
            onClick={handleCreateToolModal}
          >
            <img className={styles["tools-item-icon"]} src={item.icon} />
            <span className={styles["tools-item-title"]}>{item.title}</span>
          </div>
        );
      })}
    </div>
  );
};
export default Tools;
