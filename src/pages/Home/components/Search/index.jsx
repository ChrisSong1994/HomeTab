import React from "react";
import { Dropdown } from "antd";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";

import GOOGLE_LOGO from "../../../../assets/images/google.png";
import styles from "./index.less";

const DROPDOWN_ITEMS = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
];

const Search = () => {
  const handleChange = (e) => {
    const keyword = e.target.value;
    console.log("keyword", keyword);
  };

  return (
    <div className={styles["search-wrapper"]}>
      <div className={styles["search"]}>
        <Dropdown menu={{ items: DROPDOWN_ITEMS }}>
          <div className={styles["search-engin"]}>
            <img className={styles["search-engin-logo"]} src={GOOGLE_LOGO} />
            <CaretRightOutlined className={styles["search-engin-active"]} />
          </div>
        </Dropdown>

        <input
          className={styles["search-input"]}
          id="input"
          type="search"
          autocomplete="off"
          spellcheck="false"
          role="combobox"
          aria-controls="matches"
          placeholder="输入搜索内容，或网址"
          aria-expanded="false"
          aria-live="polite"
          onChange={handleChange}
        />
        <div className={styles["search-btn"]}>
          <SearchOutlined />
        </div>
      </div>
    </div>
  );
};

export default Search;
