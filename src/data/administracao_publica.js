/* ============================================================
   ADMINISTRAÇÃO PÚBLICA — peso 3
   Princípios, modelos e reformas. A banca adora comparar o
   modelo burocrático com o gerencial.
   ============================================================ */

export default {
  id: 'administracao_publica',
  nome: 'Administração Pública',
  curto: 'Adm. Pública',
  abrev: 'APU',
  peso: 3,
  bloco: 'especificos',
  cor: '#b6c96f',
  ico: '🏢',
  fortaleza: false,
  descricao: 'Modelos de administração, reformas do Estado, governança, planejamento e gestão de pessoas no setor público.',

  niveis: [
    {
      id: 'apu-1',
      titulo: 'Modelos de administração pública',
      subtitulo: 'Patrimonialismo, burocracia e gerencialismo',
      topicos: ['Patrimonialismo', 'Modelo burocrático', 'Modelo gerencial', 'Novo serviço público'],
      aula: {
        intro: 'Três modelos, três lógicas. A banca cobra comparando — então estude em coluna dupla, nunca isolado.',
        blocos: [
          {
            t: 'Patrimonialismo',
            p: [
              'Não há distinção entre o **público** e o **privado**: o aparelho do Estado é extensão do poder do soberano. Cargos são distribuídos como favor pessoal (**prebendas** e **sinecuras**).',
              'Traços: nepotismo, clientelismo, corrupção estrutural, ausência de carreira e de critérios impessoais. No Brasil, é a referência histórica que a burocracia veio combater.',
            ],
          },
          {
            t: 'Modelo burocrático (racional-legal)',
            p: [
              'Surge para combater o patrimonialismo. Baseia-se em **impessoalidade, formalismo, hierarquia rígida, divisão do trabalho, competência técnica** e **mérito** no ingresso.',
              'O **controle é a priori** e recai sobre **processos** e procedimentos, não sobre resultados. A previsibilidade é a virtude central.',
              '**Disfunções** (Merton): apego excessivo às regras, excesso de formalismo e papelório, resistência a mudanças, despersonalização do atendimento, deslocamento dos objetivos (o meio se torna fim).',
              'No Brasil, marco: reforma de 1936, com a criação do **DASP** no governo Vargas.',
            ],
          },
          {
            t: 'Modelo gerencial (nova gestão pública)',
            p: [
              'Reação às disfunções burocráticas. Foco em **resultados**, **eficiência**, **descentralização**, **flexibilidade**, **competição administrada** e **cidadão como cliente**.',
              'O **controle é a posteriori** e recai sobre **resultados**, com metas, indicadores e contratos de gestão.',
              'No Brasil, marco: **Plano Diretor da Reforma do Aparelho do Estado (1995)**, conduzido pelo MARE sob Bresser-Pereira, e a **EC 19/1998**, que inseriu a eficiência entre os princípios do art. 37, criou o contrato de gestão e flexibilizou a estabilidade.',
              'O Plano Diretor classificou a atuação estatal em quatro setores: **núcleo estratégico**, **atividades exclusivas**, **serviços não exclusivos** e **produção de bens e serviços para o mercado**.',
            ],
          },
          {
            t: 'Novo Serviço Público (NSP)',
            p: [
              'Terceira via: critica tanto o formalismo burocrático quanto a lógica de mercado do gerencialismo. Trata o destinatário como **cidadão** (portador de direitos e deveres), não como cliente; valoriza o **interesse público construído coletivamente**, a participação e a democracia deliberativa.',
              'Palavras-chave: coprodução, accountability plural, valor público, governança em rede.',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'Controle: antes ou depois?', txt: 'Burocrático = controle <b>a priori</b>, sobre <b>processos</b>. Gerencial = controle <b>a posteriori</b>, sobre <b>resultados</b>. Essa é a comparação mais cobrada da matéria inteira.' },
          { tipo: 'dica', rot: 'Datas-chave do Brasil', txt: '<b>1936</b> — DASP, reforma burocrática. <b>1967</b> — Decreto-Lei 200, descentralização e primeiro ensaio gerencial. <b>1995</b> — Plano Diretor (Bresser). <b>1998</b> — EC 19.' },
        ],
        resumo: [
          'Patrimonialismo: não separa público de privado.',
          'Burocracia: impessoalidade, mérito, hierarquia, controle de processos.',
          'Gerencialismo: resultados, descentralização, contrato de gestão, cidadão-cliente.',
          'NSP: cidadão como portador de direitos, interesse público coletivamente construído.',
        ],
      },
      questoes: [
        {
          id: 'apu1-01', dif: 2, tipo: 'multipla',
          enunciado: 'Característica central do modelo burocrático de administração pública é',
          alts: [
            'o controle a priori dos processos e procedimentos.',
            'a avaliação por resultados, com metas e indicadores.',
            'a flexibilização dos vínculos de trabalho.',
            'a orientação ao cidadão como cliente.',
            'a celebração de contratos de gestão com autonomia ampliada.',
          ],
          correta: 0,
          expl: 'O modelo burocrático busca previsibilidade e controle prévio de procedimentos. As demais alternativas descrevem o modelo **gerencial**, que desloca o controle para os resultados.',
          tags: ['modelo burocrático'],
        },
        {
          id: 'apu1-02', dif: 3, tipo: 'multipla',
          enunciado: 'O Plano Diretor da Reforma do Aparelho do Estado (1995) classificou a atuação estatal em quatro setores, entre os quais',
          alts: [
            'núcleo estratégico, atividades exclusivas, serviços não exclusivos e produção de bens e serviços para o mercado.',
            'administração direta, indireta, fundacional e delegada.',
            'poder central, poder regional, poder local e poder comunitário.',
            'planejamento, execução, controle e avaliação.',
            'setor primário, secundário, terciário e quaternário.',
          ],
          correta: 0,
          expl: 'Essa taxonomia orientou as escolhas de propriedade e forma de gestão: núcleo estratégico e atividades exclusivas permanecem estatais; serviços não exclusivos migram para o setor público não estatal (organizações sociais); produção para o mercado tende à privatização.',
          tags: ['Plano Diretor'],
        },
        {
          id: 'apu1-03', dif: 3, tipo: 'ce',
          base: 'A EC 19/1998 inseriu a eficiência entre os princípios expressos da administração pública e introduziu o contrato de gestão como instrumento de ampliação de autonomia.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. A emenda é o principal marco normativo da reforma gerencial brasileira: além da eficiência (art. 37, caput) e do contrato de gestão (art. 37, §8º), flexibilizou a estabilidade e criou a avaliação periódica de desempenho.',
          tags: ['EC 19/1998'],
        },
        {
          id: 'apu1-04', dif: 3, tipo: 'multipla',
          enunciado: 'São disfunções do modelo burocrático, na análise de Robert Merton:',
          alts: [
            'apego excessivo às normas, excesso de formalismo e deslocamento dos objetivos.',
            'ausência de critérios meritocráticos e nepotismo estrutural.',
            'excesso de foco em resultados em detrimento da legalidade.',
            'terceirização indiscriminada de atividades exclusivas de Estado.',
            'ausência de hierarquia e de divisão do trabalho.',
          ],
          correta: 0,
          expl: 'As disfunções são efeitos colaterais dos próprios traços do modelo: a regra, criada como garantia, torna-se fim em si mesma. A alternativa (b) descreve o **patrimonialismo**, não a burocracia.',
          tags: ['disfunções burocráticas'],
        },
        {
          id: 'apu1-05', dif: 3, tipo: 'multipla',
          enunciado: 'A abordagem do Novo Serviço Público distingue-se do gerencialismo principalmente por',
          alts: [
            'tratar o destinatário da ação estatal como cidadão portador de direitos, e não como cliente ou consumidor.',
            'defender o retorno integral ao modelo burocrático weberiano.',
            'rejeitar qualquer forma de avaliação de desempenho.',
            'propor a eliminação do concurso público como forma de ingresso.',
            'concentrar todas as decisões no núcleo estratégico do governo.',
          ],
          correta: 0,
          expl: 'O NSP recoloca a cidadania e a construção coletiva do interesse público no centro, valorizando participação, coprodução e accountability plural — sem abandonar avaliação, mas rejeitando a lógica de mercado como paradigma único.',
          tags: ['Novo Serviço Público'],
        },
        {
          id: 'apu1-06', dif: 2, tipo: 'multipla',
          enunciado: 'A criação do DASP, em 1936, marcou no Brasil o início da',
          alts: [
            'reforma administrativa de caráter burocrático.',
            'reforma gerencial do aparelho do Estado.',
            'implantação do modelo patrimonialista.',
            'descentralização promovida pelo Decreto-Lei 200/1967.',
            'adoção das organizações sociais.',
          ],
          correta: 0,
          expl: 'O Departamento Administrativo do Serviço Público foi o instrumento da reforma burocrática: profissionalização, mérito, padronização de procedimentos e centralização. A reforma gerencial vem quase sessenta anos depois, em 1995.',
          tags: ['história administrativa'],
        },
      ],
    },

    {
      id: 'apu-2',
      titulo: 'Governança, governabilidade e accountability',
      subtitulo: 'Capacidade de governar e mecanismos de controle',
      topicos: ['Governança pública', 'Governabilidade', 'Accountability', 'Transparência'],
      aula: {
        intro: 'Governabilidade é ter poder para governar. Governança é ter capacidade de fazer acontecer. A banca adora a diferença.',
        blocos: [
          {
            t: 'Três conceitos que se confundem',
            lista: [
              '**Governabilidade**: condições **políticas** de exercício do poder — legitimidade, apoio parlamentar, sustentação social. É o "poder governar".',
              '**Governança**: capacidade **técnica, financeira e gerencial** de formular e implementar políticas. É o "conseguir fazer".',
              '**Accountability**: obrigação de prestar contas e responder pelos atos, com possibilidade de sanção.',
            ],
          },
          {
            t: 'Governança pública no Brasil',
            p: [
              'O **Decreto 9.203/2017** estabelece a política de governança da administração pública federal. Princípios: capacidade de resposta, integridade, confiabilidade, melhoria regulatória, prestação de contas e responsabilidade, e transparência.',
              'Mecanismos de governança: **liderança**, **estratégia** e **controle**.',
              'Instrumentos correlatos: gestão de riscos, programas de integridade, avaliação de políticas públicas e análise de impacto regulatório.',
            ],
          },
          {
            t: 'Controle na administração pública',
            lista: [
              'Quanto ao **órgão**: controle administrativo (interno, autotutela), legislativo (político e financeiro, com auxílio do Tribunal de Contas) e judicial (legalidade em sentido amplo, sempre por provocação).',
              'Quanto ao **momento**: prévio, concomitante e posterior.',
              'Quanto à **extensão**: de legalidade e de mérito. O controle **judicial** não alcança o mérito administrativo.',
              'Quanto à **iniciativa**: de ofício ou provocado (recurso, representação, denúncia).',
            ],
            p: [
              'O **TCU** julga as contas dos administradores e responsáveis por dinheiros públicos, aprecia (não julga) as contas do Presidente, realiza auditorias, aplica multas e sustação de contratos — mas **não** anula atos, nem julga as contas do Presidente da República, tarefa do Congresso Nacional.',
            ],
          },
          {
            t: 'Transparência e acesso à informação',
            p: [
              'A **Lei 12.527/2011 (LAI)** consagra a publicidade como regra e o sigilo como exceção. Classificações: **reservado** (5 anos), **secreto** (15 anos) e **ultrassecreto** (25 anos, renovável uma vez).',
              'A **transparência ativa** é a divulgação espontânea (portais, dados abertos); a **passiva** é a resposta a pedidos. O prazo para resposta é de **20 dias**, prorrogável por 10.',
              'Informações pessoais têm proteção específica; dados sobre condutas de agentes públicos no exercício da função, em regra, são públicos.',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'TCU e as contas do Presidente', txt: 'O TCU <b>aprecia</b> as contas do Presidente e emite parecer prévio. Quem <b>julga</b> é o <b>Congresso Nacional</b> (art. 49, IX). As contas dos demais administradores, o próprio TCU julga.' },
          { tipo: 'dica', rot: 'Prazos da LAI', txt: 'Reservado 5 · Secreto 15 · Ultrassecreto 25 (renovável uma vez). Resposta ao pedido: 20 dias + 10 de prorrogação justificada.' },
        ],
        resumo: [
          'Governabilidade = condições políticas; governança = capacidade de execução.',
          'Decreto 9.203/2017: mecanismos de liderança, estratégia e controle.',
          'Controle judicial não alcança o mérito administrativo.',
          'LAI: publicidade é regra; sigilo é exceção com prazos definidos.',
        ],
      },
      questoes: [
        {
          id: 'apu2-01', dif: 3, tipo: 'multipla',
          enunciado: 'A capacidade técnica, gerencial e financeira do Estado para formular e implementar políticas públicas é designada como',
          alts: ['governança.', 'governabilidade.', 'accountability.', 'legitimidade.', 'coordenação federativa.'],
          correta: 0,
          expl: 'Governança = capacidade de fazer. **Governabilidade** = condições políticas de sustentação do governo (apoio parlamentar, legitimidade, coalizões). **Accountability** = prestação de contas com responsabilização.',
          tags: ['governança'],
        },
        {
          id: 'apu2-02', dif: 3, tipo: 'multipla',
          enunciado: 'Compete ao Tribunal de Contas da União',
          alts: [
            'apreciar as contas prestadas anualmente pelo Presidente da República, mediante parecer prévio.',
            'julgar as contas prestadas anualmente pelo Presidente da República.',
            'anular os atos administrativos ilegais praticados pelo Poder Executivo.',
            'exercer controle de mérito sobre as políticas públicas federais.',
            'legislar sobre finanças públicas e responsabilidade fiscal.',
          ],
          correta: 0,
          expl: 'Art. 71, I, da CF: o TCU **aprecia** e emite parecer prévio em 60 dias; o **julgamento** cabe ao Congresso Nacional (art. 49, IX). O TCU julga as contas dos **demais** administradores (art. 71, II) e pode sustar atos e contratos, mas não os anula.',
          tags: ['controle externo'],
        },
        {
          id: 'apu2-03', dif: 3, tipo: 'ce',
          base: 'Na Lei de Acesso à Informação, a informação classificada como ultrassecreta tem prazo máximo de restrição de acesso de vinte e cinco anos, admitida uma única prorrogação.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. Ultrassecreto: 25 anos, renovável uma vez (art. 24 da Lei 12.527/2011). Secreto: 15 anos. Reservado: 5 anos. A regra geral, porém, é a publicidade — o sigilo é exceção e exige motivação.',
          tags: ['LAI'],
        },
        {
          id: 'apu2-04', dif: 3, tipo: 'multipla',
          enunciado: 'São mecanismos de governança pública previstos no Decreto 9.203/2017:',
          alts: [
            'liderança, estratégia e controle.',
            'planejamento, orçamento e execução.',
            'hierarquia, disciplina e supervisão.',
            'eficiência, eficácia e efetividade.',
            'centralização, coordenação e delegação.',
          ],
          correta: 0,
          expl: 'O decreto estrutura a governança em três mecanismos — liderança, estratégia e controle — desdobrados em práticas como gestão de riscos, integridade e avaliação de resultados. Eficiência, eficácia e efetividade são **dimensões de desempenho**, não mecanismos.',
          tags: ['governança'],
        },
        {
          id: 'apu2-05', dif: 3, tipo: 'multipla',
          enunciado: 'O controle judicial dos atos administrativos',
          alts: [
            'alcança a legalidade em sentido amplo, incluindo razoabilidade e proporcionalidade, mas não substitui o juízo de mérito do administrador.',
            'alcança livremente o mérito administrativo, por força do princípio da inafastabilidade da jurisdição.',
            'somente pode ser exercido de ofício pelo magistrado.',
            'é vedado em relação a atos discricionários, em qualquer aspecto.',
            'depende de prévia autorização do Tribunal de Contas competente.',
          ],
          correta: 0,
          expl: 'O Judiciário controla legalidade, competência, forma, finalidade, motivo e a compatibilidade com os princípios — inclusive razoabilidade. O que não pode é substituir a escolha de conveniência e oportunidade legitimamente feita pelo administrador.',
          tags: ['controle judicial'],
        },
        {
          id: 'apu2-06', dif: 2, tipo: 'multipla',
          enunciado: 'A divulgação espontânea de informações de interesse coletivo pelos órgãos públicos, independentemente de solicitação, denomina-se transparência',
          alts: ['ativa.', 'passiva.', 'reflexa.', 'setorial.', 'condicionada.'],
          correta: 0,
          expl: 'Transparência **ativa** = iniciativa do órgão (portais, dados abertos, relatórios). Transparência **passiva** = resposta a pedido do interessado, com prazo de 20 dias prorrogável por 10.',
          tags: ['transparência'],
        },
      ],
    },

    {
      id: 'apu-3',
      titulo: 'Planejamento e orçamento público',
      subtitulo: 'PPA, LDO, LOA e ciclo orçamentário',
      topicos: ['PPA', 'LDO', 'LOA', 'Ciclo orçamentário', 'Princípios orçamentários'],
      aula: {
        intro: 'Orçamento é lei — e é a lei em que o Congresso mais trabalha. Como analista, você viverá esse calendário.',
        blocos: [
          {
            t: 'Os três instrumentos (art. 165 da CF)',
            lista: [
              '**Plano Plurianual (PPA)**: vigência de **quatro anos**, do segundo ano de um mandato ao primeiro do seguinte. Estabelece diretrizes, objetivos e metas para despesas de capital e programas de duração continuada.',
              '**Lei de Diretrizes Orçamentárias (LDO)**: **anual**. Estabelece metas e prioridades, orienta a elaboração da LOA, dispõe sobre alterações tributárias e a política de aplicação das agências financeiras oficiais de fomento. A LRF acrescentou os anexos de metas fiscais e de riscos fiscais.',
              '**Lei Orçamentária Anual (LOA)**: **anual**. Compreende o orçamento fiscal, o de investimento das empresas estatais e o da seguridade social.',
            ],
            p: [
              'Todos são de **iniciativa privativa do Presidente da República** e apreciados pelo Congresso Nacional em **sessão conjunta**, na forma do regimento comum, com parecer da **Comissão Mista de Orçamento (CMO)**.',
              'A sessão legislativa **não será interrompida** sem a aprovação da LDO (art. 57, §2º).',
            ],
          },
          {
            t: 'Princípios orçamentários',
            lista: [
              '**Unidade/totalidade**: um único orçamento por ente.',
              '**Universalidade**: todas as receitas e despesas devem constar.',
              '**Anualidade/periodicidade**: vigência de um exercício financeiro (coincide com o ano civil).',
              '**Exclusividade**: a LOA não conterá dispositivo estranho à previsão de receita e fixação de despesa — ressalvadas autorização para créditos suplementares e operações de crédito por antecipação de receita.',
              '**Legalidade**, **publicidade**, **clareza**, **equilíbrio**, **não afetação da receita de impostos** (art. 167, IV) e **orçamento bruto**.',
            ],
          },
          {
            t: 'Emendas parlamentares e vedações',
            p: [
              'As emendas ao projeto de lei orçamentária só podem ser aprovadas se **compatíveis com o PPA e a LDO**, indicarem os **recursos necessários** (admitidos apenas os provenientes de anulação de despesa, excluídas as que incidam sobre dotações para pessoal, serviço da dívida e transferências constitucionais) ou se relacionarem a **correção de erros ou omissões** ou a **dispositivos do texto do projeto de lei** (art. 166, §3º).',
              'Vedações do art. 167: início de programas não incluídos na LOA; despesas que excedam os créditos; realização de operações de crédito que excedam as despesas de capital (**regra de ouro**); transposição, remanejamento ou transferência de recursos sem autorização legislativa; concessão de créditos ilimitados.',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'Vigência do PPA', txt: 'O PPA cobre <b>do segundo ano de um mandato ao primeiro do mandato seguinte</b>. É desenho intencional: garante continuidade e obriga o governo novo a executar, no primeiro ano, o plano herdado.' },
          { tipo: 'dica', rot: 'Exclusividade', txt: 'A LOA só trata de receita e despesa. Duas exceções expressas: autorização para <b>créditos suplementares</b> e para <b>operações de crédito por antecipação de receita</b>.' },
        ],
        resumo: [
          'PPA (4 anos), LDO (anual, orienta a LOA) e LOA (anual, três orçamentos).',
          'Iniciativa privativa do Presidente; apreciação em sessão conjunta com parecer da CMO.',
          'Sem aprovar a LDO, não há interrupção da sessão legislativa.',
          'Regra de ouro: operações de crédito não podem exceder as despesas de capital.',
        ],
      },
      questoes: [
        {
          id: 'apu3-01', dif: 2, tipo: 'multipla',
          enunciado: 'A Lei Orçamentária Anual compreende',
          alts: [
            'o orçamento fiscal, o orçamento de investimento das empresas estatais e o orçamento da seguridade social.',
            'apenas o orçamento fiscal dos Poderes da União.',
            'o plano plurianual e as diretrizes orçamentárias.',
            'o orçamento fiscal e o plano de metas do governo.',
            'os orçamentos da União, dos Estados e dos Municípios, de forma consolidada.',
          ],
          correta: 0,
          expl: 'Art. 165, §5º, da CF. São três peças integrantes de uma única lei. O PPA e a LDO são leis distintas, com funções de planejamento e orientação.',
          tags: ['LOA'],
        },
        {
          id: 'apu3-02', dif: 3, tipo: 'ce',
          base: 'A sessão legislativa não será interrompida sem a aprovação do projeto de lei de diretrizes orçamentárias.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. Art. 57, §2º, da CF. A regra impede que o recesso de julho ocorra sem a LDO aprovada — reconhecendo que sem diretrizes não se elabora a LOA no prazo.',
          tags: ['LDO'],
        },
        {
          id: 'apu3-03', dif: 3, tipo: 'multipla',
          enunciado: 'O princípio orçamentário da exclusividade estabelece que a lei orçamentária anual não conterá dispositivo estranho à previsão de receita e à fixação de despesa, ressalvadas',
          alts: [
            'a autorização para abertura de créditos suplementares e a contratação de operações de crédito por antecipação de receita.',
            'as emendas parlamentares individuais e de bancada.',
            'as transferências constitucionais a Estados e Municípios.',
            'as despesas com pessoal e encargos sociais.',
            'as renúncias de receita de natureza tributária.',
          ],
          correta: 0,
          expl: 'Art. 165, §8º, da CF. São as duas únicas exceções expressas. Emendas parlamentares e transferências constitucionais são matéria orçamentária própria, não exceções ao princípio.',
          tags: ['princípios orçamentários'],
        },
        {
          id: 'apu3-04', dif: 3, tipo: 'multipla',
          enunciado: 'O Plano Plurianual tem vigência de',
          alts: [
            'quatro anos, do segundo exercício de um mandato presidencial ao primeiro do mandato subsequente.',
            'quatro anos, coincidentes com o mandato presidencial.',
            'um exercício financeiro, prorrogável por igual período.',
            'dois anos, renovável mediante lei complementar.',
            'prazo indeterminado, até sua revogação expressa.',
          ],
          correta: 0,
          expl: 'A vigência desencontrada do mandato é intencional: o governo eleito executa, no primeiro ano, o PPA do antecessor, e elabora o seu para os quatro anos seguintes. Garante continuidade administrativa.',
          tags: ['PPA'],
        },
        {
          id: 'apu3-05', dif: 3, tipo: 'multipla',
          enunciado: 'A chamada "regra de ouro" das finanças públicas, prevista no art. 167, III, da CF, veda',
          alts: [
            'a realização de operações de crédito que excedam o montante das despesas de capital.',
            'a criação de despesa obrigatória de caráter continuado sem fonte de custeio.',
            'a vinculação da receita de impostos a órgão, fundo ou despesa.',
            'a transposição de recursos entre categorias de programação sem autorização legislativa.',
            'a concessão de créditos ilimitados.',
          ],
          correta: 0,
          expl: 'Regra de ouro: o endividamento não pode financiar despesa corrente. Admite-se exceção mediante créditos suplementares ou especiais com finalidade precisa, aprovados por **maioria absoluta** do Legislativo. As demais alternativas correspondem a outros incisos do art. 167.',
          tags: ['regra de ouro'],
        },
        {
          id: 'apu3-06', dif: 3, tipo: 'ce',
          base: 'As emendas ao projeto de lei orçamentária anual somente podem ser aprovadas se compatíveis com o plano plurianual e com a lei de diretrizes orçamentárias.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. Art. 166, §3º, I, da CF. Além da compatibilidade, exige-se a indicação dos recursos (por anulação de despesa, com as ressalvas legais) ou que a emenda trate de correção de erros/omissões ou do texto do projeto.',
          tags: ['emendas orçamentárias'],
        },
      ],
    },

    {
      id: 'apu-4',
      titulo: 'Gestão de pessoas e desempenho no setor público',
      subtitulo: 'Competências, avaliação e eficiência',
      topicos: ['Gestão por competências', 'Avaliação de desempenho', 'Eficiência, eficácia e efetividade', 'Cultura organizacional'],
      aula: {
        intro: 'Último nível: como o Estado organiza gente. Cai menos, mas cai — e são pontos rápidos.',
        blocos: [
          {
            t: 'Eficiência, eficácia e efetividade',
            lista: [
              '**Eficiência**: relação entre resultados e recursos — fazer bem com o mínimo de meios. Foco no **processo**.',
              '**Eficácia**: grau de alcance das **metas** propostas. Foco no **produto**.',
              '**Efetividade**: impacto real na realidade social, transformação produzida. Foco no **resultado final**.',
              'Alguns autores acrescentam **economicidade** (obter insumos ao menor custo) e **equidade** (distribuição justa dos benefícios).',
            ],
          },
          {
            t: 'Gestão por competências',
            p: [
              'Competência é a combinação de **conhecimentos (saber), habilidades (saber fazer)** e **atitudes (querer fazer)** — o modelo **CHA**.',
              'O ciclo: mapeamento das competências necessárias → diagnóstico das existentes → identificação da **lacuna (gap)** → ações de captação e desenvolvimento → avaliação.',
              'No serviço público federal, a **política nacional de desenvolvimento de pessoas** organiza a capacitação em plano anual, alinhando treinamento às competências e aos resultados institucionais.',
            ],
          },
          {
            t: 'Avaliação de desempenho',
            lista: [
              '**Avaliação 360 graus**: múltiplas fontes (chefia, pares, subordinados, autoavaliação e, quando cabível, usuários).',
              'Erros clássicos: **efeito halo** (uma característica contamina toda a avaliação), **tendência central** (todos na média), **complacência ou rigor excessivos**, **recentidade** (peso indevido aos fatos recentes) e **estereotipagem**.',
              'Na administração pública, a avaliação tem consequências jurídicas: influi na **estabilidade** (avaliação especial de desempenho, art. 41, §4º) e pode levar à **perda do cargo** do servidor estável mediante procedimento de avaliação periódica assegurada a ampla defesa (art. 41, III).',
            ],
          },
          {
            t: 'Cultura e clima organizacional',
            p: [
              '**Cultura** é o conjunto de pressupostos, valores e artefatos compartilhados — profunda, estável e difícil de mudar. **Clima** é a percepção momentânea dos servidores sobre o ambiente de trabalho — superficial e volátil.',
              'Na tipologia de Schein, a cultura tem três níveis: **artefatos** (visíveis), **valores compartilhados** (justificativas declaradas) e **pressupostos básicos** (inconscientes, o núcleo real).',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'Os três "e"', txt: '<b>Eficiência</b> = meios. <b>Eficácia</b> = metas. <b>Efetividade</b> = impacto. Um programa pode ser eficaz (cumpriu a meta) e não efetivo (não mudou a realidade).' },
          { tipo: 'dica', rot: 'Cultura x clima', txt: 'Cultura é o <b>solo</b>: profundo, lento. Clima é o <b>tempo</b>: muda com a semana. Questão que fala em "percepção momentânea" está falando de clima.' },
        ],
        resumo: [
          'Eficiência (recursos), eficácia (metas), efetividade (impacto).',
          'Competência = conhecimentos + habilidades + atitudes (CHA).',
          'Avaliação 360 graus; cuidado com efeito halo e tendência central.',
          'Cultura é profunda e estável; clima é percepção momentânea.',
        ],
      },
      questoes: [
        {
          id: 'apu4-01', dif: 2, tipo: 'multipla',
          enunciado: 'O grau de alcance das metas previamente estabelecidas por um programa governamental refere-se à sua',
          alts: ['eficácia.', 'eficiência.', 'efetividade.', 'economicidade.', 'equidade.'],
          correta: 0,
          expl: 'Eficácia = cumprimento das metas. **Eficiência** compara resultados e recursos consumidos. **Efetividade** mede o impacto real na sociedade, que pode não ocorrer mesmo com metas cumpridas.',
          tags: ['desempenho'],
        },
        {
          id: 'apu4-02', dif: 3, tipo: 'multipla',
          enunciado: 'No modelo de gestão por competências, a sigla CHA designa',
          alts: [
            'conhecimentos, habilidades e atitudes.',
            'capacidade, hierarquia e autonomia.',
            'competência, hierarquia e avaliação.',
            'conhecimento, harmonização e aprendizagem.',
            'clareza, honestidade e assiduidade.',
          ],
          correta: 0,
          expl: 'Conhecimento é o saber; habilidade, o saber fazer; atitude, o querer fazer. A gestão por competências mapeia as competências desejadas, diagnostica as existentes e trabalha o **gap** entre elas.',
          tags: ['gestão por competências'],
        },
        {
          id: 'apu4-03', dif: 3, tipo: 'multipla',
          enunciado: 'O erro de avaliação de desempenho em que uma característica marcante do avaliado influencia a apreciação de todos os demais fatores denomina-se',
          alts: ['efeito halo.', 'tendência central.', 'recentidade.', 'complacência.', 'estereotipagem.'],
          correta: 0,
          expl: 'Efeito halo (ou de generalização). **Tendência central** é concentrar todas as notas na média; **recentidade** é supervalorizar fatos recentes; **complacência** é avaliar todos como bons; **estereotipagem** é julgar pelo grupo de pertencimento.',
          tags: ['avaliação de desempenho'],
        },
        {
          id: 'apu4-04', dif: 3, tipo: 'ce',
          base: 'A cultura organizacional caracteriza-se pela percepção momentânea e mutável que os servidores têm do ambiente de trabalho.',
          enunciado: 'Julgue a afirmação.',
          correta: 1,
          expl: 'ERRADO. Essa é a definição de **clima** organizacional. A **cultura** é o conjunto de pressupostos, valores e artefatos compartilhados: profunda, historicamente construída e resistente à mudança.',
          tags: ['cultura organizacional'],
        },
        {
          id: 'apu4-05', dif: 3, tipo: 'multipla',
          enunciado: 'Segundo Edgar Schein, os três níveis da cultura organizacional são',
          alts: [
            'artefatos, valores compartilhados e pressupostos básicos.',
            'missão, visão e valores.',
            'estrutura, processos e pessoas.',
            'clima, motivação e liderança.',
            'normas, sanções e recompensas.',
          ],
          correta: 0,
          expl: 'Artefatos são a camada visível (layout, rituais, linguagem); valores compartilhados são as justificativas declaradas; pressupostos básicos são as crenças inconscientes que efetivamente orientam o comportamento — o nível mais difícil de mudar.',
          tags: ['Schein'],
        },
        {
          id: 'apu4-06', dif: 3, tipo: 'multipla',
          enunciado: 'A avaliação de desempenho que reúne informações de chefia, pares, subordinados e autoavaliação é conhecida como',
          alts: ['avaliação 360 graus.', 'avaliação por escalas gráficas.', 'avaliação por incidentes críticos.', 'avaliação por objetivos.', 'avaliação comparativa forçada.'],
          correta: 0,
          expl: 'A 360 graus busca reduzir a subjetividade pela multiplicidade de fontes. Escalas gráficas, incidentes críticos, APO e distribuição forçada são outros métodos, com fonte única ou critérios diversos.',
          tags: ['avaliação de desempenho'],
        },
      ],
    },
  ],
};
