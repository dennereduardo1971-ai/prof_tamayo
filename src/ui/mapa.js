/* ============================================================
   Mapa mental navegável
   Uma árvore por matéria: matéria → nível → tópicos → ramos.
   A estrutura básica é derivada do próprio conteúdo; níveis que
   trazem o campo `mapa` ganham profundidade escrita à mão.
   ============================================================ */

import { el, md, esc, pct } from '../util.js';
import { tela, topbar, corpo, chip, secao, barra, vazio } from './components.js';
import { ir } from '../router.js';
import { som } from '../audio.js';
import { S, progNivel, progMateria } from '../state.js';
import { MATERIAS, materia as buscaMateria } from '../data/index.js';
import { pctMateria } from './components.js';

/* ------------------------------------------------------------
   Sem matéria: escolher de qual mapa falamos
   ------------------------------------------------------------ */
export function telaMapa({ matId = null } = {}) {
  if (!matId) return listaDeMapas();

  const mat = buscaMateria(matId);
  if (!mat) return tela(topbar('Mapa mental'), corpo(vazio('🌫️', 'Não encontrei esta matéria.')));

  const { pct: prog, feitos, total } = pctMateria(mat);
  const p = progMateria(mat.id);
  const raiz = el('div', { class: 'pad' });

  raiz.appendChild(el('p', {
    style: { fontSize: '12.5px', color: 'var(--txt-3)', lineHeight: '1.6', margin: '2px 0 14px' },
    html: 'Toque num ramo para abrir. É a matéria inteira em uma página só — feito para a véspera, quando não há mais tempo de ler aula.',
  }));

  raiz.appendChild(el('div', { class: 'card', style: { marginBottom: '14px' } },
    el('div', { class: 'linha g12', style: { marginBottom: '10px' } },
      el('span', { style: { fontSize: '26px' }, txt: mat.ico }),
      el('div', { class: 'crescer' },
        el('div', { style: { fontFamily: 'var(--f-display)', fontSize: '16px' }, txt: mat.nome }),
        el('div', { class: 'linha g6', style: { marginTop: '4px', flexWrap: 'wrap' } },
          chip(`peso ${mat.peso}/5`, mat.peso >= 5 ? 'chip--peso5' : ''),
          chip(`${total} níveis`)
        )
      ),
      el('span', { class: 'materia__pct', txt: `${prog}%` })
    ),
    barra(prog, { fina: true })
  ));

  /* ---------- Árvore ---------- */
  const arvore = el('div', { class: 'mapa' });
  mat.niveis.forEach((niv, i) => {
    const pn = progNivel(mat.id, niv.id);
    const ramos = ramosDoNivel(niv);

    const filhos = el('div', { class: 'mapa__filhos', style: { display: i === 0 ? 'block' : 'none' } });
    for (const r of ramos) filhos.appendChild(no(r, 1));
    filhos.appendChild(el('button', {
      class: 'btn btn--fantasma btn--pequeno',
      style: { marginTop: '8px' },
      onclick: () => ir('aula', { matId: mat.id, nivId: niv.id }),
    }, 'Abrir a aula deste nível'));

    const cabeca = el('button', {
      class: `mapa__no mapa__no--raiz ${pn.concluido ? 'is-feito' : ''}`,
      onclick: () => {
        const aberto = filhos.style.display !== 'none';
        filhos.style.display = aberto ? 'none' : 'block';
        cabeca.classList.toggle('is-aberto', !aberto);
        som.toque();
      },
    },
      el('span', { class: 'mapa__marca', txt: pn.concluido ? '✓' : String(i + 1) }),
      el('span', { class: 'crescer' },
        el('span', { class: 'mapa__tit', txt: niv.titulo }),
        el('span', { class: 'mapa__sub', txt: niv.subtitulo })
      ),
      el('span', { class: 'mapa__seta', txt: '›' })
    );
    if (i === 0) cabeca.classList.add('is-aberto');

    arvore.appendChild(el('div', { class: 'mapa__ramo' }, cabeca, filhos));
  });

  raiz.appendChild(arvore);

  return tela(
    topbar(`Mapa · ${mat.curto}`, { sub: `${feitos}/${total} níveis concluídos` }),
    corpo({ semNav: true }, raiz)
  );
}

