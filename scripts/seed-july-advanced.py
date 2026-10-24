#!/usr/bin/env python3
"""Curated advanced July exercises based on the challenge CSV."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'data/challenge-solutions.json'
entries = json.loads(CATALOG.read_text(encoding='utf-8'))
rows = {r['data_mm_dd']: r for r in csv.DictReader((ROOT / 'data/visualg_365_dias_730_desafios.csv').open(encoding='utf-8'))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f'07-{day:02d}'
    prompt = rows[date]['avancado_enunciado']
    code = f'algoritmo "Desafio07{day:02d}A"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f'{date}/avancado'] = dict(code=code, objective=prompt[0].upper() + prompt[1:], rules=rules,
                                      example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '''  cha, leite, pedido, quantidade, i: inteiro
  estoqueCha, estoqueLeite: inteiro
  subtotal, total: real''', '''  escreva("Sachês de chá em estoque: ")
  leia(estoqueCha)
  escreva("Doses de leite em estoque: ")
  leia(estoqueLeite)
  total <- 0
  para i de 1 ate 5 faca
    escreva("Pedido ", i, " (1 chá, 2 leite, 3 combo): ")
    leia(pedido)
    escreva("Quantidade: ")
    leia(quantidade)
    cha <- 0
    leite <- 0
    subtotal <- 0
    escolha pedido
      caso 1
        cha <- quantidade
        subtotal <- 4 * quantidade
      caso 2
        leite <- quantidade
        subtotal <- 3 * quantidade
      caso 3
        cha <- quantidade
        leite <- quantidade
        subtotal <- 6 * quantidade
    fimescolha
    se (quantidade <= 0) ou (subtotal = 0) ou (cha > estoqueCha) ou (leite > estoqueLeite) entao
      escreval("Pedido recusado")
    senao
      estoqueCha <- estoqueCha - cha
      estoqueLeite <- estoqueLeite - leite
      total <- total + subtotal
      escreval("Pedido aceito: R$ ", subtotal)
    fimse
  fimpara
  escreval("Faturamento: R$ ", total)
  escreval("Estoque final: chá ", estoqueCha, ", leite ", estoqueLeite)''',
    'Registre cinco pedidos. Chá custa R$ 4, leite R$ 3, combo chá+leite custa R$ 6 por conjunto. Cada item consome uma unidade do respectivo estoque.',
    'Um combo consome um chá e um leite; custa R$ 6 em vez de R$ 7 separados',
    'Se faltar qualquer ingrediente, recuse o pedido inteiro sem alterar estoque.',
    'O combo aplica desconto fixo e a checagem conjunta evita estoque parcialmente consumido.',
    ['Associe cada pedido a consumo de ingredientes.', 'Confira os dois estoques.', 'Atualize só após validar.'])

add(2, '''  cidade: vetor[1..5] de caractere
  temperatura: vetor[1..5] de real
  i, j: inteiro
  trocaT: real
  trocaN: caractere''', '''  para i de 1 ate 5 faca
    escreva("Cidade ", i, ": ")
    leia(cidade[i])
    escreva("Temperatura: ")
    leia(temperatura[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se temperatura[j] < temperatura[i] entao
        trocaT <- temperatura[i]
        temperatura[i] <- temperatura[j]
        temperatura[j] <- trocaT
        trocaN <- cidade[i]
        cidade[i] <- cidade[j]
        cidade[j] <- trocaN
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(i, "º ", cidade[i], ": ", temperatura[i], " °C")
  fimpara''',
    'Cadastre cinco cidades e ordene suas temperaturas em ordem crescente, da mais fria para a mais quente.',
    'A: 4 °C, B: -2 °C → B aparece antes de A',
    'Empate mantém a ordem de cadastro.',
    'A ordenação move cidade e temperatura juntas para preservar a associação.',
    ['Guarde nomes e valores no mesmo índice.', 'Compare temperaturas.', 'Troque os dois campos juntos.'])

add(3, '''  grupo: vetor[1..4] de caractere
  pedido, entregue: vetor[1..4] de inteiro
  i, estoque, repasse: inteiro''', '''  escreva("Cobertores disponíveis: ")
  leia(estoque)
  se estoque < 0 entao
    escreval("Estoque inválido")
  senao
    para i de 1 ate 4 faca
      escreva("Grupo ", i, ": ")
      leia(grupo[i])
      escreva("Cobertores necessários: ")
      leia(pedido[i])
      se pedido[i] < 0 entao
        pedido[i] <- 0
      fimse
      repasse <- pedido[i]
      se repasse > estoque entao
        repasse <- estoque
      fimse
      entregue[i] <- repasse
      estoque <- estoque - repasse
    fimpara
    para i de 1 ate 4 faca
      escreval(grupo[i], ": entregue ", entregue[i], ", faltam ", pedido[i] - entregue[i])
    fimpara
    escreval("Estoque restante: ", estoque)
  fimse''',
    'Atenda quatro grupos em ordem de cadastro, entregando até o necessário para cada um enquanto houver estoque.',
    'Estoque 5; grupos pedem 3 e 4 → recebem 3 e 2',
    'Pedido negativo é tratado como zero.',
    'O saldo diminui após cada grupo; o relatório separa entrega e demanda pendente.',
    ['Use o mínimo entre necessidade e estoque.', 'Desconte cada entrega.', 'Mostre a falta por grupo.'])

add(4, '''  nome: vetor[1..5] de caractere
  duracao: vetor[1..5] de inteiro
  i, j, troca, limite, usado: inteiro
  trocaNome: caractere''', '''  escreva("Limite da maratona em minutos: ")
  leia(limite)
  para i de 1 ate 5 faca
    escreva("Filme ", i, ": ")
    leia(nome[i])
    escreva("Duração em minutos: ")
    leia(duracao[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se duracao[j] < duracao[i] entao
        troca <- duracao[i]
        duracao[i] <- duracao[j]
        duracao[j] <- troca
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  usado <- 0
  para i de 1 ate 5 faca
    se (duracao[i] >= 0) e (usado + duracao[i] <= limite) entao
      usado <- usado + duracao[i]
      escreval("Selecionado: ", nome[i], " (", duracao[i], " min)")
    fimse
  fimpara
  escreval("Tempo total: ", usado, " min")''',
    'Ordene cinco filmes por duração crescente. Selecione em ordem quantos couberem no tempo limite, sem pausas ou sobreposição.',
    'Limite 120 min; filmes 30, 50, 70 → selecione 30 e 50',
    'Filme maior que o limite não é selecionado. Duração negativa é ignorada.',
    'Escolher os menores primeiro maximiza o número de filmes vistos sob esse modelo.',
    ['Ordene por duração.', 'Some apenas se couber no limite.', 'Mantenha nome e duração juntos.'])

add(5, '''  paginas, i, lidas, total: inteiro
  media, faltam, diasPrevistos: real''', '''  escreva("Páginas totais do livro: ")
  leia(paginas)
  total <- 0
  para i de 1 ate 7 faca
    escreva("Páginas lidas no dia ", i, ": ")
    leia(lidas)
    se lidas > 0 entao
      total <- total + lidas
    fimse
    escreval("Progresso acumulado: ", total)
  fimpara
  se paginas < 0 entao
    escreval("Livro inválido")
  senao
    media <- total / 7
    faltam <- paginas - total
    se faltam < 0 entao
      faltam <- 0
    fimse
    escreval("Média diária: ", media, "; páginas restantes: ", faltam)
    se media > 0 entao
      diasPrevistos <- faltam / media
      escreval("Dias estimados para terminar: ", diasPrevistos)
    senao
      escreval("Sem ritmo para prever conclusão")
    fimse
  fimse''',
    'Registre páginas lidas em sete dias. Some evolução diária, calcule média de páginas por dia e estime dias restantes mantendo o mesmo ritmo.',
    'Livro 140 páginas; 10 páginas em cada um dos sete dias → 70 lidas; média 10; faltam 7 dias',
    'Média zero não permite previsão. Leitura além do livro é limitada a zero páginas restantes.',
    'A previsão divide páginas restantes pela média diária observada.',
    ['Acumule sete leituras.', 'Divida por sete.', 'Use a média para estimar o restante.'])

add(6, '''  tamanhos, quantidades: vetor[1..3] de inteiro
  alcancavel: vetor[1..10001] de logico
  opcao: vetor[1..10001] de inteiro
  i, j, volume, maior, restante, indice: inteiro''', '''  escreva("Volume de bebida em mL (0 a 10000): ")
  leia(volume)
  para i de 1 ate 3 faca
    escreva("Tamanho do copo ", i, " em mL: ")
    leia(tamanhos[i])
  fimpara
  se (volume < 0) ou (volume > 10000) ou (tamanhos[1] <= 0) ou (tamanhos[2] <= 0) ou (tamanhos[3] <= 0) entao
    escreval("Dados inválidos")
  senao
    alcancavel[1] <- verdadeiro
    para i de 1 ate 3 faca
      quantidades[i] <- 0
    fimpara
    para i de 1 ate volume faca
      alcancavel[i+1] <- falso
      opcao[i+1] <- 0
      para j de 1 ate 3 faca
        se i >= tamanhos[j] entao
          se alcancavel[i-tamanhos[j]+1] entao
            alcancavel[i+1] <- verdadeiro
            opcao[i+1] <- j
          fimse
        fimse
      fimpara
    fimpara
    maior <- 0
    para i de 0 ate volume faca
      se alcancavel[i+1] entao
        maior <- i
      fimse
    fimpara
    restante <- maior
    enquanto restante > 0 faca
      indice <- opcao[restante+1]
      quantidades[indice] <- quantidades[indice]+1
      restante <- restante-tamanhos[indice]
    fimenquanto
    para i de 1 ate 3 faca
      escreval("Copos de ", tamanhos[i], " mL: ", quantidades[i])
    fimpara
    escreval("Sobra: ", volume-maior, " mL")
  fimse''',
    'Receba volume de 0 a 10000 mL e três tamanhos positivos de copo. Escolha quantidades inteiras sem exceder o volume, minimizando a sobra.',
    'Volume 500 mL; tamanhos 200, 150, 100 → cinco copos de 100; sobra zero (outra combinação sem sobra também seria válida).',
    'Volume menor que todos os copos fica inteiramente como sobra.',
    'A programação dinâmica marca volumes que podem ser servidos exatamente; o maior volume alcançável minimiza a sobra. O vetor de escolhas permite reconstruir os copos.',
    ['Marque zero como alcançável.', 'Para cada volume, teste os três tamanhos.', 'Reconstrua a combinação a partir do maior volume alcançável.'])

add(7, '''  modelo: vetor[1..5] de caractere
  tamanho, estoque: vetor[1..5] de inteiro
  preco, desconto: vetor[1..5] de real
  i, filtro, encontrados: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Modelo ", i, ": ")
    leia(modelo[i])
    escreva("Tamanho (1 P, 2 M, 3 G): ")
    leia(tamanho[i])
    escreva("Estoque: ")
    leia(estoque[i])
    escreva("Preço: ")
    leia(preco[i])
    escreva("Desconto percentual: ")
    leia(desconto[i])
  fimpara
  escreva("Tamanho desejado (1 P, 2 M, 3 G): ")
  leia(filtro)
  encontrados <- 0
  para i de 1 ate 5 faca
    se (tamanho[i] = filtro) e (estoque[i] > 0) e (preco[i] >= 0) e (desconto[i] >= 0) e (desconto[i] <= 100) entao
      escreval(modelo[i], ": R$ ", preco[i] * (1 - desconto[i] / 100), ", ", estoque[i], " disponível(is)")
      encontrados <- encontrados + 1
    fimse
  fimpara
  escreval("Modelos disponíveis no tamanho: ", encontrados)''',
    'Cadastre cinco modelos com tamanho, estoque, preço e desconto. Filtre por tamanho e mostre somente modelos em estoque com preço final.',
    'Casaco M, estoque 2, preço R$ 100, desconto 20% → disponível por R$ 80',
    'Modelo sem estoque não aparece. Desconto fora de 0–100% invalida o preço.',
    'Vetores paralelos mantêm os atributos de cada modelo associados.',
    ['Guarde todos os campos no mesmo índice.', 'Filtre tamanho e estoque.', 'Aplique o desconto para exibir.'])

add(8, '''  temperatura: vetor[1..10] de real
  limite: real
  i, atual, maior, inicioAtual, inicioMaior: inteiro''', '''  escreva("Limite de frio: ")
  leia(limite)
  atual <- 0
  maior <- 0
  para i de 1 ate 10 faca
    escreva("Temperatura da noite ", i, ": ")
    leia(temperatura[i])
    se temperatura[i] < limite entao
      se atual = 0 entao
        inicioAtual <- i
      fimse
      atual <- atual + 1
      se atual > maior entao
        maior <- atual
        inicioMaior <- inicioAtual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  se maior = 0 entao
    escreval("Nenhuma noite abaixo do limite")
  senao
    escreval("Maior sequência: noites ", inicioMaior, " a ", inicioMaior + maior - 1, " (", maior, ")")
  fimse''',
    'Em dez noites, encontre a maior sequência consecutiva com temperatura estritamente abaixo do limite informado.',
    'Limite 10; leituras 8,7,11,9 → maior sequência de 2 nas noites 1–2',
    'Valor igual ao limite interrompe a sequência.',
    'O contador atual zera fora da faixa; o máximo conserva início e duração da melhor sequência.',
    ['Compare cada leitura ao limite.', 'Conte valores consecutivos.', 'Guarde o maior trecho.'])

add(9, '''  nome: vetor[1..3] de caractere
  watts, horasDia, dias, tarifa, custo, menor: real
  i, escolhido: inteiro''', '''  escreva("Tarifa em R$/kWh: ")
  leia(tarifa)
  se tarifa < 0 entao
    escreval("Tarifa inválida")
  senao
    escolhido <- 0
    para i de 1 ate 3 faca
      escreva("Aquecedor ", i, ": ")
      leia(nome[i])
      escreva("Potência em W: ")
      leia(watts)
      escreva("Horas de uso por dia: ")
      leia(horasDia)
      escreva("Dias de uso na semana: ")
      leia(dias)
      se (watts >= 0) e (horasDia >= 0) e (dias >= 0) e (horasDia <= 24) e (dias <= 7) entao
        custo <- watts * horasDia * dias * tarifa / 1000
        escreval(nome[i], ": R$ ", custo, " por semana")
        se (escolhido = 0) ou (custo < menor) entao
          escolhido <- i
          menor <- custo
        fimse
      senao
        escreval("Ciclo inválido")
      fimse
    fimpara
    se escolhido > 0 entao
      escreval("Menor custo: ", nome[escolhido], " por R$ ", menor)
    fimse
  fimse''',
    'Compare três aquecedores. Para cada um, leia potência, horas por dia e dias na semana; use a mesma tarifa por kWh.',
    '1000 W por 2 h/dia em 7 dias, tarifa R$ 1/kWh → R$ 14',
    'Horas acima de 24 ou dias acima de 7 invalidam o ciclo. Empate preserva o primeiro.',
    'A fórmula transforma Wh em kWh e multiplica pela tarifa.',
    ['Calcule W×horas×dias.', 'Divida por 1000.', 'Compare os custos.'])

add(10, '''  equipe: vetor[1..3] de inteiro
  i, pessoas, porPessoa, disponivel, necessario, servido, falta: inteiro''', '''  escreva("Porções disponíveis: ")
  leia(disponivel)
  escreva("Porções planejadas por pessoa: ")
  leia(porPessoa)
  se (disponivel < 0) ou (porPessoa <= 0) entao
    escreval("Dados inválidos")
  senao
    para i de 1 ate 3 faca
      escreva("Pessoas da equipe ", i, ": ")
      leia(equipe[i])
      se equipe[i] < 0 entao
        equipe[i] <- 0
      fimse
      necessario <- equipe[i] * porPessoa
      servido <- necessario
      se servido > disponivel entao
        servido <- disponivel
      fimse
      falta <- necessario - servido
      disponivel <- disponivel - servido
      escreval("Equipe ", i, ": ", servido, " porção(ões); faltam ", falta)
    fimpara
    escreval("Sobra na cozinha: ", disponivel)
  fimse''',
    'Atenda três equipes em ordem com um estoque total de porções. Cada pessoa precisa da mesma quantidade; reporte servido e déficit por equipe.',
    '10 porções, 2 por pessoa; equipes de 3 e 3 pessoas → servidas 6 e 4; segunda fica com falta 2',
    'Equipe com zero pessoa não consome.',
    'O estoque diminui após cada atendimento e nunca fica negativo.',
    ['Calcule demanda da equipe.', 'Sirva até o estoque restante.', 'Mostre a diferença como falta.'])

add(11, '''  i, h1, m1, h2, m2, inicioMin, fimMin, duracao, total: inteiro''', '''  total <- 0
  para i de 1 ate 7 faca
    escreva("Noite ", i, ": hora e minuto de dormir: ")
    leia(h1, m1)
    escreva("Hora e minuto de acordar: ")
    leia(h2, m2)
    se (h1 < 0) ou (h1 > 23) ou (h2 < 0) ou (h2 > 23) ou (m1 < 0) ou (m1 > 59) ou (m2 < 0) ou (m2 > 59) entao
      escreval("Horário inválido; noite contada como zero")
    senao
      inicioMin <- h1 * 60 + m1
      fimMin <- h2 * 60 + m2
      duracao <- fimMin - inicioMin
      se duracao <= 0 entao
        duracao <- duracao + 1440
      fimse
      total <- total + duracao
      escreval("Sono da noite: ", duracao, " min")
    fimse
  fimpara
  escreval("Total semanal: ", total, " min; média por noite: ", total / 7, " min")''',
    'Registre início e fim de sete noites no relógio de 24 horas. Horário de despertar menor ou igual ao de dormir pertence ao dia seguinte.',
    '23:00–07:00 → 480 minutos nessa noite',
    'Horários iguais representam 24 horas. Horário inválido conta como zero na média das sete noites.',
    'Cada duração é convertida para minutos e somada antes de dividir por sete.',
    ['Converta horários em minutos.', 'Ajuste travessia da meia-noite.', 'Some e divida por sete.'])

add(12, '''  leitura: vetor[1..10] de real
  i, validas, fora: inteiro
  minimo, maximo, soma: real''', '''  escreva("Limite mínimo: ")
  leia(minimo)
  escreva("Limite máximo: ")
  leia(maximo)
  se minimo > maximo entao
    escreval("Faixa inválida")
  senao
    soma <- 0
    validas <- 0
    fora <- 0
    para i de 1 ate 10 faca
      escreva("Leitura ", i, ": ")
      leia(leitura[i])
      se (leitura[i] < minimo) ou (leitura[i] > maximo) entao
        fora <- fora + 1
        escreval("Fora da faixa")
      senao
        validas <- validas + 1
        soma <- soma + leitura[i]
      fimse
    fimpara
    escreval("Fora da faixa: ", fora)
    se validas > 0 entao
      escreval("Média válida: ", soma / validas)
    senao
      escreval("Sem leituras válidas para média")
    fimse
  fimse''',
    'Defina limites inclusivos e leia dez medições. Marque as fora da faixa e calcule média somente das leituras dentro dos limites.',
    'Faixa 0–10; leituras 5 e 15 → uma fora, média válida 5',
    'Sem leitura válida, não divida por zero.',
    'A contagem de válidas é o denominador da média filtrada.',
    ['Compare cada leitura aos limites.', 'Some apenas as válidas.', 'Divida pela quantidade válida.'])

add(13, '''  recurso: vetor[1..3] de inteiro
  consumo: vetor[1..3] de inteiro
  dia, i, dias, primeiro: inteiro''', '''  para i de 1 ate 3 faca
    escreva("Estoque inicial do recurso ", i, ": ")
    leia(recurso[i])
    escreva("Consumo diário: ")
    leia(consumo[i])
  fimpara
  escreva("Dias de acampamento: ")
  leia(dias)
  primeiro <- 0
  se dias > 0 entao
    para dia de 1 ate dias faca
      se primeiro = 0 entao
        para i de 1 ate 3 faca
          se (recurso[i] < consumo[i]) ou (consumo[i] < 0) entao
            primeiro <- dia
            escreval("Falta do recurso ", i, " no dia ", dia)
          fimse
        fimpara
        se primeiro = 0 entao
          para i de 1 ate 3 faca
            recurso[i] <- recurso[i] - consumo[i]
          fimpara
        fimse
      fimse
    fimpara
  fimse
  se primeiro = 0 entao
    escreval("Estoque suficiente para todos os dias")
  fimse''',
    'Simule até N dias com três recursos. Cada dia exige a mesma quantidade de cada recurso; pare o consumo no primeiro dia em que faltar algum.',
    'Estoque 5 de um recurso, uso diário 2 → falta no dia 3',
    'Consumo zero não esgota o recurso. Dias zero não consomem nada.',
    'A checagem dos três estoques ocorre antes de descontar os consumos do dia.',
    ['Guarde estoque e consumo em vetores.', 'Confira todos os recursos a cada dia.', 'Registre o primeiro dia insuficiente.'])

add(14, '''  parada: vetor[1..4] de caractere
  viagem, espera: vetor[1..4] de inteiro
  i, relogio: inteiro''', '''  escreva("Hora inicial em minutos desde 00:00: ")
  leia(relogio)
  se relogio < 0 entao
    escreval("Horário inválido")
  senao
    para i de 1 ate 4 faca
      escreva("Parada ", i, ": ")
      leia(parada[i])
      escreva("Minutos de viagem até ela: ")
      leia(viagem[i])
      escreva("Minutos de espera nessa parada: ")
      leia(espera[i])
      se (viagem[i] >= 0) e (espera[i] >= 0) entao
        relogio <- relogio + viagem[i]
        escreval("Chegada a ", parada[i], ": ", relogio, " min")
        relogio <- relogio + espera[i]
        escreval("Saída: ", relogio, " min")
      senao
        escreval("Trecho inválido ignorado")
      fimse
    fimpara
    escreval("Fim do roteiro em ", relogio, " min")
  fimse''',
    'Percorra quatro paradas. Para cada uma, some tempo de viagem e depois de espera ao relógio acumulado.',
    'Início 480 min, viagem 30 e espera 10 → chegada 510, saída 520',
    'Tempo negativo invalida apenas aquele trecho. Relógio acima de 1440 indica dia seguinte.',
    'O mesmo relógio representa a linha do tempo completa do ônibus.',
    ['Acumule viagem.', 'Registre chegada.', 'Acumule espera e registre saída.'])

add(15, '''  neve, visitado: vetor[1..4, 1..4] de inteiro
  filaL, filaC: vetor[1..16] de inteiro
  linha, coluna, limiar, regioes, inicioFila, fimFila, atualL, atualC, novoL, novoC, direcao: inteiro''', '''  escreva("Limiar de neve: ")
  leia(limiar)
  para linha de 1 ate 4 faca
    para coluna de 1 ate 4 faca
      escreva("Intensidade em (", linha, ",", coluna, "): ")
      leia(neve[linha, coluna])
      visitado[linha, coluna] <- 0
    fimpara
  fimpara
  regioes <- 0
  para linha de 1 ate 4 faca
    para coluna de 1 ate 4 faca
      se (neve[linha, coluna] > limiar) e (visitado[linha, coluna] = 0) entao
        regioes <- regioes + 1
        inicioFila <- 1
        fimFila <- 1
        filaL[1] <- linha
        filaC[1] <- coluna
        visitado[linha, coluna] <- 1
        enquanto inicioFila <= fimFila faca
          atualL <- filaL[inicioFila]
          atualC <- filaC[inicioFila]
          inicioFila <- inicioFila + 1
          para direcao de 1 ate 4 faca
            novoL <- atualL
            novoC <- atualC
            escolha direcao
              caso 1
                novoL <- novoL - 1
              caso 2
                novoL <- novoL + 1
              caso 3
                novoC <- novoC - 1
              caso 4
                novoC <- novoC + 1
            fimescolha
            se (novoL >= 1) e (novoL <= 4) e (novoC >= 1) e (novoC <= 4) entao
              se (neve[novoL, novoC] > limiar) e (visitado[novoL, novoC] = 0) entao
                fimFila <- fimFila + 1
                filaL[fimFila] <- novoL
                filaC[fimFila] <- novoC
                visitado[novoL, novoC] <- 1
              fimse
            fimse
          fimpara
        fimenquanto
      fimse
    fimpara
  fimpara
  escreval("Regiões de neve acima do limiar: ", regioes)''',
    'Uma região é formada por células de matriz 4×4 com intensidade estritamente acima do limiar, conectadas na vertical ou horizontal. Conte as regiões.',
    'Duas células altas lado a lado formam uma região; separadas por célula baixa formam duas',
    'Diagonal sozinha não conecta duas células.',
    'A busca em largura marca todas as células da região antes de procurar a próxima origem.',
    ['Use matriz de visitados.', 'Inicie uma fila em cada célula alta não visitada.', 'Explore quatro vizinhos por célula.'])

add(16, '''  nome: vetor[1..4] de caractere
  vitorias, empates, pontos, ordem: vetor[1..4] de inteiro
  i, j, rodada, a, b, troca: inteiro
  trocaNome: caractere''', '''  para i de 1 ate 4 faca
    escreva("Jogador ", i, ": ")
    leia(nome[i])
    vitorias[i] <- 0
    empates[i] <- 0
    pontos[i] <- 0
    ordem[i] <- i
  fimpara
  para rodada de 1 ate 6 faca
    escreva("Índice do jogador A e B: ")
    leia(a, b)
    escreva("Resultado (1 A vence, 2 B vence, 3 empate): ")
    leia(i)
    se (a >= 1) e (a <= 4) e (b >= 1) e (b <= 4) e (a <> b) entao
      se i = 1 entao
        pontos[a] <- pontos[a] + 3
        vitorias[a] <- vitorias[a] + 1
      senao
        se i = 2 entao
          pontos[b] <- pontos[b] + 3
          vitorias[b] <- vitorias[b] + 1
        senao
          se i = 3 entao
            pontos[a] <- pontos[a] + 1
            pontos[b] <- pontos[b] + 1
            empates[a] <- empates[a] + 1
            empates[b] <- empates[b] + 1
          fimse
        fimse
      fimse
    fimse
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      se (pontos[ordem[j]] > pontos[ordem[i]]) ou ((pontos[ordem[j]] = pontos[ordem[i]]) e (vitorias[ordem[j]] > vitorias[ordem[i]])) entao
        troca <- ordem[i]
        ordem[i] <- ordem[j]
        ordem[j] <- troca
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval(i, "º ", nome[ordem[i]], ": ", pontos[ordem[i]], " ponto(s), ", vitorias[ordem[i]], " vitória(s), ", empates[ordem[i]], " empate(s)")
  fimpara''',
    'Quatro jogadores disputam seis partidas. Vitória vale 3 pontos, empate vale 1 a cada jogador. Mostre classificação por pontos e, como desempate, vitórias.',
    'A vence B → A ganha 3 pontos e uma vitória; B não pontua',
    'Partida com mesmo jogador nos dois lados é ignorada.',
    'Vetores acumulam estatísticas por jogador; um vetor de índices forma a classificação.',
    ['Guarde pontos e vitórias.', 'Atualize os dois jogadores no empate.', 'Compare pontos e vitórias no ranking.'])

add(17, '''  nome: vetor[1..5] de caractere
  comeco, termino: vetor[1..5] de inteiro
  preco: vetor[1..5] de real
  i, j, limite, minutoLivre, selecionados: inteiro
  custo, trocaR: real
  trocaI: inteiro
  trocaNome: caractere''', '''  para i de 1 ate 5 faca
    escreva("Sessão ", i, ": ")
    leia(nome[i])
    escreva("Início e fim em minutos: ")
    leia(comeco[i], termino[i])
    escreva("Ingresso R$: ")
    leia(preco[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se termino[j] < termino[i] entao
        trocaI <- comeco[i]
        comeco[i] <- comeco[j]
        comeco[j] <- trocaI
        trocaI <- termino[i]
        termino[i] <- termino[j]
        termino[j] <- trocaI
        trocaR <- preco[i]
        preco[i] <- preco[j]
        preco[j] <- trocaR
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  minutoLivre <- 0
  selecionados <- 0
  custo <- 0
  para i de 1 ate 5 faca
    se (comeco[i] >= minutoLivre) e (termino[i] >= comeco[i]) e (preco[i] >= 0) entao
      escreval("Assistir ", nome[i], " de ", comeco[i], " a ", termino[i])
      minutoLivre <- termino[i]
      custo <- custo + preco[i]
      selecionados <- selecionados + 1
    fimse
  fimpara
  escreval("Sessões: ", selecionados, "; custo R$ ", custo)''',
    'Escolha o máximo de sessões sem sobreposição entre cinco sessões, ordenando pelo horário de término. Some o preço das selecionadas.',
    'Sessões 60–90 e 90–120 podem ser vistas na sequência',
    'Sessão com término anterior ao início ou preço negativo é ignorada.',
    'Selecionar a sessão que termina primeiro deixa mais espaço para as próximas.',
    ['Ordene por término.', 'Selecione se começar após a sessão anterior.', 'Some o custo de cada selecionada.'])

add(18, '''  cor: vetor[1..10] de inteiro
  contagem: vetor[1..3] de inteiro
  i, pares, soltas: inteiro''', '''  para i de 1 ate 3 faca
    contagem[i] <- 0
  fimpara
  para i de 1 ate 10 faca
    escreva("Cor da meia ", i, " (1, 2 ou 3): ")
    leia(cor[i])
    se (cor[i] >= 1) e (cor[i] <= 3) entao
      contagem[cor[i]] <- contagem[cor[i]] + 1
    senao
      escreval("Cor inválida ignorada")
    fimse
  fimpara
  pares <- 0
  soltas <- 0
  para i de 1 ate 3 faca
    escreval("Cor ", i, ": ", contagem[i] div 2, " par(es), ", contagem[i] mod 2, " sem par")
    pares <- pares + contagem[i] div 2
    soltas <- soltas + contagem[i] mod 2
  fimpara
  escreval("Total: ", pares, " pares e ", soltas, " meias soltas")''',
    'Leia dez meias classificadas em três cores. Forme pares apenas com a mesma cor e mostre pares e sobras por cor e no total.',
    'Cores 1,1,1,2 → cor 1 tem um par e uma sobra; cor 2 tem uma sobra',
    'Código de cor fora de 1–3 é ignorado.',
    'A divisão inteira por dois encontra pares de cada cor; o resto encontra meias soltas.',
    ['Conte cada cor.', 'Use div por dois.', 'Use mod para sobras.'])

add(19, '''  tempo: vetor[1..3, 1..4] de real
  atleta, volta, melhorAtleta, melhorVolta: inteiro
  menor, soma: real''', '''  menor <- 999999999
  para atleta de 1 ate 3 faca
    soma <- 0
    para volta de 1 ate 4 faca
      escreva("Tempo do atleta ", atleta, " volta ", volta, " (s): ")
      leia(tempo[atleta, volta])
      se tempo[atleta, volta] > 0 entao
        soma <- soma + tempo[atleta, volta]
        se tempo[atleta, volta] < menor entao
          menor <- tempo[atleta, volta]
          melhorAtleta <- atleta
          melhorVolta <- volta
        fimse
      fimse
    fimpara
    escreval("Média do atleta ", atleta, ": ", soma / 4, " s")
  fimpara
  se menor < 999999999 entao
    escreval("Volta mais rápida: atleta ", melhorAtleta, " volta ", melhorVolta, " (", menor, " s)")
  fimse''',
    'Registre quatro tempos positivos de três atletas. Calcule média de cada atleta e encontre a volta mais rápida de toda a matriz.',
    'Atleta 1: 10, 11, 12, 11 s → média 11 s',
    'Tempos devem ser positivos; entrada não positiva precisa ser corrigida antes de interpretar a média.',
    'A matriz identifica atleta e volta; um mínimo global acompanha a leitura.',
    ['Some as quatro voltas por atleta.', 'Divida por quatro.', 'Atualize o mínimo global.'])

add(20, '''  peso: vetor[1..6] de inteiro
  i, mascara, bit, somaA, somaB, diferenca, menor, melhorMascara, total: inteiro''', '''  total <- 0
  para i de 1 ate 6 faca
    escreva("Peso inteiro do item ", i, ": ")
    leia(peso[i])
    se peso[i] < 0 entao
      peso[i] <- 0
    fimse
    total <- total + peso[i]
  fimpara
  menor <- total + 1
  melhorMascara <- 0
  para mascara de 0 ate 63 faca
    somaA <- 0
    bit <- 1
    para i de 1 ate 6 faca
      se (mascara div bit) mod 2 = 1 entao
        somaA <- somaA + peso[i]
      fimse
      bit <- bit * 2
    fimpara
    somaB <- total - somaA
    diferenca <- somaA - somaB
    se diferenca < 0 entao
      diferenca <- 0 - diferenca
    fimse
    se diferenca < menor entao
      menor <- diferenca
      melhorMascara <- mascara
    fimse
  fimpara
  escreval("Menor diferença: ", menor)
  bit <- 1
  para i de 1 ate 6 faca
    se (melhorMascara div bit) mod 2 = 1 entao
      escreval("Item ", i, " na mala A")
    senao
      escreval("Item ", i, " na mala B")
    fimse
    bit <- bit * 2
  fimpara''',
    'Distribua seis itens de pesos inteiros em duas malas, sem dividir itens. Examine as 64 alocações e escolha a de menor diferença absoluta de peso.',
    'Pesos 3 e 2, demais zero → uma mala com 3, outra com 2; diferença 1',
    'Peso negativo é tratado como zero. Empates preservam a primeira distribuição encontrada.',
    'Cada número de 0 a 63 codifica uma escolha binária de mala para os seis itens.',
    ['Enumere 2⁶ distribuições.', 'Some pesos de uma mala.', 'Compare a diferença absoluta com o melhor valor.'])

add(21, '''  grupo: vetor[1..5] de inteiro
  capacidade: vetor[1..3] de inteiro
  i, j, escolhido, livres: inteiro''', '''  para i de 1 ate 3 faca
    escreva("Capacidade da barraca ", i, ": ")
    leia(capacidade[i])
  fimpara
  para i de 1 ate 5 faca
    escreva("Pessoas da família ", i, ": ")
    leia(grupo[i])
    escolhido <- 0
    para j de 1 ate 3 faca
      se (grupo[i] > 0) e (capacidade[j] >= grupo[i]) entao
        se escolhido = 0 entao
          escolhido <- j
        senao
          se capacidade[j] < capacidade[escolhido] entao
            escolhido <- j
          fimse
        fimse
      fimse
    fimpara
    se escolhido = 0 entao
      escreval("Família ", i, " não alocada")
    senao
      capacidade[escolhido] <- capacidade[escolhido] - grupo[i]
      escreval("Família ", i, " na barraca ", escolhido)
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Vagas livres na barraca ", i, ": ", capacidade[i])
  fimpara''',
    'Cadastre três barracas de capacidades variadas e cinco famílias. Na ordem de chegada, coloque cada família inteira na menor barraca com vagas suficientes.',
    'Barracas de 4 e 6 vagas; família de 3 pessoas → barraca de 4 vagas',
    'Se nenhuma barraca comportar toda a família, informe que não foi alocada.',
    'A escolha da menor barraca compatível preserva barracas maiores para grupos posteriores.',
    ['Compare capacidade com tamanho do grupo.', 'Escolha a menor capacidade suficiente.', 'Desconte todas as pessoas do grupo juntas.'])

add(22, '''  risco: vetor[1..10] de inteiro
  i, limite, temperatura, atual, maior, inicioAtual, inicioMaior, periodos: inteiro''', '''  escreva("Limiar de geada em °C: ")
  leia(limite)
  atual <- 0
  maior <- 0
  periodos <- 0
  para i de 1 ate 10 faca
    escreva("Temperatura da hora ", i, ": ")
    leia(temperatura)
    risco[i] <- 0
    se temperatura <= limite entao
      risco[i] <- 1
      se atual = 0 entao
        inicioAtual <- i
        periodos <- periodos + 1
      fimse
      atual <- atual + 1
      se atual > maior entao
        maior <- atual
        inicioMaior <- inicioAtual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  escreval("Períodos de risco: ", periodos)
  se maior > 0 entao
    escreval("Maior período: horas ", inicioMaior, " a ", inicioMaior + maior - 1, " (", maior, " medições)")
  fimse''',
    'Leia dez medições horárias. Uma hora está em risco quando a temperatura é menor ou igual ao limiar. Conte blocos consecutivos e a duração do maior.',
    'Limiar 0; medições -1, -2, 2, 0 → dois períodos; maior com 2 medições',
    'Temperatura exatamente igual ao limiar conta como risco.',
    'Um novo período começa na transição de sem risco para risco.',
    ['Marque leituras em risco.', 'Conte uma abertura de período.', 'Acompanhe o maior bloco.'])

add(23, '''  pedido: vetor[1..4] de inteiro
  i, capacidadeA, capacidadeB, lotesA, lotesB, totalA, totalB: inteiro''', '''  escreva("Biscoitos por lote da receita A: ")
  leia(capacidadeA)
  escreva("Biscoitos por lote da receita B: ")
  leia(capacidadeB)
  se (capacidadeA <= 0) ou (capacidadeB <= 0) entao
    escreval("Capacidades inválidas")
  senao
    totalA <- 0
    totalB <- 0
    para i de 1 ate 4 faca
      escreva("Pedido ", i, " de biscoitos A: ")
      leia(pedido[i])
      se pedido[i] > 0 entao
        totalA <- totalA + pedido[i]
      fimse
      escreva("Pedido ", i, " de biscoitos B: ")
      leia(pedido[i])
      se pedido[i] > 0 entao
        totalB <- totalB + pedido[i]
      fimse
    fimpara
    lotesA <- totalA div capacidadeA
    se totalA mod capacidadeA <> 0 entao
      lotesA <- lotesA + 1
    fimse
    lotesB <- totalB div capacidadeB
    se totalB mod capacidadeB <> 0 entao
      lotesB <- lotesB + 1
    fimse
    escreval("Receita A: ", lotesA, " lote(s), sobra ", lotesA * capacidadeA - totalA)
    escreval("Receita B: ", lotesB, " lote(s), sobra ", lotesB * capacidadeB - totalB)
  fimse''',
    'Some quatro pedidos de duas receitas de biscoitos. Cada receita tem capacidade por lote distinta; calcule lotes inteiros e sobras para cada tipo.',
    'Pedidos A totalizam 11; lote A rende 5 → três lotes, sobra 4',
    'Pedido não positivo não acrescenta produção.',
    'Consolidar os pedidos antes de arredondar evita produzir lotes extras desnecessários.',
    ['Some pedidos por receita.', 'Divida cada soma pela capacidade.', 'Arredonde para cima e calcule sobra.'])

add(24, '''  nome: vetor[1..5] de caractere
  distancia, tempo, subida: vetor[1..5] de real
  i, j, criterio: inteiro
  trocaR, a, b: real
  trocaNome: caractere''', '''  para i de 1 ate 5 faca
    escreva("Trilha ", i, ": ")
    leia(nome[i])
    escreva("Distância km, tempo h e subida m: ")
    leia(distancia[i], tempo[i], subida[i])
  fimpara
  escreva("Ordenar por (1 distância, 2 tempo, 3 subida): ")
  leia(criterio)
  se (criterio < 1) ou (criterio > 3) entao
    escreval("Critério inválido")
  senao
    para i de 1 ate 4 faca
      para j de i + 1 ate 5 faca
        escolha criterio
          caso 1
            a <- distancia[i]
            b <- distancia[j]
          caso 2
            a <- tempo[i]
            b <- tempo[j]
          caso 3
            a <- subida[i]
            b <- subida[j]
        fimescolha
        se b < a entao
          trocaR <- distancia[i]
          distancia[i] <- distancia[j]
          distancia[j] <- trocaR
          trocaR <- tempo[i]
          tempo[i] <- tempo[j]
          tempo[j] <- trocaR
          trocaR <- subida[i]
          subida[i] <- subida[j]
          subida[j] <- trocaR
          trocaNome <- nome[i]
          nome[i] <- nome[j]
          nome[j] <- trocaNome
        fimse
      fimpara
    fimpara
    para i de 1 ate 5 faca
      escreval(i, "º ", nome[i], ": ", distancia[i], " km; ", tempo[i], " h; ", subida[i], " m")
    fimpara
  fimse''',
    'Cadastre cinco trilhas e escolha um critério: menor distância, menor tempo ou menor ganho de elevação. Ordene todos os campos associados.',
    'Critério distância: trilhas de 2 km e 5 km → 2 km primeiro',
    'Empates preservam a ordem de cadastro.',
    'O critério escolhido fornece os dois valores comparados, enquanto as trocas mantêm os demais campos juntos.',
    ['Leia os três atributos de cada trilha.', 'Selecione a chave de comparação.', 'Troque todos os atributos juntos.'])

add(25, '''  nome: vetor[1..4] de caractere
  pontos: vetor[1..4] de inteiro
  i, rodada, valor, j, troca: inteiro
  trocaNome: caractere''', '''  para i de 1 ate 4 faca
    escreva("Jogador ", i, ": ")
    leia(nome[i])
    pontos[i] <- 0
  fimpara
  para rodada de 1 ate 3 faca
    escreval("Rodada ", rodada)
    para i de 1 ate 4 faca
      escreva("Pontos de ", nome[i], ": ")
      leia(valor)
      se valor >= 0 entao
        pontos[i] <- pontos[i] + valor
      fimse
    fimpara
    para i de 1 ate 4 faca
      escreval(nome[i], ": ", pontos[i], " ponto(s) acumulados")
    fimpara
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      se pontos[j] > pontos[i] entao
        troca <- pontos[i]
        pontos[i] <- pontos[j]
        pontos[j] <- troca
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval(i, "º ", nome[i], ": ", pontos[i], " pontos")
  fimpara''',
    'Quatro jogadores disputam três rodadas. Exiba o placar acumulado após cada rodada e, ao final, classifique por pontos decrescentes.',
    'Ana faz 3, 2, 4 → placares 3, 5 e 9',
    'Pontuação negativa de uma rodada é ignorada; empate conserva cadastro.',
    'O total por jogador é atualizado em cada rodada antes da ordenação final.',
    ['Acumule pontos por índice.', 'Mostre após cada rodada.', 'Ordene os totais ao fim.'])

add(26, '''  antigo, novo, horas, dias, tarifa, consumoAntigo, consumoNovo: real''', '''  escreva("Potência antiga em W: ")
  leia(antigo)
  escreva("Potência nova em W: ")
  leia(novo)
  escreva("Horas por dia: ")
  leia(horas)
  escreva("Dias de uso: ")
  leia(dias)
  escreva("Tarifa R$/kWh: ")
  leia(tarifa)
  se (antigo < 0) ou (novo < 0) ou (horas < 0) ou (dias < 0) ou (tarifa < 0) entao
    escreval("Dados inválidos")
  senao
    consumoAntigo <- antigo * horas * dias / 1000
    consumoNovo <- novo * horas * dias / 1000
    escreval("Consumo antigo: ", consumoAntigo, " kWh")
    escreval("Consumo novo: ", consumoNovo, " kWh")
    escreval("Economia estimada: R$ ", (consumoAntigo - consumoNovo) * tarifa)
  fimse''',
    'Compare um aparelho antigo e um substituto sob o mesmo ciclo de uso. Calcule consumo em kWh e diferença de custo pela tarifa informada.',
    '100 W trocados por 50 W, 10 h, tarifa R$ 1/kWh → economia R$ 0,50',
    'Economia negativa indica substituto que custa mais energia.',
    'A diferença entre consumos multiplicada pela tarifa mede a economia monetária.',
    ['Calcule kWh dos dois.', 'Subtraia consumos.', 'Multiplique pela tarifa.'])

add(27, '''  preco: vetor[1..3, 1..3] de real
  a, b, c: inteiro
  teto, custo, melhor: real
  melhorA, melhorB, melhorC: inteiro''', '''  escreva("Orçamento por kit: ")
  leia(teto)
  para a de 1 ate 3 faca
    para b de 1 ate 3 faca
      escreva("Preço da categoria ", a, " opção ", b, ": ")
      leia(preco[a, b])
    fimpara
  fimpara
  melhor <- -1
  para a de 1 ate 3 faca
    para b de 1 ate 3 faca
      para c de 1 ate 3 faca
        custo <- preco[1, a] + preco[2, b] + preco[3, c]
        se (preco[1, a] >= 0) e (preco[2, b] >= 0) e (preco[3, c] >= 0) e (custo <= teto) entao
          se custo > melhor entao
            melhor <- custo
            melhorA <- a
            melhorB <- b
            melhorC <- c
          fimse
        fimse
      fimpara
    fimpara
  fimpara
  se melhor < 0 entao
    escreval("Nenhum kit cabe no orçamento")
  senao
    escreval("Kit: opções ", melhorA, ", ", melhorB, ", ", melhorC, "; custo R$ ", melhor, "; saldo R$ ", teto - melhor)
  fimse''',
    'Há três categorias de agasalho, cada uma com três opções de preço. Monte um kit com exatamente uma peça de cada categoria, maximizando o uso do orçamento sem ultrapassá-lo.',
    'Teto R$ 30; opções escolhidas de R$ 10, R$ 12 e R$ 8 → kit R$ 30',
    'Preço negativo torna a opção inválida.',
    'Os três laços examinam as 27 combinações possíveis e retêm a mais cara ainda acessível.',
    ['Escolha uma opção por categoria.', 'Some os três preços.', 'Guarde a melhor soma dentro do teto.'])

add(28, '''  pessoas: vetor[1..3] de inteiro
  paesPorPessoa, leitePorPessoa: real
  i, totalPessoas: inteiro
  paes, leite: real''', '''  totalPessoas <- 0
  para i de 1 ate 3 faca
    escreva("Pessoas do grupo ", i, ": ")
    leia(pessoas[i])
    se pessoas[i] > 0 entao
      totalPessoas <- totalPessoas + pessoas[i]
    fimse
  fimpara
  escreva("Pães por pessoa: ")
  leia(paesPorPessoa)
  escreva("Litros de leite por pessoa: ")
  leia(leitePorPessoa)
  se (paesPorPessoa < 0) ou (leitePorPessoa < 0) entao
    escreval("Consumo inválido")
  senao
    para i de 1 ate 3 faca
      se pessoas[i] >= 0 entao
        escreval("Grupo ", i, ": ", pessoas[i] * paesPorPessoa, " pães e ", pessoas[i] * leitePorPessoa, " L de leite")
      fimse
    fimpara
    paes <- totalPessoas * paesPorPessoa
    leite <- totalPessoas * leitePorPessoa
    escreval("Compra total: ", paes, " pães e ", leite, " L de leite")
  fimse''',
    'Três grupos compartilham o mesmo cardápio. Multiplique o tamanho de cada grupo pelo consumo individual de pães e leite; consolide a compra.',
    'Grupos de 2 e 3 pessoas; 2 pães por pessoa → 4 e 6 pães, total 10',
    'Grupo com quantidade negativa é ignorado no total.',
    'A compra conjunta é o número total de pessoas multiplicado pelo consumo individual.',
    ['Leia o tamanho de cada grupo.', 'Aplique consumo por pessoa.', 'Some para a lista total.'])

add(29, '''  nome: vetor[1..5] de caractere
  dia, minuto: vetor[1..5] de inteiro
  i, j, trocaI, instanteAnterior, instanteAtual: inteiro
  trocaNome: caractere''', '''  para i de 1 ate 5 faca
    escreva("Evento ", i, ": ")
    leia(nome[i])
    escreva("Dia de julho: ")
    leia(dia[i])
    escreva("Minuto do dia (0 a 1439): ")
    leia(minuto[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se (dia[j] < dia[i]) ou ((dia[j] = dia[i]) e (minuto[j] < minuto[i])) entao
        trocaI <- dia[i]
        dia[i] <- dia[j]
        dia[j] <- trocaI
        trocaI <- minuto[i]
        minuto[i] <- minuto[j]
        minuto[j] <- trocaI
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(nome[i], ": dia ", dia[i], ", minuto ", minuto[i])
    se i > 1 entao
      instanteAnterior <- dia[i - 1] * 1440 + minuto[i - 1]
      instanteAtual <- dia[i] * 1440 + minuto[i]
      escreval("Intervalo desde o anterior: ", instanteAtual - instanteAnterior, " min")
    fimse
  fimpara''',
    'Cadastre cinco eventos do mesmo mês com dia e minuto do dia. Ordene cronologicamente e calcule o intervalo em minutos entre eventos consecutivos.',
    'Dia 2 às 60 min e dia 3 às 30 min → intervalo de 1410 min',
    'Dia deve estar entre 1 e 31, minuto entre 0 e 1439; a atividade pressupõe entradas válidas.',
    'Transformar dia e minuto num único instante em minutos permite subtrair eventos de dias diferentes.',
    ['Ordene primeiro por dia e depois por minuto.', 'Mantenha nome junto.', 'Converta ambos para minutos absolutos.'])

add(30, '''  atividade: vetor[1..5] de caractere
  externa: vetor[1..5] de inteiro
  i, chuva, internas, realizadas: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Atividade ", i, ": ")
    leia(atividade[i])
    escreva("É externa? (0 não, 1 sim): ")
    leia(externa[i])
  fimpara
  escreva("Há chuva? (0 não, 1 sim): ")
  leia(chuva)
  realizadas <- 0
  internas <- 0
  para i de 1 ate 5 faca
    se (chuva = 1) e (externa[i] = 1) entao
      escreval(atividade[i], ": adiada por chuva")
    senao
      escreval(atividade[i], ": mantida")
      realizadas <- realizadas + 1
      se externa[i] = 0 entao
        internas <- internas + 1
      fimse
    fimse
  fimpara
  escreval("Mantidas: ", realizadas, "; internas disponíveis: ", internas)''',
    'Cadastre cinco atividades e marque quais são externas. Com chuva, adie as externas; sem chuva, mantenha todas. Informe o novo plano.',
    'Chuva sim; passeio externo é adiado e jogo interno é mantido',
    'A entrada de chuva deve ser 0 ou 1 nesta simulação.',
    'A decisão combina a restrição climática com o tipo de cada atividade.',
    ['Guarde se cada atividade é externa.', 'Leia o estado do clima.', 'Decida individualmente.'])

add(31, '''  temperatura: vetor[1..3, 1..4] de real
  local, semana, melhorLocal, melhorSemana, piorLocal, piorSemana: inteiro
  menor, maior, soma: real''', '''  menor <- 999999999
  maior <- -999999999
  para local de 1 ate 3 faca
    soma <- 0
    para semana de 1 ate 4 faca
      escreva("Temperatura local ", local, " semana ", semana, ": ")
      leia(temperatura[local, semana])
      soma <- soma + temperatura[local, semana]
      se temperatura[local, semana] < menor entao
        menor <- temperatura[local, semana]
        piorLocal <- local
        piorSemana <- semana
      fimse
      se temperatura[local, semana] > maior entao
        maior <- temperatura[local, semana]
        melhorLocal <- local
        melhorSemana <- semana
      fimse
    fimpara
    escreval("Média do local ", local, ": ", soma / 4)
  fimpara
  escreval("Mínima: ", menor, " no local ", piorLocal, " semana ", piorSemana)
  escreval("Máxima: ", maior, " no local ", melhorLocal, " semana ", melhorSemana)''',
    'Registre temperaturas de três locais em quatro semanas. Mostre média por local, mínima e máxima globais com a posição na matriz.',
    'Local 1 tem 10, 12, 14, 16 °C → média 13 °C',
    'Temperaturas negativas são válidas; empates de extremos preservam a primeira ocorrência.',
    'O percurso da matriz permite acumular cada linha e comparar extremos de todas as células.',
    ['Use matriz local×semana.', 'Some cada linha.', 'Atualize mínimo e máximo globais.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Catalogued {len(entries)} challenge solutions')
