# 🎨 NFT Marketplace

Marketplace de NFTs desenvolvido com Next.js 16, TypeScript, Redux Toolkit e React Query. Projeto full-stack com Server Components, rotas dinâmicas, gerenciamento de estado global e animações fluidas.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Executando o Projeto](#executando-o-projeto)
- [Docker](#docker)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Decisões Técnicas](#decisões-técnicas)
- [Testes](#testes)
- [Build para Produção](#build-para-produção)

## 🎯 Sobre o Projeto

NFT Marketplace é uma aplicação web moderna para visualização e compra de NFTs. O projeto demonstra o uso de tecnologias avançadas do ecossistema React/Next.js, incluindo:

- **Server Components** para renderização no servidor (SSR/ISR)
- **Redux Toolkit** para gerenciamento de estado global
- **React Query** para cache e sincronização de dados
- **Framer Motion** para animações fluidas
- **TypeScript** para type safety
- **SASS Modules** para estilização modular

## 🛠 Tecnologias

### Core
- **Next.js 16.1.4** - Framework React com App Router
- **React 19.2.3** - Biblioteca UI
- **TypeScript 5** - Superset JavaScript com tipagem estática

### Estado e Dados
- **Redux Toolkit 2.11.2** - Gerenciamento de estado global
- **React Query (@tanstack/react-query) 5.90.20** - Cache e sincronização de dados do servidor

### Estilização
- **SASS Modules** - Estilização modular com CSS Modules
- **Styled Components 6.3.8** - (Instalado, não utilizado atualmente)

### Animações
- **Framer Motion 12.29.0** - Biblioteca de animações

### Testes
- **Jest 30.2.0** - Framework de testes
- **React Testing Library 16.3.2** - Utilitários para testes de componentes
- **@testing-library/jest-dom 6.9.1** - Matchers customizados

### Ferramentas
- **ESLint 9** - Linter de código
- **Docker** - Containerização

## 📦 Pré-requisitos

- **Node.js** 20.x ou superior
- **npm** 9.x ou superior (ou yarn/pnpm)
- **Docker** e **Docker Compose** (opcional, para execução via container)

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd nft-marketplace
```

2. Instale as dependências:
```bash
npm install
```

## ▶️ Executando o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

### Modo Produção

```bash
# Build
npm run build

# Iniciar servidor de produção
npm start
```

## 🐳 Docker

### Executar com Docker Compose

```bash
# Build e iniciar
docker-compose up --build

# Executar em background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

### Build Manual da Imagem

```bash
docker build -t nft-marketplace .
docker run -p 3000:3000 nft-marketplace
```

## 📁 Estrutura do Projeto

```
nft-marketplace/
├── src/
│   ├── app/                    # App Router (Next.js 16)
│   │   ├── cart/              # Página do carrinho
│   │   ├── nft/[id]/          # Rota dinâmica de detalhes
│   │   ├── layout.tsx         # Layout raiz
│   │   └── page.tsx           # Página inicial
│   │
│   ├── components/            # Componentes React
│   │   ├── Header/            # Cabeçalho da aplicação
│   │   ├── ProductCard/       # Card de produto
│   │   ├── ProductGrid/      # Grid de produtos
│   │   ├── ProductGridClient/ # Client component do grid
│   │   ├── LoadMore/          # Botão de carregar mais
│   │   └── PageTransition/    # Transições de página
│   │
│   ├── store/                 # Redux Store
│   │   ├── cartSlice.ts      # Slice do carrinho
│   │   ├── store.ts           # Configuração da store
│   │   └── hooks.ts           # Hooks tipados
│   │
│   ├── hooks/                 # Custom Hooks
│   │   ├── useCart.ts         # Hook do carrinho (wrapper Redux)
│   │   ├── useProduct.ts      # Hook para listagem
│   │   └── useProductById.ts # Hook para detalhes
│   │
│   ├── services/              # Serviços de API
│   │   ├── api.ts            # API client (axios)
│   │   └── api-server.ts     # API server (fetch)
│   │
│   ├── providers/            # Context Providers
│   │   ├── react-query-provider.tsx
│   │   └── redux-provider.tsx
│   │
│   ├── types/                # TypeScript types
│   │   └── nft.ts
│   │
│   └── styles/               # Estilos globais
│       ├── globals.scss
│       └── Cart.module.scss
│
├── public/                   # Arquivos estáticos
│   └── images/              # Imagens
│
├── Dockerfile               # Configuração Docker
├── docker-compose.yml       # Docker Compose
├── jest.config.js          # Configuração Jest
├── jest.setup.js           # Setup Jest
├── next.config.ts          # Configuração Next.js
└── package.json            # Dependências e scripts
```

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build e Produção
npm run build        # Cria build de produção
npm start            # Inicia servidor de produção

# Testes
npm test             # Executa testes
npm run test:watch   # Executa testes em modo watch
npm run test:coverage # Executa testes com coverage

# Linting
npm run lint         # Executa ESLint
```

## 🎓 Decisões Técnicas

### Arquitetura

#### Server Components + Client Components
- **Páginas principais** são Server Components que buscam dados no servidor (SSR/ISR)
- **Componentes interativos** são Client Components
- **Benefício**: Melhor performance inicial e SEO

#### Redux Toolkit vs Context API
- **Escolha**: Redux Toolkit
- **Motivo**: Requisito do desafio + melhor para estado global complexo
- **Implementação**: Slice pattern com TypeScript tipado

#### React Query
- **Uso**: Cache e sincronização de dados da API
- **Configuração**: `staleTime: 5min`, `retry: 2`, `placeholderData` para UX suave

### Estrutura de Dados

#### API Server vs API Client
- **api-server.ts**: Usa `fetch` nativo para Server Components (ISR com `revalidate: 60`)
- **api.ts**: Usa `axios` para Client Components
- **Motivo**: Server Components não podem usar axios, apenas fetch nativo do Next.js

### Animações

#### Framer Motion
- **Uso**: Animações de entrada, hover, transições de página
- **Performance**: Animações usam `transform` e `opacity` (GPU-accelerated)
- **Padrão**: Durações curtas (0.2s - 0.5s) com easing suave

### Testes

#### Jest + React Testing Library
- **Cobertura**: Redux slices, hooks customizados, componentes principais
- **Estratégia**: Testes de comportamento, não implementação
- **Mocks**: `next/navigation` e `next/image` mockados

### Docker

#### Multi-stage Build
- **Stage 1 (deps)**: Instala dependências
- **Stage 2 (builder)**: Build da aplicação
- **Stage 3 (runner)**: Imagem final otimizada
- **Otimização**: Usa `output: 'standalone'` do Next.js para imagem menor

## 🧪 Testes

### Executar Testes

```bash
# Todos os testes
npm test

# Modo watch
npm run test:watch

# Com coverage
npm run test:coverage
```

### Estrutura de Testes

```
src/
├── components/
│   ├── Header/__tests__/
│   └── ProductCard/__tests__/
├── hooks/__tests__/
└── store/__tests__/
```

### Cobertura

- ✅ Redux slices (cartSlice)
- ✅ Custom hooks (useCart)
- ✅ Componentes principais (Header, ProductCard)

## 🏗 Build para Produção

### Build Local

```bash
npm run build
npm start
```

### Build Docker

```bash
docker-compose up --build
```

### Variáveis de Ambiente (Opcional)

Crie um arquivo `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

## 📝 Notas Adicionais

### API Externa

O projeto consome a API:
```
https://api-challenge.starsoft.games/api/v1/products
```

### Imagens

As imagens dos NFTs são servidas via AWS S3:
```
https://softstar.s3.amazonaws.com/items/**
```

### Performance

- **ISR**: Páginas são revalidadas a cada 60 segundos
- **Image Optimization**: Usa `next/image` com lazy loading
- **Code Splitting**: Automático via Next.js
- **Bundle Size**: Otimizado com `output: 'standalone'`

## 👤 Autor

Desenvolvido como teste técnico para vaga de Desenvolvedor(a) Front-End Next.js.

## 📄 Licença

Este projeto é privado e foi desenvolvido para fins de avaliação técnica.

---

**Desenvolvido com ❤️ usando Next.js, TypeScript e Redux Toolkit**
