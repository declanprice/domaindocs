import process from 'process'

import {
    db,
    documentation,
    accounts,
    people,
    organisations,
    domains,
    products
} from '../../src/schema'

const accountId = 'a3718d47-1366-457a-8da5-1203f10598cd'
const organisationId = 'a4718d47-1366-457a-8da5-1203f10598cd'
const organisationDocsId = 'a5718d47-1366-457a-8da5-1203f10598cd'

// await db.delete(people)
// await db.delete(accounts)
// await db.delete(domains)
// await db.delete(products)
// await db.delete(organisations)
// await db.delete(documentation)

// await db.insert(accounts).values([
//     {
//         id: userId,
//         email: 'declanprice1@gmail.com',
//         displayName: 'Declan Price',
//         aboutMe: '',
//         skills: []
//     }
// ])
//
// await db.insert(documentation).values([
//     {
//         id: domainDocumentationId
//     },
//     {
//         id: subDomainDocumentationId
//     }
// ])
//
// await db.insert(domains).values({
//     name: 'Ford UK',
//     summary: 'test summary',
//     documentationId: domainDocumentationId,
//     id: domainId
// })
//
// await db.insert(domains).values([
//     {
//         id: subDomainId,
//         name: 'Restaurant',
//         domainId: domainId,
//         documentationId: subDomainDocumentationId
//     },
//     {
//         id: randomUUID(),
//         name: 'Order',
//         domainId: domainId,
//         documentationId: subDomainDocumentationId
//     },
//     {
//         id: randomUUID(),
//         name: 'customer',
//         domainId: domainId,
//         documentationId: subDomainDocumentationId
//     }
// ])
//
// await db.insert(domainUsers).values({
//     domainId: domainId,
//     id: randomUUID(),
//     userId: userId,
//     contactEmail: 'declanprice1@gmail.com',
//     contactNumber: '',
//     role: 'Employee'
// })

process.exit(0)
