import {PrismaClient} from "@prisma/client"
const prisma = new PrismaClient()

export async function getSignerKeyIndex() {
  const results: {index: number}[] = await prisma.$queryRaw`
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

  return results[0].index
}
