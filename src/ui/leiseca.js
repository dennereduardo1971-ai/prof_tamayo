/* ============================================================
   Modo Lei Seca — recompor o dispositivo a partir das lacunas.
   Sem múltipla escolha: ou você sabe a letra da lei, ou não sabe.
   ============================================================ */

import { el, md, esc, pct, embaralhar, vibrar, hojeISO } from '../util.js';
import { tela, topbar, corpo, chip, secao, barra, vazio } from './components.js';
import { ir, voltar } from '../router.js';
import { som } from '../audio.js';
import { flash, flutuar, toast, comemorar } from '../fx.js';
import { petalas } from '../petals.js';
import { S, salvar, registrar } from '../state.js';
import { ganharXp, XP, conferirConquistas, conferirMeta, pulsoEstudo } from '../gamification.js';
import { LEIS, MAPA_LEIS, TOTAL_DISPOSITIVOS, fatiar, termos } from '../data/leis.js';
import { materia as buscaMateria } from '../data/index.js';
import { FALAS } from '../data/dialogues.js';
import { cenaTamayo, fala } from '../tamayo.js';
import { anunciarConquista } from './quiz.js';

const POR_SESSAO = 5;

/* ---------------- Ficha de progresso por dispositivo ---------------- */

export function fichaLei(id) {
  if (!S.leis) S.leis = {};
  if (!S.leis[id]) S.leis[id] = { tentativas: 0, melhor: 0, acertos: 0, erros: 0, ultima: null };
  return S.leis[id];
}

function resumoLei(lei) {
  let feitos = 0, dominados = 0;
  for (const d of lei.dispositivos) {
    const f = S.leis?.[d.id];
    if (!f || !f.tentativas) continue;
    feitos += 1;
    if (f.melhor === 100) dominados += 1;
  }
  return { feitos, dominados, total: lei.dispositivos.length };
}

/* ------------------------------------------------------------
   Tela 1 — escolher a lei
   ------------------------------------------------------------ */
export function telaLeiSeca({ leiId = null } = {}) {
  if (leiId) return telaSessao(leiId);

  const raiz = el('div', { class: 'pad' });

  const { cena } = cenaTamayo('firme',
    'A Câmara cobra <b>letra de lei</b>. Aqui não há alternativa para eliminar: ou o dispositivo está na sua memória, ou está faltando. Vamos descobrir qual dos dois.',
    { largura: 88, digitando: true });
  raiz.appendChild(cena);

  let feitosGeral = 0;
  for (const lei of LEIS) feitosGeral += resumoLei(lei).dominados;
  raiz.appendChild(el('div', { class: 'card', style: { margin: '14px 0' } },
    barra(pct(feitosGeral, TOTAL_DISPOSITIVOS), { classe: 'barra--ouro' }),
    el('div', { class: 'painel-xp__num' },
      el('span', { txt: `${feitosGeral} de ${TOTAL_DISPOSITIVOS} dispositivos gabaritados` }),
      el('span', { txt: `${pct(feitosGeral, TOTAL_DISPOSITIVOS)}%` })
    )
  ));

  for (const lei of LEIS) {
    const r = resumoLei(lei);
    const mat = buscaMateria(lei.mat);
    const cartao = el('button', {
      class: 'materia',
      style: { marginBottom: '10px' },
      onclick: () => ir('leiseca', { leiId: lei.id }),
    },
      el('span', { class: 'materia__ico', txt: lei.ico }),
      el('span', { class: 'materia__corpo' },
        el('span', { class: 'materia__nome', txt: lei.curto }),
        el('span', { class: 'materia__meta' },
          chip(`${r.total} dispositivos`),
          r.dominados ? chip(`${r.dominados} gabaritados`, 'chip--certo') : null,
          mat ? chip(mat.abrev, 'chip--sakura') : null
        ),
        el('span', { class: 'materia__barra' }, barra(pct(r.dominados, r.total), { fina: true }))
      ),
      el('span', { class: 'materia__pct', txt: `${pct(r.dominados, r.total)}%` })
    );
    if (mat) cartao.style.setProperty('--cor-mat', mat.cor);
    raiz.appendChild(cartao);
  }

  raiz.appendChild(el('p', {
    style: { fontSize: '11.5px', color: 'var(--txt-3)', lineHeight: '1.7', marginTop: '18px' },
    html: 'Os dispositivos foram transcritos para estudo. Quando o edital oficial sair, confira cada um contra a fonte — sobretudo os que sofreram emenda recente.',
  }));

  return tela(
    topbar('Lei seca', { sub: 'preencher as lacunas do dispositivo' }),
    corpo({ semNav: true }, raiz)
  );
}

