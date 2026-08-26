/* ============================================================
   Professora Tamayo — ponto de entrada
   ============================================================ */

import { $, ligarOndas, esc } from './util.js';
import { carregar, ligarPersistencia, normalizarDia, S, salvarJa, consolidarTempo } from './state.js';
import { iniciarPetalas, petalas } from './petals.js';
import { ligarSom, destravarAudio, som } from './audio.js';
import { toast } from './fx.js';
import { registrarTela, ir, voltar, podeVoltar, limparPilha } from './router.js';
import { marcarContexto, conferirConquistas } from './gamification.js';

import { telaHome } from './ui/home.js';
import { telaTrilha, telaMateria } from './ui/trilha.js';
import { telaAula, abrirCheckpoint } from './ui/aula.js';
import { telaQuiz, anunciarConquista } from './ui/quiz.js';
import { telaResultado } from './ui/resultado.js';
import { telaRevisao } from './ui/revisao.js';
import { telaSimulado } from './ui/simulado.js';
import { telaProgresso } from './ui/progresso.js';
import { telaCaderno } from './ui/caderno.js';
import { telaMapa } from './ui/mapa.js';
import { telaLeiSeca } from './ui/leiseca.js';
import { telaAjustes } from './ui/ajustes.js';
import { telaOnboarding } from './ui/onboarding.js';

/* ---------------- Registro de telas ---------------- */

registrarTela('home', telaHome);
registrarTela('trilha', telaTrilha);
registrarTela('materia', telaMateria);
registrarTela('aula', telaAula);
registrarTela('quiz', telaQuiz);
registrarTela('resultado', telaResultado);
registrarTela('revisao', telaRevisao);
registrarTela('simulado', telaSimulado);
registrarTela('progresso', telaProgresso);
registrarTela('caderno', telaCaderno);
registrarTela('mapa', telaMapa);
registrarTela('leiseca', telaLeiSeca);
registrarTela('ajustes', telaAjustes);
registrarTela('onboarding', telaOnboarding);

// Checkpoint é um atalho que monta a configuração e abre o motor de questões.
registrarTela('checkpoint', (params) => telaQuiz(abrirCheckpoint(params)));

/* ---------------- Boot ---------------- */

function aplicarAjustes() {
  ligarSom(S.ajustes.som !== false);
  document.documentElement.dataset.anim = S.ajustes.animacoes === false ? 'off' : 'on';
  petalas.densidade(S.ajustes.petalas || 'normal');
}

function iniciar() {
  carregar();
  normalizarDia();
  marcarContexto();

  iniciarPetalas($('#petals'), S.ajustes.petalas || 'normal');
  aplicarAjustes();
  ligarPersistencia();
  ligarOndas(document.body);
  destravarAudio();

  const primeiraVez = !S.visto.boasVindas || !S.perfil.calibrado;
  ir(primeiraVez ? 'onboarding' : 'home', {}, { semPilha: true, semSom: true });

  // Conquistas retroativas (ex.: streak calculado na virada do dia).
  setTimeout(() => {
    conferirConquistas().forEach((c, i) => setTimeout(() => anunciarConquista(c), i * 1100));
  }, 1400);

  // Esconde o splash.
  setTimeout(() => {
    const sp = $('#splash');
    if (sp) {
      sp.classList.add('is-hidden');
      setTimeout(() => sp.remove(), 700);
    }
  }, 850);

  ligarBotaoVoltarDoAndroid();
  registrarServiceWorker();
  avisarStreakQuebrado();
}

/** Trata o botão físico "voltar" do Android (e o gesto no navegador). */
function ligarBotaoVoltarDoAndroid() {
  history.replaceState({ tamayo: 0 }, '');
  history.pushState({ tamayo: 1 }, '');
  window.addEventListener('popstate', () => {
    if (podeVoltar()) {
      voltar();
      history.pushState({ tamayo: 1 }, '');
    } else {
      // Na raiz: pede confirmação em vez de fechar sem avisar.
      history.pushState({ tamayo: 1 }, '');
      toast('Toque em voltar de novo para sair — ou continue estudando.', { ico: '🌸', ms: 2200 });
    }
  });
}

/** Avisa quando a sequência foi perdida, uma vez por dia. */
function avisarStreakQuebrado() {
  if (S.streak.atual === 0 && S.streak.recorde >= 3 && S.visto.avisoStreak !== S.streak.ultimoDia) {
    S.visto.avisoStreak = S.streak.ultimoDia;
    salvarJa();
    setTimeout(() => {
      toast('Sua sequência caiu. Levante — recomeçar hoje vale mais do que se justificar.', { ico: '🕯️', tipo: 'errado', ms: 5000 });
    }, 2000);
  }
}

function registrarServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((e) => console.warn('SW não registrado', e));
  });
}

/* Salva ao perder o foco, para não perder XP nem tempo de estudo. */
window.addEventListener('blur', () => { consolidarTempo(); salvarJa(); });

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
else iniciar();
