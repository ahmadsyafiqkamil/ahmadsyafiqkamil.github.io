# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev    # Dev server on port 3000 (auto-opens browser)
npm run build  # Production build to dist/
```

No linting or test scripts are configured.

## Architecture

Single-page portfolio with client-side view routing (no React Router). `App.tsx` manages a `currentView` state (`'home' | 'blog-post' | 'all-blogs'`) and conditionally renders entire page components.

**Page layout (home view):**
`Navigation` → `HeroSection` → `AboutSection` → `SkillsSection` → `ProjectsSection` → `BlogSection` → `ContactSection`

**Blog views:** `BlogPostPage` and `AllBlogsPage` replace the full home layout when selected.

### Contentful CMS Integration

Blog content is fetched from Contentful at runtime (not build time). The client is initialized in `src/lib/contentful.ts` and requires env vars to be set — if missing, it logs a warning and returns empty arrays.

- Content type ID: `blogPost` (case-sensitive)
- Fields: `title`, `slug`, `excerpt`, `image` (Asset), `category`, `date`, `readTime`, `tags`, `introduction` (Rich Text), `body` (Rich Text), `conclusion` (Rich Text)
- Types defined in `src/types/contentful.ts`
- Rich text rendered via `@contentful/rich-text-react-renderer` in `src/components/RichTextRenderer.tsx`
- Date formatted to `id-ID` locale (Indonesian)

### Stack

- **Vite + React 18 + TypeScript** — `@vitejs/plugin-react-swc` for fast builds
- **Styling**: TailwindCSS (dark theme, `bg-black` base), shadcn/ui components in `src/components/ui/`
- **Animations**: `motion/react` (Framer Motion)
- **Path alias**: `@/*` → `src/*`

### Environment Variables

Create `.env.local` for local development:

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
VITE_CONTENTFUL_ENVIRONMENT=master
```

For production (GitHub Pages), add these as repository secrets. Deployment triggers automatically on push to `main`/`master` via `.github/workflows/deploy.yml`.

## Key Files

- `src/App.tsx` — View routing and state
- `src/lib/contentful.ts` — Contentful client, `fetchBlogPosts()`, `fetchBlogPostBySlug()`
- `src/types/contentful.ts` — `BlogPost` and `ContentfulBlogPostEntry` types
- `src/components/RichTextRenderer.tsx` — Renders Contentful Rich Text documents
- `vite.config.ts` — Aliases, build config, dev server port

## Notes

- The app always renders in dark mode (`className="dark"` on root div)
- `vite.config.ts` contains versioned package aliases (e.g., `'vaul@1.1.2': 'vaul'`) — these are Figma Make artifacts; do not remove them
- `src/components/figma/` contains Figma-generated utilities like `ImageWithFallback`
