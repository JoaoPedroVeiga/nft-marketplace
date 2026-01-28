import { PaginationParams, ProductResponse, ApiProduct } from '@/types/nft';
import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api-challenge.starsoft.games/api/v1/products',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

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
  
  try {
    const response = await api.get<ProductResponse>('/', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getProductById(id: number): Promise<ApiProduct> {
  try {
    const response = await api.get<ApiProduct>(`/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}