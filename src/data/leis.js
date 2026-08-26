/* ============================================================
   MODO LEI SECA — dispositivos com lacunas
   ------------------------------------------------------------
   A Câmara cobra letra de lei. Aqui o treino é o mais direto
   possível: o dispositivo aparece com os termos-chave vazados e
   você recompõe o texto.

   FORMATO
     texto        — o dispositivo, com os termos a vazar entre {{ }}
     distratores  — alternativas plausíveis (sinônimos jurídicos,
                    prazos e quóruns vizinhos) que entram no banco
                    de fichas junto das respostas certas
     comentario   — o que a banca costuma trocar nesse dispositivo

   Vaze sempre o que a banca troca: números, prazos, quóruns,
   maiorias, e o par de palavras que inverte o sentido.

   ⚠️ Os textos foram transcritos para estudo. Quando o edital
   sair, confira cada dispositivo contra a fonte oficial antes de
   confiar cegamente — sobretudo os que sofreram emenda recente.
   ============================================================ */

export const LEIS = [
  {
    id: 'cf88',
    nome: 'Constituição Federal de 1988',
    curto: 'CF/88',
    mat: 'constitucional',
    ico: '⚖️',
    dispositivos: [
      {
        id: 'cf-1',
        ref: 'CF/88, art. 1º',
        texto: 'A República Federativa do Brasil, formada pela união {{indissolúvel}} dos Estados e Municípios e do Distrito Federal, constitui-se em Estado Democrático de Direito e tem como fundamentos: I - a soberania; II - a {{cidadania}}; III - a dignidade da pessoa humana; IV - os valores sociais do trabalho e da livre iniciativa; V - o {{pluralismo político}}.',
        distratores: ['indivisível', 'nacionalidade', 'pluripartidarismo', 'soberania popular'],
        comentario: 'A troca clássica é misturar os **fundamentos** do art. 1º (substantivos — o que a República É) com os **objetivos** do art. 3º (verbos no infinitivo — o que ela QUER). "Erradicar a pobreza" é objetivo, nunca fundamento.',
      },
      {
        id: 'cf-3',
        ref: 'CF/88, art. 3º',
        texto: 'Constituem objetivos fundamentais da República Federativa do Brasil: I - {{construir}} uma sociedade livre, justa e solidária; II - {{garantir}} o desenvolvimento nacional; III - {{erradicar}} a pobreza e a marginalização e reduzir as desigualdades sociais e regionais; IV - promover o bem de todos, sem preconceitos.',
        distratores: ['assegurar', 'edificar', 'combater', 'promover'],
        comentario: 'Todos os incisos do art. 3º começam com **verbo no infinitivo**. Se a alternativa traz substantivo, saiu do art. 1º.',
      },
      {
        id: 'cf-5-lvii',
        ref: 'CF/88, art. 5º, LVII',
        texto: 'ninguém será considerado culpado até o {{trânsito em julgado}} de sentença penal {{condenatória}}',
        distratores: ['início da execução', 'acórdão', 'absolutória', 'esgotamento das instâncias ordinárias'],
        comentario: 'A banca troca "trânsito em julgado" por "condenação em segunda instância" ou "esgotamento das instâncias ordinárias". O texto constitucional não admite nenhum dos dois.',
      },
      {
        id: 'cf-5-lxviii',
        ref: 'CF/88, art. 5º, LXVIII',
        texto: 'conceder-se-á {{habeas corpus}} sempre que alguém sofrer ou se achar ameaçado de sofrer violência ou coação em sua liberdade de {{locomoção}}, por ilegalidade ou {{abuso de poder}}',
        distratores: ['mandado de segurança', 'expressão', 'desvio de finalidade', 'consciência'],
        comentario: 'Liberdade de **locomoção** é o objeto do HC. Direito líquido e certo *não* amparado por HC ou habeas data é mandado de segurança (LXIX).',
      },
      {
        id: 'cf-5-lxxi',
        ref: 'CF/88, art. 5º, LXXI',
        texto: 'conceder-se-á {{mandado de injunção}} sempre que a falta de norma {{regulamentadora}} torne inviável o exercício dos direitos e liberdades constitucionais e das prerrogativas inerentes à nacionalidade, à soberania e à cidadania',
        distratores: ['mandado de segurança', 'ação direta de inconstitucionalidade', 'complementar', 'ordinária'],
        comentario: 'Mandado de injunção ataca **omissão** normativa no caso concreto. Não confunda com a ADI por omissão, que é controle abstrato.',
      },
      {
        id: 'cf-5-lxxiii',
        ref: 'CF/88, art. 5º, LXXIII',
        texto: 'qualquer {{cidadão}} é parte legítima para propor ação popular que vise a anular ato lesivo ao patrimônio público ou de entidade de que o Estado participe, à {{moralidade administrativa}}, ao meio ambiente e ao patrimônio histórico e cultural, ficando o autor, salvo comprovada {{má-fé}}, isento de custas judiciais e do ônus da sucumbência',
        distratores: ['pessoa', 'brasileiro nato', 'probidade', 'dolo', 'culpa'],
        comentario: 'É **cidadão** (eleitor, com título), não "qualquer pessoa". E a isenção de custas cai quando há **má-fé** comprovada.',
      },
      {
        id: 'cf-37-caput',
        ref: 'CF/88, art. 37, caput',
        texto: 'A administração pública direta e indireta de qualquer dos Poderes da União, dos Estados, do Distrito Federal e dos Municípios obedecerá aos princípios de {{legalidade}}, {{impessoalidade}}, moralidade, {{publicidade}} e eficiência',
        distratores: ['razoabilidade', 'finalidade', 'supremacia', 'motivação', 'economicidade'],
        comentario: 'LIMPE. **Eficiência** entrou pela EC 19/1998 — antes dela eram quatro. Razoabilidade e motivação são princípios reconhecidos, mas não estão no caput do art. 37.',
      },
      {
        id: 'cf-37-ii',
        ref: 'CF/88, art. 37, II',
        texto: 'a investidura em cargo ou emprego público depende de aprovação prévia em {{concurso público}} de provas ou de provas e {{títulos}}, de acordo com a natureza e a complexidade do cargo ou emprego, na forma prevista em lei, ressalvadas as nomeações para cargo em {{comissão}} declarado em lei de livre nomeação e exoneração',
        distratores: ['processo seletivo', 'certificados', 'confiança', 'função gratificada'],
        comentario: 'Só o cargo **em comissão** escapa do concurso. Função de confiança é exclusiva de servidor efetivo — a banca inverte os dois o tempo todo.',
      },
      {
        id: 'cf-37-iii',
        ref: 'CF/88, art. 37, III',
        texto: 'o prazo de validade do concurso público será de até {{dois anos}}, prorrogável {{uma vez}}, por igual período',
        distratores: ['quatro anos', 'um ano', 'duas vezes', 'por metade do período'],
        comentario: 'Até dois anos, prorrogável **uma única vez** por igual período: no máximo quatro anos no total.',
      },
      {
        id: 'cf-44',
        ref: 'CF/88, art. 44',
        texto: 'O Poder Legislativo é exercido pelo Congresso Nacional, que se compõe da Câmara dos Deputados e do Senado Federal. Parágrafo único. Cada {{legislatura}} terá a duração de {{quatro anos}}.',
        distratores: ['sessão legislativa', 'oito anos', 'dois anos', 'sessão ordinária'],
        comentario: '**Legislatura** = 4 anos. **Sessão legislativa** = 1 ano. **Período legislativo** = cada semestre. A troca desses três termos é a pegadinha mais barata do Processo Legislativo.',
      },
      {
        id: 'cf-45',
        ref: 'CF/88, art. 45',
        texto: 'A Câmara dos Deputados compõe-se de representantes do {{povo}}, eleitos pelo sistema {{proporcional}}, em cada Estado, em cada Território e no Distrito Federal.',
        distratores: ['Estados', 'majoritário', 'distrital misto', 'da Federação'],
        comentario: 'Câmara = povo, proporcional. Senado = Estados e DF, majoritário. Trocar os dois é o erro mais comum da matéria.',
      },
      {
        id: 'cf-46',
        ref: 'CF/88, art. 46, §1º',
        texto: 'O Senado Federal compõe-se de representantes dos Estados e do Distrito Federal, eleitos segundo o princípio {{majoritário}}. Cada Estado e o Distrito Federal elegerão {{três}} Senadores, com mandato de {{oito anos}}.',
        distratores: ['proporcional', 'dois', 'quatro anos', 'cinco'],
        comentario: 'Três senadores por unidade, mandato de oito anos, renovação alternada de um e dois terços a cada quatro anos.',
      },
      {
        id: 'cf-47',
        ref: 'CF/88, art. 47',
        texto: 'Salvo disposição constitucional em contrário, as deliberações de cada Casa e de suas Comissões serão tomadas por {{maioria dos votos}}, presente a {{maioria absoluta}} de seus membros.',
        distratores: ['maioria absoluta', 'dois terços', 'maioria simples dos presentes', 'três quintos'],
        comentario: 'É a regra da **maioria simples** (relativa) para deliberar, com quórum de presença de maioria absoluta. Quem inverte as duas erra a questão inteira.',
      },
      {
        id: 'cf-57',
        ref: 'CF/88, art. 57',
        texto: 'O Congresso Nacional reunir-se-á, anualmente, na Capital Federal, de {{2 de fevereiro}} a 17 de julho e de {{1º de agosto}} a 22 de dezembro.',
        distratores: ['15 de fevereiro', '1º de fevereiro', '15 de agosto', '31 de julho'],
        comentario: 'Datas do art. 57 caem literalmente. A **sessão preparatória** para posse e eleição das Mesas é a partir de 1º de fevereiro, no primeiro ano da legislatura — não confunda com o início da sessão legislativa.',
      },
      {
        id: 'cf-57-4',
        ref: 'CF/88, art. 57, §4º',
        texto: 'Cada uma das Casas reunir-se-á em sessões preparatórias, a partir de 1º de fevereiro, no primeiro ano da legislatura, para a posse de seus membros e eleição das respectivas Mesas, para mandato de {{2 anos}}, {{vedada}} a recondução para o mesmo cargo na eleição imediatamente subsequente.',
        distratores: ['4 anos', '1 ano', 'permitida', 'admitida uma única vez'],
        comentario: 'Mandato da Mesa: 2 anos, vedada recondução **para o mesmo cargo** na eleição imediatamente subsequente — nada impede concorrer a outro cargo da Mesa.',
      },
      {
        id: 'cf-60-i',
        ref: 'CF/88, art. 60, I a III',
        texto: 'A Constituição poderá ser emendada mediante proposta: I - de {{um terço}}, no mínimo, dos membros da Câmara dos Deputados ou do Senado Federal; II - do {{Presidente da República}}; III - de mais da {{metade}} das Assembleias Legislativas das unidades da Federação, manifestando-se, cada uma delas, pela maioria relativa de seus membros.',
        distratores: ['um quinto', 'dois terços', 'Procurador-Geral da República', 'terça parte'],
        comentario: 'Iniciativa de PEC é **taxativa**: 1/3 de uma das Casas, Presidente da República ou mais da metade das Assembleias. Cidadão não propõe PEC — iniciativa popular só alcança lei.',
      },
      {
        id: 'cf-60-2',
        ref: 'CF/88, art. 60, §2º',
        texto: 'A proposta será discutida e votada em cada Casa do Congresso Nacional, em {{dois turnos}}, considerando-se aprovada se obtiver, em ambos, {{três quintos}} dos votos dos respectivos membros.',
        distratores: ['um turno', 'dois terços', 'maioria absoluta', 'turno único'],
        comentario: 'PEC: dois turnos, 3/5 em cada Casa. Lei complementar: turno único, maioria absoluta. Lei ordinária: maioria simples. Essa escada cai em toda prova.',
      },
      {
        id: 'cf-60-4',
        ref: 'CF/88, art. 60, §4º',
        texto: 'Não será objeto de {{deliberação}} a proposta de emenda {{tendente a abolir}}: I - a forma federativa de Estado; II - o voto direto, secreto, universal e periódico; III - a {{separação dos Poderes}}; IV - os direitos e garantias individuais.',
        distratores: ['votação', 'que abola', 'sistema de governo', 'forma republicana', 'promulgação'],
        comentario: 'Cláusulas pétreas vedam emenda **tendente a abolir**, não qualquer alteração. E note: forma **republicana** de governo não é cláusula pétrea do §4º — forma **federativa** de Estado é.',
      },
      {
        id: 'cf-60-5',
        ref: 'CF/88, art. 60, §5º',
        texto: 'A matéria constante de proposta de emenda rejeitada ou havida por prejudicada não pode ser objeto de nova proposta na {{mesma sessão legislativa}}.',
        distratores: ['mesma legislatura', 'mesma sessão ordinária', 'legislatura seguinte'],
        comentario: 'PEC rejeitada: irrepetibilidade **absoluta** na mesma sessão legislativa. Projeto de lei rejeitado (art. 67) é **relativa** — pode voltar mediante proposta da maioria absoluta dos membros de qualquer das Casas.',
      },
      {
        id: 'cf-62',
        ref: 'CF/88, art. 62, caput e §3º',
        texto: 'Em caso de {{relevância e urgência}}, o Presidente da República poderá adotar medidas provisórias, com força de lei, devendo submetê-las de imediato ao Congresso Nacional. As medidas provisórias perderão eficácia, desde a {{edição}}, se não forem convertidas em lei no prazo de {{sessenta dias}}, prorrogável uma vez por igual período.',
        distratores: ['relevância ou urgência', 'publicação', 'trinta dias', 'cento e vinte dias'],
        comentario: 'São requisitos **cumulativos**: relevância *e* urgência. A perda de eficácia é *ex tunc* — desde a edição, não da rejeição.',
      },
      {
        id: 'cf-66',
        ref: 'CF/88, art. 66, §1º e §4º',
        texto: 'Se o Presidente da República considerar o projeto, no todo ou em parte, inconstitucional ou contrário ao interesse público, vetá-lo-á total ou parcialmente, no prazo de {{quinze dias úteis}}. O veto será apreciado em {{sessão conjunta}}, dentro de trinta dias a contar de seu recebimento, só podendo ser rejeitado pelo voto da {{maioria absoluta}} dos Deputados e Senadores.',
        distratores: ['dez dias úteis', 'quinze dias corridos', 'sessões separadas', 'dois terços', 'maioria simples'],
        comentario: 'Quinze dias **úteis** para vetar; silêncio importa sanção tácita. Derrubada do veto: maioria **absoluta**, em sessão conjunta e votação aberta.',
      },
      {
        id: 'cf-69',
        ref: 'CF/88, art. 69',
        texto: 'As leis complementares serão aprovadas por {{maioria absoluta}}.',
        distratores: ['maioria simples', 'três quintos', 'dois terços'],
        comentario: 'A única diferença formal entre lei complementar e ordinária é o **quórum** (absoluta x simples) — além da matéria expressamente reservada pela Constituição. Não há hierarquia entre elas.',
      },
    ],
  },

  {
    id: 'l8112',
    nome: 'Lei 8.112/1990 — Regime Jurídico dos Servidores',
    curto: 'Lei 8.112',
    mat: 'administrativo',
    ico: '📋',
    dispositivos: [
      {
        id: '8112-20',
        ref: 'Lei 8.112/90, art. 20',
        texto: 'Ao entrar em exercício, o servidor nomeado para cargo de provimento efetivo ficará sujeito a {{estágio probatório}} por período de {{24 (vinte e quatro) meses}}, durante o qual a sua aptidão e capacidade serão objeto de avaliação para o desempenho do cargo.',
        distratores: ['período de experiência', '36 (trinta e seis) meses', '12 (doze) meses'],
        comentario: 'A lei diz 24 meses; a estabilidade do art. 41 da CF vem aos **3 anos**. A jurisprudência alinhou o estágio a 3 anos, mas em prova de letra de lei vale o texto do art. 20.',
      },
      {
        id: '8112-127',
        ref: 'Lei 8.112/90, art. 127',
        texto: 'São penalidades disciplinares: I - {{advertência}}; II - {{suspensão}}; III - demissão; IV - cassação de aposentadoria ou disponibilidade; V - {{destituição de cargo em comissão}}; VI - destituição de função comissionada.',
        distratores: ['repreensão', 'multa', 'exoneração', 'afastamento preventivo'],
        comentario: 'O rol é **taxativo**. Multa não é penalidade disciplinar da 8.112, e **exoneração** não é punição — é forma de vacância.',
      },
      {
        id: '8112-130',
        ref: 'Lei 8.112/90, art. 130',
        texto: 'A penalidade de suspensão será aplicada em caso de reincidência das faltas punidas com advertência e de violação das demais proibições que não tipifiquem infração sujeita a penalidade de demissão, não podendo exceder de {{90 (noventa) dias}}.',
        distratores: ['30 (trinta) dias', '60 (sessenta) dias', '15 (quinze) dias'],
        comentario: 'Teto de 90 dias. Quando houver conveniência para o serviço, a suspensão pode ser convertida em **multa** de 50% da remuneração, com o servidor permanecendo em exercício.',
      },
      {
        id: '8112-142',
        ref: 'Lei 8.112/90, art. 142',
        texto: 'A ação disciplinar prescreverá: I - em {{5 (cinco) anos}}, quanto às infrações puníveis com demissão, cassação de aposentadoria ou disponibilidade e destituição de cargo em comissão; II - em {{2 (dois) anos}}, quanto à suspensão; III - em {{180 (cento e oitenta) dias}}, quanto à advertência.',
        distratores: ['10 (dez) anos', '3 (três) anos', '1 (um) ano', '90 (noventa) dias'],
        comentario: '5 / 2 / 180. Os prazos são contados da data em que o fato se tornou **conhecido**, e a abertura de sindicância ou instauração de PAD interrompe a prescrição.',
      },
    ],
  },

  {
    id: 'l9784',
    nome: 'Lei 9.784/1999 — Processo Administrativo',
    curto: 'Lei 9.784',
    mat: 'administrativo',
    ico: '📑',
    dispositivos: [
      {
        id: '9784-24',
        ref: 'Lei 9.784/99, art. 24',
        texto: 'Inexistindo disposição específica, os atos do órgão ou autoridade responsável pelo processo e dos administrados que dele participem devem ser praticados no prazo de {{cinco dias}}, salvo motivo de {{força maior}}. Parágrafo único. O prazo previsto neste artigo pode ser dilatado até o dobro, mediante comprovada justificação.',
        distratores: ['dez dias', 'trinta dias', 'caso fortuito', 'relevante interesse público'],
        comentario: 'Cinco dias, dilatáveis até o **dobro** com justificação comprovada.',
      },
      {
        id: '9784-49',
        ref: 'Lei 9.784/99, art. 49',
        texto: 'Concluída a instrução de processo administrativo, a Administração tem o prazo de até {{trinta dias}} para decidir, salvo prorrogação por {{igual período}} expressamente {{motivada}}.',
        distratores: ['quinze dias', 'sessenta dias', 'metade do período', 'justificada pelo interessado'],
        comentario: 'Trinta dias, prorrogáveis por mais trinta, desde que a prorrogação seja **expressamente motivada**.',
      },
      {
        id: '9784-54',
        ref: 'Lei 9.784/99, art. 54',
        texto: 'O direito da Administração de {{anular}} os atos administrativos de que decorram efeitos favoráveis para os destinatários {{decai}} em {{cinco anos}}, contados da data em que foram praticados, salvo comprovada {{má-fé}}.',
        distratores: ['revogar', 'prescreve', 'dez anos', 'dolo', 'convalidar'],
        comentario: 'É **decadência** de cinco anos, e só corre para atos que geraram efeitos favoráveis e sem má-fé comprovada. Revogação, por conveniência e oportunidade, não tem esse prazo.',
      },
      {
        id: '9784-59',
        ref: 'Lei 9.784/99, art. 59',
        texto: 'Salvo disposição legal específica, é de {{dez dias}} o prazo para interposição de recurso administrativo, contado a partir da ciência ou divulgação oficial da decisão recorrida. O recurso deve ser decidido no prazo máximo de {{trinta dias}}, a partir do recebimento dos autos pelo órgão competente.',
        distratores: ['cinco dias', 'quinze dias', 'sessenta dias', 'quarenta e cinco dias'],
        comentario: 'Interpor: 10 dias. Decidir: 30 dias, prorrogáveis por igual período mediante justificativa explícita. O recurso tramita por, no máximo, **três** instâncias administrativas.',
      },
    ],
  },

  {
    id: 'lc95',
    nome: 'LC 95/1998 — Elaboração das Leis',
    curto: 'LC 95',
    mat: 'tecnica_legislativa',
    ico: '✒️',
    dispositivos: [
      {
        id: 'lc95-10',
        ref: 'LC 95/98, art. 10',
        texto: 'Os textos legais serão articulados com observância dos seguintes princípios: a unidade básica de articulação será o {{artigo}}, indicado pela abreviatura "Art."; os artigos desdobrar-se-ão em {{parágrafos}} ou em {{incisos}}; os parágrafos e os incisos, em alíneas; e as alíneas, em {{itens}}.',
        distratores: ['capítulo', 'títulos', 'alíneas', 'seções', 'números'],
        comentario: 'A escada é **artigo → parágrafo/inciso → alínea → item**. Artigos até o nono são ordinais (art. 1º); do décimo em diante, cardinais (art. 10).',
      },
      {
        id: 'lc95-11',
        ref: 'LC 95/98, art. 11',
        texto: 'As disposições normativas serão redigidas com {{clareza}}, {{precisão}} e ordem lógica, buscando-se a uniformidade do tempo verbal em todo o texto e usando-se preferencialmente o tempo {{presente}} ou o futuro simples do presente.',
        distratores: ['concisão', 'impessoalidade', 'pretérito', 'subjuntivo'],
        comentario: 'Os três pilares do art. 11 são **clareza, precisão e ordem lógica**. Concisão e impessoalidade são princípios da redação oficial (Manual da Presidência), não do art. 11.',
      },
      {
        id: 'lc95-8',
        ref: 'LC 95/98, art. 8º',
        texto: 'A vigência da lei será indicada de forma expressa e de modo a contemplar prazo razoável para que dela se tenha amplo conhecimento, reservada a cláusula "entra em vigor na data de sua publicação" para as leis de {{pequena repercussão}}.',
        distratores: ['grande repercussão', 'natureza tributária', 'caráter temporário'],
        comentario: 'A cláusula de vigência imediata é reservada às leis de **pequena repercussão** — a regra geral é indicar prazo de *vacatio legis*.',
      },
    ],
  },
];

export const MAPA_LEIS = Object.fromEntries(LEIS.map((l) => [l.id, l]));

/** Índice de dispositivos: id -> { disp, lei }. */
export const INDICE_DISPOSITIVOS = (() => {
  const idx = {};
  for (const lei of LEIS) for (const d of lei.dispositivos) idx[d.id] = { disp: d, lei };
  return idx;
})();

export const TOTAL_DISPOSITIVOS = Object.keys(INDICE_DISPOSITIVOS).length;

/**
 * Separa o texto em pedaços, isolando as lacunas.
 * 'a {{b}} c' -> [{txt:'a '}, {lacuna:'b'}, {txt:' c'}]
 */
export function fatiar(texto) {
  const out = [];
  const re = /\{\{(.+?)\}\}/g;
  let i = 0, m;
  while ((m = re.exec(texto))) {
    if (m.index > i) out.push({ txt: texto.slice(i, m.index) });
    out.push({ lacuna: m[1] });
    i = m.index + m[0].length;
  }
  if (i < texto.length) out.push({ txt: texto.slice(i) });
  return out;
}

/** Só os termos vazados, na ordem em que aparecem. */
export function termos(disp) {
  return fatiar(disp.texto).filter((p) => p.lacuna).map((p) => p.lacuna);
}
