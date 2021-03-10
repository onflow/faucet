import fcl from '@onflow/fcl';

import dotenv from 'dotenv'
dotenv.config()

import prismaClientPkg from '@prisma/client';
const { PrismaClient } = prismaClientPkg;

const prisma = new PrismaClient()

const signerAddress = process.env.SIGNER_ADDRESS
const accessAPIHost = process.env.ACCESS_API_HOST

fcl.config().put("accessNode.api", accessAPIHost)

async function getAccount(address) {
  const { account } = await fcl.send([fcl.getAccount(address)])
  return account
}

async function main() {
  const account = await getAccount(signerAddress)

  console.log(`Fetched account information for ${signerAddress} from ${accessAPIHost}\n`)

  // truncate existing keys
  const { count } = await prisma.key.deleteMany({where: {}})

  console.log(`Removed ${count} existing key(s) from DB\n`)

  await Promise.all(
    account.keys.map(async key => {

      console.log(`- Inserting key ${key.index}`)

      await prisma.key.create({
        data: { index: key.index },
      })

    })
  )

  console.log(`\nInserted ${account.keys.length} key(s) into DB`)
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
