// ==================== API TYPES ====================

export interface ApiProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price: string;
  createdAt: string;
}

export interface ProductResponse {
  products: ApiProduct[];
  count: number;
}

export interface PaginationParams {
  page: number;
  rows: number;
  sortBy: 'id' | 'name' | 'brand' | 'price';
  orderBy: 'ASC' | 'DESC';
}

// ==================== PRODUCT TYPES ====================

export interface Product {
  id: number | string;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
}

// Alias para compatibilidade
export type NFTApiResponse = Product;

// ==================== CART TYPES ====================

export interface CartItem {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addToCart: (product: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getTotalItems: () => number;
}

// ==================== COMPONENT PROPS ====================

export interface ProductGridProps {
  products?: Product[];
  title?: string;
  columns?: 2 | 3 | 4;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
}

export interface HeaderProps {
  logoUrl?: string;
  bagUrl?: string;
  showCartCount?: boolean;
}

export interface LoadMoreProps {
  hasMore: boolean;
  onLoad: () => void;
  progress: number;
  isLoading: boolean;
}

// ==================== HOOKS TYPES ====================

export interface UseProductsOptions {
  page?: number;
  rows?: number;
  sortBy?: 'id' | 'name' | 'brand' | 'price';
  orderBy?: 'ASC' | 'DESC';
}