#!/usr/bin/env python3
"""Curated introductory July exercises based on the challenge CSV."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'data/challenge-solutions.json'
entries = json.loads(CATALOG.read_text(encoding='utf-8'))
rows = {r['data_mm_dd']: r for r in csv.DictReader((ROOT / 'data/visualg_365_dias_730_desafios.csv').open(encoding='utf-8'))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f'07-{day:02d}'
    prompt = rows[date]['simples_enunciado']
    code = f'algoritmo "Desafio07{day:02d}S"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f'{date}/simples'] = dict(code=code, objective=prompt[0].upper() + prompt[1:], rules=rules,
                                      example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '  saches: inteiro\n  preco: real', '''  escreva("Sachês: ")
  leia(saches)
  escreva("Preço por sachê: ")
  leia(preco)
  se (saches < 0) ou (preco < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Custo: R$ ", saches * preco)
  fimse''', 'Considere todos os sachês com o mesmo preço.',
    '6 sachês a R$ 2 → R$ 12', 'Zero sachê custa zero.',
    'Multiplique o preço unitário pela quantidade.',
    ['Leia preço e quantidade.', 'Multiplique.', 'Mostre o custo.'])

add(2, '  a, b, c, menor: real', '''  escreva("Três temperaturas: ")
  leia(a, b, c)
  menor <- a
  se b < menor entao
    menor <- b
  fimse
  se c < menor entao
    menor <- c
  fimse
  escreval("Mínima: ", menor)''', 'Compare três temperaturas, incluindo valores negativos.',
    '5, -2, 3 → mínima -2', 'Empates mantêm a mesma mínima.',
    'Uma variável guarda o menor valor encontrado até o momento.',
    ['Comece com a primeira.', 'Compare a segunda.', 'Compare a terceira.'])

add(3, '  cobertores, demanda: inteiro', '''  escreva("Cobertores disponíveis: ")
  leia(cobertores)
  escreva("Cobertores necessários: ")
  leia(demanda)
  se (cobertores < 0) ou (demanda < 0) entao
    escreval("Quantidade inválida")
  senao
    se cobertores >= demanda entao
      escreval("Quantidade suficiente")
    senao
      escreval("Faltam ", demanda - cobertores, " cobertor(es)")
    fimse
  fimse''', 'A demanda é atendida quando a disponibilidade é maior ou igual ao necessário.',
    'Disponíveis 7, demanda 5 → suficiente', 'Igualdade é suficiente.',
    'A comparação informa a situação e a diferença mede a falta.',
    ['Leia estoque e demanda.', 'Use >=.', 'Subtraia para saber a falta.'])

add(4, '  primeiro, segundo: inteiro', '''  escreva("Minutos do primeiro filme: ")
  leia(primeiro)
  escreva("Minutos do segundo filme: ")
  leia(segundo)
  se (primeiro < 0) ou (segundo < 0) entao
    escreval("Duração inválida")
  senao
    escreval("Duração total: ", primeiro + segundo, " min")
  fimse''', 'Some as durações em minutos dos dois filmes, sem intervalo.',
    '90 min e 100 min → 190 min', 'Filme de duração zero não altera o total.',
    'Como as unidades já são iguais, basta somar.',
    ['Leia os dois tempos.', 'Some.', 'Mostre minutos.'])

add(5, '  paginas, lidas: inteiro', '''  escreva("Páginas do livro: ")
  leia(paginas)
  escreva("Páginas lidas: ")
  leia(lidas)
  se (paginas < 0) ou (lidas < 0) ou (lidas > paginas) entao
    escreval("Dados inválidos")
  senao
    escreval("Restam ", paginas - lidas, " página(s)")
  fimse''', 'Subtraia páginas lidas do total do livro.',
    'Livro 200, lidas 75 → restam 125', 'Livro terminado tem zero página restante.',
    'A diferença mede o que falta ler.',
    ['Leia total e lidas.', 'Valide o intervalo.', 'Subtraia.'])

add(6, '  litros: real', '''  escreva("Litros de leite: ")
  leia(litros)
  se litros < 0 entao
    escreval("Volume inválido")
  senao
    escreval("Mililitros: ", litros * 1000)
  fimse''', 'Cada litro contém mil mililitros.',
    '1,5 L → 1500 mL', 'Zero litro é zero mililitro.',
    'A conversão muda a unidade multiplicando por mil.',
    ['Leia litros.', 'Multiplique por 1000.', 'Mostre mL.'])

add(7, '  preco, desconto: real', '''  escreva("Preço do casaco: ")
  leia(preco)
  escreva("Desconto de inverno em %: ")
  leia(desconto)
  se (preco < 0) ou (desconto < 0) ou (desconto > 100) entao
    escreval("Dados inválidos")
  senao
    escreval("Preço promocional: R$ ", preco * (1 - desconto / 100))
  fimse''', 'Aplique ao preço original o desconto percentual informado.',
    'R$ 100 com 25% → R$ 75', 'Desconto 100% produz preço zero.',
    'O preço final corresponde à fração não descontada.',
    ['Divida percentual por 100.', 'Subtraia de 1.', 'Multiplique pelo preço.'])

add(8, '  noites, i: inteiro', '''  escreva("Número de noites: ")
  leia(noites)
  se noites < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate noites faca
      escreval("Noite ", i)
    fimpara
  fimse''', 'Numere as noites de 1 até N usando repetição.',
    'N=3 → Noite 1, Noite 2, Noite 3', 'N=0 não imprime nenhuma noite.',
    'O contador do laço coincide com o número da noite.',
    ['Leia N.', 'Use para.', 'Imprima o contador.'])

add(9, '  horas, precoHora: real', '''  escreva("Horas de uso: ")
  leia(horas)
  escreva("Custo estimado por hora (R$): ")
  leia(precoHora)
  se (horas < 0) ou (precoHora < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Custo estimado: R$ ", horas * precoHora)
  fimse''', 'Considere custo por hora constante para o aparelho.',
    '4 h a R$ 0,50/h → R$ 2', 'Zero hora não gera custo.',
    'O custo total é taxa horária multiplicada por tempo.',
    ['Leia duração.', 'Leia taxa.', 'Multiplique.'])

add(10, '  litros: real\n  pessoas: inteiro', '''  escreva("Litros de sopa: ")
  leia(litros)
  escreva("Pessoas: ")
  leia(pessoas)
  se (litros < 0) ou (pessoas <= 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Litros por pessoa: ", litros / pessoas)
  fimse''', 'Divida igualmente uma quantidade de litros entre todas as pessoas.',
    '3 L para 6 pessoas → 0,5 L por pessoa', 'Não divida por zero pessoas.',
    'A razão litros por pessoas fornece a porção individual.',
    ['Leia volume.', 'Leia público.', 'Divida após validar.'])

add(11, '  h1, m1, h2, m2, inicioMin, fimMin, duracao: inteiro', '''  escreva("Hora e minuto de dormir: ")
  leia(h1, m1)
  escreva("Hora e minuto de acordar: ")
  leia(h2, m2)
  se (h1 < 0) ou (h1 > 23) ou (h2 < 0) ou (h2 > 23) ou (m1 < 0) ou (m1 > 59) ou (m2 < 0) ou (m2 > 59) entao
    escreval("Horário inválido")
  senao
    inicioMin <- h1 * 60 + m1
    fimMin <- h2 * 60 + m2
    duracao <- fimMin - inicioMin
    se duracao <= 0 entao
      duracao <- duracao + 1440
    fimse
    escreval("Sono: ", duracao, " min")
  fimse''', 'Considere um sono de até 24 horas. Quando o horário de acordar não supera o de dormir, some um dia ao término.',
    '23:00 até 07:00 → 480 min', 'Horários iguais representam 24 horas nesta atividade.',
    'Converter ambos os horários para minutos facilita ajustar a travessia da meia-noite.',
    ['Converta horas em minutos.', 'Subtraia.', 'Some 1440 se o resultado não for positivo.'])

add(12, '  fahrenheit, celsius: real', '''  escreva("Temperatura em Fahrenheit: ")
  leia(fahrenheit)
  celsius <- (fahrenheit - 32) * 5 / 9
  escreval("Celsius: ", celsius)''', 'Use a fórmula C = (F − 32) × 5 / 9.',
    '68 °F → 20 °C', '32 °F corresponde a 0 °C.',
    'A fórmula ajusta origem e escala entre as duas unidades.',
    ['Subtraia 32.', 'Multiplique por 5.', 'Divida por 9.'])

add(13, '  pacotes, porPacote: inteiro', '''  escreva("Pacotes: ")
  leia(pacotes)
  escreva("Gravetos por pacote: ")
  leia(porPacote)
  se (pacotes < 0) ou (porPacote < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Gravetos: ", pacotes * porPacote)
  fimse''', 'Leia quantos pacotes existem e quantos gravetos há em cada pacote. Multiplique os dois números para encontrar o total.',
    '7 pacotes com 4 gravetos → 28', 'Zero pacotes fornece zero gravetos.',
    'Multiplicar quantidade de pacotes pelo conteúdo de um encontra o total.',
    ['Leia pacotes.', 'Leia conteúdo.', 'Multiplique.'])

add(14, '  pessoas: inteiro\n  passagem: real', '''  escreva("Pessoas: ")
  leia(pessoas)
  escreva("Preço por passagem: ")
  leia(passagem)
  se (pessoas < 0) ou (passagem < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Custo total: R$ ", pessoas * passagem)
  fimse''', 'Todas as pessoas compram uma passagem de mesmo preço.',
    '5 pessoas a R$ 12 → R$ 60', 'Zero pessoa custa zero.',
    'O custo é proporcional ao número de passageiros.',
    ['Leia público.', 'Leia preço.', 'Multiplique.'])

add(15, '  raio, area: real', '''  escreva("Raio do círculo: ")
  leia(raio)
  se raio < 0 entao
    escreval("Raio inválido")
  senao
    area <- 3.14159 * raio * raio
    escreval("Área: ", area)
  fimse''', 'Calcule A = πr² usando π aproximado por 3,14159.',
    'Raio 2 → área aproximada 12,56636', 'Raio zero produz área zero.',
    'O quadrado do raio é multiplicado pela constante aproximada.',
    ['Multiplique raio por ele mesmo.', 'Multiplique por π.', 'Mostre a aproximação.'])

add(16, '  primeira, segunda: inteiro', '''  escreva("Carta 1: ")
  leia(primeira)
  escreva("Carta 2: ")
  leia(segunda)
  se primeira > segunda entao
    escreval("Maior carta: ", primeira)
  senao
    se segunda > primeira entao
      escreval("Maior carta: ", segunda)
    senao
      escreval("Cartas iguais")
    fimse
  fimse''', 'Compare os valores numéricos de duas cartas.',
    'Carta 8 e carta 5 → maior 8', 'Valores iguais produzem empate.',
    'Duas comparações e o caso restante cobrem todas as possibilidades.',
    ['Leia duas cartas.', 'Compare >.', 'Trate igualdade.'])

add(17, '  pessoas: inteiro\n  ingresso, pipoca: real', '''  escreva("Pessoas: ")
  leia(pessoas)
  escreva("Preço do ingresso: ")
  leia(ingresso)
  escreva("Preço da pipoca: ")
  leia(pipoca)
  se (pessoas < 0) ou (ingresso < 0) ou (pipoca < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Total: R$ ", pessoas * (ingresso + pipoca))
  fimse''', 'Cada pessoa compra um ingresso e uma pipoca de preços iguais para todos.',
    '2 pessoas; ingresso R$ 10 e pipoca R$ 5 → R$ 30', 'Zero pessoas não gera custo.',
    'O custo por pessoa é a soma das duas compras e se repete para o grupo.',
    ['Some ingresso e pipoca.', 'Multiplique pelo público.', 'Mostre o total.'])

add(18, '  meias: inteiro', '''  escreva("Quantidade de meias: ")
  leia(meias)
  se meias < 0 entao
    escreval("Quantidade inválida")
  senao
    escreval("Pares completos: ", meias div 2)
    escreval("Meias sem par: ", meias mod 2)
  fimse''', 'Cada par usa duas meias, sem considerar cores.',
    '7 meias → 3 pares e 1 meia sem par', 'Zero meia produz zero par.',
    'Divisão inteira conta pares; módulo conta a peça restante.',
    ['Divida por 2.', 'Use mod para sobra.', 'Mostre ambos.'])

add(19, '  voltas: inteiro\n  metrosPorVolta: real', '''  escreva("Voltas: ")
  leia(voltas)
  escreva("Metros por volta: ")
  leia(metrosPorVolta)
  se (voltas < 0) ou (metrosPorVolta < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Distância: ", voltas * metrosPorVolta, " metros")
  fimse''', 'Todas as voltas têm o mesmo comprimento.',
    '4 voltas de 250 m → 1000 m', 'Zero volta dá distância zero.',
    'O comprimento por volta é somado repetidamente por multiplicação.',
    ['Leia voltas.', 'Leia distância de uma.', 'Multiplique.'])

add(20, '  a, b, c: real', '''  escreva("Peso da mala 1: ")
  leia(a)
  escreva("Peso da mala 2: ")
  leia(b)
  escreva("Peso da mala 3: ")
  leia(c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Peso inválido")
  senao
    escreval("Peso total: ", a + b + c)
  fimse''', 'Some os pesos de três malas na mesma unidade.',
    '2 kg, 3 kg e 4 kg → 9 kg', 'Mala vazia pode pesar zero nesta simplificação.',
    'O peso total é a soma das três medidas.',
    ['Leia três pesos.', 'Some.', 'Mostre o total.'])

add(21, '  pessoas, barracas: inteiro', '''  escreva("Pessoas: ")
  leia(pessoas)
  se pessoas < 0 entao
    escreval("Quantidade inválida")
  senao
    barracas <- pessoas div 4
    se pessoas mod 4 <> 0 entao
      barracas <- barracas + 1
    fimse
    escreval("Barracas de quatro lugares: ", barracas)
  fimse''', 'Cada barraca acomoda até quatro pessoas; a última pode ter vagas livres.',
    '9 pessoas → 3 barracas', 'Zero pessoa exige zero barraca.',
    'Qualquer resto da divisão por quatro requer outra barraca.',
    ['Divida por quatro.', 'Observe o resto.', 'Arredonde para cima.'])

add(22, '  temperatura: real', '''  escreva("Temperatura em °C: ")
  leia(temperatura)
  se temperatura <= 0 entao
    escreval("Congelante")
  senao
    escreval("Acima de zero")
  fimse''', 'Considere congelante qualquer temperatura menor ou igual a zero.',
    '0 °C → congelante; 1 °C → acima de zero', 'Valores negativos são congelantes.',
    'A condição <= inclui o limite zero.',
    ['Leia a temperatura.', 'Use <= 0.', 'Mostre a classificação.'])

add(23, '  biscoitos, porPacote, pacotes: inteiro', '''  escreva("Biscoitos necessários: ")
  leia(biscoitos)
  escreva("Biscoitos por pacote: ")
  leia(porPacote)
  se (biscoitos < 0) ou (porPacote <= 0) entao
    escreval("Dados inválidos")
  senao
    pacotes <- biscoitos div porPacote
    se biscoitos mod porPacote <> 0 entao
      pacotes <- pacotes + 1
    fimse
    escreval("Pacotes necessários: ", pacotes)
  fimse''', 'Compre pacotes inteiros suficientes para a quantidade desejada.',
    '11 biscoitos, pacote com 5 → 3 pacotes', 'Zero biscoito requer zero pacote.',
    'Uma divisão com resto exige mais um pacote.',
    ['Calcule a divisão inteira.', 'Confira o resto.', 'Arredonde para cima.'])

add(24, '  ida: real', '''  escreva("Distância da ida (km): ")
  leia(ida)
  se ida < 0 entao
    escreval("Distância inválida")
  senao
    escreval("Ida e volta: ", 2 * ida, " km")
  fimse''', 'Assuma retorno pelo mesmo caminho, com a mesma distância da ida.',
    'Trilha de 7 km na ida → 14 km no total', 'Ida de zero km dá total zero.',
    'A viagem percorre a distância duas vezes.',
    ['Leia a ida.', 'Multiplique por 2.', 'Mostre km.'])

add(25, '  rodada1, rodada2: inteiro', '''  escreva("Pontos da rodada 1: ")
  leia(rodada1)
  escreva("Pontos da rodada 2: ")
  leia(rodada2)
  se (rodada1 < 0) ou (rodada2 < 0) entao
    escreval("Pontos inválidos")
  senao
    escreval("Total: ", rodada1 + rodada2)
  fimse''', 'Some os pontos de duas rodadas do mesmo jogador.',
    '7 e 4 → 11 pontos', 'Zero ponto numa rodada é válido.',
    'O placar acumulado é a soma das duas parcelas.',
    ['Leia ambas.', 'Some.', 'Mostre o total.'])

add(26, '  watts, horas, quilowattHora: real', '''  escreva("Potência em watts: ")
  leia(watts)
  escreva("Horas de uso: ")
  leia(horas)
  se (watts < 0) ou (horas < 0) entao
    escreval("Dados inválidos")
  senao
    quilowattHora <- watts * horas / 1000
    escreval("Consumo: ", quilowattHora, " kWh")
  fimse''', 'Converta watt-hora para quilowatt-hora dividindo por mil.',
    '100 W por 5 h → 0,5 kWh', 'Zero hora produz consumo zero.',
    'Potência vezes duração fornece watt-hora; a divisão muda a unidade.',
    ['Multiplique W por h.', 'Divida por 1000.', 'Mostre kWh.'])

add(27, '  primeira, segunda, terceira: real', '''  escreva("Preço da peça 1: ")
  leia(primeira)
  escreva("Preço da peça 2: ")
  leia(segunda)
  escreva("Preço da peça 3: ")
  leia(terceira)
  se (primeira < 0) ou (segunda < 0) ou (terceira < 0) entao
    escreval("Preço inválido")
  senao
    escreval("Kit: R$ ", primeira + segunda + terceira)
  fimse''', 'O kit contém exatamente uma unidade de cada uma das três peças.',
    'R$ 10, R$ 15 e R$ 5 → R$ 30', 'Peça gratuita pode custar zero.',
    'O preço do kit soma seus componentes.',
    ['Leia três preços.', 'Some.', 'Mostre em reais.'])

add(28, '  paes: inteiro\n  preco: real', '''  escreva("Número de pães: ")
  leia(paes)
  escreva("Preço por pão: ")
  leia(preco)
  se (paes < 0) ou (preco < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Custo: R$ ", paes * preco)
  fimse''', 'Todos os pães têm o mesmo preço unitário.',
    '8 pães a R$ 1,50 → R$ 12', 'Zero pão custa zero.',
    'Multiplicação produz o custo total.',
    ['Leia quantidade.', 'Leia preço.', 'Multiplique.'])

add(29, '  hoje, fimDia: inteiro', '''  escreva("Dia atual de julho: ")
  leia(hoje)
  escreva("Dia de término das férias em julho: ")
  leia(fimDia)
  se (hoje < 1) ou (hoje > 31) ou (fimDia < hoje) ou (fimDia > 31) entao
    escreval("Datas inválidas ou fora do mesmo mês")
  senao
    escreval("Dias restantes: ", fimDia - hoje)
  fimse''', 'As duas datas estão no mesmo mês de julho e a data final não é anterior à atual.',
    'Dia 10 até dia 20 → 10 dias restantes', 'Datas iguais dão zero dia restante.',
    'No mesmo mês, a diferença entre dias do mês mede o intervalo.',
    ['Leia dois dias.', 'Valide 1–31 e a ordem.', 'Subtraia.'])

add(30, '  resposta: caractere', '''  escreva("Está chovendo? (SIM/NÃO): ")
  leia(resposta)
  se maiusc(resposta) = "SIM" entao
    escreval("Atividade interna: jogo de tabuleiro")
  senao
    se (maiusc(resposta) = "NÃO") ou (maiusc(resposta) = "NAO") entao
      escreval("Atividade externa: caminhada")
    senao
      escreval("Resposta inválida")
    fimse
  fimse''', 'Aceite SIM ou NÃO, com ou sem acento em NÃO; ignore a diferença entre maiúsculas e minúsculas.',
    'SIM → jogo de tabuleiro; NÃO → caminhada', 'Outra palavra é inválida.',
    'A escolha do local depende da resposta normalizada.',
    ['Leia um texto.', 'Converta para maiúsculas.', 'Use condição para escolher.'])

add(31, '  a, b, c, d: real', '''  escreva("Quatro temperaturas de julho: ")
  leia(a, b, c, d)
  escreval("Média: ", (a + b + c + d) / 4)''', 'Some quatro medições e divida por quatro.',
    '10, 12, 14 e 16 °C → média 13 °C', 'Temperaturas negativas são válidas.',
    'A média aritmética representa o valor central das quatro leituras.',
    ['Some as quatro.', 'Divida por quatro.', 'Mostre a média.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Catalogued {len(entries)} challenge solutions')
