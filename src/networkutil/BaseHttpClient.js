import { createHttpClient } from '../networkutil/HttpClientWrapper';

const POST_CONTENT_TYPE = 'application/x-www-form-urlencoded';
const BASE_URL = '';
const TIMEOUT_MS = 30000;

class BaseHttpClient {
  constructor() {
    this.httpClient = createHttpClient({
      headers: {
        'Content-Type': POST_CONTENT_TYPE,
      },
      baseURL: BASE_URL,
      timeout: TIMEOUT_MS,
    });
  }

  getInstance() {
    return this;
  }

  get(url, config = {}) {
    return this.httpClient.get(url, config);
  }

  post(url, data = undefined, config = {}) {
    return this.httpClient.post(url, data, config);
  }
}

// const getInstance = () => {
//   return this.httpClient.getInstance();
// };

export default BaseHttpClient;
