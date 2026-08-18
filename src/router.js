/* ============================================================
   Navegação por telas, com pilha de histórico e transição.
   ============================================================ */

import { el, $ } from './util.js';
import { corte } from './fx.js';
import { som } from './audio.js';
import { petalas } from './petals.js';

const telas = {};
let pilha = [];
let atual = null;

export function registrarTela(nome, construtor) {
  telas[nome] = construtor;
}

export function rotaAtual() { return atual; }

/**
 * Vai para uma tela.
 * @param {string} nome
 * @param {object} params
 * @param {{substituir?:boolean, semSom?:boolean, semPilha?:boolean}} opts
 */
export function ir(nome, params = {}, opts = {}) {
  const ctor = telas[nome];
  if (!ctor) { console.warn('Tela não registrada:', nome); return; }

  if (atual && !opts.substituir && !opts.semPilha) pilha.push(atual);
  if (opts.substituir && pilha.length) { /* mantém a pilha */ }
  atual = { nome, params };

  const raiz = $('#app');
  const antigo = raiz.firstElementChild;

  if (!opts.semSom) som.navegar();
  petalas.rajada(0.7);

  const novo = ctor(params);
  novo.classList.add('tela');

  if (antigo) {
    antigo.style.animation = 'sairLat .22s ease forwards';
    setTimeout(() => antigo.remove(), 220);
  }
  raiz.appendChild(novo);
  novo.animate(
    [{ opacity: 0, transform: 'translateX(22px)' }, { opacity: 1, transform: 'none' }],
    { duration: 300, easing: 'cubic-bezier(.16,.84,.34,1)', fill: 'both' }
  );
  raiz.scrollTop = 0;
  const sc = novo.querySelector('.scroll');
  if (sc) sc.scrollTop = 0;
  return novo;
}

/** Volta uma tela. Se a pilha estiver vazia, vai para a home. */
export function voltar() {
  const anterior = pilha.pop();
  const destino = anterior || { nome: 'home', params: {} };
  atual = null;
  const restante = pilha;
  ir(destino.nome, destino.params, { semPilha: true });
  pilha = restante;
}

/** Limpa a pilha (usado ao trocar de aba). */
export function limparPilha() { pilha = []; }

/** Transição especial com corte de lâmina (usada em level-up). */
export function irComCorte(nome, params = {}) {
  corte();
  setTimeout(() => ir(nome, params), 180);
}

export function podeVoltar() { return pilha.length > 0; }
