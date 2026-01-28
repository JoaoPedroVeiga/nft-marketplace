import { ProductResponse, ApiProduct, PaginationParams } from '@/types/nft';

const API_BASE_URL = 'https://api-challenge.starsoft.games/api/v1/products';

export async function getProductsServer({
  page = 1,
  rows = 10,
  sortBy = 'name',
  orderBy = 'ASC',
}: Partial<PaginationParams> = {}): Promise<ProductResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    rows: rows.toString(),
    sortBy,
    orderBy,
  });

  try {
    const response = await fetch(`${API_BASE_URL}?${params.toString()}`, {
      next: { revalidate: 60 },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => '');
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getProductByIdServer(id: number): Promise<ApiProduct> {
  try {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        next: { revalidate: 60 },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return await response.json();
      }
    } catch {
    }

    let page = 1;
    let found = false;
    let product: ApiProduct | undefined;

    while (!found && page <= 50) {
      try {
        const productsData = await getProductsServer({ 
          page, 
          rows: 8,
          sortBy: 'name',
          orderBy: 'ASC'
        });

        product = productsData.products.find(p => p.id === id);
        
        if (product) {
          found = true;
          break;
        }

        if (productsData.products.length < 8) {
          break;
        }

        page++;
      } catch {
        break;
      }
    }

    if (!product) {
      throw new Error(`Produto com ID ${id} não encontrado após buscar ${page} páginas`);
    }

    return product;
  } catch (error) {
    throw error;
  }
}