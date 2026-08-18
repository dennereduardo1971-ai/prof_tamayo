/* ============================================================
   Simulado cronometrado — estilo prova
   ============================================================ */

import { el, esc, fmtTempo, fmtDuracaoLonga, pct, embaralhar } from '../util.js';
import { tela, topbar, corpo, navInferior, barra, chip, secao, vazio } from './components.js';
import { ir } from '../router.js';
import { som } from '../audio.js';
import { modal } from '../fx.js';
import { S } from '../state.js';
import { MATERIAS, distribuirPorPeso, materia as buscaMateria, BLOCOS } from '../data/index.js';
import { sortearPonderado } from '../srs.js';
import { FALAS } from '../data/dialogues.js';
import { cenaTamayo, fala } from '../tamayo.js';
import { estatisticas } from '../gamification.js';

const MODELOS = [
  { id: 'curto', ico: '⚡', tit: 'Diagnóstico rápido', sub: '20 questões · 50 min · todas as matérias, proporcional ao peso', n: 20, minPorQ: 2.5 },
  { id: 'medio', ico: '📝', tit: 'Simulado padrão', sub: '40 questões · 1h40 · distribuição do edital', n: 40, minPorQ: 2.5 },
  { id: 'longo', ico: '🏛️', tit: 'Prova completa', sub: '60 questões · 3h · maratona de resistência', n: 60, minPorQ: 3 },
  { id: 'basicos', ico: '📚', tit: 'Só conhecimentos básicos', sub: '30 questões · 1h15', n: 30, minPorQ: 2.5, bloco: 'basicos' },
  { id: 'especificos', ico: '⚖️', tit: 'Só conhecimentos específicos', sub: '30 questões · 1h15', n: 30, minPorQ: 2.5, bloco: 'especificos' },
];

export function telaSimulado() {
  const stats = estatisticas();
  const texto = fala('simuladoInicio', FALAS).replace('{nome}', esc(S.perfil.nome));
  const { cena } = cenaTamayo('firme', texto, { largura: 92, digitando: true });

  let selecionado = MODELOS[1].id;

  const lista = el('div', {});
  const cartoes = MODELOS.map((m) => {
    const c = el('button', {
      class: `sim-opcao ${m.id === selecionado ? 'is-sel' : ''}`,
      onclick: () => {
        selecionado = m.id;
        som.toque();
        cartoes.forEach((cc, i) => cc.classList.toggle('is-sel', MODELOS[i].id === selecionado));
      },
    },
      el('span', { class: 'sim-opcao__ico', txt: m.ico }),
      el('span', { class: 'crescer' },
        el('span', { class: 'sim-opcao__tit', txt: m.tit }),
        el('span', { class: 'sim-opcao__sub', txt: m.sub })
      )
    );
    lista.appendChild(c);
    return c;
  });

  const conteudo = el('div', { class: 'simulado-cfg' },
    cena,
    el('div', { style: { marginTop: '16px' } }, lista),
    el('button', {
      class: 'btn btn--primario btn--bloco mt16',
      onclick: () => iniciar(MODELOS.find((m) => m.id === selecionado)),
    }, 'Começar simulado'),
    el('p', { style: { fontSize: '11.5px', color: 'var(--txt-3)', textAlign: 'center', marginTop: '12px', lineHeight: '1.6' },
      html: 'Sem correção durante a prova. O gabarito comentado aparece no fim, e tudo o que você errar entra na <b>revisão espaçada</b>.' }),
    historico(stats)
  );

  return tela(
    topbar('Simulado', { sub: 'estilo prova, com cronômetro', comVoltar: false }),
    corpo(conteudo),
    navInferior('simulado')
  );
}

function iniciar(modelo) {
  const universo = modelo.bloco ? MATERIAS.filter((m) => m.bloco === modelo.bloco) : MATERIAS;
  const dist = distribuirPorPeso(modelo.n, universo);

  const itens = [];
  for (const { mat, n } of dist) {
    const pool = [];
    for (const niv of mat.niveis) for (const q of niv.questoes) pool.push({ q, mat: mat.id, niv: niv.id });
    itens.push(...sortearPonderado(pool, Math.min(n, pool.length), (x) => x.q.id));
  }

  const finais = embaralhar(itens);
  const segundos = Math.round(finais.length * modelo.minPorQ * 60);

  modal({
    titulo: 'Pronta?',
    corpo: el('div', { style: { fontSize: '13.5px', lineHeight: '1.7', color: 'var(--txt-2)' } },
      el('p', { style: { margin: '0 0 10px' }, html: `<b>${finais.length} questões</b> · <b>${fmtDuracaoLonga(segundos)}</b> de prova.` }),
      el('div', { class: 'linha g6', style: { flexWrap: 'wrap', marginBottom: '10px' } },
        ...dist.map((d) => chip(`${d.mat.abrev} ${d.n}`))
      ),
      el('p', { style: { margin: 0, fontStyle: 'italic', color: 'var(--txt-3)' }, txt: 'Celular longe, porta fechada, coluna ereta. O cronômetro começa quando você toca em Começar.' })
    ),
    acoes: [
      { rotulo: 'Começar', classe: 'btn--primario', acao: () => {
        ir('quiz', {
          titulo: 'Simulado',
          sub: `${finais.length} questões · ${fmtDuracaoLonga(segundos)}`,
          itens: finais,
          modo: 'simulado',
          tempoSegundos: segundos,
        });
      } },
      { rotulo: 'Ainda não', classe: 'btn--fantasma' },
    ],
  });
}

function historico(stats) {
  if (!S.simulados.length) return null;
  const wrap = el('div', {}, secao(`Histórico · ${S.simulados.length} simulado${S.simulados.length > 1 ? 's' : ''}`));

  const alturas = S.simulados.slice(0, 10).reverse();
  const graf = el('div', { class: 'grafico-barras' });
  const barras = alturas.map(() => el('div', { class: 'grafico-barras__b' }));
  barras.forEach((b) => graf.appendChild(b));
  requestAnimationFrame(() => {
    alturas.forEach((s, i) => { barras[i].style.height = `${Math.max(4, s.pct)}%`; });
  });

  wrap.appendChild(el('div', { class: 'card' },
    el('div', { class: 'linha entre', style: { marginBottom: '4px' } },
      el('span', { style: { fontSize: '12px', color: 'var(--txt-3)' }, txt: 'últimos resultados (%)' }),
      el('span', { class: 'painel-xp__rank', txt: `melhor ${stats.melhorSimulado}%` })
    ),
    graf,
    el('div', { class: 'grafico-rot' }, ...alturas.map((s) => el('span', { txt: `${s.pct}` })))
  ));

  for (const s of S.simulados.slice(0, 5)) {
    wrap.appendChild(el('div', { class: 'stats-linha' },
      el('span', { class: 'gabarito-item__n ' + (s.pct >= 70 ? 'ok' : 'nok'), txt: s.pct >= 70 ? '✓' : '✘' }),
      el('span', { class: 'stats-linha__nome' },
        el('div', { style: { fontSize: '13px' }, txt: `${s.acertos}/${s.total} acertos` }),
        el('div', { style: { fontSize: '11px', color: 'var(--txt-3)', marginTop: '2px' }, txt: `${s.data.split('-').reverse().join('/')} · ${fmtTempo(s.seg)}` })
      ),
      el('span', { class: 'stats-linha__pct', txt: `${s.pct}%` })
    ));
  }
  return wrap;
}
