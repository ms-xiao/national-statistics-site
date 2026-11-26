// NationScope — the figures behind the United States in Numbers.
// Every number carries its source and year in SOURCES, and the pages
// show that source next to the figure. Values are rounded as published;
// population and GDP are Census Bureau and BEA estimates.

export const COUNTRY = {
  name: "United States",
  short: "USA",
  capital: "Washington, D.C.",
  areaSqMi: 3796480,
  flagNote: "50 states, one federal district, five inhabited territories",
};

// Year-by-year headline indicators, 2020–2024.
export const YEARS = [2020, 2021, 2022, 2023, 2024];
export const INDICATORS = {
  populationM: { 2020: 331.5, 2021: 332.6, 2022: 334.9, 2023: 335.9, 2024: 340.1 },
  gdpT: { 2020: 21.4, 2021: 23.3, 2022: 26.0, 2023: 27.7, 2024: 29.7 },
  gdpPerCapita: { 2020: 64600, 2021: 70100, 2022: 77700, 2023: 82500, 2024: 87300 },
  unemployment: { 2020: 8.1, 2021: 5.4, 2022: 3.6, 2023: 3.6, 2024: 4.0 },
  inflation: { 2020: 1.4, 2021: 7.0, 2022: 6.5, 2023: 3.4, 2024: 2.9 },
};

export const INDICATOR_META = [
  { key: "populationM", label: "Population", unit: "million", fmt: (v) => `${v.toFixed(1)}M`, source: "U.S. Census Bureau, 2024" },
  { key: "gdpT", label: "GDP", unit: "trillion dollars", fmt: (v) => `$${v.toFixed(1)}T`, source: "Bureau of Economic Analysis, 2024" },
  { key: "gdpPerCapita", label: "GDP per person", unit: "dollars", fmt: (v) => `$${v.toLocaleString("en-US")}`, source: "BEA / IMF, 2024" },
  { key: "unemployment", label: "Unemployment rate", unit: "percent", fmt: (v) => `${v.toFixed(1)}%`, source: "Bureau of Labor Statistics, 2024" },
  { key: "inflation", label: "Inflation (CPI)", unit: "percent", fmt: (v) => `${v.toFixed(1)}%`, source: "Bureau of Labor Statistics, 2024" },
];

// Age structure, 2024 (U.S. Census Bureau).
export const AGE_GROUPS = [
  { label: "0–17", share: 21.7 },
  { label: "18–34", share: 22.9 },
  { label: "35–54", share: 25.4 },
  { label: "55–64", share: 13.0 },
  { label: "65+", share: 17.0 },
];
export const MEDIAN_AGE = { value: 38.9, source: "U.S. Census Bureau, 2023" };
export const URBAN_SHARE = { value: 80.7, source: "U.S. Census Bureau, 2020 Census" };
export const DENSITY = { value: 94.8, source: "U.S. Census Bureau, 2024" };

// Largest cities, city proper, 2024 (U.S. Census Bureau estimates).
export const CITIES = [
  { name: "New York", state: "New York", popM: 8.48 },
  { name: "Los Angeles", state: "California", popM: 3.88 },
  { name: "Chicago", state: "Illinois", popM: 2.64 },
  { name: "Houston", state: "Texas", popM: 2.31 },
  { name: "Phoenix", state: "Arizona", popM: 1.65 },
  { name: "Philadelphia", state: "Pennsylvania", popM: 1.57 },
  { name: "San Antonio", state: "Texas", popM: 1.44 },
  { name: "San Diego", state: "California", popM: 1.41 },
  { name: "Dallas", state: "Texas", popM: 1.33 },
  { name: "San Jose", state: "California", popM: 1.01 },
];

// GDP by sector, 2023 (World Bank). The remainder is taxes less subsidies.
export const SECTORS = [
  { label: "Services", share: 77.4, color: "#1b3a5c" },
  { label: "Industry", share: 17.8, color: "#c49a3c" },
  { label: "Agriculture", share: 0.9, color: "#5b7d4f" },
];

// Trade in goods and services, 2024 (U.S. Census Bureau / BEA).
export const TRADE = {
  exportsT: 3.19,
  importsT: 4.11,
  goodsDeficitT: 1.21,
  source: "U.S. Census Bureau / BEA, 2024",
};

