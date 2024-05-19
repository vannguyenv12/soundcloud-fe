import queryString from "query-string";

export const sendRequest = ({
  url,
  method,
  useCredentials = false,
  body,
  headers = {},
  queryParams = {},
  nextOptions = {},
}) => {
  const options = {
    method: method,
    headers: new Headers({ "content-type": "application/json", ...headers }), // by default setting the content-type to be json type
    body: body ? JSON.stringify(body) : null,
    ...nextOptions,
  };
  if (useCredentials) options.credentials = "include";
  if (queryParams) {
    url = `${url}?${queryString.stringify(queryParams)}`;
  }

  return fetch(url, options).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return res.json().then(function (json) {
        // to be able to access error status when you catch the error
        return Promise.reject({
          status: res.status,
          ok: false,
          message: json.message,
          body: json,
        });
      });
    }
  });
};
