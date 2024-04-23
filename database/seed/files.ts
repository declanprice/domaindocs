import { file } from '../src';

export const files = (domainId: string, projectId: string): typeof file.$inferInsert[] => [
  {
    fileId: `${projectId}-1`,
    type: 'jpeg',
    name: 'File 1',
    domainId,
    projectId,
    uri: 's3://example.com/Secret 1.jpeg'
  },
  {
    fileId: `${projectId}-2`,
    type: 'jpeg',
    name: 'File 2',
    domainId,
    projectId,
    uri: 's3://example.com/Secret 2.jpeg'
  },
  {
    fileId: `${projectId}-3`,
    type: 'jpeg',
    name: 'File 3',
    domainId,
    projectId,
    uri: 's3://example.com/Secret 3.jpeg'
  },
  {
    fileId: `${projectId}-4`,
    type: 'jpeg',
    name: 'File 4',
    domainId,
    projectId,
    uri: 's3://example.com/Secret 4.jpeg'
  },
  {
    fileId: `${projectId}-5`,
    type: 'jpeg',
    name: 'File 5',
    domainId,
    projectId,
    uri: 's3://example.com/Secret 5.jpeg'
  },
  {
    fileId: `${projectId}-6`,
    type: 'jpeg',
    name: 'File 6',
    domainId,
    projectId,
    uri: 's3://example.com/Secret 6.jpeg'
  }
]

