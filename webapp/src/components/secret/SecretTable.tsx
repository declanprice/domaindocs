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
            ]}
        />
    );
};
