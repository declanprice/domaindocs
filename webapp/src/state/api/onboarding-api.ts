import { apiClient } from './api-client';
import { CreateEditOnboardingGuideData, DetailedOnboardingGuide } from '@domaindocs/lib';

export const onboardingApi = (() => {
    const search = async (domainId: string): Promise<DetailedOnboardingGuide[]> => {
        const result = await apiClient.get<DetailedOnboardingGuide[]>(`/domains/${domainId}/onboarding`, {});
        return result.data;
    };

    const getRecommended = async (domainId: string): Promise<DetailedOnboardingGuide[]> => {
        const result = await apiClient.get<DetailedOnboardingGuide[]>(`/domains/${domainId}/onboarding/recommended`);
        return result.data;
    };

    const get = async (domainId: string, guideId: string): Promise<DetailedOnboardingGuide> => {
        const result = await apiClient.get<DetailedOnboardingGuide>(`/domains/${domainId}/onboarding/${guideId}`);
        return result.data;
    };

    const create = async (domainId: string, data: CreateEditOnboardingGuideData): Promise<void> => {
        await apiClient.post<void>(`/domains/${domainId}/onboarding`, data);
    };

    return {
        search,
        getRecommended,
        get,
        create,
    };
})();
