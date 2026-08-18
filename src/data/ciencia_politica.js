/* ============================================================
   CIÊNCIA POLÍTICA E TEORIA DO ESTADO — peso 3
   Parece abstrato, mas é o que explica por que a Câmara
   funciona como funciona.
   ============================================================ */

export default {
  id: 'ciencia_politica',
  nome: 'Ciência Política e Teoria do Estado',
  curto: 'Ciência Política',
  abrev: 'CPO',
  peso: 3,
  bloco: 'especificos',
  cor: '#7fa3c9',
  ico: '🗳️',
  fortaleza: false,
  descricao: 'Estado, soberania, formas de governo, sistemas eleitorais, partidos e representação política.',

  niveis: [
    {
      id: 'cpo-1',
      titulo: 'Estado, poder e soberania',
      subtitulo: 'Elementos do Estado e teorias de legitimação',
      topicos: ['Elementos do Estado', 'Soberania', 'Contratualistas', 'Legitimidade e dominação'],
      aula: {
        intro: 'Antes de estudar o Parlamento, entenda o que é o Estado que ele integra. Sem isso, tudo vira decoreba solta.',
        blocos: [
          {
            t: 'Os elementos constitutivos do Estado',
            lista: [
              '**Povo**: o elemento humano vinculado juridicamente ao Estado. Não confundir com **população** (dado demográfico, inclui estrangeiros) nem com **nação** (unidade cultural e histórica).',
              '**Território**: base física, incluindo solo, subsolo, espaço aéreo, mar territorial e os territórios por extensão (navios e aeronaves).',
              '**Soberania** (ou poder político): capacidade de decidir em última instância, sem subordinação a outro poder.',
              'Parte da doutrina acrescenta a **finalidade** (bem comum) como quarto elemento.',
            ],
          },
          {
            t: 'Soberania',
            p: [
              'Segundo Jean Bodin, a soberania é **perpétua e absoluta**. Na formulação moderna, é **una, indivisível, inalienável e imprescritível**.',
              'Internamente, traduz-se em **supremacia**: nenhum poder concorrente dentro do território. Externamente, em **independência**: igualdade jurídica entre Estados.',
              'No Estado Democrático de Direito, o titular da soberania é o **povo** (art. 1º, parágrafo único, da CF/88), e seu exercício é limitado pela própria Constituição.',
            ],
          },
          {
            t: 'Contratualistas: três respostas para a mesma pergunta',
            lista: [
              '**Hobbes** (*Leviatã*): o estado de natureza é a guerra de todos contra todos. O contrato transfere o poder a um soberano irresistível — legitima o absolutismo.',
              '**Locke** (*Segundo Tratado*): há direitos naturais (vida, liberdade, propriedade) anteriores ao Estado. O poder é fiduciário e limitado; se viola o pacto, cabe resistência. É a raiz do liberalismo e da separação de poderes.',
              '**Rousseau** (*Contrato Social*): a soberania pertence ao povo e é inalienável. A **vontade geral** é o fundamento da lei — raiz da democracia moderna e da soberania popular.',
            ],
          },
          {
            t: 'Weber: os três tipos de dominação legítima',
            p: [
              '**Tradicional** (o poder vale porque sempre valeu), **carismática** (vale pelas qualidades extraordinárias do líder) e **racional-legal** (vale porque decorre de normas impessoais previamente estabelecidas).',
              'O Estado moderno assenta-se na dominação **racional-legal** e na burocracia — e é por isso que concurso público, hierarquia e impessoalidade são traços estruturais, não escolhas administrativas.',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'Povo x população x nação', txt: '<b>Povo</b> = vínculo jurídico. <b>População</b> = conjunto de habitantes (conceito demográfico). <b>Nação</b> = identidade cultural. A banca troca os três com frequência.' },
          { tipo: 'dica', rot: 'Chave dos contratualistas', txt: 'Hobbes → segurança. Locke → propriedade e limites. Rousseau → vontade geral. Um adjetivo para cada e você acerta qualquer questão de identificação.' },
        ],
        resumo: [
          'Elementos: povo, território e soberania (e, para alguns, finalidade).',
          'Soberania: una, indivisível, inalienável e imprescritível.',
          'Hobbes legitima o absolutismo; Locke, o liberalismo; Rousseau, a soberania popular.',
          'Weber: dominação tradicional, carismática e racional-legal.',
        ],
      },
      questoes: [
        {
          id: 'cpo1-01', dif: 2, tipo: 'multipla',
          enunciado: 'São elementos constitutivos do Estado, segundo a doutrina clássica:',
          alts: [
            'povo, território e soberania.',
            'população, nação e governo.',
            'território, nação e partidos políticos.',
            'povo, cultura e economia.',
            'governo, burocracia e força policial.',
          ],
          correta: 0,
          expl: 'Povo (elemento humano com vínculo jurídico), território (base física) e soberania (poder político não subordinado). População é conceito demográfico; nação é conceito sociocultural.',
          tags: ['elementos do Estado'],
        },
        {
          id: 'cpo1-02', dif: 3, tipo: 'multipla',
          enunciado: 'A concepção de que a soberania pertence ao povo, é inalienável e se expressa pela vontade geral, é atribuída a',
          alts: ['Rousseau.', 'Hobbes.', 'Locke.', 'Montesquieu.', 'Maquiavel.'],
          correta: 0,
          expl: 'Rousseau, no *Contrato Social*. Hobbes defende a transferência do poder a um soberano absoluto; Locke, o poder limitado e fiduciário; Montesquieu, a separação dos poderes; Maquiavel analisa a conquista e a manutenção do poder.',
          tags: ['contratualistas'],
        },
        {
          id: 'cpo1-03', dif: 3, tipo: 'ce',
          base: 'A dominação racional-legal, na tipologia de Max Weber, fundamenta-se na crença na legalidade de normas estatuídas e na competência daqueles que as aplicam.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. É a base do Estado burocrático moderno: a obediência não se dirige à pessoa, mas ao cargo e à norma. Daí decorrem impessoalidade, hierarquia, competência delimitada e ingresso por mérito.',
          tags: ['Weber'],
        },
        {
          id: 'cpo1-04', dif: 3, tipo: 'multipla',
          enunciado: 'Sobre a soberania, é INCORRETO afirmar que',
          alts: [
            'é divisível entre os entes federativos, cada qual detendo parcela de soberania própria.',
            'é una e indivisível.',
            'no plano interno, traduz-se em supremacia do poder estatal.',
            'no plano externo, traduz-se em independência e igualdade jurídica entre os Estados.',
            'no Estado Democrático de Direito, tem por titular o povo.',
          ],
          correta: 0,
          expl: 'Na federação brasileira, apenas a **República Federativa do Brasil** é soberana; União, Estados, DF e Municípios são **autônomos**. Autonomia é capacidade de autodeterminação nos limites da Constituição — não é parcela de soberania.',
          tags: ['soberania', 'federalismo'],
        },
        {
          id: 'cpo1-05', dif: 3, tipo: 'multipla',
          enunciado: 'Para John Locke, o poder político',
          alts: [
            'é fiduciário e limitado, podendo ser resistido quando viola os direitos naturais.',
            'é absoluto e irresistível, sob pena de retorno ao estado de guerra.',
            'não admite qualquer forma de representação legítima.',
            'deriva diretamente da vontade divina, sem intermediação do consentimento.',
            'confunde-se com a vontade geral, indivisível e inalienável.',
          ],
          correta: 0,
          expl: 'Locke concebe o poder como um encargo de confiança (*trust*): existe para proteger vida, liberdade e propriedade. Rompido o pacto, legitima-se a resistência. A alternativa (b) é Hobbes; a (e), Rousseau.',
          tags: ['Locke'],
        },
        {
          id: 'cpo1-06', dif: 2, tipo: 'ce',
          base: 'O conceito de povo, em teoria do Estado, corresponde ao conjunto de todos os habitantes de um território, incluídos os estrangeiros nele residentes.',
          enunciado: 'Julgue a afirmação.',
          correta: 1,
          expl: 'ERRADO. Esse é o conceito de **população**, de natureza demográfica. **Povo** é o conjunto de pessoas ligadas ao Estado pelo vínculo jurídico da nacionalidade, titulares de direitos políticos.',
          tags: ['povo'],
        },
      ],
    },

    {
      id: 'cpo-2',
      titulo: 'Formas de Estado, de governo e sistemas de governo',
      subtitulo: 'Federação, república, presidencialismo e parlamentarismo',
      topicos: ['Formas de Estado', 'Formas de governo', 'Sistemas de governo', 'Federalismo'],
      aula: {
        intro: 'Três perguntas diferentes que os candidatos misturam: como o poder se distribui no território, como se chega ao poder e como Executivo e Legislativo se relacionam.',
        blocos: [
          {
            t: 'Forma de Estado — distribuição territorial do poder',
            lista: [
              '**Estado unitário**: um único centro de poder político. Pode ser puro, descentralizado administrativamente ou regional.',
              '**Estado federal**: pluralidade de centros de poder autônomos, com repartição constitucional de competências, participação dos entes na formação da vontade nacional (no Brasil, pelo Senado) e órgão de solução de conflitos (STF). É indissolúvel — não há direito de secessão.',
              '**Confederação**: união de Estados soberanos por tratado, com direito de secessão. Não é forma de Estado propriamente, e sim aliança.',
            ],
          },
          {
            t: 'Forma de governo — como se acede ao poder',
            p: [
              '**República**: eletividade, temporariedade dos mandatos e responsabilidade do governante (prestação de contas).',
              '**Monarquia**: hereditariedade, vitaliciedade e irresponsabilidade política do monarca.',
            ],
          },
          {
            t: 'Sistema de governo — relação Executivo/Legislativo',
            lista: [
              '**Presidencialismo**: o Presidente é simultaneamente Chefe de Estado e Chefe de Governo; mandato fixo; não depende de confiança do Parlamento; ministros de livre nomeação e exoneração. Separação **rígida** de poderes.',
              '**Parlamentarismo**: as chefias são separadas (Chefe de Estado — monarca ou presidente; Chefe de Governo — primeiro-ministro); o gabinete depende da **confiança** do Parlamento; há **moção de censura** e possibilidade de **dissolução** do Parlamento e eleições antecipadas. Colaboração entre poderes.',
              '**Semipresidencialismo**: presidente eleito com poderes efetivos convive com primeiro-ministro responsável perante o Parlamento (modelo francês).',
            ],
            p: [
              'O Brasil é uma **república federativa presidencialista**, com traços de "presidencialismo de coalizão": o Executivo precisa formar maioria parlamentar por meio de coalizões partidárias, distribuição de cargos e emendas — conceito de Sérgio Abranches, muito cobrado.',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'Três perguntas distintas', txt: 'Federação/unitário = <b>forma de Estado</b>. República/monarquia = <b>forma de governo</b>. Presidencialismo/parlamentarismo = <b>sistema de governo</b>. Errar a categoria é erro de conceito, não de memória.' },
          { tipo: 'dica', rot: 'Marca do parlamentarismo', txt: 'Se existe <b>responsabilidade do gabinete perante o Parlamento</b> (moção de censura/voto de confiança), é parlamentarismo. Se o mandato do chefe do governo é fixo, é presidencialismo.' },
        ],
        resumo: [
          'Federação: autonomia, repartição de competências, participação no poder central, indissolubilidade.',
          'República: eletividade, temporariedade e responsabilidade.',
          'Presidencialismo: chefias unificadas e mandato fixo; parlamentarismo: chefias separadas e confiança parlamentar.',
          'Brasil: república federativa presidencialista, operando como presidencialismo de coalizão.',
        ],
      },
      questoes: [
        {
          id: 'cpo2-01', dif: 2, tipo: 'multipla',
          enunciado: 'A eletividade, a temporariedade dos mandatos e a responsabilidade do governante caracterizam',
          alts: [
            'a forma de governo republicana.',
            'a forma de Estado federal.',
            'o sistema de governo parlamentarista.',
            'o regime político democrático, exclusivamente.',
            'o Estado unitário descentralizado.',
          ],
          correta: 0,
          expl: 'São os três traços clássicos da república, em contraste com a monarquia (hereditariedade, vitaliciedade e irresponsabilidade política). Note que forma de **governo** é diferente de forma de **Estado** e de **sistema** de governo.',
          tags: ['formas de governo'],
        },
        {
          id: 'cpo2-02', dif: 3, tipo: 'multipla',
          enunciado: 'Constitui característica essencial do parlamentarismo',
          alts: [
            'a responsabilidade política do gabinete perante o Parlamento, que pode destituí-lo por moção de censura.',
            'o mandato fixo do chefe de governo, imune a deliberação parlamentar.',
            'a acumulação das funções de Chefe de Estado e Chefe de Governo em uma só pessoa.',
            'a impossibilidade de dissolução do Parlamento antes do término da legislatura.',
            'a eleição direta do primeiro-ministro pelo eleitorado.',
          ],
          correta: 0,
          expl: 'A dependência de confiança parlamentar é a marca do parlamentarismo. As alternativas (b) e (c) descrevem o presidencialismo; a (d) contraria a lógica parlamentarista; e o primeiro-ministro, em regra, é indicado pela maioria parlamentar, não eleito diretamente.',
          tags: ['sistemas de governo'],
        },
        {
          id: 'cpo2-03', dif: 3, tipo: 'ce',
          base: 'Na federação brasileira, é assegurado aos Estados-membros o direito de secessão, desde que aprovado por plebiscito estadual.',
          enunciado: 'Julgue a afirmação.',
          correta: 1,
          expl: 'ERRADO. A federação brasileira é **indissolúvel** (art. 1º da CF/88). Tentativa de secessão autoriza intervenção federal para manter a integridade nacional (art. 34, I). Direito de secessão existe em **confederações**, não em federações.',
          tags: ['federalismo'],
        },
        {
          id: 'cpo2-04', dif: 3, tipo: 'multipla',
          enunciado: 'O conceito de "presidencialismo de coalizão", formulado por Sérgio Abranches, descreve',
          alts: [
            'a necessidade de o Executivo formar e sustentar maiorias parlamentares por meio de coalizões multipartidárias.',
            'a substituição do presidencialismo pelo parlamentarismo em situações de crise.',
            'a existência de dois chefes de governo simultaneamente.',
            'a vedação constitucional a alianças partidárias no Legislativo.',
            'a eleição do Presidente da República pelo Congresso Nacional.',
          ],
          correta: 0,
          expl: 'A combinação de presidencialismo, federalismo, representação proporcional e multipartidarismo obriga o Presidente a governar com coalizões amplas — o que explica a centralidade da negociação com lideranças e da distribuição de cargos e emendas.',
          tags: ['presidencialismo de coalizão'],
        },
        {
          id: 'cpo2-05', dif: 3, tipo: 'multipla',
          enunciado: 'A participação dos entes federados na formação da vontade nacional, no federalismo brasileiro, realiza-se principalmente por meio',
          alts: [
            'do Senado Federal, composto por representantes dos Estados e do Distrito Federal.',
            'da Câmara dos Deputados, eleita pelo sistema proporcional.',
            'do Conselho da República, órgão de consulta do Presidente.',
            'dos Tribunais de Justiça dos Estados.',
            'das Assembleias Legislativas, com poder de veto sobre leis federais.',
          ],
          correta: 0,
          expl: 'O bicameralismo federativo cumpre essa função: a Câmara representa o **povo** (proporcional à população), enquanto o Senado representa os **Estados** em igualdade (três senadores por unidade), independentemente do tamanho.',
          tags: ['federalismo', 'bicameralismo'],
        },
        {
          id: 'cpo2-06', dif: 2, tipo: 'multipla',
          enunciado: 'A distinção entre Estado unitário e Estado federal refere-se',
          alts: [
            'à forma de Estado, isto é, à distribuição territorial do poder político.',
            'à forma de governo, isto é, ao modo de acesso ao poder.',
            'ao sistema de governo, isto é, à relação entre Executivo e Legislativo.',
            'ao regime político, isto é, ao grau de participação popular.',
            'ao sistema eleitoral adotado para as casas legislativas.',
          ],
          correta: 0,
          expl: 'Forma de Estado responde a "como o poder se distribui no território". Forma de governo responde a "como se chega ao poder". Sistema de governo responde a "como Executivo e Legislativo se relacionam".',
          tags: ['formas de Estado'],
        },
      ],
    },

    {
      id: 'cpo-3',
      titulo: 'Sistemas eleitorais e partidos políticos',
      subtitulo: 'Como votos se convertem em cadeiras',
      topicos: ['Sistema majoritário', 'Sistema proporcional', 'Quociente eleitoral', 'Partidos políticos'],
      aula: {
        intro: 'Este é o nível mais prático da matéria: é a engenharia que define quem senta nas 513 cadeiras.',
        blocos: [
          {
            t: 'Sistema majoritário',
            p: [
              'Elege-se quem obtém mais votos. Pode ser **simples** (maioria relativa: Senado, prefeitos de municípios com até 200 mil eleitores) ou **absoluto** (com segundo turno: Presidente, Governadores e prefeitos de municípios com mais de 200 mil eleitores).',
              'Vantagem: relação direta entre eleito e eleitor. Desvantagem: sub-representação das minorias.',
            ],
          },
          {
            t: 'Sistema proporcional (Câmara, Assembleias e Câmaras Municipais)',
            p: [
              'O Brasil adota a **representação proporcional de lista aberta**, com votos convertidos em cadeiras por partido/federação e ordenação interna pela votação nominal de cada candidato.',
              '**Quociente eleitoral (QE)** = votos válidos ÷ número de cadeiras. **Quociente partidário (QP)** = votos do partido ÷ QE (parte inteira). As cadeiras restantes são distribuídas por **médias sucessivas**.',
              'Há **cláusula de desempenho individual**: para se eleger, o candidato precisa alcançar votação nominal mínima de 10% do quociente eleitoral.',
              'Consequência importante: o voto proporcional é, na prática, um voto **no partido e no candidato ao mesmo tempo** — daí o fenômeno dos "puxadores de votos".',
            ],
          },
          {
            t: 'Partidos políticos (art. 17 da CF)',
            lista: [
              'Liberdade de criação, fusão, incorporação e extinção, resguardados a soberania nacional, o regime democrático, o pluripartidarismo e os direitos fundamentais.',
              'Preceitos obrigatórios: **caráter nacional**; vedação de recebimento de recursos de entidade ou governo estrangeiro; prestação de contas à Justiça Eleitoral; funcionamento parlamentar de acordo com a lei.',
              'Os partidos adquirem personalidade jurídica na forma da lei civil e registram o estatuto no **TSE**. Têm **autonomia** para definir estrutura interna e regras de escolha de candidatos, devendo estabelecer normas de disciplina e fidelidade.',
              'Têm direito a recursos do **fundo partidário** e acesso gratuito ao rádio e à televisão. A **cláusula de desempenho** (EC 97/2017) condiciona esse acesso a votação mínima; a mesma emenda vedou **coligações** em eleições proporcionais e permitiu **federações** partidárias.',
            ],
          },
          {
            t: 'Fidelidade partidária',
            p: [
              'O TSE e o STF firmaram que o mandato obtido no sistema **proporcional** pertence ao partido: a desfiliação sem justa causa gera perda do mandato. **Justas causas** incluem mudança substancial de programa, grave discriminação política pessoal e janela partidária.',
              'Nos cargos **majoritários**, o STF decidiu que a perda do mandato por infidelidade **não se aplica** (ADI 5081), porque a lógica do voto é personalizada.',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'Proporcional x majoritário', txt: 'Fidelidade partidária com perda de mandato vale para o <b>proporcional</b> (deputados e vereadores), não para o <b>majoritário</b> (presidente, governador, prefeito, senador).' },
          { tipo: 'dica', rot: 'Cálculo em dois passos', txt: 'QE = votos válidos ÷ cadeiras. QP = votos do partido ÷ QE. Sobras vão por médias — divide-se a votação do partido pelo número de cadeiras já obtidas + 1, e a maior média leva.' },
        ],
        resumo: [
          'Majoritário simples: Senado e prefeituras menores. Majoritário absoluto: Presidente, governadores, prefeituras maiores.',
          'Câmara: proporcional de lista aberta, com QE, QP e médias.',
          'Desempenho individual mínimo: 10% do quociente eleitoral.',
          'EC 97/2017: fim das coligações proporcionais, criação das federações e cláusula de desempenho.',
        ],
      },
      questoes: [
        {
          id: 'cpo3-01', dif: 2, tipo: 'multipla',
          enunciado: 'Os Deputados Federais são eleitos pelo sistema',
          alts: [
            'proporcional, com lista aberta.',
            'majoritário simples.',
            'majoritário com dois turnos.',
            'distrital misto.',
            'proporcional, com lista fechada e preordenada.',
          ],
          correta: 0,
          expl: 'Art. 45 da CF: sistema proporcional. No Brasil, a lista é **aberta** — o eleitor define a ordem dos eleitos dentro do partido pela votação nominal. Lista fechada seria ordem definida previamente pelo partido.',
          tags: ['sistema proporcional'],
        },
        {
          id: 'cpo3-02', dif: 3, tipo: 'multipla',
          enunciado: 'O quociente eleitoral é obtido',
          alts: [
            'dividindo-se o número de votos válidos pelo número de cadeiras em disputa.',
            'dividindo-se os votos do partido pelo número de candidatos registrados.',
            'multiplicando-se o número de cadeiras pelo total de partidos.',
            'dividindo-se os votos nominais pelo número de eleitores aptos.',
            'somando-se os votos brancos e nulos aos votos válidos.',
          ],
          correta: 0,
          expl: 'QE = votos válidos ÷ número de lugares. Em seguida, o quociente partidário (votos do partido ÷ QE) define quantas cadeiras cada partido conquista de imediato; as sobras vão por médias sucessivas.',
          tags: ['quociente eleitoral'],
        },
        {
          id: 'cpo3-03', dif: 3, tipo: 'ce',
          base: 'Segundo entendimento consolidado, a perda do mandato por infidelidade partidária não se aplica aos cargos eletivos majoritários.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. O STF, na ADI 5081, afastou a regra da fidelidade com perda de mandato para os cargos majoritários, por incompatibilidade com a lógica personalizada desse sistema. Nos cargos proporcionais, o mandato pertence ao partido.',
          tags: ['fidelidade partidária'],
        },
        {
          id: 'cpo3-04', dif: 3, tipo: 'multipla',
          enunciado: 'São preceitos que os partidos políticos devem observar, nos termos do art. 17 da CF/88:',
          alts: [
            'caráter nacional, vedação de recursos de entidade ou governo estrangeiro e prestação de contas à Justiça Eleitoral.',
            'obrigatoriedade de coligação nas eleições proporcionais.',
            'registro do estatuto no Tribunal de Contas da União.',
            'proibição de estabelecer normas de disciplina e fidelidade partidária.',
            'obrigatoriedade de realizar eleições internas por voto secreto e obrigatório.',
          ],
          correta: 0,
          expl: 'Art. 17, I a IV. O registro do estatuto é no **TSE**, não no TCU. E, desde a EC 97/2017, as coligações em eleições **proporcionais** são proibidas — subsistem nas majoritárias.',
          tags: ['partidos políticos'],
        },
        {
          id: 'cpo3-05', dif: 3, tipo: 'multipla',
          enunciado: 'A EC 97/2017 introduziu no sistema político-eleitoral brasileiro',
          alts: [
            'a vedação às coligações partidárias nas eleições proporcionais e a cláusula de desempenho para acesso a recursos e tempo de propaganda.',
            'a adoção do sistema distrital misto para a Câmara dos Deputados.',
            'o voto facultativo para todos os eleitores.',
            'a reeleição para cargos do Poder Legislativo.',
            'a extinção do fundo partidário.',
          ],
          correta: 0,
          expl: 'A emenda vedou as coligações proporcionais (a partir de 2020), criou a cláusula de desempenho progressiva e abriu caminho para as **federações partidárias**, que funcionam como um único partido por prazo mínimo de quatro anos.',
          tags: ['reforma política'],
        },
        {
          id: 'cpo3-06', dif: 3, tipo: 'multipla',
          enunciado: 'O sistema majoritário absoluto, com previsão de segundo turno, aplica-se à eleição de',
          alts: [
            'Presidente da República, Governadores e Prefeitos de municípios com mais de duzentos mil eleitores.',
            'Senadores e Deputados Federais.',
            'Deputados Estaduais e Vereadores.',
            'apenas do Presidente da República.',
            'todos os cargos do Poder Legislativo.',
          ],
          correta: 0,
          expl: 'Senadores são eleitos por maioria **simples** (relativa), sem segundo turno. Deputados e vereadores seguem o sistema proporcional. O segundo turno existe apenas nos cargos executivos indicados.',
          tags: ['sistema majoritário'],
        },
      ],
    },

    {
      id: 'cpo-4',
      titulo: 'Representação, democracia e Poder Legislativo',
      subtitulo: 'Funções do Parlamento e accountability',
      topicos: ['Democracia representativa', 'Funções do Legislativo', 'Accountability', 'Grupos de pressão'],
      aula: {
        intro: 'Fechamos a matéria falando do lugar onde você vai trabalhar: o Parlamento como instituição, não como prédio.',
        blocos: [
          {
            t: 'Modelos de representação',
            lista: [
              '**Mandato imperativo**: o representante é preso a instruções dos representados; sua desobediência autoriza revogação. Modelo do Antigo Regime e das experiências de delegação vinculada.',
              '**Mandato representativo (livre)**: o eleito representa a nação inteira, não apenas seus eleitores, e vota conforme sua consciência. É o modelo adotado pelas democracias liberais e pela CF/88.',
              '**Mandato partidário**: temperamento contemporâneo — o mandato proporcional está vinculado ao partido, o que justifica a fidelidade partidária.',
            ],
          },
          {
            t: 'As funções do Poder Legislativo',
            lista: [
              '**Legislativa (típica)**: produzir normas gerais e abstratas.',
              '**Fiscalizatória (típica)**: controle político-administrativo e financeiro-orçamentário do Executivo — CPIs, convocação de autoridades, pedidos de informação, sustação de atos, apreciação de contas com auxílio do TCU.',
              '**Julgamento político**: crimes de responsabilidade (Senado).',
              '**Representativa**: canalizar demandas sociais.',
              '**Legitimação e deliberação pública**: dar publicidade ao conflito político e produzir consenso possível.',
              '**Atípicas**: administrar (organização interna, concursos) e julgar administrativamente.',
            ],
          },
          {
            t: 'Accountability e controle',
            p: [
              '**Accountability vertical**: prestação de contas do governante ao eleitor, sobretudo pelo voto. **Horizontal**: controle entre instituições (Legislativo, Judiciário, Tribunais de Contas, Ministério Público). **Societal**: exercida por imprensa, organizações civis e mecanismos de transparência.',
              'A transparência é condição da accountability: sem informação acessível (Lei de Acesso à Informação, portais de dados abertos, TV Câmara), não há controle possível.',
            ],
          },
          {
            t: 'Grupos de pressão e lobby',
            p: [
              '**Grupo de interesse** torna-se **grupo de pressão** quando atua para influenciar decisões públicas. O **lobby** é a atividade de representação de interesses perante o poder público.',
              'A distinção relevante é entre **representação legítima de interesses** (com identificação, registro e transparência) e **captura ou corrupção** (vantagem indevida). O Parlamento é, por natureza, o principal alvo dessa atuação — e é por isso que regras de transparência, audiências públicas e registro de audiências importam.',
            ],
          },
        ],
        destaques: [
          { tipo: 'dica', rot: 'Três accountabilities', txt: '<b>Vertical</b> = eleitor cobra do eleito. <b>Horizontal</b> = instituição cobra de instituição. <b>Societal</b> = sociedade organizada e imprensa cobram. Guarde os três nomes.' },
          { tipo: 'perigo', rot: 'Mandato no Brasil', txt: 'A CF/88 adota o mandato <b>representativo</b>, não o imperativo: o parlamentar não pode ser destituído por descumprir promessa de campanha. A fidelidade partidária é exceção construída pela jurisprudência para o sistema proporcional.' },
        ],
        resumo: [
          'CF/88 adota mandato representativo, com temperamento de mandato partidário no proporcional.',
          'Funções típicas: legislar e fiscalizar; atípicas: administrar e julgar administrativamente.',
          'Accountability: vertical, horizontal e societal.',
          'Lobby legítimo se distingue da captura pela transparência e pela ausência de vantagem indevida.',
        ],
      },
      questoes: [
        {
          id: 'cpo4-01', dif: 3, tipo: 'multipla',
          enunciado: 'O modelo de mandato adotado pela Constituição Federal de 1988 é o',
          alts: [
            'representativo, em que o parlamentar não está juridicamente vinculado a instruções de seus eleitores.',
            'imperativo, em que o eleito deve seguir instruções expressas dos representados.',
            'revogável a qualquer tempo por iniciativa popular (recall).',
            'vinculado exclusivamente ao programa de governo do Executivo.',
            'condicionado à aprovação anual de suas votações em plebiscito.',
          ],
          correta: 0,
          expl: 'O mandato representativo é livre e geral: o parlamentar representa o povo, não apenas quem o elegeu. O *recall* não é previsto na CF/88, e a fidelidade partidária é limitação construída pela jurisprudência para os cargos proporcionais.',
          tags: ['representação'],
        },
        {
          id: 'cpo4-02', dif: 2, tipo: 'multipla',
          enunciado: 'São funções típicas do Poder Legislativo:',
          alts: [
            'legislar e fiscalizar.',
            'administrar e julgar.',
            'executar políticas públicas e arrecadar tributos.',
            'nomear ministros e chefiar a administração.',
            'representar o Estado nas relações internacionais.',
          ],
          correta: 0,
          expl: 'As funções típicas são a legislativa e a fiscalizatória. Administrar (organização interna, concursos, licitações) e julgar administrativamente são funções **atípicas** do Legislativo.',
          tags: ['funções do Legislativo'],
        },
        {
          id: 'cpo4-03', dif: 3, tipo: 'multipla',
          enunciado: 'O controle exercido por uma instituição estatal sobre outra, como o do Congresso Nacional sobre os atos do Poder Executivo, denomina-se accountability',
          alts: ['horizontal.', 'vertical.', 'societal.', 'difusa.', 'popular direta.'],
          correta: 0,
          expl: 'Accountability **horizontal** = controle interinstitucional (freios e contrapesos). **Vertical** = do cidadão sobre o governante, especialmente pelo voto. **Societal** = exercida por imprensa e organizações da sociedade civil.',
          tags: ['accountability'],
        },
        {
          id: 'cpo4-04', dif: 3, tipo: 'ce',
          base: 'A atividade de representação de interesses privados perante o poder público é, por sua natureza, incompatível com o regime democrático.',
          enunciado: 'Julgue a afirmação.',
          correta: 1,
          expl: 'ERRADO. A representação de interesses é inerente ao pluralismo político (art. 1º, V, da CF). O que a democracia repudia não é a atuação de grupos, mas a **captura opaca** e a obtenção de vantagens indevidas. Daí a ênfase em transparência, registro e audiências públicas.',
          tags: ['grupos de pressão'],
        },
        {
          id: 'cpo4-05', dif: 3, tipo: 'multipla',
          enunciado: 'Constituem instrumentos de exercício da função fiscalizatória do Congresso Nacional:',
          alts: [
            'comissões parlamentares de inquérito, convocação de autoridades, pedidos de informação e apreciação das contas do Presidente da República.',
            'iniciativa de projetos de lei e apresentação de emendas.',
            'sanção e veto de proposições legislativas.',
            'nomeação de ministros de Estado e chefia da administração federal.',
            'edição de medidas provisórias em caso de relevância e urgência.',
          ],
          correta: 0,
          expl: 'A alternativa (b) descreve a função legislativa; (c) e (d) e (e) são atribuições do **Executivo**. A fiscalização abrange o controle político-administrativo e o financeiro-orçamentário, este com o auxílio do TCU.',
          tags: ['fiscalização'],
        },
        {
          id: 'cpo4-06', dif: 3, tipo: 'multipla',
          enunciado: 'A democracia participativa adotada pela CF/88 combina representação com instrumentos de exercício direto, entre os quais',
          alts: [
            'plebiscito, referendo e iniciativa popular.',
            'recall, impeachment e voto distrital.',
            'audiência pública obrigatória e veto popular.',
            'mandato imperativo e revogação de mandato.',
            'consulta prévia vinculante ao Poder Judiciário.',
          ],
          correta: 0,
          expl: 'Art. 14, I a III. O **plebiscito** é convocado antes do ato legislativo; o **referendo**, depois, para ratificar ou rejeitar; a **iniciativa popular** permite apresentar projeto de lei diretamente à Câmara.',
          tags: ['democracia participativa'],
        },
      ],
    },
  ],
};
