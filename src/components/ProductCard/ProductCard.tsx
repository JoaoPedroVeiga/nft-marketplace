"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { motion } from "framer-motion";
import styles from "./ProductCard.module.scss";
import { Product } from "@/types/nft";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleBuyClick = async (product: Product) => {
    addToCart({
      id: typeof product.id === 'number' ? product.id : Number(product.id),
      name: product.title,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
    });

    setIsAdded(true);

    setTimeout(() => {
      router.push("/cart");
    }, 800);
  };

  const handleCardClick = () => {
    router.push(`/nft/${product.id}`);
  };

  return (
    <motion.div
      className={styles.productCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <motion.div
        className={styles.imageBackground}
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={300}
              height={300}
              className={styles.productImage}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/fallback-nft.png";
              }}
              unoptimized={true}
            />
          </div>
        </div>
      </motion.div>

      <div className={styles.contentContainer}>
        <h3 className={styles.productTitle} onClick={handleCardClick} style={{ cursor: 'pointer' }}>
          {product.title}
        </h3>
        <p className={styles.productDescription}>
          {product.description}
        </p>
        <div className={styles.priceContainer}>
          <div className={styles.priceWithIcon}>
            <Image
              src="/images/ellipse-770.png"
              alt="ETH"
              width={16}
              height={16}
              className={styles.ethIcon}
            />
            <span className={styles.price}>{product.price}</span>
          </div>
        </div>
        <motion.button
          className={`${styles.buyButton} ${isAdded ? styles.added : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            handleBuyClick(product);
          }}
          disabled={isAdded}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <span className={styles.buttonText}>
            {isAdded ? "ADICIONADO AO CARRINHO" : "COMPRAR"}
          </span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;