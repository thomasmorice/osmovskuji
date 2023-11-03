"use client";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export default function Overview({
  kujiBalance,
  osmoBalance,
}: {
  kujiBalance: number;
  osmoBalance: number;
}) {
  const data = [
    {
      name: "OSMOSIS",
      total: osmoBalance,
    },
    {
      name: "KUJIRA",
      total: kujiBalance,
    },
  ];
  return (
    <ResponsiveContainer className="h-full w-full md:w-64" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="white"
          fontSize={12}
          fontWeight={600}
          tickLine={false}
          axisLine={false}
        />

        <Bar dataKey="total" fill="#0373f3" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
