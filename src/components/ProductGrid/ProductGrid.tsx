// components/ProductGrid/ProductGrid.tsx

"use client";

import React, { useState } from "react";
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

  // Estado para rastrear quais produtos foram adicionados
  const [addedItems, setAddedItems] = useState<number[]>([]);

  const handleBuyClick = (product: Product) => {
    // Adiciona ao carrinho
    addToCart({
      id: product.id,
      name: product.title,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    });

    // Adiciona o ID ao estado para mudar a aparência do botão
    setAddedItems((prev) => [...prev, product.id]);

    // Redireciona após um delay
    setTimeout(() => {
      router.push("/cart");
    }, 800);
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
        {products.map((product) => {
          // Verificação se o produto foi adicionado
          const isAdded = addedItems.includes(product.id);

          return (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.imageBackground}>
                <div className={styles.imageWrapper}>
                  <div className={styles.imageContainer}>
                    {/* Substituído img por Image */}
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={300} // Defina a largura apropriada
                      height={300} // Defina a altura apropriada
                      className={styles.productImage}
                      onError={(e) => {
                        // Para o Image, usamos onError no container ou uma abordagem diferente
                        // Como fallback mais simples
                        e.currentTarget.src = "/images/fallback-nft.png";
                      }}
                      // Adicione um fallback caso o onError não funcione com Image
                      unoptimized={true} // Caso as imagens sejam de domínio externo
                    />
                  </div>
                </div>
              </div>

              <div className={styles.contentContainer}>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.productDescription}>
                  {product.description}
                </p>
                <div className={styles.priceContainer}>
                  <div className={styles.priceWithIcon}>
                    <Image
                      src="/images/Ellipse 770.png"
                      alt="ETH"
                      width={16}
                      height={16}
                      className={styles.ethIcon}
                    />
                    <span className={styles.price}>{product.price}</span>
                  </div>
                </div>
                <button
                  className={`${styles.buyButton} ${isAdded ? styles.added : ""}`}
                  onClick={() => handleBuyClick(product)}
                  disabled={isAdded}
                >
                  <span className={styles.buttonText}>
                    {isAdded ? "ADICIONADO AO CARRINHO" : "COMPRAR"}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProductGrid;
