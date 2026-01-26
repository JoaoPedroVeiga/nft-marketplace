// components/Header/Header.tsx
'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import styles from './header.module.scss';

interface HeaderProps {
  logoUrl?: string;
  bagUrl?: string;
  showCartCount?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  logoUrl = '/images/logo-1.png',
  bagUrl = '/images/bag.png',
  showCartCount = true,
}) => {
  const { getTotalItems } = useCart();
  const router = useRouter();
  const cartItemCount = getTotalItems();
  
  const handleBagClick = () => {
    router.push('/cart');
  };
  
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Logo na esquerda */}
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <Image
              src={logoUrl}
              alt="Logo"
              width={101}
              height={38}
              className={styles.logo}
              priority
            />
          </Link>
        </div>
       
        {/* Bag na direita */}
        <div className={styles.bagContainer}>
          <button 
            className={styles.bagButton} 
            onClick={handleBagClick}
            aria-label="Carrinho de compras"
          >
            <div className={styles.bagWrapper}>
              <Image
                src={bagUrl}
                alt="Carrinho"
                width={74}
                height={53}
                className={styles.bagIcon}
              />
              {showCartCount && cartItemCount > -1 && (
                <span className={styles.cartCount}>{cartItemCount}</span>
              )}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;