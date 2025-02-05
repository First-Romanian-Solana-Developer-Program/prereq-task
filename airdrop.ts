import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export async function airdrop(
  connection: Connection,
  publicKey: PublicKey,
  amount: number = 2,
) {
  try {
    const balance = await connection.getBalance(publicKey);
    if (balance > 0) {
      console.log(
        `💲 Wallet balance:`,
        Math.floor(balance / LAMPORTS_PER_SOL).toFixed(2),
      );
      return;
    }

    console.log("🕐 Airdropping some tokens...");

    const txhash = await connection.requestAirdrop(publicKey, amount);

    console.log(
      `✅ Success! Check out your TX here: https://explorer.solana.com/tx/${txhash}?cluster=devnet`,
    );
  } catch (e) {
    console.error(`❌ Oops, something went wrong: ${e}`);
  }
}
