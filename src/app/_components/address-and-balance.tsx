"use client";
import Image from "next/image";

export default function AddressAndBalance({
  balance,
  name,
  address,
}: {
  balance: number;
  name: string;
  address: string;
}) {
  return (
    <div
      className="cursor-pointer"
      onClick={() => navigator.clipboard.writeText(address)}
    >
      <div>
        {name} balance: {parseFloat(balance.toFixed(4))}
      </div>
      <div className="flex items-center gap-1 text-xs text-white/50">
        <Image alt="copy" src="/copy.svg" width={20} height={20} />
        {address}
      </div>
    </div>
  );
}
