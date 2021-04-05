# Flow Testnet Faucet

Deployed at: https://testnet-faucet.onflow.org/

## Usage

### Create a new account

Use the [Flow CLI](https://docs.onflow.org/flow-cli) to generate a new key pair:

```sh
# This command uses ECDSA_P256 and SHA3_256 by default
flow keys generate
```

Enter the resulting public key into the "Create Account" form, complete the captcha and submit.

### Fund an account

Enter an existing account address into the "Fund Account" form, complete the captcha and submit.

## Development

### Create a dotenv file

⚠️ The `SIGNER_PRIVATE_KEY` value must match the `FLOW_SERVICEPRIVATEKEY` value in `docker-compose.yml`.

```sh
cp env.example .env
```

### Start the Flow Emulator and Postgres database

```sh
docker-compose up -d
```

### Migrate and seed the database

```sh
npm run db-seed
npm run db-migrate-dev
```

### Run the Next.js app

```sh
npm run dev
```
