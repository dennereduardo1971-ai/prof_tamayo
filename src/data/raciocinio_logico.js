/* ============================================================
   RACIOCÍNIO LÓGICO E QUANTITATIVO — peso 3
   A matéria mais treinável da prova. Não perdoa distração,
   mas perdoa quem repete.
   ============================================================ */

export default {
  id: 'raciocinio_logico',
  nome: 'Raciocínio Lógico e Quantitativo',
  curto: 'Raciocínio Lógico',
  abrev: 'RLM',
  peso: 3,
  bloco: 'basicos',
  cor: '#6fc98a',
  ico: '🧩',
  fortaleza: false,
  descricao: 'Lógica proposicional, equivalências, argumentação, quantificadores e raciocínio quantitativo.',

  niveis: [
    {
      id: 'rlm-1',
      titulo: 'Proposições, conectivos e tabelas-verdade',
      subtitulo: 'A base de tudo',
      topicos: ['Proposição', 'Conectivos', 'Tabela-verdade', 'Tautologia e contradição'],
      aula: {
        intro: 'Lógica é a única matéria da prova em que você pode ter <b>certeza absoluta</b> da resposta. Aprenda as cinco linhas de tabela e nunca mais chute.',
        blocos: [
          {
            t: 'O que é (e o que não é) proposição',
            p: [
              '**Proposição** é toda sentença declarativa à qual se pode atribuir verdadeiro ou falso. Não são proposições: frases interrogativas, exclamativas, imperativas, optativas e sentenças abertas (com variável indefinida).',
              '"A sessão foi encerrada" é proposição. "Encerre a sessão!" não é. "x + 2 = 5" é sentença aberta — só vira proposição quando x é definido.',
            ],
          },
          {
            t: 'Os cinco conectivos e suas tabelas',
            lista: [
              '**Negação (~p)**: inverte o valor.',
              '**Conjunção (p ∧ q — "e")**: só é **verdadeira** quando **ambas** são verdadeiras.',
              '**Disjunção inclusiva (p ∨ q — "ou")**: só é **falsa** quando **ambas** são falsas.',
              '**Disjunção exclusiva (p ⊻ q — "ou... ou...", exclusivo)**: verdadeira quando os valores são **diferentes**.',
              '**Condicional (p → q — "se... então")**: só é **falsa** quando o antecedente é V e o consequente é F.',
              '**Bicondicional (p ↔ q — "se e somente se")**: verdadeira quando os valores são **iguais**.',
            ],
            p: [
              'Se você guardar apenas duas frases, guarde estas: *"o E só é V com tudo V"* e *"o SE-ENTÃO só é F com V→F"*. Elas resolvem a maioria das questões.',
            ],
          },
          {
            t: 'Número de linhas e classificação',
            p: [
              'Uma tabela-verdade com **n** proposições simples tem **2ⁿ** linhas. Três proposições → 8 linhas; quatro → 16.',
              '**Tautologia**: verdadeira em todas as linhas. **Contradição**: falsa em todas. **Contingência (indeterminação)**: mistura de V e F.',
            ],
          },
          {
            t: 'Traduções que a banca esconde',
            lista: [
              '"p, mas q" = p ∧ q (o "mas" é conjunção com valor adversativo, não muda a lógica).',
              '"p, embora q" = p ∧ q.',
              '"q, se p" = p → q — atenção à ordem: o que vem depois do "se" é o **antecedente**.',
              '"p somente se q" = p → q.',
              '"p é suficiente para q" = p → q. "p é necessário para q" = q → p.',
              '"Basta p para q" = p → q. "Só q se p" = q → p.',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'Suficiente x necessário', txt: '<b>Suficiente</b> vai na frente da seta: A é suficiente para B → A → B. <b>Necessário</b> vai atrás: A é necessário para B → B → A. Essa inversão derruba metade dos candidatos.' },
          { tipo: 'dica', rot: 'Atalho da condicional', txt: 'Numa prova, se aparece "se p então q" com q verdadeiro, a condicional já é <b>verdadeira</b> — não importa o p. E se p é falso, também é verdadeira. Só há um caso de falsidade.' },
        ],
        resumo: [
          'Proposição admite V ou F; imperativo e interrogativo não são proposições.',
          'E: só V com tudo V. OU: só F com tudo F. SE-ENTÃO: só F com V→F. Bicondicional: V quando iguais.',
          'n proposições → 2ⁿ linhas.',
          'Suficiente → antecedente; necessário → consequente.',
        ],
      },
      questoes: [
        {
          id: 'rlm1-01', dif: 2, tipo: 'multipla',
          enunciado: 'A proposição composta "O projeto foi aprovado e o relator foi elogiado" é falsa. Pode-se concluir que',
          alts: [
            'ao menos uma das proposições simples é falsa.',
            'ambas as proposições simples são falsas.',
            'o projeto certamente não foi aprovado.',
            'o relator certamente não foi elogiado.',
            'as duas proposições são verdadeiras.',
          ],
          correta: 0,
          expl: 'A conjunção é falsa quando **pelo menos uma** parcela é falsa. Não é possível determinar qual delas — daí ser errado afirmar categoricamente sobre uma proposição específica.',
          tags: ['conjunção'],
        },
        {
          id: 'rlm1-02', dif: 3, tipo: 'multipla',
          enunciado: 'Considere a proposição: "Se houver quórum, então a votação será realizada". Sabe-se que a votação NÃO foi realizada. Conclui-se que',
          alts: [
            'não houve quórum.',
            'houve quórum.',
            'nada se pode concluir sobre o quórum.',
            'a proposição original é falsa.',
            'houve quórum e a sessão foi suspensa.',
          ],
          correta: 0,
          expl: 'Modus tollens: de (p → q) e ~q, conclui-se ~p. Se houvesse quórum, a votação teria ocorrido; como não ocorreu, não houve quórum. Cuidado com o erro inverso: de ~p **não** se conclui ~q.',
          tags: ['condicional', 'modus tollens'],
        },
        {
          id: 'rlm1-03', dif: 3, tipo: 'multipla',
          enunciado: 'A tabela-verdade de uma proposição composta por quatro proposições simples distintas possui',
          alts: ['16 linhas.', '8 linhas.', '4 linhas.', '12 linhas.', '32 linhas.'],
          correta: 0,
          expl: '2ⁿ, com n = 4 → 2⁴ = 16. Duas proposições dão 4 linhas; três dão 8; cinco dariam 32.',
          tags: ['tabela-verdade'],
        },
        {
          id: 'rlm1-04', dif: 3, tipo: 'multipla',
          enunciado: 'A frase "Ter maioria absoluta é necessário para aprovar lei complementar" traduz-se em linguagem simbólica como',
          alts: [
            'aprovar lei complementar → ter maioria absoluta.',
            'ter maioria absoluta → aprovar lei complementar.',
            'ter maioria absoluta ∧ aprovar lei complementar.',
            'ter maioria absoluta ↔ aprovar lei complementar.',
            'ter maioria absoluta ∨ aprovar lei complementar.',
          ],
          correta: 0,
          expl: 'Condição **necessária** ocupa o lugar do consequente: se ocorreu o fato (aprovar LC), então a condição necessária estava presente (maioria absoluta). A alternativa (b) inverteria o sentido, tratando-a como suficiente.',
          tags: ['necessário e suficiente'],
        },
        {
          id: 'rlm1-05', dif: 3, tipo: 'ce',
          base: 'A proposição "p ∨ ~p" é verdadeira independentemente do valor lógico de p.',
          enunciado: 'Julgue: trata-se de uma tautologia.',
          correta: 0,
          expl: 'CERTO. Se p é V, o primeiro termo é V; se p é F, ~p é V. Em ambos os casos a disjunção é verdadeira — é o princípio do terceiro excluído, exemplo clássico de tautologia.',
          tags: ['tautologia'],
        },
        {
          id: 'rlm1-06', dif: 3, tipo: 'multipla',
          enunciado: 'Sendo p verdadeira e q falsa, o valor lógico de (p → q) ∨ (q → p) é',
          alts: [
            'verdadeiro, pois a segunda condicional é verdadeira.',
            'falso, pois a primeira condicional é falsa.',
            'indeterminado, por faltar o valor de uma terceira proposição.',
            'falso, pois ambas as condicionais são falsas.',
            'verdadeiro, pois ambas as condicionais são verdadeiras.',
          ],
          correta: 0,
          expl: 'p → q = V → F = **falso**. q → p = F → V = **verdadeiro**. A disjunção com pelo menos um termo verdadeiro é verdadeira. Repare que essa expressão é, na verdade, uma tautologia para quaisquer valores.',
          tags: ['valores lógicos'],
        },
      ],
    },

    {
      id: 'rlm-2',
      titulo: 'Equivalências e negações',
      subtitulo: 'De Morgan, contrapositiva e o "nem"',
      topicos: ['Equivalências', 'Negação de proposições compostas', 'Contrapositiva', 'De Morgan'],
      aula: {
        intro: 'Negar corretamente é a habilidade mais rentável desta matéria. São quatro regras — e elas caem sempre.',
        blocos: [
          {
            t: 'As equivalências obrigatórias',
            lista: [
              '**Contrapositiva**: (p → q) ≡ (~q → ~p). Nega e inverte.',
              '**Condicional em disjunção**: (p → q) ≡ (~p ∨ q). Nega o primeiro e troca o conectivo por "ou".',
              '**Bicondicional**: (p ↔ q) ≡ (p → q) ∧ (q → p).',
              '**Dupla negação**: ~(~p) ≡ p.',
            ],
          },
          {
            t: 'As quatro negações que você precisa saber de cor',
            lista: [
              '**~(p ∧ q) ≡ ~p ∨ ~q** — nega ambas e troca "e" por "ou" (De Morgan).',
              '**~(p ∨ q) ≡ ~p ∧ ~q** — nega ambas e troca "ou" por "e" (De Morgan).',
              '**~(p → q) ≡ p ∧ ~q** — mantém o antecedente, nega o consequente e usa "e". **Nunca** vira condicional.',
              '**~(p ↔ q) ≡ p ⊻ q** — a negação da bicondicional é a disjunção exclusiva.',
            ],
            p: [
              'A negação da condicional é a que mais aparece e a que mais se erra. Grave a frase: *"a negação do SE-ENTÃO é E COM O SEGUNDO NEGADO"*.',
            ],
          },
          {
            t: 'Negação de quantificadores',
            lista: [
              '~(**Todo** A é B) ≡ **Algum** A **não** é B.',
              '~(**Algum** A é B) ≡ **Nenhum** A é B (ou: todo A não é B).',
              '~(**Nenhum** A é B) ≡ **Algum** A é B.',
            ],
          },
          {
            t: 'O "nem" e o "ou... ou..."',
            p: [
              '"Nem p nem q" equivale a **~p ∧ ~q**.',
              '"Ou p ou q" (exclusivo) é verdadeiro quando exatamente um dos dois ocorre. Sua negação é a bicondicional: ~(p ⊻ q) ≡ (p ↔ q).',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'O erro campeão', txt: 'A negação de "Se chover, então a sessão será suspensa" <b>não</b> é "Se chover, a sessão não será suspensa". É: "<b>Chove e a sessão não é suspensa</b>".' },
          { tipo: 'dica', rot: 'Truque do "todo"', txt: 'Negar "todo" nunca dá "nenhum". Dá "<b>algum não</b>". Basta um contraexemplo para derrubar uma afirmação universal.' },
        ],
        resumo: [
          'p → q ≡ ~q → ~p ≡ ~p ∨ q.',
          '~(p ∧ q) ≡ ~p ∨ ~q; ~(p ∨ q) ≡ ~p ∧ ~q.',
          '~(p → q) ≡ p ∧ ~q.',
          '~(Todo A é B) ≡ Algum A não é B.',
        ],
      },
      questoes: [
        {
          id: 'rlm2-01', dif: 3, tipo: 'multipla',
          enunciado: 'A negação da proposição "Se o parecer for aprovado, o projeto seguirá ao Plenário" é',
          alts: [
            'O parecer é aprovado e o projeto não segue ao Plenário.',
            'Se o parecer não for aprovado, o projeto não seguirá ao Plenário.',
            'O parecer não é aprovado ou o projeto segue ao Plenário.',
            'Se o projeto não seguir ao Plenário, o parecer não foi aprovado.',
            'O parecer não é aprovado e o projeto não segue ao Plenário.',
          ],
          correta: 0,
          expl: '~(p → q) ≡ p ∧ ~q. A alternativa (c) é a **equivalente** da condicional original, não sua negação; a (d) é a contrapositiva, também equivalente.',
          tags: ['negação da condicional'],
        },
        {
          id: 'rlm2-02', dif: 3, tipo: 'multipla',
          enunciado: 'A proposição "Se há urgência, então a pauta é sobrestada" é logicamente equivalente a',
          alts: [
            'Não há urgência ou a pauta é sobrestada.',
            'Há urgência e a pauta é sobrestada.',
            'Se a pauta é sobrestada, então há urgência.',
            'Não há urgência e a pauta não é sobrestada.',
            'Há urgência ou a pauta não é sobrestada.',
          ],
          correta: 0,
          expl: 'p → q ≡ ~p ∨ q. A alternativa (c) é a **recíproca**, que não é equivalente. A equivalente adicional seria a contrapositiva: "se a pauta não é sobrestada, então não há urgência".',
          tags: ['equivalências'],
        },
        {
          id: 'rlm2-03', dif: 3, tipo: 'multipla',
          enunciado: 'A negação de "Todos os deputados assinaram o requerimento" é',
          alts: [
            'Pelo menos um deputado não assinou o requerimento.',
            'Nenhum deputado assinou o requerimento.',
            'Todos os deputados não assinaram o requerimento.',
            'Alguns deputados assinaram o requerimento.',
            'Nenhum deputado deixou de assinar o requerimento.',
          ],
          correta: 0,
          expl: '~(Todo A é B) ≡ Algum A não é B. Basta **um** contraexemplo para negar uma universal. "Nenhum assinou" é afirmação muito mais forte do que a simples negação.',
          tags: ['quantificadores'],
        },
        {
          id: 'rlm2-04', dif: 3, tipo: 'multipla',
          enunciado: 'A negação de "O relator apresentou o parecer ou a sessão foi suspensa" é',
          alts: [
            'O relator não apresentou o parecer e a sessão não foi suspensa.',
            'O relator não apresentou o parecer ou a sessão não foi suspensa.',
            'Se o relator não apresentou o parecer, a sessão foi suspensa.',
            'O relator apresentou o parecer e a sessão foi suspensa.',
            'Ou o relator apresentou o parecer, ou a sessão foi suspensa, mas não ambos.',
          ],
          correta: 0,
          expl: 'De Morgan: ~(p ∨ q) ≡ ~p ∧ ~q. Negar um "ou" produz um "e" com as duas partes negadas — e vice-versa.',
          tags: ['De Morgan'],
        },
        {
          id: 'rlm2-05', dif: 3, tipo: 'ce',
          base: 'As proposições "Se há maioria absoluta, o projeto é aprovado" e "Se o projeto não é aprovado, não há maioria absoluta" são logicamente equivalentes.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. A segunda é a **contrapositiva** da primeira: (p → q) ≡ (~q → ~p). Nega os dois termos e inverte a ordem — sempre equivalente.',
          tags: ['contrapositiva'],
        },
        {
          id: 'rlm2-06', dif: 3, tipo: 'multipla',
          enunciado: 'A expressão "Nem o requerimento foi lido nem a emenda foi votada" equivale a',
          alts: [
            'O requerimento não foi lido e a emenda não foi votada.',
            'O requerimento não foi lido ou a emenda não foi votada.',
            'Se o requerimento não foi lido, a emenda foi votada.',
            'O requerimento foi lido e a emenda não foi votada.',
            'Ou o requerimento foi lido, ou a emenda foi votada.',
          ],
          correta: 0,
          expl: '"Nem... nem..." é a negação conjunta de ambas: ~p ∧ ~q. É exatamente o resultado de aplicar De Morgan a ~(p ∨ q).',
          tags: ['negação'],
        },
      ],
    },

    {
      id: 'rlm-3',
      titulo: 'Argumentação e diagramas lógicos',
      subtitulo: 'Validade, silogismos e quantificadores',
      topicos: ['Argumento válido', 'Regras de inferência', 'Silogismos', 'Diagramas de conjuntos'],
      aula: {
        intro: 'Aqui a lógica encontra a interpretação de texto. É onde a sua leitura afiada vira vantagem.',
        blocos: [
          {
            t: 'Validade não é verdade',
            p: [
              'Um argumento é **válido** quando é impossível que as premissas sejam todas verdadeiras e a conclusão falsa. A validade depende da **forma**, não do conteúdo.',
              'Argumento pode ser válido com premissas falsas e conclusão absurda — desde que a estrutura seja correta. Por outro lado, um argumento com premissas e conclusão verdadeiras pode ser **inválido**.',
            ],
          },
          {
            t: 'Regras de inferência que caem',
            lista: [
              '**Modus ponens**: p → q; p ⊢ q.',
              '**Modus tollens**: p → q; ~q ⊢ ~p.',
              '**Silogismo hipotético**: p → q; q → r ⊢ p → r.',
              '**Silogismo disjuntivo**: p ∨ q; ~p ⊢ q.',
              '**Simplificação**: p ∧ q ⊢ p.',
              '**Adição**: p ⊢ p ∨ q.',
            ],
            p: [
              'Duas **falácias** clássicas: **afirmação do consequente** (p → q; q ⊢ p — inválido) e **negação do antecedente** (p → q; ~p ⊢ ~q — inválido). A banca cobra as duas disfarçadas de raciocínio natural.',
            ],
          },
          {
            t: 'Diagramas de conjuntos (quantificadores)',
            p: [
              '"**Todo** A é B" → círculo A **dentro** de B. "**Nenhum** A é B" → círculos **separados**. "**Algum** A é B" → círculos com **interseção**.',
              'Regra prática: de duas universais compatíveis conclui-se universal; de universal + particular conclui-se particular; de **duas particulares nada se conclui**.',
              'Cuidado com a conclusão indevida do "algum": "Algum A é B" **não** implica "algum A não é B". Em lógica, "algum" significa "ao menos um", admitindo que sejam todos.',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'Falácias favoritas', txt: 'De "se chove, a rua molha" e "a rua está molhada" <b>não</b> se conclui que choveu (afirmação do consequente). De "não choveu" <b>não</b> se conclui que a rua está seca (negação do antecedente).' },
          { tipo: 'dica', rot: 'Método do contraexemplo', txt: 'Para provar que um argumento é <b>inválido</b>, basta encontrar UMA situação em que as premissas sejam verdadeiras e a conclusão falsa. Um contraexemplo encerra a questão.' },
        ],
        resumo: [
          'Validade depende da forma, não do conteúdo.',
          'Modus ponens, modus tollens, silogismos hipotético e disjuntivo.',
          'Falácias: afirmar o consequente e negar o antecedente.',
          'De duas premissas particulares nada se conclui.',
        ],
      },
      questoes: [
        {
          id: 'rlm3-01', dif: 3, tipo: 'multipla',
          enunciado: 'Considere as premissas: (I) Todo analista legislativo é servidor público. (II) Alguns servidores públicos são concursados. Conclui-se que',
          alts: [
            'nada se pode concluir necessariamente sobre analistas legislativos serem concursados.',
            'todo analista legislativo é concursado.',
            'algum analista legislativo é concursado.',
            'nenhum analista legislativo é concursado.',
            'todo concursado é analista legislativo.',
          ],
          correta: 0,
          expl: 'A segunda premissa é particular e não informa **quais** servidores são concursados. Nada garante que a interseção alcance os analistas. Regra: de universal + particular só se conclui quando o termo particular está corretamente ligado ao termo médio.',
          tags: ['diagramas lógicos'],
        },
        {
          id: 'rlm3-02', dif: 3, tipo: 'multipla',
          enunciado: 'De "Se o prazo é regimental, então há preclusão" e "Não há preclusão", conclui-se validamente que',
          alts: [
            'o prazo não é regimental.',
            'o prazo é regimental.',
            'há preclusão parcial.',
            'nada se pode concluir.',
            'o prazo é regimental e há preclusão.',
          ],
          correta: 0,
          expl: 'Modus tollens: p → q, ~q ⊢ ~p. Forma válida clássica. Não confundir com a negação do antecedente, que é falácia.',
          tags: ['modus tollens'],
        },
        {
          id: 'rlm3-03', dif: 3, tipo: 'ce',
          base: 'Premissas: "Se há vício de iniciativa, a lei é inconstitucional." "A lei é inconstitucional." Conclusão: "Há vício de iniciativa."',
          enunciado: 'Julgue: o argumento é válido.',
          correta: 1,
          expl: 'ERRADO. É a falácia da **afirmação do consequente**. A lei pode ser inconstitucional por outros motivos (vício material, por exemplo). A condicional só autoriza o caminho antecedente → consequente.',
          tags: ['falácias'],
        },
        {
          id: 'rlm3-04', dif: 3, tipo: 'multipla',
          enunciado: 'De "Todo projeto de lei complementar exige maioria absoluta" e "Todo projeto que exige maioria absoluta vai a Plenário", conclui-se que',
          alts: [
            'todo projeto de lei complementar vai a Plenário.',
            'algum projeto de lei complementar não vai a Plenário.',
            'todo projeto que vai a Plenário é de lei complementar.',
            'nenhum projeto de lei complementar vai a Plenário.',
            'nada se pode concluir.',
          ],
          correta: 0,
          expl: 'Silogismo hipotético (transitividade): A → B e B → C, logo A → C. A alternativa (c) inverte a implicação, o que não é válido.',
          tags: ['silogismo hipotético'],
        },
        {
          id: 'rlm3-05', dif: 3, tipo: 'multipla',
          enunciado: 'Um argumento é considerado válido quando',
          alts: [
            'é impossível que todas as premissas sejam verdadeiras e a conclusão falsa.',
            'todas as suas premissas são verdadeiras na realidade.',
            'a conclusão corresponde a um fato comprovado.',
            'as premissas e a conclusão são todas verdadeiras.',
            'a conclusão é aceita pela maioria dos especialistas.',
          ],
          correta: 0,
          expl: 'Validade é propriedade **formal** e independe da verdade material das proposições. Um argumento pode ser válido com premissas falsas, e inválido com todas as proposições verdadeiras.',
          tags: ['validade'],
        },
        {
          id: 'rlm3-06', dif: 3, tipo: 'multipla',
          enunciado: 'Considere: "Nenhum requerimento foi indeferido" e "Alguns requerimentos foram protocolados hoje". Conclui-se que',
          alts: [
            'alguns requerimentos protocolados hoje não foram indeferidos.',
            'todos os requerimentos protocolados hoje foram indeferidos.',
            'nenhum requerimento foi protocolado hoje.',
            'todos os requerimentos foram indeferidos.',
            'nada se pode concluir.',
          ],
          correta: 0,
          expl: 'Se **nenhum** requerimento foi indeferido, então nenhum subconjunto de requerimentos foi indeferido — inclusive os protocolados hoje. Combinando com a existência afirmada pela segunda premissa, conclui-se a particular negativa.',
          tags: ['quantificadores'],
        },
      ],
    },

    {
      id: 'rlm-4',
      titulo: 'Raciocínio quantitativo',
      subtitulo: 'Porcentagem, proporção, combinatória e probabilidade',
      topicos: ['Porcentagem', 'Razão e proporção', 'Análise combinatória', 'Probabilidade'],
      aula: {
        intro: 'Cálculo em prova de concurso é sempre o mesmo punhado de ferramentas. Domine cinco e você resolve tudo com tempo de sobra.',
        blocos: [
          {
            t: 'Porcentagem sem armadilha',
            p: [
              'Aumento de x% → multiplique por (1 + x/100). Desconto de x% → multiplique por (1 − x/100). Aumentos e descontos sucessivos **multiplicam-se**, não se somam.',
              'Exemplo clássico: aumento de 20% seguido de desconto de 20% → 1,20 × 0,80 = 0,96, ou seja, **queda de 4%** — não retorno ao valor original.',
              '**Ponto percentual** ≠ **por cento**: passar de 20% para 25% é aumento de **5 pontos percentuais**, mas de **25%** em termos relativos.',
            ],
          },
          {
            t: 'Razão, proporção e regra de três',
            p: [
              'Grandezas **diretamente** proporcionais: uma cresce, a outra cresce (multiplique em cruz). **Inversamente** proporcionais: uma cresce, a outra diminui (multiplique na horizontal).',
              'Divisão proporcional: reparta o total na razão dada, somando as partes da razão para achar o valor unitário.',
            ],
          },
          {
            t: 'Combinatória: a única pergunta que importa',
            p: [
              '**A ordem importa?** Se sim, é **arranjo** ou **permutação**. Se não, é **combinação**.',
              '**Permutação** de n elementos: n!. Com repetições: n! dividido pelo produto dos fatoriais das repetições.',
              '**Arranjo**: A(n,k) = n! / (n−k)!.',
              '**Combinação**: C(n,k) = n! / [k! (n−k)!].',
              'Exemplo de prova: escolher 3 membros para uma comissão entre 10 candidatos → ordem não importa → C(10,3) = 120. Se fosse presidente, relator e secretário → ordem importa → A(10,3) = 720.',
            ],
          },
          {
            t: 'Probabilidade',
            lista: [
              'P(A) = casos favoráveis ÷ casos possíveis, no espaço equiprovável.',
              'P(A ∪ B) = P(A) + P(B) − P(A ∩ B).',
              'Eventos **independentes**: P(A ∩ B) = P(A) × P(B).',
              'Probabilidade **condicional**: P(A|B) = P(A ∩ B) ÷ P(B).',
              'Probabilidade do **complementar**: P(~A) = 1 − P(A) — atalho valioso para questões com "pelo menos um".',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'Nunca some percentuais', txt: '+30% e depois −30% <b>não</b> volta ao início: 1,3 × 0,7 = 0,91 → queda de 9%. Toda questão que "soma" percentuais sucessivos está errada.' },
          { tipo: 'dica', rot: '"Pelo menos um"', txt: 'Sempre que a questão pedir "pelo menos um", calcule o <b>complementar</b> (nenhum) e subtraia de 1. Economiza metade da conta.' },
        ],
        resumo: [
          'Aumentos e descontos sucessivos se multiplicam.',
          'Ponto percentual não é por cento.',
          'Ordem importa → arranjo; não importa → combinação.',
          '"Pelo menos um" = 1 − P(nenhum).',
        ],
      },
      questoes: [
        {
          id: 'rlm4-01', dif: 3, tipo: 'multipla',
          enunciado: 'Um valor sofre aumento de 25% e, em seguida, desconto de 20% sobre o novo valor. O resultado final, em relação ao valor inicial, é',
          alts: [
            'igual ao valor inicial.',
            '5% maior.',
            '5% menor.',
            '10% maior.',
            '45% maior.',
          ],
          correta: 0,
          expl: '1,25 × 0,80 = 1,00 — exatamente o valor original. É o caso particular em que os fatores se cancelam. Nunca some os percentuais: aqui a "soma" daria +5%, o que estaria errado.',
          tags: ['porcentagem'],
        },
        {
          id: 'rlm4-02', dif: 3, tipo: 'multipla',
          enunciado: 'De um grupo de 8 servidores, quantas comissões distintas de 3 integrantes podem ser formadas, sem distinção de funções?',
          alts: ['56.', '336.', '24.', '512.', '112.'],
          correta: 0,
          expl: 'A ordem não importa → combinação: C(8,3) = 8!/(3!·5!) = (8·7·6)/(3·2·1) = 56. Se houvesse cargos distintos, seria arranjo: A(8,3) = 336.',
          tags: ['combinatória'],
        },
        {
          id: 'rlm4-03', dif: 3, tipo: 'multipla',
          enunciado: 'Lançando-se duas moedas honestas, a probabilidade de se obter pelo menos uma cara é',
          alts: ['3/4.', '1/2.', '1/4.', '2/3.', '1.'],
          correta: 0,
          expl: 'Complementar: P(nenhuma cara) = P(coroa e coroa) = 1/2 × 1/2 = 1/4. Logo, P(pelo menos uma cara) = 1 − 1/4 = 3/4.',
          tags: ['probabilidade'],
        },
        {
          id: 'rlm4-04', dif: 3, tipo: 'multipla',
          enunciado: 'Se a aprovação de determinada matéria passou de 40% para 46% do total de votos, houve aumento de',
          alts: [
            '6 pontos percentuais, correspondentes a 15% em termos relativos.',
            '6% em termos relativos.',
            '15 pontos percentuais.',
            '6 pontos percentuais, correspondentes a 6% em termos relativos.',
            '46% em relação ao valor anterior.',
          ],
          correta: 0,
          expl: 'Diferença absoluta: 46 − 40 = **6 pontos percentuais**. Variação relativa: 6/40 = 0,15 = **15%**. Confundir ponto percentual com por cento é o erro mais explorado no tema.',
          tags: ['porcentagem'],
        },
        {
          id: 'rlm4-05', dif: 3, tipo: 'multipla',
          enunciado: 'Uma quantia de R$ 12.000,00 deve ser dividida entre três setores na razão 2 : 3 : 7. A maior parcela será de',
          alts: ['R$ 7.000,00.', 'R$ 6.000,00.', 'R$ 5.600,00.', 'R$ 8.400,00.', 'R$ 4.000,00.'],
          correta: 0,
          expl: 'Soma das partes: 2 + 3 + 7 = 12. Valor de cada parte: 12.000 ÷ 12 = 1.000. A maior parcela é 7 × 1.000 = R$ 7.000,00.',
          tags: ['divisão proporcional'],
        },
        {
          id: 'rlm4-06', dif: 3, tipo: 'multipla',
          enunciado: 'Quantos anagramas distintos podem ser formados com as letras da palavra PARECER?',
          alts: ['1.260.', '5.040.', '2.520.', '630.', '720.'],
          correta: 0,
          expl: 'PARECER tem 7 letras, com R repetido 2 vezes e E repetido 2 vezes. Permutação com repetição: 7! / (2!·2!) = 5.040 / 4 = **1.260**.',
          tags: ['permutação com repetição'],
        },
      ],
    },
  ],
};
