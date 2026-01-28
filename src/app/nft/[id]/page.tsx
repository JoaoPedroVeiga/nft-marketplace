import { Metadata } from "next";
import { getProductByIdServer } from "@/services/api-server";
import NFTDetailClient from "./NFTDetailClient";
import { notFound } from "next/navigation";

interface NFTDetailPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export async function generateMetadata({ params }: NFTDetailPageProps): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { id } = resolvedParams;
  const productId = Number(id);

  if (isNaN(productId)) {
    return {
      title: "NFT Não Encontrado",
    };
  }

  try {
    const product = await getProductByIdServer(productId);
    const price = parseFloat(product.price).toFixed(0);
    const description = product.description || `NFT exclusivo #${product.id} - ${product.name}`;

    return {
      title: product.name,
      description: description,
      keywords: ["NFT", product.name, "arte digital", "blockchain"],
      openGraph: {
        title: `${product.name} - NFT Marketplace`,
        description: description,
        type: "website",
        images: [
          {
            url: product.image,
            width: 1200,
            height: 1200,
            alt: product.name,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: product.name,
        description: description,
        images: [product.image],
      },
    };
  } catch (error) {
    return {
      title: "NFT Não Encontrado",
    };
  }
}

export default async function NFTDetailPage({ params }: NFTDetailPageProps) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { id } = resolvedParams;
  const productId = Number(id);

  if (isNaN(productId)) {
    notFound();
  }

  try {
    const product = await getProductByIdServer(productId);
    return <NFTDetailClient initialProduct={product} id={productId} />;
  } catch (error: any) {
    notFound();
  }
}