/* ============================================================
   Primeiro contato — apresentação e calibragem
   ============================================================ */

import { el, esc, embaralhar, hojeISO, fmtDataBR } from '../util.js';
import { tela, corpo, chip, barra } from './components.js';
import { ir, limparPilha } from '../router.js';
import { som, destravarAudio } from '../audio.js';
import { comemorar, toast } from '../fx.js';
import { petalas } from '../petals.js';
import { S, salvar, salvarJa } from '../state.js';
import { marcarContexto } from '../gamification.js';
import { MATERIAS, TOTAL_NIVEIS, TOTAL_QUESTOES, distribuirPorPeso } from '../data/index.js';
import { sortearPonderado } from '../srs.js';
import { FALAS } from '../data/dialogues.js';
import { cenaTamayo, retratoTamayo, digitar } from '../tamayo.js';

const PASSOS = 4;

export function telaOnboarding() {
  let passo = 0;
  const dados = {
    nome: S.perfil.nome || 'Sara',
    meta: S.perfil.metaMinutos || 60,
    dataProva: S.perfil.dataProva || '',
    fortalezas: new Set(S.perfil.fortalezas || ['portugues', 'ingles']),
  };

  const palco = el('div', { class: 'onb' });
  const pontos = el('div', { class: 'onb__pontos' },
    ...Array.from({ length: PASSOS }, (_, i) => el('span', { class: `onb__ponto ${i === 0 ? 'is-ativo' : ''}` }))
  );

  const render = () => {
    palco.innerHTML = '';
    Array.from(pontos.children).forEach((p, i) => p.classList.toggle('is-ativo', i === passo));
    palco.appendChild(([p0, p1, p2, p3][passo])());
    palco.appendChild(pontos);
    som.navegar();
    petalas.rajada(0.9);
  };

  const avancar = () => { passo = Math.min(PASSOS - 1, passo + 1); render(); };
  const voltarPasso = () => { passo = Math.max(0, passo - 1); render(); };

  /* ---------- Passo 0: apresentação ---------- */
  function p0() {
    const retrato = retratoTamayo('seria');
    retrato.style.width = '176px';
    retrato.style.margin = '0 auto 14px';

    const txt = el('div', { class: 'fala__texto' });
    const balao = el('div', { class: 'fala' },
      el('span', { class: 'fala__nome', txt: 'Professora Tamayo' }), txt
    );
    requestAnimationFrame(() => digitar(txt, FALAS.boasVindas[0].replace(/\n/g, '<br>'), { vel: 22 }));

    return el('div', { class: 'onb__passo txt-c' },
      retrato,
      el('div', { style: { textAlign: 'left' } }, balao),
      el('div', { class: 'linha g6 mt16', style: { justifyContent: 'center', flexWrap: 'wrap' } },
        chip(`${MATERIAS.length} matérias`, 'chip--sakura'),
        chip(`${TOTAL_NIVEIS} níveis`, 'chip--sakura'),
        chip(`${TOTAL_QUESTOES} questões`, 'chip--sakura')
      ),
      el('button', { class: 'btn btn--primario btn--bloco mt24', onclick: avancar }, 'Vamos começar')
    );
  }

  /* ---------- Passo 1: nome e meta ---------- */
  function p1() {
    const campo = el('input', {
      class: 'onb__campo', type: 'text', value: dados.nome, maxlength: '24',
      placeholder: 'Seu nome',
      oninput: (e) => { dados.nome = e.target.value; },
    });

    const valor = el('span', { class: 'painel-xp__rank', txt: `${dados.meta} min` });
    const slider = el('input', {
      type: 'range', min: '30', max: '240', step: '15', value: String(dados.meta),
      style: { width: '100%', accentColor: 'var(--sakura-3)' },
      oninput: (e) => { dados.meta = Number(e.target.value); valor.textContent = `${dados.meta} min`; },
    });

    const campoData = el('input', {
      class: 'onb__campo', type: 'date', value: dados.dataProva,
      min: hojeISO(),
      oninput: (e) => { dados.dataProva = e.target.value; },
    });

    return el('div', { class: 'onb__passo' },
      el('h1', { class: 'onb__tit', txt: 'Como devo te chamar?' }),
      el('p', { class: 'onb__txt', txt: 'Vou usar seu nome quando precisar te chamar de volta ao foco.' }),
      campo,
      el('h1', { class: 'onb__tit mt24', txt: 'Quanto tempo por dia?' }),
      el('p', { class: 'onb__txt', html: 'O combinado é <b>no mínimo uma hora</b>. Pode ser mais — não pode ser menos.' }),
      el('div', { class: 'card' },
        el('div', { class: 'linha entre', style: { marginBottom: '10px' } },
          el('span', { style: { fontSize: '12.5px', color: 'var(--txt-3)', letterSpacing: '.08em', textTransform: 'uppercase' }, txt: 'meta diária' }),
          valor
        ),
        slider
      ),
      el('h1', { class: 'onb__tit mt24', txt: 'Quando é a prova?' }),
      el('p', { class: 'onb__txt', html: 'Se o edital ainda não saiu, chute a data mais provável. Eu preciso de um prazo para calcular seu ritmo — <b>e para te avisar quando ele não estiver dando</b>. Dá para mudar depois em Ajustes.' }),
      el('div', { class: 'card' }, campoData),
      el('button', { class: 'btn btn--primario btn--bloco mt24', onclick: avancar }, 'Continuar'),
      el('button', { class: 'btn btn--fantasma btn--bloco btn--pequeno mt8', onclick: voltarPasso }, 'Voltar')
    );
  }

  /* ---------- Passo 2: calibragem ---------- */
  function p2() {
    const opcoes = el('div', { class: 'col g8 mt12' });
    for (const m of MATERIAS) {
      const b = el('button', {
        class: `onb__opcao ${dados.fortalezas.has(m.id) ? 'is-sel' : ''}`,
        onclick: () => {
          if (dados.fortalezas.has(m.id)) dados.fortalezas.delete(m.id);
          else dados.fortalezas.add(m.id);
          b.classList.toggle('is-sel', dados.fortalezas.has(m.id));
          som.toque();
        },
      },
        el('span', { class: 'linha g10' },
          el('span', { style: { fontSize: '20px' }, txt: m.ico }),
          el('span', { class: 'crescer' },
            el('span', { style: { display: 'block', fontWeight: '650' }, txt: m.curto }),
            el('span', { style: { display: 'block', fontSize: '11.5px', color: 'var(--txt-3)', marginTop: '2px' }, txt: `peso ${m.peso}/5` })
          ),
          el('span', { style: { fontSize: '18px' }, txt: dados.fortalezas.has(m.id) ? '★' : '☆' })
        )
      );
      opcoes.appendChild(b);
    }

    const { cena } = cenaTamayo('pensativa',
      'Marque as matérias em que você <b>já é forte</b>. Não vou pular conteúdo nenhum — mas nessas eu puxo o ritmo e a dificuldade desde o primeiro nível.',
      { largura: 80, digitando: true });

    return el('div', { class: 'onb__passo' },
      el('h1', { class: 'onb__tit', txt: 'Onde você já é forte?' }),
      cena,
      opcoes,
      el('button', { class: 'btn btn--primario btn--bloco mt24', onclick: avancar }, 'Continuar'),
      el('button', { class: 'btn btn--fantasma btn--bloco btn--pequeno mt8', onclick: voltarPasso }, 'Voltar')
    );
  }

  /* ---------- Passo 3: como funciona + início ---------- */
  function p3() {
    const salvarPerfil = () => {
      S.perfil.nome = (dados.nome || '').trim() || 'Sara';
      S.perfil.metaMinutos = dados.meta;
      S.perfil.dataProva = dados.dataProva || null;
      S.perfil.fortalezas = Array.from(dados.fortalezas);
      S.perfil.calibrado = true;
      S.visto.boasVindas = true;
      marcarContexto();
      salvarJa();
    };

    const regra = (ico, tit, txt) => el('div', { class: 'ajuste' },
      el('span', { style: { fontSize: '24px' }, txt: ico }),
      el('div', { class: 'ajuste__corpo' },
        el('div', { class: 'ajuste__tit', txt: tit }),
        el('div', { class: 'ajuste__sub', html: txt })
      )
    );

    return el('div', { class: 'onb__passo' },
      el('h1', { class: 'onb__tit', txt: 'Como a trilha funciona' }),
      regra('⛩️', 'Um nível por vez', 'Aula da Tamayo → exercícios → <b>checkpoint</b>. É preciso <b>70%</b> para liberar o nível seguinte.'),
      regra('✿', 'Três flores por nível', '70% vale uma flor, 85% valem duas, 100% valem três. Refazer para buscar a terceira é permitido — e recomendado.'),
      regra('🩹', 'O que você erra volta', 'Toda questão errada entra na <b>revisão espaçada</b> e reaparece até você provar domínio.'),
      regra('⚖️', 'Peso importa', 'Matéria de peso 5 rende mais XP e aparece mais nos simulados. A trilha já vem ordenada por isso.'),
      regra('🔥', 'Streak e meta', `Estudar todos os dias mantém o streak. Sua meta é de <b>${dados.meta} minutos</b> por dia.`),
      dados.dataProva
        ? regra('📅', 'O relógio da prova', `Prova marcada para <b>${fmtDataBR(dados.dataProva)}</b>. Vou comparar seu ritmo real com esse prazo e te dizer, sem rodeios, se a conta está fechando.`)
        : null,

      el('button', {
        class: 'btn btn--primario btn--bloco mt24',
        onclick: () => {
          salvarPerfil();
          som.nivel();
          comemorar(2);
          limparPilha();
          ir('home', {}, { semPilha: true });
          setTimeout(() => toast('Trilha aberta. Bons estudos, ' + esc(S.perfil.nome) + '.', { ico: '🌸', tipo: 'ouro', ms: 4000 }), 400);
        },
      }, 'Abrir a trilha'),

      el('button', {
        class: 'btn btn--ouro btn--bloco mt8',
        onclick: () => {
          salvarPerfil();
          iniciarDiagnostico();
        },
      }, 'Fazer diagnóstico antes (20 questões)'),

      el('button', { class: 'btn btn--fantasma btn--bloco btn--pequeno mt8', onclick: voltarPasso }, 'Voltar')
    );
  }

  render();
  destravarAudio();
  return tela(corpo({ semNav: true }, palco));
}

/** Simulado diagnóstico inicial: 20 questões proporcionais ao peso. */
function iniciarDiagnostico() {
  const dist = distribuirPorPeso(20);
  const itens = [];
  for (const { mat, n } of dist) {
    const pool = [];
    for (const niv of mat.niveis) for (const q of niv.questoes) pool.push({ q, mat: mat.id, niv: niv.id });
    itens.push(...sortearPonderado(pool, Math.min(n, pool.length), (x) => x.q.id));
  }
  limparPilha();
  ir('quiz', {
    titulo: 'Diagnóstico inicial',
    sub: '20 questões · sem cronômetro',
    itens: embaralhar(itens),
    modo: 'pratica',
  }, { semPilha: true });
}
