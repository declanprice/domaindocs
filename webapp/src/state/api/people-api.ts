import { apiClient } from './api-client';

export type PersonTeam = {
  teamId: string;
  teamName: string;
  subdomainName: string;
};

export type PersonSkill = {
  skillId: string;
  skillName: string;
  skillDescription: string;
};

export type Person = {
  personId: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  contact: {
    personalContactMobile?: string;
    personalContactEmail?: string;
    contactEmail?: string;
    contactMobile?: string;
  };
  iconUri: string | undefined;
  roleName: string | undefined;
};

export type DetailedPerson = {
  person: Person;
  skills: PersonSkill[];
  team: PersonTeam | null;
};

export type SearchPeopleParams = {
  name?: string;
  subdomainId?: string;
};

export const peopleApi = (() => {
  const searchPeople = async (
    domainId: string,
    data: SearchPeopleParams,
  ): Promise<DetailedPerson[]> => {
    const result = await apiClient.get<DetailedPerson[]>(
      `/domains/${domainId}/people`,
      {
        params: data,
      },
    );

    return result.data;
  };

  return {
    searchPeople,
  };
})();
