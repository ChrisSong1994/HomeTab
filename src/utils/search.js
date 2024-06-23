export const googleSearchSuggestParse = (res) => {
  let text = res
    .replace(new RegExp("window.google.ac.h"), "")
    .replace("(", "")
    .replace(")", "");
  const result = JSON.parse(text) || [];
  if (result.length) {
    const list = result[0];
    return list.map((item) => {
      return {
        keyword: item[0],
        icon: item?.[3]?.zs,
        link: null,
      };
    });
  }
  return result;
};

export const baiduSearchSuggestParse = (res) => {
  const result = res?.g || [];
  return result.map((item) => {
    return {
      keyword: item.q,
      icon: null,
      link: null,
    };
  });
};

export const bingSearchSuggestParse = (res) => {
  const result = res?.s || [];
  return result.map((item) => {
    return {
      keyword: item.q.replaceAll("", "").replaceAll("", ""),
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
