// components/Header/__tests__/Header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Header from '../header';
import cartReducer from '@/store/cartSlice';
import { addToCart } from '@/store/cartSlice';

// Mock do next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  Link: ({ children, href }: any) => <a href={href}>{children}</a>,
}));

// Mock do next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Helper para criar store de teste
function createTestStore() {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
  });
}

// Wrapper para provider
function wrapper({ children }: { children: React.ReactNode }) {
  const store = createTestStore();
  return <Provider store={store}>{children}</Provider>;
}

describe('Header', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('should render logo', () => {
    render(<Header />, { wrapper });

    const logo = screen.getByAltText('Logo');
    expect(logo).toBeInTheDocument();
  });

  it('should render cart button', () => {
    render(<Header />, { wrapper });

    const cartButton = screen.getByLabelText('Carrinho de compras');
    expect(cartButton).toBeInTheDocument();
  });

  it('should show cart count when items are in cart', () => {
    const store = createTestStore();
    
    // Adiciona item ao carrinho
    store.dispatch(addToCart({
      id: 1,
      name: 'Test',
      description: 'Test',
      price: '100 ETH',
      imageUrl: 'https://example.com/image.png',
    }));

    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should navigate to cart when cart button is clicked', () => {
    render(<Header />, { wrapper });

    const cartButton = screen.getByLabelText('Carrinho de compras');
    fireEvent.click(cartButton);

    expect(mockPush).toHaveBeenCalledWith('/cart');
  });

  it('should not show cart count when cart is empty', () => {
    render(<Header />, { wrapper });

    const cartCount = screen.queryByText('0');
    expect(cartCount).not.toBeInTheDocument();
  });
});

