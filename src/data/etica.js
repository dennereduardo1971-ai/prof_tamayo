/* ============================================================
   ÉTICA NO SERVIÇO PÚBLICO — peso 2
   Poucas questões, alto índice de acerto. Ponto barato:
   não se perde nenhum.
   ============================================================ */

export default {
  id: 'etica',
  nome: 'Ética no Serviço Público',
  curto: 'Ética',
  abrev: 'ETI',
  peso: 2,
  bloco: 'basicos',
  cor: '#c9a86f',
  ico: '⚜️',
  fortaleza: false,
  descricao: 'Código de Ética do servidor federal, improbidade administrativa, conflito de interesses e regime disciplinar.',

  niveis: [
    {
      id: 'eti-1',
      titulo: 'Ética, moral e o Código de Ética do servidor',
      subtitulo: 'Decreto 1.171/1994',
      topicos: ['Ética e moral', 'Deveres do servidor', 'Vedações', 'Comissão de Ética'],
      aula: {
        intro: 'Esta matéria é de leitura literal. Quem lê o Decreto 1.171 duas vezes acerta tudo — e quem não lê inventa a resposta.',
        blocos: [
          {
            t: 'Três conceitos que a banca separa',
            lista: [
              '**Moral**: conjunto de valores e costumes vigentes em determinado grupo social. É concreta e histórica.',
              '**Ética**: reflexão crítica sobre a moral — investiga o fundamento do dever.',
              '**Deontologia**: ética aplicada ao exercício profissional; é o campo dos códigos de conduta.',
            ],
          },
          {
            t: 'Regras deontológicas centrais',
            p: [
              'A **dignidade, o decoro, o zelo, a eficácia e a consciência dos princípios morais** são primados maiores que devem nortear o servidor, seja no exercício do cargo, seja **fora dele**.',
              'O servidor não pode desprezar o elemento ético de sua conduta: deve decidir não apenas entre o legal e o ilegal, mas **entre o honesto e o desonesto**.',
              'A **cortesia**, a boa vontade e o cuidado no atendimento são deveres, e o trato mal-educado com o público é considerado **dano moral** aos usuários.',
              'A **publicidade** de todo ato administrativo constitui requisito de eficácia e moralidade; sua ausência enseja **improbidade**. O **sigilo** é exceção, admitido apenas quando a lei o exige em razão da segurança da sociedade e do Estado.',
              '**Ausentar-se sem motivo** ou retardar a prestação de contas é considerado **ato de desumanidade** em relação a quem espera o serviço.',
            ],
          },
          {
            t: 'Deveres (art. 2º, XIV) — os que mais caem',
            lista: [
              'Ser probo, reto, leal e justo, escolhendo sempre a melhor e mais vantajosa opção para o bem comum.',
              'Exercer suas atribuições com **rapidez, perfeição e rendimento**.',
              'Tratar cuidadosamente os usuários, aperfeiçoando o processo de comunicação.',
              'Ter **consciência de que seu trabalho é regido por princípios éticos** que se materializam na adequada prestação dos serviços.',
              '**Comunicar imediatamente** aos superiores todo ato ou fato contrário ao interesse público.',
              'Manter-se **atualizado** com as instruções e a legislação; **participar** dos movimentos de defesa da cidadania e da dignidade da pessoa humana.',
              'Facilitar a fiscalização de todos os atos ou serviços por quem de direito.',
              'Ser assíduo e frequente, pois a **ausência injustificada** causa dano ao trabalho organizado.',
            ],
          },
          {
            t: 'Vedações (art. 2º, XV)',
            lista: [
              'Usar o cargo para **obter qualquer favorecimento** para si ou para outrem.',
              'Prejudicar deliberadamente a reputação de colegas ou de cidadãos.',
              'Ser conivente com erro ou infração a este código ou ao Código de Ética de sua profissão.',
              'Usar de artifícios para **procrastinar** o exercício regular de direito por qualquer pessoa.',
              'Deixar a pessoa à espera de solução que compete ao setor — atitude contrária à moral administrativa.',
              '**Retirar da repartição**, sem autorização, qualquer documento, livro ou bem.',
              'Fazer uso de informações privilegiadas obtidas no âmbito interno em proveito próprio ou de terceiros.',
              'Apresentar-se **embriagado** no serviço ou fora dele habitualmente.',
              'Dar o seu concurso a instituição que atente contra a moral, a honestidade ou a dignidade da pessoa humana.',
              'Exercer atividade profissional aética ou ligar o seu nome a empreendimentos de conteúdo duvidoso.',
            ],
          },
          {
            t: 'Comissão de Ética',
            p: [
              'Em todos os órgãos e entidades da Administração Pública Federal direta, indireta, autárquica e fundacional deve haver **Comissão de Ética**, encarregada de orientar e aconselhar sobre a conduta do servidor, inclusive no trato com o público e no relacionamento entre superiores e subordinados.',
              'A pena aplicável pela Comissão é a de **censura**, e sua fundamentação constará do respectivo parecer, assinado por todos os membros, com ciência do faltoso.',
              'A Comissão de Ética Pública (CEP) e as comissões setoriais integram o **Sistema de Gestão da Ética do Poder Executivo Federal** (Decreto 6.029/2007).',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'A pena é uma só', txt: 'A única penalidade que a <b>Comissão de Ética</b> aplica, nos termos do Decreto 1.171/94, é a <b>censura</b>. Advertência, suspensão e demissão pertencem ao regime disciplinar da Lei 8.112/90.' },
          { tipo: 'dica', rot: 'A frase-chave', txt: 'O código exige a escolha "entre o honesto e o desonesto", não apenas entre o legal e o ilegal. Alternativa que reduz a ética à legalidade está errada.' },
        ],
        resumo: [
          'Moral é o costume; ética é a reflexão; deontologia é a ética profissional.',
          'Publicidade é requisito de eficácia e moralidade; sigilo é exceção legal.',
          'Vedações incluem uso de informação privilegiada e retirada de bens sem autorização.',
          'Comissão de Ética aplica apenas censura.',
        ],
      },
      questoes: [
        {
          id: 'eti1-01', dif: 2, tipo: 'multipla',
          enunciado: 'Segundo o Decreto 1.171/1994, a única penalidade aplicável pela Comissão de Ética é a de',
          alts: ['censura.', 'advertência.', 'suspensão por até trinta dias.', 'demissão.', 'multa pecuniária.'],
          correta: 0,
          expl: 'A censura é a única pena prevista no código, com fundamentação em parecer assinado por todos os membros e ciência do faltoso. As demais penalidades pertencem ao regime disciplinar estatutário (Lei 8.112/90).',
          tags: ['Comissão de Ética'],
        },
        {
          id: 'eti1-02', dif: 3, tipo: 'ce',
          base: 'A publicidade de qualquer ato administrativo constitui requisito de eficácia e moralidade, ensejando sua omissão comprometimento ético contra o bem comum.',
          enunciado: 'Julgue a afirmação conforme o Código de Ética Profissional do Servidor Público Civil do Poder Executivo Federal.',
          correta: 0,
          expl: 'CERTO. É a redação do inciso VII do art. 2º. O sigilo só se admite nos casos previstos em lei, em razão da segurança da sociedade e do Estado — não por conveniência do administrador.',
          tags: ['publicidade'],
        },
        {
          id: 'eti1-03', dif: 3, tipo: 'multipla',
          enunciado: 'Constitui vedação expressa ao servidor público, nos termos do Decreto 1.171/1994:',
          alts: [
            'fazer uso de informações privilegiadas obtidas no âmbito interno de seu serviço, em benefício próprio ou de terceiros.',
            'participar de movimentos de defesa da cidadania e da dignidade da pessoa humana.',
            'comunicar aos superiores fatos contrários ao interesse público.',
            'facilitar a fiscalização de seus atos por quem de direito.',
            'manter-se atualizado quanto às instruções e à legislação aplicável.',
          ],
          correta: 0,
          expl: 'As alternativas (b) a (e) descrevem **deveres**, não vedações. O uso de informação privilegiada é vedação clássica e dialoga diretamente com a Lei de Conflito de Interesses (12.813/2013).',
          tags: ['vedações'],
        },
        {
          id: 'eti1-04', dif: 3, tipo: 'multipla',
          enunciado: 'A reflexão crítica sobre os valores e costumes vigentes em determinado grupo social é objeto da',
          alts: ['ética.', 'moral.', 'legalidade estrita.', 'disciplina hierárquica.', 'eficiência administrativa.'],
          correta: 0,
          expl: 'A moral é o conjunto de valores praticados; a ética é a reflexão filosófica sobre esses valores. Quando aplicada ao exercício profissional, recebe o nome de deontologia.',
          tags: ['ética e moral'],
        },
        {
          id: 'eti1-05', dif: 3, tipo: 'ce',
          base: 'Deixar o cidadão à espera de solução que compete ao setor em que o servidor exerça suas funções configura atitude contrária à ética, ainda que não haja prejuízo material comprovado.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. O código considera tal conduta contrária à moral administrativa e trata o mau atendimento como **dano moral** ao usuário — independentemente de prejuízo patrimonial.',
          tags: ['deveres'],
        },
        {
          id: 'eti1-06', dif: 3, tipo: 'multipla',
          enunciado: 'De acordo com o Código de Ética, o servidor deve decidir, no exercício de suas funções,',
          alts: [
            'entre o honesto e o desonesto, e não apenas entre o legal e o ilegal.',
            'exclusivamente com base na legalidade estrita do ato.',
            'segundo a orientação do superior hierárquico, ainda que ilegal.',
            'conforme a conveniência do órgão, ainda que em prejuízo do usuário.',
            'de acordo com a moral dominante em seu grupo social de origem.',
          ],
          correta: 0,
          expl: 'É a formulação literal do inciso II do art. 2º: a decisão do servidor não se esgota na legalidade — deve acrescentar o juízo ético entre o honesto e o desonesto, o conveniente e o inconveniente, o oportuno e o inoportuno.',
          tags: ['deontologia'],
        },
      ],
    },

    {
      id: 'eti-2',
      titulo: 'Improbidade administrativa e conflito de interesses',
      subtitulo: 'Lei 8.429/1992 (com a Lei 14.230/2021) e Lei 12.813/2013',
      topicos: ['Atos de improbidade', 'Sanções', 'Dolo', 'Conflito de interesses'],
      aula: {
        intro: 'A reforma de 2021 mudou pontos decisivos da Lei de Improbidade. Se você estudou por material antigo, atualize agora.',
        blocos: [
          {
            t: 'As três espécies de ato de improbidade',
            lista: [
              '**Enriquecimento ilícito (art. 9º)**: auferir vantagem patrimonial indevida em razão do cargo. Sanções mais severas.',
              '**Prejuízo ao erário (art. 10)**: ação ou omissão dolosa que enseje perda patrimonial, desvio, apropriação ou dilapidação.',
              '**Atentado contra os princípios da administração (art. 11)**: rol agora **taxativo** após a Lei 14.230/2021 — não mais exemplificativo.',
            ],
            p: [
              'Mudança central da Lei 14.230/2021: **exige-se dolo** em todas as modalidades. A modalidade **culposa** de prejuízo ao erário foi **suprimida**. Mera irregularidade ou erro de interpretação não configura improbidade.',
            ],
          },
          {
            t: 'Sanções (art. 12) e prescrição',
            p: [
              'As sanções incluem perda dos bens acrescidos ilicitamente, perda da função pública, suspensão dos direitos políticos, pagamento de multa civil, proibição de contratar com o poder público e ressarcimento integral do dano. São aplicadas conforme a gravidade e podem ser cumuladas.',
              'A ação é **civil**, promovida pelo **Ministério Público** — a legitimidade da pessoa jurídica interessada foi retirada pela reforma. A prescrição é de **8 anos**, contados da ocorrência do fato ou, nos casos de conduta permanente, da cessação.',
              'A **ação de ressarcimento** por ato doloso de improbidade é **imprescritível** (art. 37, §5º, da CF, conforme o STF no RE 852.475).',
            ],
          },
          {
            t: 'Conflito de interesses (Lei 12.813/2013)',
            p: [
              'Conflito de interesses é a situação gerada pelo confronto entre interesses públicos e privados que possa **comprometer o interesse coletivo** ou influenciar, de maneira imprópria, o desempenho da função.',
              'Configura conflito, entre outros: divulgar ou usar **informação privilegiada** em proveito próprio ou de terceiro; exercer atividade incompatível com o cargo; atuar em favor de interesse de pessoa jurídica de que participe; receber presente de quem tenha interesse em decisão do agente; prestar serviços a empresa cuja atividade seja controlada ou fiscalizada pelo órgão.',
              '**Quarentena**: o agente ocupante de cargo elevado fica impedido, por **seis meses** após a exoneração, de prestar serviços a pessoa física ou jurídica com quem tenha estabelecido relação relevante em razão do cargo. Nesse período, faz jus a remuneração compensatória.',
              'A ocorrência de conflito de interesses **independe** do efetivo recebimento de vantagem: basta a situação objetiva de risco.',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'Não existe mais improbidade culposa', txt: 'A Lei 14.230/2021 exigiu <b>dolo</b> em todas as modalidades e eliminou a forma culposa do art. 10. Questão que afirme a existência de improbidade culposa está desatualizada.' },
          { tipo: 'dica', rot: 'Prescrição x ressarcimento', txt: 'A <b>ação de improbidade</b> prescreve em 8 anos. A <b>pretensão de ressarcimento</b> por ato doloso é <b>imprescritível</b>. São dois prazos distintos numa mesma questão.' },
        ],
        resumo: [
          'Três espécies: enriquecimento ilícito, prejuízo ao erário e atentado a princípios (rol taxativo).',
          'Exige-se dolo; não há mais modalidade culposa.',
          'Legitimidade ativa: Ministério Público. Prescrição: 8 anos.',
          'Conflito de interesses independe de recebimento de vantagem; quarentena de 6 meses.',
        ],
      },
      questoes: [
        {
          id: 'eti2-01', dif: 3, tipo: 'multipla',
          enunciado: 'Após as alterações promovidas pela Lei 14.230/2021 na Lei de Improbidade Administrativa,',
          alts: [
            'passou-se a exigir dolo para a configuração de todas as modalidades de ato de improbidade.',
            'manteve-se a modalidade culposa de ato que causa prejuízo ao erário.',
            'o rol de atos que atentam contra os princípios da administração tornou-se exemplificativo.',
            'a ação de improbidade passou a ter natureza penal.',
            'a legitimidade para propor a ação passou a ser exclusiva da pessoa jurídica interessada.',
          ],
          correta: 0,
          expl: 'A reforma exigiu dolo, suprimiu a forma culposa do art. 10, tornou **taxativo** o rol do art. 11 e concentrou a legitimidade ativa no **Ministério Público**. A ação permanece de natureza civil.',
          tags: ['improbidade'],
        },
        {
          id: 'eti2-02', dif: 3, tipo: 'multipla',
          enunciado: 'Auferir vantagem patrimonial indevida em razão do exercício de cargo público configura ato de improbidade que importa',
          alts: [
            'enriquecimento ilícito.',
            'prejuízo ao erário, exclusivamente.',
            'atentado contra os princípios da administração pública.',
            'infração meramente disciplinar.',
            'crime de responsabilidade.',
          ],
          correta: 0,
          expl: 'É a hipótese do art. 9º, sujeita às sanções mais graves do art. 12, I. Note que o enriquecimento ilícito pode coexistir com prejuízo ao erário, mas a tipificação principal é a do art. 9º.',
          tags: ['enriquecimento ilícito'],
        },
        {
          id: 'eti2-03', dif: 3, tipo: 'ce',
          base: 'A pretensão de ressarcimento ao erário fundada em ato doloso de improbidade administrativa é imprescritível.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. O STF fixou essa tese no RE 852.475 (Tema 897), com base no art. 37, §5º, da CF. A ação de improbidade em si, contudo, prescreve em oito anos.',
          tags: ['prescrição'],
        },
        {
          id: 'eti2-04', dif: 3, tipo: 'multipla',
          enunciado: 'Nos termos da Lei 12.813/2013, o período de impedimento (quarentena) aplicável ao agente público após a exoneração do cargo é de',
          alts: ['seis meses.', 'trinta dias.', 'um ano.', 'dois anos.', 'quatro anos.'],
          correta: 0,
          expl: 'Seis meses contados da exoneração, período em que o agente não pode prestar serviços a quem tenha relação relevante estabelecida em razão do cargo — com direito a remuneração compensatória.',
          tags: ['conflito de interesses'],
        },
        {
          id: 'eti2-05', dif: 3, tipo: 'ce',
          base: 'A configuração de conflito de interesses depende da comprovação de que o agente público efetivamente recebeu vantagem econômica.',
          enunciado: 'Julgue a afirmação.',
          correta: 1,
          expl: 'ERRADO. A Lei 12.813/2013 é expressa: a ocorrência de conflito de interesses **independe** do recebimento de qualquer ganho ou retribuição. Basta a situação objetiva capaz de comprometer o interesse coletivo.',
          tags: ['conflito de interesses'],
        },
        {
          id: 'eti2-06', dif: 3, tipo: 'multipla',
          enunciado: 'São sanções previstas para os atos de improbidade administrativa:',
          alts: [
            'perda da função pública, suspensão dos direitos políticos, multa civil e proibição de contratar com o poder público.',
            'prisão simples, multa penal e interdição temporária de direitos.',
            'advertência, suspensão e demissão a bem do serviço público.',
            'cassação de direitos políticos e perda da nacionalidade.',
            'inabilitação para o exercício de cargo eletivo por dez anos, exclusivamente.',
          ],
          correta: 0,
          expl: 'Art. 12 da Lei 8.429/92. A alternativa (b) traz sanções penais; a (c), disciplinares; a (d) menciona **cassação** de direitos políticos, vedada pela Constituição — só existem perda e suspensão.',
          tags: ['sanções'],
        },
      ],
    },

    {
      id: 'eti-3',
      titulo: 'Regime disciplinar do servidor federal',
      subtitulo: 'Lei 8.112/1990: deveres, proibições e responsabilidades',
      topicos: ['Deveres', 'Proibições', 'Penalidades', 'Processo disciplinar'],
      aula: {
        intro: 'Fechamos com a lei que vai reger a sua vida funcional. Leia com o olho de quem vai ser servidora, não de quem só quer passar.',
        blocos: [
          {
            t: 'Deveres (art. 116)',
            lista: [
              'Exercer com zelo e dedicação as atribuições do cargo; ser leal às instituições a que servir.',
              'Observar as normas legais e regulamentares; **cumprir as ordens superiores, exceto quando manifestamente ilegais**.',
              'Atender com presteza ao público, à expedição de certidões e às requisições para defesa da Fazenda Pública.',
              'Levar ao conhecimento da autoridade superior as irregularidades de que tiver ciência em razão do cargo.',
              'Zelar pela economia do material e pela conservação do patrimônio público.',
              'Guardar sigilo sobre assunto da repartição; manter conduta compatível com a moralidade administrativa.',
              'Ser assíduo e pontual; tratar com urbanidade as pessoas; representar contra ilegalidade, omissão ou abuso de poder.',
            ],
          },
          {
            t: 'Proibições (art. 117) — as mais cobradas',
            lista: [
              'Ausentar-se do serviço durante o expediente sem autorização.',
              'Retirar documento ou objeto da repartição sem prévia anuência da autoridade competente.',
              'Recusar fé a documentos públicos; opor resistência injustificada ao andamento de documento ou processo.',
              '**Valer-se do cargo** para lograr proveito pessoal ou de outrem em detrimento da dignidade da função.',
              'Participar de gerência ou administração de sociedade privada, personificada ou não personificada, e exercer o comércio, **exceto na qualidade de acionista, cotista ou comanditário**.',
              'Atuar como procurador ou intermediário junto a repartições públicas, salvo quando se tratar de benefícios previdenciários ou assistenciais de parentes até o segundo grau e de cônjuge.',
              'Receber propina, comissão, presente ou vantagem de qualquer espécie em razão de suas atribuições.',
              'Praticar usura sob qualquer de suas formas; proceder de forma desidiosa; utilizar pessoal ou recursos materiais da repartição em serviços ou atividades particulares.',
              'Cometer a outro servidor atribuições estranhas ao cargo que ocupa, exceto em situações de emergência e transitórias.',
            ],
          },
          {
            t: 'Penalidades (art. 127 e seguintes)',
            lista: [
              '**Advertência**: por escrito, para violação de proibição de menor gravidade e inobservância de dever funcional. Prescreve em **180 dias**.',
              '**Suspensão**: até **90 dias**, na reincidência de faltas punidas com advertência ou em transgressão que não justifique demissão. Prescreve em **2 anos**. Pode ser convertida em multa (50% da remuneração), com o servidor permanecendo em serviço.',
              '**Demissão**: para as infrações graves listadas no art. 132 — crime contra a administração pública, abandono de cargo (ausência por mais de 30 dias consecutivos), inassiduidade habitual (falta por 60 dias interpoladamente em 12 meses), improbidade administrativa, insubordinação grave, ofensa física, corrupção, entre outras. Prescreve em **5 anos**.',
              '**Cassação de aposentadoria ou disponibilidade**, **destituição de cargo em comissão** e **destituição de função comissionada** completam o rol.',
            ],
            p: [
              'O prazo prescricional começa a correr da data em que o fato se tornou **conhecido**. A abertura de sindicância ou de processo disciplinar **interrompe** a prescrição, que volta a correr integralmente após 140 dias.',
            ],
          },
          {
            t: 'Processo administrativo disciplinar',
            p: [
              '**Sindicância** pode resultar em arquivamento, aplicação de advertência ou suspensão de até 30 dias, ou instauração de PAD. Prazo: 30 dias, prorrogável por igual período.',
              '**PAD**: conduzido por comissão de três servidores estáveis, com prazo de **60 dias**, prorrogável por igual período. Fases: instauração, inquérito administrativo (instrução, defesa e relatório) e julgamento.',
              'É obrigatória a observância do **contraditório e da ampla defesa**. A **Súmula Vinculante 5** do STF firma que a falta de defesa técnica por advogado no PAD não ofende a Constituição.',
              'Penalidades aplicadas: as instâncias civil, penal e administrativa são **independentes**.',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'Números do abandono', txt: '<b>Abandono de cargo</b> = ausência intencional por mais de <b>30 dias consecutivos</b>. <b>Inassiduidade habitual</b> = falta por <b>60 dias</b>, interpoladamente, em <b>12 meses</b>. Não troque os dois.' },
          { tipo: 'dica', rot: 'Prescrição', txt: 'Advertência <b>180 dias</b> · Suspensão <b>2 anos</b> · Demissão, cassação e destituição <b>5 anos</b>. Contados da data em que o fato se tornou conhecido.' },
        ],
        resumo: [
          'Cumprir ordens superiores, salvo se manifestamente ilegais.',
          'Proibido participar de gerência de sociedade privada, salvo como acionista, cotista ou comanditário.',
          'Advertência (180 dias), suspensão até 90 dias (2 anos), demissão (5 anos).',
          'PAD: comissão de três servidores estáveis, 60 dias prorrogáveis; SV 5 dispensa defesa técnica.',
        ],
      },
      questoes: [
        {
          id: 'eti3-01', dif: 3, tipo: 'multipla',
          enunciado: 'Constitui dever do servidor público federal, nos termos da Lei 8.112/1990,',
          alts: [
            'cumprir as ordens superiores, exceto quando manifestamente ilegais.',
            'cumprir todas as ordens superiores, sem exceção.',
            'recusar fé a documentos públicos quando houver dúvida.',
            'atuar como procurador de terceiros junto à repartição em que atua.',
            'delegar suas atribuições a outro servidor, a seu critério.',
          ],
          correta: 0,
          expl: 'Art. 116, IV. A ressalva é essencial: a obediência hierárquica não é cega. As alternativas (c) e (d) descrevem **proibições** do art. 117.',
          tags: ['deveres'],
        },
        {
          id: 'eti3-02', dif: 3, tipo: 'multipla',
          enunciado: 'A ausência intencional do servidor ao serviço por mais de trinta dias consecutivos caracteriza',
          alts: ['abandono de cargo.', 'inassiduidade habitual.', 'desídia.', 'insubordinação grave.', 'falta injustificada simples.'],
          correta: 0,
          expl: 'Art. 138. Já a **inassiduidade habitual** (art. 139) é a falta ao serviço, sem causa justificada, por sessenta dias **interpoladamente** no período de doze meses. Ambas são hipóteses de demissão.',
          tags: ['abandono de cargo'],
        },
        {
          id: 'eti3-03', dif: 3, tipo: 'multipla',
          enunciado: 'A penalidade de suspensão aplicável ao servidor público federal não poderá exceder',
          alts: ['noventa dias.', 'trinta dias.', 'sessenta dias.', 'cento e oitenta dias.', 'um ano.'],
          correta: 0,
          expl: 'Art. 130. A suspensão pode ser convertida em multa correspondente a 50% da remuneração por dia, hipótese em que o servidor permanece em serviço. A pena prescreve em dois anos.',
          tags: ['penalidades'],
        },
        {
          id: 'eti3-04', dif: 3, tipo: 'ce',
          base: 'É vedado ao servidor participar de gerência ou administração de sociedade privada, ressalvada a participação na qualidade de acionista, cotista ou comanditário.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. Art. 117, X. A proibição alcança a **gestão**, não o investimento passivo. O servidor pode ser sócio de capital, mas não administrar a sociedade.',
          tags: ['proibições'],
        },
        {
          id: 'eti3-05', dif: 3, tipo: 'multipla',
          enunciado: 'O prazo para conclusão do processo administrativo disciplinar conduzido por comissão de três servidores estáveis é de',
          alts: [
            'sessenta dias, prorrogável por igual período.',
            'trinta dias, improrrogável.',
            'noventa dias, prorrogável por trinta.',
            'cento e vinte dias, improrrogável.',
            'cento e oitenta dias, prorrogável uma vez.',
          ],
          correta: 0,
          expl: 'Art. 152 da Lei 8.112/90. Para a **sindicância**, o prazo é de 30 dias, também prorrogável por igual período. O excesso de prazo, por si, não anula o processo, mas exige nova designação de comissão.',
          tags: ['PAD'],
        },
        {
          id: 'eti3-06', dif: 3, tipo: 'ce',
          base: 'A falta de defesa técnica por advogado no processo administrativo disciplinar ofende a Constituição Federal.',
          enunciado: 'Julgue a afirmação.',
          correta: 1,
          expl: 'ERRADO. A **Súmula Vinculante 5** do STF é expressa em sentido contrário: a falta de defesa técnica por advogado no PAD **não** ofende a Constituição. A ampla defesa é assegurada, mas não exige advogado constituído.',
          tags: ['ampla defesa', 'SV 5'],
        },
      ],
    },
  ],
};
