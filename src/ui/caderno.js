/* ============================================================
   Caderno de erros — o registro cumulativo do que já doeu.
   Nada aqui é conteúdo novo: é a leitura honesta do que a
   repetição espaçada já vinha guardando em silêncio.
   ============================================================ */

import { el, md, esc, pct, fmtDataBR } from '../util.js';
import { tela, topbar, corpo, chip, secao, vazio, barra } from './components.js';
import { ir } from '../router.js';
import { som } from '../audio.js';
import { S } from '../state.js';
import { erradas, resumoErros, CAIXA_DOMINIO } from '../srs.js';
import { questao as buscaQuestao, materia as buscaMateria, MATERIAS } from '../data/index.js';
import { FALAS } from '../data/dialogues.js';
import { cenaTamayo, fala } from '../tamayo.js';

const LETRAS = ['A', 'B', 'C', 'D', 'E', 'F'];

export function telaCaderno({ matId = null, abertos = true } = {}) {
  const r = resumoErros();
  const lista = erradas({ mat: matId, apenasAbertas: abertos, limite: 200 });

  const texto = (r.total ? fala('cadernoCheio', FALAS) : fala('cadernoVazio', FALAS))
    .replace('{nome}', esc(S.perfil.nome));
  const { cena } = cenaTamayo(r.reincidentes > 0 ? 'seria' : 'pensativa', texto, { largura: 88, digitando: true });

  const raiz = el('div', { class: 'pad' }, cena);

  /* ---------- Resumo ---------- */
  raiz.appendChild(el('div', { class: 'srs-resumo', style: { marginTop: '14px' } },
    cx(r.abertos, 'em aberto', 'urgente'),
    cx(r.reincidentes, 'reincidentes', 'hoje'),
    cx(r.fechados, 'já fechados', 'dominio')
  ));

  if (!r.total) {
    raiz.appendChild(vazio('🌱', 'Nenhum erro registrado ainda.<br>Responda questões na trilha — o que você errar aparece aqui, com a explicação e o caminho de volta.'));
    return montar(raiz);
  }

  raiz.appendChild(el('div', { class: 'card', style: { marginTop: '12px' } },
    barra(pct(r.fechados, r.total), { classe: 'barra--certo' }),
    el('div', { class: 'painel-xp__num' },
      el('span', { txt: `${r.fechados} de ${r.total} erros já fechados` }),
      el('span', { txt: `${pct(r.fechados, r.total)}%` })
    )
  ));

  /* ---------- Filtros ---------- */
  const matsComErro = MATERIAS.filter((m) => erradas({ mat: m.id, apenasAbertas: abertos, limite: 1 }).length);
  const filtros = el('div', { class: 'linha g6', style: { flexWrap: 'wrap', margin: '16px 0 4px' } },
    botaoFiltro('Todas', !matId, () => ir('caderno', { matId: null, abertos }, { substituir: true })),
    ...matsComErro.map((m) => botaoFiltro(m.abrev, matId === m.id,
      () => ir('caderno', { matId: m.id, abertos }, { substituir: true })))
  );
  raiz.appendChild(filtros);

  raiz.appendChild(el('div', { class: 'linha g6', style: { flexWrap: 'wrap', marginBottom: '4px' } },
    botaoFiltro('Só o que ainda está aberto', abertos, () => ir('caderno', { matId, abertos: true }, { substituir: true })),
    botaoFiltro('Tudo que já errei', !abertos, () => ir('caderno', { matId, abertos: false }, { substituir: true }))
  ));

  if (!lista.length) {
    raiz.appendChild(vazio('🌸', 'Nenhum erro em aberto neste filtro.<br>Fechados são os que você já provou domínio na revisão.'));
    return montar(raiz);
  }

  /* ---------- Treinar o caderno ---------- */
  const treinaveis = lista.filter((x) => buscaQuestao(x.qid));
  if (treinaveis.length) {
    raiz.appendChild(el('button', {
      class: 'btn btn--primario btn--bloco mt8',
      onclick: () => abrirTreino(treinaveis, Math.min(15, treinaveis.length), matId),
    }, `Treinar só os erros · ${Math.min(15, treinaveis.length)} questões`));
  }

  /* ---------- Lista ---------- */
  raiz.appendChild(secao(`${lista.length} questão${lista.length === 1 ? '' : 'ões'} · mais reincidentes primeiro`));
  for (const item of lista) raiz.appendChild(linhaErro(item));

  return montar(raiz);
}

function montar(raiz) {
  return tela(
    topbar('Caderno de erros', { sub: 'o que você já errou, e por quê', comVoltar: true }),
    corpo({ semNav: true }, raiz)
  );
}

