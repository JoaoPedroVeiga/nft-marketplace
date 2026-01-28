"use client";

import styles from "./Cart.module.scss";
import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } =
    useCart();
  const [isFinished, setIsFinished] = useState(false);
  const router = useRouter();
  const total = getTotal();

  const handleBack = () => {
    router.push("/");
  };

  const handleCheckout = () => {
    setIsFinished(true);
    setTimeout(() => {
      alert(`Compra finalizada! Total: ${total.toFixed(2)} ETH`);
      clearCart();
      router.push("/");
    }, 500);
  };

  if (items.length === 0) {
    return (
      <div className={styles.cartPage}>
        <header>
          <button className={styles.backButton} onClick={handleBack}>
            <Image
              src="/images/arrow-left.png"
              alt="Voltar"
              width={20}
              height={20}
              className={styles.backIcon}
            />
          </button>
          <h1>Mochila de Compras</h1>
        </header>

        <div className={styles.emptyCart}>
          <div className={styles.emptyCartEmoji}>🛒</div>
          <h2 className={styles.emptyCartTitle}>Seu carrinho está vazio</h2>
          <p className={styles.emptyCartMessage}>
            Adicione itens incríveis ao seu carrinho!
          </p>
          <button
            className={styles.continueShoppingBtn}
            onClick={handleBack}
          >
            Continuar Comprando
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <header>
        <button className={styles.backButton} onClick={handleBack}>
          <Image
            src="/images/arrow-left.png"
            alt="Voltar"
            width={24}
            height={24}
            className={styles.backIcon}
          />
        </button>
        <h1>Mochila de Compras</h1>
      </header>

      <div className={styles.cartList}>
        {items.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <Link href={`/nft/${item.id}`} className={styles.itemImage}>
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={100}
                height={100}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
                onError={(e) => {
                  e.currentTarget.src = "/images/fallback-nft.png";
                }}
              />
            </Link>

            <div className={styles.itemDetails}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>

              <div className={styles.price}>
                <Image
                  src="/images/ellipse-770.png"
                  alt="ETH"
                  width={16}
                  height={16}
                  className={styles.currencyIcon}
                />
                {item.price}
              </div>

              <div className={styles.quantityControls}>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className={styles.removeBtn}
              onClick={() => removeFromCart(item.id)}
            >
              <Image
                src="/images/delete.png"
                alt="Remover"
                width={20}
                height={20}
                className={styles.trashIcon}
              />
            </button>
          </div>
        ))}
      </div>

      <footer className={styles.footer}>
        <div className={styles.totalRow}>
          <span>TOTAL </span>
          <span className={styles.ethPrice}>
            <Image
              src="/images/ellipse-770.png"
              alt="ETH"
              width={16}
              height={16}
              className={styles.currencyIcon}
            />
            {total.toFixed(2)} ETH
          </span>
        </div>

        <div className={styles.checkoutBtnContainer}>
          <button
            className={styles.checkoutBtn}
            onClick={handleCheckout}
            disabled={isFinished}
          >
            {isFinished ? "Compra Finalizada!" : "Finalizar Compra"}
          </button>
        </div>
      </footer>
    </div>
  );
}