/* ------------------------------------------------------------
   Tela 2 — sessão de dispositivos
   ------------------------------------------------------------ */
function telaSessao(leiId) {
  const lei = MAPA_LEIS[leiId];
  if (!lei) return tela(topbar('Lei seca'), corpo(vazio('🌫️', 'Não encontrei esta lei.')));

  const mat = buscaMateria(lei.mat);
  const fila = escolherDispositivos(lei, POR_SESSAO);

  const ses = { lei, mat, fila, idx: 0, acertosTotais: 0, lacunasTotais: 0, xp: 0 };

  const palco = el('div', { class: 'pad' });
  const raiz = tela(
    topbar(lei.curto, { sub: `${fila.length} dispositivos` }),
    corpo({ semNav: true }, palco)
  );
  ses.palco = palco;

  renderDispositivo(ses);
  return raiz;
}

/**
 * Sorteia dispositivos priorizando o que nunca foi visto e o que
 * ficou com nota baixa. O que já foi gabaritado só volta no fim.
 */
function escolherDispositivos(lei, n) {
  const comPeso = lei.dispositivos.map((d) => {
    const f = S.leis?.[d.id];
    if (!f || !f.tentativas) return { d, p: 3 };        // inédito: prioridade alta
    if (f.melhor === 100) return { d, p: 0.4 };         // dominado: quase sai do caminho
    return { d, p: 1 + (100 - f.melhor) / 40 };
  });
  const out = [];
  while (out.length < Math.min(n, comPeso.length)) {
    const total = comPeso.reduce((a, x) => a + x.p, 0);
    let r = Math.random() * total, i = 0;
    for (; i < comPeso.length; i++) { r -= comPeso[i].p; if (r <= 0) break; }
    const [esc] = comPeso.splice(Math.min(i, comPeso.length - 1), 1);
    out.push(esc.d);
  }
  return out;
}

