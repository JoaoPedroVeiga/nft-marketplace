"use client";

import { useState, useEffect, useMemo } from "react";
import LoadMore from "@/components/LoadMore/LoadMore";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import { useProducts } from "@/hooks/useProduct";
import { ProductResponse, ApiProduct } from "@/types/nft";

interface ProductGridClientProps {
  initialData: ProductResponse;
  initialPage?: number;
}

export default function ProductGridClient({ 
  initialData, 
  initialPage = 1 
}: ProductGridClientProps) {
  const [page, setPage] = useState(initialPage);
  const [rows] = useState(8);
  const [sortBy] = useState<"id" | "name" | "brand" | "price">("name");
  const [orderBy] = useState<"ASC" | "DESC">("ASC");
  
  // Estado para acumular os produtos carregados
  const [accumulatedProducts, setAccumulatedProducts] = useState<ApiProduct[]>(
    initialData.products || []
  );

  const { data, isLoading, isError, error } = useProducts({
    page,
    rows,
    sortBy,
    orderBy,
  });

  // Efeito para concatenar novos produtos quando uma nova página é carregada
  useEffect(() => {
    if (data?.products && page > initialPage) {
      setAccumulatedProducts(prev => {
        // Evitar duplicação baseando-se no id dos produtos
        const existingIds = new Set(prev.map(product => product.id));
        const newProducts = data.products.filter(
          product => !existingIds.has(product.id)
        );
        
        // Se não houver novos produtos, retornar a lista atual
        if (newProducts.length === 0) return prev;
        
        // Concatenar os novos produtos
        return [...prev, ...newProducts];
      });
    }
  }, [data, page, initialPage]);

  // Determinar qual dado usar para progresso e contagem total
  const currentData = page === initialPage ? initialData : data;

  const [progress, setProgress] = useState(0.4);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    if (currentData?.count) {
      const loadedProducts = page * rows;
      const calculatedProgress = Math.min(loadedProducts / currentData.count, 1);
      setProgress(calculatedProgress);
      setHasMore(loadedProducts < currentData.count);
    }
  }, [currentData, page, rows]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  // Transformar os produtos acumulados para o formato esperado pelo ProductGrid
  const products = useMemo(
    () =>
      accumulatedProducts.map((item) => ({
        id: item.id,
        title: item.name,
        description: item.description,
        price: `${parseFloat(item.price).toFixed(0)} ETH`,
        imageUrl: item.image,
      })),
    [accumulatedProducts]
  );

  return (
    <>
      <ProductGrid
        products={products}
        title=""
        columns={4}
        isLoading={isLoading && page !== initialPage}
        isError={isError}
        error={error}
      />

      <LoadMore
        progress={progress}
        hasMore={hasMore}
        onLoad={handleLoadMore}
        isLoading={isLoading}
      />
    </>
  );
}