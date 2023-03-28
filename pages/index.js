import {
  useAccount,
  useConnect,
  useDisconnect,
  usePrepareSendTransaction,
  useSendTransaction,
} from "wagmi";
import { InjectedConnector } from "@wagmi/connectors/injected";
import { MetaMaskConnector } from "@wagmi/connectors/metaMask";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
// import { useConnect } from "wagmi";

function Profile() {
  // const [to, setTo] = useState("");
  const { address, isConnected } = useAccount();
  const router = useRouter();

  const [to, setTo] = useState("");
  const [value, setValue] = useState("");

  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect();

  const { sendTransaction } = useSendTransaction({
    request: {
      to,
      value: value * (1e18).toString,
    },
    onSuccess: () => alert("Transaction Succcessful"),
  });

  if (isConnected)
    return (
      <>
        <div>
          <div>
            To:{" "}
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div>
            Value:{" "}
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <button onClick={sendTransaction}>Send</button>
          Connected to {address}
        </div>
        <button onClick={() => disconnect()}>Disconnect</button>
      </>
    );
  return (
    <>
      <div>
        <button onClick={() => connect()}>Connect Wallet</button>
      </div>
    </>
  );
}
export default Profile;
