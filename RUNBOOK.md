## Overview 
The Faucet application provides a web-based GUI for Flow account creation, and sending small amounts of the FLOW token or the FUSD token to existing FLOW accounts. 
The Faucet may be accessed via the deployed web UI here: https://flow-faucet.vercel.app/, or using the undocumented restful API: ([code](https://github.com/onflow/faucet/tree/main/pages/api)).
API access remains undocumented, and is only available using a custom token issued by @psiemens. 

## Access
To create or debug the deployment, developers must first be given accesss to the Flow team's Vercel dashboard: 
https://vercel.com/onflow. 

- Developers without access must submit a request for access here: https://dapperlabs.happyfox.com/tickets/

## Deployment 

### Frontend & API

The **Frontend and API** of the application are deployed to Vercel.
The API is made up of individual "lambda functions" and can be found here: https://github.com/onflow/faucet/tree/main/pages/api

The **Frontend and API** are deployed to Vercel automatically, when any code is merged into the `main` branch. 
- PRs or commits to the `main` branch by users who have not been added to the Flow Vercel team are not automatically deployed. 

**Configuration** 

The Frontend / API environment configuration for the deployment can be found here: https://vercel.com/onflow/flow-faucet-testnet/settings/environment-variables

**Preview Deployments**

Preview deployments are created automatically for any PR submitted by a member of the Flow Vercel team. 
Preview URLs can be found in the comment thread of the PR. ([example](https://github.com/onflow/faucet/pull/31))

### Database (Postgres)

The Faucet uses the [Prisma ORM](https://www.prisma.io/) to connect to a Postgres database. 
The database schema and client are generated automatically by Prisma. The schema files can be found here: https://github.com/onflow/faucet/blob/main/prisma/schema.prisma

**Configuration**

// TODO: Deployed Database config

## Debugging Deployment

### Frontend / API
Log output from the production application (backend) can be found here: https://vercel.com/onflow/flow-faucet-testnet/9zrQc5wYWMCrSqARcx5p7EDowq3X/functions

### Postgres

// TODO: Deployed database debugging

## Domain management
// TODO: Domain management details

## Local Development
Follow the instructions in [README.md](README.md) for running the app locally.
