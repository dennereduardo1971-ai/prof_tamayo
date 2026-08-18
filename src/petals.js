/* ============================================================
   Pétalas de cerejeira — animação real em canvas
   Física simples: gravidade, arrasto, vento com rajadas,
   rotação 3D falsa (escala horizontal) e parallax por profundidade.
   ============================================================ */

import { rand, randInt, clamp } from './util.js';

const CORES = [
  ['#ffd9e8', '#f9aecb'],
  ['#ffc6dc', '#ef94b8'],
  ['#ffe6f0', '#ffb9d4'],
  ['#f7b8d0', '#e07ba7'],
  ['#fff2f7', '#ffcfe2'],
];

const DENSIDADE = { off: 0, leve: 0.45, normal: 1, forte: 1.8 };

class Petala {
  constructor(w, h, cima = false) { this.reset(w, h, cima); }

  reset(w, h, cima) {
    this.z = rand(0.35, 1);                 // profundidade (0 longe, 1 perto)
    this.x = rand(-40, w + 40);
    this.y = cima ? rand(-h * 0.5, -10) : rand(-h, h);
    this.tam = rand(5, 13) * (0.55 + this.z * 0.75);
    this.vy = rand(14, 34) * (0.5 + this.z);
    this.vx = rand(-6, 10);
    this.giro = rand(0, Math.PI * 2);
    this.vGiro = rand(-1.5, 1.5);
    this.flip = rand(0, Math.PI * 2);
    this.vFlip = rand(0.7, 2.4);
    this.balanco = rand(0, Math.PI * 2);
    this.vBalanco = rand(0.5, 1.5);
    this.amp = rand(8, 26);
    const c = CORES[randInt(0, CORES.length - 1)];
    this.c1 = c[0]; this.c2 = c[1];
    this.alpha = rand(0.45, 0.95) * (0.4 + this.z * 0.6);
  }

  passo(dt, w, h, vento) {
    this.balanco += this.vBalanco * dt;
    const empurrao = vento * (0.35 + this.z);
    this.x += (this.vx + empurrao + Math.sin(this.balanco) * this.amp * 0.12) * dt;
    this.y += this.vy * dt;
    this.giro += this.vGiro * dt;
    this.flip += this.vFlip * dt;

    if (this.y > h + 30) { this.reset(w, h, true); this.y = rand(-60, -12); }
    if (this.x > w + 60) this.x = -50;
    if (this.x < -60) this.x = w + 50;
  }

  desenhar(ctx) {
    const s = Math.abs(Math.cos(this.flip));        // rotação falsa em torno do eixo Y
    const t = this.tam;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.giro);
    ctx.scale(clamp(s, 0.12, 1), 1);
    ctx.globalAlpha = this.alpha;

    const g = ctx.createLinearGradient(0, -t, 0, t);
    g.addColorStop(0, this.c1);
    g.addColorStop(1, this.c2);
    ctx.fillStyle = g;

    // Formato de pétala de sakura, com o entalhe característico na ponta.
    ctx.beginPath();
    ctx.moveTo(0, t);
    ctx.bezierCurveTo(-t * 0.95, t * 0.35, -t * 0.7, -t * 0.75, -t * 0.16, -t);
    ctx.lineTo(0, -t * 0.72);
    ctx.lineTo(t * 0.16, -t);
    ctx.bezierCurveTo(t * 0.7, -t * 0.75, t * 0.95, t * 0.35, 0, t);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

/** Pétala de "explosão" — usada em comemorações. */
class Faisca {
  constructor(w, h, x, y, forca) {
    this.x = x; this.y = y;
    const ang = rand(0, Math.PI * 2);
    const v = rand(90, 340) * forca;
    this.vx = Math.cos(ang) * v;
    this.vy = Math.sin(ang) * v - rand(40, 150);
    this.tam = rand(5, 14);
    this.giro = rand(0, 6.28);
    this.vGiro = rand(-7, 7);
    this.flip = rand(0, 6.28);
    this.vFlip = rand(3, 8);
    this.vida = rand(1.3, 2.6);
    this.t = 0;
    const c = CORES[randInt(0, CORES.length - 1)];
    this.c1 = c[0]; this.c2 = c[1];
  }
  passo(dt) {
    this.t += dt;
    this.vy += 260 * dt;             // gravidade
    this.vx *= (1 - 1.4 * dt);       // arrasto
    this.vy *= (1 - 0.5 * dt);
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.giro += this.vGiro * dt;
    this.flip += this.vFlip * dt;
    return this.t < this.vida;
  }
  desenhar(ctx) {
    const a = clamp(1 - this.t / this.vida, 0, 1);
    const s = Math.abs(Math.cos(this.flip));
    const t = this.tam;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.giro);
    ctx.scale(clamp(s, 0.1, 1), 1);
    ctx.globalAlpha = a;
    const g = ctx.createLinearGradient(0, -t, 0, t);
    g.addColorStop(0, this.c1); g.addColorStop(1, this.c2);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, t);
    ctx.bezierCurveTo(-t * 0.95, t * 0.35, -t * 0.7, -t * 0.75, -t * 0.16, -t);
    ctx.lineTo(0, -t * 0.72);
    ctx.lineTo(t * 0.16, -t);
    ctx.bezierCurveTo(t * 0.7, -t * 0.75, t * 0.95, t * 0.35, 0, t);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

class Sistema {
  constructor(canvas) {
    this.cv = canvas;
    this.ctx = canvas.getContext('2d', { alpha: true });
    this.petalas = [];
    this.faiscas = [];
    this.vento = 0;
    this.ventoAlvo = 0;
    this.proxRajada = 3;
    this.rodando = false;
    this.densidade = 'normal';
    this.ultimo = 0;
    this._redim = this.redimensionar.bind(this);
    window.addEventListener('resize', this._redim);
    window.addEventListener('orientationchange', this._redim);
    this.redimensionar();
  }

