/* ============================================================
   Gamificação: XP, patentes, conquistas, streak e metas.
   ============================================================ */

import { S, salvar, diaDe, registrar, marcarEstudoHoje, minutosHoje } from './state.js';
import { hojeISO, pct, clamp, diffDias } from './util.js';

/* ---------------- Patentes ---------------- */
/* Nomes do ciclo sexagenário japonês (jikkan), do menor ao maior grau. */

export const PATENTES = [
  { id: 'mizunoto',  nome: 'Mizunoto',    kanji: '癸', xp: 0,     cor: '#8b7f9e', desc: 'O primeiro degrau. Todo mundo começa aqui.' },
  { id: 'mizunoe',   nome: 'Mizunoe',     kanji: '壬', xp: 500,   cor: '#7fa3c9', desc: 'A rotina começou a existir.' },
  { id: 'kanoto',    nome: 'Kanoto',      kanji: '辛', xp: 1200,  cor: '#6fc9c1', desc: 'O método já se sustenta sozinho.' },
  { id: 'kanoe',     nome: 'Kanoe',       kanji: '庚', xp: 2200,  cor: '#6fc98a', desc: 'Constância comprovada.' },
  { id: 'tsuchinoto',nome: 'Tsuchinoto',  kanji: '己', xp: 3600,  cor: '#b6c96f', desc: 'As matérias pesadas já não assustam.' },
  { id: 'tsuchinoe', nome: 'Tsuchinoe',   kanji: '戊', xp: 5600,  cor: '#e8c07d', desc: 'Meio caminho da preparação.' },
  { id: 'hinoto',    nome: 'Hinoto',      kanji: '丁', xp: 8200,  cor: '#e8a45c', desc: 'Nível de quem já disputa vaga.' },
  { id: 'hinoe',     nome: 'Hinoe',       kanji: '丙', xp: 11500, cor: '#e8825c', desc: 'Aqui mora a zona de aprovação.' },
  { id: 'kinoto',    nome: 'Kinoto',      kanji: '乙', xp: 15800, cor: '#e0679a', desc: 'Poucos chegam a esta constância.' },
  { id: 'kinoe',     nome: 'Kinoe',       kanji: '甲', xp: 21000, cor: '#d95d8c', desc: 'Domínio amplo do edital.' },
  { id: 'pilar',     nome: 'Pilar',       kanji: '柱', xp: 28000, cor: '#b06fd6', desc: 'Referência. A prova virou detalhe.' },
  { id: 'pilar_lua', nome: 'Pilar da Lua',kanji: '月', xp: 38000, cor: '#ffd7e6', desc: 'O topo da trilha da Tamayo.' },
];

export function patenteDe(xp = S.xp) {
  let atual = PATENTES[0];
  for (const p of PATENTES) if (xp >= p.xp) atual = p;
  return atual;
}

export function proximaPatente(xp = S.xp) {
  return PATENTES.find((p) => p.xp > xp) || null;
}

export function progressoPatente(xp = S.xp) {
  const at = patenteDe(xp);
  const px = proximaPatente(xp);
  if (!px) return { atual: at, prox: null, pct: 100, faltam: 0, base: at.xp, topo: at.xp };
  const p = pct(xp - at.xp, px.xp - at.xp);
  return { atual: at, prox: px, pct: clamp(p, 0, 100), faltam: px.xp - xp, base: at.xp, topo: px.xp };
}

/* ---------------- XP ---------------- */

export const XP = {
  acerto: [0, 8, 12, 18],     // por dificuldade 1..3
  erro: 2,
  aula: 25,
  nivelBase: 60,
  porEstrela: 30,
  simulado: 80,
  revisaoAcerto: 12,
  revisaoErro: 3,
  metaDiaria: 50,
  primeiraDoDia: 15,
};

/** Multiplicador pelo peso da matéria: matéria pesada rende mais. */
export function multiplicadorPeso(peso = 3) {
  return 1 + (peso - 3) * 0.1;
}

