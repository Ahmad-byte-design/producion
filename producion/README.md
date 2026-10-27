# producion

A feature-first React starter: routing, server state, small stores, schema-validated services, and a Tailwind v4 token layer.

## Stack

- React 19 + TypeScript
- Vite 8
- React Router 7 (data router)
- TanStack Query 5
- Zustand 5
- Tailwind CSS 4
- Zod 4

## Scripts

```bash
npm run dev      # start dev server
npm run build    # type-check + production build
npm run preview  # preview the production build
npm run lint     # run oxlint
```

## Structure

```
src/
├── app/
│   └── router.tsx              # routes that assemble feature pages
│
├── features/
│   └── feature-1/              # one complete vertical slice
│       ├── components/         # feature-only UI
│       ├── hooks/              # query/mutation hooks
│       ├── mock/               # fixture data
│       ├── pages/              # route-level page
│       ├── schemas/            # Zod schemas + inferred types
│       ├── services/           # data access (mock today, API later)
│       ├── store/              # feature-scoped Zustand stores
│       ├── types/              # public types for the feature
│       ├── utils/              # pure helpers
│       └── index.ts            # the feature's public API
│
├── global/                     # shared across every feature
│   ├── components/             # Logo, ThemeToggle, ...
│   ├── constants/              # app name, route paths
│   ├── hooks/                  # useDocumentTitle
│   ├── layouts/                # RootLayout shell
│   ├── lib/                    # QueryClient instance
│   ├── mock/                   # shared mock helpers (delay)
│   ├── pages/                  # About, NotFound
│   ├── schemas/                # shared API schemas
│   ├── services/               # typed fetch wrapper
│   ├── store/                  # theme (global Zustand)
│   ├── types/                  # shared types
│   └── utils/                  # cn, formatters
│
├── main.tsx                    # providers + mount
└── index.css                   # Tailwind entry + design tokens
```

## Conventions

**Features own their slice.** Everything a feature needs lives inside its folder. It may import from `global`, but never from another feature. To start the next feature, copy `features/feature-1` and rename it.

**The global layer is earned.** Only move something to `global` when a second feature genuinely needs it. Do not pre-emptively share.

**Each folder has a barrel.** Import from the folder (`../components`) or the feature root (`@/features/feature-1`), not from deep file paths outside the folder.

**Data flow:** page → hook (`useQuery`) → service → mock or API → Zod parse. Components receive plain data, never the query object.

**Server state vs client state.** TanStack Query handles anything that came from a server. Zustand handles small UI state such as the active filter or theme.

## Path aliases

`@/` maps to `src/` in both TypeScript (`tsconfig.app.json`) and Vite (`vite.config.ts`).

## Swapping the mock for an API

`src/features/feature-1/services/project.service.ts` returns fixture data today. Replace the body with:

```ts
return http.get<Project[]>('/projects')
```

`http` is the typed wrapper in `src/global/services/http.ts`, and reads `VITE_API_URL` (see `.env.example`).

## Design tokens

Colors and fonts are defined once in `src/index.css` under `:root`, `.dark`, and `@theme inline`, which exposes utilities like `bg-canvas`, `text-ink`, `border-rule`, and `text-accent`. The dark theme is stored in `useThemeStore`; an inline script in `index.html` applies it before paint.
