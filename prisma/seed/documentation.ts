import { Documentation, DocumentationType } from '../../lib/src';

export const documentation = (): Documentation[] => {
  return [
    {
      documentationId: '1',
      name: 'Logo',
      type: DocumentationType.FILE,
      documentation: null,
    },
    {
      documentationId: '2',
      name: 'Project Plan',
      type: DocumentationType.FILE,
      documentation: null,
    },
    {
      documentationId: '3',
      name: 'Site Maps',
      type: DocumentationType.FOLDER,
      documentation: [
        {
          documentationId: '4',
          name: 'Site Map Item',
          type: DocumentationType.FILE,
          documentation: null,
        },
      ],
    },
  ];
};
