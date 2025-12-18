import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pura Vida Coding",
  description: "Pura Vida Coding - Tailor-made digital experiences that stand out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