function renderDispositivo(ses) {
  const { palco } = ses;
  const disp = ses.fila[ses.idx];
  if (!disp) { finalizar(ses); return; }

  palco.innerHTML = '';

  const pedacos = fatiar(disp.texto);
  const corretos = termos(disp);
  const respostas = new Array(corretos.length).fill(null);
  let alvo = 0;            // lacuna em foco
  let conferido = false;

  /* --- Cabeçalho --- */
  palco.appendChild(el('div', { class: 'linha entre g8', style: { marginBottom: '10px' } },
    chip(`${ses.idx + 1}/${ses.fila.length}`),
    chip(`${corretos.length} lacunas`, 'chip--sakura')
  ));

  /* --- Texto com lacunas --- */
  const lacunasEl = [];
  const texto = el('div', { class: 'leiseca__texto' },
    el('span', { class: 'leiseca__ref', txt: disp.ref })
  );

  let iLac = 0;
  for (const p of pedacos) {
    if (p.txt !== undefined) {
      texto.appendChild(document.createTextNode(p.txt));
    } else {
      const i = iLac++;
      const b = el('button', { class: 'lacuna', txt: '_'.repeat(6) });
      b.addEventListener('click', () => {
        if (conferido) return;
        if (respostas[i]) {            // devolve a ficha ao banco
          soltar(i);
        } else {
          alvo = i;
          pintarAlvo();
        }
        som.toque();
      });
      lacunasEl.push(b);
      texto.appendChild(b);
    }
  }
  palco.appendChild(texto);

  /* --- Banco de fichas --- */
  const opcoes = embaralhar([...corretos, ...(disp.distratores || [])]);
  const banco = el('div', { class: 'leiseca__banco' });
  const fichasEl = opcoes.map((termo, k) => {
    const f = el('button', { class: 'leiseca__ficha', txt: termo });
    f.dataset.termo = termo;
    f.dataset.k = String(k);
    f.addEventListener('click', () => {
      if (conferido || f.classList.contains('is-usada')) return;
      const i = proximaVaga();
      if (i === -1) return;
      respostas[i] = { termo, k };
      lacunasEl[i].textContent = termo;
      lacunasEl[i].classList.add('is-preenchida');
      f.classList.add('is-usada');
      alvo = proximaVaga();
      pintarAlvo();
      som.toque();
      botao.disabled = respostas.some((r) => !r);
    });
    banco.appendChild(f);
    return f;
  });
  palco.appendChild(el('div', {}, secao('Escolha os termos'), banco));

  function proximaVaga() {
    if (alvo !== -1 && alvo !== null && !respostas[alvo]) return alvo;
    return respostas.findIndex((r) => !r);
  }

  function soltar(i) {
    const r = respostas[i];
    if (!r) return;
    respostas[i] = null;
    lacunasEl[i].textContent = '_'.repeat(6);
    lacunasEl[i].classList.remove('is-preenchida');
    fichasEl[r.k].classList.remove('is-usada');
    alvo = i;
    pintarAlvo();
    botao.disabled = true;
  }

  function pintarAlvo() {
    lacunasEl.forEach((b, i) => b.classList.toggle('is-alvo', i === alvo && !respostas[i]));
  }

  /* --- Ação --- */
  const botao = el('button', {
    class: 'btn btn--primario btn--bloco mt16',
    disabled: true,
    onclick: () => conferir(),
  }, 'Conferir');
  palco.appendChild(botao);
  pintarAlvo();

  /* --- Correção --- */
  function conferir() {
    conferido = true;
    let certas = 0;
    lacunasEl.forEach((b, i) => {
      const ok = respostas[i]?.termo === corretos[i];
      b.classList.remove('is-alvo', 'is-preenchida');
      b.classList.add(ok ? 'is-certa' : 'is-errada');
      if (ok) certas += 1;
      else b.textContent = respostas[i]?.termo || '—';
    });

    const nota = pct(certas, corretos.length);
    ses.acertosTotais += certas;
    ses.lacunasTotais += corretos.length;

    /* Registro do dispositivo */
    const f = fichaLei(disp.id);
    f.tentativas += 1;
    f.acertos += certas;
    f.erros += corretos.length - certas;
    f.melhor = Math.max(f.melhor, nota);
    f.ultima = hojeISO();

    /* Correção das erradas, com o termo certo */
    const errado = lacunasEl
      .map((b, i) => ({ i, ok: respostas[i]?.termo === corretos[i] }))
      .filter((x) => !x.ok);

    const caixa = el('div', { class: `feedback feedback--${nota === 100 ? 'certo' : 'errado'} mt16` },
      el('div', { class: 'feedback__topo' },
        el('span', { class: 'feedback__ico', txt: nota === 100 ? '🌸' : '🩸' }),
        el('span', { class: 'feedback__vered', txt: `${certas}/${corretos.length} corretas` }),
        el('span', { class: 'crescer' }),
        chip(`${nota}%`, nota >= 70 ? 'chip--certo' : 'chip--errado')
      ),
      errado.length
        ? el('div', { class: 'feedback__expl' },
            el('span', { class: 'rot', txt: 'O texto correto era' }),
            el('span', { html: errado.map((x) => `<b>${esc(corretos[x.i])}</b>`).join(' · ') })
          )
        : null,
      el('div', { class: 'feedback__expl' },
        el('span', { class: 'rot', txt: 'Onde a banca mexe' }),
        el('span', { html: md(disp.comentario) })
      )
    );
    palco.appendChild(caixa);

    /* XP e efeitos */
    const r = ganharXp(Math.round(XP.leiSeca * (0.4 + 0.6 * (nota / 100))), {
      peso: ses.mat ? ses.mat.peso : 3, origem: 'leiseca',
    });
    ses.xp += r.ganho;
    pulsoEstudo();
    salvar();

    if (nota === 100) {
      som.certo(); flash('certo'); vibrar(30);
      const rect = texto.getBoundingClientRect();
      petalas.explodir(rect.left + rect.width / 2, rect.top + 40, 18, 0.7);
      flutuar(`+${r.ganho} XP`, window.innerWidth / 2, window.innerHeight * 0.34);
    } else {
      som.errado(); flash('errado'); vibrar([40, 60, 40]);
    }

    botao.remove();
    palco.appendChild(el('button', {
      class: 'btn btn--primario btn--bloco mt16',
      onclick: () => { ses.idx += 1; renderDispositivo(ses); },
    }, ses.idx === ses.fila.length - 1 ? 'Ver resultado' : 'Próximo dispositivo'));

    caixa.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    for (const c of conferirConquistas()) anunciarConquista(c);
    const meta = conferirMeta();
    if (meta.batidaAgora) {
      toast(fala('metaBatida', FALAS).replace('{nome}', esc(S.perfil.nome)), { ico: '⏳', tipo: 'ouro', ms: 4500 });
      som.conquista();
      comemorar(1);
    }
  }
}

