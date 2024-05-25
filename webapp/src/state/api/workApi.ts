import {
    DetailedWorkArea,
    DetailedWorkBoard,
    WorkArea,
    WorkAreaPerson,
    WorkBoardColumn,
    WorkItem,
} from '@domaindocs/types';

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
                new WorkBoardColumn('1', 'Ready', [
                    new WorkItem('1', 'Item 1'),
                    new WorkItem('2', 'Item 2'),
                    new WorkItem('3', 'Item 3'),
                ]),
                new WorkBoardColumn('2', 'Doing', [new WorkItem('4', 'Item 4')]),
                new WorkBoardColumn('3', 'Done', [new WorkItem('5', 'Item 5')]),
            ],
        );
    };

    return {
        search,
        getWorkBoard,
    };
};
