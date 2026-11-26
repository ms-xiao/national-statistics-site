// NationScope — the five pages. Every figure is drawn from data.js and
// carries its source and year next to it, as the competition requires.

import { AGE_GROUPS, CITIES, COUNTRY, DENSITY, HOUSEHOLD, INDICATORS, INDICATOR_META, MEDIAN_AGE, SECTORS, SOURCES, STATES, TRADE, URBAN_SHARE, YEARS, num } from "./data.js";
import { donut, hBars, lineChart } from "./charts.js";

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export function yearSwitcher(state) {
  return `<div class="year-switch" role="group" aria-label="Choose a year">${YEARS.map((y) => `<button type="button" data-year="${y}" class="${y === state.year ? "on" : ""}">${y}</button>`).join("")}</div>`;
}

export function overviewView(state) {
  const y = state.year;
  const cards = INDICATOR_META.map((m) => {
    const v = INDICATORS[m.key][y];
    return `<article class="stat"><span class="stat-label">${m.label}</span><span class="stat-value">${m.fmt(v)}</span><span class="stat-source">${m.source}</span></article>`;
  }).join("");
  const popPoints = YEARS.map((yy) => ({ label: String(yy), value: INDICATORS.populationM[yy], highlight: yy === y }));
  const gdpPoints = YEARS.map((yy) => ({ label: String(yy), value: INDICATORS.gdpT[yy], highlight: yy === y }));
  return `
  ${yearSwitcher(state)}
  <h1>The United States in numbers</h1>
  <p class="lede">Population, economy, places and people — the headline figures for ${y}, each with its source. Switch years above to see how the country moved.</p>
  <div class="stats">${cards}</div>
  <div class="grid-2">
    <section class="panel"><h2>Population, 2020–${y}</h2>
      ${lineChart(popPoints, { label: "Population trend", fmt: (v) => `${v.toFixed(1)}M` })}
      <p class="note">Millions of people. Source: U.S. Census Bureau, Population Estimates Program.</p></section>
    <section class="panel"><h2>GDP, 2020–${y}</h2>
      ${lineChart(gdpPoints, { label: "GDP trend", fmt: (v) => `$${v.toFixed(1)}T` })}
      <p class="note">Trillion dollars, current prices. Source: Bureau of Economic Analysis.</p></section>
  </div>
  <div class="stats">
    <article class="stat"><span class="stat-label">Life expectancy</span><span class="stat-value">${HOUSEHOLD.lifeExpectancy.value} years</span><span class="stat-source">${HOUSEHOLD.lifeExpectancy.source}</span></article>
    <article class="stat"><span class="stat-label">Median household income</span><span class="stat-value">$${num(HOUSEHOLD.medianIncome.value, 0)}</span><span class="stat-source">${HOUSEHOLD.medianIncome.source}</span></article>
    <article class="stat"><span class="stat-label">Poverty rate</span><span class="stat-value">${HOUSEHOLD.povertyRate.value}%</span><span class="stat-source">${HOUSEHOLD.povertyRate.source}</span></article>
    <article class="stat"><span class="stat-label">Federal debt</span><span class="stat-value">$${HOUSEHOLD.federalDebtT.value}T</span><span class="stat-source">${HOUSEHOLD.federalDebtT.source}</span></article>
  </div>
  <p class="note">Country: ${esc(COUNTRY.name)} · capital ${esc(COUNTRY.capital)} · ${num(COUNTRY.areaSqMi, 0)} sq mi · ${esc(COUNTRY.flagNote)}.</p>`;
}

export function populationView() {
  const rows = CITIES.map(
    (c, i) => `<tr><td>${i + 1}</td><td>${esc(c.name)}</td><td>${esc(c.state)}</td><td style="text-align:right">${c.popM.toFixed(2)}M</td></tr>`,
  ).join("");
  return `
  <h1>People</h1>
  <p class="lede">Who lives in the United States, how old they are, and where they cluster.</p>
  <div class="stats">
    <article class="stat"><span class="stat-label">Median age</span><span class="stat-value">${MEDIAN_AGE.value} years</span><span class="stat-source">${MEDIAN_AGE.source}</span></article>
    <article class="stat"><span class="stat-label">Urban population</span><span class="stat-value">${URBAN_SHARE.value}%</span><span class="stat-source">${URBAN_SHARE.source}</span></article>
    <article class="stat"><span class="stat-label">Population density</span><span class="stat-value">${DENSITY.value} / sq mi</span><span class="stat-source">${DENSITY.source}</span></article>
  </div>
  <div class="grid-2">
    <section class="panel"><h2>Age structure, 2024</h2>
      ${hBars(AGE_GROUPS.map((g) => ({ label: g.label, value: g.share, color: "#1b3a5c" })), { fmt: (v) => `${v.toFixed(1)}%` })}
      <p class="note">Share of the population in each age band. Source: U.S. Census Bureau, 2024.</p></section>
    <section class="panel"><h2>Largest cities, 2024</h2>
      <table class="tbl"><thead><tr><th>#</th><th>City</th><th>State</th><th style="text-align:right">Population</th></tr></thead><tbody>${rows}</tbody></table>
      <p class="note">City proper, not metro area. Source: U.S. Census Bureau, Vintage 2024 estimates.</p></section>
  </div>`;
}

