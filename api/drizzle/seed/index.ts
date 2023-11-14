import process from 'process'
import {
    db,
    documentation,
    domains,
    domainUsers,
    users
} from '../../src/schema'
import { randomUUID } from 'crypto'

const userId = 'a3718d47-1366-457a-8da5-1203f10598cd'
const domainId = 'a4718d47-1366-457a-8da5-1203f10598cd'
const domainDocumentationId = 'a5718d47-1366-457a-8da5-1203f10598cd'

await db.delete(domainUsers)
await db.delete(users)
await db.delete(documentation)
await db.delete(domains)

await db.insert(users).values([
    {
        id: userId,
        email: 'declanprice1@gmail.com',
        displayName: 'Declan Price',
        aboutMe: '',
        skills: []
    }
])

await db.insert(documentation).values({
    id: domainDocumentationId
})

await db.insert(domains).values({
    domainName: 'Ford UK',
    documentationId: domainDocumentationId,
    id: domainId
})

await db.insert(domainUsers).values({
    domainId: domainId,
    id: randomUUID(),
    userId: userId,
    contactEmail: 'declanprice1@gmail.com',
    contactNumber: '',
    role: 'Employee'
})

process.exit(0)
