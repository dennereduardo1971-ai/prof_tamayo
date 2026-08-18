/* ============================================================
   ATUALIDADES E REALIDADE BRASILEIRA — peso 2
   Esta é a única matéria que você estuda lendo o país todo dia.
   O app dá a moldura conceitual; a notícia é lição de casa.
   ============================================================ */

export default {
  id: 'atualidades',
  nome: 'Atualidades e Realidade Brasileira',
  curto: 'Atualidades',
  abrev: 'ATU',
  peso: 2,
  bloco: 'basicos',
  cor: '#e8825c',
  ico: '🌎',
  fortaleza: false,
  descricao: 'Estrutura social e econômica do Brasil, temas contemporâneos e inserção internacional. Conteúdo conceitual estável — complemente com leitura diária de notícias.',

  niveis: [
    {
      id: 'atu-1',
      titulo: 'Estrutura social, econômica e demográfica do Brasil',
      subtitulo: 'Indicadores que a banca cobra',
      topicos: ['Indicadores sociais', 'Transição demográfica', 'Desigualdade', 'Estrutura econômica'],
      aula: {
        intro: 'Atualidades não é lista de manchetes. É saber ler indicador. Quem entende o indicador acerta qualquer questão que use o dado do ano.',
        blocos: [
          {
            t: 'Os indicadores essenciais',
            lista: [
              '**IDH** (PNUD): média geométrica de três dimensões — renda (RNB per capita), educação (anos de estudo esperados e médios) e longevidade (expectativa de vida). Varia de 0 a 1. O **IDHAD** ajusta o índice pela desigualdade.',
              '**Índice de Gini**: mede concentração de renda de 0 (igualdade perfeita) a 1 (concentração máxima). O Brasil é historicamente um dos países mais desiguais do mundo.',
              '**Linha de pobreza** e **extrema pobreza**: critérios monetários por pessoa/dia, calculados pelo Banco Mundial e adaptados por políticas nacionais.',
              '**PIB**: soma dos bens e serviços finais. Cuidado: crescimento do PIB não implica melhoria distributiva.',
              '**IPCA** (IBGE): índice oficial de inflação, referência para a meta perseguida pelo Banco Central; **Selic** é a taxa básica de juros, definida pelo Copom.',
              '**PNAD Contínua** (IBGE): principal fonte de dados sobre trabalho — taxa de desocupação, subutilização, informalidade e rendimento.',
            ],
          },
          {
            t: 'Transição demográfica brasileira',
            p: [
              'O Brasil completou uma transição rápida: queda acentuada da fecundidade (hoje abaixo do nível de reposição de 2,1 filhos por mulher) somada ao aumento da expectativa de vida.',
              'Consequência: **envelhecimento populacional acelerado** e estreitamento da base da pirâmide etária. A **janela de oportunidade demográfica** (bônus demográfico), em que a população em idade ativa é proporcionalmente maior, está se fechando.',
              'Implicações de prova: pressão sobre a **previdência**, mudança do perfil de demanda por saúde (doenças crônicas) e por educação (menos vagas em ensino fundamental, mais em educação continuada).',
              'A população brasileira é majoritariamente **urbana** (mais de 80%), com concentração no litoral e forte peso das regiões metropolitanas.',
            ],
          },
          {
            t: 'Estrutura econômica',
            p: [
              'Composição do PIB: predomínio do setor de **serviços**, seguido pela **indústria** e pela **agropecuária**. A pauta de exportações é fortemente concentrada em **commodities** (soja, minério de ferro, petróleo, carnes) — fenômeno associado ao debate sobre **desindustrialização** e reprimarização.',
              'Federalismo fiscal: a União concentra a maior parte da arrecadação e realiza **transferências** obrigatórias (FPE, FPM) e voluntárias. A carga tributária brasileira é considerada regressiva por incidir fortemente sobre consumo.',
              'A **reforma tributária** sobre o consumo, aprovada por emenda constitucional, substitui tributos por um modelo dual de IVA (CBS federal e IBS subnacional), com Imposto Seletivo e transição plurianual.',
            ],
          },
          {
            t: 'Desigualdades estruturais',
            p: [
              'Regionais (Norte e Nordeste com indicadores sociais inferiores), raciais (diferenciais de renda, escolaridade e violência letal), de gênero (participação no mercado de trabalho, jornada de cuidados, teto salarial) e urbanas (déficit habitacional, saneamento, mobilidade).',
              'Políticas de enfrentamento recorrentes em prova: transferência de renda condicionada, cotas em concursos e universidades, política de assistência social (SUAS) e saneamento básico.',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'Gini x IDH', txt: '<b>Gini</b> mede desigualdade — quanto <b>maior</b>, pior. <b>IDH</b> mede desenvolvimento — quanto <b>maior</b>, melhor. A banca troca os sentidos das escalas.' },
          { tipo: 'dica', rot: 'Estude o mecanismo', txt: 'Não decore o número do ano: aprenda <b>o que o indicador mede e como reage</b>. Assim você responde mesmo com dado atualizado que nunca viu.' },
        ],
        resumo: [
          'IDH: renda, educação e longevidade. Gini: 0 igualdade, 1 concentração máxima.',
          'Fecundidade abaixo da reposição + longevidade = envelhecimento acelerado.',
          'PIB dominado por serviços; exportações concentradas em commodities.',
          'Carga tributária regressiva; reforma cria IVA dual (CBS e IBS).',
        ],
      },
      questoes: [
        {
          id: 'atu1-01', dif: 2, tipo: 'multipla',
          enunciado: 'O Índice de Desenvolvimento Humano (IDH) é composto pelas dimensões',
          alts: [
            'renda, educação e longevidade.',
            'renda, emprego e habitação.',
            'saúde, saneamento e segurança.',
            'escolaridade, mortalidade infantil e desigualdade.',
            'consumo, poupança e investimento.',
          ],
          correta: 0,
          expl: 'O IDH combina RNB per capita (renda), anos de estudo (educação) e expectativa de vida ao nascer (longevidade). O **IDHAD** é a versão ajustada à desigualdade — variação frequentemente cobrada.',
          tags: ['IDH'],
        },
        {
          id: 'atu1-02', dif: 3, tipo: 'ce',
          base: 'Quanto mais próximo de 1 o índice de Gini de um país, maior é a concentração de renda nele observada.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. Gini igual a 0 representaria igualdade perfeita; igual a 1, concentração total da renda em uma única pessoa. A escala é inversa à do IDH, em que valores maiores indicam melhor desempenho.',
          tags: ['Gini'],
        },
        {
          id: 'atu1-03', dif: 3, tipo: 'multipla',
          enunciado: 'A combinação entre queda da taxa de fecundidade e aumento da expectativa de vida produz, no Brasil,',
          alts: [
            'envelhecimento populacional acelerado, com pressão crescente sobre o sistema previdenciário.',
            'aumento sustentado da população em idade escolar de ensino fundamental.',
            'crescimento populacional exponencial nas próximas décadas.',
            'ampliação indefinida do bônus demográfico.',
            'reversão da urbanização, com retorno ao campo.',
          ],
          correta: 0,
          expl: 'A base da pirâmide se estreita e o topo se alarga. A janela de oportunidade demográfica (proporção elevada de população em idade ativa) tende a se fechar, o que torna urgente ganho de produtividade e ajuste previdenciário.',
          tags: ['transição demográfica'],
        },
        {
          id: 'atu1-04', dif: 3, tipo: 'multipla',
          enunciado: 'O índice oficial utilizado para aferir a inflação no Brasil e servir de referência à meta perseguida pela política monetária é o',
          alts: ['IPCA.', 'IGP-M.', 'INPC.', 'IPA.', 'INCC.'],
          correta: 0,
          expl: 'O IPCA, medido pelo IBGE, é o índice oficial do regime de metas de inflação. O INPC também é do IBGE, mas com recorte de renda mais baixa; IGP-M, IPA e INCC são calculados por outra instituição e têm finalidades distintas (contratos, atacado, construção civil).',
          tags: ['indicadores econômicos'],
        },
        {
          id: 'atu1-05', dif: 3, tipo: 'multipla',
          enunciado: 'A reforma tributária sobre o consumo aprovada por emenda à Constituição institui',
          alts: [
            'um modelo dual de imposto sobre valor agregado, com tributo federal e tributo compartilhado por Estados e Municípios, além de imposto seletivo.',
            'a unificação de todos os tributos brasileiros em um único imposto federal.',
            'a extinção do imposto de renda das pessoas físicas.',
            'a transferência integral da competência tributária aos Municípios.',
            'a substituição de todos os tributos por contribuições previdenciárias.',
          ],
          correta: 0,
          expl: 'O desenho aprovado é o **IVA dual**: uma contribuição federal sobre bens e serviços e um imposto sobre bens e serviços de competência compartilhada entre Estados, DF e Municípios, com Imposto Seletivo sobre produtos prejudiciais à saúde e ao meio ambiente e regras de transição.',
          tags: ['reforma tributária'],
        },
        {
          id: 'atu1-06', dif: 3, tipo: 'ce',
          base: 'A pauta de exportações brasileira é fortemente concentrada em produtos primários e commodities, fenômeno associado ao debate sobre reprimarização da economia.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. Soja, minério de ferro, petróleo e carnes concentram parcela expressiva das exportações. O debate acadêmico e político sobre desindustrialização e reprimarização decorre justamente dessa composição.',
          tags: ['estrutura econômica'],
        },
      ],
    },

    {
      id: 'atu-2',
      titulo: 'Temas contemporâneos',
      subtitulo: 'Clima, tecnologia, direitos e informação',
      topicos: ['Agenda climática', 'Transformação digital', 'Direitos humanos', 'Desinformação'],
      aula: {
        intro: 'Estes quatro eixos dominam as provas recentes. E, não por coincidência, dominam a pauta do Congresso.',
        blocos: [
          {
            t: 'Agenda climática e ambiental',
            lista: [
              '**Acordo de Paris** (2015): meta de limitar o aquecimento global bem abaixo de 2 °C, com esforços para 1,5 °C, em relação a níveis pré-industriais. Cada país apresenta sua **NDC** (Contribuição Nacionalmente Determinada), revisada periodicamente.',
              '**COP**: Conferência das Partes da Convenção-Quadro da ONU sobre Mudança do Clima (UNFCCC), instância de negociação anual.',
              '**Agenda 2030 e os 17 ODS**: Objetivos de Desenvolvimento Sustentável, adotados pela ONU em 2015, articulando dimensões social, econômica e ambiental.',
              'Temas nacionais recorrentes: desmatamento e monitoramento por satélite, mercado regulado de carbono, transição energética (matriz elétrica brasileira majoritariamente renovável), segurança hídrica, eventos climáticos extremos e adaptação urbana.',
            ],
          },
          {
            t: 'Transformação digital e Estado',
            p: [
              '**Governo digital**: digitalização de serviços, identidade digital, interoperabilidade de bases e dados abertos.',
              '**Inteligência artificial**: debate regulatório sobre risco, transparência algorítmica, responsabilização e uso no setor público. No Congresso, discute-se marco legal com abordagem baseada em risco.',
              '**Plataformas digitais**: debates sobre moderação de conteúdo, responsabilidade civil dos intermediários, remuneração de jornalismo e proteção de crianças e adolescentes.',
              '**Marco Civil da Internet** (Lei 12.965/2014): princípios de neutralidade de rede, privacidade, liberdade de expressão e regras de responsabilidade dos provedores.',
              '**LGPD** (Lei 13.709/2018): proteção de dados pessoais, com bases legais para tratamento, direitos do titular e autoridade nacional (ANPD). A proteção de dados foi elevada a **direito fundamental** pela EC 115/2022.',
            ],
          },
          {
            t: 'Direitos humanos e cidadania',
            p: [
              'Temas com forte presença em prova: enfrentamento ao racismo e políticas de ação afirmativa; violência de gênero e feminicídio; direitos das pessoas com deficiência (Estatuto e acessibilidade); povos indígenas e demarcação de terras; direitos da criança e do adolescente; população em situação de rua; migração e refúgio.',
              'Instrumentos internacionais relevantes: Declaração Universal dos Direitos Humanos (1948), Pacto Internacional dos Direitos Civis e Políticos, Convenção Americana (Pacto de San José) e a jurisdição da Corte Interamericana.',
            ],
          },
          {
            t: 'Desinformação e integridade da informação',
            p: [
              'Distinção conceitual cobrada: **misinformation** (informação falsa compartilhada sem intenção de enganar), **disinformation** (falsidade deliberada) e **malinformation** (informação verdadeira usada para causar dano).',
              'Riscos institucionais: erosão da confiança em eleições, saúde pública e ciência. Respostas discutidas: educação midiática, transparência de anúncios políticos, rastreabilidade de conteúdo, verificação independente e obrigações de diligência das plataformas.',
            ],
          },
        ],
        destaques: [
          { tipo: 'dica', rot: 'Como estudar isto', txt: 'Escolha <b>uma</b> fonte de notícias e leia 15 minutos por dia, sempre no mesmo horário. Anote em uma página só: tema, ator, número e consequência. É assim que atualidades vira ponto garantido.' },
          { tipo: 'perigo', rot: 'Paris: 2 ou 1,5?', txt: 'O Acordo de Paris fixa "<b>bem abaixo de 2 °C</b>", com esforços para limitar a <b>1,5 °C</b>. Alternativa que apresente 1,5 °C como meta única e obrigatória está imprecisa.' },
        ],
        resumo: [
          'Acordo de Paris: bem abaixo de 2 °C, esforços para 1,5 °C, com NDCs nacionais.',
          'Agenda 2030: 17 ODS.',
          'LGPD e Marco Civil estruturam o ambiente digital; proteção de dados é direito fundamental (EC 115/2022).',
          'Misinformation, disinformation e malinformation são conceitos distintos.',
        ],
      },
      questoes: [
        {
          id: 'atu2-01', dif: 2, tipo: 'multipla',
          enunciado: 'O Acordo de Paris, no âmbito da Convenção-Quadro das Nações Unidas sobre Mudança do Clima, estabelece como objetivo central',
          alts: [
            'limitar o aumento da temperatura média global a bem abaixo de 2 °C, com esforços para 1,5 °C, em relação aos níveis pré-industriais.',
            'zerar imediatamente todas as emissões de gases de efeito estufa dos países signatários.',
            'proibir a exploração de combustíveis fósseis a partir de 2030.',
            'criar um tribunal internacional do clima com poder sancionatório vinculante.',
            'transferir a competência sobre política ambiental dos Estados para a ONU.',
          ],
          correta: 0,
          expl: 'Essa é a formulação do art. 2º do Acordo. O instrumento é de natureza cooperativa, baseado em **NDCs** definidas nacionalmente, sem tribunal sancionador nem proibições diretas de exploração.',
          tags: ['clima'],
        },
        {
          id: 'atu2-02', dif: 3, tipo: 'multipla',
          enunciado: 'A Agenda 2030, adotada pela Organização das Nações Unidas, é composta por',
          alts: [
            '17 Objetivos de Desenvolvimento Sustentável, articulando dimensões social, econômica e ambiental.',
            '8 Objetivos de Desenvolvimento do Milênio, voltados exclusivamente à redução da pobreza.',
            '5 metas climáticas vinculantes para países desenvolvidos.',
            '30 diretrizes de política econômica para países emergentes.',
            '12 princípios de governança digital global.',
          ],
          correta: 0,
          expl: 'Os 17 ODS sucederam os 8 Objetivos de Desenvolvimento do Milênio (ODM, 2000-2015), ampliando o escopo e incluindo todos os países — não apenas os em desenvolvimento.',
          tags: ['ODS'],
        },
        {
          id: 'atu2-03', dif: 3, tipo: 'multipla',
          enunciado: 'A informação verdadeira divulgada com o propósito deliberado de causar dano a pessoa ou instituição é designada como',
          alts: ['malinformation.', 'misinformation.', 'disinformation.', 'fact-checking.', 'astroturfing.'],
          correta: 0,
          expl: '**Malinformation** = conteúdo verdadeiro usado para causar dano (por exemplo, vazamento seletivo). **Misinformation** = falsidade sem intenção de enganar. **Disinformation** = falsidade deliberada. A tríade é cobrada com frequência.',
          tags: ['desinformação'],
        },
        {
          id: 'atu2-04', dif: 3, tipo: 'ce',
          base: 'A proteção de dados pessoais, inclusive nos meios digitais, foi incluída entre os direitos e garantias fundamentais da Constituição Federal por emenda constitucional.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. A EC 115/2022 inseriu o inciso LXXIX no art. 5º e atribuiu à União a competência privativa para legislar sobre proteção e tratamento de dados pessoais, consolidando o arcabouço iniciado pela LGPD.',
          tags: ['LGPD', 'proteção de dados'],
        },
        {
          id: 'atu2-05', dif: 3, tipo: 'multipla',
          enunciado: 'O Marco Civil da Internet (Lei 12.965/2014) consagra, entre seus princípios,',
          alts: [
            'a neutralidade de rede, a proteção da privacidade e a liberdade de expressão.',
            'a responsabilidade objetiva dos provedores por todo conteúdo de terceiros.',
            'a obrigatoriedade de identificação civil prévia para acesso à internet.',
            'a vedação absoluta à guarda de registros de conexão.',
            'a competência exclusiva de órgãos administrativos para remover conteúdo.',
          ],
          correta: 0,
          expl: 'A neutralidade impede discriminação de tráfego por conteúdo ou origem. A responsabilidade dos provedores de aplicação, na sistemática da lei, é subsidiária e, em regra, condicionada a ordem judicial específica — não objetiva e automática.',
          tags: ['Marco Civil'],
        },
        {
          id: 'atu2-06', dif: 3, tipo: 'multipla',
          enunciado: 'A matriz elétrica brasileira caracteriza-se, em comparação com a média mundial, por',
          alts: [
            'elevada participação de fontes renováveis, com destaque para a hidroeletricidade.',
            'predominância absoluta de carvão mineral.',
            'dependência majoritária de energia nuclear.',
            'ausência de geração eólica e solar em escala comercial.',
            'exclusividade de geração térmica a gás natural.',
          ],
          correta: 0,
          expl: 'A hidroeletricidade é a base histórica, complementada por expansão significativa de eólica e solar. Termelétricas atuam sobretudo como complemento em períodos de baixa hidrologia — o que conecta o tema à discussão sobre segurança energética e tarifas.',
          tags: ['energia'],
        },
      ],
    },

    {
      id: 'atu-3',
      titulo: 'O Brasil no mundo',
      subtitulo: 'Política externa, organismos e integração regional',
      topicos: ['Princípios da política externa', 'ONU', 'Integração regional', 'Multilateralismo'],
      aula: {
        intro: 'Política externa cai porque é o ponto em que Constituição e atualidades se encontram. Você já viu o art. 4º — agora veja como ele funciona na prática.',
        blocos: [
          {
            t: 'Fundamentos constitucionais',
            p: [
              'O art. 4º da CF/88 fixa os princípios: independência nacional, prevalência dos direitos humanos, autodeterminação dos povos, não intervenção, igualdade entre os Estados, defesa da paz, solução pacífica dos conflitos, repúdio ao terrorismo e ao racismo, cooperação entre os povos e concessão de asilo político. O parágrafo único prevê a busca da **integração latino-americana**.',
              'Papel do Congresso: **resolver definitivamente sobre tratados** que acarretem encargos ou compromissos gravosos ao patrimônio nacional (art. 49, I) e aprovar previamente, pelo Senado, a escolha de **chefes de missão diplomática** de caráter permanente (art. 52, IV).',
              'O ciclo de um tratado: negociação e assinatura (Executivo) → aprovação por **decreto legislativo** (Congresso) → ratificação e depósito (Executivo) → promulgação por **decreto** presidencial.',
            ],
          },
          {
            t: 'Sistema ONU',
            lista: [
              '**Assembleia Geral**: todos os membros, um voto cada, competência ampla mas recomendatória.',
              '**Conselho de Segurança**: 15 membros, sendo 5 permanentes com poder de **veto** (China, EUA, França, Reino Unido e Rússia) e 10 rotativos. Suas resoluções podem ser vinculantes. O Brasil é um dos países que mais vezes ocupou assento não permanente e defende historicamente a **reforma** do Conselho.',
              'Demais órgãos principais: Conselho Econômico e Social, Secretariado, Corte Internacional de Justiça e Conselho de Tutela (inativo).',
              'Agências e organismos correlatos frequentemente citados: OMS, Unesco, OIT, FAO, PNUD, ACNUR, além de instituições de Bretton Woods (FMI e Banco Mundial) e da OMC.',
            ],
          },
          {
            t: 'Integração regional e coalizões',
            lista: [
              '**Mercosul** (1991, Tratado de Assunção): união aduaneira imperfeita, com tarifa externa comum, estrutura decisória intergovernamental e o **Parlamento do Mercosul (Parlasul)** — foro de representação parlamentar, tema de interesse direto para quem trabalha no Legislativo.',
              '**Unasul**, **CELAC** e **OEA**: arranjos de concertação política regional, com trajetórias distintas de adesão e esvaziamento.',
              '**BRICS**: coalizão de países emergentes voltada à coordenação econômica e à reforma da governança global, com o Novo Banco de Desenvolvimento; passou por processo de ampliação de membros.',
              '**G20**: principal foro de coordenação econômica global; o Brasil exerceu a presidência rotativa e sediou cúpula, pautando temas como taxação de grandes fortunas, combate à fome e reforma da governança.',
              '**OCDE**: o Brasil é candidato à adesão, com processo de alinhamento a padrões normativos em diversas áreas.',
            ],
          },
          {
            t: 'Diretrizes recorrentes da diplomacia brasileira',
            p: [
              '**Multilateralismo** e apreço ao direito internacional; **universalismo** (relacionar-se com todos, sem alinhamento automático); busca de **autonomia** decisória; ênfase em desenvolvimento, comércio agrícola e financiamento climático; protagonismo em temas ambientais em razão da Amazônia e da matriz energética.',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'Quem aprova tratado', txt: 'O Congresso <b>aprova</b> por decreto legislativo; o Presidente <b>ratifica</b> e depois <b>promulga</b> por decreto. Nenhuma etapa envolve sanção ou veto — tratado não é projeto de lei.' },
          { tipo: 'dica', rot: 'Conselho de Segurança', txt: '15 membros · 5 permanentes com veto · 10 rotativos com mandato de 2 anos. O Brasil defende a reforma e a ampliação de assentos permanentes.' },
        ],
        resumo: [
          'Art. 4º: dez princípios e integração latino-americana no parágrafo único.',
          'Tratado: assinatura, decreto legislativo, ratificação e decreto de promulgação.',
          'Conselho de Segurança: 15 membros, 5 permanentes com veto.',
          'Mercosul é união aduaneira imperfeita com Parlasul; BRICS e G20 são coalizões de concertação.',
        ],
      },
      questoes: [
        {
          id: 'atu3-01', dif: 3, tipo: 'multipla',
          enunciado: 'A aprovação, pelo Congresso Nacional, de tratado internacional assinado pelo Brasil materializa-se por meio de',
          alts: ['decreto legislativo.', 'lei ordinária sancionada pelo Presidente.', 'resolução do Senado Federal.', 'emenda constitucional.', 'decreto presidencial.'],
          correta: 0,
          expl: 'Art. 49, I, da CF: competência exclusiva do Congresso, exercida por **decreto legislativo**, sem sanção. A ratificação e a promulgação interna (por decreto presidencial) são etapas posteriores, a cargo do Executivo.',
          tags: ['tratados'],
        },
        {
          id: 'atu3-02', dif: 2, tipo: 'multipla',
          enunciado: 'O Conselho de Segurança das Nações Unidas é composto por',
          alts: [
            'quinze membros, cinco permanentes com poder de veto e dez não permanentes.',
            'todos os Estados-membros da ONU, com igualdade de voto.',
            'dez membros permanentes eleitos pela Assembleia Geral.',
            'vinte membros, com mandatos vitalícios.',
            'sete membros indicados pelo Secretário-Geral.',
          ],
          correta: 0,
          expl: 'Cinco permanentes (China, Estados Unidos, França, Reino Unido e Rússia) com poder de veto, e dez não permanentes eleitos para mandatos de dois anos. A composição igualitária de todos os Estados é característica da **Assembleia Geral**.',
          tags: ['ONU'],
        },
        {
          id: 'atu3-03', dif: 3, tipo: 'multipla',
          enunciado: 'O Mercosul, criado pelo Tratado de Assunção, caracteriza-se atualmente como',
          alts: [
            'união aduaneira imperfeita, com tarifa externa comum e estrutura decisória intergovernamental.',
            'união política federativa, com parlamento dotado de poder legislativo vinculante.',
            'zona de livre comércio plena, sem qualquer tarifa externa comum.',
            'união monetária, com moeda única em circulação.',
            'mercado comum plenamente realizado, com livre circulação de pessoas e capitais.',
          ],
          correta: 0,
          expl: 'A tarifa externa comum existe, mas com listas de exceções e assimetrias — daí "imperfeita". As decisões são intergovernamentais (não supranacionais), e o Parlasul é foro de representação, sem poder legislativo vinculante.',
          tags: ['Mercosul'],
        },
        {
          id: 'atu3-04', dif: 3, tipo: 'ce',
          base: 'A concessão de asilo político figura expressamente entre os princípios que regem as relações internacionais da República Federativa do Brasil.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. Art. 4º, X, da CF/88. É o único dos dez princípios que descreve uma prática concreta de acolhimento, e por isso aparece com frequência em questões que testam a memorização do rol.',
          tags: ['política externa'],
        },
        {
          id: 'atu3-05', dif: 3, tipo: 'multipla',
          enunciado: 'A tradição diplomática brasileira de relacionar-se com o maior número possível de parceiros, sem alinhamento automático a blocos de poder, é usualmente designada como',
          alts: ['universalismo.', 'isolacionismo.', 'unilateralismo.', 'protecionismo.', 'neutralidade armada.'],
          correta: 0,
          expl: 'Universalismo: diversificação de parcerias e recusa de alinhamento automático, associado à busca de autonomia decisória. Isolacionismo seria o oposto; unilateralismo contraria o apreço brasileiro ao multilateralismo.',
          tags: ['política externa'],
        },
        {
          id: 'atu3-06', dif: 3, tipo: 'multipla',
          enunciado: 'Compete privativamente ao Senado Federal, em matéria de política externa,',
          alts: [
            'aprovar previamente a escolha de chefes de missão diplomática de caráter permanente.',
            'resolver definitivamente sobre todos os tratados internacionais.',
            'autorizar o Presidente da República a declarar guerra.',
            'negociar e assinar acordos internacionais.',
            'ratificar tratados junto aos organismos internacionais.',
          ],
          correta: 0,
          expl: 'Art. 52, IV. A aprovação de tratados e a autorização para declarar guerra são competências **exclusivas do Congresso Nacional** (art. 49, I e II); negociar, assinar e ratificar são atos do **Executivo**.',
          tags: ['competências'],
        },
      ],
    },
  ],
};
