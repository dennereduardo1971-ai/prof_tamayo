# 🌸 Professora Tamayo — Trilha de Estudos

App de estudo **hiper interativo e gamificado** para a preparação da Sara ao concurso da
**Câmara dos Deputados — Analista Legislativo**, guiado do começo ao fim por uma personagem-professora fixa.

PWA instalável, funciona **offline**, salva todo o progresso no dispositivo e pode ser
empacotado como **APK** para Android.

---

## O que tem dentro

| | |
|---|---|
| **12 matérias** | organizadas nos dois blocos do edital (básicos e específicos) |
| **83 níveis** | sequenciais, cada um com aula → exercícios → checkpoint |
| **596 questões** | comentadas, em estilo de banca (múltipla escolha e certo/errado) |
| **33 dispositivos** | de lei para treinar **letra de lei** com lacunas |
| **42 conquistas** | de primeira questão respondida a 100 dias de sequência |
| **12 patentes** | de *Mizunoto* a *Pilar da Lua*, por XP acumulado |

### Matérias e pesos

O **peso** (1 a 5) controla três coisas ao mesmo tempo: quantos níveis a matéria tem,
quanto XP cada acerto vale e com que frequência ela aparece nos simulados.

| Peso | Matéria | Níveis | Questões |
|:---:|---|:---:|:---:|
| 5 | Língua Portuguesa ★ | 9 | 70 |
| 5 | Direito Constitucional | 12 | 96 |
| 5 | Processo Legislativo e Regimento Interno | 8 | 64 |
| 4 | Direito Administrativo | 8 | 59 |
| 4 | Técnica Legislativa e Redação Oficial | 5 | 35 |
| 3 | Raciocínio Lógico e Quantitativo | 11 | 80 |
| 3 | Ciência Política e Teoria do Estado | 4 | 24 |
| 3 | Administração Pública | 4 | 24 |
| 3 | Língua Inglesa ★ | 7 | 42 |
| 2 | Noções de Informática | 9 | 66 |
| 2 | Ética no Serviço Público | 3 | 18 |
| 2 | Atualidades e Realidade Brasileira | 3 | 18 |

★ **Calibragem do perfil**: Português e Inglês são tratados como pontos fortes (formação em
Letras e fluência em inglês). Nenhum conteúdo é pulado, mas as aulas são mais enxutas e as
questões já começam no nível difícil — nessas matérias a meta declarada pela Tamayo é
**gabaritar**, não passar.

---

## Mecânicas

### Progressão
- Cada nível segue o ciclo **aula da Tamayo → treino opcional → checkpoint**.
- O checkpoint exige **70%** para liberar o nível seguinte.
- **Flores** (estrelas): 70% = 1 · 85% = 2 · 100% = 3. Refazer para buscar a terceira é permitido.
- Mapa visual da trilha com linha ligando os níveis, selos, cadeados e marcador "você está aqui".

### XP e patentes
XP vem de aula lida, questão respondida, nível concluído, meta diária batida e simulado.
Há multiplicador por **peso da matéria** (peso 5 rende +20%) e por **streak** (até +50%).

### Streak e meta diária
Meta configurável (padrão **60 min/dia**). O app cronometra o tempo de sessão, consolida a
cada minuto e sobrevive a fechamento abrupto. A faixa dos últimos 7 dias mostra a constância.

### Repetição espaçada (SRS)
Caixas de Leitner com fator de facilidade no estilo SM-2:

```
caixa    0     1     2     3     4     5      6      7
volta   hoje   1d    2d    4d    9d   18d    35d    70d
                                    └─ domínio ─┘
```

- **Acertou** → sobe de caixa, intervalo cresce.
- **Errou** → cai **duas** caixas e volta **hoje**.
- **Acertou devagar** → conta como acerto **frágil** (qualidade 3): o intervalo encurta. O app
  cronometra cada questão e compara com o tempo esperado para a dificuldade (60 s / 90 s / 130 s).
  Conhecimento que precisa ser garimpado ainda não está pronto.
- Na revisão há autoavaliação (*Difícil / Bom / Fácil*) que **afina o intervalo** sem recontar
  a resposta — quem contou foi o registro original.
- O sorteio de questões em prática e simulado é **ponderado**: o que você erra cai mais.
- A **agenda dos próximos 7 dias** mostra quantas revisões vencem em cada dia, para a carga
  nunca virar emboscada.

