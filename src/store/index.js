/**
 * 定义数据存储格式，优先存在本地，在用户登录时同步到用户云端
 */
import { THEME_BG_LIST } from "@/constants";

const STORE_ID = "__chrome_plugin_home_tab_store__";
export const DEFAULT_STORE = {
  // 搜索引擎
  searchEngine: "Google",
  // 背景图片配置
  backgroundUrl: THEME_BG_LIST[0].url,
  // 快捷链接配置
  shortcutLinks: [
    {
      id: 1,
      title: "youtube",
      link: "https://www.youtube.com/",
      icon: "https://www.youtube.com/favicon.ico",
    },
    {
      id: 2,
      title: "github",
      link: "https://github.com/",
      icon: "https://github.com/fluidicon.png",
    },
  ],
  // 快捷键点击跳转方式  _self | _blank
  shortcutLinkTarget: "_self",
  // 插件设置
  setting: {},
};

class Store {
  constructor() {
    this.store = DEFAULT_STORE;
    this.isRunInChromePlugin = chrome?.runtime !== undefined;
    this.observerStack = [];
    this.init();
  }

  init() {
    this.store = DEFAULT_STORE;
    if (this.isRunInChromePlugin) {
      // 先查找本地存储
      chrome.storage.local.get(STORE_ID, (data) => {
        if (data?.[STORE_ID]) {
          this.store = data[STORE_ID];
          this.subscribe(this.getData());
        } else {
          chrome.storage.local.set({ [STORE_ID]: DEFAULT_STORE });
        }
      });
      // 查看远程，有数据会进行同步
      chrome.storage.sync.get(STORE_ID, (data) => {
        if (data[STORE_ID]) {
          this.store = data[STORE_ID];
          this.subscribe(this.getData());
        }
      });
    }
  }

  getData() {
    return { ...this.store };
  }

  setData(data) {
    const newData = { ...this.store, ...data };
    this.store = newData;
    this.subscribe(newData);
    if (this.isRunInChromePlugin) {
      chrome.storage.local.set({ [STORE_ID]: newData });
      chrome.storage.sync.set({ [STORE_ID]: newData });
    }
  }

  onSubscribe(observer) {
    this.observerStack.push(observer);
  }

  subscribe(data) {
    if (this.observerStack.length) {
      this.observerStack.map((observer) => {
        observer(data);
      });
    }
  }
}

const store = new Store();

export default store;
