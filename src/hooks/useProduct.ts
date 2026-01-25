// hooks/useProducts.ts
import { useQuery } from '@tanstack/react-query';
import { getProducts, ProductResponse } from '@/services/api';

interface UseProductsOptions {
  page?: number;
  rows?: number;
  sortBy?: 'id' | 'name' | 'brand' | 'price';
  orderBy?: 'ASC' | 'DESC';
}

export function useProducts({
  page = 1,
  rows = 8,  // Padrão 8 para grid 2x4
  sortBy = 'name',
  orderBy = 'ASC'
}: UseProductsOptions = {}) {
  
  return useQuery<ProductResponse, Error>({
    queryKey: ['products', page, rows, sortBy, orderBy],
    queryFn: () => getProducts({ page, rows, sortBy, orderBy }),
    staleTime: 5 * 60 * 1000,
    retry: 2,
    placeholderData: (previousData) => previousData,
  });
}