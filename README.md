# Akanksha Raina — Portfolio

Personal portfolio of Akanksha Raina, full-stack engineer. Live at **[akanksharaina.vercel.app](https://akanksharaina.vercel.app/)**.

A single-page site with a 3D landing, an experience timeline, an interactive project explorer, and research and certifications. All content lives in typed data files, so most updates never touch a component.

## What's on the page

| Section | What it does |
| --- | --- |
| **Landing** | Full-screen three.js scene of floating, toon-shaded dev objects behind a mixed-font "AKANKSHA RAINA". It's sticky, and the rest of the site slides up over it on a curved panel. |
| **About** | Role statement, what I'm working on now, email/resume buttons, and social links. |
| **Experience** | A vine that draws itself as you scroll. Each role is a flip card: company and stack on the front, what I did on the back. |
| **Projects** | Explorer with a live-preview browser frame plus Overview, Architecture and Key decisions tabs. On mobile it becomes an accordion. |
| **Skills** | Skills grouped by domain, strongest group first. |
| **Research** | The IJIRT publication and course certificates, linking to the certificate images. |
| **Contact** | Email (with click-to-copy), resume, GitHub, LinkedIn and X. |

There's also a first-load loader, a light/dark theme toggle, and a navbar that stays hidden over the landing and slides in once you scroll past it.

## Stack

- **Next.js 14** (App Router) with **React 18** and **TypeScript**
- **Tailwind CSS v4**, with theme colours defined as CSS variables in `src/app/globals.css`
- **three.js** + **@react-three/fiber** for the landing scene
- **framer-motion** for scroll and flip animations
- **lucide-react** icons
- Fonts via `next/font`: Fraunces (headings), Inter (body), JetBrains Mono (labels), plus display faces for the landing name

## Getting started

Requires Node.js 18.17 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

Other commands:

```bash
npm run build      # production build
npm start          # serve the production build
npx tsc --noEmit   # type-check
```

The dev server writes to `.next-dev/` and production builds write to `.next/` (see `next.config.js`). That means you can run a build while `npm run dev` is open without crashing the dev server.

## Editing content

Almost everything is data in `src/data/`:

| File | Contents |
| --- | --- |
| `site.ts` | Name, email, resume path, social links, and the nav sections |
| `experience.ts` | Internships, newest first: dates, role, location, bullets, tech, website, certificate |
| `projects.ts` | Projects: tagline, problem, outcome, tech row, architecture layers, key decisions, links, preview URL |
| `skills.ts` | Skill groups, strongest first |
| `credentials.ts` | Publications and certifications |

Guidelines:

- **Projects:** one line each for problem and outcome, at most two key decisions. Keep `builtWith` to a single row, and leave out anything another item implies (Express implies Node.js, Next.js implies React).
- **Optional sections:** a project with no `architecture` or `decisions` simply hides that tab.
- **Placeholders:** any string starting with `TODO` shows as an amber badge in `npm run dev` and is hidden in production builds (`src/lib/todo.ts`). Unfinished copy never ships.

### Images and files

Put files in `public/` and reference them from the data files by path, for example `certificate: '/naval.jpg'`. The resume is served from `public/resume.pdf`.

## Project structure

```
src/
  app/
    layout.tsx          fonts, theme script, loader, background, navbar
    page.tsx            landing + curved content panel
    globals.css         theme tokens (light/dark), animations
  components/
    landing/            3D landing (Landing, LandingScene, palettes)
    Hero.tsx            About section
    Experience.tsx      vine timeline + flip cards
    Projects.tsx        project explorer
    Skills.tsx, Research.tsx, Contact.tsx
    Navbar.tsx, Loader.tsx, PopBackground.tsx, ThemeProvider.tsx, ...
  data/                 all site content (see above)
  lib/todo.ts           TODO-placeholder helpers
public/                 resume, certificate and publication images
```

## Theming

Colours are CSS variables on `:root` (light) and `.dark` in `globals.css`, exposed to Tailwind through `@theme`. Utilities like `bg-accent/10` and `text-muted` follow the active theme, and `dark:` variants follow the toggle, not the OS setting. The landing scene takes its colours from `src/components/landing/palettes.ts`.

## Performance and accessibility

- three.js is loaded only on the client, after first paint, so it stays out of the initial bundle. The scene stops rendering once it's covered or the tab is hidden, and uses fewer objects at a lower resolution on phones.
- The saved theme is applied before first paint, so the page never flashes the wrong theme.
- **Reduced motion:** animations, the vine drawing and smooth scrolling are disabled, and the 3D scene renders a single still frame.
- **Keyboard support:** the project list uses arrow keys, Home and End. Experience cards flip with Enter or Space. The hidden navbar reappears when focused.

## Deployment

Deployed on Vercel as a standard Next.js app. No environment variables are required.
