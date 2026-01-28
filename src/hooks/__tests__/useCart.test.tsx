import { renderHook, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { useCart } from '../useCart';
import cartReducer from '@/store/cartSlice';
import { CartItem } from '@/types/nft';

function createTestStore() {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
}

function wrapper({ children }: { children: React.ReactNode }) {
  const store = createTestStore();
  return <Provider store={store}>{children}</Provider>;
}

describe('useCart', () => {
  const mockProduct: Omit<CartItem, 'quantity'> = {
    id: 1,
    name: 'Test NFT',
    description: 'Test Description',
    price: '100 ETH',
    imageUrl: 'https://example.com/image.png',
  };

  it('should return empty cart initially', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.getTotal()).toBe(0);
    expect(result.current.getTotalItems()).toBe(0);
  });

  it('should add item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({
      ...mockProduct,
      quantity: 1,
    });
    expect(result.current.getTotalItems()).toBe(1);
  });

  it('should calculate total correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart({ ...mockProduct, id: 2, price: '50 ETH' });
    });

    expect(result.current.getTotal()).toBe(150);
  });

  it('should remove item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.removeFromCart(1);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should update item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.updateQuantity(1, 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.getTotalItems()).toBe(5);
  });

  it('should clear cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart({ ...mockProduct, id: 2 });
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.getTotal()).toBe(0);
  });
});

