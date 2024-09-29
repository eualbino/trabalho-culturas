import type { Metadata } from "next";
import "./globals.css";
import { TanstackProvider } from "@/provider/TanstackProvider";

export const metadata: Metadata = {
  title: "Cultra Mundi",
  description: "Generated by create next app",
  icons: ['/favicon.ico?v=4']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  );
}
