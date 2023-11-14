export type DomainView = {
  id: string;
  name: string;
  summary: string;
  subDomains: {
    subDomainId: string;
    name: string;
    teamCount: number;
    serviceCount: number;
  }[];
};
