# Análise do prompt externo e plano de aprimoramento

> Documento de trabalho. Analisa um prompt de "assistente de estudos" gerado por outra IA,
> separa o que serve do que não serve para **este** projeto, e transforma o que serve
> num plano de execução com arquivos e ordem.

---

## Diagnóstico em uma frase

O prompt é bem construído — **para outro produto**. Ele pressupõe um LLM presente em toda
interação, a Sara colando edital e questões no chat, e memória "dentro desta conversa".
Nosso app é o oposto: **offline, sem rede, sem IA em runtime**, conteúdo autoral escrito
antes, e estado que persiste para sempre em `localStorage`.

Logo, nenhuma função do prompt é "adotável" como está. Cada uma precisa ser **traduzida**
para uma de três formas:

| Forma | Onde vive | Custo |
|---|---|---|
| **(A) Estrutura de conteúdo** | `src/data/*.js` | escrever conteúdo |
| **(B) Tela / visualização** | `src/ui/*.js` | código |
| **(C) Mecânica** | `srs.js`, `gamification.js`, `state.js` | código, pouco |

E três coisas ficaram claras ao cruzar o prompt com o código:

1. **Metade do prompt já existe aqui — e melhor.** A repetição espaçada dele (24h/7d/30d fixos)
   é uma versão pobre do nosso Leitner+SM-2 adaptativo de 8 caixas.
2. **A outra metade aponta lacunas reais.** Caderno de erros, lei seca, justificativa por
   alternativa e data da prova são buracos verdadeiros.
3. **Achado do código:** o tempo por questão **já é medido** (`src/ui/quiz.js:225`, campo `seg`)
   e **jogado fora** — nunca é persistido nem usado. O gatilho "demorei muito" do prompt custa
   ~15 linhas para existir.

---

## Veredito função por função

### 1. Importação e fragmentação do edital — **JÁ TEMOS (85%)**

`src/data/index.js` + os 12 arquivos de matéria **são** a árvore hierárquica: matéria → peso →
bloco → níveis → `topicos[]` → questões. A fragmentação foi feita à mão, com curadoria, o que é
superior a um parse automático de edital colado.

- ✅ Manter como está. Quando o edital sair, o README já documenta o ajuste (mudar `peso`, editar `niveis`).
- ❌ Não construir importador de edital. Uso único, e a IA que fragmenta não é confiável para conteúdo de prova.
- ⚠️ **Falta uma coisa e ela destrava três funções: a data da prova.** Hoje o perfil tem
  `metaMinutos` (horas por dia) mas **não tem `dataProva`**. Sem ela não existe previsão,
  ritmo necessário nem urgência.

### 2. Plano de estudos em ciclos — **PARCIALMENTE CONFLITANTE**

Ciclo de rotação de matérias é técnica para quem **já viu todo o conteúdo**. A Sara está começando:
nossa trilha sequencial com trava de 70% é pedagogicamente mais forte e não deve ser trocada.

- ❌ Rejeitar: tabela semanal fixa e a divisão rígida 20% revisão / 10% simulado. Nossa SRS já
  decide o volume de revisão sozinha, e melhor — travar em 20% seria regredir.
- ✅ Adotar o que ele acerta: **não existe plano consciente do tempo**. `escolherRecomendacao()`
  em `home.js` sugere um próximo nível sem nenhuma noção de "dá tempo até a prova?".
  Vira **Plano do dia**: uma sessão montada em blocos (revisão vencida → nível novo →
  questões do ponto fraco), dimensionada pela meta diária e ponderada por peso.

### 3. Gestão de matérias por peso — **JÁ TEMOS OS INGREDIENTES, FALTA A FÓRMULA**

Temos `porPeso()` (estático) e taxa de acerto por matéria (dinâmico), mas **nunca combinados**.
Progresso → Matérias ordena só por aproveitamento; a Home ordena por outra coisa. Não há uma
resposta única para "o que eu estudo agora?".

- ✅ Adotar: **índice de prioridade** único = `peso × (1 − taxa de acerto) × (fração não concluída) + atraso na SRS`.
  Uma fórmula, usada em todo lugar.
- ✅ Adotar a metade boa do "atualize conforme meu desempenho": hoje `fortaleza: true` de
  Português/Inglês é **declarado no onboarding e nunca revisto**. Se a Sara marcou forte e está
  com 61%, a Tamayo tem que confrontar isso.
- ❌ Rejeitar barras ASCII `██████`. Temos `barra()` com animação real.

### 4. Tabela de prazos 24h / 7d / 30d — **INFERIOR AO QUE TEMOS**

Nossa SRS: 8 caixas, intervalos `[0,1,2,4,9,18,35,70]`, fator de facilidade SM-2, erro derruba
**duas** caixas. O prompt propõe três prazos fixos e iguais para tudo.

