import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import {
  CaretRightOutlined,
  SearchOutlined,
  EnterOutlined,
} from "@ant-design/icons";

import styles from "./index.less";

const SuggestList = (props) => {
  const { engine, data, onSelect } = props;
  const [enterIndex, setEnterIndex] = useState(-1);

  // 处理上下键和 enter
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      if (enterIndex === data.length - 1) {
        setEnterIndex(0);
      } else {
        setEnterIndex(enterIndex + 1);
      }
    }
    if (e.key === "ArrowUp") {
      if (enterIndex === 0) {
        setEnterIndex(data.length - 1);
      } else {
        setEnterIndex(enterIndex - 1);
      }
    }
  };

  useEffect(() => {
    if (data.length) {
      setEnterIndex(0);
    } else {
      setEnterIndex(-1);
    }
  }, [data]);

  useEffect(() => {
    // 监听键盘事件
    document.addEventListener("keydown", handleKeyDown);
    if (enterIndex !== -1) {
      // 触发选择回调
      onSelect(data[enterIndex].keyword);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [enterIndex]);

  return (
    <div className={styles["search-suggest-list"]}>
      {data.map((item, index) => {
        const isActive = index === enterIndex;
        return (
          <a
            key={`${engine}-${index}`}
            className={`${styles["search-suggest-list-item"]} ${
              isActive ? styles["search-suggest-list-item-active"] : ""
            } `}
            href={item.link}
            target="_self"
          >
            {item.icon ? (
              <img src={item.icon} />
            ) : (
              <SearchOutlined style={{ fontSize: 20 }} />
            )}
            <div>{item.keyword}</div>
            {isActive ? <EnterOutlined /> : null}
          </a>
        );
      })}
    </div>
  );
};

export default SuggestList;
