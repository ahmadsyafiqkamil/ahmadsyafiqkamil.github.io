
  # Web Developer Portfolio

  This is a code bundle for Web Developer Portfolio. The original project is available at https://www.figma.com/design/yEk1JWEGhXM9xPQm8YfQMc/Web-Developer-Portfolio.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Blog Setup

  This portfolio includes a blog feature powered by Contentful CMS. To enable the blog:

  1. **Create a Contentful account** (free tier available at https://www.contentful.com)
  2. **Create a new space** in Contentful
  3. **Create content models**:
     - `blogPost` content type with fields:
       - `title` (Short text)
       - `slug` (Short text, unique)
       - `excerpt` (Short text)
       - `content` (Long text or Rich text)
       - `publishedDate` (Date & time)
       - `thumbnail` (Media - Image)
       - `categories` (Reference - many, to category)
       - `tags` (Short text, list)
       - `author` (Reference - one, optional)
     - `category` content type with fields:
       - `name` (Short text)
       - `slug` (Short text, unique)
       - `description` (Short text, optional)
  4. **Get your API credentials** from Contentful:
     - Space ID
     - Content Delivery API access token
  5. **Create `.env.local` file** in the root directory:
     ```
     VITE_CONTENTFUL_SPACE_ID=your_space_id_here
     VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
     VITE_CONTENTFUL_ENVIRONMENT=master
     ```
  6. **Add `.env.local` to `.gitignore`** (if not already there)

  **Note**: The blog will work without Contentful setup, but will show an empty state. You can also modify `src/lib/cms.ts` to use a different CMS or file-based content system.

  ## Deployment

  The site is configured for GitHub Pages deployment. The build process is automated via GitHub Actions (see `.github/workflows/deploy.yml`).

  - Blog routes use HashRouter (`#/blog`) for compatibility with GitHub Pages static hosting
  - Build output goes to `dist/` directory
  