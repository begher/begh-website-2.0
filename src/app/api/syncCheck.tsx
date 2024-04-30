import axios from 'axios';
import { VISMA_SYNC_API, VISMA_SYNC_SERVICE_OPTIONS } from './settings';

const syncCheck = (type: string) => {
  const config = VISMA_SYNC_API[type];
  if (!config) {
    return Promise.reject(new Error('Invalid type specified'));
  }

  const url = `${config.api}${VISMA_SYNC_SERVICE_OPTIONS.syncCheck}`;

  return axios
    .get(url)
    .then((response) => ({
      name: config.name,
      data: response.data,
    }))
    .catch((error) => ({
      error: error.message,
    }));
};

export default syncCheck;
