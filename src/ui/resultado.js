/* ============================================================
   Tela de resultado — checkpoint, prática, revisão e simulado
   ============================================================ */

import { el, md, esc, fmtTempo, fmtDuracaoLonga, pct, clamp, contarAte } from '../util.js';
import { tela, topbar, corpo, barra, chip, secao, estrelas } from './components.js';
import { ir, voltar, limparPilha } from '../router.js';
import { som } from '../audio.js';
import { comemorar, toast, modal, flutuar } from '../fx.js';
import { petalas } from '../petals.js';
import { S, progNivel, progMateria, salvar, registrar, hojeISO } from '../state.js';
import { ganharXp, XP, extras, conferirConquistas, patenteDe, progressoPatente } from '../gamification.js';
import { FALAS } from '../data/dialogues.js';
import { cenaTamayo, fala, retratoTamayo } from '../tamayo.js';
import { materia as buscaMateria, nivel as buscaNivel, MATERIAS } from '../data/index.js';
import { anunciarConquista } from './quiz.js';

const LIMITE_APROVACAO = 70;

function estrelasPor(p) {
  if (p >= 100) return 3;
  if (p >= 85) return 2;
  if (p >= LIMITE_APROVACAO) return 1;
  return 0;
}

export function telaResultado({ res, novas = [] }) {
  const aprovado = res.percentual >= LIMITE_APROVACAO;
  const est = estrelasPor(res.percentual);

  /* ---- Efeitos colaterais de progressão (uma vez) ---- */
  let subiuNivel = false;
  let materiaCompletaAgora = null;
  let xpBonus = 0;
  let patenteNova = null;

  if (res.modo === 'checkpoint' && res.cfg.matId && res.cfg.nivId) {
    const pn = progNivel(res.cfg.matId, res.cfg.nivId);
    pn.tentativas += 1;
    pn.ultimaISO = hojeISO();
    pn.melhorPct = Math.max(pn.melhorPct, res.percentual);
    const antes = pn.estrelas;
    pn.estrelas = Math.max(pn.estrelas, est);

    if (aprovado && !pn.concluido) {
      pn.concluido = true;
      subiuNivel = true;
      const x = extras();
      x.niveisConcluidos += 1;
      if (est === 3) x.niveis3 += 1;
      if (res.percentual === 100) x.checkpoint100 += 1;

      const mat = buscaMateria(res.cfg.matId);
      const r = ganharXp(XP.nivelBase + est * XP.porEstrela, { peso: mat.peso, origem: 'nivel' });
      xpBonus = r.ganho;
      if (r.subiuPatente) patenteNova = r.patente;

      // Matéria completa?
      const p = progMateria(mat.id);
      const todos = mat.niveis.every((n) => p.niveis[n.id]?.concluido);
      if (todos) {
        x.materiasCompletas = MATERIAS.filter((m) => {
          const pp = progMateria(m.id);
          return m.niveis.every((n) => pp.niveis[n.id]?.concluido);
        }).length;
        x.totalMaterias = MATERIAS.length;
        materiaCompletaAgora = mat;
      }
    } else if (aprovado && est > antes) {
      const mat = buscaMateria(res.cfg.matId);
      const r = ganharXp((est - antes) * XP.porEstrela, { peso: mat.peso, origem: 'estrela' });
      xpBonus = r.ganho;
      if (r.subiuPatente) patenteNova = r.patente;
    }
    salvar();
  }

  if (res.modo === 'simulado') {
    const porMateria = {};
    for (const r of res.respostas) {
      if (!porMateria[r.mat]) porMateria[r.mat] = { q: 0, acertos: 0 };
      porMateria[r.mat].q += 1;
      if (r.acertou) porMateria[r.mat].acertos += 1;
    }
    S.simulados.unshift({
      data: hojeISO(), pct: res.percentual, acertos: res.acertos,
      total: res.total, seg: res.segundos, porMateria,
    });
    if (S.simulados.length > 40) S.simulados.length = 40;
    const r = ganharXp(XP.simulado + Math.round(res.percentual / 2), { origem: 'simulado' });
    xpBonus = r.ganho;
    if (r.subiuPatente) patenteNova = r.patente;
    salvar();
  }

  const maisNovas = [...novas, ...conferirConquistas()];

  /* ---- Comemoração ---- */
  /* Os efeitos atrasados só disparam se a Sara ainda estiver nesta tela —
     senão um modal apareceria por cima da tela seguinte. */
  const aindaAqui = () => raiz.isConnected;
  const comemorarDepois = () => {
    if (res.modo === 'checkpoint' && aprovado) {
      som.nivel();
      comemorar(est >= 3 ? 2 : 1);
    } else if (aprovado) {
      som.xp();
      petalas.chuva(24);
    }
    maisNovas.forEach((c, i) => setTimeout(() => { if (aindaAqui()) anunciarConquista(c); }, 700 + i * 1100));
    if (patenteNova) setTimeout(() => { if (aindaAqui()) mostrarPatente(patenteNova); }, 1200);
    if (materiaCompletaAgora) {
      setTimeout(() => {
        if (!aindaAqui()) return;
        modal({
          titulo: '🎴 Território conquistado',
          corpo: el('div', { class: 'subiu' },
            el('span', { class: 'subiu__ico', txt: materiaCompletaAgora.ico }),
            el('p', { class: 'subiu__txt', html: fala('materiaConcluida', FALAS).replace('{materia}', esc(materiaCompletaAgora.nome)) })
          ),
          acoes: [{ rotulo: 'Continuar a trilha', classe: 'btn--primario' }],
        });
        som.conquista();
        comemorar(2);
      }, 1900);
    }
  };

  /* ---- Texto da Tamayo ---- */
  let grupo, expr;
  if (res.modo === 'simulado') { grupo = 'simuladoFim'; expr = res.percentual >= 70 ? 'orgulhosa' : 'seria'; }
  else if (res.percentual >= 85) { grupo = 'fimExcelente'; expr = 'orgulhosa'; }
  else if (aprovado) { grupo = 'fimBom'; expr = 'sorriso'; }
  else { grupo = 'fimFraco'; expr = 'firme'; }
  const texto = fala(grupo, FALAS)
    .replace('{pct}', res.percentual)
    .replace('{nome}', esc(S.perfil.nome));

  /* ---- Montagem da tela ---- */
  const titulo = {
    checkpoint: aprovado ? 'Nível concluído' : 'Nível não concluído',
    pratica: 'Prática encerrada',
    revisao: 'Revisão encerrada',
    simulado: res.interrompido ? 'Simulado encerrado' : 'Simulado concluído',
  }[res.modo] || 'Resultado';

  const conteudo = el('div', { class: 'resultado' },
    anelResultado(res.percentual, est),
    el('h1', { class: 'resultado__tit', txt: titulo }),
    res.modo === 'checkpoint'
      ? el('div', { class: 'resultado__estrelas' },
          ...[0, 1, 2].map((i) => el('span', { txt: i < est ? '✿' : '❁', style: { opacity: i < est ? 1 : 0.28 } }))
        )
      : null,
    el('div', { class: 'resultado__linhas' },
      caixa(`${res.acertos}/${res.modo === 'simulado' ? res.total : res.respondidas}`, 'acertos'),
      caixa(`${res.percentual}%`, 'aproveitamento'),
      caixa(fmtTempo(res.segundos), 'tempo')
    ),
    el('div', { class: 'card card--ouro', style: { marginBottom: '14px' } },
      el('div', { class: 'linha entre g8' },
        el('span', { style: { fontSize: '13px', color: 'var(--txt-3)', letterSpacing: '.08em', textTransform: 'uppercase' }, txt: 'XP da sessão' }),
        el('span', { class: 'painel-xp__rank', txt: `+${res.xp + xpBonus}` })
      ),
      xpBonus > 0 ? el('div', { style: { fontSize: '12px', color: 'var(--txt-3)', marginTop: '4px' }, txt: `inclui bônus de ${xpBonus} XP pela conclusão` }) : null
    ),
    (() => {
      const { cena } = cenaTamayo(expr, texto, { largura: 84, digitando: true });
      cena.style.textAlign = 'left';
      cena.style.marginBottom = '16px';
      return cena;
    })(),
    res.modo === 'simulado' ? blocoPorMateria(res) : null,
    res.respostas.some((r) => !r.acertou) ? blocoErros(res) : null,
    acoes(res, aprovado)
  );

  const raiz = tela(
    topbar('Resultado', { sub: res.cfg.sub || res.cfg.titulo || '', comVoltar: false }),
    corpo({ semNav: true }, conteudo)
  );
  requestAnimationFrame(comemorarDepois);
  return raiz;
}

