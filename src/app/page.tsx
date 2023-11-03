import { StargateClient } from "@cosmjs/stargate";
import Link from "next/link";
import Overview from "./_components/overview";
import RefetchBalance from "./_components/refetch-balance";
import AddressAndBalance from "./_components/address-and-balance";

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
    <main className="flex min-h-screen flex-col bg-gradient-to-br bg-gradient-to-r from-gray-900 to-gray-600 px-4 text-white md:flex-row md:items-center md:gap-10 md:px-10">
      <div>
        <h1 className="pt-10  text-4xl font-bold md:text-5xl">Osmo vs Kuji</h1>
        <div className="py-5">
          <RefetchBalance />
        </div>
        <div className="flex flex-col gap-3 pb-6">
          <AddressAndBalance
            address={process.env.NEXT_PUBLIC_OSMO_ADDRESS ?? ""}
            name="Osmo"
            balance={parseFloat(osmoBalance.toFixed(4))}
          />
          <AddressAndBalance
            address={process.env.NEXT_PUBLIC_KUJI_ADDRESS ?? ""}
            name="Kuji"
            balance={parseFloat(osmoBalance.toFixed(4))}
          />
        </div>

        <h2 className="flex items-center gap-3 pb-6 font-semibold">
          Current winner
          <div className="w-fit rounded-full bg-white px-3 py-0.5 text-neutral-800">
            {kujiBalance === osmoBalance
              ? "TIE!"
              : kujiBalance > osmoBalance
              ? "Kujira"
              : "Osmosis"}{" "}
            🎉
          </div>
        </h2>
      </div>
      <Overview kujiBalance={kujiBalance} osmoBalance={osmoBalance}></Overview>
    </main>
  );
}
