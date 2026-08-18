/* ============================================================
   Repetição espaçada (SRS)
   Caixas de Leitner com fator de facilidade no estilo SM-2.
   Questão errada volta rápido; questão dominada se afasta.
   ============================================================ */

import { S, salvar } from './state.js';
import { hojeISO, diaISOMais, diffDias, clamp } from './util.js';

/* Intervalo em dias por caixa. Caixa 0 = volta na mesma sessão. */
export const INTERVALOS = [0, 1, 2, 4, 9, 18, 35, 70];
export const CAIXA_MAX = INTERVALOS.length - 1;
export const CAIXA_DOMINIO = 5;   // a partir daqui, consideramos domínio

export function ficha(qid, meta = {}) {
  if (!S.srs[qid]) {
    S.srs[qid] = {
      caixa: 0,
      proxima: hojeISO(),
      acertosSeguidos: 0,
      erros: 0,
      acertos: 0,
      vistas: 0,
      ultima: null,
      fac: 2.5,
      mat: meta.mat || null,
      niv: meta.niv || null,
      dif: meta.dif || 2,
    };
  } else if (meta.mat && !S.srs[qid].mat) {
    Object.assign(S.srs[qid], { mat: meta.mat, niv: meta.niv, dif: meta.dif || 2 });
  }
  return S.srs[qid];
}

/**
 * Registra uma resposta.
 * @param {string} qid
 * @param {boolean} acertou
 * @param {object} meta { mat, niv, dif }
 * @param {number|null} qualidade 0..5 (autoavaliação da revisão); null usa acertou
 */
export function responder(qid, acertou, meta = {}, qualidade = null) {
  const f = ficha(qid, meta);
  f.vistas += 1;
  f.ultima = hojeISO();

  const q = qualidade !== null ? qualidade : (acertou ? 4 : 1);

  if (acertou) {
    f.acertos += 1;
    f.acertosSeguidos += 1;
    // Fator de facilidade (SM-2 simplificado)
    f.fac = clamp(f.fac + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)), 1.3, 2.9);
    f.caixa = Math.min(CAIXA_MAX, f.caixa + (q >= 5 ? 2 : 1));
    const base = INTERVALOS[f.caixa];
    const dias = Math.max(1, Math.round(base * (f.fac / 2.5)));
    f.proxima = diaISOMais(hojeISO(), dias);
  } else {
    f.erros += 1;
    f.acertosSeguidos = 0;
    f.fac = clamp(f.fac - 0.22, 1.3, 2.9);
    // Erro derruba duas caixas: o conteúdo volta a doer logo.
    f.caixa = Math.max(0, f.caixa - 2);
    f.proxima = hojeISO();
  }
  salvar();
  return f;
}

/** Todas as fichas vencidas (proxima <= hoje), mais urgentes primeiro. */
export function vencidas({ mat = null, limite = Infinity } = {}) {
  const hoje = hojeISO();
  const lista = Object.entries(S.srs)
    .filter(([, f]) => f.proxima <= hoje)
    .filter(([, f]) => (mat ? f.mat === mat : true))
    .map(([qid, f]) => ({ qid, f, atraso: diffDias(f.proxima, hoje) }));

  lista.sort((a, b) => {
    // 1) caixa mais baixa (mais frágil), 2) maior atraso, 3) mais erros
    if (a.f.caixa !== b.f.caixa) return a.f.caixa - b.f.caixa;
    if (a.atraso !== b.atraso) return b.atraso - a.atraso;
    return b.f.erros - a.f.erros;
  });
  return lista.slice(0, limite);
}

export function resumoSrs() {
  const hoje = hojeISO();
  let atrasadas = 0, hojeQ = 0, aprendendo = 0, dominadas = 0, total = 0;
  for (const f of Object.values(S.srs)) {
    total += 1;
    if (f.proxima < hoje) atrasadas += 1;
    else if (f.proxima === hoje) hojeQ += 1;
    if (f.caixa >= CAIXA_DOMINIO) dominadas += 1;
    else if (f.vistas > 0) aprendendo += 1;
  }
  return { total, atrasadas, hoje: hojeQ, pendentes: atrasadas + hojeQ, aprendendo, dominadas };
}

/** Pontos fracos: matérias/níveis com mais erros acumulados. */
export function pontosFracos(limite = 6) {
  const porNivel = {};
  for (const f of Object.values(S.srs)) {
    if (!f.niv) continue;
    const k = `${f.mat}|${f.niv}`;
    if (!porNivel[k]) porNivel[k] = { mat: f.mat, niv: f.niv, erros: 0, q: 0 };
    porNivel[k].erros += f.erros;
    porNivel[k].q += f.vistas;
  }
  return Object.values(porNivel)
    .filter((x) => x.erros > 0)
    .sort((a, b) => b.erros - a.erros)
    .slice(0, limite);
}

/**
 * Peso de sorteio de uma questão: quanto pior o histórico, mais provável cair.
 * Usado para montar blocos de prática e simulados.
 */
export function pesoSorteio(qid) {
  const f = S.srs[qid];
  if (!f) return 1;                       // inédita: peso padrão
  if (f.caixa >= CAIXA_DOMINIO) return 0.25;
  const venceu = f.proxima <= hojeISO();
  return clamp(1 + f.erros * 0.9 - f.acertosSeguidos * 0.25 + (venceu ? 0.8 : 0), 0.2, 6);
}

/** Sorteio ponderado sem repetição. */
export function sortearPonderado(itens, n, chaveId = (x) => x.id) {
  const pool = itens.map((it) => ({ it, p: pesoSorteio(chaveId(it)) }));
  const out = [];
  while (out.length < n && pool.length) {
    const total = pool.reduce((a, x) => a + x.p, 0);
    let r = Math.random() * total;
    let i = 0;
    for (; i < pool.length; i++) { r -= pool[i].p; if (r <= 0) break; }
    const [esc] = pool.splice(Math.min(i, pool.length - 1), 1);
    out.push(esc.it);
  }
  return out;
}

/** Marca que a fila de revisão do dia foi zerada (para conquista). */
export function fichaDominada(qid) {
  const f = S.srs[qid];
  return !!f && f.caixa >= CAIXA_DOMINIO;
}
