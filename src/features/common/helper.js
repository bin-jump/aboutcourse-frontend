import axios from 'axios';

function requestFromMethod({
  url,
  method = 'GET',
  data = null,
  header = null,
}) {
  let config = {};
  if (header) {
    config.headers = {
      ...header,
    };
  }

  let req = null;
  if (method === 'GET') {
    req = axios.get(url, config);
  } else if (method === 'POST') {
    req = axios.post(url, data, config);
  } else if (method === 'PUT') {
    req = axios.put(url, data, config);
  } else if (method === 'DELETE') {
    req = axios.delete(url, config);
  }

  return req;
}

function makeRequest({
  url,
  beginConst,
  successConst,
  failureConst,
  method = 'GET',
  data = null,
  id = null,
  extra = null,
}) {
  return (dispatch) => {
    dispatch({
      type: beginConst,
      id,
      extra,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = requestFromMethod({ url, method, data });
      doRequest.then(
        (res) => {
          dispatch({
            type: successConst,
            data: res.data,
            id,
            extra,
          });

          resolve(res);
        },
        (err) => {
          const { status } = err.response;

          dispatch({
            type: failureConst,
            data: { error: err },
            id,
            extra,
          });

          reject(err);
        },
      );
    });

    return promise;
  };
}

export function getRequest(
  url,
  beginConst,
  successConst,
  failureConst,
  id,
  extra,
) {
  return makeRequest({
    url,
    beginConst,
    successConst,
    failureConst,
    id,
    extra,
  });
}

export function postRequest(
  url,
  data,
  beginConst,
  successConst,
  failureConst,
  id,
  extra,
) {
  return makeRequest({
    url,
    data,
    method: 'POST',
    beginConst,
    successConst,
    failureConst,
    id,
    extra,
  });
}

export function putRequest(
  url,
  data,
  beginConst,
  successConst,
  failureConst,
  id,
  extra,
) {
  return makeRequest({
    url,
    data,
    method: 'PUT',
    beginConst,
    successConst,
    failureConst,
    id,
    extra,
  });
}

export function deleteRequest(
  url,
  beginConst,
  successConst,
  failureConst,
  id,
  extra,
) {
  return makeRequest({
    url,
    method: 'DELETE',
    beginConst,
    successConst,
    failureConst,
    id,
    extra,
  });
}

export function extractUrlKey(path) {
  if (path.endsWith('/')) {
    path = path.slice(0, -1);
  }
  let key = path.split('/').slice(-1)[0];
  return key;
}

export const striphtml = (content) => {
  const res = content.replace(/(<([^>]+)>)/gi, '');
  return res;
};
