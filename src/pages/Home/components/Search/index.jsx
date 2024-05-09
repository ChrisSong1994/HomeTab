import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import { Dropdown } from "antd";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";

import StoreInstance from "@/store";
import GOOGLE_LOGO from "@/assets/images/google.png";
import BAIDU_LOGO from "@/assets/images/baidu.png";
import BING_LOGO from "@/assets/images/bing.png";
import styles from "./index.less";

export const SEARCH_ENGINES = [
  {
    key: "Google",
    label: <div>谷歌</div>,
    icon: <img className={styles["search-type-logo"]} src={GOOGLE_LOGO} />,
    searchUrl:
      "https://www.google.com/search?q=${keyword}&oq=${keyword}&sourceid=chrome&ie=utf-8",
  },
  {
    key: "Baidu",
    label: <div>百度</div>,
    icon: <img className={styles["search-type-logo"]} src={BAIDU_LOGO} />,
    searchUrl: "https://www.baidu.com/s?wd=${keyword}&tn=baidu&ie=utf-8",
  },
  {
    key: "Bing",
    label: <div>必应</div>,
    icon: <img className={styles["search-type-logo"]} src={BING_LOGO} />,
    searchUrl:
      "https://cn.bing.com/search?q=${keyword}&pq=${keyword}&from=form",
  },
];

const Search = () => {
  const inputRef = useRef(null);
  const [searchEngine, setSearchEngine] = useState(
    StoreInstance.getData().searchEngine
  );
  const searchEngineInfo = SEARCH_ENGINES.find(
    (item) => item.key === searchEngine
  );

  const handleSearchEnginChange = ({ key }) => {
    setSearchEngine(key);
    StoreInstance.setData({ searchEngine: key });
  };

  const handleSearch = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      const keyword = encodeURIComponent(inputRef.current.value);
      const searchUrl = searchEngineInfo.searchUrl.replace(
        "${keyword}",
        keyword
      );
      window.open(searchUrl);
    }
  };

  useLayoutEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.addEventListener("keydown", handleSearch);
    }
    return () => {
      inputRef.current &&
        inputRef.current.removeEventListener("keydown", handleSearch);
    };
  }, [searchEngineInfo]);

  return (
    <div className={styles["search-wrapper"]}>
      <div className={styles["search"]}>
        <Dropdown
          menu={{
            items: SEARCH_ENGINES,
            selectable: true,
            onSelect: handleSearchEnginChange,
          }}
        >
          <div className={styles["search-engin"]}>
            {searchEngineInfo.icon}
            <CaretRightOutlined className={styles["search-engin-active"]} />
          </div>
        </Dropdown>

        <input
          ref={inputRef}
          className={styles["search-input"]}
          id="input"
          type="search"
          autoComplete="off"
          spellCheck="false"
          role="combobox"
          aria-controls="matches"
          placeholder="输入搜索内容，或网址"
          aria-expanded="false"
          aria-live="polite"
        />
        <div className={styles["search-btn"]} onClick={handleSearch}>
          <SearchOutlined />
        </div>
      </div>
    </div>
  );
};

export default Search;
