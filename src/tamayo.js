/* ============================================================
   Professora Tamayo — retrato vetorial original
   Estética inspirada no universo de Demon Slayer (Doutora Tamayo):
   noite índigo, kimono ameixa, ornamento de cerejeira, olhar firme.
   Ilustração autoral em SVG, animada (respiração, piscar, cabelo).
   ============================================================ */

import { el, escolha } from './util.js';

/* -------- Expressões: sobrancelhas, olhos e boca -------- */

const EXPR = {
  neutra: {
    olhos: `
      <path d="M68 93c4-8 20-8 25 0-5 8-21 8-25 0z" fill="#fff6fb"/>
      <path d="M105 93c5-8 21-8 25 0-4 8-20 8-25 0z" fill="#fff6fb"/>
      <circle cx="80.5" cy="93" r="5.4" fill="#7a2247"/><circle cx="117.5" cy="93" r="5.4" fill="#7a2247"/>
      <circle cx="80.5" cy="93" r="2.3" fill="#2a0a1c"/><circle cx="117.5" cy="93" r="2.3" fill="#2a0a1c"/>
      <circle cx="82.6" cy="90.6" r="1.7" fill="#fff" opacity=".9"/><circle cx="119.6" cy="90.6" r="1.7" fill="#fff" opacity=".9"/>`,
    cenhos: `<path d="M67 81c8-4 18-4 25-1" stroke="#2b1225" stroke-width="2.6" fill="none" stroke-linecap="round"/>
             <path d="M133 81c-8-4-18-4-25-1" stroke="#2b1225" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    boca: `<path d="M92 118c4 3 12 3 16 0" stroke="#a83a5e" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  },
  sorriso: {
    olhos: `
      <path d="M68 94c4-9 20-9 25 0-5 8-21 8-25 0z" fill="#fff6fb"/>
      <path d="M105 94c5-9 21-9 25 0-4 8-20 8-25 0z" fill="#fff6fb"/>
      <circle cx="80.5" cy="93.5" r="5.6" fill="#8c2b55"/><circle cx="117.5" cy="93.5" r="5.6" fill="#8c2b55"/>
      <circle cx="80.5" cy="93.5" r="2.4" fill="#2a0a1c"/><circle cx="117.5" cy="93.5" r="2.4" fill="#2a0a1c"/>
      <circle cx="82.8" cy="91" r="1.9" fill="#fff"/><circle cx="119.8" cy="91" r="1.9" fill="#fff"/>`,
    cenhos: `<path d="M67 79c8-5 18-5 25-2" stroke="#2b1225" stroke-width="2.6" fill="none" stroke-linecap="round"/>
             <path d="M133 79c-8-5-18-5-25-2" stroke="#2b1225" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    boca: `<path d="M89 116c6 7 16 7 22 0" stroke="#a83a5e" stroke-width="2.6" fill="none" stroke-linecap="round"/>
           <path d="M91 117c5 5 13 5 18 0z" fill="#c85878" opacity=".55"/>`,
    blush: true,
  },
  orgulhosa: {
    olhos: `
      <path d="M68 96c5-11 20-11 25 0" stroke="#2b1225" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M105 96c5-11 20-11 25 0" stroke="#2b1225" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    cenhos: `<path d="M67 78c8-5 18-5 25-2" stroke="#2b1225" stroke-width="2.6" fill="none" stroke-linecap="round"/>
             <path d="M133 78c-8-5-18-5-25-2" stroke="#2b1225" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    boca: `<path d="M89 115c6 8 16 8 22 0" stroke="#a83a5e" stroke-width="2.7" fill="none" stroke-linecap="round"/>
           <path d="M91 116c5 6 13 6 18 0z" fill="#d0607f" opacity=".6"/>`,
    blush: true,
  },
  seria: {
    olhos: `
      <path d="M68 93c5-6 20-6 25 0-5 7-20 7-25 0z" fill="#fff6fb"/>
      <path d="M105 93c5-6 20-6 25 0-5 7-20 7-25 0z" fill="#fff6fb"/>
      <circle cx="80.5" cy="93" r="5" fill="#6d1c3e"/><circle cx="117.5" cy="93" r="5" fill="#6d1c3e"/>
      <circle cx="80.5" cy="93" r="2.1" fill="#1c0512"/><circle cx="117.5" cy="93" r="2.1" fill="#1c0512"/>
      <path d="M67 88h27" stroke="#2b1225" stroke-width="2.2" stroke-linecap="round"/>
      <path d="M106 88h27" stroke="#2b1225" stroke-width="2.2" stroke-linecap="round"/>`,
    cenhos: `<path d="M66 79c9-1 18 1 25 4" stroke="#2b1225" stroke-width="2.8" fill="none" stroke-linecap="round"/>
             <path d="M134 79c-9-1-18 1-25 4" stroke="#2b1225" stroke-width="2.8" fill="none" stroke-linecap="round"/>`,
    boca: `<path d="M92 118h16" stroke="#a83a5e" stroke-width="2.4" fill="none" stroke-linecap="round"/>`,
  },
  firme: {
    olhos: `
      <path d="M68 93c5-7 20-7 25 0-5 7-20 7-25 0z" fill="#fff2f8"/>
      <path d="M105 93c5-7 20-7 25 0-5 7-20 7-25 0z" fill="#fff2f8"/>
      <circle cx="81" cy="93" r="5.2" fill="#a3123f"/><circle cx="118" cy="93" r="5.2" fill="#a3123f"/>
      <circle cx="81" cy="93" r="2" fill="#1c0512"/><circle cx="118" cy="93" r="2" fill="#1c0512"/>
      <circle cx="83" cy="91" r="1.4" fill="#fff" opacity=".85"/><circle cx="120" cy="91" r="1.4" fill="#fff" opacity=".85"/>`,
    cenhos: `<path d="M65 77c9 1 18 4 25 8" stroke="#2b1225" stroke-width="3" fill="none" stroke-linecap="round"/>
             <path d="M135 77c-9 1-18 4-25 8" stroke="#2b1225" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    boca: `<path d="M91 119c5-3 13-3 18 0" stroke="#a83a5e" stroke-width="2.5" fill="none" stroke-linecap="round"/>`,
  },
  preocupada: {
    olhos: `
      <path d="M68 94c4-8 20-8 25 0-5 8-21 8-25 0z" fill="#fff6fb"/>
      <path d="M105 94c5-8 21-8 25 0-4 8-20 8-25 0z" fill="#fff6fb"/>
      <circle cx="80.5" cy="94.5" r="5.6" fill="#7a2247"/><circle cx="117.5" cy="94.5" r="5.6" fill="#7a2247"/>
      <circle cx="80.5" cy="94.5" r="2.3" fill="#2a0a1c"/><circle cx="117.5" cy="94.5" r="2.3" fill="#2a0a1c"/>
      <circle cx="82.7" cy="92" r="1.8" fill="#fff"/><circle cx="119.7" cy="92" r="1.8" fill="#fff"/>`,
    cenhos: `<path d="M67 84c8-6 17-8 25-6" stroke="#2b1225" stroke-width="2.6" fill="none" stroke-linecap="round"/>
             <path d="M133 84c-8-6-17-8-25-6" stroke="#2b1225" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    boca: `<path d="M92 119c3-3 5 3 8 0s5-3 8 0" stroke="#a83a5e" stroke-width="2.3" fill="none" stroke-linecap="round"/>`,
  },
  pensativa: {
    olhos: `
      <path d="M68 93c4-8 20-8 25 0-5 8-21 8-25 0z" fill="#fff6fb"/>
      <path d="M105 93c5-8 21-8 25 0-4 8-20 8-25 0z" fill="#fff6fb"/>
      <circle cx="84" cy="92" r="5.3" fill="#7a2247"/><circle cx="121" cy="92" r="5.3" fill="#7a2247"/>
      <circle cx="84" cy="92" r="2.2" fill="#2a0a1c"/><circle cx="121" cy="92" r="2.2" fill="#2a0a1c"/>
      <circle cx="86" cy="90" r="1.6" fill="#fff" opacity=".9"/><circle cx="123" cy="90" r="1.6" fill="#fff" opacity=".9"/>`,
    cenhos: `<path d="M67 80c8-3 18-5 25-1" stroke="#2b1225" stroke-width="2.6" fill="none" stroke-linecap="round"/>
             <path d="M133 82c-8-5-18-5-25-2" stroke="#2b1225" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
    boca: `<path d="M93 118c4 1 10 1 14-1" stroke="#a83a5e" stroke-width="2.3" fill="none" stroke-linecap="round"/>`,
  },
};

/**
 * Gera o retrato da Tamayo.
 * @param {string} expr  neutra | sorriso | orgulhosa | seria | firme | preocupada | pensativa
 * @param {{aura?:boolean, id?:string}} opts
 */
export function retratoTamayo(expr = 'neutra', opts = {}) {
  const e = EXPR[expr] || EXPR.neutra;
  const uid = opts.id || `tm${Math.random().toString(36).slice(2, 7)}`;
  const aura = opts.aura !== false;

  const svg = `
<svg viewBox="0 0 200 268" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Professora Tamayo">
  <defs>
    <linearGradient id="${uid}pele" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#fdeef2"/><stop offset="100%" stop-color="#f2d5dd"/>
    </linearGradient>
    <linearGradient id="${uid}cabelo" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#3a1f3f"/><stop offset="45%" stop-color="#1e0e26"/><stop offset="100%" stop-color="#2c1433"/>
    </linearGradient>
    <linearGradient id="${uid}kimono" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#6b2f7f"/><stop offset="55%" stop-color="#4a1d5c"/><stop offset="100%" stop-color="#7d2a52"/>
    </linearGradient>
    <linearGradient id="${uid}gola" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#ffe9f2"/><stop offset="100%" stop-color="#e9c2d6"/>
    </linearGradient>
    <radialGradient id="${uid}aura" cx="50%" cy="42%" r="55%">
      <stop offset="0%" stop-color="#f286ae" stop-opacity=".42"/>
      <stop offset="60%" stop-color="#b06fd6" stop-opacity=".16"/>
      <stop offset="100%" stop-color="#b06fd6" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="${uid}brilhoCab" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#b06fd6" stop-opacity="0"/>
      <stop offset="50%" stop-color="#c78ae6" stop-opacity=".55"/>
      <stop offset="100%" stop-color="#b06fd6" stop-opacity="0"/>
    </linearGradient>
  </defs>

  ${aura ? `<ellipse class="tamayo__aura" cx="100" cy="112" rx="96" ry="112" fill="url(#${uid}aura)"/>` : ''}

  <g class="tamayo__corpo">
    <!-- cabelo (volume traseiro) -->
    <g class="tamayo__cabelo">
      <path d="M100 10c44 0 70 32 67 84-2 30 3 62 12 94-18-6-31-19-37-35 5-27 7-45 5-64-3-34-19-49-47-49s-44 15-47 49c-2 19 0 37 5 64-6 16-19 29-37 35 9-32 14-64 12-94-3-52 23-84 67-84z" fill="url(#${uid}cabelo)"/>
      <path d="M62 44c10-16 24-24 38-24" stroke="url(#${uid}brilhoCab)" stroke-width="6" fill="none" stroke-linecap="round" opacity=".7"/>
    </g>

    <!-- pescoço -->
    <path d="M86 128h28v30c0 8-28 8-28 0z" fill="#eccbd5"/>
    <path d="M86 132c8 8 20 8 28 0v-6H86z" fill="#d9aebd" opacity=".55"/>

    <!-- kimono -->
    <path d="M100 168 62 152c-18 6-30 18-34 34l-12 82h168l-12-82c-4-16-16-28-34-34z" fill="url(#${uid}kimono)"/>
    <!-- padrão de pétalas no tecido -->
    <g fill="#ffd0e4" opacity=".26">
      <circle cx="46" cy="216" r="3.4"/><circle cx="62" cy="240" r="2.6"/><circle cx="36" cy="248" r="2.8"/>
      <circle cx="156" cy="212" r="3.2"/><circle cx="140" cy="242" r="2.6"/><circle cx="166" cy="246" r="3"/>
      <circle cx="74" cy="262" r="2.4"/><circle cx="128" cy="260" r="2.4"/>
    </g>
    <!-- gola cruzada (lado esquerdo por cima, como se usa em vida) -->
    <path d="M100 172 66 152l-10 8 40 44z" fill="url(#${uid}gola)"/>
    <path d="M100 172l34-20 10 8-40 44z" fill="url(#${uid}gola)"/>
    <path d="M100 172 66 152l-4 3 34 25z" fill="#c79ab5" opacity=".5"/>
    <!-- faixa vermelha (obi) -->
    <path d="M96 206h8l-3 62h-3z" fill="#c1272d" opacity=".85"/>

    <!-- rosto -->
    <path d="M100 32c26 0 44 18 44 48 0 34-20 60-44 60s-44-26-44-60c0-30 18-48 44-48z" fill="url(#${uid}pele)"/>
    <!-- orelhas -->
    <ellipse cx="56" cy="94" rx="5" ry="9" fill="#f5dbe2"/>
    <ellipse cx="144" cy="94" rx="5" ry="9" fill="#f5dbe2"/>
    <!-- brincos -->
    <circle cx="56" cy="105" r="2.6" fill="#e8c07d"/>
    <circle cx="144" cy="105" r="2.6" fill="#e8c07d"/>

    ${e.blush ? `<ellipse cx="70" cy="105" rx="8" ry="4.4" fill="#f3899f" opacity=".34"/>
                 <ellipse cx="130" cy="105" rx="8" ry="4.4" fill="#f3899f" opacity=".34"/>` : ''}

    <!-- olhos + sobrancelhas + boca -->
    <g class="tamayo__olhos">${e.olhos}</g>
    ${e.cenhos}
    <path d="M100 103c-2 3 0 5 2 5" stroke="#d3a3b3" stroke-width="1.8" fill="none" stroke-linecap="round"/>
    ${e.boca}

    <!-- franja -->
    <path d="M56 84c-2-34 16-52 44-52s46 18 44 52c-6-18-16-28-28-32-8 12-24 20-42 22-8 1-14 4-18 10z" fill="url(#${uid}cabelo)"/>
    <path d="M56 86c0-14 4-24 10-30-2 16-4 30-2 44-4-4-8-8-8-14z" fill="url(#${uid}cabelo)"/>
    <path d="M144 86c0-14-4-24-10-30 2 16 4 30 2 44 4-4 8-8 8-14z" fill="url(#${uid}cabelo)"/>

    <!-- ornamento de cerejeira (kanzashi) -->
    <g transform="translate(140 44)">
      <g fill="#ffb9d4">
        <path d="M0-11c4 5 4 11 0 15-4-4-4-10 0-15z"/>
        <path d="M0-11c4 5 4 11 0 15-4-4-4-10 0-15z" transform="rotate(72)"/>
        <path d="M0-11c4 5 4 11 0 15-4-4-4-10 0-15z" transform="rotate(144)"/>
        <path d="M0-11c4 5 4 11 0 15-4-4-4-10 0-15z" transform="rotate(216)"/>
        <path d="M0-11c4 5 4 11 0 15-4-4-4-10 0-15z" transform="rotate(288)"/>
      </g>
      <circle r="3" fill="#ffe0a8"/>
      <path d="M2 12v16" stroke="#e8c07d" stroke-width="1.4"/>
      <circle cx="2" cy="30" r="2.6" fill="#f286ae"/>
      <path d="M8 10l6 13" stroke="#e8c07d" stroke-width="1.2"/>
      <circle cx="14" cy="25" r="2.2" fill="#ffd7e6"/>
    </g>
    <!-- pente lateral -->
    <path d="M58 52c-6 2-10 7-11 13 5-4 10-7 15-8z" fill="#e8c07d"/>
  </g>
</svg>`;

  const n = el('div', { class: 'tamayo', html: svg });
  return n;
}

/* ============================================================
   Falas da Tamayo
   ============================================================ */

export const NOME = 'Professora Tamayo';

/** Escolhe uma fala evitando repetir a última do mesmo grupo. */
const ultimas = {};
export function fala(grupo, banco) {
  const lista = banco[grupo] || banco.generico || [''];
  if (lista.length === 1) return lista[0];
  let f;
  let tentativas = 0;
  do { f = escolha(lista); tentativas++; } while (f === ultimas[grupo] && tentativas < 6);
  ultimas[grupo] = f;
  return f;
}

/** Efeito de digitação para os balões de fala. */
export function digitar(alvo, texto, { vel = 18, aoTerminar } = {}) {
  const reduzido = document.documentElement.dataset.anim === 'off'
    || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduzido) {
    alvo.innerHTML = texto;
    aoTerminar && aoTerminar();
    return () => {};
  }
  alvo.innerHTML = '';
  const cursor = el('span', { class: 'cursor' });
  alvo.appendChild(cursor);
  // Divide preservando tags simples (<b>, <em>).
  const partes = texto.split(/(<[^>]+>)/g).filter(Boolean);
  let pi = 0, ci = 0, buffer = '';
  let parado = false;
  const tick = () => {
    if (parado) return;
    if (pi >= partes.length) {
      cursor.remove();
      aoTerminar && aoTerminar();
      return;
    }
    const p = partes[pi];
    if (p.startsWith('<')) { buffer += p; pi++; }
    else {
      buffer += p[ci++];
      if (ci >= p.length) { pi++; ci = 0; }
    }
    alvo.innerHTML = buffer;
    alvo.appendChild(cursor);
    setTimeout(tick, vel);
  };
  tick();
  return () => { parado = true; cursor.remove(); alvo.innerHTML = texto; };
}

/** Monta o bloco "retrato + balão" usado em várias telas. */
export function cenaTamayo(expr, textoHtml, { largura = 96, lateral = false, digitando = false } = {}) {
  const retrato = retratoTamayo(expr);
  retrato.style.width = `${largura}px`;
  const txt = el('div', { class: 'fala__texto' });
  const balao = el('div', { class: `fala ${lateral ? 'fala--lateral' : ''} crescer` },
    el('span', { class: 'fala__nome', txt: NOME }),
    txt
  );
  if (digitando) digitar(txt, textoHtml);
  else txt.innerHTML = textoHtml;
  const cena = el('div', { class: 'linha g12', style: { alignItems: 'flex-start' } }, retrato, balao);
  return { cena, balao, txt, retrato };
}