/**
 * Ramos de um nível. Se a matéria trouxer `mapa` no nível, ele manda;
 * caso contrário, derivamos dos tópicos e do resumo da aula — que já
 * são, na prática, o esqueleto do conteúdo.
 */
function ramosDoNivel(niv) {
  if (niv.mapa?.length) return niv.mapa;

  const out = (niv.topicos || []).map((t) => ({ t }));
  const blocos = niv.aula?.blocos || [];
  // Casa cada tópico com o bloco de aula correspondente, quando houver.
  blocos.forEach((b, i) => {
    if (!b.t) return;
    const alvo = out[i];
    if (alvo && !alvo.filhos) alvo.filhos = (b.lista || b.p || []).slice(0, 6).map((x) => ({ t: x }));
  });
  if (niv.aula?.resumo?.length) {
    out.push({ t: 'Fixe estes pontos', filhos: niv.aula.resumo.map((r) => ({ t: r })) });
  }
  return out;
}

/** Nó recursivo da árvore. */
function no(ramo, nivel) {
  const temFilhos = !!ramo.filhos?.length;
  const filhos = temFilhos
    ? el('div', { class: 'mapa__filhos', style: { display: 'none' } }, ...ramo.filhos.map((f) => no(f, nivel + 1)))
    : null;

  const cabeca = el(temFilhos ? 'button' : 'div', {
    class: `mapa__no mapa__no--n${Math.min(nivel, 3)} ${temFilhos ? '' : 'mapa__no--folha'}`,
    onclick: temFilhos ? () => {
      const aberto = filhos.style.display !== 'none';
      filhos.style.display = aberto ? 'none' : 'block';
      cabeca.classList.toggle('is-aberto', !aberto);
      som.toque();
    } : undefined,
  },
    el('span', { class: 'mapa__ponto' }),
    el('span', { class: 'crescer', html: md(ramo.t) }),
    temFilhos ? el('span', { class: 'mapa__seta', txt: '›' }) : null
  );

  return el('div', { class: 'mapa__ramo' }, cabeca, filhos);
}

/* ------------------------------------------------------------
   Lista de matérias
   ------------------------------------------------------------ */
function listaDeMapas() {
  const raiz = el('div', { class: 'pad' },
    el('p', {
      style: { fontSize: '12.5px', color: 'var(--txt-3)', lineHeight: '1.6', margin: '2px 0 14px' },
      html: 'Cada matéria vira uma árvore navegável. Serve para <b>revisar rápido</b> e para enxergar o desenho inteiro do conteúdo — o que a leitura linear esconde.',
    })
  );

  for (const m of MATERIAS) {
    const { pct: prog, feitos, total } = pctMateria(m);
    const cartao = el('button', {
      class: 'materia',
      style: { marginBottom: '10px' },
      onclick: () => ir('mapa', { matId: m.id }),
    },
      el('span', { class: 'materia__ico', txt: m.ico }),
      el('span', { class: 'materia__corpo' },
        el('span', { class: 'materia__nome', txt: m.curto }),
        el('span', { class: 'materia__meta' },
          chip(`peso ${m.peso}/5`, m.peso >= 5 ? 'chip--peso5' : ''),
          chip(`${total} ramos`)
        ),
        el('span', { class: 'materia__barra' }, barra(prog, { fina: true }))
      ),
      el('span', { class: 'materia__pct', txt: `${prog}%` })
    );
    cartao.style.setProperty('--cor-mat', m.cor);
    raiz.appendChild(cartao);
  }

  return tela(
    topbar('Mapas mentais', { sub: 'o edital em árvore' }),
    corpo({ semNav: true }, raiz)
  );
}
