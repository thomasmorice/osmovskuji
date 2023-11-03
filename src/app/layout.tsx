import "~/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  "twitter:title": "OSMO vs KUJI",
  title: "OSMO vs KUJI",
  description:
    "This is all in good fun! The true winners are Cosmos and NextJS",

  "twitter:image": "/osmovskuji2.jpg",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>{children}</body>
    </html>
  );
}