function caixa(valor, rot) {
  return el('div', { class: 'stat' },
    el('div', { class: 'stat__val', txt: valor }),
    el('div', { class: 'stat__rot', txt: rot })
  );
}

function anelResultado(p, est) {
  const R = 66, C = 2 * Math.PI * R;
  const cor = p >= 85 ? 'var(--certo)' : p >= LIMITE_APROVACAO ? 'var(--ouro)' : 'var(--errado)';
  const wrap = el('div', { class: 'resultado__selo' });
  wrap.innerHTML = `
    <svg class="resultado__anel" viewBox="0 0 150 150">
      <circle cx="75" cy="75" r="${R}" fill="none" stroke="rgba(255,255,255,.08)" stroke-width="9"/>
      <circle id="anelProg" cx="75" cy="75" r="${R}" fill="none" stroke="${cor}" stroke-width="9"
        stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}"
        style="transition:stroke-dashoffset 1.1s cubic-bezier(.2,.9,.3,1); filter:drop-shadow(0 0 8px ${cor})"/>
    </svg>`;
  const num = el('div', { class: 'resultado__pct' }, el('span', { txt: '0%' }), el('small', { txt: 'aproveitamento' }));
  wrap.appendChild(num);
  requestAnimationFrame(() => {
    const arco = wrap.querySelector('#anelProg');
    if (arco) arco.style.strokeDashoffset = String(C - (C * clamp(p, 0, 100)) / 100);
    contarAte(0, p, 1100, (v) => { num.firstElementChild.textContent = `${v}%`; });
  });
  return wrap;
}