/** Bônus de streak (até +50%). */
export function multiplicadorStreak() {
  return 1 + clamp(S.streak.atual * 0.02, 0, 0.5);
}

/**
 * Credita XP e devolve o que mudou (para animar na tela).
 * @returns {{ganho:number, xp:number, subiuPatente:boolean, patente:object}}
 */
export function ganharXp(base, { peso = 3, origem = '', comStreak = true } = {}) {
  const antes = S.xp;
  const patAntes = patenteDe(antes);
  const ganho = Math.max(1, Math.round(base * multiplicadorPeso(peso) * (comStreak ? multiplicadorStreak() : 1)));
  S.xp += ganho;
  diaDe().xp += ganho;
  const patDepois = patenteDe(S.xp);
  salvar();
  return {
    ganho,
    xp: S.xp,
    subiuPatente: patAntes.id !== patDepois.id,
    patente: patDepois,
    origem,
  };
}

/* ---------------- Meta diária ---------------- */

export function estadoMeta() {
  const meta = S.perfil.metaMinutos || 60;
  const feito = minutosHoje();
  return { meta, feito, pct: clamp(pct(feito, meta), 0, 100), batida: feito >= meta };
}

/** Verifica a meta e credita o bônus uma única vez por dia. */
export function conferirMeta() {
  const d = diaDe();
  const e = estadoMeta();
  if (e.batida && !d.metaBatida) {
    d.metaBatida = true;
    const r = ganharXp(XP.metaDiaria, { origem: 'meta', comStreak: false });
    registrar({ tipo: 'meta', min: e.feito });
    return { batidaAgora: true, xp: r };
  }
  return { batidaAgora: false };
}

/* ---------------- Estatísticas agregadas ---------------- */

export function estatisticas() {
  let q = 0, acertos = 0;
  for (const m of Object.values(S.materias)) { q += m.q || 0; acertos += m.acertos || 0; }

  const dias = Object.entries(S.dias);
  const diasEstudados = dias.filter(([, d]) => (d.q || 0) > 0 || (d.min || 0) > 0).length;
  const minutosTotais = dias.reduce((a, [, d]) => a + (d.min || 0), 0);
  const metasBatidas = dias.filter(([, d]) => d.metaBatida).length;

  const srs = Object.values(S.srs);
  const dominadas = srs.filter((f) => f.caixa >= 5).length;

  return {
    q, acertos, taxa: pct(acertos, q),
    diasEstudados, minutosTotais, metasBatidas,
    srsTotal: srs.length, srsDominadas: dominadas,
    simulados: S.simulados.length,
    melhorSimulado: S.simulados.reduce((a, s) => Math.max(a, s.pct || 0), 0),
  };
}

/* ---------------- Conquistas ---------------- */

