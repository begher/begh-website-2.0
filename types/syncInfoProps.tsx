export interface SyncInfoProps {
  data: {
    completed: {
      createdAt: string | null;
      duration: number | null;
    };
    error: {
      createdAt: string | null;
      message: string | null;
      page: string | null;
    };
    start: {
      createdAt: string | null;
      message: string | null;
    };
  };
  name: string;
}
