chrome.runtime.onMessage.addListener(function (data, _option, callback) {
  if (data.type === "SEARCH_SUGGEST_FETCH") {
    handleSearchSuggestFetch(data.payload, callback);
  }
  return true;
});

function handleSearchSuggestFetch(data, callback) {
  const { searchEngineInfo, keyword } = data;
  const suggestUrl = searchEngineInfo.suggestUrl.replace("${keyword}", keyword);
  fetch(suggestUrl, {
    method: "get",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then((res) => {
      let result;
      if (searchEngineInfo.key === "Google") {
        result = res.text();
      } else {
        result = res.json();
      }
      return result;
    })
    .then((res) => {
      callback && callback(res);
    });
}
