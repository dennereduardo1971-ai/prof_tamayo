/* ============================================================
   Utilidades gerais
   ============================================================ */

/** Cria elemento com atributos e filhos. */
export function el(tag, attrs = {}, ...filhos) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v === null || v === undefined || v === false) continue;
    if (k === 'class') n.className = v;
    else if (k === 'html') n.innerHTML = v;
    else if (k === 'txt') n.textContent = v;
    else if (k === 'style' && typeof v === 'object') Object.assign(n.style, v);
    else if (k.startsWith('on') && typeof v === 'function') n.addEventListener(k.slice(2), v);
    else if (k === 'dataset') Object.assign(n.dataset, v);
    else n.setAttribute(k, v === true ? '' : v);
  }
  for (const f of filhos.flat()) {
    if (f === null || f === undefined || f === false) continue;
    n.appendChild(typeof f === 'string' || typeof f === 'number' ? document.createTextNode(String(f)) : f);
  }
  return n;
}

/** Converte string HTML em nó (primeiro elemento). */
export function frag(htmlStr) {
  const t = document.createElement('template');
  t.innerHTML = htmlStr.trim();
  return t.content;
}

export const $ = (sel, raiz = document) => raiz.querySelector(sel);
export const $$ = (sel, raiz = document) => Array.from(raiz.querySelectorAll(sel));

/** Escapa HTML para inserção segura. */
export function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

/** Mini-markdown: **negrito**, *destaque*, `código`, quebras. Escapa o resto. */
export function md(s) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>')
    .replace(/(^|[^*])\*([^*\n]+?)\*/g, '$1<em>$2</em>')
    .replace(/`(.+?)`/g, '<code>$1</code>')
    .replace(/\n/g, '<br>');
}

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const rand = (a, b) => a + Math.random() * (b - a);
export const randInt = (a, b) => Math.floor(rand(a, b + 1));
export const escolha = (arr) => arr[Math.floor(Math.random() * arr.length)];

/** Embaralha (Fisher-Yates), sem mutar o original. */
export function embaralhar(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ---------------- Datas (chave local YYYY-MM-DD) ---------------- */

export function hojeISO(d = new Date()) {
  const z = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
}

export function diaISOMais(iso, dias) {
  const [a, m, d] = iso.split('-').map(Number);
  const dt = new Date(a, m - 1, d);
  dt.setDate(dt.getDate() + dias);
  return hojeISO(dt);
}

export function diffDias(isoA, isoB) {
  const p = (s) => { const [a, m, d] = s.split('-').map(Number); return new Date(a, m - 1, d).getTime(); };
  return Math.round((p(isoB) - p(isoA)) / 86400000);
}

export const DIAS_SEM = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function diaSemana(iso) {
  const [a, m, d] = iso.split('-').map(Number);
  return new Date(a, m - 1, d).getDay();
}

/** Últimos n dias, do mais antigo ao mais recente. */
export function ultimosDias(n, base = hojeISO()) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) out.push(diaISOMais(base, -i));
  return out;
}

/* ---------------- Formatação ---------------- */

export function fmtTempo(seg) {
  seg = Math.max(0, Math.round(seg));
  const h = Math.floor(seg / 3600);
  const m = Math.floor((seg % 3600) / 60);
  const s = seg % 60;
  const z = (n) => String(n).padStart(2, '0');
  return h > 0 ? `${h}:${z(m)}:${z(s)}` : `${z(m)}:${z(s)}`;
}

export function fmtDuracaoLonga(seg) {
  const h = Math.floor(seg / 3600);
  const m = Math.round((seg % 3600) / 60);
  if (h > 0) return `${h}h ${m}min`;
  return `${m}min`;
}

/** 'YYYY-MM-DD' -> '26/08/2026'. Devolve '' para valor vazio. */
export function fmtDataBR(iso) {
  if (!iso) return '';
  const [a, m, d] = String(iso).split('-');
  return `${d}/${m}/${a}`;
}

/** 'YYYY-MM-DD' -> '26/08'. */
export function fmtDataCurta(iso) {
  if (!iso) return '';
  const [, m, d] = String(iso).split('-');
  return `${d}/${m}`;
}

export function fmtNum(n) {
  return new Intl.NumberFormat('pt-BR').format(Math.round(n));
}

export const pct = (a, b) => (b > 0 ? Math.round((a / b) * 100) : 0);

/* ---------------- Diversos ---------------- */

export function debounce(fn, ms = 200) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

export function vibrar(padrao) {
  try { if (navigator.vibrate) navigator.vibrate(padrao); } catch { /* ignora */ }
}

/** Anima um número de a até b chamando cb. */
export function contarAte(de, ate, ms, cb) {
  if (de === ate) { cb(ate); return; }
  const t0 = performance.now();
  const passo = (t) => {
    const p = clamp((t - t0) / ms, 0, 1);
    const e = 1 - Math.pow(1 - p, 3);
    cb(Math.round(de + (ate - de) * e));
    if (p < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

/** Onda de toque nos botões. */
export function ligarOndas(raiz) {
  raiz.addEventListener('pointerdown', (ev) => {
    const b = ev.target.closest('.btn');
    if (!b) return;
    const r = b.getBoundingClientRect();
    const d = Math.max(r.width, r.height);
    const o = el('span', { class: 'btn__onda' });
    o.style.width = o.style.height = `${d}px`;
    o.style.left = `${ev.clientX - r.left - d / 2}px`;
    o.style.top = `${ev.clientY - r.top - d / 2}px`;
    b.appendChild(o);
    setTimeout(() => o.remove(), 620);
  });
}
