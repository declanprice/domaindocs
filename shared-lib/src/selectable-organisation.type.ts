import { Domain } from "./domain.type";

export type SelectableOrganisation = {
  id: string;
  name: string;
  domains: Domain[];
};
