// app/cart/page.tsx
"use client";

import styles from "../../styles/Cart.module.scss";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useState } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotal, clearCart } =
    useCart();
  const [isFinished, setIsFinished] = useState(false); // 2. Crie o estado
  const router = useRouter();
  const total = getTotal();

  const handleBack = () => {
    router.push("/");
  };

  const handleCheckout = () => {
    setIsFinished(true); // 3. Muda o estado para true ao clicar

    // Pequeno delay para o usuário ver a mudança antes do alert/redirecionamento
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
          {/* ÍCONE DE VOLTAR SUBSTITUÍDO */}
          <img 
            src="/images/Arrow - Left.png" 
            alt="Voltar" 
            className={styles.backIcon} 
          />
        </button>
          <h1>Mochila de Compras</h1>
        </header>

        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
          }}
        >
          <div
            style={{
              fontSize: "60px",
              marginBottom: "20px",
              color: "#666",
            }}
          >
            🛒
          </div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
            Seu carrinho está vazio
          </h2>
          <p style={{ color: "#888", marginBottom: "30px" }}>
            Adicione itens incríveis ao seu carrinho!
          </p>
          <button
            onClick={handleBack}
            style={{
              background: "#ff8c00",
              color: "#000",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
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
          {/* ÍCONE DE VOLTAR SUBSTITUÍDO */}
          <img 
            src="/images/Arrow - Left.png" 
            alt="Voltar" 
            className={styles.backIcon} 
          />
        </button>
        <h1>Mochila de Compras</h1>
      </header>

      <div className={styles.cartList}>
        {items.map((item) => (
          <div key={item.id} className={styles.cartItem}>
            <div className={styles.itemImage}>
              <img
                src={item.imageUrl}
                alt={item.name}
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
            </div>

            <div className={styles.itemDetails}>
              <h3>{item.name}</h3>
              <p>{item.description}</p>

              <div className={styles.price}>
                {/* ÍCONE ETH SUBSTITUÍDO POR IMAGEM */}
                <img
                  src="/images/Ellipse 770.png"
                  alt="ETH"
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
              {/* ÍCONE LIXEIRA SUBSTITUÍDO POR IMAGEM */}
              <img
                src="/images/Delete.png"
                alt="Remover"
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
            <img
              src="/images/Ellipse 770.png"
              alt="ETH"
              className={styles.currencyIcon}
            />
            {total.toFixed(2)} ETH
          </span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "20px",
          }}
        >
          <button
            className={styles.checkoutBtn}
            onClick={handleCheckout}
            disabled={isFinished} // Opcional: desabilita para evitar múltiplos cliques
          >
            {isFinished ? "Compra Finalizada!" : "Finalizar Compra"}
          </button>
        </div>
      </footer>
    </div>
  );
}
