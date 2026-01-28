import cartReducer, { addToCart, removeFromCart, updateQuantity, clearCart } from '../cartSlice';
import { CartItem } from '@/types/nft';

describe('cartSlice', () => {
  const mockProduct: Omit<CartItem, 'quantity'> = {
    id: 1,
    name: 'Test NFT',
    description: 'Test Description',
    price: '100 ETH',
    imageUrl: 'https://example.com/image.png',
  };

  it('should return initial state', () => {
    expect(cartReducer(undefined, { type: 'unknown' })).toEqual({
      items: [],
    });
  });

  it('should add item to cart', () => {
    const action = addToCart(mockProduct);
    const state = cartReducer(undefined, action);

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({
      ...mockProduct,
      quantity: 1,
    });
  });

  it('should increment quantity when adding existing item', () => {
    const initialState = {
      items: [{ ...mockProduct, quantity: 1 }],
    };

    const action = addToCart(mockProduct);
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('should remove item from cart', () => {
    const initialState = {
      items: [{ ...mockProduct, quantity: 1 }],
    };

    const action = removeFromCart(1);
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(0);
  });

  it('should update item quantity', () => {
    const initialState = {
      items: [{ ...mockProduct, quantity: 1 }],
    };

    const action = updateQuantity({ id: 1, quantity: 5 });
    const state = cartReducer(initialState, action);

    expect(state.items[0].quantity).toBe(5);
  });

  it('should remove item when quantity is less than 1', () => {
    const initialState = {
      items: [{ ...mockProduct, quantity: 1 }],
    };

    const action = updateQuantity({ id: 1, quantity: 0 });
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(0);
  });

  it('should clear cart', () => {
    const initialState = {
      items: [
        { ...mockProduct, quantity: 1 },
        { ...mockProduct, id: 2, quantity: 2 },
      ],
    };

    const action = clearCart();
    const state = cartReducer(initialState, action);

    expect(state.items).toHaveLength(0);
  });
});

