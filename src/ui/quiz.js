/* ============================================================
   Motor de questões — usado por checkpoint, prática,
   revisão espaçada e simulado cronometrado.
   ============================================================ */

import { el, md, esc, fmtTempo, pct, embaralhar, vibrar, clamp } from '../util.js';
import { tela, topbar, corpo, barra, chip } from './components.js';
import { ir, voltar } from '../router.js';
import { som } from '../audio.js';
import { flash, flutuar, toast, comemorar, confirmar, modal } from '../fx.js';
import { petalas } from '../petals.js';
import { S, diaDe, salvar, progMateria, registrar } from '../state.js';
import { ganharXp, XP, registrarCombo, comboAtual, conferirConquistas, conferirMeta, pulsoEstudo, extras } from '../gamification.js';
import { responder as srsResponder, ficha } from '../srs.js';
import { FALAS } from '../data/dialogues.js';
import { cenaTamayo, fala, retratoTamayo } from '../tamayo.js';
import { materia as buscaMateria } from '../data/index.js';

const LETRAS = ['A', 'B', 'C', 'D', 'E', 'F'];

/* ---------------- Sessão ---------------- */

function novaSessao(cfg) {
  return {
    cfg,
    itens: cfg.itens,
    idx: 0,
    respostas: [],
    inicio: Date.now(),
    inicioQuestao: Date.now(),
    restante: cfg.tempoSegundos || 0,
    travado: false,
    comboLocal: 0,
    xpGanho: 0,
    timer: null,
  };
}

/**
 * Abre uma sessão de questões.
 * cfg = {
 *   titulo, sub, itens:[{q, mat, niv}], modo:'checkpoint'|'pratica'|'revisao'|'simulado',
 *   tempoSegundos, feedbackImediato, aoConcluir(res), voltarPara
 * }
 */
export function telaQuiz(cfg) {
  const ses = novaSessao({
    feedbackImediato: cfg.modo !== 'simulado',
    ...cfg,
  });

  const hud = el('div', { class: 'quiz__hud' });
  const palco = el('div', { class: 'crescer' });
  const rodape = el('div', { class: 'quiz__rodape' });
  const area = el('div', { class: 'quiz' }, hud, palco, rodape);

  const raiz = tela(
    topbar(cfg.titulo, {
      sub: cfg.sub,
      comVoltar: true,
      acao: cfg.modo === 'simulado'
        ? el('button', {
            class: 'btn btn--pequeno btn--fantasma',
            onclick: () => confirmar('Encerrar simulado?', 'Você perde o tempo restante, mas mantém o que já respondeu.', () => finalizar(ses, true)),
          }, 'Encerrar')
        : null,
    }),
    el('div', { class: 'scroll scroll--pleno' }, area)
  );

  ses.el = { hud, palco, rodape, raiz };

  if (cfg.tempoSegundos) iniciarCronometro(ses);
  renderQuestao(ses);
  return raiz;
}

/* ---------------- Cronômetro ---------------- */

function iniciarCronometro(ses) {
  const cron = el('span', { class: 'quiz__cron', txt: fmtTempo(ses.restante) });
  ses.el.cron = cron;
  ses.timer = setInterval(() => {
    ses.restante -= 1;
    cron.textContent = fmtTempo(ses.restante);
    if (ses.restante <= 60) cron.classList.add('is-urgente');
    if (ses.restante === 300 || ses.restante === 60) {
      toast(ses.restante === 60 ? 'Um minuto restante. Não deixe questão em branco.' : 'Cinco minutos restantes.', { ico: '⏳', tipo: 'ouro' });
      som.tique();
    }
    if (ses.restante <= 0) {
      clearInterval(ses.timer);
      som.fimTempo();
      toast('Tempo encerrado. Prova recolhida.', { ico: '⏰', tipo: 'errado', ms: 4000 });
      finalizar(ses, true);
    }
  }, 1000);
}

function pararCronometro(ses) {
  if (ses.timer) { clearInterval(ses.timer); ses.timer = null; }
}

/* ---------------- Renderização da questão ---------------- */

