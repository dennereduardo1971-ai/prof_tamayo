/* ============================================================
   Revisão espaçada — as feridas abertas
   ============================================================ */

import { el, esc, pct, fmtNum } from '../util.js';
import { tela, topbar, corpo, navInferior, barra, chip, secao, vazio } from './components.js';
import { ir, limparPilha } from '../router.js';
import { S } from '../state.js';
import { resumoSrs, vencidas, pontosFracos, INTERVALOS, CAIXA_DOMINIO, CAIXA_MAX } from '../srs.js';
import { questao as buscaQuestao, materia as buscaMateria, MATERIAS } from '../data/index.js';
import { FALAS } from '../data/dialogues.js';
import { cenaTamayo, fala } from '../tamayo.js';

export function telaRevisao() {
  const r = resumoSrs();
  const fila = vencidas({ limite: 200 });

  const texto = (fila.length ? fala('revisaoInicio', FALAS) : fala('revisaoVazia', FALAS))
    .replace('{nome}', esc(S.perfil.nome));
  const { cena } = cenaTamayo(fila.length ? 'seria' : 'orgulhosa', texto, { largura: 92, digitando: true });

  const resumo = el('div', { class: 'srs-resumo' },
    cx(r.atrasadas, 'atrasadas', 'urgente'),
    cx(r.hoje, 'para hoje', 'hoje'),
    cx(r.aprendendo, 'aprendendo', ''),
    cx(r.dominadas, 'dominadas', 'dominio')
  );

  const conteudo = el('div', { class: 'pad' }, cena, el('div', { style: { marginTop: '14px' } }, resumo));

  if (fila.length) {
    /* Botões de sessão */
    const tamanhos = [10, 20, Math.min(40, fila.length)].filter((n, i, arr) => n > 0 && arr.indexOf(n) === i && n <= fila.length);
    const acoes = el('div', { class: 'col g10 mt16' });
    acoes.appendChild(el('button', {
      class: 'btn btn--primario btn--bloco',
      onclick: () => abrirRevisao(fila, Math.min(15, fila.length)),
    }, `Revisar agora · ${Math.min(15, fila.length)} questões`));

    for (const n of tamanhos) {
      if (n === Math.min(15, fila.length)) continue;
      acoes.appendChild(el('button', {
        class: 'btn btn--fantasma btn--bloco btn--pequeno',
        onclick: () => abrirRevisao(fila, n),
      }, `Sessão de ${n} questões`));
    }
    conteudo.appendChild(acoes);

    /* Distribuição por matéria */
    const porMat = {};
    for (const f of fila) {
      const k = f.f.mat || '—';
      porMat[k] = (porMat[k] || 0) + 1;
    }
    conteudo.appendChild(secao('Pendências por matéria'));
    const lista = el('div', {});
    Object.entries(porMat).sort((a, b) => b[1] - a[1]).forEach(([id, n]) => {
      const mat = buscaMateria(id);
      lista.appendChild(el('button', {
        class: 'stats-linha',
        style: { width: '100%', textAlign: 'left' },
        onclick: () => {
          const sub = vencidas({ mat: id, limite: 60 });
          abrirRevisao(sub, Math.min(15, sub.length));
        },
      },
        el('span', { txt: mat ? mat.ico : '•' }),
        el('span', { class: 'stats-linha__nome', txt: mat ? mat.curto : id }),
        chip(`${n} pendente${n > 1 ? 's' : ''}`, 'chip--errado'),
        el('span', { style: { color: 'var(--sakura-2)', fontSize: '18px' }, txt: '›' })
      ));
    });
    conteudo.appendChild(lista);
  } else if (r.total === 0) {
    conteudo.appendChild(vazio('🌱', 'Você ainda não respondeu questões.<br>Comece pela trilha — as questões que você errar voltam aqui automaticamente.'));
    conteudo.appendChild(el('button', {
      class: 'btn btn--primario btn--bloco mt16',
      onclick: () => { limparPilha(); ir('trilha', {}, { semPilha: true }); },
    }, 'Abrir a trilha'));
  } else {
    conteudo.appendChild(vazio('🌸', 'Nenhuma revisão vencida hoje.<br>As próximas voltam conforme o intervalo de cada questão.'));
    conteudo.appendChild(el('button', {
      class: 'btn btn--fantasma btn--bloco mt16',
      onclick: () => {
        // Revisão antecipada: pega as de caixa mais baixa, mesmo não vencidas.
        const todas = Object.entries(S.srs)
          .filter(([, f]) => f.caixa < CAIXA_DOMINIO)
          .sort((a, b) => a[1].caixa - b[1].caixa)
          .slice(0, 15)
          .map(([qid, f]) => ({ qid, f }));
        if (!todas.length) return;
        abrirRevisao(todas, todas.length);
      },
    }, 'Revisar antecipadamente as mais frágeis'));
  }

  /* Explicação do sistema */
  conteudo.appendChild(secao('Como a repetição funciona'));
  conteudo.appendChild(el('div', { class: 'card', style: { fontSize: '13px', lineHeight: '1.7', color: 'var(--txt-2)' } },
    el('p', { style: { margin: '0 0 8px' }, html: 'Cada questão tem uma <b>caixa</b>. Acertou, sobe de caixa e demora mais para voltar. Errou, cai duas caixas e volta <b>hoje</b>.' }),
    el('div', { class: 'linha g6', style: { flexWrap: 'wrap', margin: '10px 0' } },
      ...INTERVALOS.map((d, i) => chip(`${i}: ${d === 0 ? 'hoje' : `${d}d`}`, i >= CAIXA_DOMINIO ? 'chip--certo' : ''))
    ),
    el('p', { style: { margin: '8px 0 0', fontSize: '12px', color: 'var(--txt-3)' }, html: `Da caixa <b>${CAIXA_DOMINIO}</b> em diante a questão é considerada <b>dominada</b> e praticamente sai do seu caminho.` })
  ));

  return tela(
    topbar('Revisão espaçada', { sub: `${r.pendentes} pendente${r.pendentes === 1 ? '' : 's'}`, comVoltar: false }),
    corpo(conteudo),
    navInferior('revisao')
  );
}

function cx(valor, rot, tipo) {
  return el('div', { class: `srs-cx ${tipo ? `srs-cx--${tipo}` : ''}` },
    el('div', { class: 'srs-cx__v', txt: String(valor) }),
    el('div', { class: 'srs-cx__r', txt: rot })
  );
}

function abrirRevisao(fila, n) {
  const itens = [];
  for (const f of fila.slice(0, n)) {
    const reg = buscaQuestao(f.qid);
    if (reg) itens.push({ q: reg.q, mat: reg.mat, niv: reg.niv });
  }
  if (!itens.length) return;
  ir('quiz', {
    titulo: 'Revisão',
    sub: `${itens.length} questões vencidas`,
    itens,
    modo: 'revisao',
  });
}