export const CONQUISTAS = [
  { id: 'primeiro_corte', ico: '🌸', nome: 'Primeiro corte', desc: 'Responder a primeira questão',
    ver: (e) => e.q >= 1 },
  { id: 'primeira_aula', ico: '📜', nome: 'Ouvinte atenta', desc: 'Ler a primeira aula da Tamayo',
    ver: (e, x) => x.aulasLidas >= 1 },
  { id: 'primeiro_nivel', ico: '⛩️', nome: 'Portal aberto', desc: 'Concluir o primeiro nível',
    ver: (e, x) => x.niveisConcluidos >= 1 },
  { id: 'tres_flores', ico: '🏵️', nome: 'Três flores', desc: 'Tirar 3 estrelas em um nível',
    ver: (e, x) => x.niveis3 >= 1 },
  { id: 'imaculada', ico: '💮', nome: 'Imaculada', desc: '100% em um checkpoint',
    ver: (e, x) => x.checkpoint100 >= 1 },
  { id: 'dez_niveis', ico: '🗻', nome: 'Escalada', desc: 'Concluir 10 níveis',
    ver: (e, x) => x.niveisConcluidos >= 10 },
  { id: 'vinte_cinco_niveis', ico: '🏯', nome: 'Fortaleza', desc: 'Concluir 25 níveis',
    ver: (e, x) => x.niveisConcluidos >= 25 },
  { id: 'materia_completa', ico: '🎴', nome: 'Território tomado', desc: 'Concluir uma matéria inteira',
    ver: (e, x) => x.materiasCompletas >= 1 },
  { id: 'tres_materias', ico: '🎋', nome: 'Tríplice coroa', desc: 'Concluir três matérias',
    ver: (e, x) => x.materiasCompletas >= 3 },
  { id: 'edital_vencido', ico: '👑', nome: 'Edital vencido', desc: 'Concluir todas as matérias',
    ver: (e, x) => x.materiasCompletas >= x.totalMaterias && x.totalMaterias > 0 },

  { id: 'combo_10', ico: '🔥', nome: 'Respiração constante', desc: '10 acertos seguidos',
    ver: (e, x) => x.melhorCombo >= 10 },
  { id: 'combo_25', ico: '⚡', nome: 'Lâmina em brasa', desc: '25 acertos seguidos',
    ver: (e, x) => x.melhorCombo >= 25 },
  { id: 'combo_50', ico: '☄️', nome: 'Estado de graça', desc: '50 acertos seguidos',
    ver: (e, x) => x.melhorCombo >= 50 },

  { id: 'q_100', ico: '📗', nome: 'Cem cortes', desc: 'Responder 100 questões', ver: (e) => e.q >= 100 },
  { id: 'q_500', ico: '📘', nome: 'Quinhentos cortes', desc: 'Responder 500 questões', ver: (e) => e.q >= 500 },
  { id: 'q_1000', ico: '📙', nome: 'Mil cortes', desc: 'Responder 1000 questões', ver: (e) => e.q >= 1000 },
  { id: 'q_2500', ico: '📚', nome: 'Biblioteca viva', desc: 'Responder 2500 questões', ver: (e) => e.q >= 2500 },

  { id: 'streak_3', ico: '🕯️', nome: 'Chama acesa', desc: '3 dias seguidos', ver: () => S.streak.recorde >= 3 },
  { id: 'streak_7', ico: '🌙', nome: 'Uma semana inteira', desc: '7 dias seguidos', ver: () => S.streak.recorde >= 7 },
  { id: 'streak_14', ico: '🌗', nome: 'Duas semanas', desc: '14 dias seguidos', ver: () => S.streak.recorde >= 14 },
  { id: 'streak_30', ico: '🌕', nome: 'Lua cheia', desc: '30 dias seguidos', ver: () => S.streak.recorde >= 30 },
  { id: 'streak_60', ico: '🎑', nome: 'Dois meses', desc: '60 dias seguidos', ver: () => S.streak.recorde >= 60 },
  { id: 'streak_100', ico: '🐉', nome: 'Cem noites', desc: '100 dias seguidos', ver: () => S.streak.recorde >= 100 },

  { id: 'meta_1', ico: '⏳', nome: 'Uma hora cumprida', desc: 'Bater a meta diária', ver: (e) => e.metasBatidas >= 1 },
  { id: 'meta_7', ico: '⏰', nome: 'Semana cumprida', desc: 'Bater a meta 7 vezes', ver: (e) => e.metasBatidas >= 7 },
  { id: 'meta_30', ico: '🕰️', nome: 'Mês cumprido', desc: 'Bater a meta 30 vezes', ver: (e) => e.metasBatidas >= 30 },
  { id: 'maratona', ico: '🏔️', nome: 'Maratona', desc: '3 horas de estudo em um dia',
    ver: (e, x) => x.maiorDiaMin >= 180 },
  { id: 'madrugadora', ico: '🌅', nome: 'Antes do sol', desc: 'Estudar antes das 6h', ver: (e, x) => x.madrugada },
  { id: 'coruja', ico: '🦉', nome: 'Vigília', desc: 'Estudar depois das 23h', ver: (e, x) => x.coruja },

  { id: 'simulado_1', ico: '📝', nome: 'Primeiro simulado', desc: 'Concluir um simulado', ver: (e) => e.simulados >= 1 },
  { id: 'simulado_10', ico: '🗂️', nome: 'Veterana de prova', desc: 'Concluir 10 simulados', ver: (e) => e.simulados >= 10 },
  { id: 'simulado_70', ico: '🎯', nome: 'Zona de corte', desc: '70% ou mais em um simulado', ver: (e) => e.melhorSimulado >= 70 },
  { id: 'simulado_85', ico: '🏆', nome: 'Nota de aprovada', desc: '85% ou mais em um simulado', ver: (e) => e.melhorSimulado >= 85 },

  { id: 'srs_limpo', ico: '🩹', nome: 'Feridas fechadas', desc: 'Zerar as revisões do dia', ver: (e, x) => x.srsZerado },
  { id: 'srs_50', ico: '🧬', nome: 'Memória de aço', desc: '50 questões dominadas na revisão', ver: (e) => e.srsDominadas >= 50 },
  { id: 'srs_200', ico: '🧠', nome: 'Memória de titânio', desc: '200 questões dominadas', ver: (e) => e.srsDominadas >= 200 },

  { id: 'precisao', ico: '🎐', nome: 'Precisão cirúrgica', desc: '85% de acerto com 300+ questões',
    ver: (e) => e.q >= 300 && e.taxa >= 85 },
  { id: 'ressurreicao', ico: '🌱', nome: 'Ressurgir', desc: 'Voltar a estudar após 7 dias parada',
    ver: (e, x) => x.ressurgiu },
  { id: 'noturna', ico: '🎏', nome: 'Sem desculpas', desc: 'Bater a meta em um fim de semana',
    ver: (e, x) => x.fimDeSemana },
];