function renderQuestao(ses) {
  const { palco, rodape, hud } = ses.el;
  const item = ses.itens[ses.idx];
  if (!item) { finalizar(ses); return; }

  const { q } = item;
  const mat = buscaMateria(item.mat);
  ses.inicioQuestao = Date.now();
  ses.travado = false;
  ses.escolha = null;

  /* --- HUD --- */
  hud.innerHTML = '';
  hud.appendChild(el('span', { class: 'quiz__contador', txt: `${ses.idx + 1}/${ses.itens.length}` }));
  hud.appendChild(barra(pct(ses.idx, ses.itens.length), { fina: true }));
  if (ses.el.cron) hud.appendChild(ses.el.cron);
  else if (ses.comboLocal >= 3) hud.appendChild(el('span', { class: 'chip chip--ouro nowrap', txt: `🔥 ${ses.comboLocal}` }));

  /* --- Corpo da questão --- */
  palco.innerHTML = '';
  const bloco = el('div', { class: 'questao' });

  const metaLinha = el('div', { class: 'questao__meta' },
    chip(mat ? mat.abrev : '—'),
    chip(`nível ${'▲'.repeat(q.dif || 2)}`, (q.dif || 2) >= 3 ? 'chip--errado' : ''),
    q.tipo === 'ce' ? chip('certo/errado', 'chip--sakura') : null,
    jaErrada(q.id) ? chip('já errou antes', 'chip--errado') : null
  );
  bloco.appendChild(metaLinha);

  if (q.base) bloco.appendChild(el('div', { class: 'questao__texto-base', html: md(q.base) }));
  bloco.appendChild(el('div', { class: 'questao__enunciado', html: md(q.enunciado) }));

  if (q.tipo === 'ce') {
    const cx = el('div', { class: 'ce-botoes' });
    ['Certo', 'Errado'].forEach((rot, i) => {
      const b = el('button', { class: 'ce-btn', onclick: () => escolher(ses, i, cx) },
        el('span', { class: 'ce-btn__ico', txt: i === 0 ? '✔' : '✘' }),
        el('span', { txt: rot })
      );
      b.dataset.i = i;
      cx.appendChild(b);
    });
    bloco.appendChild(cx);
    ses.el.opcoes = cx;
  } else {
    // Embaralha alternativas mantendo o rastro da correta.
    const ordem = ses.ordens?.[q.id] || (() => {
      const idxs = q.alts.map((_, i) => i);
      const o = embaralhar(idxs);
      ses.ordens = ses.ordens || {};
      ses.ordens[q.id] = o;
      return o;
    })();
    const cx = el('div', { class: 'alts' });
    ordem.forEach((origIdx, pos) => {
      const b = el('button', { class: 'alt', onclick: () => escolher(ses, origIdx, cx) },
        el('span', { class: 'alt__letra', txt: LETRAS[pos] }),
        el('span', { class: 'crescer', html: md(q.alts[origIdx]) })
      );
      b.dataset.i = origIdx;
      cx.appendChild(b);
    });
    bloco.appendChild(cx);
    ses.el.opcoes = cx;
  }

  palco.appendChild(bloco);

  /* --- Rodapé --- */
  rodape.innerHTML = '';
  const btn = el('button', { class: 'btn btn--primario btn--bloco', disabled: true, onclick: () => confirmarResposta(ses) },
    ses.cfg.modo === 'simulado' && ses.idx === ses.itens.length - 1 ? 'Responder e finalizar' : 'Responder'
  );
  ses.el.btn = btn;
  rodape.appendChild(btn);
  if (ses.cfg.modo === 'simulado') {
    rodape.appendChild(el('button', {
      class: 'btn btn--fantasma btn--bloco btn--pequeno mt8',
      onclick: () => { registrarResposta(ses, null); avancar(ses); },
    }, 'Deixar em branco e avançar'));
  }
}

function jaErrada(qid) {
  const f = S.srs[qid];
  return !!f && f.erros > 0 && f.caixa < 4;
}

function escolher(ses, i, container) {
  if (ses.travado) return;
  ses.escolha = i;
  som.toque();
  for (const b of container.children) b.classList.toggle('is-sel', Number(b.dataset.i) === i);
  ses.el.btn.disabled = false;
}

/* ---------------- Correção ---------------- */

