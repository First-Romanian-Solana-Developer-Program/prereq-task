import { Keypair } from "@solana/web3.js";
import * as fs from "fs";
import path from "path";
import { getKeypairFromFile } from "@solana-developers/helpers";

export async function generateKeypair(fPath: string) {
  const keypairPath = path.join(process.cwd(), fPath);

  try {
    fs.statfsSync(fPath);
    console.log(`Loading keypair from ${keypairPath}`);
    const kp = await getKeypairFromFile(keypairPath);
    console.log(`Public key: ${kp.publicKey.toBase58()}`);
    return kp;
  } catch {
    //Generate a new keypair
    let kp = Keypair.generate();

    const secretKeyArray = Array.from(kp.secretKey);

    try {
      fs.writeFileSync(keypairPath, JSON.stringify(secretKeyArray));
      console.log(`Keypair saved to ${keypairPath}`);
      console.log(`Public key: ${kp.publicKey.toBase58()}`);
    } catch (err) {
      console.error("Error saving keypair:", err);
    }

    return kp;
  }
}
