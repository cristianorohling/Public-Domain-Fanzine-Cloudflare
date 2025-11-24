# Public Domain Fanzine (Cloudflare Edition)

Este é o site oficial do **Public Domain Fanzine**, uma coleção dedicada a resgatar quadrinhos em domínio público da Era de Ouro.

Esta versão foi adaptada para rodar no **Cloudflare Pages** utilizando **Vite**.

## Tecnologias

*   **Frontend**: React 18 (via Vite).
*   **Estilização**: Tailwind CSS (via CDN).
*   **Backend**: Cloudflare Functions (para processamento de pedidos).
*   **Hospedagem**: Cloudflare Pages.

## Como fazer Deploy na Cloudflare Pages

1.  Faça o upload deste repositório para o seu GitHub.
2.  Acesse o dashboard da [Cloudflare Pages](https://dash.cloudflare.com/?to=/:account/pages).
3.  Clique em **Create a project** > **Connect to Git**.
4.  Selecione este repositório (`public-domain-fanzine`).
5.  Nas configurações de build (Build settings), a Cloudflare deve detectar o Vite automaticamente, mas caso não detecte:
    *   **Framework preset**: Vite (ou React)
    *   **Build command**: `npm run build`
    *   **Build output directory**: `dist`
6.  Clique em **Save and Deploy**.

## Backend (Functions)

O sistema de pedidos utiliza Cloudflare Functions localizadas na pasta `/functions`. A Cloudflare detecta automaticamente essa pasta e cria as rotas de API.

*   Rota de Pedido: `POST /api/submit-order`

## Desenvolvimento Local

Instale as dependências e rode o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Para testar as Functions localmente, use o Wrangler:

```bash
npx wrangler pages dev .
```