import {
  createSignerFromKeypair,
  keypairIdentity,
  UmiPlugin,
} from "@metaplex-foundation/umi";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { Cluster, clusterApiUrl, Keypair } from "@solana/web3.js";
import * as readline from "readline";
import {
  createSdpHelloWorldProgram,
  getSdpHelloWorldProgram,
  initialize,
} from "./client/umi/src";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { getKeypairFromFile } from "@solana-developers/helpers";

export async function getInput(greetingMessage: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    const input = await new Promise<string>((resolve) => {
      rl.question(greetingMessage, resolve);
    });
    return input;
  } finally {
    rl.close();
  }
}

export const initializePrereqs = async (cluster: Cluster, keypair: Keypair) => {
  const umi = createUmi(clusterApiUrl(cluster), {
    commitment: "confirmed",
  });

  const admin = umi.eddsa.createKeypairFromSecretKey(keypair.secretKey);

  umi.use(keypairIdentity(admin));

  const program = (): UmiPlugin => ({
    install(umi) {
      umi.programs.add(createSdpHelloWorldProgram());
    },
  });

  umi.use(program());

  return {
    umi,
    program: getSdpHelloWorldProgram(umi),
    admin: createSignerFromKeypair(umi, admin),
  };
};
