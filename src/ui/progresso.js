/* ============================================================
   Progresso — estatísticas e conquistas
   ============================================================ */

import { el, esc, pct, fmtNum, fmtDuracaoLonga, ultimosDias, hojeISO, diaSemana, DIAS_SEM, clamp } from '../util.js';
import { tela, topbar, corpo, navInferior, barra, chip, secao, vazio, pctMateria, estrelasMateria } from './components.js';
import { ir } from '../router.js';
import { som } from '../audio.js';
import { modal } from '../fx.js';
import { S, minutosHoje, progMateria } from '../state.js';
import { estatisticas, progressoPatente, PATENTES, CONQUISTAS, patenteDe } from '../gamification.js';
import { resumoSrs } from '../srs.js';
import { MATERIAS, porPeso, TOTAL_NIVEIS, TOTAL_QUESTOES, materia as buscaMateria } from '../data/index.js';

export function telaProgresso({ aba = 'numeros' } = {}) {
  const stats = estatisticas();
  const pat = progressoPatente();
  const srs = resumoSrs();

  const conteudoEl = el('div', { class: 'pad' });

  const abas = el('div', { class: 'abas' },
    ...[['numeros', '📊 Números'], ['materias', '🎴 Matérias'], ['conquistas', '🏆 Conquistas'], ['patentes', '⚜️ Patentes']]
      .map(([id, rot]) => el('button', {
        class: `chip ${id === aba ? 'chip--sakura' : ''}`,
        onclick: () => { if (id !== aba) ir('progresso', { aba: id }, { substituir: true }); },
      }, rot))
  );

  if (aba === 'numeros') montarNumeros(conteudoEl, stats, pat, srs);
  else if (aba === 'materias') montarMaterias(conteudoEl);
  else if (aba === 'conquistas') montarConquistas(conteudoEl);
  else montarPatentes(conteudoEl, pat);

  return tela(
    topbar('Meu progresso', { sub: `${pat.atual.kanji} ${pat.atual.nome}`, comVoltar: false,
      acao: el('button', { class: 'topbar__voltar', 'aria-label': 'Ajustes', onclick: () => ir('ajustes') }, '⚙') }),
    corpo(abas, conteudoEl),
    navInferior('progresso')
  );
}

