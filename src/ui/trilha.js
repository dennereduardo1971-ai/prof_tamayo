/* ============================================================
   Trilha — lista de matérias e mapa de níveis
   ============================================================ */

import { el, md, esc, pct, embaralhar } from '../util.js';
import { tela, topbar, corpo, navInferior, barra, chip, secao, cartaoMateria, pctMateria, estrelasMateria, nivelLiberado, proximoNivel, pesoPontos, vazio } from './components.js';
import { ir } from '../router.js';
import { som } from '../audio.js';
import { toast } from '../fx.js';
import { S, progNivel, progMateria } from '../state.js';
import { MATERIAS, BLOCOS, porPeso, materia as buscaMateria } from '../data/index.js';
import { FALAS, FALAS_MATERIA } from '../data/dialogues.js';
import { cenaTamayo, fala } from '../tamayo.js';
import { resumoSrs } from '../srs.js';

/* ------------------------------------------------------------
   Tela 1 — todas as matérias, agrupadas por bloco do edital
   ------------------------------------------------------------ */
export function telaTrilha() {
  const total = MATERIAS.reduce((a, m) => a + m.niveis.length, 0);
  const feitos = MATERIAS.reduce((a, m) => a + pctMateria(m).feitos, 0);
  const geral = pct(feitos, total);

  const cabecalho = el('div', { class: 'card card--sakura', style: { margin: '0 16px 4px' } },
    el('div', { class: 'card__brilho' }),
    el('div', { class: 'linha entre g8', style: { marginBottom: '9px' } },
      el('span', { style: { fontFamily: 'var(--f-display)', fontSize: '15px', letterSpacing: '.05em' }, txt: 'Progresso no edital' }),
      el('span', { class: 'painel-xp__rank', txt: `${geral}%` })
    ),
    barra(geral),
    el('div', { class: 'painel-xp__num' },
      el('span', { txt: `${feitos} de ${total} níveis concluídos` }),
      el('span', { txt: `${MATERIAS.length} matérias` })
    )
  );

  const conteudo = el('div', {}, cabecalho);

  for (const [chave, rotulo] of Object.entries(BLOCOS)) {
    const doBloco = porPeso().filter((m) => m.bloco === chave);
    if (!doBloco.length) continue;
    conteudo.appendChild(el('div', { class: 'pad' }, secao(rotulo)));
    conteudo.appendChild(el('div', { class: 'materias stagger' },
      ...doBloco.map((m) => cartaoMateria(m, (mm) => ir('materia', { matId: mm.id })))
    ));
  }

  conteudo.appendChild(el('div', { class: 'pad mt24' },
    el('p', { style: { fontSize: '11.5px', lineHeight: '1.7', color: 'var(--txt-3)' },
      html: 'A ordem segue o <b>peso</b> de cada matéria — os pontos que mais valem aparecem primeiro. Os pesos e os tópicos foram montados a partir do escopo histórico do cargo e podem ser ajustados quando o edital oficial sair.' })
  ));

  return tela(
    topbar('Trilha de estudos', { sub: 'Analista Legislativo · Câmara dos Deputados', comVoltar: false }),
    corpo(conteudo),
    navInferior('trilha')
  );
}

/* ------------------------------------------------------------
   Tela 2 — mapa de níveis de uma matéria
   ------------------------------------------------------------ */
