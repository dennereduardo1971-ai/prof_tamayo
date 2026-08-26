/* ============================================================
   Dojo — tela inicial
   ============================================================ */

import { el, esc, pct, fmtNum, fmtDataBR, ultimosDias, diaSemana, DIAS_SEM, hojeISO, diffDias, contarAte } from '../util.js';
import { tela, topbar, corpo, navInferior, barra, chip, secao } from './components.js';
import { ir, limparPilha } from '../router.js';
import { S } from '../state.js';
import { progressoPatente, estadoMeta, estatisticas, contagemProva, ritmoEdital, planoDoDia, auditarFortalezas } from '../gamification.js';
import { resumoSrs, pontosFracos, resumoErros } from '../srs.js';
import { materia as buscaMateria, TOTAL_NIVEIS } from '../data/index.js';
import { FALAS } from '../data/dialogues.js';
import { cenaTamayo, fala } from '../tamayo.js';
import { abrirPraticaMateria } from './trilha.js';

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

  /* ---------- A prova ---------- */
  const cardProva = montarCardProva();

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

  /* ---------- Plano do dia ---------- */
  const cardPlano = montarPlano();

  /* ---------- Ações rápidas ---------- */
  const erros = resumoErros();
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
    el('button', { class: 'acao', onclick: () => ir('caderno') },
      erros.abertos > 0 ? el('span', { class: 'acao__badge', txt: String(Math.min(erros.abertos, 99)) }) : null,
      el('span', { class: 'acao__ico', txt: '📓' }),
      el('span', { class: 'acao__tit', txt: 'Caderno de erros' }),
      el('span', { class: 'acao__sub', txt: erros.total ? `${erros.abertos} em aberto · ${erros.reincidentes} reincidentes` : 'ainda sem erros registrados' })
    ),
    el('button', { class: 'acao', onclick: () => ir('leiseca') },
      el('span', { class: 'acao__ico', txt: '📜' }),
      el('span', { class: 'acao__tit', txt: 'Lei seca' }),
      el('span', { class: 'acao__sub', txt: 'recompor o dispositivo pelas lacunas' })
    ),
    el('button', { class: 'acao', onclick: () => ir('mapa') },
      el('span', { class: 'acao__ico', txt: '🗺️' }),
      el('span', { class: 'acao__tit', txt: 'Mapas mentais' }),
      el('span', { class: 'acao__sub', txt: 'o edital em árvore, para revisar rápido' })
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
    cardProva,
    grid,
    metaCard,
    cardPlano,
    el('div', { style: { marginTop: '12px' } }, acoes),
    montarAuditoria(),
    blocoFracos,
    el('p', {
      style: { fontSize: '11px', color: 'var(--txt-3)', textAlign: 'center', marginTop: '26px', lineHeight: '1.6' },
      html: `${S.perfil.dataProva ? `Prova em ${fmtDataBR(S.perfil.dataProva)}` : 'Concurso em fase de pré-edital'} · meta diária de ${S.perfil.metaMinutos} min<br>Tudo o que você faz aqui fica salvo neste dispositivo.`,
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

/* ------------------------------------------------------------
   A prova: quantos dias faltam e se o ritmo está fechando a conta
   ------------------------------------------------------------ */
function montarCardProva() {
  const cp = contagemProva();
  if (!cp) {
    return el('button', {
      class: 'card',
      style: { display: 'block', width: '100%', textAlign: 'left', marginTop: '12px' },
      onclick: () => ir('ajustes'),
    },
      el('div', { class: 'prova__rot', txt: 'data da prova' }),
      el('p', { style: { fontSize: '13px', lineHeight: '1.6', color: 'var(--txt-2)', margin: '6px 0 0' },
        html: 'Você ainda não marcou a data. Sem prazo eu não consigo dizer se o seu ritmo dá conta do edital — <b>toque para definir</b>.' })
    );
  }

  const r = ritmoEdital();
  const VEREDITOS = {
    'em-dia': ['em-dia', 'No ritmo atual você termina o edital antes da prova, com folga para revisar. Mantenha exatamente isso.'],
    apertado: ['apertado', 'Você termina — em cima da hora, sem margem para imprevisto nem para revisão final. Um degrau a mais por semana resolve.'],
    atrasado: ['atrasado', 'No ritmo atual o edital <b>não</b> termina antes da prova. Não é ameaça, é aritmética: ou sobe o ritmo, ou escolhemos juntas o que sacrificar.'],
    'sem-dados': ['', 'Ainda não concluí nenhum nível seu para medir ritmo. Termine o primeiro e eu te digo se a conta fecha.'],
    concluido: ['em-dia', 'Edital inteiro concluído. Daqui até a prova é revisão, simulado e lei seca.'],
    passou: ['', 'A data que você marcou já passou. Atualize em Ajustes.'],
  };
  const [classe, texto] = VEREDITOS[r.veredito] || ['', ''];

  const detalhe = [];
  if (r.previsaoISO && r.veredito !== 'concluido' && r.veredito !== 'passou') {
    detalhe.push(`previsão de conclusão: <b>${fmtDataBR(r.previsaoISO)}</b>`);
  }
  if (r.necessarioDia) {
    const porSemana = (r.necessarioDia * 7).toFixed(1).replace('.0', '');
    detalhe.push(`necessário: <b>${porSemana}</b> níveis por semana`);
  }
  if (r.ritmoDia > 0) {
    const atual = (r.ritmoDia * 7).toFixed(1).replace('.0', '');
    detalhe.push(`seu ritmo: <b>${atual}</b> por semana`);
  }

  return el('div', { class: 'card card--sakura prova', style: { marginTop: '12px' } },
    el('div', { class: 'card__brilho' }),
    el('div', { class: 'linha entre g8' },
      el('div', {},
        el('div', { class: 'prova__rot', txt: cp.passou ? 'a prova era em' : 'faltam para a prova' }),
        el('div', { class: 'prova__dias', txt: cp.passou ? fmtDataBR(cp.iso) : String(cp.dias) }),
        !cp.passou ? el('div', { style: { fontSize: '12px', color: 'var(--txt-3)', marginTop: '2px' },
          txt: `dias · ${fmtDataBR(cp.iso)}` }) : null
      ),
      el('div', { style: { textAlign: 'right' } },
        el('div', { class: 'prova__rot', txt: 'edital concluído' }),
        el('div', { class: 'painel-xp__rank', txt: `${r.pct}%` }),
        el('div', { style: { fontSize: '11.5px', color: 'var(--txt-3)', marginTop: '2px' },
          txt: `${r.niveisFeitos}/${r.niveisTotal} níveis` })
      )
    ),
    el('div', { style: { marginTop: '10px' } }, barra(r.pct, { classe: 'barra--ouro' })),
    texto ? el('div', { class: `prova__veredito ${classe ? `prova__veredito--${classe}` : ''}`, html: texto }) : null,
    detalhe.length
      ? el('div', { style: { fontSize: '11.5px', color: 'var(--txt-3)', marginTop: '9px', lineHeight: '1.8' }, html: detalhe.join(' · ') })
      : null
  );
}

/* ------------------------------------------------------------
   Plano do dia
   ------------------------------------------------------------ */
function montarPlano() {
  const plano = planoDoDia();
  if (!plano.blocos.length) return null;

  const wrap = el('div', { style: { marginTop: '14px' } },
    el('div', { class: 'linha entre g8', style: { marginBottom: '8px' } },
      secao('Plano de hoje'),
      el('span', { style: { fontSize: '11.5px', color: 'var(--txt-3)', whiteSpace: 'nowrap' },
        txt: `~${plano.total} min` })
    )
  );

  for (const b of plano.blocos) {
    const cartao = el('button', {
      class: `acao ${b.urgente ? 'acao--destaque' : ''}`,
      style: { width: '100%', marginBottom: '8px', textAlign: 'left' },
      onclick: () => {
        if (b.pratica) {
          const mat = buscaMateria(b.pratica.matId);
          if (mat) { abrirPraticaMateria(mat, b.pratica.n); return; }
        }
        if (b.rota === 'revisao' || b.rota === 'simulado') limparPilha();
        ir(b.rota, b.params, b.rota === 'revisao' || b.rota === 'simulado' ? { semPilha: true } : {});
      },
    },
      el('span', { class: 'linha g12' },
        el('span', { style: { fontSize: '24px' }, txt: b.ico }),
        el('span', { class: 'crescer' },
          el('span', { class: 'acao__tit', style: { display: 'block' }, txt: b.titulo }),
          el('span', { class: 'acao__sub', style: { display: 'block', marginTop: '3px' }, txt: b.sub })
        ),
        chip(`${b.min} min`, b.urgente ? 'chip--errado' : '')
      )
    );
    wrap.appendChild(cartao);
  }
  return wrap;
}

/* ------------------------------------------------------------
   Fortaleza declarada x desempenho real
   ------------------------------------------------------------ */
function montarAuditoria() {
  const linhas = auditarFortalezas();
  if (!linhas.length) return null;

  const pior = linhas[0];
  const grupo = pior.confirmada ? 'fortalezaConfirmada' : 'fortalezaFalsa';
  const txt = fala(grupo, FALAS)
    .replace('{materia}', esc(pior.mat.curto))
    .replace('{taxa}', String(pior.taxa));

  return el('button', {
    class: `card ${pior.confirmada ? '' : 'card--ouro'}`,
    style: { display: 'block', width: '100%', textAlign: 'left', marginTop: '14px' },
    onclick: () => ir('materia', { matId: pior.mat.id }),
  },
    el('div', { class: 'linha g6', style: { marginBottom: '8px' } },
      chip('ponto forte declarado', 'chip--sakura'),
      chip(`${pior.taxa}% em ${pior.q} questões`, pior.confirmada ? 'chip--certo' : 'chip--errado')
    ),
    el('div', { style: { fontSize: '13.5px', lineHeight: '1.65', color: 'var(--txt-2)' }, html: txt })
  );
}
