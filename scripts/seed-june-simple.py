#!/usr/bin/env python3
"""Curated introductory June exercises based on the challenge CSV."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'data/challenge-solutions.json'
entries = json.loads(CATALOG.read_text(encoding='utf-8'))
rows = {r['data_mm_dd']: r for r in csv.DictReader((ROOT / 'data/visualg_365_dias_730_desafios.csv').open(encoding='utf-8'))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f'06-{day:02d}'
    prompt = rows[date]['simples_enunciado']
    code = f'algoritmo "Desafio06{day:02d}S"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f'{date}/simples'] = dict(code=code, objective=prompt[0].upper() + prompt[1:], rules=rules,
                                      example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '  fileiras, porFileira: inteiro', '''  escreva("Fileiras: ")
  leia(fileiras)
  escreva("Bandeirinhas por fileira: ")
  leia(porFileira)
  se (fileiras < 0) ou (porFileira < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Total: ", fileiras * porFileira)
  fimse''', 'Multiplique o número de fileiras pelo número de bandeirinhas em cada uma.',
    '3 fileiras de 5 → 15 bandeirinhas', 'Zero fileiras produz total zero.',
    'A multiplicação substitui a soma da mesma quantidade em todas as fileiras.',
    ['Leia duas quantidades.', 'Use multiplicação.', 'Recuse valores negativos.'])

add(2, '  espigas: inteiro\n  preco: real', '''  escreva("Espigas: ")
  leia(espigas)
  escreva("Preço unitário: ")
  leia(preco)
  se (espigas < 0) ou (preco < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Custo: R$ ", espigas * preco)
  fimse''', 'Considere um preço igual para todas as espigas.',
    '4 espigas a R$ 3 → R$ 12', 'Quantidade zero custa R$ 0.',
    'O total é a quantidade comprada multiplicada pelo preço de uma unidade.',
    ['Leia quantidade e preço.', 'Multiplique.', 'Exiba o total em reais.'])

add(3, '  etapa: inteiro', '''  para etapa de 1 ate 8 faca
    escreval("Passo ", etapa)
  fimpara''', 'Imprima os números de 1 a 8, um em cada linha.',
    'Início: Passo 1\nFim: Passo 8', 'A sequência sempre tem oito passos.',
    'O laço percorre exatamente os oito valores desejados.',
    ['Use um laço para.', 'Comece em 1.', 'Termine em 8.'])

add(4, '  numero: inteiro', '''  escreva("Número pescado (1 a 3): ")
  leia(numero)
  escolha numero
    caso 1
      escreval("Prêmio: adesivo")
    caso 2
      escreval("Prêmio: lápis")
    caso 3
      escreval("Prêmio: brinquedo")
    outrocaso
      escreval("Número inválido")
  fimescolha''', 'Associe 1 a adesivo, 2 a lápis e 3 a brinquedo.',
    'Número 2 → lápis', 'Número fora de 1 a 3 não dá prêmio.',
    'A seleção escolhe uma única mensagem para o número informado.',
    ['Leia o número.', 'Use escolha.', 'Trate o outro caso.'])

add(5, '  remetente, destinatario: caractere', '''  escreva("Remetente: ")
  leia(remetente)
  escreva("Destinatário: ")
  leia(destinatario)
  escreval("Bilhete de ", remetente, " para ", destinatario, ": feliz festa junina!")''',
    'Receba os dois nomes e monte uma frase que identifique quem envia e quem recebe.',
    'Ana, Beto → Bilhete de Ana para Beto: feliz festa junina!',
    'Os nomes são tratados como texto; não há cadastro de participantes.',
    'A saída combina textos fixos e os valores lidos.',
    ['Leia dois textos.', 'Mantenha remetente e destinatário em variáveis diferentes.', 'Monte a frase de saída.'])

add(6, '  lanche, bebida: real', '''  escreva("Preço do lanche: ")
  leia(lanche)
  escreva("Preço da bebida: ")
  leia(bebida)
  se (lanche < 0) ou (bebida < 0) entao
    escreval("Preço inválido")
  senao
    escreval("Total: R$ ", lanche + bebida)
  fimse''', 'Some o preço de um lanche e de uma bebida.',
    'R$ 8 e R$ 3 → R$ 11', 'Preço zero é permitido.',
    'As duas parcelas compõem o valor total do pedido.',
    ['Leia dois preços.', 'Some.', 'Recuse preços negativos.'])

add(7, '  unidades, capacidade, fornadas: inteiro', '''  escreva("Pamonhas: ")
  leia(unidades)
  escreva("Capacidade por fornada: ")
  leia(capacidade)
  se (unidades < 0) ou (capacidade <= 0) entao
    escreval("Dados inválidos")
  senao
    fornadas <- unidades div capacidade
    se unidades mod capacidade <> 0 entao
      fornadas <- fornadas + 1
    fimse
    escreval("Fornadas necessárias: ", fornadas)
  fimse''', 'Cada fornada comporta até a capacidade informada. A última pode ficar parcialmente ocupada.',
    '11 pamonhas, capacidade 5 → 3 fornadas', 'Zero pamonhas exige zero fornadas.',
    'Uma divisão com resto indica a necessidade de mais uma fornada.',
    ['Divida unidades por capacidade.', 'Olhe o resto.', 'Some uma fornada se houver resto.'])

add(8, '  preco, desconto: real', '''  escreva("Preço do chapéu: ")
  leia(preco)
  escreva("Desconto em %: ")
  leia(desconto)
  se (preco < 0) ou (desconto < 0) ou (desconto > 100) entao
    escreval("Dados inválidos")
  senao
    escreval("Preço final: R$ ", preco * (1 - desconto / 100))
  fimse''', 'Aplique um desconto percentual sobre o preço original.',
    'R$ 20 com 10% → R$ 18', 'Desconto de 100% torna o item gratuito.',
    'A fração restante do preço é um menos a taxa de desconto.',
    ['Divida o percentual por 100.', 'Subtraia a fração de 1.', 'Multiplique pelo preço.'])

add(9, '  pacocas, pessoas: inteiro', '''  escreva("Paçocas: ")
  leia(pacocas)
  escreva("Pessoas: ")
  leia(pessoas)
  se (pacocas < 0) ou (pessoas <= 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Cada pessoa recebe ", pacocas div pessoas)
    escreval("Sobram ", pacocas mod pessoas, " paçoca(s)")
  fimse''', 'Distribua as paçocas igualmente e informe o resto.',
    '17 paçocas para 5 pessoas → 3 por pessoa e 2 sobrando', 'Não divida por zero pessoas.',
    'A divisão inteira encontra a cota; o módulo encontra o que sobra.',
    ['Use div para a cota.', 'Use mod para o resto.', 'Valide pessoas.'])

add(10, '  linhas, i: inteiro', '''  escreva("Número de linhas: ")
  leia(linhas)
  se linhas < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate linhas faca
      escreval("FOGO")
    fimpara
  fimse''', 'Mostre a palavra FOGO uma vez em cada linha solicitada.',
    '3 linhas → FOGO\nFOGO\nFOGO', 'Zero linhas não imprime a palavra.',
    'O laço repete a mesma saída N vezes.',
    ['Leia N.', 'Repita N vezes.', 'Use escreval para mudar de linha.'])

add(11, '  numero, sorteado, i: inteiro\n  apareceu: logico', '''  escreva("Número procurado: ")
  leia(numero)
  apareceu <- falso
  para i de 1 ate 3 faca
    escreva("Número sorteado ", i, ": ")
    leia(sorteado)
    se sorteado = numero entao
      apareceu <- verdadeiro
    fimse
  fimpara
  se apareceu entao
    escreval("O número apareceu")
  senao
    escreval("O número não apareceu")
  fimse''', 'Compare o número procurado aos três sorteios.',
    'Procura 7; sorteios 2, 7, 9 → apareceu', 'Repetição do número sorteado mantém o resultado positivo.',
    'A variável lógica registra se houve ao menos uma correspondência.',
    ['Comece com falso.', 'Compare cada sorteio.', 'Mostre o estado final.'])

add(12, '  a, b: inteiro', '''  escreva("Acertos do jogador A: ")
  leia(a)
  escreva("Acertos do jogador B: ")
  leia(b)
  se (a < 0) ou (b < 0) entao
    escreval("Acertos inválidos")
  senao
    se a > b entao
      escreval("A venceu")
    senao
      se b > a entao
        escreval("B venceu")
      senao
        escreval("Empate")
      fimse
    fimse
  fimse''', 'Compare a quantidade de acertos de dois jogadores.',
    'A = 4, B = 3 → A venceu', 'Quantidades iguais resultam em empate.',
    'A comparação cobre as três relações possíveis entre as pontuações.',
    ['Leia dois inteiros.', 'Compare maior e menor.', 'Trate igualdade.'])

add(13, '  cadeiras, rodadas, restantes: inteiro', '''  escreva("Cadeiras iniciais: ")
  leia(cadeiras)
  escreva("Rodadas: ")
  leia(rodadas)
  se (cadeiras < 0) ou (rodadas < 0) entao
    escreval("Dados inválidos")
  senao
    restantes <- cadeiras - rodadas
    se restantes < 0 entao
      restantes <- 0
    fimse
    escreval("Cadeiras restantes: ", restantes)
  fimse''', 'Retire uma cadeira por rodada, sem permitir quantidade negativa.',
    '8 cadeiras, 3 rodadas → 5 restantes', 'Mais rodadas que cadeiras deixam zero cadeira.',
    'A subtração calcula o saldo e um limite inferior evita resultado impossível.',
    ['Subtraia rodadas.', 'Compare com zero.', 'Mostre o restante.'])

add(14, '  inicioH, inicioM, fimH, fimM, duracao: inteiro', '''  escreva("Hora e minuto de início: ")
  leia(inicioH, inicioM)
  escreva("Hora e minuto de término: ")
  leia(fimH, fimM)
  se (inicioH < 0) ou (inicioH > 23) ou (fimH < 0) ou (fimH > 23) ou (inicioM < 0) ou (inicioM > 59) ou (fimM < 0) ou (fimM > 59) entao
    escreval("Horário inválido")
  senao
    duracao <- fimH * 60 + fimM - inicioH * 60 - inicioM
    se duracao < 0 entao
      escreval("O término deve ser no mesmo dia e após o início")
    senao
      escreval("Duração: ", duracao div 60, " h e ", duracao mod 60, " min")
    fimse
  fimse''', 'Converta horários do mesmo dia para minutos e subtraia o início do término.',
    '18:30 até 20:00 → 1 h e 30 min', 'Término anterior ao início é recusado.',
    'Minutos totais simplificam o cálculo antes de separar horas e minutos da duração.',
    ['Converta horas em minutos.', 'Subtraia.', 'Use div e mod para formatar.'])

add(15, '  porcoesBase, porcoesDesejadas: inteiro\n  ingredienteBase: real', '''  escreva("Porções da receita original: ")
  leia(porcoesBase)
  escreva("Quantidade original do ingrediente: ")
  leia(ingredienteBase)
  escreva("Porções desejadas: ")
  leia(porcoesDesejadas)
  se (porcoesBase <= 0) ou (ingredienteBase < 0) ou (porcoesDesejadas < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Quantidade necessária: ", ingredienteBase * porcoesDesejadas / porcoesBase)
  fimse''', 'Ajuste proporcionalmente um ingrediente da receita ao novo número de porções.',
    '2 xícaras para 4 porções; 10 porções → 5 xícaras', 'Porções originais zero tornam a razão indefinida.',
    'A quantidade por porção é multiplicada pelo novo número de porções.',
    ['Calcule quantidade por porção.', 'Multiplique pelas porções desejadas.', 'Valide a divisão.'])

add(16, '  copos: inteiro\n  volume: real', '''  escreva("Número de copos: ")
  leia(copos)
  escreva("Volume por copo (mL): ")
  leia(volume)
  se (copos < 0) ou (volume < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Volume total: ", copos * volume, " mL")
  fimse''', 'Multiplique a quantidade de copos pelo volume de cada um.',
    '8 copos de 200 mL → 1600 mL', 'Zero copos corresponde a zero mL.',
    'Copos iguais permitem calcular o volume por multiplicação.',
    ['Leia copos.', 'Leia mL por copo.', 'Multiplique.'])

add(17, '  pontos, minimo: inteiro', '''  escreva("Pontuação: ")
  leia(pontos)
  escreva("Mínimo para prêmio: ")
  leia(minimo)
  se (pontos < 0) ou (minimo < 0) entao
    escreval("Dados inválidos")
  senao
    se pontos >= minimo entao
      escreval("Prêmio conquistado")
    senao
      escreval("Prêmio não conquistado")
    fimse
  fimse''', 'Conceda prêmio quando a pontuação for maior ou igual ao mínimo.',
    'Pontos 8, mínimo 8 → prêmio conquistado', 'Igualdade ao mínimo é suficiente.',
    'A condição >= inclui o limite exato.',
    ['Leia dois números.', 'Use >=.', 'Exiba uma das duas mensagens.'])

add(18, '  saltos, i: inteiro', '''  escreva("Quantidade de saltos: ")
  leia(saltos)
  se saltos < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate saltos faca
      escreval("Salto ", i)
    fimpara
  fimse''', 'Conte os saltos de 1 até N, um por linha.',
    'N = 3 → Salto 1, Salto 2, Salto 3', 'N = 0 não imprime saltos.',
    'O contador do laço representa o número de cada salto.',
    ['Leia N.', 'Repita de 1 até N.', 'Mostre o contador.'])

add(19, '  participante: inteiro', '''  escreva("Número do participante: ")
  leia(participante)
  se participante <= 0 entao
    escreval("Número inválido")
  senao
    escreval("Participante ", participante, ": você foi capturado na brincadeira!")
  fimse''', 'Leia o número de um participante e apresente uma mensagem de brincadeira identificando-o.',
    'Número 4 → Participante 4: você foi capturado na brincadeira!',
    'Número não positivo é inválido.',
    'O número lido é inserido na mensagem personalizada.',
    ['Leia o número.', 'Valide se é positivo.', 'Inclua-o no texto.'])

add(20, '  bilhetes: inteiro\n  preco: real', '''  escreva("Bilhetes vendidos: ")
  leia(bilhetes)
  escreva("Preço por bilhete: ")
  leia(preco)
  se (bilhetes < 0) ou (preco < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Arrecadação: R$ ", bilhetes * preco)
  fimse''', 'Considere todos os bilhetes com o mesmo preço.',
    '12 bilhetes a R$ 2 → R$ 24', 'Nenhum bilhete vendido gera arrecadação zero.',
    'A arrecadação é quantidade multiplicada por valor unitário.',
    ['Leia bilhetes e preço.', 'Multiplique.', 'Mostre o resultado.'])

add(21, '  numero: inteiro', '''  escreva("Número da roleta (1 a 4): ")
  leia(numero)
  escolha numero
    caso 1
      escreval("Prenda: cantar")
    caso 2
      escreval("Prenda: dançar")
    caso 3
      escreval("Prenda: contar uma história")
    caso 4
      escreval("Prenda: fazer uma rima")
    outrocaso
      escreval("Número inválido")
  fimescolha''', 'Associe os números 1, 2, 3 e 4 a quatro prendas distintas.',
    'Número 3 → contar uma história', 'Número fora de 1 a 4 é inválido.',
    'A estrutura escolha cobre os quatro resultados e a entrada inesperada.',
    ['Leia o número.', 'Defina quatro casos.', 'Inclua outrocaso.'])

add(22, '  base, altura: real', '''  escreva("Base do triângulo: ")
  leia(base)
  escreva("Altura do triângulo: ")
  leia(altura)
  se (base < 0) ou (altura < 0) entao
    escreval("Medida inválida")
  senao
    escreval("Área: ", base * altura / 2)
  fimse''', 'Use a fórmula da área do triângulo: base vezes altura dividido por dois.',
    'Base 6, altura 4 → área 12', 'Base ou altura zero produz área zero.',
    'Um triângulo ocupa metade do retângulo de mesma base e altura.',
    ['Multiplique base por altura.', 'Divida por 2.', 'Recuse medidas negativas.'])

add(23, '  custo, lucroPct: real', '''  escreva("Custo unitário: ")
  leia(custo)
  escreva("Lucro desejado em % do custo: ")
  leia(lucroPct)
  se (custo < 0) ou (lucroPct < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Preço de venda: R$ ", custo * (1 + lucroPct / 100))
  fimse''', 'O lucro percentual é aplicado sobre o custo unitário.',
    'Custo R$ 5 e lucro 20% → preço R$ 6', 'Lucro de 0% mantém o preço no custo.',
    'Somar 1 à taxa em fração produz o multiplicador do preço de venda.',
    ['Divida o percentual por 100.', 'Some 1.', 'Multiplique pelo custo.'])

add(24, '  pessoas, pratosPorPessoa: inteiro', '''  escreva("Pessoas: ")
  leia(pessoas)
  escreva("Pratos por pessoa: ")
  leia(pratosPorPessoa)
  se (pessoas < 0) ou (pratosPorPessoa < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Pratos necessários: ", pessoas * pratosPorPessoa)
  fimse''', 'Multiplique o público pelo número de pratos planejados por pessoa.',
    '15 pessoas, 2 pratos cada → 30 pratos', 'Zero pessoas exige zero pratos.',
    'O consumo individual igual permite obter o total diretamente.',
    ['Leia pessoas.', 'Leia pratos por pessoa.', 'Multiplique.'])

add(25, '  a, b, c: inteiro', '''  escreva("Pontos da tentativa 1: ")
  leia(a)
  escreva("Pontos da tentativa 2: ")
  leia(b)
  escreva("Pontos da tentativa 3: ")
  leia(c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Pontos inválidos")
  senao
    escreval("Pontuação total: ", a + b + c)
  fimse''', 'Some os pontos das três tentativas.',
    '2, 5 e 3 → 10 pontos', 'Tentativa com zero ponto continua válida.',
    'O total reúne as três parcelas registradas.',
    ['Leia três números.', 'Some os três.', 'Mostre o total.'])

add(26, '  temperatura, limite: real', '''  escreva("Temperatura atual: ")
  leia(temperatura)
  escreva("Limite de frio: ")
  leia(limite)
  se temperatura < limite entao
    escreval("Abaixo do limite")
  senao
    escreval("No limite ou acima")
  fimse''', 'Compare a temperatura medida ao limite escolhido.',
    '12 °C, limite 15 °C → abaixo do limite', 'Temperatura igual ao limite não está abaixo dele.',
    'A comparação estrita < separa os dois casos.',
    ['Leia duas temperaturas.', 'Use <.', 'Mostre o resultado.'])

add(27, '  total, entregues: inteiro', '''  escreva("Convites disponíveis: ")
  leia(total)
  escreva("Convites distribuídos: ")
  leia(entregues)
  se (total < 0) ou (entregues < 0) ou (entregues > total) entao
    escreval("Dados inválidos")
  senao
    escreval("Faltam distribuir: ", total - entregues)
  fimse''', 'Subtraia os convites já entregues do total disponível.',
    '20 convites, 7 entregues → faltam 13', 'Entregues maior que total é inválido.',
    'A diferença representa convites ainda em mãos.',
    ['Leia total e entregues.', 'Verifique limites.', 'Subtraia.'])

add(28, '  primeiro, segundo, terceiro: real', '''  escreva("Custo do material 1: ")
  leia(primeiro)
  escreva("Custo do material 2: ")
  leia(segundo)
  escreva("Custo do material 3: ")
  leia(terceiro)
  se (primeiro < 0) ou (segundo < 0) ou (terceiro < 0) entao
    escreval("Custo inválido")
  senao
    escreval("Decoração: R$ ", primeiro + segundo + terceiro)
  fimse''', 'Some o preço de três materiais decorativos.',
    'R$ 4, R$ 5 e R$ 6 → R$ 15', 'Material gratuito pode ter preço zero.',
    'O orçamento é a soma de cada material.',
    ['Leia os três preços.', 'Some.', 'Exiba em reais.'])

add(29, '  pares: inteiro', '''  escreva("Número de pares: ")
  leia(pares)
  se pares < 0 entao
    escreval("Quantidade inválida")
  senao
    escreval("Dançarinos: ", pares * 2)
  fimse''', 'Cada par é formado por duas pessoas.',
    '7 pares → 14 dançarinos', 'Zero pares produz zero dançarinos.',
    'Multiplicar por dois converte pares em pessoas.',
    ['Leia os pares.', 'Multiplique por 2.', 'Mostre o total.'])

add(30, '  primeira, segunda: real', '''  escreva("Arrecadação da primeira barraca: ")
  leia(primeira)
  escreva("Arrecadação da segunda barraca: ")
  leia(segunda)
  se (primeira < 0) ou (segunda < 0) entao
    escreval("Arrecadação inválida")
  senao
    escreval("Arrecadação conjunta: R$ ", primeira + segunda)
  fimse''', 'Some as arrecadações de duas barracas.',
    'R$ 120 e R$ 80 → R$ 200', 'Barraca sem vendas contribui com zero.',
    'O resultado é a soma das duas receitas informadas.',
    ['Leia as receitas.', 'Some.', 'Mostre o total.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Catalogued {len(entries)} challenge solutions')
