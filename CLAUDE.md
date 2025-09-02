# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React TypeScript website for Sage Networks, built with Create React App. The project is currently named "sagenet-redesign" and appears to be a corporate website showcasing solutions for different business personas (Marketing, IT).

## Development Commands

- `npm start` - Start development server (runs on http://localhost:3000)
- `npm test` - Run tests in interactive watch mode
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (one-way operation)

## Architecture & Structure

### Technology Stack
- **Framework**: React 18 with TypeScript
- **Styling**: styled-components with a custom theme system
- **Routing**: React Router v6
- **Animation**: Framer Motion
- **Build Tool**: Create React App (react-scripts)

### Key Architectural Patterns

**Theme System**: Centralized theme in `src/styles/theme.ts` with comprehensive design tokens:
- Color palette (primary navy, secondary orange, accent green)
- Typography scale using Inter font
- Spacing system, breakpoints, shadows
- Theme is provided via styled-components ThemeProvider

**Component Structure**:
- `src/components/common/` - Reusable components (Header, Footer, Button, Layout)
- `src/components/sections/` - Page sections (Hero, CustomerLogos, ROICalculator, etc.)
- `src/pages/` - Route-level components (Home, Marketing, IT, Contact)

**Routing Structure**: App.tsx contains main routing with dedicated page components. Currently has routes for:
- `/` - Homepage
- `/marketing` - Marketing Solutions
- `/it` - IT Solutions

**Styling Approach**: Uses styled-components with TypeScript. Global styles are applied via `src/styles/GlobalStyles.ts`. The theme system provides consistent design tokens across components.

## Development Notes

- The project uses TypeScript with strict typing via styled-components type definitions
- Components follow a section-based architecture where pages compose multiple section components
- There are some duplicate/backup files (indicated by "copy" and "OLD" suffixes) that may need cleanup
- The main branch is `main`, currently working on `master` branch
- No custom build tools or linting commands beyond standard Create React App setup