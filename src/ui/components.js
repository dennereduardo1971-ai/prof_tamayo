/* ============================================================
   Componentes reutilizáveis de interface
   ============================================================ */

import { el, md, pct, clamp } from '../util.js';
import { voltar, ir, podeVoltar, limparPilha, rotaAtual } from '../router.js';
import { S, progNivel, progMateria } from '../state.js';
import { som } from '../audio.js';

/* ---------------- Estrutura de tela ---------------- */

export function tela(...filhos) {
  return el('div', { class: 'col', style: { height: '100%', minHeight: '0' } }, ...filhos);
}

export function topbar(titulo, { sub = null, comVoltar = true, acao = null } = {}) {
  return el('div', { class: 'topbar' },
    comVoltar && podeVoltar()
      ? el('button', { class: 'topbar__voltar', 'aria-label': 'Voltar', onclick: () => voltar() }, '‹')
      : null,
    el('div', { class: 'crescer', style: { minWidth: 0 } },
      sub ? el('div', { class: 'topbar__sub', txt: sub }) : null,
      el('div', { class: 'topbar__tit', txt: titulo })
    ),
    acao
  );
}

/**
 * Área rolável da tela.
 * Passe { semNav: true } quando a tela não tiver a barra inferior —
 * assim o conteúdo usa toda a altura em vez de reservar espaço para ela.
 */
export function corpo(...filhos) {
  let semNav = false;
  if (filhos.length && filhos[0] && typeof filhos[0] === 'object' && !(filhos[0] instanceof Node) && 'semNav' in filhos[0]) {
    semNav = !!filhos.shift().semNav;
  }
  return el('div', { class: `scroll ${semNav ? 'scroll--pleno' : ''}` }, ...filhos);
}

/* ---------------- Navegação inferior ---------------- */

const ICONES_NAV = {
  dojo: '<path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1z" fill="currentColor"/>',
  trilha: '<path d="M7 3v14a3 3 0 0 0 3 3h7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><circle cx="7" cy="3.5" r="2.5" fill="currentColor"/><circle cx="17" cy="20" r="2.5" fill="currentColor"/><circle cx="7" cy="11" r="2" fill="currentColor" opacity=".6"/>',
  revisar: '<path d="M20 12a8 8 0 1 1-2.4-5.7" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M20 3v5h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  simular: '<rect x="4" y="3" width="16" height="18" rx="2.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M8 8h8M8 12h8M8 16h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
  progresso: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/>',
};

const ABAS = [
  { rota: 'home', ico: 'dojo', rot: 'Dojo' },
  { rota: 'trilha', ico: 'trilha', rot: 'Trilha' },
  { rota: 'revisao', ico: 'revisar', rot: 'Revisar' },
  { rota: 'simulado', ico: 'simular', rot: 'Simular' },
  { rota: 'progresso', ico: 'progresso', rot: 'Progresso' },
];

export function navInferior(ativa) {
  return el('nav', { class: 'nav' },
    ...ABAS.map((a) => el('button', {
      class: `nav__item ${a.rota === ativa ? 'is-ativo' : ''}`,
      onclick: () => {
        if (a.rota === ativa) return;
        limparPilha();
        ir(a.rota, {}, { semPilha: true });
      },
    },
      el('span', { html: `<svg viewBox="0 0 24 24" aria-hidden="true">${ICONES_NAV[a.ico]}</svg>` }),
      el('span', { txt: a.rot })
    ))
  );
}

/* ---------------- Peças menores ---------------- */

export function barra(pctValor, { classe = '', fina = false, anim = true } = {}) {
  const fill = el('div', { class: 'barra__fill' });
  fill.style.width = anim ? '0%' : `${clamp(pctValor, 0, 100)}%`;
  const b = el('div', { class: `barra ${fina ? 'barra--fina' : ''} ${classe}` }, fill);
  if (anim) requestAnimationFrame(() => { fill.style.width = `${clamp(pctValor, 0, 100)}%`; });
  return b;
}

export function chip(texto, classe = '') {
  return el('span', { class: `chip ${classe}`, html: texto });
}

