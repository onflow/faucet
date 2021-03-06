import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()

const getOldestKey = `
UPDATE key
SET last_used_at = current_timestamp
WHERE index = (
  SELECT index
  FROM key
  ORDER BY last_used_at
  LIMIT 1
)
RETURNING index
`

export async function getSignerKeyIndex() {
  const results = await prisma.$queryRaw(getOldestKey)
  return results[0].index
}