- ❌ Rejeitar a mecânica. Seria um downgrade direto.
- ✅ Adotar a **visão**: só mostramos o que venceu *hoje*. Não existe **agenda futura**.
  Quantas questões vencem amanhã? Nos próximos 7 dias? Por matéria? Os dados já estão em
  `S.srs[].proxima` — falta só ler. Evita a Sara ser emboscada por 200 revisões vencidas.

### 5. Explicação em múltiplas formas — **O MELHOR ITEM DO PROMPT**

As 6 camadas (definição / explicação simples / exemplo / como a banca cobra / mnemônico / pegadinha)
são um bom **contrato de qualidade de aula**. Nossas aulas já têm `blocos`, `destaques` de tipo
`dica` (macete) e `perigo` (pegadinha), e `resumo`. Mas as camadas aparecem por acaso, não por regra.

- ✅ Adotar como **checklist de autoria obrigatório**, com dois tipos novos de destaque:
  `banca` (como a Cebraspe/FGV cobra este ponto) e `mnemonico`.
- ❌ Rejeitar os cabeçalhos com emoji (`📖 💬 📝`). Temos componentes visuais próprios, e a
  Tamayo não fala por emoji — a voz dela é parte do produto.

### 6. Mapas mentais navegáveis — **LACUNA REAL, BARATA, ALTO VALOR**

Temos `topicos: []` por nível: um mapa mental de um andar só, sem hierarquia e sem navegação.
Uma árvore expansível por matéria é ouro na véspera da prova — e é 100% determinística,
sem IA, sem rede.

### 7. Flashcards automáticos — **METADE JÁ EXISTE; A OUTRA METADE É QUASE DE GRAÇA**

Errar já joga a questão na SRS na hora (`quiz.js` → `srsResponder`), com agendamento adaptativo.
Isso **é** o flashcard, e melhor que prazos fixos.

- ❌ Rejeitar criar uma entidade "flashcard" separada da questão: duplicaria banco e SRS por nada.
- ✅ Adotar o gatilho que **não temos**: **tempo**. `seg` já é calculado e descartado.
  "Acertou, mas demorou o dobro da média" deve valer como acerto **fraco** (qualidade 3 em vez de 4),
  encurtando o intervalo. É o sinal mais honesto de conhecimento frágil que existe.

### 8. Caderno de erros — **LACUNA REAL, DADOS JÁ EXISTEM, FALTA A TELA**

`S.srs` guarda `erros`, `mat`, `niv`, `vistas` por questão, e `pontosFracos()` já agrega por nível —
mas isso só alimenta uma sugestão na Home. **Não há tela de caderno de erros.**

Um bloqueio pequeno: hoje guardamos *se* errou, não **qual alternativa ela marcou**. Sem isso o
caderno não consegue mostrar "seu erro" — só "você errou". Precisa persistir `ultimaEscolha`.

### 9. Modo lei seca — **LACUNA REAL E A MAIS ALINHADA COM ESTE CONCURSO**

Câmara cobra letra de lei: CF/88, Lei 8.112, 9.784, 8.429, LC 95 e sobretudo o **Regimento Interno**.
Preenchimento de lacunas em dispositivo é o treino mais eficiente que existe para isso, e não temos
nada parecido — só múltipla escolha e certo/errado.

Vira um `tipo: 'lacuna'` no motor de questões (`quiz.js` já é genérico o bastante) + um corpus de
dispositivos. Custo alto em conteúdo, impacto alto em nota.

### 10. Justificativa de todas as alternativas — **LACUNA REAL, RETORNO ALTÍSSIMO**

Hoje `expl` é **uma string única** por questão. Nas 435 questões de múltipla escolha, a Sara pode
acertar sem saber por que as outras quatro estão erradas — e é exatamente aí que a banca a pega
na prova real.

Adotar `expls: []` opcional por alternativa, mantendo `expl` para compatibilidade. Código é pequeno
(feedback do `quiz.js` e gabarito do `resultado.js`); o trabalho é conteúdo.

### 11. % do edital concluído + previsão + ritmo — **LACUNA PARCIAL**

Temos % por matéria e níveis concluídos. **Não temos**: % global do edital ponderado por peso,
previsão de data de conclusão no ritmo atual, e ritmo necessário para chegar inteira na prova.
Depende da data da prova (função 1). É o painel que responde a única pergunta que importa:
**"vou dar conta?"**

### Regras de comportamento — **DESCARTAR QUASE TUDO**

São regras de chat. "Nunca peça para repetir o edital" já é garantido por `localStorage`.
Duas contradizem o projeto: "use emojis para escaneabilidade" (temos identidade visual própria) e
"seja direto, sem enrolação" (a Tamayo é deliberadamente uma personagem com voz — o incentivo com
disciplina é o produto, não enrolação).

- ✅ Salvar **uma** regra, como princípio transversal de UX: **nenhuma tela termina sem sugerir o
  próximo passo**.

---

## Achado paralelo: README desatualizado

