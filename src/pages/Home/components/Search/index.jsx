import React, { useRef, useState, useLayoutEffect, useEffect } from "react";
import { Dropdown, Popover } from "antd";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";

import { searchSuggestParse } from "@/utils";
import { useStore } from "@/hooks";
import SuggestList from "./SuggestList";
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
      "https://cn.bing.com/AS/Suggestions?pt=page.serp&bq=a&mkt=zh-cn&ds=mobileweb&qry=${keyword}&cp=1&csr=1&zis=1&msbqf=false&pths=1&cvid=A56BE7B7802A40F89FC5D0505AAE4B9C",
  },
];

const Search = () => {
  const inputRef = useRef(null);
  const [store, setStore] = useStore();
  const [suggestList, setSuggestList] = useState([]);
  const [suggestShow, setSuggestShow] = useState(false);
  const isSuggestShow = suggestList.length && suggestShow;

  const searchEngineInfo = SEARCH_ENGINES.find(
    (item) => item.key === store.searchEngine
  );

  const handleSearchEnginChange = ({ key }) => {
    setStore({ searchEngine: key });
  };

  const handleSearchFocus = () => {
    setSuggestShow(true);
  };

  const handleSearchBlur = () => {
    setSuggestShow(false);
  };

  const handleSearch = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      const keyword = encodeURIComponent(inputRef.current.value);
      const searchUrl = searchEngineInfo.searchUrl.replaceAll(
        "${keyword}",
        keyword
      );
      window.open(searchUrl);
    }
  };

  const handleInputChange = () => {
    const keyword = inputRef.current.value.trim();
    const queryKeyword = encodeURIComponent(keyword);

    if (chrome?.runtime !== undefined && keyword) {
      chrome.runtime.sendMessage(
        {
          type: "SEARCH_SUGGEST_FETCH",
          payload: {
            searchEngineInfo: {
              suggestUrl: searchEngineInfo.suggestUrl,
              key: searchEngineInfo.key,
            },
            keyword: queryKeyword,
          },
        },
        null,
        (result) => {
          const searchSuggestData = searchSuggestParse(
            searchEngineInfo.key,
            result,
            keyword
          );
          if (searchSuggestData.length >= 1) {
            setSuggestList(searchSuggestData);
          } else {
            setSuggestList([]);
          }
        }
      );
    }
    if (!keyword) {
      setSuggestShow(false);
    } else {
      setSuggestShow(true);
    }
  };

  useLayoutEffect(() => {
    if (inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100);
      inputRef.current.addEventListener("keydown", handleSearch);
    }
    handleInputChange();
    return () => {
      inputRef.current &&
        inputRef.current.removeEventListener("keydown", handleSearch);
    };
  }, [searchEngineInfo]);

  return (
    <div className={styles["search-wrapper"]}>
      {searchEngineInfo.logo}
      <Popover
        style={{ width: 500 }}
        trigger="click"
        title={null}
        arrow={false}
        placement="bottom"
        open={isSuggestShow}
        content={
          <SuggestList
            data={suggestList}
            engine={searchEngineInfo.key}
            onSelect={(v) => {
              inputRef.current.value = v;
            }}
          />
        }
      >
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
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            onChange={handleInputChange}
          />
          <div className={styles["search-btn"]} onClick={handleSearch}>
            <SearchOutlined />
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default Search;
