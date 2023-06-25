import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { BankCustomer } from "./lib/BankCustomer";
import { PublicKey } from "@solana/web3.js";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@project-serum/anchor";

type BankContextType = {
  customer: BankCustomer | undefined;
  createNewBank: () => void;
};
export const BankContext = createContext<BankContextType>({
  customer: undefined,
  createNewBank: () => {},
});

const safeParsePublicKey = (string: string) => {
  try {
    return new PublicKey(string);
  } catch (e) {
    return null;
  }
};

export const BankProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();
  const [customer, setCustomer] = useState<BankCustomer | undefined>();
  const addressFromUrl = useMemo(
    () => safeParsePublicKey(window.location.href.split("#")[1]),
    [window.location.href]
  );

  const provider = useMemo(() => {
    if (!wallet) return undefined;

    return new AnchorProvider(connection, wallet, {});
  }, [wallet]);

  useEffect(() => {
    if (!provider || !addressFromUrl) return undefined;
    BankCustomer.get(provider, addressFromUrl).then(setCustomer);
  }, [addressFromUrl, provider]);

  const createNewBank = () => {
    if (!provider) return undefined;
    BankCustomer.create(provider).then(setCustomer);
  };

  return (
    <BankContext.Provider value={{ customer, createNewBank }}>
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => useContext(BankContext);
