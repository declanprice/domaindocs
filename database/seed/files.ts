import { file } from '../src/file';

export const files = (domainId: string): typeof file.$inferInsert[] => [
  {
    fileId: '1',
    type: 'jpeg',
    name: 'File 1',
    domainId,
    uri: 's3://example.com/File 1.jpeg'
  },
  {
    fileId: '1',
    type: 'jpeg',
    name: 'File 2',
    domainId,
    uri: 's3://example.com/File 2.jpeg'
  },
  {
    fileId: '1',
    type: 'jpeg',
    name: 'File 3',
    domainId,
    uri: 's3://example.com/File 3.jpeg'
  },
  {
    fileId: '1',
    type: 'jpeg',
    name: 'File 4',
    domainId,
    uri: 's3://example.com/File 4.jpeg'
  },
  {
    fileId: '1',
    type: 'jpeg',
    name: 'File 5',
    domainId,
    uri: 's3://example.com/File 5.jpeg'
  },
  {
    fileId: '6',
    type: 'jpeg',
    name: 'File 6',
    domainId,
    uri: 's3://example.com/File 6.jpeg'
  }
]

