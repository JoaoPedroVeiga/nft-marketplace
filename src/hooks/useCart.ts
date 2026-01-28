import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '@/store/cartSlice';
import { CartContextType } from '@/types/nft';

export function useCart(): CartContextType {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  const getTotal = () => {
    return items.reduce((total, item) => {
      const price = parseFloat(item.price.replace(' ETH', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    items,
    addToCart: (product) => dispatch(addToCart(product)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
    updateQuantity: (id, quantity) => dispatch(updateQuantity({ id, quantity })),
    clearCart: () => dispatch(clearCart()),
    getTotal,
    getTotalItems,
  };
}


