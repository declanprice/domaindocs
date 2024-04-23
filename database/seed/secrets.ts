import { secret } from '../src'

export const secrets = (domainId: string, projectId: string): typeof secret.$inferInsert[] => [
  {
    secretId: `${projectId}-1`,
    name: 'Secret 1',
    domainId,
    projectId,
    uri: 'https://google.com'
  },
  {
    secretId: `${projectId}-2`,
    name: 'Secret 2',
    domainId,projectId,
    uri: 'https://google.com'
  },
  {
    secretId: `${projectId}-3`,
    name: 'Secret 3',
    domainId,projectId,
    uri: 'https://google.com'
  },
]

