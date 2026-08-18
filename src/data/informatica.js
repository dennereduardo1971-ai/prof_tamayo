/* ============================================================
   NOÇÕES DE INFORMÁTICA — peso 2
   Nada de aprofundar demais: o que a banca quer é o básico
   muito bem sabido.
   ============================================================ */

export default {
  id: 'informatica',
  nome: 'Noções de Informática',
  curto: 'Informática',
  abrev: 'INF',
  peso: 2,
  bloco: 'basicos',
  cor: '#9aa8c9',
  ico: '💻',
  fortaleza: false,
  descricao: 'Conceitos de hardware e software, sistemas operacionais, internet, aplicativos de escritório e segurança da informação.',

  niveis: [
    {
      id: 'inf-1',
      titulo: 'Hardware, software e sistemas operacionais',
      subtitulo: 'Fundamentos e organização de arquivos',
      topicos: ['Hardware', 'Software', 'Sistema operacional', 'Gerenciamento de arquivos'],
      aula: {
        intro: 'Informática de concurso é vocabulário. Saber o nome certo da coisa certa resolve quase toda questão.',
        blocos: [
          {
            t: 'Hardware: o essencial',
            lista: [
              '**CPU (processador)**: executa instruções. Composta por unidade de controle, unidade lógica e aritmética (ULA) e registradores. **Clock** mede a frequência; **núcleos** indicam paralelismo.',
              '**Memória RAM**: volátil, de acesso aleatório, guarda dados em uso. Perde o conteúdo ao desligar.',
              '**ROM**: não volátil, de leitura, guarda firmware (BIOS/UEFI).',
              '**Memória cache**: pequena, muito rápida, entre CPU e RAM (níveis L1, L2, L3).',
              '**Armazenamento secundário**: HDD (magnético, mecânico) e **SSD** (memória flash, sem partes móveis, mais rápido e resistente).',
              '**Periféricos**: de entrada (teclado, mouse, scanner), de saída (monitor, impressora) e **híbridos** (touchscreen, multifuncional, modem, pendrive).',
            ],
            p: [
              'Hierarquia de velocidade, do mais rápido ao mais lento: registradores → cache → RAM → SSD → HDD → mídias externas. A capacidade cresce na direção inversa.',
            ],
          },
          {
            t: 'Software',
            lista: [
              '**Básico/de sistema**: sistema operacional, drivers, utilitários.',
              '**Aplicativo**: editores, planilhas, navegadores.',
              '**Software livre**: quatro liberdades — usar, estudar, modificar e redistribuir. Não é sinônimo de gratuito. **Freeware** é gratuito mas não necessariamente livre; **shareware** é de avaliação limitada.',
            ],
          },
          {
            t: 'Sistema operacional',
            p: [
              'Funções: gerenciamento de **processos**, de **memória**, de **arquivos**, de **dispositivos** e de **usuários/permissões**. Faz a interface entre hardware e aplicações.',
              'No **Windows**, o caminho usa barra invertida (`C:\\Usuarios\\...`); no **Linux**, barra normal e sistema de arquivos hierárquico a partir da raiz (`/home/...`). Extensões comuns: `.docx`, `.xlsx`, `.pdf`, `.odt`, `.csv`, `.zip`.',
              'Atalhos que caem em prova: `Ctrl+C` copiar, `Ctrl+X` recortar, `Ctrl+V` colar, `Ctrl+Z` desfazer, `Ctrl+Y` refazer, `Ctrl+S` salvar, `Ctrl+P` imprimir, `Ctrl+F` localizar, `Alt+Tab` alternar janelas, `Ctrl+Shift+Esc` gerenciador de tarefas, `Windows+E` explorador de arquivos.',
              'Diferença essencial: **mover** dentro do mesmo volume não copia dados fisicamente, apenas altera a referência; **copiar** duplica. Arquivo excluído vai para a **Lixeira**, salvo com `Shift+Delete` ou em mídias removíveis.',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'RAM x ROM', txt: '<b>RAM</b> é volátil e de leitura e escrita — perde tudo ao desligar. <b>ROM</b> é não volátil e essencialmente de leitura. Questão que atribua volatilidade à ROM está errada.' },
          { tipo: 'dica', rot: 'Software livre ≠ grátis', txt: 'Livre é sobre <b>liberdade</b> (usar, estudar, modificar, redistribuir), não sobre preço. Um software livre pode ser vendido; um gratuito pode ser proprietário.' },
        ],
        resumo: [
          'RAM volátil, ROM não volátil, cache entre CPU e RAM.',
          'SSD usa memória flash; HDD é magnético e mecânico.',
          'Software livre = quatro liberdades, não gratuidade.',
          'SO gerencia processos, memória, arquivos, dispositivos e permissões.',
        ],
      },
      questoes: [
        {
          id: 'inf1-01', dif: 2, tipo: 'multipla',
          enunciado: 'A memória do computador que armazena temporariamente os dados em uso e perde seu conteúdo quando o equipamento é desligado é a',
          alts: ['RAM.', 'ROM.', 'memória flash do SSD.', 'memória cache L3, exclusivamente.', 'memória virtual em disco.'],
          correta: 0,
          expl: 'A RAM é volátil e de acesso aleatório. A ROM é não volátil; o SSD armazena de forma persistente; a memória virtual é uma área em disco usada como extensão da RAM, e também persiste fisicamente até ser sobrescrita.',
          tags: ['hardware'],
        },
        {
          id: 'inf1-02', dif: 3, tipo: 'multipla',
          enunciado: 'Assinale a alternativa que apresenta um periférico híbrido (de entrada e saída).',
          alts: ['Tela sensível ao toque.', 'Teclado.', 'Monitor sem função de toque.', 'Scanner.', 'Impressora simples.'],
          correta: 0,
          expl: 'A tela sensível ao toque exibe (saída) e recebe comandos (entrada). Teclado e scanner são apenas de entrada; monitor comum e impressora simples, apenas de saída. Multifuncionais e modems também são híbridos.',
          tags: ['periféricos'],
        },
        {
          id: 'inf1-03', dif: 3, tipo: 'ce',
          base: 'Um software livre é necessariamente gratuito, não podendo ser comercializado.',
          enunciado: 'Julgue a afirmação.',
          correta: 1,
          expl: 'ERRADO. Software livre garante quatro liberdades (usar, estudar, modificar, redistribuir), o que não impede a cobrança. Gratuidade é característica do **freeware**, que pode ser proprietário.',
          tags: ['software livre'],
        },
        {
          id: 'inf1-04', dif: 3, tipo: 'multipla',
          enunciado: 'Considerando a hierarquia de memórias, a ordem correta da mais rápida para a mais lenta é',
          alts: [
            'registradores, cache, RAM, SSD, HDD.',
            'RAM, cache, registradores, HDD, SSD.',
            'cache, registradores, SSD, RAM, HDD.',
            'HDD, SSD, RAM, cache, registradores.',
            'RAM, registradores, cache, HDD, SSD.',
          ],
          correta: 0,
          expl: 'Quanto mais próxima do processador, mais rápida e menor a capacidade. O inverso vale para o custo por byte: registradores são os mais caros; o HDD, o mais barato por unidade de armazenamento.',
          tags: ['hierarquia de memória'],
        },
        {
          id: 'inf1-05', dif: 2, tipo: 'multipla',
          enunciado: 'No ambiente Windows, a combinação de teclas utilizada para localizar texto em um documento aberto é',
          alts: ['Ctrl + F.', 'Ctrl + L.', 'Ctrl + P.', 'Ctrl + B.', 'Alt + F4.'],
          correta: 0,
          expl: '`Ctrl+F` (find). `Ctrl+P` imprime, `Ctrl+B` aplica negrito na versão em inglês (em português, `Ctrl+N`), e `Alt+F4` fecha a janela ativa.',
          tags: ['atalhos'],
        },
        {
          id: 'inf1-06', dif: 3, tipo: 'multipla',
          enunciado: 'São funções típicas de um sistema operacional:',
          alts: [
            'gerenciamento de processos, de memória, de arquivos e de dispositivos.',
            'edição de textos e elaboração de planilhas eletrônicas.',
            'compilação de código-fonte em linguagem de máquina, exclusivamente.',
            'criptografia de discos, com dispensa de software específico.',
            'roteamento de pacotes entre redes distintas.',
          ],
          correta: 0,
          expl: 'Editar textos e planilhas é tarefa de **software aplicativo**; compilação é função de compiladores; roteamento entre redes é atribuição de roteadores. O SO faz a mediação entre hardware e aplicações.',
          tags: ['sistema operacional'],
        },
      ],
    },

    {
      id: 'inf-2',
      titulo: 'Internet, redes e aplicativos de escritório',
      subtitulo: 'Navegação, correio eletrônico, textos e planilhas',
      topicos: ['Redes e protocolos', 'Navegadores', 'Correio eletrônico', 'Editor de texto', 'Planilhas'],
      aula: {
        intro: 'Deste nível saem as questões mais fáceis da prova inteira. Não é lugar para errar, {nome}.',
        blocos: [
          {
            t: 'Redes e protocolos',
            lista: [
              '**LAN** (local), **MAN** (metropolitana), **WAN** (ampla). **Intranet** é rede interna com tecnologias da internet; **extranet** estende o acesso a parceiros externos autorizados.',
              '**HTTP/HTTPS**: transferência de hipertexto; o **S** indica criptografia por TLS.',
              '**SMTP** envia e-mail; **POP3** baixa e (por padrão) remove do servidor; **IMAP** sincroniza mantendo as mensagens no servidor.',
              '**DNS** traduz nomes em endereços IP. **DHCP** distribui IPs automaticamente. **FTP/SFTP** transferem arquivos. **TCP/IP** é a pilha base.',
              '**VPN** cria túnel criptografado sobre rede pública. **Firewall** filtra tráfego conforme regras. **Proxy** intermedeia requisições.',
            ],
          },
          {
            t: 'Navegadores e correio',
            p: [
              '**Cookies** armazenam preferências e sessões; **cache** guarda cópias locais para acelerar carregamento. **Navegação privativa** não salva histórico local, mas **não torna o usuário anônimo** para o provedor, o empregador ou os sites.',
              'Campos de e-mail: **Para**, **Cc** (cópia visível) e **Cco/Bcc** (cópia oculta — os demais destinatários não veem quem está em Cco). "Responder a todos" alcança remetente e destinatários visíveis, não os que estavam em Cco.',
            ],
          },
          {
            t: 'Editor de texto',
            lista: [
              '**Estilos** aplicam formatação consistente e alimentam o **sumário automático**.',
              '**Quebra de página** x **quebra de seção**: a seção permite mudar orientação, margens, cabeçalho e numeração em partes distintas do mesmo documento.',
              '**Controle de alterações** e **comentários** viabilizam revisão colaborativa.',
              '**Mala direta** combina documento-modelo com fonte de dados para gerar cópias personalizadas.',
              'Formatos: `.docx` (padrão OOXML), `.odt` (OpenDocument), `.pdf` (formato de publicação, não de edição).',
            ],
          },
          {
            t: 'Planilhas — o que sempre cai',
            lista: [
              'Referência **relativa** (`A1`) muda ao copiar; **absoluta** (`$A$1`) não muda; **mista** (`$A1`, `A$1`) fixa apenas linha ou coluna.',
              'Funções essenciais: `SOMA`, `MÉDIA`, `MÁXIMO`, `MÍNIMO`, `CONT.NÚM`, `CONT.VALORES`, `CONT.SE`, `SOMASE`, `SE`, `E`, `OU`, `PROCV`/`BUSCAVERT`, `ÍNDICE`+`CORRESP`, `CONCATENAR`, `ARRED`.',
              '`SE(condição; valor_se_verdadeiro; valor_se_falso)` — pode ser aninhada.',
              'Erros comuns: `#DIV/0!` (divisão por zero), `#N/D` (valor não encontrado), `#REF!` (referência inválida), `#VALOR!` (tipo incompatível), `#NOME?` (nome de função inexistente).',
              'Intervalo com dois-pontos (`A1:A10`) e união com ponto e vírgula (`A1;A10`).',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'POP3 x IMAP', txt: '<b>POP3</b> baixa as mensagens e, por padrão, apaga do servidor — ruim para quem usa vários dispositivos. <b>IMAP</b> sincroniza e mantém no servidor. Questão sobre acesso multiplataforma quase sempre pede IMAP.' },
          { tipo: 'dica', rot: 'Navegação privativa', txt: 'Ela não deixa rastro <b>no computador</b>. Não esconde nada do provedor de internet, do site visitado nem da rede corporativa. Alternativa que fale em "anonimato completo" está errada.' },
        ],
        resumo: [
          'SMTP envia; POP3 baixa e remove; IMAP sincroniza.',
          'Cco oculta destinatários; "responder a todos" não os alcança.',
          '$ fixa referência em planilha; quebra de seção permite formatação independente.',
          'Erros: #DIV/0!, #N/D, #REF!, #VALOR!, #NOME?.',
        ],
      },
      questoes: [
        {
          id: 'inf2-01', dif: 2, tipo: 'multipla',
          enunciado: 'O protocolo utilizado para o envio de mensagens de correio eletrônico é o',
          alts: ['SMTP.', 'POP3.', 'IMAP.', 'DNS.', 'FTP.'],
          correta: 0,
          expl: 'SMTP (Simple Mail Transfer Protocol) envia. POP3 e IMAP servem ao **recebimento**: o primeiro baixa e remove do servidor; o segundo sincroniza mantendo as mensagens no servidor.',
          tags: ['protocolos'],
        },
        {
          id: 'inf2-02', dif: 3, tipo: 'multipla',
          enunciado: 'Em uma planilha eletrônica, a fórmula da célula B1 é `=$A$1*2`. Ao copiá-la para a célula B5, a fórmula resultante será',
          alts: ['`=$A$1*2`', '`=$A$5*2`', '`=A5*2`', '`=$A$1*10`', '`=A1*2`'],
          correta: 0,
          expl: 'O `$` fixa linha e coluna: a referência absoluta não se altera ao copiar. Se fosse `=A1*2` (relativa), passaria a `=A5*2`; se fosse `=A$1*2`, permaneceria na linha 1 mas a coluna acompanharia o deslocamento horizontal.',
          tags: ['planilhas', 'referências'],
        },
        {
          id: 'inf2-03', dif: 3, tipo: 'ce',
          base: 'A navegação privativa (ou anônima) impede que o provedor de acesso à internet e os sites visitados identifiquem a atividade do usuário.',
          enunciado: 'Julgue a afirmação.',
          correta: 1,
          expl: 'ERRADO. O modo privativo apenas evita o registro **local** de histórico, cookies e dados de formulário. Provedor, empregador, rede e sites visitados continuam podendo identificar a atividade.',
          tags: ['navegadores'],
        },
        {
          id: 'inf2-04', dif: 3, tipo: 'multipla',
          enunciado: 'Ao enviar mensagem de correio eletrônico com destinatários no campo Cco,',
          alts: [
            'os endereços em Cco não são visíveis aos demais destinatários da mensagem.',
            'todos os destinatários visualizam os endereços em Cco.',
            'a mensagem é enviada apenas aos endereços em Cco, ignorando os campos Para e Cc.',
            'os destinatários em Cco não recebem a mensagem, apenas o registro do envio.',
            'a função "responder a todos" alcança obrigatoriamente os endereços em Cco.',
          ],
          correta: 0,
          expl: 'Cco = cópia carbono oculta. Os destinatários em Cco recebem a mensagem, mas seus endereços permanecem invisíveis aos demais — e "responder a todos" não os inclui.',
          tags: ['correio eletrônico'],
        },
        {
          id: 'inf2-05', dif: 3, tipo: 'multipla',
          enunciado: 'O erro `#DIV/0!` em uma planilha eletrônica indica que',
          alts: [
            'a fórmula tenta dividir um valor por zero ou por célula vazia.',
            'a função utilizada não existe ou está escrita incorretamente.',
            'a referência de célula foi excluída ou é inválida.',
            'o tipo de dado é incompatível com a operação.',
            'o valor procurado não foi encontrado no intervalo.',
          ],
          correta: 0,
          expl: 'As demais correspondem, respectivamente, a `#NOME?`, `#REF!`, `#VALOR!` e `#N/D`. Reconhecer o erro pelo nome é ponto rápido e recorrente.',
          tags: ['planilhas', 'erros'],
        },
        {
          id: 'inf2-06', dif: 3, tipo: 'multipla',
          enunciado: 'Em um editor de textos, o recurso que permite aplicar orientação de página, margens e numeração distintas em partes diferentes do mesmo documento é a',
          alts: ['quebra de seção.', 'quebra de página.', 'quebra de linha automática.', 'divisão em colunas.', 'inserção de sumário automático.'],
          correta: 0,
          expl: 'A quebra de **seção** cria blocos com formatação independente. A quebra de **página** apenas empurra o conteúdo para a página seguinte, mantendo a formatação da seção.',
          tags: ['editor de texto'],
        },
      ],
    },

    {
      id: 'inf-3',
      titulo: 'Segurança da informação',
      subtitulo: 'Ameaças, boas práticas, backup e LGPD',
      topicos: ['Princípios da segurança', 'Malware', 'Engenharia social', 'Backup', 'LGPD'],
      aula: {
        intro: 'Último nível da matéria. Segurança da informação é o tema que mais cresceu nas provas — e o mais útil na vida real.',
        blocos: [
          {
            t: 'Os princípios (CID + 2)',
            lista: [
              '**Confidencialidade**: só quem tem autorização acessa.',
              '**Integridade**: a informação não é alterada indevidamente.',
              '**Disponibilidade**: a informação está acessível quando necessária.',
              '**Autenticidade**: a origem é comprovada.',
              '**Irretratabilidade / não repúdio**: o autor não pode negar a autoria.',
            ],
          },
          {
            t: 'Ameaças — nomes certos',
            lista: [
              '**Vírus**: precisa de hospedeiro e de ação do usuário para se propagar.',
              '**Worm**: propaga-se **automaticamente** pela rede, sem hospedeiro.',
              '**Trojan (cavalo de Troia)**: disfarça-se de programa legítimo e abre porta para outras ações.',
              '**Ransomware**: criptografa dados e exige resgate — a defesa efetiva é **backup íntegro e isolado**.',
              '**Spyware / keylogger / screenlogger**: coleta informações; o keylogger captura teclas, o screenlogger, a tela.',
              '**Botnet**: rede de máquinas zumbis usada em ataques coordenados.',
              '**Phishing**: fraude por mensagem que imita entidade confiável. **Pharming** redireciona o acesso por manipulação de DNS. **Spear phishing** é dirigido a alvo específico.',
              '**Engenharia social**: manipulação da pessoa, não da máquina. É o vetor mais eficaz — e nenhum antivírus a bloqueia.',
            ],
          },
          {
            t: 'Boas práticas e criptografia',
            p: [
              '**Autenticação multifator (MFA)**: combina o que você sabe (senha), o que você tem (token, celular) e o que você é (biometria).',
              '**Criptografia simétrica** usa a mesma chave para cifrar e decifrar (rápida). **Assimétrica** usa par de chaves — pública e privada.',
              '**Assinatura digital**: cifra-se o resumo (hash) do documento com a **chave privada** do signatário; quem verifica usa a **chave pública**. Garante autenticidade, integridade e não repúdio — não confidencialidade.',
              '**Certificado digital**: emitido por autoridade certificadora, vincula identidade a uma chave pública (no Brasil, ICP-Brasil).',
            ],
          },
          {
            t: 'Backup',
            lista: [
              '**Completo (full)**: copia todos os dados; restauração simples, maior volume.',
              '**Incremental**: copia o que mudou desde o **último backup de qualquer tipo**; menor volume, restauração exige a cadeia inteira.',
              '**Diferencial**: copia o que mudou desde o **último backup completo**; volume intermediário, restauração exige apenas o completo + o último diferencial.',
              '**Regra 3-2-1**: três cópias, em dois tipos de mídia, sendo uma fora do local — proteção clássica contra ransomware e desastre físico.',
            ],
          },
          {
            t: 'LGPD em quatro linhas',
            p: [
              'Aplica-se ao tratamento de **dados pessoais**. Exige **base legal** (consentimento, cumprimento de obrigação legal, execução de políticas públicas, legítimo interesse, entre outras) e observância de princípios como finalidade, adequação, necessidade, transparência e segurança.',
              '**Dados sensíveis** (origem racial, convicção religiosa, opinião política, saúde, vida sexual, dado genético ou biométrico) recebem proteção reforçada.',
              'Direitos do titular: confirmação, acesso, correção, anonimização, portabilidade, eliminação e revogação do consentimento. Fiscalização: **ANPD**.',
            ],
          },
        ],
        destaques: [
          { tipo: 'perigo', rot: 'Vírus x worm', txt: '<b>Vírus</b> depende de hospedeiro e de ação do usuário. <b>Worm</b> se autopropaga pela rede sem intervenção. Trocar os dois é o erro mais comum da matéria.' },
          { tipo: 'dica', rot: 'Assinatura digital', txt: 'Assina-se com a chave <b>privada</b> e verifica-se com a <b>pública</b>. Para <b>cifrar</b> uma mensagem a alguém, usa-se a chave <b>pública do destinatário</b>. Duas operações opostas com o mesmo par de chaves.' },
        ],
        resumo: [
          'Princípios: confidencialidade, integridade, disponibilidade, autenticidade e não repúdio.',
          'Worm se autopropaga; ransomware exige resgate; engenharia social ataca a pessoa.',
          'Incremental parte do último backup; diferencial parte do último completo.',
          'LGPD: base legal, princípios, dados sensíveis e direitos do titular; fiscalização pela ANPD.',
        ],
      },
      questoes: [
        {
          id: 'inf3-01', dif: 2, tipo: 'multipla',
          enunciado: 'O código malicioso capaz de se propagar automaticamente pela rede, sem necessidade de hospedeiro ou de ação do usuário, é o',
          alts: ['worm.', 'vírus.', 'cavalo de Troia.', 'spyware.', 'adware.'],
          correta: 0,
          expl: 'Worm explora vulnerabilidades e se replica sozinho. O vírus precisa de arquivo hospedeiro e de execução pelo usuário; o trojan se disfarça; o spyware coleta dados; o adware exibe publicidade.',
          tags: ['malware'],
        },
        {
          id: 'inf3-02', dif: 3, tipo: 'multipla',
          enunciado: 'A prática de obter informações confidenciais por meio da manipulação psicológica de pessoas, e não da exploração de falhas técnicas, denomina-se',
          alts: ['engenharia social.', 'força bruta.', 'injeção de código.', 'varredura de portas.', 'negação de serviço.'],
          correta: 0,
          expl: 'Engenharia social explora confiança, pressa e autoridade. Nenhum antivírus a impede — por isso a defesa é treinamento, verificação de identidade e cultura de segurança.',
          tags: ['engenharia social'],
        },
        {
          id: 'inf3-03', dif: 3, tipo: 'multipla',
          enunciado: 'No backup do tipo diferencial, são copiados os dados alterados desde o',
          alts: [
            'último backup completo.',
            'último backup de qualquer tipo.',
            'início da operação do sistema.',
            'último backup incremental, exclusivamente.',
            'último acesso do usuário ao arquivo.',
          ],
          correta: 0,
          expl: 'Diferencial toma como referência o último **completo**; o **incremental** toma o último backup de qualquer tipo. Consequência prática: restaurar um diferencial exige apenas o completo + o último diferencial; o incremental exige toda a cadeia.',
          tags: ['backup'],
        },
        {
          id: 'inf3-04', dif: 3, tipo: 'ce',
          base: 'Na assinatura digital, o signatário utiliza sua chave privada para assinar o documento, e o destinatário utiliza a chave pública do signatário para verificar a assinatura.',
          enunciado: 'Julgue a afirmação.',
          correta: 0,
          expl: 'CERTO. A assinatura digital garante autenticidade, integridade e não repúdio. Não garante **confidencialidade** — para isso, o conteúdo deve ser cifrado com a chave pública do destinatário.',
          tags: ['criptografia'],
        },
        {
          id: 'inf3-05', dif: 3, tipo: 'multipla',
          enunciado: 'Segundo a LGPD, são considerados dados pessoais sensíveis, entre outros, os relativos a',
          alts: [
            'convicção religiosa, opinião política, saúde e dado biométrico.',
            'nome completo, endereço residencial e número de telefone.',
            'histórico de compras e preferências de consumo.',
            'endereço de correio eletrônico corporativo.',
            'número de matrícula funcional e cargo ocupado.',
          ],
          correta: 0,
          expl: 'Art. 5º, II, da Lei 13.709/2018: origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou organização de caráter religioso/filosófico/político, dado referente à saúde ou à vida sexual, dado genético ou biométrico. As demais alternativas trazem dados pessoais **comuns**.',
          tags: ['LGPD'],
        },
        {
          id: 'inf3-06', dif: 3, tipo: 'multipla',
          enunciado: 'A defesa mais eficaz contra a perda de dados provocada por ataque de ransomware é',
          alts: [
            'a manutenção de cópias de segurança íntegras e isoladas da rede principal.',
            'o pagamento do resgate exigido pelos atacantes.',
            'a instalação exclusiva de antivírus gratuito.',
            'a desativação permanente do firewall para facilitar a recuperação.',
            'o armazenamento de todos os arquivos em uma única unidade de rede compartilhada.',
          ],
          correta: 0,
          expl: 'Ransomware criptografa dados; se existe backup íntegro e **isolado** (offline ou imutável), restaura-se sem pagar. Pagar não garante a chave e financia a atividade criminosa. A regra 3-2-1 é a boa prática de referência.',
          tags: ['ransomware', 'backup'],
        },
      ],
    },
  ],
};
