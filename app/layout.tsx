import type { Metadata } from "next";
import { Beth_Ellen, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});
const bethEllen = Beth_Ellen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-beth",
});

export const metadata: Metadata = {
  title: "Wine Journal",
  description: "Vinkällar'n",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bethEllen.variable}`}>
        {children}
      </body>
    </html>
  );
}
