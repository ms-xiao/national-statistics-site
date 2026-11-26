// NationScope — small hand-rolled SVG charts. No library, no network:
// every chart is a string of SVG built from the figures in data.js.

export function lineChart(points, opts = {}) {
  const w = opts.width || 560;
  const h = opts.height || 220;
  const padL = 46;
  const padR = 14;
  const padT = 14;
  const padB = 30;
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const lo = min - (max - min) * 0.15;
  const hi = max + (max - min) * 0.15;
  const xs = points.map((_, i) => padL + (i * (w - padL - padR)) / (points.length - 1 || 1));
  const ys = values.map((v) => padT + (1 - (v - lo) / (hi - lo)) * (h - padT - padB));
  const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${xs[i].toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const area = `${line} L${xs[xs.length - 1].toFixed(1)},${h - padB} L${xs[0].toFixed(1)},${h - padB} Z`;
  const dots = points
    .map(
      (p, i) =>
        `<circle cx="${xs[i].toFixed(1)}" cy="${ys[i].toFixed(1)}" r="${p.highlight ? 5 : 3.5}" fill="${p.highlight ? "#c49a3c" : "#1b3a5c"}" stroke="#fff" stroke-width="1.5" />` +
        `<text x="${xs[i].toFixed(1)}" y="${(ys[i] - 10).toFixed(1)}" text-anchor="middle" font-size="11" fill="#334155">${opts.fmt ? opts.fmt(p.value) : p.value}</text>`,
    )
    .join("");
  const labels = points
    .map((p, i) => `<text x="${xs[i].toFixed(1)}" y="${h - 8}" text-anchor="middle" font-size="11" fill="#64748b">${p.label}</text>`)
    .join("");
  const grid = [0.25, 0.5, 0.75]
    .map((f) => `<line x1="${padL}" x2="${w - padR}" y1="${(padT + f * (h - padT - padB)).toFixed(1)}" y2="${(padT + f * (h - padT - padB)).toFixed(1)}" stroke="#e2e8f0" stroke-width="1" />`)
    .join("");
  return `<svg viewBox="0 0 ${w} ${h}" width="100%" role="img" aria-label="${opts.label || "Line chart"}">${grid}<path d="${area}" fill="#dbe4ef" opacity="0.5" /><path d="${line}" fill="none" stroke="#1b3a5c" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" />${dots}${labels}</svg>`;
}

export function hBars(rows, opts = {}) {
  const max = Math.max(...rows.map((r) => r.value));
  return rows
    .map(
      (r) => `<div class="hbar-row"><span class="hbar-label">${r.label}</span><div class="hbar-track"><div class="hbar-fill" style="width:${((r.value / max) * 100).toFixed(1)}%;background:${r.color || "#1b3a5c"}"></div></div><span class="hbar-value">${opts.fmt ? opts.fmt(r.value) : r.value}</span></div>`,
    )
    .join("");
}

export function donut(parts, opts = {}) {
  const total = parts.reduce((s, p) => s + p.share, 0);
  const size = 200;
  const r = 78;
  const cx = size / 2;
  const cy = size / 2;
  let angle = -90;
  const arcs = parts.map((p) => {
    const frac = p.share / total;
    const a0 = angle;
    const a1 = angle + frac * 360;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const rad = (deg) => (deg * Math.PI) / 180;
    const x0 = cx + r * Math.cos(rad(a0));
    const y0 = cy + r * Math.sin(rad(a0));
    const x1 = cx + r * Math.cos(rad(a1));
    const y1 = cy + r * Math.sin(rad(a1));
    return `<path d="M ${cx} ${cy} L ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${p.color}" stroke="#f7f5ef" stroke-width="2" />`;
  });
  const legend = parts
    .map(
      (p) =>
        `<li><span class="swatch" style="background:${p.color}"></span>${p.label}<b>${p.share.toFixed(1)}%</b></li>`,
    )
    .join("");
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" width="200" height="200" role="img" aria-label="${opts.label || "Donut chart"}">${arcs.join("")}<circle cx="${cx}" cy="${cy}" r="46" fill="#fff" /><text x="${cx}" y="${cy - 2}" text-anchor="middle" font-size="15" font-weight="700" fill="#16233d">${opts.center || ""}</text><text x="${cx}" y="${cy + 16}" text-anchor="middle" font-size="11" fill="#64748b">${opts.centerSub || ""}</text></svg><ul class="legend">${legend}</ul></div>`;
}