function blocoPorMateria(res) {
  const porMat = {};
  for (const r of res.respostas) {
    if (!porMat[r.mat]) porMat[r.mat] = { q: 0, acertos: 0 };
    porMat[r.mat].q += 1;
    if (r.acertou) porMat[r.mat].acertos += 1;
  }
  const linhas = Object.entries(porMat)
    .map(([id, v]) => ({ mat: buscaMateria(id), ...v, p: pct(v.acertos, v.q) }))
    .sort((a, b) => a.p - b.p);

  return el('div', { style: { textAlign: 'left' } },
    secao('Desempenho por matéria'),
    ...linhas.map((l) => el('div', { class: 'stats-linha' },
      el('span', { txt: l.mat ? l.mat.ico : '•' }),
      el('span', { class: 'stats-linha__nome', txt: l.mat ? l.mat.curto : l.mat }),
      el('span', { class: 'stats-linha__barra' }, barra(l.p, { fina: true, classe: l.p >= 70 ? 'barra--certo' : '' })),
      el('span', { class: 'stats-linha__pct', txt: `${l.p}%` })
    ))
  );
}

function blocoErros(res) {
  const erradas = res.respostas.filter((r) => !r.acertou);
  const wrap = el('div', { style: { textAlign: 'left' } }, secao(`Gabarito comentado — ${erradas.length} para revisar`));
  for (const r of erradas) {
    const item = res.itens.find((i) => i.q.id === r.qid);
    if (!item) continue;
    const { q } = item;
    const mat = buscaMateria(r.mat);
    const detalhe = el('div', {
      style: { display: 'none', fontSize: '13px', lineHeight: '1.65', marginTop: '8px', color: 'var(--txt-2)' },
    },
      el('div', { style: { marginBottom: '6px' }, html: md(q.enunciado) }),
      el('div', { style: { color: 'var(--certo)', marginBottom: '6px' }, html: `<b>Correta:</b> ${md(q.tipo === 'ce' ? (q.correta === 0 ? 'Certo' : 'Errado') : q.alts[q.correta])}` }),
      el('div', { html: md(q.expl) })
    );
    const linha = el('button', {
      class: 'gabarito-item',
      onclick: () => {
        const aberto = detalhe.style.display !== 'none';
        detalhe.style.display = aberto ? 'none' : 'block';
        som.toque();
      },
    },
      el('span', { class: 'gabarito-item__n nok', txt: '✘' }),
      el('span', { class: 'crescer' },
        el('span', { class: 'gabarito-item__txt', txt: `${mat ? mat.abrev : ''} · ${(q.tags || []).join(', ') || 'questão'}` }),
        detalhe
      )
    );
    wrap.appendChild(linha);
  }
  return wrap;
}

