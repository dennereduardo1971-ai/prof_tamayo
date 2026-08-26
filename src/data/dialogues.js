/* ============================================================
   Banco de falas da Professora Tamayo
   Tom: elegante, firme, cirúrgica. Incentivo com disciplina —
   ela cobra, mas nunca abandona. Metáforas de cura, lâmina,
   respiração e das cerejeiras.
   Use {nome} para o nome da candidata.
   ============================================================ */

export const FALAS = {

  boasVindas: [
    'Sente-se. Respire. A partir de agora, o caos vira método.\nEu sou a <b>Tamayo</b>, e vou cuidar dos seus estudos como cuido de um paciente: diagnóstico, tratamento, acompanhamento.',
  ],

  /* ---------- Saudações da tela inicial ---------- */
  saudacaoManha: [
    'Bom dia, {nome}. A lâmina mais afiada é a que se ergue cedo. Vamos abrir a trilha.',
    'Manhã limpa, mente limpa. Uma hora agora vale por três à noite, {nome}.',
    'Você acordou antes da desculpa acordar. Isso já é vantagem. Comece.',
  ],
  saudacaoTarde: [
    'Boa tarde, {nome}. O dia ainda não decidiu quem você vai ser nele. Decida você.',
    'A tarde é traiçoeira: convida ao descanso que você ainda não mereceu. Sente-se.',
    'Vamos, {nome}. Sessenta minutos. Eu conto com você, e o edital não espera.',
  ],
  saudacaoNoite: [
    'Boa noite, {nome}. Cansada é o estado normal de quem está construindo algo. Siga assim mesmo.',
    'A noite silencia o mundo para você ouvir o conteúdo. Aproveite o silêncio.',
    'Último esforço do dia. Depois dele, você dorme com a consciência tranquila.',
  ],
  saudacaoMetaBatida: [
    '{nome}, sua meta do dia já está cumprida. Tudo daqui em diante é vantagem sobre a concorrência.',
    'Meta batida. Agora estudamos por ambição, não por obrigação. Gosto mais assim.',
  ],
  saudacaoStreakAlto: [
    '{nome}, <b>{streak} dias</b> sem falhar. Isso não é sorte. Isso é caráter.',
    '{streak} dias seguidos. A constância é a única técnica que nenhum concorrente consegue copiar de você.',
  ],
  saudacaoVolta: [
    'Você sumiu por {dias} dias. Não vou repreendê-la — vou registrar. Recomeçar hoje vale mais do que se justificar.',
    '{dias} dias de ausência. A trilha continua exatamente onde você parou. Sente-se, {nome}.',
  ],
  saudacaoPrimeiraVez: [
    'Então é você, {nome}. Letras, inglês fluente, professora concursada. Boa base — mas base não passa em concurso. Método passa.',
  ],

  /* ---------- Entrada em nível ---------- */
  entrarNivel: [
    'Preste atenção nesta aula como se fosse a única. Porque, na prova, ela pode ser.',
    'Antes de responder qualquer coisa, entenda. Chutar é o luxo de quem não estudou.',
    'Leia devagar. Velocidade sem compreensão é só pressa disfarçada de esforço.',
    'Vou explicar uma vez, com cuidado. Depois, a lâmina é sua.',
    'Este tópico já derrubou muita gente boa. Você não vai ser mais uma.',
  ],
  entrarNivelFortaleza: [
    'Este é o seu terreno, {nome}. Justamente por isso: nada de arrogância. Banca adora punir o confiante.',
    'Você domina isso melhor do que a maioria. Então o alvo aqui não é acertar — é acertar <b>rápido</b> e sem hesitar.',
    'Português é o seu campo. Vamos usá-lo para ganhar tempo, não para gastar.',
  ],
  entrarNivelPesado: [
    'Esta matéria tem peso alto. Cada ponto aqui vale mais caro. Concentre-se.',
    'Aqui é onde a prova é decidida. Respire fundo e leia com a mão firme.',
  ],

  /* ---------- Feedback de resposta ---------- */
  acerto: [
    'Correto. Limpo, direto, sem tremer.',
    'Certo. Foi raciocínio, não sorte — e isso é o que importa.',
    'Exato. Guarde essa sensação: é assim que se responde uma prova.',
    'Perfeito. Próxima.',
    'Acertou. E, mais importante, acertou <b>pelo motivo certo</b>.',
    'Boa. A lâmina está afiada hoje.',
    'Isso. Continue nesse ritmo e a banca não te alcança.',
  ],
  acertoCombo: [
    '{combo} seguidas. Você entrou em ritmo — não quebre agora.',
    'Sequência de {combo}. Isso é <b>concentração total</b>. Mantenha.',
    '{combo} acertos em fila. É exatamente assim que se constrói uma nota de aprovação.',
  ],
  acertoDificil: [
    'Essa era das difíceis. E você derrubou. Anote: você é capaz do nível alto.',
    'Questão pesada, resposta certa. Sabe o que isso significa? Que o método está funcionando.',
  ],
  acertoLento: [
    'Certo — mas você demorou. Na prova, esse tempo sai de outra questão. Vou trazer esta de volta mais cedo.',
    'Acertou garimpando. Conhecimento que precisa ser escavado ainda não está pronto: volta antes.',
    'Resposta certa, relógio errado. Marquei como frágil — quero ver isso sair no automático.',
    'Você chegou lá. Devagar demais, mas chegou. Da próxima quero a mesma resposta em metade do tempo.',
  ],

  erro: [
    'Errado — e tudo bem. Erro em treino é remédio; erro na prova é ferida. Leia a explicação com atenção.',
    'Não foi dessa vez. Não se irrite: entenda. Depois eu trago essa questão de volta.',
    'Errou. Respire. Agora leia o porquê, porque é aí que o estudo realmente acontece.',
    'Falhou aqui. Ótimo: encontramos uma brecha na sua defesa antes da banca encontrar.',
    'Resposta incorreta. Não passe adiante sem entender — eu vou saber.',
    'Errado. Mas quem lê a correção com calma hoje acerta com desprezo amanhã.',
  ],
  erroRepetido: [
    'Você já tinha errado essa. Pare. Leia duas vezes. Esse ponto está sangrando e precisa ser fechado.',
    'De novo esse tópico. Isso não é burrice, é sinal: aqui você precisa de repetição, não de pressa.',
  ],
  erroSequencia: [
    '{seq} erros em sequência. Pare por um instante, beba água, endireite as costas. Cansaço erra por você.',
    'Está errando em série, {nome}. Isso é fadiga, não incapacidade. Respire fundo e volte.',
  ],

  /* ---------- Fim de nível ---------- */
  fimExcelente: [
    'Domínio absoluto. {pct}% — esse nível está encerrado e selado.',
    '{pct}%. Impecável, {nome}. Um dia você vai olhar para trás e ver que foi aqui que virou.',
    'Nota de aprovada. Levante a cabeça: você merece esse resultado.',
  ],
  fimBom: [
    '{pct}%. Sólido, mas ainda não é o seu limite. Refaça quando puder e busque a terceira flor.',
    'Aprovada no nível com {pct}%. Bom. "Bom" ainda não é "certo em qualquer circunstância" — voltaremos aqui.',
  ],
  fimFraco: [
    '{pct}%. Não passou, e não vou fingir que passou. Releia a aula e volte — eu espero.',
    'Ainda não, {nome}. {pct}% não sustenta uma aprovação. Refaça. Sem vergonha, sem drama.',
    'Reprovada neste nível. Isso não é sobre você — é sobre este tópico. Vamos de novo.',
  ],

  /* ---------- Simulados ---------- */
  simuladoInicio: [
    'Simulado. A partir do primeiro toque, o relógio é seu inimigo — e sua régua. Sem consultas, sem pausas.',
    'Trate isto como prova de verdade. Celular longe, porta fechada, coluna ereta. Comece.',
    'A prova real vai ter cadeira desconfortável e barulho. Treine o desconforto, {nome}.',
  ],
  simuladoFim: [
    'Simulado encerrado: {pct}%. Agora vem a parte que quase ninguém faz — revisar tudo o que errou.',
    '{pct}% no cronômetro. O número importa menos que o mapa de erros que ele acabou de te dar.',
  ],

  /* ---------- Revisão espaçada ---------- */
  revisaoInicio: [
    'Estas são as suas feridas abertas. Vamos fechá-las uma a uma.',
    'Revisão. As questões voltam porque você ainda não provou domínio — não por castigo.',
    'Aqui só entra o que resistiu a você. Se vencer hoje, elas se afastam por mais tempo.',
  ],
  revisaoVazia: [
    'Nenhuma revisão vencida. Suas feridas estão fechadas, {nome}. Aproveite e avance na trilha.',
  ],
  revisaoDominada: [
    'Essa questão foi dominada. Ela sai do seu caminho — por enquanto.',
  ],

  /* ---------- Marcos ---------- */
  metaBatida: [
    'Uma hora cumprida, {nome}. Você fez hoje o que a maioria só promete fazer amanhã.',
    'Meta do dia batida. Marque no calendário mental: mais um dia em que você não se traiu.',
  ],
  streakNovo: [
    '<b>{streak} dias seguidos.</b> A cerejeira não floresce num dia — ela insiste o ano inteiro.',
  ],
  streakQuebrado: [
    'Sua sequência caiu. Levante. Recomeçar no dia seguinte é a diferença entre quem desiste e quem passa.',
  ],
  conquista: [
    'Conquista desbloqueada: <b>{badge}</b>. Guarde. Nos dias ruins, é bom lembrar do que você já venceu.',
  ],
  subiuRank: [
    'Você agora é <b>{rank}</b>. O título não estuda por você — mas prova que você já estudou.',
  ],
  materiaConcluida: [
    'Matéria inteira concluída: <b>{materia}</b>. Isso é território conquistado. Não devolva por falta de revisão.',
  ],

  /* ---------- Ociosidade / foco ---------- */
  /* ---------- Caderno de erros ---------- */
  cadernoCheio: [
    'Aqui está tudo o que você já errou, {nome}. Não é vergonha — é mapa. Ferida catalogada é ferida que fecha.',
    'Este é o seu caderno de erros. Quem estuda pelo que já sabe se ilude; quem estuda por aqui, passa.',
    'O que está no topo desta lista você errou mais de uma vez. É por aí que a prova entra.',
  ],
  cadernoVazio: [
    'Caderno limpo. Ou você ainda não estudou o bastante, ou está indo bem demais. Vamos descobrir qual dos dois.',
  ],

  /* ---------- Contagem para a prova ---------- */
  provaLonge: [
    'Ainda há tempo — e é exatamente por isso que ele será desperdiçado, se você deixar. Ritmo constante, {nome}.',
  ],
  provaPerto: [
    'A prova está logo ali, {nome}. A partir daqui não se aprende matéria nova: consolida-se o que já existe.',
    'Últimas semanas. Revisão e simulado. Conteúdo novo agora só atrapalha.',
  ],
  provaAtrasada: [
    'No ritmo atual você não termina o edital antes da prova. Não é ameaça, é aritmética. Ou sobe o ritmo, ou escolhemos o que sacrificar.',
    'A conta não fecha, {nome}. Prefiro te dizer agora, com tempo de corrigir, do que na véspera.',
  ],
  provaEmDia: [
    'No ritmo atual você termina o edital antes da prova, com folga para revisar. Mantenha exatamente isso.',
  ],

  /* ---------- Fortaleza desmentida pelos números ---------- */
  fortalezaFalsa: [
    'Você marcou <b>{materia}</b> como ponto forte e está com <b>{taxa}%</b> de acerto. Um de nós dois está enganado — e não sou eu.',
    '<b>{materia}</b> era para ser sua vantagem. Com <b>{taxa}%</b>, virou risco. Vamos tratar isso hoje.',
  ],
  fortalezaConfirmada: [
    '<b>{materia}</b> com <b>{taxa}%</b>. Ponto forte confirmado pelos números, não pela sua opinião. É assim que gosto.',
  ],

  foco: [
    'Você parou. Está aqui ou está no celular, {nome}?',
    'Silêncio longo demais. Volte para a questão.',
    'Distração é o único demônio que eu não consigo curar de longe. Volte.',
  ],

  generico: [
    'Continue. O caminho é longo, mas ele existe.',
  ],
};

