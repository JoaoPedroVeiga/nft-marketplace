import { useQuery } from '@tanstack/react-query';
import { getProducts } from '@/services/api';
import { ProductResponse, UseProductsOptions } from '@/types/nft';



export function useProducts({
  page = 1,
  rows = 8,  
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