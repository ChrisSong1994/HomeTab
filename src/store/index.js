/**
 * 定义数据存储格式，优先存在本地，在用户登录时同步到用户云端
 */

const STORE_ID = "__chrome_plugin_home_tab_store__";
export const DEFAULT_STORE = {
  // 搜索引擎
  searchEngine: "Google",
  // 背景图片配置
  backgroundUrl: "/public/images/default_theme_bg.png",
  // 快捷链接配置
  shortcutLinks: [
    {
      id: 1,
      title: "npm",
      link: "https://www.npmjs.com/",
      icon:
        "https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png",
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
    this.init();
  }

  init() {
    if (this.isRunInChromePlugin) {
      // 先查找本地存储
      chrome.storage.local.get(STORE_ID, (data) => {
        if (data?.[STORE_ID]) {
          this.store = data[STORE_ID];
        } else {
          this.store = DEFAULT_STORE;
          chrome.storage.local.set({ [STORE_ID]: DEFAULT_STORE });
        }
      });
      // 查看远程，有数据会进行同步
      chrome.storage.sync.get(STORE_ID, (result) => {
        if (result[STORE_ID]) {
          this.store = result[STORE_ID];
        }
      });
    } else {
      this.store = DEFAULT_STORE;
    }
  }

  getData() {
    return { ...this.store };
  }

  setData(data) {
    const newData = { ...this.store, ...data };
    this.store = newData;
    if (this.isRunInChromePlugin) {
      chrome.storage.local.set({ [STORE_ID]: newData });
      chrome.storage.sync.set({ [STORE_ID]: newData });
    }
  }
}

const store = new Store();

export default store;
