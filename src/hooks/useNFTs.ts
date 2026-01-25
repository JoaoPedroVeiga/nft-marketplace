import { useQuery } from '@tanstack/react-query';
import { getProducts, ProductResponse } from '@/services/api';

interface UseProductsOptions {
  page?: number;
  rows?: number;
  sortBy?: 'id' | 'name' | 'brand' | 'price';
  orderBy?: 'asc' | 'desc';
  enabled?: boolean;
}

export function useProducts({
  page = 1,
  rows = 10,
  sortBy = 'name',
  orderBy = 'asc',
  enabled = true
}: UseProductsOptions = {}) {
  
  return useQuery<ProductResponse, Error>({
    queryKey: ['products', page, rows, sortBy, orderBy],
    queryFn: () => getProducts({ page, rows, sortBy, orderBy }),
    staleTime: 5 * 60 * 1000, // 5 minutos
    retry: 2,
    // Opção 1: Use 'placeholderData' em vez de 'keepPreviousData'
    placeholderData: (previousData) => previousData,
    // Opção 2: Ou se quiser manter o comportamento antigo, use:
    // keepPreviousData: true, // Comente se estiver usando v4+
    enabled,
  });
}