function confirmarResposta(ses) {
  if (ses.escolha === null || ses.travado) return;
  const item = ses.itens[ses.idx];
  const acertou = ses.escolha === item.q.correta;
  registrarResposta(ses, ses.escolha);

  if (ses.cfg.feedbackImediato) mostrarFeedback(ses, acertou);
  else {
    // Simulado: sem correção na hora, apenas confirma e avança.
    som.toque();
    avancar(ses);
  }
}

function registrarResposta(ses, escolha) {
  const item = ses.itens[ses.idx];
  const { q } = item;
  const acertou = escolha !== null && escolha === q.correta;
  const seg = Math.round((Date.now() - ses.inicioQuestao) / 1000);

  ses.respostas.push({ qid: q.id, mat: item.mat, niv: item.niv, escolha, acertou, seg, dif: q.dif || 2 });
  ses.travado = true;

  // Estatísticas da matéria
  const pm = progMateria(item.mat);
  pm.q = (pm.q || 0) + 1;
  if (acertou) pm.acertos = (pm.acertos || 0) + 1;

  // Dia
  const d = diaDe();
  d.q += 1;
  if (acertou) d.acertos += 1;

  // Repetição espaçada
  const mat = buscaMateria(item.mat);
  srsResponder(q.id, acertou, { mat: item.mat, niv: item.niv, dif: q.dif || 2 });

  // Combo e XP
  const combo = registrarCombo(acertou);
  ses.comboLocal = acertou ? ses.comboLocal + 1 : 0;

  const baseXp = ses.cfg.modo === 'revisao'
    ? (acertou ? XP.revisaoAcerto : XP.revisaoErro)
    : (acertou ? XP.acerto[q.dif || 2] : XP.erro);
  const r = ganharXp(baseXp, { peso: mat ? mat.peso : 3, origem: ses.cfg.modo });
  ses.xpGanho += r.ganho;

  pulsoEstudo();
  salvar();

  ses.ultimo = { acertou, combo, xp: r, q, mat, escolha };
  return ses.ultimo;
}

function mostrarFeedback(ses, acertou) {
  const { palco, rodape } = ses.el;
  const { q, combo } = ses.ultimo;
  const container = ses.el.opcoes;
  container.classList.add('is-travado');

  for (const b of container.children) {
    const i = Number(b.dataset.i);
    b.classList.remove('is-sel');
    if (i === q.correta) b.classList.add('is-certa');
    else if (i === ses.escolha) b.classList.add('is-errada');
    else b.classList.add('is-apagada');
  }

  if (acertou) {
    som.certo();
    vibrar(30);
    flash('certo');
    const r = container.getBoundingClientRect();
    petalas.explodir(r.left + r.width / 2, r.top + 40, 18, 0.7);
    flutuar(`+${ses.ultimo.xp.ganho} XP`, window.innerWidth / 2, window.innerHeight * 0.34);
  } else {
    som.errado();
    vibrar([40, 60, 40]);
    flash('errado');
  }

  // Fala da Tamayo
  let grupo, expr;
  if (acertou) {
    if (combo >= 5 && combo % 5 === 0) { grupo = 'acertoCombo'; expr = 'orgulhosa'; }
    else if ((q.dif || 2) >= 3) { grupo = 'acertoDificil'; expr = 'orgulhosa'; }
    else { grupo = 'acerto'; expr = 'sorriso'; }
  } else {
    const errosSeguidos = contarErrosSeguidos(ses);
    const f = S.srs[q.id];
    if (errosSeguidos >= 3) { grupo = 'erroSequencia'; expr = 'preocupada'; }
    else if (f && f.erros > 1) { grupo = 'erroRepetido'; expr = 'seria'; }
    else { grupo = 'erro'; expr = 'firme'; }
  }
  const texto = fala(grupo, FALAS)
    .replace('{nome}', esc(S.perfil.nome))
    .replace('{combo}', combo)
    .replace('{seq}', contarErrosSeguidos(ses));

  const caixa = el('div', { class: `feedback feedback--${acertou ? 'certo' : 'errado'}` },
    el('div', { class: 'feedback__topo' },
      el('span', { class: 'feedback__ico', txt: acertou ? '🌸' : '🩸' }),
      el('span', { class: 'feedback__vered', txt: acertou ? 'Correto' : 'Incorreto' }),
      el('span', { class: 'crescer' }),
      acertou ? chip(`+${ses.ultimo.xp.ganho} XP`, 'chip--ouro') : null
    ),
    (() => {
      const mini = retratoTamayo(expr, { aura: false });
      mini.style.width = '56px';
      return el('div', { class: 'feedback__tamayo' }, mini, el('div', { class: 'crescer', style: { fontSize: '14px', lineHeight: '1.6' }, html: texto }));
    })(),
    el('div', { class: 'feedback__expl' },
      el('span', { class: 'rot', txt: 'Por quê' }),
      el('span', { html: md(q.expl) })
    )
  );
  palco.appendChild(caixa);
  caixa.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Rodapé: autoavaliação na revisão, avançar nos demais modos
  rodape.innerHTML = '';
  if (ses.cfg.modo === 'revisao') {
    rodape.appendChild(el('div', { class: 'autoaval' },
      botaoAuto('Difícil', 'volta amanhã', 'dificil', () => { reavaliar(ses, 1); avancar(ses); }),
      botaoAuto('Bom', 'intervalo normal', 'bom', () => { reavaliar(ses, 4); avancar(ses); }),
      botaoAuto('Fácil', 'afasta mais', 'facil', () => { reavaliar(ses, 5); avancar(ses); })
    ));
  } else {
    rodape.appendChild(el('button', {
      class: 'btn btn--primario btn--bloco',
      onclick: () => avancar(ses),
    }, ses.idx === ses.itens.length - 1 ? 'Ver resultado' : 'Continuar'));
  }

  // Conquistas conquistadas na hora
  const novas = conferirConquistas();
  for (const c of novas) anunciarConquista(c);
  const meta = conferirMeta();
  if (meta.batidaAgora) {
    toast(fala('metaBatida', FALAS).replace('{nome}', esc(S.perfil.nome)), { ico: '⏳', tipo: 'ouro', ms: 4500 });
    som.conquista();
    comemorar(1);
  }
}

