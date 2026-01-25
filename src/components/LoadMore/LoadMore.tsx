// components/LoadMore.tsx
'use client';

import { motion } from 'framer-motion';
import styles from './LoadMore.module.scss';

interface LoadMoreProps {
  hasMore: boolean;    // Indica se ainda existem itens para carregar
  onLoad: () => void;  // Função que dispara o carregamento
  progress: number;    // Valor de 0 a 1 (ex: 0.4 para 40%)
}

export default function LoadMore({ hasMore, onLoad, progress }: LoadMoreProps) {
  return (
    <div className={styles.container}>
      {/* Barra de progresso sempre visível ou condicional */}
      <div className={styles.progressBarTrack}>
        <motion.div
          className={styles.progressBarFill}
          initial={false}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Lógica do Botão */}
      <button 
        className={styles.button} 
        onClick={onLoad}
        disabled={!hasMore} // Desativa o botão se não houver mais itens
        style={{ cursor: hasMore ? 'pointer' : 'default' }}
      >
        {hasMore ? "Carregar mais" : "Você já viu tudo"}
      </button>
    </div>
  );
}