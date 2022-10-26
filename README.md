# SPACERIDERS FRONTEND

## ⚠️ REQUIREMENTS

- NodeJS v16
- Yarn
- Quasar CLI.

## ⚙️ INSTALLATION

Before you start with this installation, you need to have running [spaceriders-smartcontracts](https://github.com/redigaffi/spaceriders-smartcontracts) and [spaceriders-apiv2](https://github.com/redigaffi/spaceriders-apiv2) projects.

Install Quasar globally.

```bash
yarn global add @quasar/cli
```

Clone the project's repository.

```bash
git clone git@github.com:redigaffi/spaceriders-frontend.git
```

Inside the project's folder, install dependencies.

```bash
yarn install
```

Copy the env vars file `.env.example` to another one called `.env.dev`.

```bash
cp .env.example .env.dev
```

Change `BASE_API_PATH` in `.env` to point your local instance of the API.

```env
BASE_API_PATH=http://127.0.0.1:8010
```

In order to be able to testing at Testnet, have [BSC Testnet network configured in Metamask](https://medium.com/spartanprotocol/how-to-connect-metamask-to-bsc-testnet-7d89c111ab2). Also [get some Testnet BNB](https://testnet.binance.org/faucet-smart) (needed to do transactions). Put in the field your Metamask address and click "Give me BNB".

## 🚀 USAGE

Execute the project.

```bash
quasar dev
```
