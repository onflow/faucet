## Overview 
The Faucet application provides a web-based GUI for Flow account creation, and sending small amounts of the FLOW token or the FUSD token to existing FLOW accounts. 
The Faucet may be accessed via the deployed web UI here: https://flow-faucet.vercel.app/, or using the undocumented restful API: ([code](https://github.com/onflow/faucet/tree/main/pages/api)).
API access remains undocumented, and is only available using a custom token issued by @psiemens. 

## Access

**Front-End & API**

To create or debug the deployment, developers must first be given accesss to the Flow team's Vercel dashboard: 
https://vercel.com/onflow. 

- Developers without access must submit a request for access here: https://dapperlabs.happyfox.com/tickets/

**Database**

Join the "Flow Engineer" Google Group. https://groups.google.com/a/dapperlabs.com/g/flow-dev/members
For access to the Faucet database, navigate to Flow GCP SQL instances: https://console.cloud.google.com/sql/instances?project=dl-flow

- The Faucet uses: `flow-db-staging` Postgres instance
- Database name: `faucet-testnet`
- Username: `faucet`
- Password (in 1Password under "Flow DB Staging"):  https://start.1password.com/open/i?a=XXGSC36RMBDCLGAY6JWYRUFPXM&v=l3vovxrfrunhcb2vaomdl2hviy&i=djjor5biqnd2ppw662wjypoo2i&h=dapperlabs.1password.com

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

### Database

The Faucet uses the [Prisma ORM](https://www.prisma.io/) to connect to a Postgres database. 
The database schema and client are generated automatically by Prisma. The schema files can be found here: https://github.com/onflow/faucet/blob/main/prisma/schema.prisma

Prisma manages database migrations. No manual migration is needed.

## Debugging Deployment

### Continuous integration
CI is provided by **Github Workflows**. The configuration can be found here: https://github.com/onflow/faucet/blob/main/.github/workflows/ci.yml

### Frontend & API
**Log output:** The production application (backend) logs can be found here: https://vercel.com/onflow/flow-faucet-testnet/9zrQc5wYWMCrSqARcx5p7EDowq3X/functions

### Database

**Firewall Rule**:
0.0.0.0/0 must be an authorized network in order to allow Vercel to connect (Ref: https://vercel.com/docs/concepts/solutions/databases#allowing-and-blocking-ip-addresses)
- If this rule is removed, Vercel will not be able to connect.
- Documentation here: https://vercel.com/docs/concepts/solutions/databases#allowing-and-blocking-ip-addresses

**Log output:** Error logs can be found in the Google cloud dashboard mentioned above.

## Domain Management

The Faucet domain (testnet-faucet.onflow.org) is managed by **Terraform**.

- Domain DNS is configured with Terraform in this file: https://github.com/dapperlabs/terraform/blob/master/Flow-Hosting/DNS-ONFLOW.tf
Updates can be made by opening a PR in that repo

## Local Development
Follow the instructions in [README.md](README.md) for running the app locally.
