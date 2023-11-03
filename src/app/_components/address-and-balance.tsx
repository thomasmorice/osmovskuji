"use client";
import Image from "next/image";
import { useState } from "react";

export default function AddressAndBalance({
  balance,
  name,
  address,
}: {
  balance: number;
  name: string;
  address: string;
}) {
  const [hasBeenCopied, setHasBeenCopied] = useState(false);
  return (
    <div
      className="cursor-pointer"
      onClick={async () => {
        setHasBeenCopied(true);
        await navigator.clipboard.writeText(address);
      }}
    >
      <div className="flex items-center gap-1 font-bold">
        {name} balance:
        <div className="">{parseFloat(balance.toFixed(4))}</div>
      </div>
      <div className="flex items-center gap-1 text-xs ">
        {hasBeenCopied ? (
          <div className="h-4 w-4 text-sm">👌</div>
        ) : (
          <Image alt="copy" src="/copy.svg" width={20} height={20} />
        )}

        {address}
      </div>
    </div>
  );
}
