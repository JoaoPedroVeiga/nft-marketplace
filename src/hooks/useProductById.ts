import { useQuery } from '@tanstack/react-query';
import { getProductById, getProducts } from '@/services/api';
import { ApiProduct } from '@/types/nft';

async function getProductByIdWithFallback(id: number): Promise<ApiProduct> {
  try {
    return await getProductById(id);
  } catch {
    let page = 1;
    while (page <= 20) {
      try {
        const productsData = await getProducts({
          page,
          rows: 8,
          sortBy: 'name',
          orderBy: 'ASC',
        });

        const product = productsData.products.find(p => p.id === id);
        if (product) {
          return product;
        }

        if (productsData.products.length < 8) {
          break;
        }

        page++;
      } catch {
        break;
      }
    }

    throw new Error(`Produto com ID ${id} não encontrado`);
  }
}

export function useProductById(id: number) {
  return useQuery<ApiProduct, Error>({
    queryKey: ['product', id],
    queryFn: () => getProductByIdWithFallback(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: false,
  });
}