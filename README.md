# Mutts & Matches

This is a SvelteKit application built with modern web technologies.

## Prerequisites

Before running this project, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16.x or higher)
- npm (comes with Node.js) or [pnpm](https://pnpm.io/) (recommended)

## Getting Started

1. Clone the repository:
```bash
git https://github.com/jmstiles34/mutts.git
cd mutts
```

2. Install dependencies:
```bash
npm install
# or if using pnpm
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

The application will be available at `http://localhost:5173`

## Building for Production

To create a production build:
```bash
npm run build
# or
pnpm build
```

To preview the production build locally:
```bash
npm run preview
# or
pnpm preview
```

## Project Structure

```
mutts/
├── src/
│   ├── lib/
│   ├── routes/
│   └── app.html
├── static/
├── tests/
├── package.json
├── svelte.config.js
└── vite.config.js
```

## Scripts

- `dev`: Starts development server
- `build`: Creates production build
- `preview`: Preview production build
- `test`: Run tests
- `lint`: Run linter
- `format`: Format code with Prettier

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
