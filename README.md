# Raslen Dhifaoui — Portfolio

A pixel-recreated portfolio hero built with React + Vite (no UI framework).

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (default http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
 ├── assets/
 │    ├── logo.png     # navbar logo
 │    └── me.png       # hero portrait
 ├── components/
 │    ├── Navbar.jsx / Navbar.module.css
 │    └── Hero.jsx / Hero.module.css
 ├── pages/
 │    └── Home.jsx / Home.module.css
 ├── App.jsx
 ├── main.jsx
 └── index.css
```

The hero layout is composed with absolute positioning inside a relative
container, using percentage/vw-based values calibrated against the
1077x611 reference viewport so the composition scales proportionally on
larger desktop widths. Below 700px it switches to a stacked, centered
mobile layout.
