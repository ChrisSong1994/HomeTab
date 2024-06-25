/**
 * promise 结果转数组
 */
export function to(promise) {
  return new Promise((resolve) => {
    promise.then(
      (res) => resolve([res, null]),
      (err) => resolve([null, err])
    );
  });
}

// 生成id
export function generateId() {
  return Date.now();
}

/**
 * 获取页面的icon
 */
export async function getDocumentIconByUrl(url) {
  return null;
}

/**
 * 图片加载
 */

export function imageLoad(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve();
    };
  });
}
