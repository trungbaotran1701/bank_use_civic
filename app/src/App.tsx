import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import SolanaLogo from "./logo.svg";
import user from "./user.jpg";
import {
  ConnectionProvider,
  useAnchorWallet,
  useConnection,
  useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { BankProvider, useBank } from "./BankContext";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { CivicPassProvider } from "./CivicPassContext";
import {
  GatewayStatus,
  IdentityButton,
  useGateway,
} from "@civic/solana-gateway-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  BackpackWalletAdapter,
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { CivicProfile, Profile } from "@civic/profile";

require("@solana/wallet-adapter-react-ui/styles.css");

const mainnetConnection = new Connection(
  "https://solana-mainnet.rpc.extrnode.com"
);

const Admin = () => {
  const { customer, createNewBank } = useBank();
  const { connection } = useConnection();
  const [pot, setPot] = React.useState(0);
  useEffect(() => {
    if (customer) {
      connection.getBalance(customer.bankAddress).then(setPot);
      connection.onAccountChange(customer.bankAddress, (account) => {
        setPot(account.lamports);
      });
    }
  }, [customer, connection]);

  return (
    <div>
      <h1>Admin Mode</h1>
      {!customer && <button onClick={createNewBank}>Create New Bank</button>}
      {customer && (
        <>
          <div>
            <a
              href={"http://localhost:3000#" + customer.bankAddress.toString()}
            >
              Your Bank
            </a>
          </div>
          <div>
            <>Total pot: {pot}</>
          </div>
        </>
      )}
    </div>
  );
};

const ProfileView = () => {
  const wallet = useAnchorWallet();
  const [profile, setProfile] = useState<Profile>();
  useEffect(() => {
    if (!wallet) return;
    CivicProfile.get(wallet.publicKey.toString(), {
      solana: { connection: mainnetConnection },
    }).then(setProfile);
  }, [wallet]);

  if (!profile) return <></>;

  return (
    <div style={{ paddingTop: "10px" }}>
      <div>
        <img
          width={100}
          src={profile.image?.url || user}
          alt="profile"
          style={{
            borderRadius: "50%",
          }}
        />
      </div>
      <h3>{profile.name?.value}</h3>
      <a href={"https://civic.me/" + wallet?.publicKey}>View Profile</a>
    </div>
  );
};

const Player = () => {
  const { customer } = useBank();
  const { gatewayStatus, gatewayToken } = useGateway();
  if (!customer) return <></>;

  return (
    <div>
      <h1>Player Mode</h1>
      <IdentityButton />
      {gatewayStatus !== GatewayStatus.ACTIVE && (
        <div>Verify you are a unique person before entering</div>
      )}
      {gatewayToken && (
        <button
          disabled={gatewayStatus !== GatewayStatus.ACTIVE}
          onClick={() => customer.enter(gatewayToken.publicKey)}
        >
          Enter Bank
        </button>
      )}
    </div>
  );
};

const Dashboard = () => {
  const wallet = useWallet();
  const { customer } = useBank();

  if (!wallet.connected || !wallet.publicKey) return <></>;

  // admin mode if we have not created a lottery yet, or if we are the lottery authority
  const isAdminMode =
    customer === undefined || customer.bank.authority.equals(wallet.publicKey);

  return isAdminMode ? <Admin /> : <Player />;
};

const Content = () => (
  <header className="App-header">
    <WalletMultiButton />
    <ProfileView />
    <Dashboard />
  </header>
);

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BackpackWalletAdapter(),
    ],
    []
  );

  return (
    <div className="App">
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <CivicPassProvider>
              <BankProvider>
                <Content />
              </BankProvider>
            </CivicPassProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </div>
  );
}

export default App;
