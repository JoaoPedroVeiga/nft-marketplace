'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/useCart';
import { useRouter } from 'next/navigation';
import styles from './header.module.scss';
import { HeaderProps } from '@/types/nft';


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
       
        <div className={styles.bagContainer}>
          <motion.button
            className={styles.bagButton}
            onClick={handleBagClick}
            aria-label="Carrinho de compras"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.bagWrapper}>
              <Image
                src={bagUrl}
                alt="Carrinho"
                width={74}
                height={53}
                className={styles.bagIcon}
              />
              <AnimatePresence mode="wait">
                {showCartCount && cartItemCount > 0 && (
                  <motion.span
                    className={styles.cartCount}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    key={cartItemCount}
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        </div>
      </div>
    </header>
  );
};

export default Header;