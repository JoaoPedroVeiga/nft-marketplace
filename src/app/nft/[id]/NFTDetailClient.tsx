"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { useProductById } from "@/hooks/useProductById";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { ApiProduct } from "@/types/nft";
import styles from "./nft-detail.module.scss";

interface NFTDetailClientProps {
  initialProduct: ApiProduct;
  id: number;
}

export default function NFTDetailClient({
  initialProduct,
  id,
}: NFTDetailClientProps) {
  const router = useRouter();
  const { data: product = initialProduct, isError, error } = useProductById(id);
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleBack = () => {
    router.push("/");
  };

  const handleBuyClick = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: `${parseFloat(product.price).toFixed(0)} ETH`,
      imageUrl: product.image,
    });

    setIsAdded(true);

    setTimeout(() => {
      router.push("/cart");
    }, 800);
  };

  if (isError && !product) {
    return (
      <div className={styles.container}>
        <button className={styles.backButton} onClick={handleBack}>
          <Image
            src="/images/Arrow - Left.png"
            alt="Voltar"
            width={20}
            height={20}
          />
          Voltar
        </button>

        <div className={styles.error}>
          <p>
            Erro ao carregar NFT: {error?.message || "Produto não encontrado"}
          </p>
          <button onClick={handleBack}>Voltar para a lista</button>
        </div>
      </div>
    );
  }

  const formattedPrice = `${parseFloat(product.price).toFixed(0)} ETH`;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={handleBack}>
        <Image
          src="/images/arrow-left.png"
          alt="Voltar"
          width={20}
          height={20}
          style={{ marginRight: "8px" }}
        />
        Voltar
      </button>

      <motion.div
        className={styles.content}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className={styles.imageSection}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className={styles.imageWrapper}>
            <Image
              src={product.image}
              alt={product.name}
              width={600}
              height={600}
              className={styles.productImage}
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/images/fallback-nft.png";
              }}
              unoptimized={true}
            />
          </div>
        </motion.div>

        <motion.div
          className={styles.detailsSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.priceSection}>
            <div className={styles.priceContainer}>
              <Image
                src="/images/ellipse-770.png"
                alt="ETH"
                width={24}
                height={24}
                className={styles.ethIcon}
              />
              <span className={styles.price}>{formattedPrice}</span>
            </div>
          </div>

          <div className={styles.metadata}>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>ID:</span>
              <span className={styles.metadataValue}>#{product.id}</span>
            </div>
            <div className={styles.metadataItem}>
              <span className={styles.metadataLabel}>Criado em:</span>
              <span className={styles.metadataValue}>
                {new Date(product.createdAt).toLocaleDateString("pt-BR")}
              </span>
            </div>
          </div>

          <motion.button
            className={`${styles.buyButton} ${isAdded ? styles.added : ""}`}
            onClick={handleBuyClick}
            disabled={isAdded}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <span className={styles.buttonText}>
              {isAdded ? "ADICIONADO AO CARRINHO" : "COMPRAR"}
            </span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
