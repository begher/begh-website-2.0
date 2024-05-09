export interface Service {
  name: string;
  uptime: string;
  health: string;
  online: boolean;
  url: string;
}

export interface ServiceStatus {
  services: Service[];
}
