import { Metadata } from "next";
import { getProductsServer } from "@/services/api-server";
import ProductGridClient from "@/components/ProductGridClient/ProductGridClient";

export const metadata: Metadata = {
  title: "Home",
  description: "Explore nossa coleção exclusiva de NFTs. Descubra arte digital única e adicione ao seu carrinho.",
  openGraph: {
    title: "NFT Marketplace - Coleção de NFTs",
    description: "Explore nossa coleção exclusiva de NFTs. Descubra arte digital única.",
    url: "/",
  },
};

export default async function Home() {
  const initialData = await getProductsServer({
    page: 1,
    rows: 8,
    sortBy: "name",
    orderBy: "ASC",
  });

  return (
      <ProductGridClient initialData={initialData} initialPage={1} />
  );
}