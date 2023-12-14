const getAssetsFile = (queryId, url) => {
  return new URL(`../assets/ExcelProcess/Excel ${queryId}/${url}`, import.meta.url).href;
};
   
export default {
  getAssetsFile,
};