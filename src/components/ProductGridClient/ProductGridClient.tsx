"use client";

import { useState, useEffect } from "react";
import LoadMore from "@/components/LoadMore/LoadMore";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import { useProducts } from "@/hooks/useProduct";
import { ProductResponse } from "@/types/nft";

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

  const { data, isLoading, isError, error } = useProducts({
    page,
    rows,
    sortBy,
    orderBy,
  });

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

  const products =
    currentData?.products?.map((item) => ({
      id: item.id,
      title: item.name,
      description: item.description,
      price: `${parseFloat(item.price).toFixed(0)} ETH`,
      imageUrl: item.image,
    })) || [];

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
