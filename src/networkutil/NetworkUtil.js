const commonUrl = 'http://www.movingmoviezero.appspot.com';
const token = '';

function timeoutFetch(fetchPromise, timeout = 30000) {
  let abortFn = null;

  const timeoutPromise = new Promise((resolve, reject) => {
    abortFn = () => {
      reject(new Error('timeout promise...'));
    };
  });

  const abortablePromise = Promise.race([fetchPromise, timeoutPromise]);

  setTimeout(() => {
    abortFn();
  }, timeout);

  return abortablePromise;
}

export default function fetchRequest(url, method, params = '') {
  const header = {
    'Content-Type': 'application/json;charset=UTF-8',
    accesstoken: token,
  };

  console.log('request url:', url, params);

  if (params === '') {
    return new Promise((resolve, reject) => {
      fetch(commonUrl + url, {
        method,
        header,
      })
        .then(response => response.json())
        .then((responseData) => {
          console.log('res:', url, responseData);
          resolve(responseData);
        })
        .catch((err) => {
          console.log('err:', commonUrl + url, err);
          reject(err);
        });
    });
  }
  return new Promise((resolve, reject) => {
    timeoutFetch(
      fetch(commonUrl + url, {
        method,
        headers: header,
        body: JSON.stringify(params),
      }),
    )
      .then(response => response.json())
      .then((responseData) => {
        console.log('res:', url, responseData);
        resolve(responseData);
      })
      .catch((err) => {
        console.log('err:', commonUrl + url, err);
        reject(err);
      });
  });
}
