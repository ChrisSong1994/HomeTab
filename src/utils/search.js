export const googleSearchSuggestParse = (res, searchKeyword) => {
  let text = res
    .replace(new RegExp("window.google.ac.h"), "")
    .replace("(", "")
    .replace(")", "");
  const result = JSON.parse(text) || [];
  if (result.length) {
    const list = result[0];
    const data = list.map((item) => {
      const keyword = item[0];
      return {
        keyword: keyword,
        icon: item?.[3]?.zs,
        link: `https://www.google.com/search?q=${encodeURIComponent(keyword)}`,
      };
    });
    // 补充搜索关键词
    if (data.length && data[0].keyword !== searchKeyword) {
      return [
        {
          keyword: searchKeyword,
          icon: null,
          link: `https://www.google.com/search?q=${encodeURIComponent(
            searchKeyword
          )}`,
        },
        ...data,
      ];
    } else {
      return data;
    }
  }
  return result;
};

export const baiduSearchSuggestParse = (res, searchKeyword) => {
  const result = res?.g || [];
  const data = result.map((item) => {
    const keyword = item.q;
    return {
      keyword: keyword,
      icon: null,
      link: `https://www.baidu.com/s?wd=${encodeURIComponent(keyword)}`,
    };
  });
  // 补充搜索关键词
  if (data.length && data[0].keyword !== searchKeyword) {
    return [
      {
        keyword: searchKeyword,
        icon: null,
        link: `https://www.baidu.com/s?wd=${encodeURIComponent(searchKeyword)}`,
      },
      ...data,
    ];
  } else {
    return data;
  }
};

export const bingSearchSuggestParse = (res, searchKeyword) => {
  const result = res?.s || [];
  const data = result.map((item) => {
    const keyword = item.q.replaceAll("", "").replaceAll("", "");
    console.log(item);
    return {
      keyword: keyword,
      icon: null,
      link: `https://cn.bing.com${item.u}`,
    };
  });
  // 补充搜索关键词
  if (data.length && data[0].keyword !== searchKeyword) {
    return [
      {
        keyword: searchKeyword,
        icon: null,
        link: `https://cn.bing.com/search?q=${encodeURIComponent(
          searchKeyword
        )}`,
      },
      ...data,
    ];
  } else {
    return data;
  }
};

export const searchSuggestParse = (type, result, keyword) => {
  let data = [];
  switch (type) {
    case "Google":
      data = googleSearchSuggestParse(result, keyword);
      break;
    case "Baidu":
      data = baiduSearchSuggestParse(result, keyword);
      break;
    case "Bing":
      data = bingSearchSuggestParse(result, keyword);
      break;
  }

  return data;
};
