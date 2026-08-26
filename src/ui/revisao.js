/* ============================================================
   Revisão espaçada — as feridas abertas
   ============================================================ */

import { el, esc, diaSemana, DIAS_SEM, fmtDataCurta } from '../util.js';
import { tela, topbar, corpo, navInferior, chip, secao, vazio } from './components.js';
import { ir, limparPilha } from '../router.js';
import { S } from '../state.js';
import { resumoSrs, vencidas, cargaFutura, INTERVALOS, CAIXA_DOMINIO } from '../srs.js';
import { questao as buscaQuestao, materia as buscaMateria } from '../data/index.js';
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

  /* Agenda dos próximos dias — o que vem por aí, para não haver emboscada */
  const agenda = cargaFutura(7);
  if (agenda.some((d) => d.n > 0)) {
    conteudo.appendChild(secao('Os próximos 7 dias'));
    const maior = Math.max(...agenda.map((d) => d.n), 1);
    const grafico = el('div', { class: 'agenda' });
    agenda.forEach((d, i) => {
      const alturaFinal = d.n ? Math.max(6, Math.round((d.n / maior) * 74)) : 3;
      const barraEl = el('div', { class: 'agenda__barra' });
      barraEl.style.height = '0px';
      requestAnimationFrame(() => { barraEl.style.height = `${alturaFinal}px`; });
      grafico.appendChild(el('div', {
        class: `agenda__col ${i === 0 ? 'agenda__col--hoje' : ''} ${d.n ? '' : 'agenda__col--vazio'}`,
        title: `${fmtDataCurta(d.iso)} · ${d.n} questão${d.n === 1 ? '' : 'ões'}`,
      },
        el('span', { class: 'agenda__n', txt: d.n ? String(d.n) : '·' }),
        barraEl,
        el('span', { class: 'agenda__d', txt: i === 0 ? 'hoje' : DIAS_SEM[diaSemana(d.iso)] })
      ));
    });
    const total7 = agenda.reduce((a, d) => a + d.n, 0);
    conteudo.appendChild(el('div', { class: 'card' },
      grafico,
      el('p', { style: { fontSize: '12px', color: 'var(--txt-3)', margin: '12px 0 0', lineHeight: '1.6' },
        html: `<b>${total7}</b> revisões vencem nos próximos 7 dias. A coluna de hoje inclui tudo o que já estava atrasado — se ela crescer demais, a culpa é dos dias que você pulou.` })
    ));
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