// 20 largest states: population (2024 Census estimates) and GDP (2024 BEA).
export const STATES = [
  { name: "California", popM: 39.4, gdpT: 4.1, capital: "Sacramento" },
  { name: "Texas", popM: 31.2, gdpT: 2.7, capital: "Austin" },
  { name: "Florida", popM: 23.4, gdpT: 1.66, capital: "Tallahassee" },
  { name: "New York", popM: 19.5, gdpT: 2.3, capital: "Albany" },
  { name: "Pennsylvania", popM: 13.1, gdpT: 0.95, capital: "Harrisburg" },
  { name: "Illinois", popM: 12.7, gdpT: 1.12, capital: "Springfield" },
  { name: "Ohio", popM: 11.8, gdpT: 0.85, capital: "Columbus" },
  { name: "Georgia", popM: 11.1, gdpT: 0.9, capital: "Atlanta" },
  { name: "North Carolina", popM: 11.0, gdpT: 0.79, capital: "Raleigh" },
  { name: "Michigan", popM: 10.1, gdpT: 0.66, capital: "Lansing" },
  { name: "New Jersey", popM: 9.4, gdpT: 0.8, capital: "Trenton" },
  { name: "Virginia", popM: 8.8, gdpT: 0.73, capital: "Richmond" },
  { name: "Washington", popM: 7.9, gdpT: 0.77, capital: "Olympia" },
  { name: "Arizona", popM: 7.4, gdpT: 0.54, capital: "Phoenix" },
  { name: "Massachusetts", popM: 7.1, gdpT: 0.76, capital: "Boston" },
  { name: "Tennessee", popM: 7.1, gdpT: 0.55, capital: "Nashville" },
  { name: "Indiana", popM: 6.9, gdpT: 0.52, capital: "Indianapolis" },
  { name: "Maryland", popM: 6.3, gdpT: 0.57, capital: "Annapolis" },
  { name: "Missouri", popM: 6.2, gdpT: 0.44, capital: "Jefferson City" },
  { name: "Wisconsin", popM: 5.9, gdpT: 0.43, capital: "Madison" },
];

export const HOUSEHOLD = {
  medianIncome: { value: 80610, source: "U.S. Census Bureau, 2023" },
  povertyRate: { value: 11.1, source: "U.S. Census Bureau, 2023" },
  lifeExpectancy: { value: 78.4, source: "CDC / NCHS, 2023" },
  federalDebtT: { value: 36.2, source: "U.S. Treasury, Dec 2024" },
};

// Every figure's source, for the Sources page.
export const SOURCES = [
  { figure: "Population by year, 2020–2024", source: "U.S. Census Bureau, Population Estimates Program", year: "2024" },
  { figure: "GDP and GDP per person, 2020–2024", source: "Bureau of Economic Analysis; IMF World Economic Outlook", year: "2024" },
  { figure: "Unemployment rate, 2020–2024", source: "Bureau of Labor Statistics, Current Population Survey", year: "2024" },
  { figure: "Inflation (CPI), 2020–2024", source: "Bureau of Labor Statistics, Consumer Price Index", year: "2024" },
  { figure: "Age structure and median age", source: "U.S. Census Bureau, Population Estimates Program", year: "2023–2024" },
  { figure: "Urban share and population density", source: "U.S. Census Bureau, 2020 Census and 2024 estimates", year: "2020 / 2024" },
  { figure: "Largest cities", source: "U.S. Census Bureau, Vintage 2024 city estimates", year: "2024" },
  { figure: "GDP by sector", source: "World Bank, World Development Indicators", year: "2023" },
  { figure: "Exports, imports and goods deficit", source: "U.S. Census Bureau / BEA, U.S. International Trade in Goods and Services", year: "2024" },
  { figure: "State populations", source: "U.S. Census Bureau, Vintage 2024 state estimates", year: "2024" },
  { figure: "State GDP", source: "Bureau of Economic Analysis, GDP by State", year: "2024" },
  { figure: "Median household income and poverty rate", source: "U.S. Census Bureau, Current Population Survey", year: "2023" },
  { figure: "Life expectancy at birth", source: "CDC / National Center for Health Statistics", year: "2023" },
  { figure: "Federal debt", source: "U.S. Department of the Treasury, Debt to the Penny", year: "Dec 2024" },
];

export function num(v, decimals = 1) {
  return Number(v).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
