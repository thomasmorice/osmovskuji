import { StargateClient } from "@cosmjs/stargate";
import Overview from "./_components/overview";
import RefetchBalance from "./_components/refetch-balance";
import AddressAndBalance from "./_components/address-and-balance";
import Image from "next/image";

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
    <div className="flex  flex-col items-center bg-gradient-to-br from-gray-900 to-gray-600 pb-10">
      <div className="flex max-w-4xl flex-col items-center">
        <div className="relative h-[320px] w-full  sm:h-[480px] lg:h-[680px]">
          <Image
            alt="osmo vs kuji background"
            className="object-cover"
            src="/osmovskuji2.jpg"
            fill
          />
        </div>
        <main className="flex flex-col  px-4 text-white md:flex-row md:items-center md:gap-10 md:px-10 lg:px-0">
          <div>
            <h1 className="pt-10  text-4xl font-bold md:text-5xl">
              Osmo vs Kuji
            </h1>
            <div className="flex flex-col gap-5 py-5 leading-relaxed text-white/80">
              <p>
                Disclaimer: This is all in good fun! The true winners are Cosmos
                and NextJS, as we celebrate my birthday with a playful twist.
                <b>
                  I want to make it clear that I have a special place in my
                  heart for both of these amazing projects
                </b>
              </p>

              <p className="">
                This friendly competition is just a way to have some fun, and in
                reality, I appreciate the unique strengths and innovations that
                each infrastructure brings to the table.
              </p>
              {/* I discovered Cosmos ecosystem thanks to Osmosis, and I felt in love,
            and deepened my knowledge in DeFi with Kuji.  */}

              <p>Enjoy the festivities and the tech experiments!</p>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="order-2 w-64 sm:order-1">
                {kujiBalance === 0 && osmoBalance === 0 ? (
                  <div>The wallet is currently empty 😞</div>
                ) : (
                  <Overview
                    kujiBalance={kujiBalance}
                    osmoBalance={osmoBalance}
                  ></Overview>
                )}
              </div>
              <div className="order-1 sm:order-2">
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
                    balance={parseFloat(kujiBalance.toFixed(4))}
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
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