function botaoAuto(titulo, sub, classe, aoClicar) {
  return el('button', { class: `autoaval__btn autoaval__btn--${classe}`, onclick: aoClicar },
    el('b', { txt: titulo }), el('span', { txt: sub })
  );
}

function reavaliar(ses, qualidade) {
  const item = ses.itens[ses.idx];
  const acertou = ses.ultimo?.acertou;
  srsResponder(item.q.id, acertou, { mat: item.mat, niv: item.niv, dif: item.q.dif || 2 }, qualidade);
}

function contarErrosSeguidos(ses) {
  let n = 0;
  for (let i = ses.respostas.length - 1; i >= 0; i--) {
    if (ses.respostas[i].acertou) break;
    n++;
  }
  return n;
}

export function anunciarConquista(c) {
  som.conquista();
  comemorar(2);
  toast(
    `<b>${esc(c.nome)}</b><br><span style="color:var(--txt-3);font-size:12px">${esc(c.desc)}</span>`,
    { ico: c.ico, tipo: 'ouro', ms: 5000 }
  );
}

/* ---------------- Avanço e fim ---------------- */

function avancar(ses) {
  ses.idx += 1;
  if (ses.idx >= ses.itens.length) finalizar(ses);
  else renderQuestao(ses);
}

function finalizar(ses, interrompido = false) {
  pararCronometro(ses);
  const total = ses.itens.length;
  const respondidas = ses.respostas.length;
  const acertos = ses.respostas.filter((r) => r.acertou).length;
  const segundos = Math.round((Date.now() - ses.inicio) / 1000);
  const percentual = pct(acertos, ses.cfg.modo === 'simulado' ? total : Math.max(respondidas, 1));

  const res = {
    modo: ses.cfg.modo,
    total, respondidas, acertos, percentual, segundos,
    xp: ses.xpGanho,
    respostas: ses.respostas,
    itens: ses.itens,
    interrompido,
    cfg: ses.cfg,
  };

  registrar({ tipo: ses.cfg.modo, pct: percentual, acertos, total: respondidas, seg: segundos });
  const novas = conferirConquistas();
  ir('resultado', { res, novas });
}