  get quantidade() {
    const base = Math.round(clamp(window.innerWidth / 13, 22, 58));
    return Math.round(base * (DENSIDADE[this.densidade] ?? 1));
  }

  redimensionar() {
    const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.cv.width = Math.round(this.w * dpr);
    this.cv.height = Math.round(this.h * dpr);
    this.cv.style.width = `${this.w}px`;
    this.cv.style.height = `${this.h}px`;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.ajustarPopulacao();
  }

  ajustarPopulacao() {
    const alvo = this.quantidade;
    while (this.petalas.length < alvo) this.petalas.push(new Petala(this.w, this.h, false));
    if (this.petalas.length > alvo) this.petalas.length = alvo;
  }

  definirDensidade(d) {
    this.densidade = d;
    this.ajustarPopulacao();
    if (d === 'off') { this.ctx.clearRect(0, 0, this.w, this.h); }
  }

  /** Rajada de vento manual (usada em transições e acertos). */
  rajada(forca = 1) {
    this.ventoAlvo = rand(50, 130) * forca * (Math.random() < 0.5 ? -1 : 1);
    this.proxRajada = rand(2.5, 6);
  }

  /** Explosão de pétalas a partir de um ponto da tela. */
  explodir(x, y, n = 34, forca = 1) {
    if (this.densidade === 'off') return;
    for (let i = 0; i < n; i++) this.faiscas.push(new Faisca(this.w, this.h, x, y, forca));
    if (this.faiscas.length > 340) this.faiscas.splice(0, this.faiscas.length - 340);
  }

  quadro(t) {
    if (!this.rodando) return;
    const dt = clamp((t - this.ultimo) / 1000, 0, 0.05);
    this.ultimo = t;

    // Vento: alvo muda em rajadas, valor real persegue suavemente.
    this.proxRajada -= dt;
    if (this.proxRajada <= 0) {
      this.ventoAlvo = rand(-46, 62);
      this.proxRajada = rand(3.5, 9);
    }
    this.vento += (this.ventoAlvo - this.vento) * clamp(dt * 0.9, 0, 1);

    const { ctx } = this;
    ctx.clearRect(0, 0, this.w, this.h);

    if (this.densidade !== 'off') {
      for (const p of this.petalas) { p.passo(dt, this.w, this.h, this.vento); p.desenhar(ctx); }
    }
    if (this.faiscas.length) {
      this.faiscas = this.faiscas.filter((f) => { const viva = f.passo(dt); if (viva) f.desenhar(ctx); return viva; });
    }

    requestAnimationFrame(this.quadro.bind(this));
  }

  iniciar() {
    if (this.rodando) return;
    this.rodando = true;
    this.ultimo = performance.now();
    requestAnimationFrame(this.quadro.bind(this));
  }

  parar() { this.rodando = false; }
}

let sistema = null;

export function iniciarPetalas(canvas, densidade = 'normal') {
  sistema = new Sistema(canvas);
  sistema.definirDensidade(densidade);
  sistema.iniciar();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) sistema.parar();
    else { sistema.ultimo = performance.now(); sistema.iniciar(); }
  });
  return sistema;
}

export const petalas = {
  rajada: (f) => sistema && sistema.rajada(f),
  explodir: (x, y, n, f) => sistema && sistema.explodir(x, y, n, f),
  densidade: (d) => sistema && sistema.definirDensidade(d),
  /** Chuva a partir do topo da tela (nível concluído, conquista). */
  chuva: (n = 60) => {
    if (!sistema) return;
    for (let i = 0; i < n; i++) {
      sistema.faiscas.push(new Faisca(sistema.w, sistema.h, rand(0, sistema.w), rand(-60, 40), 0.35));
    }
  },
};
