import { secret } from '../src'

export const secrets = (domainId: string): typeof secret.$inferInsert[] => [
  {
    secretId: '1',
    name: 'Secret 1',
    domainId,
    uri: 'https://google.com'
  },
  {
    secretId: '2',
    name: 'Secret 2',
    domainId,
    uri: 'https://google.com'
  },
  {
    secretId: '3',
    name: 'Secret 3',
    domainId,
    uri: 'https://google.com'
  },
]

