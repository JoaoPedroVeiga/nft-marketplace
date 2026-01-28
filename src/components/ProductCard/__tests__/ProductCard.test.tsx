import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom'; 
import ProductCard from '../ProductCard';
import cartReducer from '@/store/cartSlice';
import { Product } from '@/types/nft';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

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

const mockProduct: Product = {
  id: 1,
  title: 'Test NFT',
  description: 'Test Description',
  price: '100 ETH',
  imageUrl: 'https://example.com/image.png',
};

describe('ProductCard', () => {
  it('should render product information', () => {
    render(<ProductCard product={mockProduct} />, { wrapper });

    expect(screen.getByText('Test NFT')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('100 ETH')).toBeInTheDocument();
  });

  it('should render buy button', () => {
    render(<ProductCard product={mockProduct} />, { wrapper });

    const buyButton = screen.getByRole('button', { name: /comprar/i });
    expect(buyButton).toBeInTheDocument();
  });

  it('should disable button after adding to cart', () => {
    render(<ProductCard product={mockProduct} />, { wrapper });

    const buyButton = screen.getByRole('button', { name: /comprar/i });
    
    fireEvent.click(buyButton);

    expect(buyButton).toBeDisabled();
    expect(screen.getByText(/adicionado ao carrinho/i)).toBeInTheDocument();
  });
});

