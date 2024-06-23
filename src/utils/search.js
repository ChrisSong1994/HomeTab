export const googleSearchSuggestParse = (res) => {
  let text = res
    .replace(new RegExp("window.google.ac.h"), "")
    .replace("(", "")
    .replace(")", "");
  const result = JSON.parse(text) || [];
  if (result.length) {
    const list = result[0];
    return list.map((item) => {
      const keyword = item[0];
      return {
        keyword: keyword,
        icon: item?.[3]?.zs,
        link: `https://www.google.com/search?q=${keyword}`,
      };
    });
  }
  return result;
};

export const baiduSearchSuggestParse = (res) => {
  const result = res?.g || [];
  return result.map((item) => {
    const keyword = item.q;
    return {
      keyword: keyword,
      icon: null,
      link: `https://www.baidu.com/s?wd=${keyword}`,
    };
  });
};

export const bingSearchSuggestParse = (res) => {
  const result = res?.s || [];
  return result.map((item) => {
    const keyword = item.q.replaceAll("", "").replaceAll("", "");
    return {
      keyword: keyword,
      icon: null,
      link: `https://cn.bing.com${item.u}`,
    };
  });
};

export const searchSuggestParse = (type, result) => {
  let data = [];
  switch (type) {
    case "Google":
      data = googleSearchSuggestParse(result);
      break;
    case "Baidu":
      data = baiduSearchSuggestParse(result);
      break;
    case "Bing":
      data = bingSearchSuggestParse(result);
      break;
  }

  return data;
};
