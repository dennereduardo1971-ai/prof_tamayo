/* ============================================================
   Aula da Tamayo + checkpoint do nível
   ============================================================ */

import { el, md, esc, embaralhar, pct } from '../util.js';
import { tela, topbar, corpo, chip, barra, blocoAula, destaque, resumoAula, secao, nivelLiberado } from './components.js';
import { ir } from '../router.js';
import { som } from '../audio.js';
import { toast, flutuar } from '../fx.js';
import { petalas } from '../petals.js';
import { S, progNivel, salvar } from '../state.js';
import { ganharXp, XP, extras, conferirConquistas, pulsoEstudo } from '../gamification.js';
import { FALAS, FALAS_MATERIA } from '../data/dialogues.js';
import { cenaTamayo, fala } from '../tamayo.js';
import { materia as buscaMateria, nivel as buscaNivel } from '../data/index.js';
import { anunciarConquista } from './quiz.js';
import { sortearPonderado } from '../srs.js';

/* ------------------------------------------------------------
   Aula
   ------------------------------------------------------------ */
export function telaAula({ matId, nivId }) {
  const mat = buscaMateria(matId);
  const niv = buscaNivel(matId, nivId);
  if (!mat || !niv) return tela(topbar('Aula'), corpo(el('div', { class: 'vazio', txt: 'Conteúdo não encontrado.' })));

  const pn = progNivel(matId, nivId);
  const idx = mat.niveis.findIndex((n) => n.id === nivId);

  /* Fala de entrada: usa a da aula, senão sorteia pelo perfil da matéria */
  let intro = niv.aula.intro;
  if (!intro) {
    const grupo = mat.fortaleza ? 'entrarNivelFortaleza' : (mat.peso >= 5 ? 'entrarNivelPesado' : 'entrarNivel');
    intro = fala(grupo, FALAS);
  }
  intro = intro.replace('{nome}', esc(S.perfil.nome));

  const { cena } = cenaTamayo(mat.fortaleza ? 'sorriso' : 'seria', intro, { largura: 106, digitando: true });

  const cabecalho = el('div', { class: 'pad', style: { paddingTop: '4px' } },
    el('div', { class: 'linha g6', style: { flexWrap: 'wrap', marginBottom: '12px' } },
      chip(`${mat.abrev} · nível ${idx + 1}`, 'chip--sakura'),
      chip(`peso ${mat.peso}/5`, mat.peso >= 5 ? 'chip--peso5' : ''),
      pn.concluido ? chip(`concluído · ${'✿'.repeat(pn.estrelas)}`, 'chip--certo') : null
    ),
    el('h1', { style: { fontFamily: 'var(--f-display)', fontSize: '22px', lineHeight: '1.3', margin: '0 0 5px', color: 'var(--sakura-1)' }, txt: niv.titulo }),
    el('p', { style: { fontSize: '13.5px', color: 'var(--txt-3)', margin: '0 0 14px', lineHeight: '1.55' }, txt: niv.subtitulo }),
    cena
  );

  const topicos = el('div', { class: 'pad' },
    el('div', { class: 'linha g6', style: { flexWrap: 'wrap' } },
      ...niv.topicos.map((t) => chip(t))
    )
  );

  const corpoAula = el('div', { class: 'aula stagger mt16' });
  for (const b of niv.aula.blocos) corpoAula.appendChild(blocoAula(b));
  for (const d of niv.aula.destaques || []) corpoAula.appendChild(destaque(d));
  if (niv.aula.resumo?.length) {
    corpoAula.appendChild(el('div', { style: { marginTop: '14px' } }, resumoAula(niv.aula.resumo)));
  }

  /* Ações finais */
  const acoes = el('div', { class: 'pad mt24', style: { paddingBottom: '10px' } });

  const marcarLida = () => {
    if (pn.aulaLida) return;
    pn.aulaLida = true;
    extras().aulasLidas += 1;
    const r = ganharXp(XP.aula, { peso: mat.peso, origem: 'aula' });
    pulsoEstudo();
    salvar();
    som.xp();
    petalas.rajada(1);
    flutuar(`+${r.ganho} XP`, window.innerWidth / 2, window.innerHeight * 0.6);
    for (const c of conferirConquistas()) anunciarConquista(c);
  };

  acoes.appendChild(el('button', {
    class: 'btn btn--primario btn--bloco',
    onclick: () => {
      marcarLida();
      ir('checkpoint', { matId, nivId });
    },
  }, pn.concluido ? 'Refazer o checkpoint' : 'Ir ao checkpoint do nível →'));

  acoes.appendChild(el('button', {
    class: 'btn btn--fantasma btn--bloco mt8',
    onclick: () => {
      marcarLida();
      const pool = niv.questoes.map((q) => ({ q, mat: matId, niv: nivId }));
      const itens = sortearPonderado(pool, Math.min(5, pool.length), (x) => x.q.id);
      ir('quiz', {
        titulo: `Treino · ${niv.titulo}`,
        sub: 'sem valer nota — só para aquecer',
        itens,
        modo: 'pratica',
      });
    },
  }, 'Treinar 5 questões antes (não conta como checkpoint)'));

  acoes.appendChild(el('p', {
    style: { fontSize: '11.5px', color: 'var(--txt-3)', textAlign: 'center', marginTop: '14px', lineHeight: '1.6' },
    html: `O checkpoint tem <b>${niv.questoes.length} questões</b>. É preciso <b>70%</b> para liberar o próximo nível.<br>85% valem duas flores; 100% valem três.`,
  }));

  return tela(
    topbar(`Nível ${idx + 1}`, { sub: mat.curto }),
    corpo({ semNav: true }, cabecalho, topicos, corpoAula, acoes)
  );
}

/* ------------------------------------------------------------
   Checkpoint — todas as questões do nível, embaralhadas
   ------------------------------------------------------------ */
export function abrirCheckpoint({ matId, nivId }) {
  const mat = buscaMateria(matId);
  const niv = buscaNivel(matId, nivId);
  const idx = mat.niveis.findIndex((n) => n.id === nivId);
  const itens = embaralhar(niv.questoes.map((q) => ({ q, mat: matId, niv: nivId })));

  return {
    titulo: `Checkpoint · nível ${idx + 1}`,
    sub: `${mat.curto} — ${niv.titulo}`,
    itens,
    modo: 'checkpoint',
    matId, nivId,
  };
}
