"use client";

import React from "react";
import { motion } from "framer-motion";
import styles from "./ProductGrid.module.scss";
import { Product, ProductGridProps } from "@/types/nft";
import ProductCard from "../ProductCard/ProductCard";

const ProductGrid: React.FC<ProductGridProps> = ({
  products = [],
  title, 
  columns = 4,
  isLoading = false,
  isError = false,
  error = null,
}) => {
  const gridClass = `${styles.productGrid} ${styles[`columns${columns}`]}`;

  if (isLoading) {
    return (
      <section className={styles.container}>
        {title && <h2 className={styles.sectionTitle}>{title}</h2>} 
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
        {title && <h2 className={styles.sectionTitle}>{title}</h2>} 
        <div className={styles.errorState}>
          <p>
            Erro ao carregar produtos: {error?.message || "Tente novamente"}
          </p>
          <form action={async () => {
          }}>
            <button type="submit" className={styles.retryButton}>
              Tentar novamente
            </button>
          </form>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className={styles.container}>
        {title && <h2 className={styles.sectionTitle}>{title}</h2>} 
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
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;