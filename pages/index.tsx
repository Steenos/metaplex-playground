import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Metaplex, walletAdapterIdentity } from "@metaplex-foundation/js";

const Home: NextPage = () => {
  const { wallet, publicKey } = useWallet();
  const { connection } = useConnection();
  const mx = Metaplex.make(connection);

  if (wallet) {
    mx.use(walletAdapterIdentity(wallet));
  }

  async function onClick() {
    const { uri } = await mx.nfts().uploadMetadata({
      name: "My NFT",
      description: "amazing description",
      image: "https://arweave.net/123",
    });
    console.log(uri);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1>Hello</h1>
        <button className="bg-slate-400" onClick={onClick}>
          Click
        </button>
      </main>
    </div>
  );
};

export default Home;