function acoes(res, aprovado) {
  const cx = el('div', { class: 'resultado__acoes' });
  const cfg = res.cfg;

  if (res.modo === 'checkpoint') {
    const mat = buscaMateria(cfg.matId);
    const idx = mat.niveis.findIndex((n) => n.id === cfg.nivId);
    const prox = mat.niveis[idx + 1];

    if (aprovado && prox) {
      cx.appendChild(el('button', {
        class: 'btn btn--primario btn--bloco',
        onclick: () => { limparPilha(); ir('materia', { matId: mat.id }); setTimeout(() => ir('aula', { matId: mat.id, nivId: prox.id }), 60); },
      }, `Abrir nível ${idx + 2} →`));
    }
    if (!aprovado) {
      cx.appendChild(el('button', {
        class: 'btn btn--primario btn--bloco',
        onclick: () => ir('aula', { matId: cfg.matId, nivId: cfg.nivId }, { substituir: true }),
      }, 'Reler a aula'));
      cx.appendChild(el('button', {
        class: 'btn btn--fantasma btn--bloco',
        onclick: () => ir('checkpoint', { matId: cfg.matId, nivId: cfg.nivId }, { substituir: true }),
      }, 'Tentar o checkpoint de novo'));
    } else {
      cx.appendChild(el('button', {
        class: 'btn btn--fantasma btn--bloco',
        onclick: () => ir('checkpoint', { matId: cfg.matId, nivId: cfg.nivId }, { substituir: true }),
      }, res.percentual === 100 ? 'Refazer para treinar' : 'Refazer para buscar 3 flores'));
    }
    cx.appendChild(el('button', {
      class: 'btn btn--fantasma btn--bloco',
      onclick: () => { limparPilha(); ir('materia', { matId: cfg.matId }, { semPilha: true }); },
    }, 'Voltar à trilha da matéria'));
  } else {
    cx.appendChild(el('button', {
      class: 'btn btn--primario btn--bloco',
      onclick: () => { limparPilha(); ir('home', {}, { semPilha: true }); },
    }, 'Voltar ao dojo'));
    if (res.modo === 'revisao') {
      cx.appendChild(el('button', {
        class: 'btn btn--fantasma btn--bloco',
        onclick: () => { limparPilha(); ir('revisao', {}, { semPilha: true }); },
      }, 'Continuar revisando'));
    }
    if (res.modo === 'simulado') {
      cx.appendChild(el('button', {
        class: 'btn btn--fantasma btn--bloco',
        onclick: () => { limparPilha(); ir('simulado', {}, { semPilha: true }); },
      }, 'Montar outro simulado'));
    }
  }
  return cx;
}

function mostrarPatente(p) {
  som.conquista();
  modal({
    titulo: 'Nova patente',
    corpo: el('div', { class: 'subiu' },
      el('span', { class: 'subiu__ico', txt: p.kanji, style: { color: p.cor, fontFamily: 'var(--f-display)' } }),
      el('div', { class: 'subiu__rank', txt: p.nome, style: { color: p.cor } }),
      el('p', { class: 'subiu__txt', html: fala('subiuRank', FALAS).replace('{rank}', esc(p.nome)) }),
      el('p', { class: 'subiu__txt', style: { marginTop: '8px', fontStyle: 'italic', opacity: '.8' }, txt: p.desc })
    ),
    acoes: [{ rotulo: 'Seguir em frente', classe: 'btn--ouro' }],
  });
}

export { estrelasPor, LIMITE_APROVACAO };
