import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrinho de Compras",
  description: "Revise seus itens no carrinho e finalize sua compra de NFTs.",
  robots: {
    index: false, 
    follow: false,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

