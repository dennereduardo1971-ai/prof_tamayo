/* ============================================================
   Dojo — tela inicial
   ============================================================ */

import { el, md, esc, pct, fmtNum, fmtDuracaoLonga, ultimosDias, diaSemana, DIAS_SEM, hojeISO, diffDias, contarAte, clamp } from '../util.js';
import { tela, topbar, corpo, navInferior, barra, chip, secao, pctMateria, proximoNivel, cartaoMateria } from './components.js';
import { ir, limparPilha } from '../router.js';
import { som } from '../audio.js';
import { toast } from '../fx.js';
import { S, diaDe, minutosHoje, progMateria, progNivel } from '../state.js';
import { progressoPatente, estadoMeta, estatisticas, patenteDe } from '../gamification.js';
import { resumoSrs, pontosFracos } from '../srs.js';
import { MATERIAS, porPeso, materia as buscaMateria, TOTAL_NIVEIS } from '../data/index.js';
import { FALAS } from '../data/dialogues.js';
import { cenaTamayo, fala } from '../tamayo.js';

export function telaHome() {
  const nome = S.perfil.nome || 'Sara';
  const meta = estadoMeta();
  const stats = estatisticas();
  const pat = progressoPatente();
  const srs = resumoSrs();

  /* ---------- Saudação contextual ---------- */
  const h = new Date().getHours();
  const diasComEstudo = Object.entries(S.dias).filter(([, d]) => (d.q || 0) > 0).map(([k]) => k).sort();
  const ultimoEstudo = diasComEstudo.length ? diasComEstudo[diasComEstudo.length - 1] : null;
  const ausencia = ultimoEstudo ? diffDias(ultimoEstudo, hojeISO()) : null;

  let grupo, expr;
  if (!diasComEstudo.length) { grupo = 'saudacaoPrimeiraVez'; expr = 'seria'; }
  else if (ausencia !== null && ausencia >= 3) { grupo = 'saudacaoVolta'; expr = 'firme'; }
  else if (meta.batida) { grupo = 'saudacaoMetaBatida'; expr = 'orgulhosa'; }
  else if (S.streak.atual >= 7) { grupo = 'saudacaoStreakAlto'; expr = 'orgulhosa'; }
  else if (h < 12) { grupo = 'saudacaoManha'; expr = 'sorriso'; }
  else if (h < 18) { grupo = 'saudacaoTarde'; expr = 'neutra'; }
  else { grupo = 'saudacaoNoite'; expr = 'seria'; }

  const texto = fala(grupo, FALAS)
    .replace('{nome}', esc(nome))
    .replace('{streak}', S.streak.atual)
    .replace('{dias}', ausencia ?? 0);

  const { cena } = cenaTamayo(expr, texto, { largura: 96, digitando: true });
  cena.classList.add('saudacao');

  /* ---------- Painel de XP / patente ---------- */
  const numXp = el('span', { txt: '0' });
  const painelXp = el('div', { class: 'card card--ouro painel-xp' },
    el('div', { class: 'card__brilho' }),
    el('div', { class: 'painel-xp__topo' },
      el('div', {},
        el('div', { class: 'painel-xp__nivel', txt: 'patente atual' }),
        el('div', { class: 'painel-xp__rank', style: { color: pat.atual.cor } }, `${pat.atual.kanji} ${pat.atual.nome}`)
      ),
      el('div', { style: { textAlign: 'right' } },
        el('div', { class: 'painel-xp__nivel', txt: 'XP total' }),
        el('div', { class: 'painel-xp__rank' }, numXp)
      )
    ),
    barra(pat.pct, { classe: 'barra--ouro' }),
    el('div', { class: 'painel-xp__num' },
      el('span', { txt: pat.prox ? `faltam ${fmtNum(pat.faltam)} XP para ${pat.prox.nome}` : 'patente máxima alcançada' }),
      el('span', { txt: `${pat.pct}%` })
    )
  );
  requestAnimationFrame(() => contarAte(0, S.xp, 900, (v) => { numXp.textContent = fmtNum(v); }));

  /* ---------- Estatísticas rápidas ---------- */
  const grid = el('div', { class: 'grid-stats' },
    el('div', { class: 'stat stat--streak' },
      el('div', { class: 'stat__val' }, el('span', { txt: `🔥${S.streak.atual}` })),
      el('div', { class: 'stat__rot', txt: 'dias seguidos' })
    ),
    el('div', { class: 'stat' },
      el('div', { class: 'stat__val', txt: `${stats.taxa}%` }),
      el('div', { class: 'stat__rot', txt: 'de acerto' })
    ),
    el('div', { class: 'stat' },
      el('div', { class: 'stat__val', txt: fmtNum(stats.q) }),
      el('div', { class: 'stat__rot', txt: 'questões' })
    )
  );

  /* ---------- Meta do dia ---------- */
  const dias7 = ultimosDias(7);
  const faixa = el('div', { class: 'meta-dia__dias' },
    ...dias7.map((iso) => {
      const d = S.dias[iso];
      const ok = d && ((d.q || 0) > 0 || (d.min || 0) >= 5);
      const classes = ['meta-dia__dia'];
      if (ok) classes.push('is-ok');
      if (iso === hojeISO()) classes.push('is-hoje');
      return el('span', { class: classes.join(' '), txt: DIAS_SEM[diaSemana(iso)] });
    })
  );

  const metaCard = el('div', { class: 'card meta-dia' },
    el('div', { class: 'meta-dia__topo' },
      el('span', { class: 'meta-dia__rot', txt: 'meta de hoje' }),
      el('span', { class: 'meta-dia__val', txt: `${meta.feito} / ${meta.meta} min` })
    ),
    barra(meta.pct, { classe: meta.batida ? 'barra--certo' : '' }),
    faixa,
    meta.batida
      ? el('p', { style: { fontSize: '12px', color: 'var(--certo)', margin: '10px 0 0', fontWeight: '600' }, txt: '✓ Meta cumprida. O resto de hoje é vantagem.' })
      : el('p', { style: { fontSize: '12px', color: 'var(--txt-3)', margin: '10px 0 0' }, txt: `Faltam ${Math.max(0, meta.meta - meta.feito)} minutos para fechar o dia.` })
  );

  /* ---------- Recomendação do dia ---------- */
  const recomendada = escolherRecomendacao();
  let cardRec = null;
  if (recomendada) {
    const { mat, niv, idx } = recomendada;
    cardRec = el('button', {
      class: 'card card--sakura',
      style: { display: 'block', width: '100%', textAlign: 'left', marginTop: '12px' },
      onclick: () => ir('aula', { matId: mat.id, nivId: niv.id }),
    },
      el('div', { class: 'card__brilho' }),
      el('div', { class: 'linha g6', style: { marginBottom: '8px' } },
        chip('próximo passo', 'chip--sakura'),
        chip(`peso ${mat.peso}/5`, mat.peso >= 5 ? 'chip--peso5' : '')
      ),
      el('div', { class: 'linha g12' },
        el('span', { style: { fontSize: '30px' }, txt: mat.ico }),
        el('div', { class: 'crescer' },
          el('div', { style: { fontSize: '11px', letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--txt-3)' }, txt: `${mat.curto} · nível ${idx + 1}` }),
          el('div', { style: { fontFamily: 'var(--f-display)', fontSize: '16px', lineHeight: '1.3', marginTop: '3px' }, txt: niv.titulo })
        ),
        el('span', { style: { fontSize: '22px', color: 'var(--sakura-2)' }, txt: '›' })
      )
    );
  }

  /* ---------- Ações rápidas ---------- */
  const acoes = el('div', { class: 'acoes-rapidas' },
    el('button', { class: 'acao', onclick: () => { limparPilha(); ir('trilha', {}, { semPilha: true }); } },
      el('span', { class: 'acao__ico', txt: '⛩️' }),
      el('span', { class: 'acao__tit', txt: 'Trilha completa' }),
      el('span', { class: 'acao__sub', txt: `${TOTAL_NIVEIS} níveis · 12 matérias` })
    ),
    el('button', { class: `acao ${srs.pendentes > 0 ? 'acao--destaque' : ''}`, onclick: () => { limparPilha(); ir('revisao', {}, { semPilha: true }); } },
      srs.pendentes > 0 ? el('span', { class: 'acao__badge', txt: String(Math.min(srs.pendentes, 99)) }) : null,
      el('span', { class: 'acao__ico', txt: '🩹' }),
      el('span', { class: 'acao__tit', txt: 'Revisão do dia' }),
      el('span', { class: 'acao__sub', txt: srs.pendentes > 0 ? `${srs.pendentes} questões cobrando você` : 'nenhuma pendência — bom sinal' })
    ),
    el('button', { class: 'acao', onclick: () => { limparPilha(); ir('simulado', {}, { semPilha: true }); } },
      el('span', { class: 'acao__ico', txt: '⏱️' }),
      el('span', { class: 'acao__tit', txt: 'Simulado' }),
      el('span', { class: 'acao__sub', txt: stats.simulados ? `melhor: ${stats.melhorSimulado}%` : 'estilo prova, com cronômetro' })
    ),
    el('button', { class: 'acao', onclick: () => { limparPilha(); ir('progresso', {}, { semPilha: true }); } },
      el('span', { class: 'acao__ico', txt: '📊' }),
      el('span', { class: 'acao__tit', txt: 'Meu progresso' }),
      el('span', { class: 'acao__sub', txt: `${Object.keys(S.badges).length} conquistas` })
    )
  );

  /* ---------- Pontos fracos ---------- */
  const fracos = pontosFracos(3);
  let blocoFracos = null;
  if (fracos.length) {
    blocoFracos = el('div', {},
      secao('Onde você está sangrando'),
      ...fracos.map((f) => {
        const mat = buscaMateria(f.mat);
        const nivObj = mat?.niveis.find((n) => n.id === f.niv);
        return el('button', {
          class: 'stats-linha',
          style: { width: '100%', textAlign: 'left' },
          onclick: () => nivObj && ir('aula', { matId: f.mat, nivId: f.niv }),
        },
          el('span', { txt: mat ? mat.ico : '•' }),
          el('span', { class: 'stats-linha__nome' },
            el('div', { style: { fontSize: '13px' }, txt: nivObj ? nivObj.titulo : f.niv }),
            el('div', { style: { fontSize: '11px', color: 'var(--txt-3)', marginTop: '2px' }, txt: `${mat ? mat.curto : ''} · ${f.erros} erro${f.erros > 1 ? 's' : ''} acumulado${f.erros > 1 ? 's' : ''}` })
          ),
          el('span', { style: { color: 'var(--errado)', fontSize: '18px' }, txt: '›' })
        );
      })
    );
  }

  const conteudo = el('div', { class: 'home' },
    cena,
    painelXp,
    grid,
    metaCard,
    cardRec,
    el('div', { style: { marginTop: '12px' } }, acoes),
    blocoFracos,
    el('p', {
      style: { fontSize: '11px', color: 'var(--txt-3)', textAlign: 'center', marginTop: '26px', lineHeight: '1.6' },
      html: `Concurso em fase de pré-edital · meta diária de ${S.perfil.metaMinutos} min<br>Tudo o que você faz aqui fica salvo neste dispositivo.`,
    })
  );

  return tela(
    topbar('Dojo da Tamayo', { sub: `Olá, ${esc(nome)}`, comVoltar: false,
      acao: el('button', {
        class: 'topbar__voltar',
        'aria-label': 'Ajustes',
        onclick: () => ir('ajustes'),
      }, '⚙') }),
    corpo(conteudo),
    navInferior('home')
  );
}

/**
 * Escolhe o próximo nível recomendado: maior peso entre as matérias
 * com nível pendente, com leve rotação para não travar numa só.
 */
function escolherRecomendacao() {
  const candidatas = [];
  for (const mat of porPeso()) {
    const p = progMateria(mat.id);
    const idx = mat.niveis.findIndex((n) => !p.niveis[n.id]?.concluido);
    if (idx === -1) continue;
    // Só recomenda nível liberado (o anterior concluído ou o primeiro).
    const liberado = idx === 0 || !!p.niveis[mat.niveis[idx - 1].id]?.concluido;
    if (!liberado) continue;
    const feitosHoje = (S.historico || []).filter((h) => h.dia === hojeISO() && h.mat === mat.id).length;
    candidatas.push({ mat, niv: mat.niveis[idx], idx, prioridade: mat.peso * 10 - feitosHoje * 3 - idx * 0.2 });
  }
  if (!candidatas.length) return null;
  candidatas.sort((a, b) => b.prioridade - a.prioridade);
  return candidatas[0];
}
