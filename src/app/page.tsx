// app/page.tsx
'use client';

import LoadMore from '@/components/LoadMore/LoadMore';
import ProductGrid from '@/components/ProductGrid/ProductGrid';
import { useProducts } from '@/hooks/useProduct';

import { useState, useEffect } from 'react';

export default function Home() {
  const [page, setPage] = useState(1);
  const [rows] = useState(8);
  const [sortBy] = useState<'id' | 'name' | 'brand' | 'price'>('name');
  const [orderBy] = useState<'ASC' | 'DESC'>('ASC');
  
  const { data, isLoading, isError, error } = useProducts({
    page,
    rows,
    sortBy,
    orderBy
  });

  const [progress, setProgress] = useState(0.4);
  const [hasMore, setHasMore] = useState(true);

  // Calcular total de páginas baseado no count
  const totalPages = data?.count ? Math.ceil(data.count / rows) : 1;

  useEffect(() => {
    if (data?.count) {
      // Progresso: (página atual * produtos por página) / total de produtos
      const loadedProducts = page * rows;
      const calculatedProgress = Math.min(loadedProducts / data.count, 1);
      setProgress(calculatedProgress);
      
      // Há mais páginas se ainda temos produtos para carregar
      setHasMore(loadedProducts < data.count);
    }
  }, [data, page, rows]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage(prev => prev + 1);
    }
  };

  // Transforma dados da API para o formato do componente
  const products = data?.products?.map((item) => ({
    id: item.id,
    title: item.name,
    description: item.description,
    // Formatar preço: "182.00000000" -> "182 ETH"
    price: `${parseFloat(item.price).toFixed(0)} ETH`,
    imageUrl: item.image,
  })) || [];

  console.log('📊 Dados carregados:', {
    total: data?.count,
    carregados: products.length,
    página: page,
    temMais: hasMore
  });

  return (
    <>
      <ProductGrid
        products={products}
        title="NFT Collection"
        columns={4}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />

      {/* {!isLoading && !isError && (
        <div style={{ textAlign: 'center', margin: '20px 0', color: '#666' }}>
          Mostrando {products.length} de {data?.count || 0} produtos
        </div>
      )} */}

      <LoadMore
        progress={progress}
        hasMore={hasMore}
        onLoad={handleLoadMore}
        isLoading={isLoading}
      />
    </>
  );
}