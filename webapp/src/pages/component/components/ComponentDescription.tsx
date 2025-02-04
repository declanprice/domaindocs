import { DetailedComponent, EditDescriptionData } from '@domaindocs/types';
import { Description } from '../../../components/description/Description';
import { useMutation } from '@tanstack/react-query';
import { componentsApi } from '../../../state/api/components-api';

type ComponentDescriptionProps = {
    domainId: string;
    component: DetailedComponent;
};

export const ComponentDescription = (props: ComponentDescriptionProps) => {
    const { domainId, component } = props;

    const { mutateAsync: updateDescription } = useMutation<void, any, EditDescriptionData>({
        mutationFn: (data) => componentsApi.updateDescription(domainId, component.component.componentId, data),
    });

    return (
        <Description
            placeholder={'Add a component description'}
            description={component.component.description}
            onUpdateDescription={updateDescription}
        />
    );
};
