"use client";

import { useRouter } from "next/navigation";

export default function RefetchBalance() {
  const router = useRouter();
  return (
    <button
      className="w-fit rounded-xl bg-neutral-100 px-4 py-1  font-bold text-neutral-900"
      onClick={() => router.refresh()}
    >
      <div>Refetch balance</div>
    </button>
  );
}
