import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://puravidacoding.com"), // TODO: Update with actual domain
  title: {
    default: "Pura Vida Coding",
    template: "%s | Pura Vida Coding",
  },
  description: "Pura Vida Coding - Tailor-made digital experiences that stand out. Specialized in custom web development, full-stack solutions, and high-end digital design.",
  keywords: ["web development", "software engineering", "next.js", "react", "digital agency", "full-stack", "costa rica", "pura vida"],
  authors: [{ name: "Pura Vida Coding Team" }],
  creator: "Pura Vida Coding",
  publisher: "Pura Vida Coding",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Pura Vida Coding",
    description: "Tailor-made digital experiences that stand out. Custom web apps and digital solutions.",
    url: "https://puravidacoding.com",
    siteName: "Pura Vida Coding",
    locale: "en_US",
    type: "website",
    // images: [
    //   {
    //     url: '/og.png', // Ensure you have an og.png in public folder
    //     width: 1200,
    //     height: 630,
    //     alt: 'Pura Vida Coding',
    //   }
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pura Vida Coding",
    description: "Tailor-made digital experiences that stand out.",
    // creator: "@yourtwitterhandle",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pura Vida Coding",
    "url": "https://puravidacoding.com",
    "logo": "https://puravidacoding.com/logo.png", // Ensure logo exists or update path
    "description": "Tailor-made digital experiences that stand out.",
    "sameAs": [
      "https://github.com/ignaciovargas", // Example, update if needed
      // Add other social profiles here
    ]
  };

  return (
    <html lang="en" data-theme="dark">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
