/* ============================================================
   Progresso — estatísticas e conquistas
   ============================================================ */

import { el, pct, fmtNum, fmtDuracaoLonga, fmtDataBR, ultimosDias, hojeISO } from '../util.js';
import { tela, topbar, corpo, navInferior, barra, chip, secao, vazio } from './components.js';
import { ir } from '../router.js';
import { som } from '../audio.js';
import { modal } from '../fx.js';
import { S } from '../state.js';
import { estatisticas, progressoPatente, PATENTES, CONQUISTAS, contagemProva, ritmoEdital, prioridadeMaterias } from '../gamification.js';
import { resumoSrs, resumoErros } from '../srs.js';
import { TOTAL_QUESTOES } from '../data/index.js';

export function telaProgresso({ aba = 'numeros' } = {}) {
  const stats = estatisticas();
  const pat = progressoPatente();
  const srs = resumoSrs();

  const conteudoEl = el('div', { class: 'pad' });

  const abas = el('div', { class: 'abas' },
    ...[['numeros', '📊 Números'], ['prova', '📅 A prova'], ['materias', '🎴 Prioridade'], ['conquistas', '🏆 Conquistas'], ['patentes', '⚜️ Patentes']]
      .map(([id, rot]) => el('button', {
        class: `chip ${id === aba ? 'chip--sakura' : ''}`,
        onclick: () => { if (id !== aba) ir('progresso', { aba: id }, { substituir: true }); },
      }, rot))
  );

  if (aba === 'numeros') montarNumeros(conteudoEl, stats, pat, srs);
  else if (aba === 'prova') montarProva(conteudoEl);
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

/* ---------------- A prova: quanto falta e dá tempo ---------------- */
function montarProva(raiz) {
  const cp = contagemProva();
  const r = ritmoEdital();

  if (!cp) {
    raiz.appendChild(el('div', { class: 'calib__aviso' },
      'Você ainda não definiu a <b>data da prova</b>. Sem prazo não há previsão de conclusão nem cobrança de ritmo — e é justamente essa cobrança que impede a preparação de escorregar.'
    ));
    raiz.appendChild(el('button', {
      class: 'btn btn--primario btn--bloco mt8',
      onclick: () => ir('ajustes'),
    }, 'Definir a data da prova'));
  } else {
    raiz.appendChild(el('div', { class: 'grid-stats' },
      box(cp.passou ? '—' : String(cp.dias), 'dias para a prova'),
      box(`${r.pct}%`, 'do edital'),
      box(String(r.restantes), 'níveis restantes')
    ));
    raiz.appendChild(el('p', { style: { fontSize: '11.5px', color: 'var(--txt-3)', textAlign: 'center', margin: '8px 0 0' },
      txt: `prova marcada para ${fmtDataBR(cp.iso)}` }));
  }

  raiz.appendChild(secao('Conclusão do edital'));
  raiz.appendChild(el('div', { class: 'card' },
    barra(r.pct, { classe: 'barra--ouro' }),
    el('div', { class: 'painel-xp__num' },
      el('span', { txt: `${r.niveisFeitos} de ${r.niveisTotal} níveis` }),
      el('span', { txt: `${r.pct}% ponderado por peso` })
    ),
    el('p', { style: { fontSize: '12px', color: 'var(--txt-3)', margin: '10px 0 0', lineHeight: '1.6' },
      html: `Este percentual é <b>ponderado pelo peso</b>: terminar uma matéria de peso 5 move mais o ponteiro do que terminar uma de peso 2 — porque na prova vale mesmo. Sem ponderação você está em <b>${r.pctSimples}%</b>.` })
  ));

  raiz.appendChild(secao('Ritmo'));
  const linhas = [
    ['Níveis concluídos nos últimos 28 dias', String(r.feitosJanela)],
    ['Seu ritmo atual', r.ritmoDia > 0 ? `${(r.ritmoDia * 7).toFixed(1).replace('.0', '')} níveis por semana` : 'ainda sem dados'],
    ['Ritmo necessário até a prova', r.necessarioDia ? `${(r.necessarioDia * 7).toFixed(1).replace('.0', '')} níveis por semana` : '—'],
    ['Previsão de conclusão', r.previsaoISO ? fmtDataBR(r.previsaoISO) : 'indefinida'],
  ];
  raiz.appendChild(el('div', { class: 'card' },
    ...linhas.map(([rot, val]) => el('div', { class: 'linha entre g8', style: { padding: '7px 0', fontSize: '13px' } },
      el('span', { style: { color: 'var(--txt-3)' }, txt: rot }),
      el('span', { style: { fontFamily: 'var(--f-mono)', fontSize: '12.5px', textAlign: 'right' }, txt: val })
    ))
  ));

  const VEREDITOS = {
    'em-dia': ['em-dia', '✓ A conta fecha. No ritmo atual você termina o edital com folga para revisar.'],
    apertado: ['apertado', '⚠ Fecha em cima da hora. Sem margem para imprevisto nem para revisão final — um degrau a mais por semana resolve.'],
    atrasado: ['atrasado', '✘ A conta <b>não</b> fecha. No ritmo atual o edital não termina antes da prova. Ou sobe o ritmo, ou escolhemos o que sacrificar — e essa escolha é melhor feita agora do que na véspera.'],
    'sem-dados': ['', 'Ainda não há níveis concluídos suficientes para medir ritmo.'],
    concluido: ['em-dia', '✓ Edital concluído. Daqui até a prova é revisão, simulado e lei seca.'],
    'sem-data': ['', 'Defina a data da prova para eu calcular a previsão.'],
    passou: ['', 'A data marcada já passou. Atualize em Ajustes.'],
  };
  const [classe, texto] = VEREDITOS[r.veredito] || ['', ''];
  if (texto) raiz.appendChild(el('div', { class: `prova__veredito ${classe ? `prova__veredito--${classe}` : ''}`, style: { marginTop: '14px' }, html: texto }));

  /* Caderno de erros como porta de saída natural */
  const err = resumoErros();
  if (err.total) {
    raiz.appendChild(secao('Caderno de erros'));
    raiz.appendChild(el('button', {
      class: 'acao',
      style: { width: '100%', textAlign: 'left' },
      onclick: () => ir('caderno'),
    },
      el('span', { class: 'acao__ico', txt: '📓' }),
      el('span', { class: 'acao__tit', txt: `${err.abertos} erros ainda em aberto` }),
      el('span', { class: 'acao__sub', txt: `${err.fechados} já fechados · ${err.reincidentes} reincidentes` })
    ));
  }
}

/* ---------------- Matérias por prioridade ---------------- */
function montarMaterias(raiz) {
  raiz.appendChild(el('p', { style: { fontSize: '12.5px', color: 'var(--txt-3)', lineHeight: '1.6', margin: '4px 0 10px' },
    html: 'Uma fórmula só para "o que eu estudo agora?": <b>peso da matéria</b> × <b>o quanto ela ainda dói</b> × <b>o quanto falta dela</b>, com empurrão do que está vencido na revisão. O topo da lista é onde seu próximo minuto rende mais.' }));

  const linhas = prioridadeMaterias();
  linhas.forEach((l, i) => {
    const cartao = el('button', {
      class: 'prio__linha',
      onclick: () => ir('materia', { matId: l.mat.id }),
    },
      el('span', { class: 'prio__pos', txt: String(i + 1) }),
      el('span', { style: { fontSize: '20px' }, txt: l.mat.ico }),
      el('span', { class: 'crescer', style: { minWidth: 0 } },
        el('span', { style: { display: 'block', fontSize: '13.5px', fontWeight: '650' }, txt: l.mat.curto }),
        el('span', { class: 'linha g6', style: { flexWrap: 'wrap', marginTop: '4px' } },
          chip(`peso ${l.mat.peso}`, l.mat.peso >= 5 ? 'chip--peso5' : ''),
          chip(`${l.feitos}/${l.total} níveis`),
          l.q ? chip(`${l.taxa}%`, l.taxa >= 70 ? 'chip--certo' : 'chip--errado') : chip('sem histórico'),
          l.vencidas ? chip(`${l.vencidas} vencidas`, 'chip--errado') : null
        )
      ),
      el('span', { class: 'prio__barra' }, barra(l.indice, { fina: true, classe: i === 0 ? '' : 'barra--fina' })),
      el('span', { class: 'prio__val', txt: `${l.indice}` })
    );
    cartao.style.setProperty('--cor-mat', l.mat.cor);
    raiz.appendChild(cartao);
  });
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
