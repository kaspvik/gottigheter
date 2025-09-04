import type { Metadata } from "next";
import { Beth_Ellen, Caveat } from "next/font/google";
import "./globals.css";

const bethEllen = Beth_Ellen({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-beth",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
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
      <body className={`${bethEllen.variable} ${caveat.variable}`}>
        {children}
      </body>
    </html>
  );
}
