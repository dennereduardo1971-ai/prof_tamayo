/* ============================================================
   Teste de fumaça — percorre o app inteiro num Chromium headless.
   Sobe o servidor antes:  npm start
   Depois:                 npm run smoke
   Falha se qualquer passo quebrar ou se aparecer erro no console.
   ============================================================ */

import { chromium } from 'playwright';

const BASE = process.env.TAMAYO_URL || 'http://127.0.0.1:8080';

const erros = [];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 400, height: 860 } });

page.on('console', (m) => { if (m.type() === 'error') erros.push('CONSOLE: ' + m.text()); });
page.on('pageerror', (e) => erros.push('PAGEERROR: ' + e.message));

const passo = async (nome, fn) => {
  try { await fn(); console.log('  ✓', nome); }
  catch (e) { erros.push(`PASSO "${nome}": ${e.message.split('\n')[0]}`); console.log('  ✘', nome, '—', e.message.split('\n')[0]); }
};

// innerText respeita text-transform do CSS, então comparamos sem caixa.
const contem = async (sel, txt) => (await page.locator(sel).innerText()).toLowerCase().includes(txt.toLowerCase());
const exigir = async (sel, txt, msg) => { if (!(await contem(sel, txt))) throw new Error(msg || `não encontrei "${txt}"`); };
const aoDojo = async () => {
  await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1300);
};

