import BaseHttpClient from './BaseHttpClient';

const API_VERSION = '';
const API_NAME = '';
const API_PRE_TEXT = API_VERSION + API_NAME;
const RETRY_CONFIG = { retry: 5, retryDelay: 1000 };

const assembleURL = (url) => API_PRE_TEXT + url;

class MobileApiService extends BaseHttpClient {
  getLastVideo = (data) => {
    console.log('getLastVideo');
    return this.httpClient.post(
      assembleURL('/latest_video_list'),
      data,
      RETRY_CONFIG,
    );
    // return this.httpClient.post('learning/restful/dictionary.php/query/Dictionary', data, RETRY_CONFIG);
  };
}

export default MobileApiService;
