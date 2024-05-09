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


/**
 * 获取页面的icon
*/
export async function getDocumentIconByUrl(url){

return null

}