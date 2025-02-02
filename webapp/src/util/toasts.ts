import { AxiosError } from 'axios';
import { toaster } from '../components/ui/toaster';

export const apiErrorToast = (error: any) => {
    if (error instanceof AxiosError) {
        toaster.error({
            title: error?.response?.data?.error?.message ?? 'Something went wrong',
            colorScheme: 'red',
        });
    } else {
        toaster.error({
            title: 'Something went wrong',
            colorScheme: 'red',
        });
    }
};
