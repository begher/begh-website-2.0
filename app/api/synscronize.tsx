import axios from 'axios';
import { VISMA_SYNC_API, VISMA_SYNC_SERVICE_OPTIONS } from './settings';

const synscronize = (endpoint: string, syncType: string, accessToken: string) => {
  const config = VISMA_SYNC_API[endpoint];
  if (!config) {
    return Promise.reject(new Error('Invalid endpoint specified'));
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const url = `${config.api}${VISMA_SYNC_SERVICE_OPTIONS[syncType]}`;

  return axios
    .get(url, { headers })
    .then((response) => ({
      name: config.name,
      data: response.data,
    }))
    .catch((error) => ({
      error: error.message,
    }));
};

export default synscronize;
