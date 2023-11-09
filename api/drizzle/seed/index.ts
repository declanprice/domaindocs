import {randomUUID} from "crypto";
import process from "process";

import {db, users} from "../../src/schema";

await db.insert(users).values([{id: randomUUID()}]);

process.exit(0);