export function telaMateria({ matId }) {
  const mat = buscaMateria(matId);
  if (!mat) return tela(topbar('Matéria não encontrada'), corpo(vazio('🌫️', 'Não encontrei esta matéria.')));

  const p = progMateria(mat.id);
  const { pct: prog, feitos, total } = pctMateria(mat);
  const est = estrelasMateria(mat);
  const atual = proximoNivel(mat);

  const introTxt = (FALAS_MATERIA[mat.id] || fala('entrarNivel', FALAS)).replace('{nome}', esc(S.perfil.nome));
  const { cena } = cenaTamayo(mat.fortaleza ? 'orgulhosa' : 'seria', introTxt, { largura: 90, digitando: true });

  const painel = el('div', { class: 'card', style: { margin: '0 16px 14px' } },
    el('div', { class: 'linha g12', style: { marginBottom: '11px' } },
      el('span', { style: { fontSize: '30px' }, txt: mat.ico }),
      el('div', { class: 'crescer' },
        el('div', { style: { fontFamily: 'var(--f-display)', fontSize: '17px', lineHeight: '1.25' }, txt: mat.nome }),
        el('div', { class: 'linha g6', style: { marginTop: '5px', flexWrap: 'wrap' } },
          pesoPontos(mat.peso),
          chip(`peso ${mat.peso}/5`, mat.peso >= 5 ? 'chip--peso5' : ''),
          chip(`${est.ganhas}/${est.max} ✿`, 'chip--sakura')
        )
      ),
      el('span', { class: 'materia__pct', txt: `${prog}%` })
    ),
    barra(prog),
    el('p', { style: { fontSize: '13px', lineHeight: '1.65', color: 'var(--txt-2)', margin: '12px 0 0' }, txt: mat.descricao })
  );

  /* Lista de níveis com linha de trilha */
  const lista = el('div', { class: 'trilha' });
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('class', 'trilha__svg');
  svg.setAttribute('preserveAspectRatio', 'none');
  lista.appendChild(svg);

  mat.niveis.forEach((niv, i) => {
    const pn = progNivel(mat.id, niv.id);
    const liberado = nivelLiberado(mat, i);
    const ehAtual = i === atual && liberado && !pn.concluido;

    const classes = ['nivel-item'];
    if (pn.concluido) classes.push('nivel-item--feito');
    else if (!liberado) classes.push('nivel-item--travado');
    if (ehAtual) classes.push('nivel-item--atual');

    const selo = el('span', { class: 'nivel-selo' },
      pn.concluido ? el('span', { txt: '✓' }) : (liberado ? el('span', { txt: String(i + 1) }) : el('span', { txt: '🔒' })),
      pn.estrelas > 0 ? el('span', { class: 'nivel-selo__estrelas', html: '✿'.repeat(pn.estrelas) }) : null
    );

    const item = el('button', {
      class: classes.join(' '),
      onclick: () => {
        if (!liberado) {
          som.errado();
          toast('Conclua o nível anterior primeiro. A trilha existe por um motivo.', { ico: '🔒', tipo: 'errado' });
          return;
        }
        ir('aula', { matId: mat.id, nivId: niv.id });
      },
    },
      selo,
      el('span', { class: 'nivel-item__corpo' },
        el('span', { class: 'nivel-item__tit', txt: `${i + 1}. ${niv.titulo}` }),
        el('span', { class: 'nivel-item__sub', txt: niv.subtitulo }),
        el('span', { class: 'nivel-item__tags' },
          chip(`${niv.questoes.length} questões`),
          pn.aulaLida ? chip('aula lida', 'chip--certo') : chip('aula pendente'),
          pn.melhorPct > 0 ? chip(`melhor: ${pn.melhorPct}%`, pn.melhorPct >= 85 ? 'chip--certo' : '') : null,
          ehAtual ? chip('você está aqui', 'chip--ouro') : null
        )
      )
    );
    lista.appendChild(item);
  });

  requestAnimationFrame(() => desenharTrilha(lista, svg, mat, p));

  const extrasBloco = el('div', { class: 'pad mt16' },
    secao('Treino livre desta matéria'),
    el('div', { class: 'acoes-rapidas' },
      el('button', {
        class: 'acao',
        onclick: () => abrirPraticaMateria(mat),
      },
        el('span', { class: 'acao__ico', txt: '🎯' }),
        el('span', { class: 'acao__tit', txt: 'Questões soltas' }),
        el('span', { class: 'acao__sub', txt: '12 questões sorteadas, priorizando seus erros' })
      ),
      el('button', {
        class: 'acao',
        onclick: () => abrirSimuladoMateria(mat),
      },
        el('span', { class: 'acao__ico', txt: '⏱️' }),
        el('span', { class: 'acao__tit', txt: 'Simulado da matéria' }),
        el('span', { class: 'acao__sub', txt: '20 questões cronometradas' })
      )
    )
  );

  return tela(
    topbar(mat.curto, { sub: `${feitos}/${total} níveis` }),
    corpo(el('div', { class: 'pad', style: { paddingTop: '4px' } }, cena), painel, lista, extrasBloco),
    navInferior('trilha')
  );
}

/** Desenha a linha pontilhada que liga os selos dos níveis. */
function desenharTrilha(lista, svg, mat, prog) {
  const itens = Array.from(lista.querySelectorAll('.nivel-item'));
  if (itens.length < 2) return;
  const base = lista.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${base.width} ${base.height}`);
  svg.innerHTML = '';
  for (let i = 0; i < itens.length - 1; i++) {
    const a = itens[i].querySelector('.nivel-selo').getBoundingClientRect();
    const b = itens[i + 1].querySelector('.nivel-selo').getBoundingClientRect();
    const x1 = a.left - base.left + a.width / 2;
    const y1 = a.top - base.top + a.height;
    const x2 = b.left - base.left + b.width / 2;
    const y2 = b.top - base.top;
    const feito = !!prog.niveis[mat.niveis[i].id]?.concluido;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y1} C ${x1} ${y1 + 14}, ${x2 - 16} ${y2 - 14}, ${x2} ${y2}`);
    path.setAttribute('class', `trilha__linha ${feito ? 'trilha__linha--feita' : ''}`);
    svg.appendChild(path);
  }
}

/* ------------------------------------------------------------
   Atalhos de prática
   ------------------------------------------------------------ */
import { sortearPonderado } from '../srs.js';

export function abrirPraticaMateria(mat, n = 12) {
  const pool = [];
  for (const niv of mat.niveis) for (const q of niv.questoes) pool.push({ q, mat: mat.id, niv: niv.id });
  const itens = sortearPonderado(pool, Math.min(n, pool.length), (x) => x.q.id);
  ir('quiz', {
    titulo: `Prática · ${mat.curto}`,
    sub: `${itens.length} questões`,
    itens,
    modo: 'pratica',
  });
}

export function abrirSimuladoMateria(mat, n = 20) {
  const pool = [];
  for (const niv of mat.niveis) for (const q of niv.questoes) pool.push({ q, mat: mat.id, niv: niv.id });
  const itens = sortearPonderado(pool, Math.min(n, pool.length), (x) => x.q.id);
  ir('quiz', {
    titulo: `Simulado · ${mat.curto}`,
    sub: `${itens.length} questões cronometradas`,
    itens,
    modo: 'simulado',
    tempoSegundos: itens.length * 150,
  });
}
