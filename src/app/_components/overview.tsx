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
    <ResponsiveContainer height={250}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="white"
          fontSize={12}
          fontWeight={600}
          tickLine={false}
          axisLine={false}
        />

        <Bar dataKey="total" fill="white" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
