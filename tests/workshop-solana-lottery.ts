import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { BankUseCivic } from "../target/types/bank_use_civic";

describe("workshop-solana-lottery", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.BankUseCivic as Program<BankUseCivic>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
