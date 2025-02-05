# 🇷🇴 Solana Builders Program - Prerequisites

A simple script to enroll in the Romanian Solana Builders Program by registering your Github account on-chain.

## What you'll achieve

- Generate a Solana keypair for development
- Get some SOL tokens from the devnet faucet
- Register your Github account on-chain
- Complete the prerequisites for the Romanian Solana Builders Program

## Prerequisites

- Node.js (v18 or later). Install it from [here](https://nodejs.org/en/download)
- Git. Install it from [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Installation

1. Clone this repository:

```bash
git clone <repository-url>
cd prereqs
```

2. Install dependencies:

```bash
npm install
```

## Running the script

Execute the script with:

```bash
npm run start
```

The script will:

1. Generate a new keypair (or use existing one from `keypair.json`)
2. Request an airdrop of 1 SOL from devnet
3. Prompt for your Github username
4. Register your account on-chain

If successful, you'll see a confirmation message and a link to view your transaction on Solana Explorer.

```
~/projects/solana-developers-program/prereqs main* ❯ npm start                                                                                                                                                                                        17:13:56

> prereqs@1.0.0 start
> ts-node ./index.ts

Loading keypair from /Users/danielpavel/projects/solana-developers-program/prereqs/keypair.json
(node:91220) [DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
Public key: 6rFtJKc25Tq71hgW8DgAMDaZ9nNiFnyBmEYg7DG8uUEZ
💲 Wallet balance: 1.00
Enter your github account name: gigel
✅ Success! Check out your TX here: https://explorer.solana.com/tx/4o28ajgd9cnhMtsJR4sNpSnhdVtBSwPVRXo2R4zCaB7phLDGuxUvuL2ysiGYvytBqPvmqWbjo5GjDevWhJLf2okg?cluster=devnet
🎉 Congratulations, gigel! You're enrolled in our first Romanian Solana Builders Program
```
