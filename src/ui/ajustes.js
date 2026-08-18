/* ============================================================
   Ajustes, perfil e dados
   ============================================================ */

import { el, esc, clamp, fmtNum } from '../util.js';
import { tela, topbar, corpo, chip, secao, barra } from './components.js';
import { ir, voltar, limparPilha } from '../router.js';
import { som, ligarSom } from '../audio.js';
import { petalas } from '../petals.js';
import { toast, modal, confirmar } from '../fx.js';
import { S, salvar, salvarJa, exportarSave, importarSave, zerarTudo, consolidarTempo } from '../state.js';
import { VERSAO_SAVE } from '../state.js';
import { estatisticas } from '../gamification.js';
import { TOTAL_QUESTOES, TOTAL_NIVEIS, MATERIAS } from '../data/index.js';

export function telaAjustes() {
  const raiz = el('div', { class: 'pad' });

  /* ---------- Perfil ---------- */
  raiz.appendChild(secao('Perfil'));

  const campoNome = el('input', {
    class: 'onb__campo', type: 'text', value: S.perfil.nome, maxlength: '24',
    oninput: (e) => { S.perfil.nome = e.target.value.trim() || 'Sara'; salvar(); },
  });
  raiz.appendChild(el('div', { class: 'ajuste' },
    el('div', { class: 'ajuste__corpo' },
      el('div', { class: 'ajuste__tit', txt: 'Como a Tamayo te chama' }),
      el('div', { style: { marginTop: '8px' } }, campoNome)
    )
  ));

  const valorMeta = el('span', { class: 'painel-xp__rank', txt: `${S.perfil.metaMinutos} min` });
  const slider = el('input', {
    type: 'range', min: '15', max: '240', step: '15', value: String(S.perfil.metaMinutos),
    style: { width: '100%', accentColor: 'var(--sakura-3)' },
    oninput: (e) => {
      S.perfil.metaMinutos = Number(e.target.value);
      valorMeta.textContent = `${S.perfil.metaMinutos} min`;
      salvar();
    },
  });
  raiz.appendChild(el('div', { class: 'ajuste' },
    el('div', { class: 'ajuste__corpo' },
      el('div', { class: 'linha entre' },
        el('div', { class: 'ajuste__tit', txt: 'Meta diária de estudo' }),
        valorMeta
      ),
      el('div', { class: 'ajuste__sub', txt: 'O mínimo combinado é 1 hora por dia.' }),
      el('div', { style: { marginTop: '10px' } }, slider)
    )
  ));

  /* ---------- Experiência ---------- */
  raiz.appendChild(secao('Experiência'));

  raiz.appendChild(toggle('Som', 'Efeitos sintetizados no estilo koto. Sem arquivos de áudio.', 'som', (v) => {
    ligarSom(v);
    if (v) som.certo();
  }));

  raiz.appendChild(toggle('Animações', 'Desligue se preferir a interface parada ou para economizar bateria.', 'animacoes', (v) => {
    document.documentElement.dataset.anim = v ? 'on' : 'off';
  }));

  raiz.appendChild(toggle('Vibração', 'Retorno tátil nos acertos e erros.', 'hapticos'));

  /* Densidade de pétalas */
  const OPC = [['off', 'Nenhuma'], ['leve', 'Leve'], ['normal', 'Normal'], ['forte', 'Forte']];
  const botoesP = el('div', { class: 'linha g6', style: { flexWrap: 'wrap', marginTop: '10px' } });
  const refs = OPC.map(([v, rot]) => {
    const b = el('button', {
      class: `chip ${S.ajustes.petalas === v ? 'chip--sakura' : ''}`,
      style: { padding: '9px 14px', fontSize: '12px' },
      onclick: () => {
        S.ajustes.petalas = v;
        petalas.densidade(v);
        salvar();
        som.toque();
        refs.forEach((r, i) => r.classList.toggle('chip--sakura', OPC[i][0] === v));
      },
    }, rot);
    botoesP.appendChild(b);
    return b;
  });
  raiz.appendChild(el('div', { class: 'ajuste' },
    el('div', { class: 'ajuste__corpo' },
      el('div', { class: 'ajuste__tit', txt: 'Chuva de pétalas' }),
      el('div', { class: 'ajuste__sub', txt: 'Quantidade de pétalas caindo ao fundo.' }),
      botoesP
    )
  ));

  /* ---------- Dados ---------- */
  raiz.appendChild(secao('Meus dados'));
  const stats = estatisticas();

  raiz.appendChild(el('div', { class: 'card', style: { marginBottom: '10px', fontSize: '13px', lineHeight: '1.7', color: 'var(--txt-2)' } },
    el('div', { class: 'linha entre' }, el('span', { txt: 'XP acumulado' }), el('b', { txt: fmtNum(S.xp) })),
    el('div', { class: 'linha entre' }, el('span', { txt: 'Questões respondidas' }), el('b', { txt: fmtNum(stats.q) })),
    el('div', { class: 'linha entre' }, el('span', { txt: 'Dias de estudo' }), el('b', { txt: String(stats.diasEstudados) })),
    el('div', { class: 'linha entre' }, el('span', { txt: 'Fichas de revisão' }), el('b', { txt: String(stats.srsTotal) })),
    el('div', { class: 'linha entre' }, el('span', { txt: 'Banco de questões' }), el('b', { txt: `${TOTAL_QUESTOES} em ${TOTAL_NIVEIS} níveis` }))
  ));

  raiz.appendChild(el('button', {
    class: 'btn btn--fantasma btn--bloco',
    onclick: () => {
      consolidarTempo();
      salvarJa();
      const txt = exportarSave();
      modal({
        titulo: 'Backup do progresso',
        corpo: el('div', {},
          el('p', { style: { fontSize: '13px', color: 'var(--txt-2)', lineHeight: '1.65' },
            html: 'Copie o texto abaixo e guarde em algum lugar seguro. Para restaurar, use <b>Restaurar backup</b> e cole aqui de volta.' }),
          el('textarea', {
            class: 'onb__campo',
            style: { height: '150px', fontFamily: 'var(--f-mono)', fontSize: '10px', resize: 'vertical' },
            readonly: true,
            onclick: (e) => { e.target.select(); },
          }, txt)
        ),
        acoes: [
          { rotulo: 'Copiar para a área de transferência', classe: 'btn--primario', fecha: false, acao: async () => {
            try { await navigator.clipboard.writeText(txt); toast('Backup copiado.', { ico: '📋', tipo: 'certo' }); }
            catch { toast('Não consegui copiar. Selecione o texto manualmente.', { ico: '⚠️' }); }
          } },
          { rotulo: 'Fechar', classe: 'btn--fantasma' },
        ],
      });
    },
  }, '⬇ Exportar backup'));

  raiz.appendChild(el('button', {
    class: 'btn btn--fantasma btn--bloco mt8',
    onclick: () => {
      const area = el('textarea', {
        class: 'onb__campo',
        style: { height: '130px', fontFamily: 'var(--f-mono)', fontSize: '10px', resize: 'vertical' },
        placeholder: 'Cole aqui o conteúdo do backup...',
      });
      modal({
        titulo: 'Restaurar backup',
        corpo: el('div', {},
          el('p', { style: { fontSize: '13px', color: 'var(--txt-2)', lineHeight: '1.65' },
            txt: 'Isto substitui o progresso atual pelo conteúdo do backup. Não tem como desfazer.' }),
          area
        ),
        acoes: [
          { rotulo: 'Restaurar', classe: 'btn--perigo', acao: () => {
            try {
              importarSave(area.value);
              toast('Progresso restaurado.', { ico: '✅', tipo: 'certo' });
              limparPilha();
              ir('home', {}, { semPilha: true });
            } catch (e) {
              toast('Backup inválido. Confira se colou o texto inteiro.', { ico: '⚠️', tipo: 'errado' });
            }
          } },
          { rotulo: 'Cancelar', classe: 'btn--fantasma' },
        ],
      });
    },
  }, '⬆ Restaurar backup'));

  raiz.appendChild(el('button', {
    class: 'btn btn--perigo btn--bloco mt16',
    onclick: () => confirmar(
      'Zerar todo o progresso?',
      'XP, streak, níveis, conquistas e histórico de revisão serão apagados. <b>Isto não pode ser desfeito.</b>',
      () => {
        zerarTudo();
        toast('Tudo zerado. A trilha recomeça do primeiro nível.', { ico: '🌱' });
        limparPilha();
        ir('onboarding', {}, { semPilha: true });
      },
      'Sim, apagar tudo'
    ),
  }, 'Zerar progresso'));

  /* ---------- Sobre ---------- */
  raiz.appendChild(secao('Sobre'));
  raiz.appendChild(el('div', { class: 'card', style: { fontSize: '12.5px', lineHeight: '1.75', color: 'var(--txt-2)' } },
    el('p', { style: { margin: '0 0 9px' }, html: '<b>Professora Tamayo</b> — trilha de estudos para o concurso da Câmara dos Deputados, cargo de Analista Legislativo.' }),
    el('p', { style: { margin: '0 0 9px' }, html: `Banco atual: <b>${MATERIAS.length} matérias</b>, <b>${TOTAL_NIVEIS} níveis</b> e <b>${TOTAL_QUESTOES} questões</b> comentadas.` }),
    el('p', { style: { margin: '0 0 9px', color: 'var(--txt-3)' }, html: 'O concurso está em fase de <b>pré-edital</b>. A grade e os pesos reproduzem o escopo historicamente cobrado para o cargo e devem ser revisados quando o edital oficial for publicado.' }),
    el('p', { style: { margin: 0, color: 'var(--txt-3)', fontSize: '11px' }, txt: `Formato de save v${VERSAO_SAVE} · funciona offline · progresso salvo neste dispositivo.` })
  ));

  raiz.appendChild(el('p', {
    style: { textAlign: 'center', fontSize: '11px', color: 'var(--txt-3)', margin: '20px 0 10px', fontStyle: 'italic' },
    txt: '"A cerejeira não floresce num dia — ela insiste o ano inteiro."',
  }));

  return tela(topbar('Ajustes'), corpo({ semNav: true }, raiz));
}

function toggle(titulo, sub, chave, aoMudar) {
  const sw = el('div', { class: `switch ${S.ajustes[chave] ? 'is-on' : ''}` });
  const linha = el('div', { class: 'ajuste' },
    el('div', { class: 'ajuste__corpo' },
      el('div', { class: 'ajuste__tit', txt: titulo }),
      el('div', { class: 'ajuste__sub', txt: sub })
    ),
    sw
  );
  linha.addEventListener('click', () => {
    S.ajustes[chave] = !S.ajustes[chave];
    sw.classList.toggle('is-on', S.ajustes[chave]);
    salvar();
    som.toque();
    if (aoMudar) aoMudar(S.ajustes[chave]);
  });
  return linha;
}