export function economyView() {
  const unemp = YEARS.map((yy) => ({ label: String(yy), value: INDICATORS.unemployment[yy] }));
  const infl = YEARS.map((yy) => ({ label: String(yy), value: INDICATORS.inflation[yy] }));
  return `
  <h1>Economy</h1>
  <p class="lede">What the country makes, what it trades, and how work and prices moved from 2020 to 2024.</p>
  <div class="grid-2">
    <section class="panel"><h2>GDP by sector, 2023</h2>
      ${donut(SECTORS, { label: "GDP by sector", center: "100%", centerSub: "of GDP" })}
      <p class="note">The shares add to 96.1%; the remainder is taxes less subsidies on products. Source: World Bank, 2023.</p></section>
    <section class="panel"><h2>Unemployment rate, 2020–2024</h2>
      ${lineChart(unemp, { label: "Unemployment trend", fmt: (v) => `${v.toFixed(1)}%` })}
      <p class="note">Annual average. The 2020 spike is the pandemic recession. Source: Bureau of Labor Statistics, 2024.</p></section>
  </div>
  <div class="stats">
    <article class="stat"><span class="stat-label">Exports, 2024</span><span class="stat-value">$${TRADE.exportsT.toFixed(2)}T</span><span class="stat-source">${TRADE.source}</span></article>
    <article class="stat"><span class="stat-label">Imports, 2024</span><span class="stat-value">$${TRADE.importsT.toFixed(2)}T</span><span class="stat-source">${TRADE.source}</span></article>
    <article class="stat"><span class="stat-label">Goods trade deficit, 2024</span><span class="stat-value">$${TRADE.goodsDeficitT.toFixed(2)}T</span><span class="stat-source">${TRADE.source}</span></article>
  </div>
  <section class="panel"><h2>Inflation (CPI), 2020–2024</h2>
    ${lineChart(infl, { label: "Inflation trend", fmt: (v) => `${v.toFixed(1)}%` })}
    <p class="note">Annual change in the Consumer Price Index. The 2021–2022 surge is the post-pandemic price rise. Source: Bureau of Labor Statistics, 2024.</p></section>`;
}

export function regionsView(state) {
  const q = state.stateQuery.toLowerCase();
  let rows = STATES.filter((s) => s.name.toLowerCase().includes(q) || s.capital.toLowerCase().includes(q));
  const dir = state.sortDir;
  const key = state.sortKey;
  rows = [...rows].sort((a, b) => {
    if (key === "name") return dir * a.name.localeCompare(b.name);
    return dir * (a[key] - b[key]);
  });
  const arrow = (k) => (state.sortKey === k ? (state.sortDir === 1 ? " ▲" : " ▼") : "");
  const body = rows
    .map(
      (s) => `<tr><td>${esc(s.name)}</td><td>${esc(s.capital)}</td><td style="text-align:right">${s.popM.toFixed(1)}M</td><td style="text-align:right">$${s.gdpT.toFixed(2)}T</td><td style="text-align:right">$${Math.round((s.gdpT * 1e12) / (s.popM * 1e6)).toLocaleString("en-US")}</td></tr>`,
    )
    .join("");
  return `
  <h1>States</h1>
  <p class="lede">The 20 largest states by population — click a column to sort, or search by state or capital. GDP per person is worked out from the same two figures.</p>
  <div class="tx-tools"><input id="state-q" type="search" placeholder="Search states or capitals…" value="${esc(state.stateQuery)}" aria-label="Search states"></div>
  <section class="panel"><table class="tbl"><thead><tr>
    <th><button class="sort" data-sort="name">State${arrow("name")}</button></th>
    <th><button class="sort" data-sort="capital">Capital${arrow("capital")}</button></th>
    <th style="text-align:right"><button class="sort" data-sort="popM">Population${arrow("popM")}</button></th>
    <th style="text-align:right"><button class="sort" data-sort="gdpT">GDP${arrow("gdpT")}</button></th>
    <th style="text-align:right">GDP per person</th>
  </tr></thead><tbody>${body || `<tr><td colspan="5">No states match “${esc(state.stateQuery)}”.</td></tr>`}</tbody></table>
  <p class="note">${rows.length} of 20 states shown. Population: U.S. Census Bureau, 2024. GDP: Bureau of Economic Analysis, 2024.</p></section>`;
}

export function sourcesView() {
  const rows = SOURCES.map((s) => `<tr><td>${esc(s.figure)}</td><td>${esc(s.source)}</td><td>${esc(s.year)}</td></tr>`).join("");
  return `
  <h1>Sources</h1>
  <p class="lede">Every figure on this site, with where it came from and which year it describes. Figures are rounded as published; state GDP per person is calculated from the two published figures on the States page.</p>
  <section class="panel"><table class="tbl"><thead><tr><th>Figure</th><th>Source</th><th>Year</th></tr></thead><tbody>${rows}</tbody></table>
  <p class="note">Method: population and GDP figures are official estimates, not counts. Where a series was revised after publication, the latest vintage is shown. No figure on this site is estimated by the site itself except GDP per person per state, which divides published state GDP by published state population.</p></section>`;
}
