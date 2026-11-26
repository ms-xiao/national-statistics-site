# NationScope — The United States in Numbers

[![make.fun](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/ms-xiao/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/ms-xiao/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

A national statistics site that runs in a browser from static files, with no
network request, on a desktop and on a phone. Built for the make.fun
competition **Make the best national statistics site** ($50, top 10 paid).

## What it does

- **Overview** — the headline figures for 2020–2024: population, GDP, GDP
  per person, unemployment and inflation, with a year switcher that moves
  every figure and highlights the year on the population and GDP trend
  charts. Life expectancy, median household income, poverty rate and
  federal debt beside them.
- **People** — age structure, median age, urban share, population density,
  and the 10 largest cities.
- **Economy** — GDP by sector, the unemployment and inflation trends
  2020–2024, and exports, imports and the goods trade deficit.
- **States** — the 20 largest states, sortable by name, capital,
  population or GDP, searchable by state or capital, with GDP per person
  worked out from the same two figures.
- **Sources** — every figure on the site with its source and year, plus a
  short note on method.

Every figure shows its source and year next to it. Figures are rounded as
published by the U.S. Census Bureau, the Bureau of Economic Analysis, the
Bureau of Labor Statistics, the CDC, the U.S. Treasury and the World Bank.

## Run it

```sh
node serve.ts
# open http://localhost:8080
```

## Hand it in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` copies `app/` and `screenshots/` to the output directory and
writes `dossier.json` with the kit's `vendor/makefun-frontend.ts` library.
Screenshots are real renders of the site in a browser (see `shots.json`
for the views).

## Layout

- `app/index.html` — the shell: header, navigation, footer
- `app/main.js` — router, year switcher, state-table sorting and search
- `app/views.js` — the five pages, rendered from the figures
- `app/data.js` — the figures: indicators, cities, sectors, states, sources
- `app/charts.js` — small hand-rolled SVG charts (line, bars, donut)
- `app/style.css` — the whole design, one system font stack
- `screenshots/` — 3 desktop + 1 phone render of the site
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
