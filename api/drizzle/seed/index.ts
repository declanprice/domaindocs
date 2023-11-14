import process from 'process'

import {
    db,
    documentation,
    domains,
    domainUsers,
    subDomains,
    users
} from '../../src/schema'

import { randomUUID } from 'crypto'

const userId = 'a3718d47-1366-457a-8da5-1203f10598cd'
const domainId = 'a4718d47-1366-457a-8da5-1203f10598cd'
const domainDocumentationId = 'a5718d47-1366-457a-8da5-1203f10598cd'
const subDomainId = 'a6718d47-1366-457a-8da5-1203f10598cd'
const subDomainDocumentationId = 'a7718d47-1366-457a-8da5-1203f10598cd'

await db.delete(domainUsers)
await db.delete(users)
await db.delete(subDomains)
await db.delete(domains)
await db.delete(documentation)

await db.insert(users).values([
    {
        id: userId,
        email: 'declanprice1@gmail.com',
        displayName: 'Declan Price',
        aboutMe: '',
        skills: []
    }
])

await db.insert(documentation).values([
    {
        id: domainDocumentationId
    },
    {
        id: subDomainDocumentationId
    }
])

await db.insert(domains).values({
    name: 'Ford UK',
    summary: 'test summary',
    documentationId: domainDocumentationId,
    id: domainId
})

await db.insert(subDomains).values([
    {
        id: subDomainId,
        name: 'Restaurant',
        domainId: domainId,
        documentationId: subDomainDocumentationId
    },
    {
        id: randomUUID(),
        name: 'Order',
        domainId: domainId,
        documentationId: subDomainDocumentationId
    },
    {
        id: randomUUID(),
        name: 'customer',
        domainId: domainId,
        documentationId: subDomainDocumentationId
    }
])

await db.insert(domainUsers).values({
    domainId: domainId,
    id: randomUUID(),
    userId: userId,
    contactEmail: 'declanprice1@gmail.com',
    contactNumber: '',
    role: 'Employee'
})

process.exit(0)