O README anuncia **53 níveis e 362 questões**. O repositório tem hoje **83 níveis e 596 questões**
(435 múltipla + 161 certo/errado). A tabela de matérias também está defasada — ex.: Constitucional
está com 12 níveis / 96 questões, não 6 / 48.

---

## Plano de ação

Ordenado por *destrava outras coisas* → *usa dados que já temos* → *exige conteúdo novo*.

### Fase 0 — Fundações (baratas, destravam o resto)

| # | O quê | Arquivos | Esforço |
|---|---|---|---|
| 0.1 | **Data da prova** no perfil: campo `dataProva`, pergunta no onboarding, edição em Ajustes, contagem regressiva na Home | `state.js`, `ui/onboarding.js`, `ui/ajustes.js`, `ui/home.js` | P |
| 0.2 | **Persistir tempo e escolha**: gravar `segMedio`/`ultimoSeg` e `ultimaEscolha` na ficha SRS | `srs.js`, `ui/quiz.js` | P |
| 0.3 | **Corrigir o README** (níveis, questões, tabela por matéria) | `README.md` | P |

### Fase 1 — Colher o que já está plantado (sem conteúdo novo)

| # | O quê | Arquivos | Esforço |
|---|---|---|---|
| 1.1 | **Caderno de erros**: tela filtrável por matéria, ordenada por recorrência, com o que ela marcou, a explicação e "treinar só isso" | `ui/caderno.js` (novo), `main.js`, `router.js`, `ui/components.js` | M |
| 1.2 | **Painel "vou dar conta?"**: % do edital ponderado por peso, previsão de conclusão no ritmo atual, ritmo necessário até a prova | `gamification.js`, `ui/progresso.js` | M |
| 1.3 | **Agenda de revisão**: carga dos próximos 7 e 30 dias, por matéria | `srs.js` (`cargaFutura()`), `ui/revisao.js` | P |
| 1.4 | **Índice de prioridade unificado** e reordenação coerente em Home e Progresso | `srs.js`/`gamification.js`, `ui/home.js`, `ui/progresso.js` | M |
| 1.5 | **Acerto lento = acerto fraco** (usa 0.2): qualidade 3 encurta o intervalo | `srs.js` | P |

### Fase 2 — Conteúdo (o que mais move o ponteiro na nota)

| # | O quê | Arquivos | Esforço |
|---|---|---|---|
| 2.1 | **`expls[]` por alternativa** — código primeiro, depois conteúdo em ondas: Constitucional → Processo Legislativo → Português (peso 5), depois peso 4 | `ui/quiz.js`, `ui/resultado.js`, `src/data/*.js` | G |
| 2.2 | **Contrato de aula em 6 camadas**: destaques `banca` e `mnemonico` + checklist de autoria documentado | `ui/components.js`, `styles/components.css`, `README.md`, `src/data/*.js` | M |
| 2.3 | **Mapa mental navegável**: campo `mapa` (árvore) por matéria + tela expansível | `src/data/*.js`, `ui/mapa.js` (novo) | M |

### Fase 3 — Mecânicas novas

| # | O quê | Arquivos | Esforço |
|---|---|---|---|
| 3.1 | **Modo Lei Seca**: `tipo: 'lacuna'` no motor + corpus inicial (CF arts. 5º, 37, 60 e Regimento Interno) | `ui/quiz.js`, `src/data/leis.js` (novo) | G |
| 3.2 | **Plano do dia**: sessão em blocos dimensionada pela meta diária e pelo peso | `ui/home.js`, `gamification.js` | M |
| 3.3 | **Fortaleza auditada**: a Tamayo confronta a autoavaliação com os números reais | `ui/home.js`, `data/dialogues.js` | P |

---

## Rejeitado explicitamente (e por quê)

| Item do prompt | Por que não |
|---|---|
| Importador automático de edital | Uso único; IA não é confiável para conteúdo de prova |
| Revisão fixa 24h / 7d / 30d | Downgrade direto da nossa SRS adaptativa |
| Cronograma semanal rígido + 20%/10% | Contradiz a trilha sequencial travada em 70%; a SRS já dimensiona a revisão |
| Barras de prioridade em ASCII | Já temos `barra()` animada |
| Flashcard como entidade separada da questão | Duplicaria o banco e o SRS sem ganho |
| Cabeçalhos com emoji nas explicações | Conflita com a identidade visual e com a voz da Tamayo |
| "Seja direto, sem enrolação" | A personagem **é** o produto |
| Memória "dentro desta conversa" | `localStorage` já é permanente e exportável |

---

## Sequência recomendada

**Fase 0 inteira** (destrava tudo e é quase de graça) → **1.1 Caderno de erros** (maior valor
percebido por linha de código) → **1.2 painel "vou dar conta?"** → **2.1 `expls[]`** (o de maior
efeito na nota, mas o mais longo — começar cedo e ir em ondas) → resto.
