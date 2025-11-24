# Public Domain Fanzine (Cloudflare Edition)

Este é o site oficial do **Public Domain Fanzine**, uma coleção dedicada a resgatar quadrinhos em domínio público da Era de Ouro.

Esta versão foi adaptada para rodar no **Cloudflare Pages**.

## Tecnologias

*   **Frontend**: React 19 (via ES Modules/CDN), Tailwind CSS.
*   **Backend**: Cloudflare Functions (para processamento de pedidos).
*   **Hospedagem**: Cloudflare Pages.

## Como fazer Deploy na Cloudflare Pages

1.  Faça o upload deste repositório para o seu GitHub.
2.  Acesse o dashboard da [Cloudflare Pages](https://dash.cloudflare.com/?to=/:account/pages).
3.  Clique em **Create a project** > **Connect to Git**.
4.  Selecione este repositório (`public-domain-fanzine`).
5.  Nas configurações de build (Build settings):
    *   **Framework preset**: None (ou selecione Create React App se preferir, mas como usamos CDN, "None" funciona bem).
    *   **Build command**: Deixe em branco (ou `npm run build` se você adicionar um bundler futuramente).
    *   **Build output directory**: `/` (Raiz).
6.  Clique em **Save and Deploy**.

## Backend (Functions)

O sistema de pedidos utiliza Cloudflare Functions localizadas na pasta `/functions`. A Cloudflare detecta automaticamente essa pasta e cria as rotas de API.

*   Rota de Pedido: `POST /api/submit-order`

## Desenvolvimento Local

Para rodar localmente simulando o ambiente da Cloudflare, recomenda-se instalar o `wrangler`:

```bash
npm install -g wrangler
wrangler pages dev .
```
