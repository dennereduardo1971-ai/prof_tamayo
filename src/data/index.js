/* ============================================================
   Registro de matérias — Analista Legislativo / Câmara dos Deputados
   ------------------------------------------------------------
   FONTE DO CONTEÚDO
   O concurso está em fase de PRÉ-EDITAL. A grade abaixo reproduz o
   escopo historicamente cobrado para Analista Legislativo da Câmara
   (últimos editais + material de estudo reunido). Quando o edital
   oficial sair, basta ajustar `peso`, incluir/remover níveis ou
   adicionar novos arquivos de matéria — nada mais no app precisa mudar.

   PESO (1 a 5) controla três coisas ao mesmo tempo:
     • quantos níveis a matéria tem;
     • quanto XP cada acerto vale;
     • com que frequência a matéria aparece nos simulados e na
       recomendação de estudo do dia.
   ============================================================ */

import portugues from './portugues.js';
import constitucional from './constitucional.js';
import processoLegislativo from './processo_legislativo.js';
import administrativo from './administrativo.js';
import tecnicaLegislativa from './tecnica_legislativa.js';
import cienciaPolitica from './ciencia_politica.js';
import administracaoPublica from './administracao_publica.js';
import raciocinioLogico from './raciocinio_logico.js';
import ingles from './ingles.js';
import etica from './etica.js';
import atualidades from './atualidades.js';
import informatica from './informatica.js';

export const MATERIAS = [
  portugues,
  constitucional,
  processoLegislativo,
  administrativo,
  tecnicaLegislativa,
  cienciaPolitica,
  administracaoPublica,
  raciocinioLogico,
  ingles,
  etica,
  atualidades,
  informatica,
];

export const MAPA_MATERIAS = Object.fromEntries(MATERIAS.map((m) => [m.id, m]));

export function materia(id) { return MAPA_MATERIAS[id] || null; }

export function nivel(matId, nivId) {
  const m = materia(matId);
  return m ? m.niveis.find((n) => n.id === nivId) || null : null;
}

/** Índice global de questões: id -> { q, mat, niv }. */
export const INDICE_QUESTOES = (() => {
  const idx = {};
  for (const m of MATERIAS) {
    for (const n of m.niveis) {
      for (const q of n.questoes) {
        idx[q.id] = { q, mat: m.id, niv: n.id, peso: m.peso, dif: q.dif || 2 };
      }
    }
  }
  return idx;
})();

export function questao(id) { return INDICE_QUESTOES[id] || null; }

export const TOTAL_QUESTOES = Object.keys(INDICE_QUESTOES).length;
export const TOTAL_NIVEIS = MATERIAS.reduce((a, m) => a + m.niveis.length, 0);

/** Blocos do edital. */
export const BLOCOS = {
  basicos: 'Conhecimentos Básicos',
  especificos: 'Conhecimentos Específicos',
};

/** Matérias ordenadas por peso (mais pesadas primeiro) — usado nas recomendações. */
export function porPeso() {
  return MATERIAS.slice().sort((a, b) => b.peso - a.peso || a.nome.localeCompare(b.nome));
}

/**
 * Distribuição de questões de um simulado, proporcional ao peso.
 * Ex.: 60 questões -> matéria peso 5 recebe mais que matéria peso 2.
 */
export function distribuirPorPeso(total, materias = MATERIAS) {
  const somaPesos = materias.reduce((a, m) => a + m.peso, 0);
  const bruto = materias.map((m) => ({ mat: m, n: (m.peso / somaPesos) * total }));
  const out = bruto.map((b) => ({ mat: b.mat, n: Math.floor(b.n), resto: b.n % 1 }));
  let faltam = total - out.reduce((a, b) => a + b.n, 0);
  out.sort((a, b) => b.resto - a.resto);
  for (let i = 0; faltam > 0; i++, faltam--) out[i % out.length].n += 1;
  return out.filter((o) => o.n > 0).map((o) => ({ mat: o.mat, n: o.n }));
}
