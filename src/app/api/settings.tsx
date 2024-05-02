const BASE_URL = 'https://api.imats.se/';

const VISMA_SYNC_SERVICE = `${BASE_URL}sync-service/`;

const VISMA_SYNC_SERVICE_OPTIONS = {
  info: '/info',
  sync: '/sync',
  syncCheck: '/sync-check',
};

type ApiConfigType = {
  [key: string]: {
    api: string;
    name: string;
  };
};

const VISMA_SYNC_API: ApiConfigType = {
  vouchers: {
    api: `${VISMA_SYNC_SERVICE}vouchers`,
    name: 'Vouchers',
  },
  fiscalYear: {
    api: `${VISMA_SYNC_SERVICE}fiscalyear`,
    name: 'Fiscal year',
  },
  vatCode: {
    api: `${VISMA_SYNC_SERVICE}vatcode`,
    name: 'Vat code',
  },
  account: {
    api: `${VISMA_SYNC_SERVICE}account`,
    name: 'Account',
  },
  accountType: {
    api: `${VISMA_SYNC_SERVICE}accounttype`,
    name: 'Account type',
  },
  accountBalance: {
    api: `${VISMA_SYNC_SERVICE}accountbalance`,
    name: 'Account balance',
  },
};

export { VISMA_SYNC_API, VISMA_SYNC_SERVICE_OPTIONS };
