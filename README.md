# Canvas Builder

A React and TypeScript drag-and-drop builder for arranging editable blocks on a canvas. The app is powered by Vite, `@dnd-kit`, Zustand, and Tailwind CSS.

## Features

- Drag blocks from the palette onto the canvas.
- Move blocks with pointer or keyboard controls.
- Edit the selected block's content, size, color, and alignment in the properties panel.
- Delete selected blocks.
- Save and load layouts with browser `localStorage`.
- Responsive three-panel layout that adapts to smaller screens.
- Input validation and size limits for persisted layouts.

Available block types:

- Text
- Button
- Container
- Image

## Requirements

- Node.js 20.19+ (or Node.js 22.12+)
- npm 10+

No database, API server, environment variables, or external services are required.

## Install and run

From the project directory, install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Vite provides hot module replacement while the development server is running. Saved layouts are kept in the current browser profile, so they are not shared between browsers or devices.

## Usage

1. Drag a block from the **Blocks** palette onto the canvas.
2. Select a block to edit it in the properties panel.
3. Drag an existing block to reposition it.
4. Select **Save** to persist the current layout in `localStorage`.
5. Select **Load** to restore the last valid saved layout.

The storage key is `react-builder-layout`. Clearing site data or changing browsers removes access to saved layouts.

## npm scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Type-check the project and create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally after `npm run build`. |
| `npm run lint` | Run ESLint across the project. |

## Production build

```bash
npm run build
npm run preview
```

The generated `dist/` directory can be deployed to any static hosting provider that supports a single-page application. No server-side routing or runtime configuration is needed.

## Project structure

```text
src/
  Components/       Main builder regions: toolbar, canvas, and properties panel
  Items/            Reusable block, palette, form, and state components
  constants/        Palette definitions and builder limits
  hooks/            Builder event and drag controller
  store/            Zustand state and layout validation/persistence
  types/            Shared TypeScript types
```

## Configuration

The main project configuration is in `vite.config.ts`, `tsconfig*.json`, and `eslint.config.js`. Builder constraints such as minimum block dimensions and maximum text length are defined in `src/constants/BuilderLimits.ts`.

There are currently no required `.env` files or environment variables.
