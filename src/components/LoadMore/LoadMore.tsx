'use client';

import { motion } from 'framer-motion';
import styles from './LoadMore.module.scss';
import { LoadMoreProps } from '@/types/nft';

export default function LoadMore({ hasMore, onLoad, progress }: LoadMoreProps) {
  return (
    <div className={styles.container}>
      <div className={styles.progressBarTrack}>
        <motion.div
          className={styles.progressBarFill}
          initial={false}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <button 
        className={styles.button} 
        onClick={onLoad}
        disabled={!hasMore} 
        style={{ cursor: hasMore ? 'pointer' : 'default' }}
      >
        {hasMore ? "Carregar mais" : "Você já viu tudo"}
      </button>
    </div>
  );
}