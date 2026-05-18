import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Pixelify_Sans, Press_Start_2P } from "next/font/google";
import "./globals.css";
import PixelTrail from "@/components/PixelTrail";

const inter = Inter({
  subsets: ["latin"],
  variable: "--f-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--f-mono",
  display: "swap",
});

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--f-pixel",
  display: "swap",
});

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--f-arcade",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Noah Stephen | Portfolio",
  description: "A retro-engineered digital archive by Noah Stephen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${pixelify.variable} ${pressStart.variable} antialiased`}
    >
      <body className="font-sans relative">
        {children}
        <PixelTrail color="#000000" />
      </body>
    </html>
  );
}
