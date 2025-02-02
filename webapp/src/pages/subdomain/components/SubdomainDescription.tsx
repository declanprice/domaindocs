import { useMutation } from '@tanstack/react-query';
import { EditDescriptionData, Subdomain } from '@domaindocs/types';
import { Description } from '../../../components/description/Description';
import { subdomainsApi } from '../../../state/api/subdomains-api';

type SubdomainDescriptionProps = {
    subdomain: Subdomain;
};

export const SubdomainDescription = (props: SubdomainDescriptionProps) => {
    const { subdomain } = props;

    const { mutateAsync: updateDescription } = useMutation<void, any, EditDescriptionData>({
        mutationFn: (data) => subdomainsApi.updateDescription(subdomain.domainId, subdomain.subdomainId, data),
    });

    return (
        <Description
            placeholder={'Add a subdomain description.'}
            description={subdomain.description}
            onUpdateDescription={updateDescription}
        />
    );
};