export function pesoPontos(peso) {
  return el('span', { class: 'peso-pontos', title: `Peso ${peso} de 5` },
    ...[1, 2, 3, 4, 5].map((i) => el('i', { class: `peso-ponto ${i <= peso ? 'is-on' : ''}` }))
  );
}

export function estrelas(n, total = 3) {
  return el('span', { class: 'nivel-selo__estrelas' },
    ...Array.from({ length: total }, (_, i) => el('span', { txt: i < n ? '★' : '☆' }))
  );
}

export function vazio(ico, texto) {
  return el('div', { class: 'vazio' }, el('span', { class: 'vazio__ico', txt: ico }), el('div', { html: texto }));
}

export function secao(titulo) {
  return el('h2', { class: 'secao-tit', txt: titulo });
}

/* ---------------- Blocos de conteúdo (aula) ---------------- */

export function blocoAula(b) {
  const n = el('section', { class: 'aula__bloco' });
  if (b.t) n.appendChild(el('h3', { html: md(b.t) }));
  for (const p of b.p || []) n.appendChild(el('p', { html: md(p) }));
  if (b.lista?.length) {
    n.appendChild(el('ul', {}, ...b.lista.map((i) => el('li', { html: md(i) }))));
  }
  return n;
}

export function destaque(d) {
  return el('div', { class: `destaque ${d.tipo ? `destaque--${d.tipo}` : ''}` },
    d.rot ? el('span', { class: 'destaque__rot', txt: d.rot }) : null,
    el('span', { html: md(d.txt) })
  );
}

export function resumoAula(itens) {
  return el('div', { class: 'resumo' },
    el('h3', { txt: 'Fixe estes pontos' }),
    el('ul', { style: { margin: 0, paddingLeft: '18px' } }, ...itens.map((i) => el('li', { html: md(i) })))
  );
}

/* ---------------- Progresso de matéria ---------------- */

/** Percentual de conclusão de uma matéria (níveis concluídos / total). */
export function pctMateria(mat) {
  const p = progMateria(mat.id);
  const feitos = mat.niveis.filter((n) => p.niveis[n.id]?.concluido).length;
  return { feitos, total: mat.niveis.length, pct: pct(feitos, mat.niveis.length) };
}

/** Estrelas somadas de uma matéria. */
export function estrelasMateria(mat) {
  const p = progMateria(mat.id);
  const ganhas = mat.niveis.reduce((a, n) => a + (p.niveis[n.id]?.estrelas || 0), 0);
  return { ganhas, max: mat.niveis.length * 3 };
}

/** O nível está liberado? O primeiro sempre está; os demais exigem o anterior concluído. */
export function nivelLiberado(mat, idx) {
  if (idx === 0) return true;
  const ant = mat.niveis[idx - 1];
  return !!progNivel(mat.id, ant.id).concluido;
}

/** Índice do próximo nível a fazer numa matéria. */
export function proximoNivel(mat) {
  const p = progMateria(mat.id);
  const i = mat.niveis.findIndex((n) => !p.niveis[n.id]?.concluido);
  return i === -1 ? mat.niveis.length - 1 : i;
}

/* ---------------- Cartão de matéria ---------------- */

export function cartaoMateria(mat, aoClicar) {
  const { pct: p, feitos, total } = pctMateria(mat);
  const est = estrelasMateria(mat);
  const cartao = el('button', { class: 'materia', onclick: () => aoClicar(mat) },
    el('span', { class: 'materia__ico', txt: mat.ico }),
    el('span', { class: 'materia__corpo' },
      el('span', { class: 'materia__nome', txt: mat.nome }),
      el('span', { class: 'materia__meta' },
        pesoPontos(mat.peso),
        chip(`${feitos}/${total} níveis`),
        mat.fortaleza ? chip('★ ponto forte', 'chip--ouro') : null,
        est.ganhas > 0 ? chip(`${est.ganhas}/${est.max} ✿`, 'chip--sakura') : null
      ),
      el('span', { class: 'materia__barra' }, barra(p, { fina: true }))
    ),
    el('span', { class: 'materia__pct', txt: `${p}%` })
  );
  cartao.style.setProperty('--cor-mat', mat.cor);
  return cartao;
}