/* ---------------- Números ---------------- */
function montarNumeros(raiz, stats, pat, srs) {
  raiz.appendChild(el('div', { class: 'grid-stats' },
    box(fmtNum(S.xp), 'XP total'),
    box(`${S.streak.atual}`, 'streak atual'),
    box(`${S.streak.recorde}`, 'recorde')
  ));
  raiz.appendChild(el('div', { class: 'grid-stats mt8' },
    box(fmtNum(stats.q), 'questões'),
    box(`${stats.taxa}%`, 'acerto geral'),
    box(fmtNum(stats.acertos), 'acertos')
  ));
  raiz.appendChild(el('div', { class: 'grid-stats mt8' },
    box(String(stats.diasEstudados), 'dias estudados'),
    box(fmtDuracaoLonga(stats.minutosTotais * 60), 'tempo total'),
    box(String(stats.metasBatidas), 'metas batidas')
  ));

  raiz.appendChild(secao('Constância dos últimos 28 dias'));
  const dias = ultimosDias(28);
  const heat = el('div', { class: 'heat' });
  for (const iso of dias) {
    const d = S.dias[iso];
    const q = d ? (d.q || 0) : 0;
    const min = d ? (d.min || 0) : 0;
    let n = 0;
    if (d?.metaBatida) n = 4;
    else if (q >= 20 || min >= 40) n = 3;
    else if (q >= 8 || min >= 20) n = 2;
    else if (q > 0 || min > 0) n = 1;
    heat.appendChild(el('div', {
      class: 'heat__c',
      dataset: { n: String(n) },
      title: `${iso.split('-').reverse().join('/')} · ${q} questões · ${min} min`,
    }));
  }
  raiz.appendChild(el('div', { class: 'card' },
    heat,
    el('div', { class: 'linha entre', style: { marginTop: '10px', fontSize: '11px', color: 'var(--txt-3)' } },
      el('span', { txt: 'menos' }),
      el('span', { txt: 'meta batida →' })
    )
  ));

  raiz.appendChild(secao('Memória de longo prazo'));
  raiz.appendChild(el('div', { class: 'card' },
    el('div', { class: 'srs-resumo', style: { marginBottom: '10px' } },
      el('div', { class: 'srs-cx srs-cx--urgente' }, el('div', { class: 'srs-cx__v', txt: String(srs.atrasadas) }), el('div', { class: 'srs-cx__r', txt: 'atrasadas' })),
      el('div', { class: 'srs-cx srs-cx--hoje' }, el('div', { class: 'srs-cx__v', txt: String(srs.hoje) }), el('div', { class: 'srs-cx__r', txt: 'hoje' })),
      el('div', { class: 'srs-cx' }, el('div', { class: 'srs-cx__v', txt: String(srs.aprendendo) }), el('div', { class: 'srs-cx__r', txt: 'aprendendo' })),
      el('div', { class: 'srs-cx srs-cx--dominio' }, el('div', { class: 'srs-cx__v', txt: String(srs.dominadas) }), el('div', { class: 'srs-cx__r', txt: 'dominadas' }))
    ),
    barra(pct(srs.dominadas, TOTAL_QUESTOES), { classe: 'barra--certo' }),
    el('div', { class: 'painel-xp__num' },
      el('span', { txt: `${srs.dominadas} de ${TOTAL_QUESTOES} questões dominadas` }),
      el('span', { txt: `${pct(srs.dominadas, TOTAL_QUESTOES)}%` })
    )
  ));

  raiz.appendChild(secao('Últimas atividades'));
  if (!S.historico.length) {
    raiz.appendChild(vazio('🕊️', 'Nada registrado ainda.'));
  } else {
    const NOMES = { checkpoint: 'Checkpoint', pratica: 'Prática', revisao: 'Revisão', simulado: 'Simulado', meta: 'Meta diária' };
    for (const h of S.historico.slice(0, 12)) {
      raiz.appendChild(el('div', { class: 'stats-linha' },
        el('span', { class: 'gabarito-item__n ' + ((h.pct ?? 100) >= 70 ? 'ok' : 'nok'), txt: (h.pct ?? 100) >= 70 ? '✓' : '✘' }),
        el('span', { class: 'stats-linha__nome' },
          el('div', { style: { fontSize: '13px' }, txt: NOMES[h.tipo] || h.tipo }),
          el('div', { style: { fontSize: '11px', color: 'var(--txt-3)', marginTop: '2px' },
            txt: h.tipo === 'meta' ? `${h.min} min de estudo` : `${h.acertos}/${h.total} · ${h.dia.split('-').reverse().join('/')}` })
        ),
        h.pct !== undefined ? el('span', { class: 'stats-linha__pct', txt: `${h.pct}%` }) : null
      ));
    }
  }
}

function box(valor, rot) {
  return el('div', { class: 'stat' },
    el('div', { class: 'stat__val', txt: valor }),
    el('div', { class: 'stat__rot', txt: rot })
  );
}

/* ---------------- Matérias ---------------- */
function montarMaterias(raiz) {
  raiz.appendChild(el('p', { style: { fontSize: '12.5px', color: 'var(--txt-3)', lineHeight: '1.6', margin: '4px 0 6px' },
    html: 'Ordenado por <b>aproveitamento</b>. O que está no fim da lista é onde você precisa voltar.' }));

  const linhas = MATERIAS.map((m) => {
    const p = progMateria(m.id);
    const taxa = pct(p.acertos || 0, p.q || 0);
    const prog = pctMateria(m);
    const est = estrelasMateria(m);
    return { m, taxa, prog, est, q: p.q || 0 };
  }).sort((a, b) => (a.q === 0) - (b.q === 0) || a.taxa - b.taxa);

  for (const l of linhas) {
    const card = el('button', {
      class: 'materia',
      style: { marginBottom: '10px' },
      onclick: () => ir('materia', { matId: l.m.id }),
    },
      el('span', { class: 'materia__ico', txt: l.m.ico }),
      el('span', { class: 'materia__corpo' },
        el('span', { class: 'materia__nome', txt: l.m.curto }),
        el('span', { class: 'materia__meta' },
          chip(`${l.prog.feitos}/${l.prog.total} níveis`),
          chip(l.q ? `${l.taxa}% de acerto` : 'sem questões ainda', l.q && l.taxa >= 70 ? 'chip--certo' : (l.q ? 'chip--errado' : '')),
          chip(`${l.est.ganhas}/${l.est.max} ✿`, 'chip--sakura')
        ),
        el('span', { class: 'materia__barra' }, barra(l.prog.pct, { fina: true }))
      ),
      el('span', { class: 'materia__pct', txt: `${l.prog.pct}%` })
    );
    card.style.setProperty('--cor-mat', l.m.cor);
    raiz.appendChild(card);
  }
}

