import {
    DetailedWorkArea,
    DetailedWorkBoard,
    WorkArea,
    WorkAreaPerson,
    WorkBoardColumn,
    WorkItem,
} from '@domaindocs/lib';

export const workApi = () => {
    const search = async (): Promise<DetailedWorkArea[]> => {
        return [
            new DetailedWorkArea(
                {
                    id: '1',
                    name: 'Team Orion - Work Area',
                },
                [new WorkAreaPerson('1', 'Declan', 'Price'), new WorkAreaPerson('2', 'Natasha', 'Leslie')],
            ),
        ];
    };

    const getWorkBoard = async (): Promise<DetailedWorkBoard> => {
        return new DetailedWorkBoard(
            new WorkArea('1', 'Team Orion - Work Area'),
            [
                new WorkAreaPerson('1', 'Declan', 'Price'),
                new WorkAreaPerson('2', 'Ben', 'Munroe'),
                new WorkAreaPerson('3', 'Natasha', 'Leslie'),
            ],
            [
                new WorkBoardColumn('1', 'Ready', [new WorkItem('1', 'Item 1')]),
                new WorkBoardColumn('2', 'Doing', [new WorkItem('2', 'Item 2')]),
                new WorkBoardColumn('3', 'Done', [new WorkItem('2', 'Item 3')]),
            ],
        );
    };

    return {
        search,
        getWorkBoard,
    };
};