/** Falas de abertura por matéria (usadas na entrada da trilha). */
export const FALAS_MATERIA = {
  portugues: 'Sua casa, {nome}. Formada em Letras, então vou ser exigente: aqui a meta é <b>gabaritar</b>, não passar raspando.',
  ingles: 'Você é professora de inglês concursada. Esta matéria deveria ser ponto garantido — vamos tratá-la como tal.',
  constitucional: 'Direito Constitucional é a coluna vertebral da prova da Câmara. Tudo aqui volta para o texto da Constituição. Leia a letra da lei.',
  processo_legislativo: 'Este é o coração do cargo. Quem trabalha na Câmara vive de processo legislativo — a banca sabe disso e cobra sem piedade.',
  administrativo: 'Direito Administrativo é decoreba com lógica. Eu vou te dar a lógica; a repetição faz o resto.',
  tecnica_legislativa: 'Técnica legislativa e redação oficial: a matéria em que Letras vira arma. Forma correta, hierarquia certa, verbo exato.',
  ciencia_politica: 'Ciência Política e Teoria do Estado. Parece abstrato, mas é o que explica por que a Câmara funciona como funciona.',
  administracao_publica: 'Administração Pública: princípios, modelos e reformas. Aqui a banca adora comparar o burocrático com o gerencial.',
  raciocinio_logico: 'Raciocínio Lógico não perdoa distração, mas perdoa quem treina. É a matéria mais treinável da prova.',
  etica: 'Ética no serviço público: poucas questões, alto índice de acerto. Ponto barato — não perca nenhum.',
  atualidades: 'Atualidades e realidade brasileira. Aqui você estuda lendo o país todo dia, não só o PDF.',
  informatica: 'Noções de Informática. Nada de aprofundar demais: o que a banca quer é o básico bem sabido.',
};
