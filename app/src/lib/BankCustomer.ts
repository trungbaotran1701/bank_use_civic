import { Keypair, PublicKey, TransactionSignature } from "@solana/web3.js";
import { AnchorProvider, IdlAccounts, Program } from "@project-serum/anchor";
import { IDL, BankUseCivic } from "./types/bank_use_civic";

const PROGRAM_ID = new PublicKey(
  "3jUJRJARegMt4ufJ4Bu1UTXRtBszzNqRZ7vrneHxn57R"
);
export const UNIQUENESS_PASS = new PublicKey(
  "uniqobk8oGh4XBLMqM68K8M2zNu3CdYX7q5go7whQiv"
);

export class BankCustomer {
  constructor(
    readonly program: Program<BankUseCivic>,
    readonly authority: PublicKey,
    readonly bank: IdlAccounts<BankUseCivic>["bank"],
    readonly bankAddress: PublicKey
  ) {
    console.log("Created new client...");
  }

  static async get(
    provider: AnchorProvider,
    bankAddress: PublicKey
  ): Promise<BankCustomer | undefined> {
    const program = new Program<BankUseCivic>(IDL, PROGRAM_ID, provider);
    const bank = await program.account.bank.fetchNullable(bankAddress);

    if (!bank) return undefined;

    return new BankCustomer(program, provider.publicKey, bank, bankAddress);
  }

  static async create(provider: AnchorProvider): Promise<BankCustomer> {
    const program = new Program<BankUseCivic>(IDL, PROGRAM_ID, provider);
    const newBank = Keypair.generate();
    await program.methods
      .initialize(UNIQUENESS_PASS)
      .accounts({
        bank: newBank.publicKey,
        authority: provider.publicKey,
      })
      .signers([newBank])
      .rpc();

    return BankCustomer.get(provider, newBank.publicKey).then((client) => {
      if (!client) throw new Error("Failed to create bank");
      return client;
    });
  }

  async enter(gatewayToken: PublicKey): Promise<TransactionSignature> {
    return this.program.methods
      .enter()
      .accounts({
        bank: this.bankAddress,
        customer: this.authority,
        gatewayToken,
      })
      .rpc();
  }
}
