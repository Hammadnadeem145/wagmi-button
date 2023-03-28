// import "@/styles/globals.css";
import { chains ,WagmiConfig, createClient, configureChains } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Profile from ".";

import { Network, Alchemy } from '@alch/alchemy-web3';

const settings = {
    apiKey: "wvI3tQxuq8acbsQRqQP_C0ie1pQDWlCf",
    network: Network.MumbaiTestet,
};

const alchemy = new Alchemy(settings);

// Get the latest block
const latestBlock = alchemy.core.getBlockNumber();

// Get all outbound transfers for a provided address
alchemy.core
    .getTokenBalances('0x994b342dd87fc825f66e51ffa3ef71ad818b6893')
    .then(console.log);

// Get all the NFTs owned by an address
const nfts = alchemy.nft.getNftsForOwner("0xshah.eth");

// Listen to all new pending transactions
alchemy.ws.on(
    { method: "alchemy_pendingTransactions",
    fromAddress: "0xshah.eth" },
    (res) => console.log(res)
);


const {  provider, webSocketProvider} = configureChains([Alchemy], [publicProvider()])

const client = createClient({
  autoConnect: true,
  getDefaultProvider,
  provider, webSocketProvider,

});

function App() {
  return (
    <WagmiConfig client={client}>
    
      <Profile />
    </WagmiConfig>
  );
}

export default App;