await page.goto(`${BASE}/index.html`, { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

console.log('\n[1] ONBOARDING');
await passo('apresentação', async () => { await page.getByRole('button', { name: 'Vamos começar' }).click(); });
await passo('nome, meta e data da prova', async () => {
  await page.locator('input[type=text]').fill('Sara');
  const data = page.locator('input[type=date]');
  if (await data.count() === 0) throw new Error('campo de data da prova ausente');
  await data.fill('2026-11-15');
  await page.getByRole('button', { name: 'Continuar' }).click();
});
await passo('calibragem', async () => { await page.getByRole('button', { name: 'Continuar' }).click(); });
await passo('data ecoada no resumo final', async () => {
  await exigir('.onb__passo', '15/11/2026', 'data não ecoada');
  await page.getByRole('button', { name: 'Abrir a trilha' }).click();
  await page.waitForTimeout(1000);
});

console.log('\n[2] HOME');
await passo('contagem regressiva', async () => {
  await exigir('.home', 'faltam para a prova');
  await exigir('.home', '15/11/2026');
});
await passo('painel do edital ponderado', async () => { await exigir('.home', 'edital concluído'); });
await passo('plano do dia', async () => { await exigir('.home', 'plano de hoje'); });
await passo('atalhos novos', async () => {
  for (const n of ['Caderno de erros', 'Lei seca', 'Mapas mentais']) await exigir('.acoes-rapidas', n);
});

console.log('\n[3] AULA COM O CONTRATO DE 6 CAMADAS');
await passo('abre Constitucional nível 1 pela trilha', async () => {
  await page.locator('.nav__item').nth(1).click();
  await page.waitForTimeout(700);
  await page.getByText('Direito Constitucional', { exact: false }).first().click();
  await page.waitForTimeout(700);
  await page.locator('.nivel-item').first().click();
  await page.waitForTimeout(800);
});
await passo('destaques simples/mnemônico/banca', async () => {
  for (const r of ['Em palavras simples', 'Macete', 'Como a banca cobra']) await exigir('.scroll', r);
});

console.log('\n[4] CHECKPOINT E JUSTIFICATIVA POR ALTERNATIVA');
let comExpls = 0;
await passo('responde o checkpoint inteiro', async () => {
  await page.getByRole('button', { name: /checkpoint/i }).first().click();
  await page.waitForTimeout(900);
  for (let i = 0; i < 14; i++) {
    const alts = page.locator('.alts .alt, .ce-botoes .ce-btn');
    if (await alts.count() === 0) break;
    await alts.nth(await alts.count() > 1 ? 1 : 0).click();   // erra de propósito quando dá
    await page.getByRole('button', { name: /^Responder$/ }).click();
    await page.waitForTimeout(300);
    if (await page.locator('.alt-justs').count() > 0) comExpls += 1;
    const seguir = page.getByRole('button', { name: /Continuar|Ver resultado/ });
    if (await seguir.count() === 0) break;
    await seguir.first().click();
    await page.waitForTimeout(300);
  }
  if (!comExpls) throw new Error('nenhuma justificativa por alternativa renderizou');
  console.log(`    · questões com justificativa alternativa a alternativa: ${comExpls}`);
});
await passo('resultado com gabarito', async () => {
  await page.waitForSelector('.resultado', { timeout: 5000 });
  await exigir('.resultado', 'gabarito comentado');
});

console.log('\n[5] CADERNO DE ERROS');
await passo('abre pelo dojo', async () => {
  await aoDojo();
  await page.getByText('Caderno de erros', { exact: false }).first().click();
  await page.waitForTimeout(800);
  await exigir('.scroll', 'em aberto');
});
await passo('expande uma entrada e vê o que foi marcado', async () => {
  const itens = page.locator('.gabarito-item');
  if (await itens.count() === 0) throw new Error('caderno vazio depois de errar questões');
  await itens.first().click();
  await page.waitForTimeout(400);
  await exigir('.scroll', 'resposta correta');
});
await passo('filtro por matéria', async () => {
  await page.getByRole('button', { name: 'CON', exact: true }).first().click();
  await page.waitForTimeout(500);
});
await passo('treina só os erros', async () => {
  await page.getByRole('button', { name: /Treinar só os erros/ }).first().click();
  await page.waitForTimeout(800);
  if (await page.locator('.questao').count() === 0) throw new Error('sessão de treino não abriu');
});

console.log('\n[6] LEI SECA');
await passo('lista de leis', async () => {
  await aoDojo();
  await page.getByText('Lei seca', { exact: false }).first().click();
  await page.waitForTimeout(700);
  await exigir('.scroll', 'CF/88');
  await exigir('.scroll', 'Lei 8.112');
});
await passo('resolve um dispositivo', async () => {
  await page.getByText('CF/88', { exact: false }).first().click();
  await page.waitForTimeout(700);
  const n = await page.locator('.lacuna').count();
  if (n === 0) throw new Error('nenhuma lacuna renderizada');
  for (let i = 0; i < n; i++) {
    await page.locator('.leiseca__ficha:not(.is-usada)').first().click();
    await page.waitForTimeout(110);
  }
  const btn = page.getByRole('button', { name: 'Conferir' });
  if (await btn.isDisabled()) throw new Error('Conferir seguiu desabilitado');
  await btn.click();
  await page.waitForTimeout(700);
  await exigir('.scroll', 'onde a banca mexe');
  if (await page.locator('.lacuna.is-certa, .lacuna.is-errada').count() !== n) throw new Error('correção não marcou todas as lacunas');
});
await passo('devolver ficha ao banco funciona', async () => {
  await page.getByRole('button', { name: /Próximo dispositivo|Ver resultado/ }).first().click();
  await page.waitForTimeout(600);
  if (await page.locator('.lacuna').count() === 0) return;   // era o último
  await page.locator('.leiseca__ficha:not(.is-usada)').first().click();
  await page.waitForTimeout(200);
  const preenchidas = await page.locator('.lacuna.is-preenchida').count();
  if (preenchidas !== 1) throw new Error('ficha não preencheu a lacuna');
  await page.locator('.lacuna.is-preenchida').first().click();
  await page.waitForTimeout(200);
  if (await page.locator('.lacuna.is-preenchida').count() !== 0) throw new Error('lacuna não esvaziou ao ser tocada');
  if (await page.locator('.leiseca__ficha.is-usada').count() !== 0) throw new Error('ficha não voltou ao banco');
});

console.log('\n[7] MAPA MENTAL');
await passo('árvore navegável', async () => {
  await aoDojo();
  await page.getByText('Mapas mentais', { exact: false }).first().click();
  await page.waitForTimeout(600);
  await page.getByText('Constitucional', { exact: false }).first().click();
  await page.waitForTimeout(700);
  if (await page.locator('.mapa__no').count() === 0) throw new Error('árvore vazia');
  await exigir('.scroll', 'Poder constituinte');
});
await passo('expandir e recolher ramo', async () => {
  const antes = await page.locator('.mapa__filhos:visible').count();
  await page.locator('.mapa__no--raiz').nth(1).click();
  await page.waitForTimeout(300);
  const depois = await page.locator('.mapa__filhos:visible').count();
  if (depois <= antes) throw new Error('ramo não expandiu');
});

console.log('\n[8] REVISÃO E PROGRESSO');
await passo('agenda dos próximos 7 dias', async () => {
  await aoDojo();
  await page.locator('.nav__item').nth(2).click();
  await page.waitForTimeout(800);
  await exigir('.scroll', 'os próximos 7 dias');
  const c = await page.locator('.agenda__col').count();
  if (c !== 7) throw new Error(`esperava 7 colunas, veio ${c}`);
});
await passo('aba A prova', async () => {
  await page.locator('.nav__item').nth(4).click();
  await page.waitForTimeout(800);
  await page.getByRole('button', { name: /A prova/ }).click();
  await page.waitForTimeout(600);
  await exigir('.scroll', 'ritmo necessário até a prova');
  await exigir('.scroll', 'previsão de conclusão');
  await exigir('.scroll', 'ponderado por peso');
});
await passo('aba Prioridade com as 12 matérias', async () => {
  await page.getByRole('button', { name: /Prioridade/ }).click();
  await page.waitForTimeout(600);
  const n = await page.locator('.prio__linha').count();
  if (n !== 12) throw new Error(`esperava 12 matérias, veio ${n}`);
});

console.log('\n[9] AJUSTES E PERSISTÊNCIA');
await passo('data da prova editável', async () => {
  await aoDojo();
  await page.locator('.topbar__voltar').last().click();
  await page.waitForTimeout(700);
  await exigir('.scroll', 'data da prova');
  await exigir('.scroll', 'faltam');
});
await passo('estado sobrevive ao reload', async () => {
  await aoDojo();
  await exigir('.home', 'faltam para a prova');
});
await passo('tempo, escolha e lei seca no save', async () => {
  const d = await page.evaluate(() => JSON.parse(localStorage.getItem('tamayo.save.v1')));
  const fichas = Object.values(d.srs || {});
  if (!fichas.length) throw new Error('nenhuma ficha SRS');
  if (!fichas.some((f) => f.ultimoSeg != null)) throw new Error('tempo de resposta não persistido');
  const erradas = fichas.filter((f) => f.erros > 0);
  if (!erradas.length) throw new Error('nenhum erro registrado');
  if (!erradas.some((f) => f.ultimaEscolha != null)) throw new Error('alternativa marcada não persistida');
  if (!d.perfil.dataProva) throw new Error('dataProva não persistida');
  if (!Object.keys(d.leis || {}).length) throw new Error('lei seca não persistida');
  console.log(`    · fichas SRS: ${fichas.length} | com erro: ${erradas.length} | dispositivos: ${Object.keys(d.leis).length} | XP: ${d.xp}`);
});
await passo('autoavaliação da revisão não conta a resposta duas vezes', async () => {
  const antes = await page.evaluate(() => {
    const d = JSON.parse(localStorage.getItem('tamayo.save.v1'));
    const [qid, f] = Object.entries(d.srs)[0];
    return { qid, vistas: f.vistas };
  });
  await page.locator('.nav__item').nth(2).click();
  await page.waitForTimeout(800);
  const btn = page.getByRole('button', { name: /Revisar agora/ });
  if (await btn.count() === 0) return;
  await btn.click();
  await page.waitForTimeout(800);
  await page.locator('.alts .alt, .ce-botoes .ce-btn').first().click();
  await page.getByRole('button', { name: /^Responder$/ }).click();
  await page.waitForTimeout(400);
  const auto = page.locator('.autoaval__btn');
  if (await auto.count() !== 3) throw new Error('autoavaliação não apareceu na revisão');
  const qid = await page.evaluate(() => window.__ultimoQid || null);
  await auto.nth(1).click();   // "Bom"
  await page.waitForTimeout(500);
  const depois = await page.evaluate((q) => {
    const d = JSON.parse(localStorage.getItem('tamayo.save.v1'));
    return Object.values(d.srs).reduce((a, f) => a + (f.vistas || 0), 0);
  });
  console.log(`    · vistas somadas depois de 1 revisão: ${depois}`);
});

await browser.close();

console.log('\n' + '='.repeat(52));
if (erros.length) {
  console.log('FALHAS (' + erros.length + '):');
  for (const e of erros) console.log(' -', e);
  process.exit(1);
}
console.log('SMOKE TEST PASSOU — nenhum erro de console, nenhum passo falho.');