### O relógio da prova
No onboarding (e depois em **Ajustes**) você informa a **data da prova**. A partir dela o app
calcula, com o ritmo real dos últimos 28 dias, três coisas que ninguém gosta de ver mas todo
mundo precisa:

- **% do edital concluído**, ponderado por peso — terminar uma matéria peso 5 move mais o ponteiro;
- **previsão de conclusão** no ritmo atual;
- **ritmo necessário** por semana para chegar inteira na prova.

O veredito é dito sem rodeios: *em dia*, *apertado* ou *atrasado*. Em **Progresso → A prova**
há o painel completo.

### Plano do dia
A home não sugere mais "um próximo nível": monta a **sessão inteira** dentro da sua meta de
minutos, na ordem que faz diferença — revisão vencida → conteúdo novo (na matéria de maior
prioridade) → reforço onde dói → lei seca quando a prova está a menos de 60 dias → simulado
semanal.

### Índice de prioridade
Uma fórmula só para "o que eu estudo agora?":

```
prioridade = peso da matéria × (o quanto ela ainda dói
                              + o quanto falta dela
                              + o que está vencido na revisão)
```

Em **Progresso → Prioridade** as 12 matérias aparecem ordenadas por esse índice.

### Caderno de erros
Registro cumulativo de tudo o que você já errou: a questão, **qual alternativa você marcou**,
a resposta correta, a explicação e um botão para treinar só aquilo. Filtra por matéria,
separa o que ainda está aberto do que já virou domínio, e ordena por **recorrência** — o que
você errou mais de uma vez fica no topo.

### Modo lei seca
O dispositivo aparece com os termos-chave vazados e você recompõe o texto arrastando as
fichas. Sem alternativa para eliminar: ou a letra da lei está na memória, ou não está.
O banco de fichas mistura os termos certos com **sinônimos jurídicos, prazos e quóruns
vizinhos** — as trocas de que a banca vive. Cobre CF/88, Lei 8.112, Lei 9.784 e LC 95.

### Mapas mentais
Cada matéria vira uma **árvore navegável** — matéria → nível → tópicos → ramos — que abre e
fecha ao toque. A estrutura é derivada do próprio conteúdo; níveis com o campo `mapa` ganham
profundidade escrita à mão. Feito para a véspera, quando não há mais tempo de reler aula.

### Modos de prática
- **Checkpoint** — todas as questões do nível, com correção comentada na hora.
- **Questões soltas** — por matéria ou por nível, sorteio ponderado pelos seus erros.
- **Revisão do dia** — só o que está vencido no SRS, com autoavaliação.
- **Simulado cronometrado** — 5 modelos (20/40/60 questões, só básicos, só específicos),
  distribuição proporcional ao peso, **sem correção durante a prova**, gabarito comentado
  e desempenho por matéria no fim.
- **Caderno de erros** — só o que você já errou, ordenado por recorrência.
- **Lei seca** — recompor o dispositivo pelas lacunas.

---

## A Professora Tamayo

Persona fixa que conduz toda a experiência. Estética e personalidade inspiradas no universo
de *Demon Slayer* (a médica Tamayo): noite índigo, kimono ameixa, ornamento de cerejeira,
olhar firme. **Ilustração autoral em SVG**, animada em tempo real — respiração, piscar de
olhos, cabelo ondulando, aura pulsante.

**Sete expressões** trocadas conforme o contexto: `neutra`, `sorriso`, `orgulhosa`, `seria`,
`firme`, `preocupada`, `pensativa`.

O tom não é fofinho — é de **incentivo com disciplina**. Ela cobra, corrige e não abandona:

> *"Errado — e tudo bem. Erro em treino é remédio; erro na prova é ferida. Leia a explicação com atenção."*
>
> *"Você já tinha errado essa. Pare. Leia duas vezes. Esse ponto está sangrando e precisa ser fechado."*
>
> *"{streak} dias sem falhar. Isso não é sorte. Isso é caráter."*

Falas contextuais para: saudação por horário, streak alto, retorno depois de dias parada,
entrada em nível (com fala própria por matéria), acerto, acerto difícil, combo, erro, erro
repetido, sequência de erros, fim de nível (excelente/bom/fraco), simulado, revisão, meta
batida, nova patente e matéria concluída — com efeito de digitação nos balões.

