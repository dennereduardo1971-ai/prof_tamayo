/* ============================================================
   Service worker — Professora Tamayo
   Estratégia: cache-first para o shell (o app precisa abrir
   sem internet), com atualização em segundo plano.
   ============================================================ */

const VERSAO = 'tamayo-v1';
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./styles/animations.css",
  "./styles/base.css",
  "./styles/components.css",
  "./styles/screens.css",
  "./src/audio.js",
  "./src/fx.js",
  "./src/gamification.js",
  "./src/main.js",
  "./src/petals.js",
  "./src/router.js",
  "./src/srs.js",
  "./src/state.js",
  "./src/tamayo.js",
  "./src/util.js",
  "./src/ui/ajustes.js",
  "./src/ui/aula.js",
  "./src/ui/components.js",
  "./src/ui/home.js",
  "./src/ui/onboarding.js",
  "./src/ui/progresso.js",
  "./src/ui/quiz.js",
  "./src/ui/resultado.js",
  "./src/ui/revisao.js",
  "./src/ui/simulado.js",
  "./src/ui/trilha.js",
  "./src/data/administracao_publica.js",
  "./src/data/administrativo.js",
  "./src/data/atualidades.js",
  "./src/data/ciencia_politica.js",
  "./src/data/constitucional.js",
  "./src/data/dialogues.js",
  "./src/data/etica.js",
  "./src/data/index.js",
  "./src/data/informatica.js",
  "./src/data/ingles.js",
  "./src/data/portugues.js",
  "./src/data/processo_legislativo.js",
  "./src/data/raciocinio_logico.js",
  "./src/data/tecnica_legislativa.js",
  "./assets/icons/favicon-64.png",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png"
];

self.addEventListener('install', (ev) => {
  ev.waitUntil(
    caches.open(VERSAO)
      .then((c) => c.addAll(SHELL).catch((e) => {
        // Um arquivo ausente não deve impedir a instalação.
        console.warn('Falha ao pré-cachear parte do shell', e);
        return Promise.all(SHELL.map((u) => c.add(u).catch(() => null)));
      }))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (ev) => {
  ev.waitUntil(
    caches.keys()
      .then((chaves) => Promise.all(chaves.filter((k) => k !== VERSAO).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (ev) => {
  const req = ev.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  ev.respondWith(
    caches.match(req, { ignoreSearch: true }).then((cacheado) => {
      const rede = fetch(req)
        .then((resp) => {
          if (resp && resp.status === 200 && resp.type === 'basic') {
            const copia = resp.clone();
            caches.open(VERSAO).then((c) => c.put(req, copia));
          }
          return resp;
        })
        .catch(() => cacheado || caches.match('./index.html'));

      // Cache-first: responde na hora e atualiza por trás.
      return cacheado || rede;
    })
  );
});

self.addEventListener('message', (ev) => {
  if (ev.data === 'atualizar') self.skipWaiting();
});
