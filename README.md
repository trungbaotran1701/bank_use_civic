# Solana Civic Workshop - bank

A simple bank program to demonstrate the use of Civic to protect on-chain assets.

## Run Locally

```bash
# Install dependencies
yarn
# Build the program
anchor build
# Start a local Solana cluster
anchor localnet
```

In another shell
```
# Run the client
cd app
yarn
yarn start
```

1. Visit http://localhost:3000 to see the app.
2. Connect with an `admin` wallet
3. Create a bank
4. Click the link to visit that bank
5. Deposit some funds
6. Connect with a `user` wallet
7. Enter the bank
8. Connect with the `admin` wallet
9. Click the `Pick Winner` button
10. Connect with the `user` wallet
11. Click the `Withdraw` button