function cx(valor, rot, tipo) {
  return el('div', { class: `srs-cx ${tipo ? `srs-cx--${tipo}` : ''}` },
    el('div', { class: 'srs-cx__v', txt: String(valor) }),
    el('div', { class: 'srs-cx__r', txt: rot })
  );
}

function botaoFiltro(rotulo, ativo, aoClicar) {
  return el('button', {
    class: `chip ${ativo ? 'chip--sakura' : ''}`,
    style: { padding: '8px 13px', fontSize: '12px' },
    onclick: () => { som.toque(); aoClicar(); },
  }, rotulo);
}

/** Uma entrada do caderno: o erro, o que ela marcou e o conceito correto. */
function linhaErro({ qid, f }) {
  const reg = buscaQuestao(qid);
  if (!reg) return el('span');
  const { q } = reg;
  const mat = buscaMateria(reg.mat);
  const niv = mat?.niveis.find((n) => n.id === reg.niv);
  const fechado = f.caixa >= CAIXA_DOMINIO;

  const correta = q.tipo === 'ce'
    ? (q.correta === 0 ? 'Certo' : 'Errado')
    : q.alts[q.correta];

  const marcada = f.ultimaEscolha === null || f.ultimaEscolha === undefined
    ? null
    : (q.tipo === 'ce'
        ? (f.ultimaEscolha === 0 ? 'Certo' : 'Errado')
        : q.alts[f.ultimaEscolha]);

  const detalhe = el('div', { style: { display: 'none', marginTop: '10px' } },
    q.base ? el('div', { class: 'questao__texto-base', style: { fontSize: '12.5px' }, html: md(q.base) }) : null,
    el('div', { style: { fontSize: '13.5px', lineHeight: '1.6', marginBottom: '10px' }, html: md(q.enunciado) }),

    marcada
      ? el('div', { class: 'destaque destaque--perigo' },
          el('span', { class: 'destaque__rot', txt: 'Você marcou' }),
          el('span', { html: md(marcada) })
        )
      : null,
    el('div', { class: 'destaque destaque--dica' },
      el('span', { class: 'destaque__rot', txt: 'Resposta correta' }),
      el('span', { html: md(correta) })
    ),
    el('div', { style: { fontSize: '13px', lineHeight: '1.7', color: 'var(--txt-2)', marginTop: '10px' }, html: md(q.expl) }),

    el('div', { class: 'linha g6', style: { flexWrap: 'wrap', marginTop: '12px' } },
      niv ? el('button', {
        class: 'btn btn--fantasma btn--pequeno',
        onclick: (ev) => { ev.stopPropagation(); ir('aula', { matId: reg.mat, nivId: reg.niv }); },
      }, 'Reler a aula deste nível') : null,
      el('button', {
        class: 'btn btn--fantasma btn--pequeno',
        onclick: (ev) => { ev.stopPropagation(); abrirTreino([{ qid, f }], 1, reg.mat); },
      }, 'Refazer esta questão')
    )
  );

  const cartao = el('button', {
    class: 'gabarito-item',
    style: { width: '100%', textAlign: 'left' },
    onclick: () => {
      const aberto = detalhe.style.display !== 'none';
      detalhe.style.display = aberto ? 'none' : 'block';
      som.toque();
    },
  },
    el('span', { class: `gabarito-item__n ${fechado ? 'ok' : 'nok'}`, txt: fechado ? '✓' : '✘' }),
    el('span', { class: 'crescer' },
      el('span', { class: 'gabarito-item__txt', txt: `${mat ? mat.abrev : ''} · ${niv ? niv.titulo : (q.tags || []).join(', ')}` }),
      el('span', { class: 'linha g6', style: { flexWrap: 'wrap', marginTop: '6px' } },
        chip(`${f.erros} erro${f.erros > 1 ? 's' : ''}`, f.erros > 1 ? 'chip--errado' : ''),
        chip(`caixa ${f.caixa}`, fechado ? 'chip--certo' : ''),
        f.ultimoErro ? chip(fmtDataBR(f.ultimoErro)) : null,
        f.lentos > 0 ? chip(`⏱ ${f.lentos} lento${f.lentos > 1 ? 's' : ''}`) : null
      ),
      detalhe
    )
  );
  return cartao;
}

function abrirTreino(lista, n, matId) {
  const itens = [];
  for (const x of lista.slice(0, n)) {
    const reg = buscaQuestao(x.qid);
    if (reg) itens.push({ q: reg.q, mat: reg.mat, niv: reg.niv });
  }
  if (!itens.length) return;
  const mat = matId ? buscaMateria(matId) : null;
  ir('quiz', {
    titulo: 'Caderno de erros',
    sub: mat ? `${itens.length} questões · ${mat.curto}` : `${itens.length} questões que você já errou`,
    itens,
    modo: 'pratica',
  });
}
