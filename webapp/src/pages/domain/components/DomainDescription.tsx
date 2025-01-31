import { useMutation } from '@tanstack/react-query';
import { Domain, EditDescriptionData } from '@domaindocs/types';
import { Description } from '../../../components/description/Description';
import { domainsApi } from '../../../state/api/domains-api';

type DomainDescriptionProps = {
    domain: Domain;
};

export const DomainDescription = (props: DomainDescriptionProps) => {
    const { domain } = props;

    const { mutateAsync: updateDescription } = useMutation<void, any, EditDescriptionData>({
        mutationFn: (data) => domainsApi.updateDescription(domain.domainId, data),
    });

    return (
        <Description
            placeholder={'Add a domain description.'}
            description={domain.description}
            onUpdateDescription={updateDescription}
        />
    );
};
