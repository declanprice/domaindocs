import { useMutation } from '@tanstack/react-query';
import { DetailedPerson, EditDescriptionData } from '@domaindocs/types';
import { peopleApi } from '../../../state/api/people-api';
import { Description } from '../../../components/description/Description';
import { apiErrorToast, apiSuccessToast } from '../../../util/toasts';

type PersonDescriptionProps = {
    domainId: string;
    person: DetailedPerson;
};

export const PersonDescription = (props: PersonDescriptionProps) => {
    const { domainId, person } = props;

    const { mutateAsync: updateDescription } = useMutation<void, any, EditDescriptionData>({
        mutationFn: (data) => peopleApi.updateDescription(domainId, person.person.userId, data),
        onSuccess: () => apiSuccessToast('Successfully updated'),
        onError: apiErrorToast,
    });

    return (
        <Description
            placeholder={'Description'}
            description={person.person.description}
            onUpdateDescription={updateDescription}
        />
    );
};