function finalizar(ses) {
  const nota = pct(ses.acertosTotais, ses.lacunasTotais);
  registrar({ tipo: 'leiseca', pct: nota, acertos: ses.acertosTotais, total: ses.lacunasTotais, lei: ses.lei.id });
  salvar();

  const texto = nota >= 85
    ? 'Letra de lei na ponta da língua. É exatamente esse o estado em que se entra numa prova da Câmara.'
    : nota >= 60
      ? 'Você sabe o conteúdo, mas ainda não sabe o <b>texto</b>. Na prova de letra de lei, isso é a diferença entre acertar e quase acertar.'
      : 'O dispositivo ainda não está na sua memória. Releia a aula da matéria e volte aqui — este treino só funciona repetido.';

  const { cena } = cenaTamayo(nota >= 85 ? 'orgulhosa' : (nota >= 60 ? 'seria' : 'firme'), texto, { largura: 92, digitando: true });

  ses.palco.innerHTML = '';
  ses.palco.appendChild(el('div', { class: 'grid-stats', style: { marginBottom: '14px' } },
    el('div', { class: 'stat' }, el('div', { class: 'stat__val', txt: `${nota}%` }), el('div', { class: 'stat__rot', txt: 'das lacunas' })),
    el('div', { class: 'stat' }, el('div', { class: 'stat__val', txt: `${ses.acertosTotais}/${ses.lacunasTotais}` }), el('div', { class: 'stat__rot', txt: 'termos certos' })),
    el('div', { class: 'stat' }, el('div', { class: 'stat__val', txt: `+${ses.xp}` }), el('div', { class: 'stat__rot', txt: 'XP' }))
  ));
  ses.palco.appendChild(cena);
  ses.palco.appendChild(el('button', {
    class: 'btn btn--primario btn--bloco mt16',
    onclick: () => ir('leiseca', { leiId: ses.lei.id }, { substituir: true }),
  }, 'Mais 5 dispositivos'));
  ses.palco.appendChild(el('button', {
    class: 'btn btn--fantasma btn--bloco mt8',
    onclick: () => ir('leiseca', {}, { substituir: true }),
  }, 'Trocar de lei'));
  ses.palco.appendChild(el('button', {
    class: 'btn btn--fantasma btn--bloco btn--pequeno mt8',
    onclick: () => voltar(),
  }, 'Voltar'));

  if (nota >= 85) comemorar(2);
}
