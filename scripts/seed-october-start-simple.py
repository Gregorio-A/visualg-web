#!/usr/bin/env python3
"""Curated introductory challenges for October 1–22."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'data/challenge-solutions.json'
entries = json.loads(CATALOG.read_text(encoding='utf-8'))
rows = {r['data_mm_dd']: r for r in csv.DictReader((ROOT / 'data/visualg_365_dias_730_desafios.csv').open(encoding='utf-8'))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f'10-{day:02d}'
    prompt = rows[date]['simples_enunciado']
    code = f'algoritmo "Desafio10{day:02d}S"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f'{date}/simples'] = dict(code=code, objective=prompt[0].upper() + prompt[1:], rules=rules,
                                      example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '  vezes, i: inteiro', '''  escreva("Quantas aparições? ")
  leia(vezes)
  se vezes < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate vezes faca
      escreval("BOO!")
    fimpara
  fimse''', 'Mostre BOO! uma vez por aparição solicitada.',
    '3 → BOO! em três linhas', 'Zero aparição não imprime BOO!.',
    'O laço repete a mesma saída a quantidade pedida.',
    ['Leia N.', 'Use para.', 'Imprima em cada passagem.'])

add(2, '  aboboras: inteiro\n  preco: real', '''  escreva("Abóboras: ")
  leia(aboboras)
  escreva("Preço unitário: ")
  leia(preco)
  se (aboboras < 0) ou (preco < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Custo: R$ ", aboboras * preco)
  fimse''', 'Todas as abóboras têm o mesmo preço.',
    '4 abóboras a R$ 5 → R$ 20', 'Zero abóbora custa zero.',
    'Multiplique quantidade pelo custo unitário.',
    ['Leia quantidade.', 'Leia preço.', 'Multiplique.'])

add(3, '  doces, criancas: inteiro', '''  escreva("Doces disponíveis: ")
  leia(doces)
  escreva("Crianças: ")
  leia(criancas)
  se (doces < 0) ou (criancas <= 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Doces por criança: ", doces div criancas)
    escreval("Sobra: ", doces mod criancas)
  fimse''', 'Distribua igualmente, sem partir doces.',
    '17 doces para 5 crianças → 3 para cada e sobra 2', 'Zero criança impede divisão.',
    'Divisão inteira dá a cota e módulo dá o restante.',
    ['Use div.', 'Use mod.', 'Valide número de crianças.'])

add(4, '  limite, i: inteiro', '''  escreva("Limite: ")
  leia(limite)
  se limite < 0 entao
    escreval("Limite inválido")
  senao
    para i de 0 ate limite faca
      se i mod 2 = 0 entao
        escreval(i)
      fimse
    fimpara
  fimse''', 'Mostre números pares de zero até o limite inclusivo.',
    'Limite 5 → 0, 2, 4', 'Limite zero imprime apenas zero.',
    'Um número é par quando o resto da divisão por dois é zero.',
    ['Percorra 0 até N.', 'Teste mod 2.', 'Imprima os pares.'])

add(5, '  pontos, recorde: inteiro', '''  escreva("Pontuação atual: ")
  leia(pontos)
  escreva("Recorde informado: ")
  leia(recorde)
  se (pontos < 0) ou (recorde < 0) entao
    escreval("Dados inválidos")
  senao
    se pontos >= recorde entao
      escreval("Recorde alcançado")
    senao
      escreval("Faltam ", recorde - pontos, " pontos")
    fimse
  fimse''', 'Alcançar ou superar o recorde conta como sucesso.',
    'Pontos 20, recorde 20 → alcançado', 'Igualdade é suficiente.',
    'A comparação >= inclui o limite do recorde.',
    ['Leia dois números.', 'Use >=.', 'Calcule a falta quando necessário.'])

add(6, '  numero, i: inteiro', '''  escreva("Número inicial: ")
  leia(numero)
  se numero < 0 entao
    escreval("Número inválido")
  senao
    para i de numero ate 0 passo -1 faca
      escreval(i)
    fimpara
  fimse''', 'Faça contagem regressiva do número informado até zero, inclusive.',
    'N=3 → 3, 2, 1, 0', 'N=0 imprime apenas zero.',
    'O laço decrescente reduz uma unidade por passagem.',
    ['Comece em N.', 'Use passo -1.', 'Pare em zero.'])

add(7, '  distancia, tempo: real', '''  escreva("Distância percorrida (km): ")
  leia(distancia)
  escreva("Tempo gasto (h): ")
  leia(tempo)
  se (distancia < 0) ou (tempo <= 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Velocidade média: ", distancia / tempo, " km/h")
  fimse''', 'Divida a distância total pelo tempo total.',
    '60 km em 2 h → 30 km/h', 'Tempo zero impede a divisão.',
    'A razão entre km e h resulta em km/h.',
    ['Leia km.', 'Leia horas.', 'Divida.'])

add(8, '  a, b, c: real', '''  escreva("Volumes dos três ingredientes em mL: ")
  leia(a, b, c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Volume inválido")
  senao
    escreval("Volume do caldeirão: ", a + b + c, " mL")
  fimse''', 'Some os três volumes na mesma unidade.',
    '100, 50 e 25 mL → 175 mL', 'Ingrediente ausente pode ter zero mL.',
    'A soma reúne os volumes adicionados.',
    ['Leia três volumes.', 'Some.', 'Mostre mL.'])

add(9, '  atributo, bonus: real', '''  escreva("Atributo inicial: ")
  leia(atributo)
  escreva("Aumento percentual: ")
  leia(bonus)
  se (atributo < 0) ou (bonus < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Atributo fortalecido: ", atributo * (1 + bonus / 100))
  fimse''', 'O aumento incide sobre o atributo original.',
    'Força 20 com bônus 25% → 25', 'Bônus zero mantém o atributo.',
    'Um mais a taxa em fração é o fator de multiplicação.',
    ['Converta percentual.', 'Some um.', 'Multiplique pelo atributo.'])

add(10, '  ossos, perdidos, restante: inteiro', '''  escreva("Ossos iniciais: ")
  leia(ossos)
  escreva("Ossos perdidos: ")
  leia(perdidos)
  se (ossos < 0) ou (perdidos < 0) entao
    escreval("Quantidade inválida")
  senao
    restante <- ossos - perdidos
    se restante < 0 entao
      restante <- 0
    fimse
    escreval("Ossos restantes: ", restante)
  fimse''', 'Subtraia os ossos perdidos e limite o saldo a zero.',
    '10 ossos, perde 3 → restam 7', 'Perda maior que a quantidade deixa zero.',
    'O limite evita quantidade negativa.',
    ['Subtraia.', 'Compare com zero.', 'Ajuste o saldo.'])

add(11, '  agora, despertar, faltam: inteiro', '''  escreva("Hora atual (0 a 23): ")
  leia(agora)
  escreva("Hora de despertar (0 a 23): ")
  leia(despertar)
  se (agora < 0) ou (agora > 23) ou (despertar < 0) ou (despertar > 23) entao
    escreval("Hora inválida")
  senao
    faltam <- despertar - agora
    se faltam <= 0 entao
      faltam <- faltam + 24
    fimse
    escreval("Faltam ", faltam, " hora(s)")
  fimse''', 'Considere o próximo horário de despertar, que pode ocorrer no dia seguinte.',
    'Agora 22 h, despertar 6 h → faltam 8 h', 'Horas iguais significam 24 h até a próxima ocorrência.',
    'Somar 24 à diferença não positiva ajusta a virada do dia.',
    ['Subtraia horas.', 'Ajuste com 24.', 'Mostre a duração.'])

add(12, '  aranhas: inteiro', '''  escreva("Número de aranhas: ")
  leia(aranhas)
  se aranhas < 0 entao
    escreval("Quantidade inválida")
  senao
    escreval("Total de patas: ", aranhas * 8)
  fimse''', 'Cada aranha tem oito patas nesta contagem.',
    '3 aranhas → 24 patas', 'Zero aranha produz zero pata.',
    'Multiplicar por oito soma as patas de cada animal.',
    ['Leia quantidade.', 'Multiplique por oito.', 'Mostre o total.'])

add(13, '  senha: caractere', '''  escreva("Senha da porta: ")
  leia(senha)
  se senha = "lua123" entao
    escreval("ABERTA")
  senao
    escreval("FECHADA")
  fimse''', 'A senha correta estabelecida é lua123, sensível a maiúsculas.',
    'lua123 → ABERTA', 'LUA123 não abre a porta.',
    'A igualdade de textos compara a entrada ao código previsto.',
    ['Leia uma string.', 'Compare com o literal.', 'Mostre o estado.'])

add(14, '  indice: inteiro', '''  escreva("Índice da fase (1 a 4): ")
  leia(indice)
  escolha indice
    caso 1
      escreval("Lua nova")
    caso 2
      escreval("Quarto crescente")
    caso 3
      escreval("Lua cheia")
    caso 4
      escreval("Quarto minguante")
    outrocaso
      escreval("Índice inválido")
  fimescolha''', 'Associe 1 nova, 2 crescente, 3 cheia e 4 minguante.',
    'Índice 3 → Lua cheia', 'Índice fora de 1–4 é inválido.',
    'A seleção cobre as quatro fases do modelo fictício.',
    ['Leia o índice.', 'Use escolha.', 'Inclua outrocaso.'])

add(15, '  energia, ataque, restante: real', '''  escreva("Energia inicial: ")
  leia(energia)
  escreva("Custo do ataque: ")
  leia(ataque)
  se (energia < 0) ou (ataque < 0) entao
    escreval("Dados inválidos")
  senao
    restante <- energia - ataque
    se restante < 0 entao
      restante <- 0
    fimse
    escreval("Energia restante: ", restante)
  fimse''', 'Subtraia o custo do ataque sem permitir energia negativa.',
    'Energia 20, ataque 5 → 15', 'Custo superior à energia deixa zero nesta simulação.',
    'O saldo é limitado a zero após a subtração.',
    ['Leia os dois valores.', 'Subtraia.', 'Ajuste abaixo de zero.'])

add(16, '  a, b, c: real', '''  escreva("Três notas da fantasia: ")
  leia(a, b, c)
  se (a < 0) ou (a > 10) ou (b < 0) ou (b > 10) ou (c < 0) ou (c > 10) entao
    escreval("Nota inválida")
  senao
    escreval("Média: ", (a + b + c) / 3)
  fimse''', 'Notas vão de zero a dez e possuem o mesmo peso.',
    '8, 9 e 10 → média 9', 'Zero é nota válida.',
    'A média aritmética soma as três notas e divide por três.',
    ['Valide a faixa.', 'Some.', 'Divida por três.'])

add(17, '  porta: inteiro', '''  escreva("Escolha a porta (1, 2 ou 3): ")
  leia(porta)
  escolha porta
    caso 1
      escreval("Prêmio: chave dourada")
    caso 2
      escreval("Prêmio: mapa secreto")
    caso 3
      escreval("Prêmio: doce mágico")
    outrocaso
      escreval("Porta inexistente")
  fimescolha''', 'Cada uma das três portas revela um prêmio textual distinto.',
    'Porta 2 → mapa secreto', 'Porta fora de 1–3 não revela prêmio.',
    'A estrutura escolha seleciona a saída pelo número da porta.',
    ['Leia número.', 'Defina três casos.', 'Trate número desconhecido.'])

add(18, '  doces, casa, total: inteiro', '''  total <- 0
  para casa de 1 ate 5 faca
    escreva("Doces recebidos na casa ", casa, ": ")
    leia(doces)
    se doces >= 0 entao
      total <- total + doces
    fimse
  fimpara
  escreval("Total de doces: ", total)''', 'Visite cinco casas e some os doces recebidos em cada uma.',
    'Casas dão 1,2,3,4,5 → total 15', 'Casa sem doce contribui com zero.',
    'Um acumulador mantém a soma ao percorrer as casas.',
    ['Inicie total em zero.', 'Leia cinco valores.', 'Some os não negativos.'])

add(19, '  cor: caractere', '''  escreva("Cor da poção (VERDE, AZUL, VERMELHA): ")
  leia(cor)
  escolha maiusc(cor)
    caso "VERDE"
      escreval("Poção de sorte")
    caso "AZUL"
      escreval("Poção de calma")
    caso "VERMELHA"
      escreval("Poção de força")
    outrocaso
      escreval("Cor desconhecida")
  fimescolha''', 'Associe verde à sorte, azul à calma e vermelha à força.',
    'AZUL → Poção de calma', 'Outra cor é desconhecida.',
    'A cor em maiúsculas permite aceitar letras minúsculas na entrada.',
    ['Leia texto.', 'Normalize.', 'Use escolha.'])

add(20, '  visibilidade, limite: real', '''  escreva("Visibilidade medida (m): ")
  leia(visibilidade)
  escreva("Limite de névoa intensa (m): ")
  leia(limite)
  se (visibilidade < 0) ou (limite < 0) entao
    escreval("Dados inválidos")
  senao
    se visibilidade < limite entao
      escreval("Névoa intensa")
    senao
      escreval("Visibilidade no limite ou melhor")
    fimse
  fimse''', 'Visibilidade abaixo do limite caracteriza névoa intensa.',
    '50 m, limite 100 m → névoa intensa', 'Igualdade não fica abaixo do limite.',
    'A condição estrita < separa os estados.',
    ['Leia medida e limite.', 'Use <.', 'Mostre a classificação.'])

add(21, '  carga, consumo, restante: real', '''  escreva("Carga inicial da lanterna (%): ")
  leia(carga)
  escreva("Consumo em pontos percentuais: ")
  leia(consumo)
  se (carga < 0) ou (carga > 100) ou (consumo < 0) entao
    escreval("Dados inválidos")
  senao
    restante <- carga - consumo
    se restante < 0 entao
      restante <- 0
    fimse
    escreval("Carga restante: ", restante, "%")
  fimse''', 'Desconte o consumo da carga inicial e limite o resultado a zero.',
    '80% menos 30 pontos → 50%', 'Consumo maior que a carga deixa zero.',
    'O limite inferior evita porcentagem de bateria negativa.',
    ['Subtraia consumo.', 'Compare com zero.', 'Mostre a carga.'])

add(22, '  palavra: caractere\n  linhas, i: inteiro', '''  escreva("Palavra do coro: ")
  leia(palavra)
  escreva("Linhas: ")
  leia(linhas)
  se linhas < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate linhas faca
      escreval(i, ": ", palavra)
    fimpara
  fimse''', 'Repita a mesma palavra em N linhas numeradas de 1 a N.',
    'BOO, N=2 → 1: BOO\n2: BOO', 'N=0 não imprime a palavra.',
    'O contador gera a numeração e controla as repetições.',
    ['Leia palavra e N.', 'Use para.', 'Imprima número e palavra.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Catalogued {len(entries)} challenge solutions')
