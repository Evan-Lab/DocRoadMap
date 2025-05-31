const getToken = (): Promise<string | null> => {
  return new Promise((resolve) => {
    if (typeof chrome !== "undefined" && chrome.storage?.local) {
      chrome.storage.local.get("token", (result) => {
        resolve(result.token ?? null);
      });
    } else {
      resolve(localStorage.getItem("token"));
    }
  });
};
export default getToken;