/** Métricas auxiliares mantidas no save para as conquistas. */
export function extras() {
  if (!S.extras) {
    S.extras = {
      aulasLidas: 0, niveisConcluidos: 0, niveis3: 0, checkpoint100: 0,
      melhorCombo: 0, comboAtual: 0, materiasCompletas: 0, totalMaterias: 0,
      maiorDiaMin: 0, madrugada: false, coruja: false, srsZerado: false,
      ressurgiu: false, fimDeSemana: false,
    };
  }
  return S.extras;
}

/** Roda todas as verificações e devolve as conquistas novas. */
export function conferirConquistas() {
  const e = estatisticas();
  const x = extras();
  const novas = [];
  for (const c of CONQUISTAS) {
    if (S.badges[c.id]) continue;
    let ok = false;
    try { ok = !!c.ver(e, x); } catch { ok = false; }
    if (ok) {
      S.badges[c.id] = hojeISO();
      novas.push(c);
    }
  }
  if (novas.length) salvar();
  return novas;
}

/** Atualiza o combo de acertos consecutivos. */
export function registrarCombo(acertou) {
  const x = extras();
  if (acertou) {
    x.comboAtual += 1;
    x.melhorCombo = Math.max(x.melhorCombo, x.comboAtual);
  } else {
    x.comboAtual = 0;
  }
  return x.comboAtual;
}

export function comboAtual() { return extras().comboAtual; }

/** Chamado no início de cada sessão para marcar horários/regressos. */
export function marcarContexto() {
  const x = extras();
  const h = new Date().getHours();
  if (h < 6) x.madrugada = true;
  if (h >= 23) x.coruja = true;

  const diasComEstudo = Object.entries(S.dias)
    .filter(([, d]) => (d.q || 0) > 0)
    .map(([k]) => k)
    .sort();
  if (diasComEstudo.length) {
    const ultimo = diasComEstudo[diasComEstudo.length - 1];
    if (diffDias(ultimo, hojeISO()) >= 7) x.ressurgiu = true;
  }
  x.maiorDiaMin = Object.values(S.dias).reduce((a, d) => Math.max(a, d.min || 0), 0);
  salvar();
}

/** Registra estudo efetivo (atualiza streak + conquistas de retorno). */
export function pulsoEstudo() {
  const r = marcarEstudoHoje();
  const dia = new Date().getDay();
  if ((dia === 0 || dia === 6) && estadoMeta().batida) extras().fimDeSemana = true;
  return r;
}
