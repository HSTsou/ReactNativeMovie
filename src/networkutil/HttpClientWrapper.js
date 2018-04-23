import axios from 'axios';
import qs from 'query-string';

const isEmptyObject = (obj) => {
  return !obj || !Object.keys(obj).length;
};

const resolveConfig = (method, defaults = {}, extras = {}) => {
  if (isEmptyObject(defaults) && isEmptyObject(extras)) {
    return {};
  }

  return {
    method,
    ...defaults,
    ...extras,
  };
};

class HttpClientWrapper {
  constructor(options = {}) {
    console.log('constructor HttpClientWrapper');
    const defaultHeaders = options.headers || {};

    const defaultOptions = {
      transformRequest: [
        (data, headers) => {
          if (
            headers['Content-Type'] === 'application/x-www-form-urlencoded' &&
            typeof data === 'object' // 避免retry時，將data重複stringify
          ) {
            return qs.stringify(data);
          }

          return data;
        },
      ],
    };

    this.defaultConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...defaultHeaders,
      },
    };

    this.instance = axios.create({ ...defaultOptions, ...options });
    this.instance.interceptors.response.use(
      this.handleSuccess,
      this.handleError,
    );

    return this.instance;
  }

  handleSuccess = (resp) => {
    console.log('network response success = ', resp);
    if (resp.status && resp.status === 200) {
      return resp.data;
    }
  };

  // retry solution
  handleError = (err) => {
    console.log('network response failure = ', err);
    const { config } = err;

    if (!config || !config.retry) {
      return Promise.reject(err);
    }

    config.retryCount = config.retryCount || 0;

    console.log('failure config = ', config);

    if (config.retryCount >= config.retry) {
      return Promise.reject(err);
    }

    config.retryCount += 1;

    const backoff = new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, config.retryDelay || 1);
    });

    return backoff.then(() => {
      console.log('retry', this.instance.config);
      this.instance(config);
    });
  };

  get(url, config = {}) {
    return new Promise((reslove) => {
      reslove(
        this.instance.get(
          url,
          resolveConfig('get', this.defaultConfig, config),
        ),
      );
    });
  }

  post(url, data = undefined, config = {}) {
    return new Promise((resolve) => {
      resolve(
        this.instance.post(
          url,
          data,
          resolveConfig('post', this.defaultConfig, config),
        ),
      );
    });
  }

  // all = (anyRequest = []) => {
  //   return new Promise((resolve) => {
  //     resolve(axios.all([anyRequest]));
  //   });
  // };
}

export const createHttpClient = (options, defaults) =>
  new HttpClientWrapper(options, defaults);

export default HttpClientWrapper;
