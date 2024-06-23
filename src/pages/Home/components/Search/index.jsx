import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import { Dropdown } from "antd";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";

import StoreInstance from "@/store";
import GOOGLE_ICON from "@/assets/images/google_icon.png";
import BAIDU_ICON from "@/assets/images/baidu_icon.png";
import BING_ICON from "@/assets/images/bing_icon.png";
import GOOGLE_LOGO from "@/assets/images/google_logo.png";
import BAIDU_LOGO from "@/assets/images/baidu_logo.png";
import BING_LOGO from "@/assets/images/bing_logo.png";
import styles from "./index.less";

export const SEARCH_ENGINES = [
  {
    key: "Google",
    label: <div>谷歌</div>,
    icon: <img className={styles["search-type-icon"]} src={GOOGLE_ICON} />,
    logo: <img className={styles["search-type-logo"]} src={GOOGLE_LOGO} />,
    searchUrl:
      "https://www.google.com/search?q=${keyword}&oq=${keyword}&sourceid=chrome&ie=utf-8",
    suggestUrl:
      "https://www.google.com.hk/complete/search?hl=zh-CN&q=${keyword}&client=gws-wiz&start=0",
  },
  {
    key: "Baidu",
    label: <div>百度</div>,
    icon: <img className={styles["search-type-icon"]} src={BAIDU_ICON} />,
    logo: <img className={styles["search-type-logo"]} src={BAIDU_LOGO} />,
    searchUrl: "https://www.baidu.com/s?wd=${keyword}&tn=baidu&ie=utf-8",
    suggestUrl: "https://www.baidu.com/sugrec?wd=${keyword}&prod=pc",
  },
  {
    key: "Bing",
    label: <div>必应</div>,
    icon: <img className={styles["search-type-icon"]} src={BING_ICON} />,
    logo: <img className={styles["search-type-logo"]} src={BING_LOGO} />,
    searchUrl:
      "https://cn.bing.com/search?q=${keyword}&pq=${keyword}&from=form",
    suggestUrl:
      "https://cn.bing.com/AS/Suggestions?mkt=zh-CN&qry=${keyword}&pt=page.home&cp=2&msbqf=false&cvid=0FC838E6721A4D97B5C9894034C93D12",
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
      <div className={styles["search-logo"]}>{searchEngineInfo.logo}</div>
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
