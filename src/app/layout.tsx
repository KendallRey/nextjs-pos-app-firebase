import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import Providers from "@/services/providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next POS",
  description: "A Template for Next POS with Firebase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
