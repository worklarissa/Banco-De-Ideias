import axios from "axios";

export const FetchApi = async (method, url, data = null, authToken = null) => {
  const headers = authToken
    ? {
        "x-acess-token": authToken,
      }
    : {};

  const response = await axios({
    method,
    url,
    data,
    headers,
  });

  const result = response.data;

  return result;
};
