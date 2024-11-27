// utils/apiUrl.js

export function getApiUrl(path) {
    const baseUrl = process.env.VUE_APP_API_URL;
    const isLocal = process.env.NODE_ENV === "local";
    return isLocal ? `${baseUrl}${path}/` : `${baseUrl}${path}`;
  }
  