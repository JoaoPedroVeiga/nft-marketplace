import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.scss";
import Header from "@/components/Header/header";
import { ReactQueryProvider } from "@/providers/react-query-provider";
import { ReduxProvider } from "@/providers/redux-provider";
import PageTransition from "@/components/PageTransition/PageTransition";
import Footer from "@/components/Footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NFT Marketplace - Coleção de NFTs Exclusivos",
    template: "%s | NFT Marketplace",
  },
  description: "Explore nossa coleção exclusiva de NFTs. Compre, venda e descubra arte digital única no maior marketplace de NFTs.",
  keywords: ["NFT", "marketplace", "arte digital", "blockchain", "crypto", "coleção"],
  authors: [{ name: "NFT Marketplace" }],
  creator: "NFT Marketplace",
  publisher: "NFT Marketplace",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nft-marketplace.example.com"),
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "NFT Marketplace",
    title: "NFT Marketplace - Coleção de NFTs Exclusivos",
    description: "Explore nossa coleção exclusiva de NFTs. Compre, venda e descubra arte digital única.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "NFT Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NFT Marketplace - Coleção de NFTs Exclusivos",
    description: "Explore nossa coleção exclusiva de NFTs. Compre, venda e descubra arte digital única.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ReactQueryProvider>
          <ReduxProvider>
            <Header />
            <main className="main-content">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </ReduxProvider>
        </ReactQueryProvider>
        
      </body>
    </html>
  );
}