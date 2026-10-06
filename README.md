# Giovanni Bolsoni — Portfólio Profissional

Landing page do meu portfólio profissional, construída com **React 18 + Vite + TypeScript**.
Possui uma experiência única de boot via terminal com um toque de "Matrix", além de uma interface gráfica moderna com GSAP, Framer Motion e suporte a temas personalizados.

## Rodando localmente

```bash
npm install
npm run dev      # servidor de desenvolvimento em http://localhost:5173
npm run build    # build de produção em dist/ (inclui verificação de tipos)
npm run preview  # pré-visualiza o build
```

## Arquitetura e Estrutura

- **Frontend:** React 18, Vite, TypeScript, CSS Modules.
- **Animações:** GSAP (ScrollTrigger), Framer Motion, Lenis (scroll suave).
- **Backend (Serverless):** Rota `api/visit.ts` rodando na Vercel (Edge Runtime) integrada ao Upstash Redis para contar visitantes (com controle de requisições por IP).
- **Dados do Portfólio:** Todo o conteúdo (textos, experiências, skills, certificações e links) está centralizado em `src/data/resume.ts`.
- **Terminal:** Toda a lógica de boot e interface de linha de comando está modularizada dentro de `src/terminal/`.

## Variáveis de Ambiente

Para o contador de visitas funcionar localmente, você precisará conectar ao banco Redis (Upstash) criando um arquivo `.env.local` na raiz:

```
UPSTASH_REDIS_REST_URL="https://sua-url-do-redis.upstash.io"
UPSTASH_REDIS_REST_TOKEN="seu-token-aqui"
```

## Deploy

O deploy está configurado e hospedado na **Vercel** (framework preset: Vite). O Vercel gerencia as variáveis de ambiente na nuvem e o build (`npm run build`).

[Acesse o portfólio ao vivo aqui](https://my-professional-portfolio-azure.vercel.app)
