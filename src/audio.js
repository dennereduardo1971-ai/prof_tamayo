/* ============================================================
   Som — sintetizado em tempo real (WebAudio), sem arquivos.
   Timbres puxados para o lado do koto/shamisen: ataque seco,
   corpo curto, escala pentatônica japonesa (hirajoshi).
   ============================================================ */

let ctx = null;
let ligado = true;
let mestre = null;

// Hirajoshi em Lá: A C D E F
const ESCALA = [220.00, 261.63, 293.66, 329.63, 349.23, 440.00, 523.25, 587.33, 659.25, 698.46];

function garantir() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    mestre = ctx.createGain();
    mestre.gain.value = 0.5;
    mestre.connect(ctx.destination);
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {});
  return ctx;
}

export function ligarSom(v) { ligado = !!v; }
export function somAtivo() { return ligado; }

/** Destrava o áudio no primeiro toque (política de autoplay). */
export function destravarAudio() {
  const f = () => { garantir(); document.removeEventListener('pointerdown', f); };
  document.addEventListener('pointerdown', f, { once: true });
}

function pluck(freq, t0, dur = 0.9, ganho = 0.22, tipo = 'triangle') {
  const c = garantir();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  const filtro = c.createBiquadFilter();
  filtro.type = 'lowpass';
  filtro.frequency.setValueAtTime(4200, t0);
  filtro.frequency.exponentialRampToValueAtTime(700, t0 + dur);
  osc.type = tipo;
  osc.frequency.setValueAtTime(freq, t0);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(ganho, t0 + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(filtro); filtro.connect(g); g.connect(mestre);
  osc.start(t0); osc.stop(t0 + dur + 0.05);
}

function ruido(t0, dur = 0.3, ganho = 0.12, corte = 900) {
  const c = garantir();
  if (!c) return;
  const n = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, n, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = 'lowpass'; f.frequency.value = corte;
  const g = c.createGain(); g.gain.value = ganho;
  src.connect(f); f.connect(g); g.connect(mestre);
  src.start(t0);
}

function seq(notas, espaco = 0.075, ganho = 0.2, dur = 0.85) {
  const c = garantir();
  if (!c) return;
  const t0 = c.currentTime + 0.01;
  notas.forEach((n, i) => pluck(n, t0 + i * espaco, dur, ganho));
}

export const som = {
  toque() { if (!ligado) return; seq([ESCALA[4]], 0, 0.09, 0.28); },
  navegar() { if (!ligado) return; seq([ESCALA[3], ESCALA[5]], 0.045, 0.09, 0.35); },
  certo() { if (!ligado) return; seq([ESCALA[5], ESCALA[7], ESCALA[9]], 0.07, 0.17, 0.8); },
  errado() {
    if (!ligado) return;
    const c = garantir(); if (!c) return;
    const t0 = c.currentTime + 0.01;
    pluck(147.0, t0, 0.5, 0.16, 'sawtooth');
    pluck(138.6, t0 + 0.06, 0.55, 0.13, 'sawtooth');
    ruido(t0, 0.22, 0.06, 600);
  },
  xp() { if (!ligado) return; seq([ESCALA[6], ESCALA[8]], 0.05, 0.13, 0.55); },
  nivel() {
    if (!ligado) return;
    seq([ESCALA[0], ESCALA[2], ESCALA[4], ESCALA[5], ESCALA[7], ESCALA[9]], 0.085, 0.19, 1.3);
  },
  conquista() {
    if (!ligado) return;
    const c = garantir(); if (!c) return;
    const t0 = c.currentTime + 0.01;
    [ESCALA[5], ESCALA[7], ESCALA[9], ESCALA[9]].forEach((n, i) => pluck(n, t0 + i * 0.1, 1.6, 0.2));
    pluck(ESCALA[0], t0, 2.2, 0.12, 'sine');
    ruido(t0 + 0.02, 0.5, 0.04, 2600);
  },
  tique() {
    if (!ligado) return;
    const c = garantir(); if (!c) return;
    pluck(880, c.currentTime + 0.005, 0.09, 0.07, 'square');
  },
  fimTempo() {
    if (!ligado) return;
    const c = garantir(); if (!c) return;
    const t0 = c.currentTime + 0.01;
    pluck(196, t0, 1.1, 0.2, 'sawtooth');
    pluck(185, t0 + 0.14, 1.2, 0.18, 'sawtooth');
    ruido(t0, 0.6, 0.08, 500);
  },
};
