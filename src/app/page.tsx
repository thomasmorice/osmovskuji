import { StargateClient } from "@cosmjs/stargate";
import Link from "next/link";
import Overview from "./_components/overview";
import RefetchBalance from "./_components/refetch-balance";

export default async function HomePage() {
  const osmoRpc = "https://osmosis-rpc.publicnode.com:443";
  const kujiRpc = "https://kujira-rpc.publicnode.com:443";

  const osmoClient = await StargateClient.connect(osmoRpc);
  const kujiClient = await StargateClient.connect(kujiRpc);
  const osmoResult = await osmoClient.getBalance(
    process.env.NEXT_PUBLIC_OSMO_ADDRESS ?? "",
    "uosmo",
  );
  const kujiResult = await kujiClient.getBalance(
    process.env.NEXT_PUBLIC_KUJI_ADDRESS ?? "",
    "ukuji",
  );

  const kujiBalance = parseInt(kujiResult.amount) / 1000000;
  const osmoBalance = parseInt(osmoResult.amount) / 1000000;

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-bl from-gray-700 via-gray-900 to-black px-4 text-white">
      <h1 className="pt-10  text-4xl font-bold md:text-5xl">Osmo vs Kuji</h1>
      <div className="py-5">
        <RefetchBalance />
      </div>
      <div className="flex flex-col gap-2 pb-6">
        <div>
          <div>Osmosis balance: {osmoBalance.toFixed(4)}</div>
          <div className="text-xs text-white/50">
            {process.env.NEXT_PUBLIC_OSMO_ADDRESS}
          </div>
        </div>
        <div>
          <div>Kujira balance: {kujiBalance.toFixed(4)}</div>
          <div className="text-xs text-white/50">
            {process.env.NEXT_PUBLIC_KUJI_ADDRESS}
          </div>
        </div>
      </div>

      <h2 className="flex items-center gap-3 pb-10 font-semibold">
        Current winner
        <div className="w-fit rounded-full bg-white px-3 py-0.5 text-neutral-800">
          {kujiBalance > osmoBalance ? "Kujira" : "Osmosis"} 🎉
        </div>
      </h2>
      <div></div>
      <Overview kujiBalance={kujiBalance} osmoBalance={osmoBalance}></Overview>
    </main>
  );
}
