/* ============================================================
   Efeitos de tela: flashes, textos flutuantes, toasts, modais.
   ============================================================ */

import { el, $ } from './util.js';
import { petalas } from './petals.js';

const camadaFx = () => $('#fx');
const pilhaToast = () => $('#toasts');

/** Flash colorido de tela inteira. */
export function flash(tipo = 'sakura') {
  const n = el('div', { class: `fx-flash fx-flash--${tipo}` });
  camadaFx().appendChild(n);
  setTimeout(() => n.remove(), 800);
}

/** Anel expansivo a partir de um ponto. */
export function anel(x, y, cor = 'rgba(255,199,224,.85)') {
  const n = el('div', { class: 'fx-ring' });
  n.style.left = `${x}px`; n.style.top = `${y}px`;
  n.style.borderColor = cor;
  camadaFx().appendChild(n);
  setTimeout(() => n.remove(), 1000);
}

/** Corte de lâmina — transição entre telas. */
export function corte() {
  const n = el('div', { class: 'fx-slash' });
  camadaFx().appendChild(n);
  setTimeout(() => n.remove(), 620);
}

/** Texto que sobe e some (ex.: "+40 XP"). */
export function flutuar(texto, x, y, cor) {
  const n = el('div', { class: 'fx-float', txt: texto });
  n.style.left = `${x}px`;
  n.style.top = `${y}px`;
  n.style.transform = 'translateX(-50%)';
  if (cor) n.style.color = cor;
  camadaFx().appendChild(n);
  setTimeout(() => n.remove(), 1500);
}

/** Comemoração completa: flash + chuva de pétalas + anel. */
export function comemorar(nivel = 1) {
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight * 0.42;
  flash(nivel >= 2 ? 'ouro' : 'sakura');
  anel(cx, cy, nivel >= 2 ? 'rgba(232,192,125,.9)' : 'rgba(255,199,224,.85)');
  petalas.explodir(cx, cy, nivel >= 2 ? 70 : 40, nivel >= 2 ? 1.25 : 0.9);
  petalas.chuva(nivel >= 2 ? 70 : 34);
  petalas.rajada(1.4);
}

/* ---------------- Toasts ---------------- */

export function toast(msg, { ico = '🌸', tipo = '', ms = 3000 } = {}) {
  const n = el('div', { class: `toast ${tipo ? `toast--${tipo}` : ''}` },
    el('span', { class: 'toast__ico', txt: ico }),
    el('span', { class: 'crescer', html: msg })
  );
  const pilha = pilhaToast();
  // Mais de três avisos ao mesmo tempo cobrem a tela inteira: descarta o mais antigo.
  while (pilha.children.length >= 3) pilha.firstElementChild.remove();
  pilha.appendChild(n);
  setTimeout(() => {
    n.classList.add('is-saindo');
    setTimeout(() => n.remove(), 400);
  }, ms);
  return n;
}

/* ---------------- Modal ---------------- */

let modalAberto = null;

export function modal({ titulo, corpo, acoes = [], fechavel = true }) {
  fecharModal();
  const caixa = el('div', { class: 'modal' });
  if (titulo) caixa.appendChild(el('h2', { class: 'modal__tit', html: titulo }));
  if (corpo) {
    if (typeof corpo === 'string') caixa.appendChild(el('div', { html: corpo }));
    else caixa.appendChild(corpo);
  }
  if (acoes.length) {
    const bar = el('div', { class: 'col g8 mt16' });
    for (const a of acoes) {
      bar.appendChild(el('button', {
        class: `btn btn--bloco ${a.classe || 'btn--fantasma'}`,
        onclick: () => { if (a.fecha !== false) fecharModal(); a.acao && a.acao(); },
      }, a.rotulo));
    }
    caixa.appendChild(bar);
  }
  const fundo = el('div', {
    class: 'modal-fundo',
    onclick: (ev) => { if (fechavel && ev.target === fundo) fecharModal(); },
  }, caixa);
  document.body.appendChild(fundo);
  modalAberto = fundo;
  return fundo;
}

export function fecharModal() {
  if (modalAberto) { modalAberto.remove(); modalAberto = null; }
}

export function confirmar(titulo, texto, aoConfirmar, rotuloOk = 'Confirmar') {
  modal({
    titulo,
    corpo: el('p', { class: 'txt-c', style: { color: 'var(--txt-2)', fontSize: '14px', lineHeight: '1.65' }, html: texto }),
    acoes: [
      { rotulo: rotuloOk, classe: 'btn--primario', acao: aoConfirmar },
      { rotulo: 'Cancelar', classe: 'btn--fantasma' },
    ],
  });
}