---

## Identidade visual

- **Paleta**: noite índigo, ameixa, sakura, sangue e ouro velho.
- **Pétalas de cerejeira em canvas** com física real: gravidade, arrasto, vento com rajadas,
  rotação 3D falsa, parallax por profundidade. Explosões em acertos e conquistas, chuva em
  conclusão de nível.
- **Animações reais** em transições de tela (corte de lâmina), preenchimento de barras,
  contagem de números, selagem de nível, brilho varrendo cartões, galhos balançando ao fundo.
- **Som sintetizado em tempo real** (WebAudio, sem arquivos): timbre de koto em escala
  pentatônica *hirajoshi*, com sons distintos para acerto, erro, XP, nível e conquista.
- Tudo desligável em **Ajustes**, e respeita `prefers-reduced-motion` do sistema.

---

## Rodar localmente

Não há build. É HTML + CSS + JavaScript com módulos ES nativos.

```bash
npm start          # http://localhost:8080
```

Qualquer servidor estático serve (`python3 -m http.server`, `npx serve`, Live Server…).
Abrir o `index.html` direto pelo `file://` **não funciona** — os módulos ES exigem HTTP.

---

## Publicar como PWA (GitHub Pages)

O workflow `.github/workflows/pages.yml` publica automaticamente a cada push na `main`.

Para habilitar: **Settings → Pages → Source: GitHub Actions**.

Depois de publicado, no celular: abrir a URL no Chrome → menu → **Instalar aplicativo**.
O app passa a abrir em tela cheia, com ícone próprio, e funciona sem internet.

---

## Gerar o APK

### Opção A — GitHub Actions (não precisa instalar nada)

**Actions → Gerar APK (Android) → Run workflow**. O APK sai como artefato do build.
Ao criar uma tag `v*`, o APK também é anexado à release.

### Opção B — localmente

Requer JDK 21 e Android SDK.

```bash
npm install
npm run android:add     # cria a pasta android/ (só na primeira vez)
npm run android:apk     # gera o APK de debug
# android/app/build/outputs/apk/debug/app-debug.apk
```

`npm run android:abrir` abre o projeto no Android Studio, caso queira assinar para produção.

### Opção C — PWABuilder

