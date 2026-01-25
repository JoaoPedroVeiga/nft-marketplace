// types/nft.ts
export interface NFTApiResponse {
  id: string | number;
  name?: string;
  title?: string;
  description?: string;
  price?: number | string;
  image_url?: string;
  image?: string;
}

export interface Product {
  id: number | string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}