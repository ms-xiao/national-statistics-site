// NationScope — routing and the controls that make the pages work.
// The year switcher re-renders the overview with that year's figures;
// the States table sorts by column and searches by name or capital.
// Everything is in memory: the site is a reference work, so no
// persistence is needed and a reload starts at the latest year.

import { economyView, overviewView, populationView, regionsView, sourcesView } from "./views.js";

const state = {
  year: 2024,
  sortKey: "popM",
  sortDir: -1,
  stateQuery: "",
};

// Keep the year the reader picked across reloads, so a refresh does
// not drop them back to 2024.
const YEAR_KEY = "nationscope-year";
try {
  const savedYear = Number(sessionStorage.getItem(YEAR_KEY));
  if (savedYear >= 2020 && savedYear <= 2024) state.year = savedYear;
} catch {
  // No stored year to restore.
}

function currentRoute() {
  const hash = location.hash || "#/";
  if (hash.startsWith("#/population")) return "population";
  if (hash.startsWith("#/economy")) return "economy";
  if (hash.startsWith("#/regions")) return "regions";
  if (hash.startsWith("#/sources")) return "sources";
  return "overview";
}

function render() {
  const route = currentRoute();
  document.querySelectorAll("nav a").forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === "#/" + (route === "overview" ? "" : route));
  });
  const view = document.getElementById("view");
  if (route === "population") view.innerHTML = populationView();
  else if (route === "economy") view.innerHTML = economyView();
  else if (route === "regions") view.innerHTML = regionsView(state);
  else if (route === "sources") view.innerHTML = sourcesView();
  else view.innerHTML = overviewView(state);
  wire(view, route);
  window.scrollTo(0, 0);
}

function wire(view, route) {
  if (route === "overview") {
    view.querySelectorAll("[data-year]").forEach((b) => {
      b.addEventListener("click", () => {
        state.year = Number(b.getAttribute("data-year"));
        try {
          sessionStorage.setItem(YEAR_KEY, String(state.year));
        } catch {
          // Storage unavailable: the page still works for this visit.
        }
        render();
      });
    });
  }
  if (route === "regions") {
    const q = document.getElementById("state-q");
    if (q) {
      q.addEventListener("input", () => {
        state.stateQuery = q.value;
        const pos = q.selectionStart;
        render();
        const again = document.getElementById("state-q");
        if (again) {
          again.focus();
          again.setSelectionRange(pos, pos);
        }
      });
    }
    view.querySelectorAll("[data-sort]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-sort");
        if (state.sortKey === key) {
          state.sortDir = -state.sortDir;
        } else {
          state.sortKey = key;
          state.sortDir = key === "name" || key === "capital" ? 1 : -1;
        }
        render();
      });
    });
  }
}

window.addEventListener("hashchange", render);
render();
