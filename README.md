# LoL Stats

A real-time League of Legends stat calculator and item builder built with React. Choose a champion, equip items, and watch your stats update dynamically as you theorycraft different builds.

---

## Purpose

This app lets users:
- Select any champion from the current League of Legends patch
- View base stats of that champion
- Add up to 6 items into item slots
- Instantly see how each item affects the champion’s overall stats
- Remove items from slots to revert stat changes

The goal is to give players an intuitive way to explore item builds, experiment with stats, and plan better in-game decisions.

---

## Tech Stack

- **Frontend**: React + TypeScript
- **State Management**: useState, useEffect (React hooks)
- **Styling**: TailwindCSS
- **HTTP Requests**: Axios
- **Data Source**: Riot Games Data Dragon API
- **Deployment**: [Vercel](https://vercel.com)

---

## Features

- Champion selection via Riot's official data
- Fully interactive item slots (6 max)
- Live stat calculation using mapped Riot item stats
- Responsive design for both desktop and mobile
- Search input to filter items by name
- Item de-duplication logic to prevent stacking the same item twice
- Mobile-friendly layout with responsive grid and flex logic

---

## Deployment

This app is deployed on [Vercel](https://vercel.com).  
To run locally:

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
