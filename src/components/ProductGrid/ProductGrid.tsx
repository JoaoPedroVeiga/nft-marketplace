// components/ProductGrid/ProductGrid.tsx
"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import styles from "./ProductGrid.module.scss";

interface Product {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

interface ProductGridProps {
  products?: Product[];
  title?: string;
  columns?: 2 | 3 | 4;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products = [],
  title = "NFT Collection",
  columns = 4,
  isLoading = false,
  isError = false,
  error = null,
}) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const gridClass = `${styles.productGrid} ${styles[`columns${columns}`]}`;

  const handleBuyClick = (product: Product) => {
    // Adiciona ao carrinho
    addToCart({
      id: product.id,
      name: product.title,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    });

    // Redireciona para o carrinho
    router.push("/cart");
  };

  // Estados de carregamento/erro...
  if (isLoading) {
    return (
      <section className={styles.container}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.loadingState}>
          <div className={styles.loadingSpinner}></div>
          <p>Carregando produtos...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.container}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.errorState}>
          <p>
            Erro ao carregar produtos: {error?.message || "Tente novamente"}
          </p>
          <button
            className={styles.retryButton}
            onClick={() => window.location.reload()}
          >
            Tentar novamente
          </button>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className={styles.container}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.emptyState}>
          <p>Nenhum produto encontrado</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.container}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}

      <div className={gridClass}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.imageBackground}>
              <div className={styles.imageWrapper}>
                <div className={styles.imageContainer}>
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className={styles.productImage}
                    onError={(e) => {
                      e.currentTarget.src = "/images/fallback-nft.png";
                    }}
                  />
                </div>
              </div>
            </div>

            <div className={styles.contentContainer}>
              <h3 className={styles.productTitle}>{product.title}</h3>
              <p className={styles.productDescription}>{product.description}</p>
              <div className={styles.priceContainer}>
                <div className={styles.priceWithIcon}>
                  {/* Adicionando a imagem/ícone do ETH */}
                  <Image
                    src="/images/Ellipse 770.png" // ou o caminho da sua imagem
                    alt="ETH"
                    width={16}
                    height={16}
                    className={styles.ethIcon}
                  />
                  <span className={styles.price}>{product.price} ETH</span>
                </div>
              </div>
              <button
                className={styles.buyButton}
                onClick={() => handleBuyClick(product)}
              >
                <span className={styles.buttonText}>COMPRAR</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
