import axios from "axios";

export default {
  postApi(endpointUrl, requestPayload) {
    return axios.post(endpointUrl, requestPayload);
  },
  
  getApi(endpointUrl, requestPayload) {
    return axios.get(endpointUrl, { params: requestPayload });
  },

  putApi(endpointUrl, requestPayload) {
    return axios.put(endpointUrl, requestPayload);
  },

  deleteApi(endpointUrl) {
    return axios.delete(endpointUrl);
  },
};