import axios from 'axios';

axios.defaults.crossDomain = true;

class AxiosClient {
  get(url, params) {
    const config = {
      params,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    return axios.get(url, config);
  }

  ajax(params) {

    params.headers = {
        // 'Access-Control-Allow-Origin':'*',
        'Content-Type': 'application/json',
      };
    return axios(params);
  }

  put(params) {
    params.method = 'put';
    return this.ajax(params);
  }

  post(params) {
      console.log("post method");
    params.method = 'post';
    return this.ajax(params);
  }

  delete(params) {
    params.method = 'delete';
    return this.ajax(params);
  }
}

export default new AxiosClient();
