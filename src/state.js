/* ============================================================
   Estado global + persistência (localStorage)
   Tudo que a Sara faz é salvo aqui e sobrevive entre sessões.
   ============================================================ */

import { hojeISO, diffDias, debounce, diaISOMais } from './util.js';

const CHAVE = 'tamayo.save.v1';
const CHAVE_BKP = 'tamayo.save.backup';
export const VERSAO_SAVE = 1;

function estadoInicial() {
  return {
    versao: VERSAO_SAVE,
    perfil: {
      nome: 'Sara',
      criadoEm: hojeISO(),
      metaMinutos: 60,
      dataProva: null,     // 'YYYY-MM-DD' — alimenta previsão, ritmo e urgência
      calibrado: false,
      fortalezas: ['portugues', 'ingles'],
      cargo: 'Analista Legislativo — Câmara dos Deputados',
    },
    xp: 0,
    moedas: 0,
    streak: { atual: 0, recorde: 0, ultimoDia: null, congelamentos: 2 },
    dias: {},            // 'YYYY-MM-DD' -> { min, q, acertos, xp, niveis }
    materias: {},        // id -> { niveis: {}, xp, q, acertos }
    srs: {},             // questaoId -> ficha de repetição espaçada
    leis: {},            // dispositivoId -> desempenho no modo lei seca
    badges: {},          // id -> data de conquista
    historico: [],       // últimos eventos (máx. 250)
    simulados: [],       // últimos 40
    ajustes: { som: true, animacoes: true, hapticos: true, petalas: 'normal' },
    sessao: { inicioMs: Date.now(), segundosAcumHoje: 0, diaSessao: hojeISO() },
    visto: { boasVindas: false, dicaSrs: false },
  };
}

function mesclar(base, salvo) {
  if (!salvo || typeof salvo !== 'object') return base;
  const out = Array.isArray(base) ? salvo : { ...base };
  for (const [k, v] of Object.entries(salvo)) {
    if (v && typeof v === 'object' && !Array.isArray(v) && base[k] && typeof base[k] === 'object' && !Array.isArray(base[k])) {
      out[k] = mesclar(base[k], v);
    } else {
      out[k] = v;
    }
  }
  return out;
}

export let S = estadoInicial();

/* ---------------- Carga / gravação ---------------- */

export function carregar() {
  try {
    const bruto = localStorage.getItem(CHAVE);
    if (bruto) {
      const salvo = JSON.parse(bruto);
      S = mesclar(estadoInicial(), salvo);
      S.versao = VERSAO_SAVE;
    }
  } catch (e) {
    console.warn('Save corrompido, tentando backup', e);
    try {
      const bkp = localStorage.getItem(CHAVE_BKP);
      if (bkp) S = mesclar(estadoInicial(), JSON.parse(bkp));
    } catch { S = estadoInicial(); }
  }
  normalizarDia();
  return S;
}

let ultimoOk = null;

export const salvar = debounce(() => salvarJa(), 350);

export function salvarJa() {
  try {
    const txt = JSON.stringify(S);
    if (ultimoOk) localStorage.setItem(CHAVE_BKP, ultimoOk);
    localStorage.setItem(CHAVE, txt);
    ultimoOk = txt;
  } catch (e) {
    console.warn('Falha ao salvar', e);
  }
}

export function exportarSave() {
  return JSON.stringify(S, null, 2);
}

export function importarSave(texto) {
  const dados = JSON.parse(texto);
  if (!dados || typeof dados !== 'object') throw new Error('Arquivo inválido');
  S = mesclar(estadoInicial(), dados);
  S.versao = VERSAO_SAVE;
  normalizarDia();
  salvarJa();
  return S;
}

export function zerarTudo() {
  S = estadoInicial();
  salvarJa();
  return S;
}

/* ---------------- Dia / streak ---------------- */

export function diaDe(iso = hojeISO()) {
  if (!S.dias[iso]) S.dias[iso] = { min: 0, q: 0, acertos: 0, xp: 0, niveis: 0, metaBatida: false };
  return S.dias[iso];
}

/** Zera o cronômetro da sessão se virou o dia. */
export function normalizarDia() {
  const hoje = hojeISO();
  if (S.sessao.diaSessao !== hoje) {
    S.sessao = { inicioMs: Date.now(), segundosAcumHoje: 0, diaSessao: hoje };
  }
  diaDe(hoje);
  // Quebra de streak: se o último dia de estudo não foi hoje nem ontem, zera.
  if (S.streak.ultimoDia) {
    const d = diffDias(S.streak.ultimoDia, hoje);
    if (d > 1) S.streak.atual = 0;
  }
}

/**
 * Registra atividade de estudo do dia e atualiza o streak.
 * O streak conta quando a Sara estuda de fato (responde questões ou conclui aula).
 */
export function marcarEstudoHoje() {
  const hoje = hojeISO();
  if (S.streak.ultimoDia === hoje) return { subiu: false, atual: S.streak.atual };
  const d = S.streak.ultimoDia ? diffDias(S.streak.ultimoDia, hoje) : 99;
  if (d === 1) S.streak.atual += 1;
  else if (d === 0) { /* mesmo dia */ }
  else S.streak.atual = 1;
  S.streak.ultimoDia = hoje;
  S.streak.recorde = Math.max(S.streak.recorde, S.streak.atual);
  salvar();
  return { subiu: true, atual: S.streak.atual };
}

/** Minutos de estudo de hoje, incluindo o tempo da sessão em curso. */
export function minutosHoje() {
  const hoje = hojeISO();
  const emCurso = S.sessao.diaSessao === hoje
    ? Math.floor((Date.now() - S.sessao.inicioMs) / 60000)
    : 0;
  return diaDe(hoje).min + emCurso;
}

/** Consolida o tempo da sessão no dia (chamado ao sair/pausar). */
export function consolidarTempo() {
  const hoje = hojeISO();
  if (S.sessao.diaSessao !== hoje) { normalizarDia(); return; }
  const min = Math.floor((Date.now() - S.sessao.inicioMs) / 60000);
  if (min > 0) {
    diaDe(hoje).min += min;
    S.sessao.inicioMs = Date.now();
    salvarJa();
  }
}

/* ---------------- Matérias / níveis ---------------- */

export function progMateria(id) {
  if (!S.materias[id]) S.materias[id] = { niveis: {}, xp: 0, q: 0, acertos: 0 };
  return S.materias[id];
}

export function progNivel(matId, nivelId) {
  const m = progMateria(matId);
  if (!m.niveis[nivelId]) {
    m.niveis[nivelId] = { estrelas: 0, melhorPct: 0, tentativas: 0, aulaLida: false, concluido: false, ultimaISO: null };
  }
  return m.niveis[nivelId];
}

/* ---------------- Histórico ---------------- */

export function registrar(evento) {
  S.historico.unshift({ ...evento, ts: Date.now(), dia: hojeISO() });
  if (S.historico.length > 250) S.historico.length = 250;
  salvar();
}

/* ---------------- Ciclo de vida ---------------- */

export function ligarPersistencia() {
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { consolidarTempo(); salvarJa(); }
    else { normalizarDia(); S.sessao.inicioMs = Date.now(); }
  });
  window.addEventListener('pagehide', () => { consolidarTempo(); salvarJa(); });
  window.addEventListener('beforeunload', () => { consolidarTempo(); salvarJa(); });
  // Consolida a cada 60 s para não perder tempo em caso de kill abrupto.
  setInterval(() => { consolidarTempo(); }, 60000);
}

export { hojeISO, diaISOMais };