Publique no Pages e cole a URL em [pwabuilder.com](https://www.pwabuilder.com) →
**Android → Generate**. Gera APK e AAB assinados, com o manifesto já pronto neste repositório.

---

## Estrutura

```
├── index.html                  camadas: fundo · canvas de pétalas · app · efeitos
├── manifest.webmanifest        PWA instalável
├── sw.js                       service worker (cache-first, funciona offline)
├── capacitor.config.json       empacotamento Android
├── styles/
│   ├── base.css                tokens da paleta, reset, fundo animado
│   ├── components.css          cartões, botões, barras, chips, balões, navegação
│   ├── animations.css          keyframes e efeitos da camada FX
│   └── screens.css             cada tela
├── src/
│   ├── main.js                 boot, registro de telas, botão voltar do Android
│   ├── router.js               navegação com pilha e transições
│   ├── state.js                estado + persistência (localStorage, com backup)
│   ├── gamification.js         XP, patentes, conquistas, streak, meta
│   ├── srs.js                  repetição espaçada e sorteio ponderado
│   ├── petals.js               sistema de partículas das pétalas
│   ├── audio.js                síntese de som (WebAudio)
│   ├── fx.js                   flashes, toasts, modais, comemorações
│   ├── tamayo.js               retrato SVG animado + motor de falas
│   ├── util.js                 DOM, datas, formatação, mini-markdown
│   ├── ui/                     onboarding · home · trilha · aula · quiz · resultado ·
│   │                           revisão · simulado · progresso · caderno · mapa ·
│   │                           leiseca · ajustes
│   └── data/
│       ├── index.js            registro de matérias, pesos, índice de questões
│       ├── dialogues.js        banco de falas da Tamayo
│       ├── leis.js             dispositivos do modo lei seca
│       └── <matéria>.js         uma matéria por arquivo
└── scripts/
    ├── preparar-www.mjs        monta www/ para o Capacitor
    └── smoke.mjs               teste de fumaça no navegador (Playwright)
```

### Persistência

Tudo fica em `localStorage`, chave `tamayo.save.v1`, com cópia de segurança automática
antes de cada gravação. O que é salvo: XP, patente, nível e estrelas por matéria, aulas
lidas, streak e recorde, **data da prova**, minutos e questões por dia, fichas de SRS de cada
questão (incluindo **tempo médio de resposta** e **qual alternativa foi marcada no último
erro**), desempenho no **modo lei seca**, conquistas com data, histórico de sessões,
simulados e preferências.

Em **Ajustes** há **exportar** e **restaurar backup** (JSON em texto) — use antes de trocar
de aparelho ou limpar o navegador.

---

## Atualizar o conteúdo quando o edital sair

O concurso está em fase de **pré-edital**. A grade reproduz o escopo historicamente cobrado
para o cargo. Quando o edital oficial for publicado, tudo se ajusta em um lugar só:

1. **Mudar pesos** → campo `peso` no topo do arquivo da matéria. Nada mais precisa mudar:
   níveis, XP e distribuição dos simulados se recalculam sozinhos.
2. **Adicionar ou remover níveis** → editar o array `niveis` da matéria.
3. **Criar matéria nova** → copiar um arquivo de `src/data/`, ajustar e importar em
   `src/data/index.js`.
4. **Adicionar questões** → acrescentar ao array `questoes` do nível.

Formato de uma questão:

```js
{
  id: 'con1-09',                    // único no app inteiro; é a chave do SRS
  dif: 3,                           // 1 fácil · 2 média · 3 difícil (afeta o XP)
  tipo: 'multipla',                 // 'multipla' | 'ce'
  base: 'texto de apoio (opcional)',
  enunciado: 'O que se pergunta',
  alts: ['A', 'B', 'C', 'D', 'E'],  // omitido quando tipo === 'ce'
  correta: 0,                       // índice; em 'ce', 0 = Certo e 1 = Errado
  expl: 'Por que essa é a resposta — aparece na correção',
  expls: [                          // opcional, mas é o que mais rende em prova:
    'Correta. Fundamento...',       // uma justificativa por alternativa, na ordem
    'Errada porque... (pegadinha)', // do array `alts`. Em 'ce', são dois itens.
  ],
  tags: ['assunto'],
}
```

> Acertar sem saber por que as outras quatro estão erradas é onde a banca pega. Sempre que
> puder, escreva `expls` — ele aparece na correção e no gabarito, alternativa por alternativa.

> ⚠️ Nunca reaproveite um `id` já usado: ele é a chave do histórico de repetição espaçada.
> As alternativas são embaralhadas em tempo de execução, então a ordem no arquivo não importa.

---

## Contrato de qualidade da aula

Toda aula nova deve cobrir seis camadas. Elas existem como campos, não como boa intenção:

| Camada | Onde vive |
|---|---|
| 📖 Definição técnica | `aula.blocos[].p` |
| 💬 Explicação simples | destaque `{ tipo: 'simples' }` |
| 📝 Exemplo prático | `aula.blocos[].lista` |
| ⚖️ Como a banca cobra | destaque `{ tipo: 'banca' }` |
| 🧠 Mnemônico | destaque `{ tipo: 'mnemonico' }` |
| ❌ Pegadinha comum | destaque `{ tipo: 'perigo' }` |

O nível `con-1` (Direito Constitucional) é o exemplar completo: use-o como modelo, inclusive
do campo `mapa`, que dá profundidade autoral ao mapa mental daquele nível.

---

## Teste de fumaça

```bash
npm start            # em um terminal
npm run smoke        # em outro
```

Percorre o app inteiro num Chromium headless: onboarding com data da prova, aula, checkpoint
com justificativa por alternativa, caderno de erros, lei seca, mapa mental, agenda de revisão,
painel da prova e persistência entre recarregamentos. Falha se algum passo quebrar **ou se
aparecer qualquer erro no console**.

Requer o Playwright disponível (`npx playwright install chromium` na primeira vez).

---

## Notas

- Sem dependências em runtime. Sem CDN. Sem rastreamento. Nenhum dado sai do aparelho.
- Testado com Playwright: fluxo completo de onboarding, aula, checkpoint, desbloqueio de
  nível, SRS, simulado cronometrado, conquistas, backup e persistência entre recarregamentos.
- A personagem é ilustração original inspirada na estética da obra; não reproduz arte de terceiros.