/* ---------------- Conquistas ---------------- */
function montarConquistas(raiz) {
  const desbloqueadas = CONQUISTAS.filter((c) => S.badges[c.id]).length;
  raiz.appendChild(el('div', { class: 'card card--ouro', style: { marginBottom: '14px' } },
    el('div', { class: 'linha entre', style: { marginBottom: '8px' } },
      el('span', { style: { fontFamily: 'var(--f-display)', fontSize: '15px' }, txt: 'Conquistas' }),
      el('span', { class: 'painel-xp__rank', txt: `${desbloqueadas}/${CONQUISTAS.length}` })
    ),
    barra(pct(desbloqueadas, CONQUISTAS.length), { classe: 'barra--ouro' })
  ));

  const grade = el('div', { class: 'badges', style: { padding: 0 } });
  const ordenadas = [...CONQUISTAS].sort((a, b) => (!!S.badges[b.id]) - (!!S.badges[a.id]));
  for (const c of ordenadas) {
    const feito = !!S.badges[c.id];
    const b = el('button', {
      class: `badge ${feito ? 'badge--desb' : 'badge--bloq'}`,
      onclick: () => {
        som.toque();
        modal({
          titulo: `${c.ico} ${c.nome}`,
          corpo: el('div', { class: 'txt-c', style: { fontSize: '13.5px', lineHeight: '1.7', color: 'var(--txt-2)' } },
            el('p', { style: { margin: '0 0 8px' }, txt: c.desc }),
            feito
              ? el('p', { style: { color: 'var(--ouro-claro)', margin: 0 }, txt: `Conquistada em ${S.badges[c.id].split('-').reverse().join('/')}` })
              : el('p', { style: { color: 'var(--txt-3)', margin: 0, fontStyle: 'italic' }, txt: 'Ainda bloqueada. Continue.' })
          ),
          acoes: [{ rotulo: 'Fechar', classe: 'btn--fantasma' }],
        });
      },
    },
      feito && S.badges[c.id] === hojeISO() ? el('span', { class: 'badge__fita', txt: 'NOVA' }) : null,
      el('span', { class: 'badge__ico', txt: c.ico }),
      el('span', { class: 'badge__nome', txt: c.nome }),
      el('span', { class: 'badge__desc', txt: c.desc })
    );
    grade.appendChild(b);
  }
  raiz.appendChild(grade);
}

/* ---------------- Patentes ---------------- */
function montarPatentes(raiz, pat) {
  raiz.appendChild(el('p', { style: { fontSize: '12.5px', color: 'var(--txt-3)', lineHeight: '1.6', margin: '4px 0 12px' },
    html: 'As patentes seguem a hierarquia do ciclo japonês, do menor ao maior grau. Você sobe acumulando <b>XP</b> — e XP vem de aula lida, questão respondida, nível concluído, meta batida e simulado.' }));

  for (const p of PATENTES) {
    const alcancada = S.xp >= p.xp;
    const atual = p.id === pat.atual.id;
    raiz.appendChild(el('div', {
      class: `card ${atual ? 'card--ouro' : ''}`,
      style: { marginBottom: '10px', opacity: alcancada ? '1' : '.5' },
    },
      el('div', { class: 'linha g12' },
        el('span', { style: { fontFamily: 'var(--f-display)', fontSize: '30px', color: p.cor, width: '42px', textAlign: 'center' }, txt: p.kanji }),
        el('div', { class: 'crescer' },
          el('div', { class: 'linha g8' },
            el('span', { style: { fontFamily: 'var(--f-display)', fontSize: '16px', color: p.cor }, txt: p.nome }),
            atual ? chip('você está aqui', 'chip--ouro') : null,
            alcancada && !atual ? chip('alcançada', 'chip--certo') : null
          ),
          el('div', { style: { fontSize: '12px', color: 'var(--txt-3)', marginTop: '3px' }, txt: p.desc }),
          el('div', { style: { fontSize: '11.5px', color: 'var(--txt-2)', marginTop: '5px', fontFamily: 'var(--f-mono)' }, txt: `${fmtNum(p.xp)} XP` })
        )
      )
    ));
  }
}
