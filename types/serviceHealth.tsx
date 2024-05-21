export type HealthDataProps = {
  status: string;
  components: {
    db?: {
      status: string;
      details: {
        database: string;
        validationQuery: string;
      };
    };
    diskSpace: {
      status: string;
      details: {
        total: number;
        free: number;
        threshold: number;
        path: string;
        exists: boolean;
      };
    };
    ping: {
      status: string;
    };
    r2dbc?: {
      status: string;
      details: {
        database: string;
        validationQuery: string;
      };
    };
  };
};
