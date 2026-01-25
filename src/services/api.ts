// services/api.ts
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-challenge.starsoft.games/api/v1/products',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Tipos baseados na resposta real
export interface ApiProduct {
  id: number;
  name: string;
  description: string;      // Existe na API!
  image: string;           // Campo é 'image' (não 'imageUrl')
  price: string;           // String! "182.00000000"
  createdAt: string;
  // NOTA: Não há campo 'brand' na resposta real!
}

export interface ProductResponse {
  products: ApiProduct[];  // Array em 'products' (não 'data')
  count: number;           // Total de produtos
}

export interface PaginationParams {
  page: number;
  rows: number;
  sortBy: 'id' | 'name' | 'brand' | 'price';
  orderBy: 'ASC' | 'DESC';
}

export async function getProducts({ 
  page = 1, 
  rows = 10, 
  sortBy = 'name', 
  orderBy = 'ASC'
}: Partial<PaginationParams> = {}): Promise<ProductResponse> {
  
  const params: PaginationParams = {
    page,
    rows,
    sortBy,
    orderBy
  };
  
  console.log('📡 API Request Params:', params);
  
  try {
    const response = await api.get<ProductResponse>('/', { params });
    console.log('✅ API Response:', {
      totalProducts: response.data.count,
      productsCount: response.data.products?.length || 0
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ API Error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data
    });
    throw error;
  }
}