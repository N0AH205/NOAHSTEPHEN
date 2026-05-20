import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Noah Stephen | Product Engineer",
  description: "I build products where engineering decisions directly shape user experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
