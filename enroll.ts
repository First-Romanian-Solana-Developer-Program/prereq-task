import { Keypair } from "@solana/web3.js";
import { initializePrereqs } from "./utils";
import { registerC3 } from "./client/umi/src";
import {
  publicKey,
  TransactionBuilderSendAndConfirmOptions,
} from "@metaplex-foundation/umi";
import {
  base58,
  bytes,
  publicKey as publicKeySerializer,
} from "@metaplex-foundation/umi/serializers";

const opts: TransactionBuilderSendAndConfirmOptions = {
  send: { skipPreflight: false },
  confirm: { commitment: "confirmed" },
};

export async function enroll(
  github: string,
  keypair: Keypair,
  adminPubkey: string,
) {
  try {
    // initialize prereqs
    const { umi, program } = await initializePrereqs("devnet", keypair);

    const [statePda] = umi.eddsa.findPda(program.publicKey, [
      bytes().serialize(new Uint8Array([115, 116, 97, 116, 101])),
      publicKeySerializer().serialize(publicKey(adminPubkey)),
      bytes().serialize(new Uint8Array([115, 100, 112])),
    ]);

    const txResult = await registerC3(umi, {
      user: umi.identity,
      state: statePda,
      github,
    }).sendAndConfirm(umi, opts);

    if (txResult.result.value.err) {
      throw txResult.result.value.err;
    }

    console.log(
      `✅ Success! Check out your TX here: https://explorer.solana.com/tx/${base58.deserialize(txResult.signature)[0]}?cluster=devnet`,
    );
  } catch (e) {
    throw e;
  }
}
