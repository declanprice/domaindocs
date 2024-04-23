import { Table } from '../table/Table';
import { Secret } from '@domaindocs/lib';

type SecretTableProps = {
    secrets: Secret[];
    onSecretClick: (secret: Secret) => void;
};

export const SecretTable = (props: SecretTableProps) => {
    const { secrets, onSecretClick } = props;

    return (
        <Table
            data={secrets}
            fields={[
                {
                    label: 'Name',
                    render: (data: Secret) => `${data.name}`,
                    onClick: (secret) => {
                        onSecretClick(secret);
                    },
                },
                {
                    label: 'Subdomain',
                    render: (data: Secret) => `${data.project.subdomainName}`,
                    onClick: (secret) => {
                        onSecretClick(secret);
                    },
                },
                {
                    label: 'Project',
                    render: (data: Secret) => `${data.project.projectName}`,
                    onClick: (secret) => {
                        onSecretClick(secret);
                    },
                },
            ]}
        />
    );
};
