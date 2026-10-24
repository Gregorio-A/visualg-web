#!/usr/bin/env python3
"""Curated advanced January exercises."""

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "data/challenge-solutions.json"
entries = json.loads(CATALOG.read_text(encoding="utf-8"))


def add(day, variables, body, objective, rules, example, edge, explanation, hints):
    key = f"01-{day:02d}/avancado"
    code = f'algoritmo "Desafio01{day:02d}A"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[key] = dict(code=code, objective=objective, rules=rules,
                        example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '''  destinos: vetor[1..5] de caractere
  custos: vetor[1..5] de real
  i, barato, caro: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Destino ", i, ": ")
    leia(destinos[i])
    escreva("Custo: ")
    leia(custos[i])
  fimpara
  barato <- 1
  caro <- 1
  para i de 2 ate 5 faca
    se custos[i] < custos[barato] entao
      barato <- i
    fimse
    se custos[i] > custos[caro] entao
      caro <- i
    fimse
  fimpara
  escreval("Mais barato: ", destinos[barato], " (", custos[barato], ")")
  escreval("Mais caro: ", destinos[caro], " (", custos[caro], ")")''',
    'Cadastre cinco destinos de férias com seus custos e identifique os extremos.',
    'Leia nome e custo de cada destino na mesma posição de dois vetores. Compare os custos, guardando o índice do menor e do maior. Em empate, conserve o primeiro cadastrado.',
    'Destino 1: Praia\nCusto: 500\nDestino 2: Serra\nCusto: 300\nDestino 3: Campo\nCusto: 450\nDestino 4: Ilha\nCusto: 800\nDestino 5: Lago\nCusto: 600\nMais barato: Serra (300)\nMais caro: Ilha (800)',
    'Custos iguais são permitidos: o primeiro destino com aquele custo permanece escolhido.',
    'Os índices `barato` e `caro` apontam para posições dos vetores, evitando perder a associação entre destino e custo.',
    ['Use vetores paralelos para relacionar nomes e preços.', 'Inicialize ambos os extremos na primeira posição.', 'Compare cada custo com os custos das posições extremas.'])

add(2, '''  temperaturas: vetor[1..7] de real
  soma, media, maxima: real
  i, acima: inteiro''', '''  soma <- 0
  para i de 1 ate 7 faca
    escreva("Temperatura do dia ", i, ": ")
    leia(temperaturas[i])
    soma <- soma + temperaturas[i]
    se (i = 1) ou (temperaturas[i] > maxima) entao
      maxima <- temperaturas[i]
    fimse
  fimpara
  media <- soma / 7
  acima <- 0
  para i de 1 ate 7 faca
    se temperaturas[i] > media entao
      acima <- acima + 1
    fimse
  fimpara
  escreval("Média: ", media)
  escreval("Máxima: ", maxima)
  escreval("Dias acima da média: ", acima)''',
    'Analise sete temperaturas diárias e informe média, valor máximo e quantidade de dias acima da média.',
    'Guarde as sete medições. Calcule soma e máxima na leitura. Faça uma segunda passagem depois de obter a média para contar apenas valores estritamente acima dela.',
    'Temperaturas: 20, 22, 24, 26, 28, 30, 32\nMédia: 26\nMáxima: 32\nDias acima da média: 3',
    'Valores iguais à média não entram na contagem. Todas as temperaturas podem ser negativas.',
    'A segunda passagem é necessária porque a média só fica conhecida após a leitura de todos os dias.',
    ['Armazene os sete valores em vetor.', 'Calcule a média com a soma dividida por sete.', 'Percorra o vetor novamente e conte apenas `temperaturas[i] > media`.'])

add(3, '''  precos: vetor[1..3] de real
  vendidos: vetor[1..3] de inteiro
  sabor, quantidade, i: inteiro
  receita: real''', '''  para i de 1 ate 3 faca
    escreva("Preço do sabor ", i, ": ")
    leia(precos[i])
    vendidos[i] <- 0
  fimpara
  receita <- 0
  escreva("Sabor do pedido (1 a 3; 0 encerra): ")
  leia(sabor)
  enquanto sabor <> 0 faca
    se (sabor >= 1) e (sabor <= 3) entao
      escreva("Quantidade: ")
      leia(quantidade)
      se quantidade > 0 entao
        vendidos[sabor] <- vendidos[sabor] + quantidade
        receita <- receita + quantidade * precos[sabor]
      senao
        escreval("Quantidade inválida.")
      fimse
    senao
      escreval("Sabor inválido.")
    fimse
    escreva("Sabor do pedido (1 a 3; 0 encerra): ")
    leia(sabor)
  fimenquanto
  para i de 1 ate 3 faca
    escreval("Sabor ", i, ": ", vendidos[i], " unidade(s)")
  fimpara
  escreval("Total arrecadado: ", receita)''',
    'Simule a venda de três sabores de sorvete e apresente quantidades e receita.',
    'Cadastre os preços de três sabores. Depois leia pedidos com sabor e quantidade; o código 0 encerra. Ignore quantidades não positivas e sabores fora de 1 a 3.',
    'Preços: 5, 6, 7\nPedidos: sabor 1 × 2; sabor 3 × 1; 0\nSabor 1: 2 unidade(s)\nSabor 2: 0 unidade(s)\nSabor 3: 1 unidade(s)\nTotal arrecadado: 17',
    'Encerrar sem pedidos gera receita e contagens iguais a zero.',
    'Cada pedido atualiza apenas a posição do sabor selecionado e soma quantidade × preço à receita.',
    ['Use vetores de tamanho três para preços e unidades vendidas.', 'Repita a leitura até receber o código de parada.', 'Acumule receita e quantidades apenas para pedidos válidos.'])

add(4, '''  inicioReserva: vetor[1..5] de inteiro
  fimReserva: vetor[1..5] de inteiro
  i, j: inteiro
  conflito: logico''', '''  para i de 1 ate 5 faca
    escreva("Início da reserva ", i, " (minutos): ")
    leia(inicioReserva[i])
    escreva("Fim da reserva ", i, " (minutos): ")
    leia(fimReserva[i])
  fimpara
  conflito <- falso
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se (inicioReserva[i] < fimReserva[i]) e (inicioReserva[j] < fimReserva[j]) entao
        se (inicioReserva[i] < fimReserva[j]) e (inicioReserva[j] < fimReserva[i]) entao
          escreval("Sobreposição entre reservas ", i, " e ", j)
          conflito <- verdadeiro
        fimse
      fimse
    fimpara
  fimpara
  se nao conflito entao
    escreval("Nenhuma sobreposição encontrada.")
  fimse''',
    'Detecte conflitos entre cinco reservas de piscina expressas como intervalos de minutos.',
    'Cada reserva começa no minuto inicial e termina antes do minuto final. Compare todos os pares distintos. Horários adjacentes, como 10–20 e 20–30, não se sobrepõem.',
    'Reservas: 10–20, 20–30, 15–25, 30–40, 40–50\nSobreposição entre reservas 1 e 3\nSobreposição entre reservas 2 e 3',
    'Reservas com início igual ou posterior ao fim não formam intervalo válido e são desconsideradas nas comparações.',
    'Dois intervalos válidos se cruzam quando cada início ocorre antes do fim do outro.',
    ['Guarde inícios e fins em vetores paralelos.', 'Percorra pares com `j` começando em `i + 1`.', 'Use duas comparações estritas para não marcar horários adjacentes.'])

add(5, '''  nome: vetor[1..5] de caractere
  custoPorMl: vetor[1..5] de real
  volume, preco, temporario: real
  nomeTemporario: caractere
  i, j: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Embalagem ", i, ": ")
    leia(nome[i])
    escreva("Volume (ml): ")
    leia(volume)
    escreva("Preço: ")
    leia(preco)
    se volume > 0 entao
      custoPorMl[i] <- preco / volume
    senao
      custoPorMl[i] <- 999999999
    fimse
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se custoPorMl[j] < custoPorMl[i] entao
        temporario <- custoPorMl[i]
        custoPorMl[i] <- custoPorMl[j]
        custoPorMl[j] <- temporario
        nomeTemporario <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- nomeTemporario
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(i, "º: ", nome[i], " — custo por ml: ", custoPorMl[i])
  fimpara''',
    'Compare cinco protetores solares pelo custo por mililitro, do menor para o maior.',
    'Leia nome, volume e preço de cada embalagem. Calcule `preço / volume`, ordene as cinco posições por esse indicador e mostre o resultado. Volumes nulos são enviados ao fim.',
    'Embalagens: A 100 ml R$ 20; B 200 ml R$ 30; C 50 ml R$ 15; D 100 ml R$ 40; E 250 ml R$ 50\nOrdem: B (0,15/ml), A (0,20/ml), E (0,20/ml), C (0,30/ml), D (0,40/ml)',
    'Em caso de custo por ml igual, a ordem original é preservada porque a troca ocorre apenas com `<`.',
    'Quando dois custos trocam de posição, os nomes correspondentes também trocam; assim o ranking mantém a relação entre dado e embalagem.',
    ['Calcule um indicador comparável para cada produto.', 'Não divida por volume zero.', 'Ao ordenar, mova o nome junto com o indicador.'])

add(6, '''  passos: vetor[1..7] de inteiro
  meta, i, atual, maior, inicioAtual, inicioMaior: inteiro''', '''  escreva("Meta diária de passos: ")
  leia(meta)
  atual <- 0
  maior <- 0
  inicioAtual <- 0
  inicioMaior <- 0
  para i de 1 ate 7 faca
    escreva("Passos do dia ", i, ": ")
    leia(passos[i])
    se passos[i] > meta entao
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
  escreval("Maior sequência: ", maior, " dia(s)")
  se maior > 0 entao
    escreval("Do dia ", inicioMaior, " ao dia ", inicioMaior + maior - 1)
  fimse''',
    'Encontre a maior sequência de dias consecutivos em que a meta de passos foi ultrapassada.',
    'Leia a meta e os totais de sete dias. Um dia conta apenas se seus passos forem estritamente maiores que a meta. Quebre a sequência ao encontrar dia igual ou menor.',
    'Meta: 1000\nPassos: 1200, 1300, 900, 1100, 1500, 1600, 800\nMaior sequência: 3 dias\nDo dia 4 ao dia 6',
    'Se nenhum dia superar a meta, a maior sequência será zero.',
    '`atual` mede a sequência em andamento e `maior` preserva o maior trecho encontrado.',
    ['Mantenha um contador de dias consecutivos.', 'Zere o contador ao encontrar um dia fora da meta.', 'Guarde a posição inicial quando começa uma nova sequência.'])

add(7, '''  nome: vetor[1..5] de caractere
  peso: vetor[1..5] de real
  prioridade: vetor[1..5] de inteiro
  usado: vetor[1..5] de logico
  capacidade, acumulado: real
  i, j, escolhido, melhorPrioridade: inteiro''', '''  escreva("Peso máximo da mala: ")
  leia(capacidade)
  para i de 1 ate 5 faca
    escreva("Item ", i, ": ")
    leia(nome[i])
    escreva("Peso: ")
    leia(peso[i])
    escreva("Prioridade (menor número = mais importante): ")
    leia(prioridade[i])
    usado[i] <- falso
  fimpara
  acumulado <- 0
  para i de 1 ate 5 faca
    escolhido <- 0
    melhorPrioridade <- 999999999
    para j de 1 ate 5 faca
      se (nao usado[j]) e (prioridade[j] < melhorPrioridade) entao
        escolhido <- j
        melhorPrioridade <- prioridade[j]
      fimse
    fimpara
    se escolhido > 0 entao
      usado[escolhido] <- verdadeiro
      se (peso[escolhido] >= 0) e (acumulado + peso[escolhido] <= capacidade) entao
        acumulado <- acumulado + peso[escolhido]
        escreval("Incluído: ", nome[escolhido])
      senao
        escreval("Fora da mala: ", nome[escolhido])
      fimse
    fimse
  fimpara
  escreval("Peso usado: ", acumulado)''',
    'Selecione itens para uma mala por ordem de prioridade sem ultrapassar o limite de peso.',
    'Cadastre cinco itens com peso e prioridade; números menores são mais urgentes. Examine os itens nessa ordem e inclua cada um se couber no peso ainda disponível. Empates conservam a ordem de cadastro.',
    'Capacidade: 4 kg\nItens: livro 2 kg prioridade 2; roupa 3 kg prioridade 1; cinco itens ao todo\nIncluído: roupa\nFora da mala: livro\nPeso usado: 3 kg',
    'Um item pesado pode ficar fora enquanto outro de prioridade menor ainda cabe. O método é guloso e respeita a prioridade informada.',
    'O vetor `usado` evita selecionar o mesmo item duas vezes; `acumulado` nunca passa da capacidade.',
    ['Defina claramente o sentido do número de prioridade.', 'A cada passo, escolha o item ainda não examinado com menor prioridade numérica.', 'Inclua somente quando `acumulado + peso <= capacidade`.'])

add(8, '''  nome: vetor[1..3] de caractere
  tarifa, duracao: vetor[1..3] de real
  i, barata, rapida: inteiro''', '''  para i de 1 ate 3 faca
    escreva("Rota ", i, ": ")
    leia(nome[i])
    escreva("Tarifa: ")
    leia(tarifa[i])
    escreva("Duração (minutos): ")
    leia(duracao[i])
  fimpara
  barata <- 1
  rapida <- 1
  para i de 2 ate 3 faca
    se tarifa[i] < tarifa[barata] entao
      barata <- i
    fimse
    se duracao[i] < duracao[rapida] entao
      rapida <- i
    fimse
  fimpara
  escreval("Mais barata: ", nome[barata], " — ", tarifa[barata])
  escreval("Mais rápida: ", nome[rapida], " — ", duracao[rapida], " minutos")''',
    'Compare três rotas e identifique separadamente a menor tarifa e a menor duração.',
    'Leia nome, preço e duração de cada rota. Calcule dois índices independentes, pois a rota mais barata pode não ser a mais rápida.',
    'Rotas: A R$ 10/40 min; B R$ 12/25 min; C R$ 15/30 min\nMais barata: A — 10\nMais rápida: B — 25 minutos',
    'Em empate, mantenha a primeira rota cadastrada para aquele critério.',
    'Dois índices evitam confundir os critérios preço e tempo.',
    ['Use vetores paralelos para cada atributo.', 'Comece com a primeira rota como referência.', 'Faça comparações independentes para tarifa e duração.'])

add(9, '''  nome: vetor[1..5] de caractere
  preco: vetor[1..5] de real
  estoque: vetor[1..5] de inteiro
  i, opcao, quantidade: inteiro
  total, pago: real''', '''  para i de 1 ate 5 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    escreva("Preço: ")
    leia(preco[i])
    escreva("Estoque: ")
    leia(estoque[i])
  fimpara
  total <- 0
  escreva("Produto desejado (1 a 5; 0 encerra): ")
  leia(opcao)
  enquanto opcao <> 0 faca
    se (opcao >= 1) e (opcao <= 5) entao
      escreva("Quantidade: ")
      leia(quantidade)
      se (quantidade > 0) e (quantidade <= estoque[opcao]) entao
        estoque[opcao] <- estoque[opcao] - quantidade
        total <- total + quantidade * preco[opcao]
      senao
        escreval("Quantidade inválida ou estoque insuficiente.")
      fimse
    senao
      escreval("Produto inválido.")
    fimse
    escreva("Produto desejado (1 a 5; 0 encerra): ")
    leia(opcao)
  fimenquanto
  escreval("Total: ", total)
  escreva("Valor pago: ")
  leia(pago)
  se pago >= total entao
    escreval("Troco: ", pago - total)
  senao
    escreval("Pagamento insuficiente; faltam: ", total - pago)
  fimse''',
    'Monte um caixa de lanchonete com cinco produtos, estoque e cálculo de troco.',
    'Cadastre nome, preço e estoque de cinco itens. Leia pedidos até código 0; somente pedidos com quantidade positiva e estoque suficiente reduzem unidades e entram no total. Depois leia o pagamento.',
    'Produto 1: suco, preço 5, estoque 3\nPedido: produto 1, quantidade 2; depois 0\nTotal: 10\nValor pago: 20\nTroco: 10',
    'Um pedido de quantidade superior ao estoque é recusado integralmente. Pagamento menor que total mostra quanto falta.',
    'Cada venda atualiza o estoque e a compra no mesmo passo, impedindo vender a mesma unidade mais de uma vez.',
    ['Guarde preço e estoque em vetores indexados pelo número do produto.', 'Valide o índice antes de acessar um vetor.', 'Diminua o estoque só depois de conferir a quantidade.'])

add(10, '''  atividade: vetor[1..5] de caractere
  duracao: vetor[1..5] de inteiro
  i, limite, usado: inteiro''', '''  escreva("Minutos disponíveis no dia: ")
  leia(limite)
  usado <- 0
  para i de 1 ate 5 faca
    escreva("Atividade ", i, ": ")
    leia(atividade[i])
    escreva("Duração (minutos): ")
    leia(duracao[i])
    se (duracao[i] >= 0) e (usado + duracao[i] <= limite) entao
      escreval(atividade[i], ": do minuto ", usado, " ao ", usado + duracao[i])
      usado <- usado + duracao[i]
    senao
      escreval(atividade[i], " não cabe no dia.")
    fimse
  fimpara
  escreval("Minutos ocupados: ", usado)''',
    'Organize cinco atividades em sequência sem ultrapassar o tempo disponível no dia.',
    'Leia o limite em minutos e depois nome e duração de cada atividade. Mantenha a ordem informada; encaixe a atividade apenas se sua duração couber. Mostre início e fim relativos ao começo da programação.',
    'Minutos disponíveis: 120\nAtividades: natação 60, leitura 45, passeio 30, descanso 10, foto 5\nNatação: 0–60; leitura: 60–105; passeio não cabe; descanso: 105–115; foto: 115–120',
    'Duração igual ao tempo restante cabe exatamente. Duração negativa é rejeitada.',
    'O acumulador `usado` representa o início da próxima atividade incluída e nunca excede o limite.',
    ['Some apenas as durações das atividades aceitas.', 'Teste se `usado + duracao <= limite` antes de alterar o acumulador.', 'Mostre o intervalo de cada atividade aceita.'])

add(11, '''  nascer, porDoSol: vetor[1..7] de inteiro
  i, diaMaisLongo, duracao, maior: inteiro''', '''  diaMaisLongo <- 0
  maior <- -1
  para i de 1 ate 7 faca
    escreva("Nascer do sol do dia ", i, " (minutos): ")
    leia(nascer[i])
    escreva("Pôr do sol do dia ", i, " (minutos): ")
    leia(porDoSol[i])
    duracao <- porDoSol[i] - nascer[i]
    se (nascer[i] >= 0) e (porDoSol[i] <= 1440) e (duracao >= 0) entao
      se duracao > maior entao
        maior <- duracao
        diaMaisLongo <- i
      fimse
    senao
      escreval("Horários inválidos no dia ", i)
    fimse
  fimpara
  se diaMaisLongo > 0 entao
    escreval("Maior duração: dia ", diaMaisLongo, " com ", maior, " minuto(s)")
  senao
    escreval("Nenhum dia válido foi informado.")
  fimse''',
    'Encontre, entre sete dias, aquele com maior tempo de luz solar.',
    'Informe nascer e pôr do sol como minutos desde meia-noite. Descarte intervalos com hora inválida ou pôr anterior ao nascer. Se houver empate, conserve o primeiro dia.',
    'Dia 1: 360–1080 (720 min); dia 2: 350–1100 (750 min); demais dias: 360–1080\nMaior duração: dia 2 com 750 minuto(s)',
    'Se os sete intervalos forem inválidos, mostre que não há dia válido.',
    'A duração de cada dia é a diferença dos horários; `maior` e `diaMaisLongo` guardam o melhor resultado.',
    ['Converta cada horário para minutos desde meia-noite.', 'Calcule a diferença somente para intervalos válidos.', 'Atualize o índice de maior duração quando encontrar valor estritamente maior.'])

add(12, '''  capacidade, volume, movimento: real
  turnos, i: inteiro''', '''  escreva("Capacidade do reservatório: ")
  leia(capacidade)
  escreva("Volume inicial: ")
  leia(volume)
  escreva("Número de turnos: ")
  leia(turnos)
  se (capacidade < 0) ou (volume < 0) ou (volume > capacidade) ou (turnos < 0) entao
    escreval("Dados iniciais inválidos.")
  senao
    para i de 1 ate turnos faca
      escreva("Variação no turno ", i, " (entrada positiva; saída negativa): ")
      leia(movimento)
      se (volume + movimento >= 0) e (volume + movimento <= capacidade) entao
        volume <- volume + movimento
      senao
        escreval("Movimento rejeitado no turno ", i)
      fimse
      escreval("Volume atual: ", volume)
    fimpara
  fimse''',
    'Simule variações do volume de água por turnos sem deixar o reservatório vazio além de zero nem ultrapassar sua capacidade.',
    'Leia capacidade, volume inicial e quantidade de turnos. Em cada turno, um número positivo representa entrada de água e um negativo, saída. Rejeite integralmente o movimento que levaria o volume para fora do intervalo permitido.',
    'Capacidade: 100; inicial: 60; turnos: +30, +20, -50\nVolume após turno 1: 90\nTurno 2 rejeitado; volume: 90\nVolume após turno 3: 40',
    'Um movimento que deixa o volume exatamente em zero ou na capacidade é aceito.',
    'O estado só é atualizado quando o novo volume pertence ao intervalo de 0 até a capacidade.',
    ['Modele entrada e saída com o sinal da variação.', 'Calcule `volume + movimento` antes da atribuição.', 'Rejeite a movimentação inteira quando ultrapassar os limites.'])

add(13, '''  nome: vetor[1..8] de caractere
  tempo: vetor[1..8] de real
  posicao: vetor[1..8] de inteiro
  i, j: inteiro''', '''  para i de 1 ate 8 faca
    escreva("Participante ", i, ": ")
    leia(nome[i])
    escreva("Tempo: ")
    leia(tempo[i])
  fimpara
  para i de 1 ate 8 faca
    posicao[i] <- 1
    para j de 1 ate 8 faca
      se tempo[j] < tempo[i] entao
        posicao[i] <- posicao[i] + 1
      fimse
    fimpara
  fimpara
  para i de 1 ate 8 faca
    escreval(nome[i], ": posição ", posicao[i], " — tempo ", tempo[i])
  fimpara''',
    'Classifique oito participantes pelo tempo de corrida, atribuindo a mesma posição a tempos empatados.',
    'Leia nomes e tempos. Para cada participante, sua posição é um mais a quantidade de tempos estritamente menores. Assim, dois tempos iguais recebem a mesma posição; a posição seguinte pode ser saltada.',
    'Tempos: Ana 10; Bia 11; Caio 11; Davi 12; outros acima de 12\nAna: posição 1\nBia: posição 2\nCaio: posição 2\nDavi: posição 4',
    'Se todos tiverem o mesmo tempo, todos ficam na posição 1.',
    'Contar tempos menores calcula o ranking com empates sem precisar alterar a ordem dos vetores.',
    ['Guarde nomes e tempos na mesma posição.', 'Compare cada tempo com todos os outros.', 'Use `<` em vez de `<=` para dar a mesma posição a empates.'])

add(14, '''  totais: vetor[1..3] de real
  i, categoria: inteiro
  valor, orcamento, gasto: real''', '''  escreva("Orçamento inicial: ")
  leia(orcamento)
  para i de 1 ate 3 faca
    totais[i] <- 0
  fimpara
  gasto <- 0
  para i de 1 ate 10 faca
    escreva("Categoria do gasto ", i, " (1 transporte, 2 alimentação, 3 lazer): ")
    leia(categoria)
    escreva("Valor: ")
    leia(valor)
    se (categoria >= 1) e (categoria <= 3) e (valor >= 0) entao
      totais[categoria] <- totais[categoria] + valor
      gasto <- gasto + valor
    senao
      escreval("Gasto inválido desconsiderado.")
    fimse
  fimpara
  escreval("Transporte: ", totais[1])
  escreval("Alimentação: ", totais[2])
  escreval("Lazer: ", totais[3])
  escreval("Saldo: ", orcamento - gasto)''',
    'Organize dez gastos de viagem por categoria e mostre quanto resta do orçamento.',
    'Use três categorias fixas: transporte, alimentação e lazer. Leia categoria e valor de dez lançamentos; descarte categoria desconhecida ou valor negativo. Some cada categoria e subtraia o gasto total do orçamento.',
    'Orçamento: 100; gastos válidos: transporte 20, alimentação 15, lazer 5; outros sete gastos de 0\nTransporte: 20\nAlimentação: 15\nLazer: 5\nSaldo: 60',
    'O saldo pode ser negativo se os gastos válidos ultrapassarem o orçamento.',
    'O código da categoria é usado como índice do vetor de totais; o acumulador geral permite calcular o saldo.',
    ['Defina códigos fixos para as categorias.', 'Inicialize o vetor de totais com zero.', 'Some ao total da categoria e ao gasto geral após validar o lançamento.'])

add(15, '''  celsius: vetor[1..5] de real
  valor, temporario: real
  unidade: caractere
  i, j: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Temperatura ", i, ": ")
    leia(valor)
    escreva("Unidade (C ou F): ")
    leia(unidade)
    se (unidade = "F") ou (unidade = "f") entao
      celsius[i] <- (valor - 32) * 5 / 9
    senao
      celsius[i] <- valor
    fimse
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se celsius[j] < celsius[i] entao
        temporario <- celsius[i]
        celsius[i] <- celsius[j]
        celsius[j] <- temporario
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(i, "º: ", celsius[i], " °C")
  fimpara''',
    'Normalize cinco temperaturas informadas em Celsius ou Fahrenheit e ordene-as em Celsius.',
    'Para cada medição, leia valor e unidade C ou F. Converta F usando `(F - 32) × 5 / 9`; mantenha C. Ordene os cinco resultados do menor para o maior.',
    'Entradas: 32 F, 10 C, 50 F, 0 C, 68 F\nOrdem em Celsius: 0, 0, 10, 10, 20',
    'Temperaturas iguais permanecem iguais após a conversão e podem aparecer em qualquer posição do grupo empatado.',
    'Converter tudo antes de ordenar evita comparar números em escalas diferentes.',
    ['Normalize as unidades na leitura.', 'Guarde somente os valores em Celsius no vetor.', 'Depois ordene o vetor por comparação e troca.'])

add(16, '''  inicioReserva: vetor[1..10, 1..20] de inteiro
  fimReserva: vetor[1..10, 1..20] de inteiro
  quantidade: vetor[1..10] de inteiro
  quarto, entrada, saida, i, j, pedidos: inteiro
  livre: logico''', '''  para i de 1 ate 10 faca
    quantidade[i] <- 0
  fimpara
  escreva("Quantidade de pedidos: ")
  leia(pedidos)
  para i de 1 ate pedidos faca
    escreva("Quarto (1 a 10): ")
    leia(quarto)
    escreva("Dia de entrada: ")
    leia(entrada)
    escreva("Dia de saída: ")
    leia(saida)
    se (quarto < 1) ou (quarto > 10) ou (entrada < 1) ou (saida <= entrada) ou (saida > 31) entao
      escreval("Pedido inválido.")
    senao
      livre <- verdadeiro
      para j de 1 ate quantidade[quarto] faca
        se (entrada < fimReserva[quarto, j]) e (inicioReserva[quarto, j] < saida) entao
          livre <- falso
        fimse
      fimpara
      se livre e (quantidade[quarto] < 20) entao
        quantidade[quarto] <- quantidade[quarto] + 1
        inicioReserva[quarto, quantidade[quarto]] <- entrada
        fimReserva[quarto, quantidade[quarto]] <- saida
        escreval("Reserva confirmada no quarto ", quarto)
      senao
        escreval("Quarto indisponível nesse período.")
      fimse
    fimse
  fimpara''',
    'Gerencie períodos de reserva para dez quartos, sem aceitar sobreposição no mesmo quarto.',
    'Leia uma quantidade de pedidos. Cada pedido indica quarto de 1 a 10 e dias de entrada e saída no mesmo mês. A saída é exclusiva: outra reserva pode começar nesse dia. Cada quarto guarda até 20 reservas aceitas.',
    'Pedido 1: quarto 2, dias 5–8 → confirmado\nPedido 2: quarto 2, dias 7–10 → indisponível\nPedido 3: quarto 2, dias 8–10 → confirmado',
    'Reservas de quartos diferentes podem ocupar os mesmos dias; um período com saída igual à entrada é inválido.',
    'A matriz guarda os intervalos de cada quarto. Um pedido é aceito somente quando não cruza nenhum intervalo já registrado naquele quarto.',
    ['Use um contador de reservas para cada quarto.', 'Compare o novo intervalo somente com reservas do mesmo quarto.', 'Dois intervalos colidem se ambos começarem antes de o outro terminar.'])

add(17, '''  nome: vetor[1..3] de caractere
  custo: vetor[1..3] de real
  km, kmPorLitro, precoLitro, pedagios: real
  i, melhor: inteiro''', '''  escreva("Preço do combustível por litro: ")
  leia(precoLitro)
  melhor <- 0
  para i de 1 ate 3 faca
    escreva("Rota ", i, ": ")
    leia(nome[i])
    escreva("Distância (km): ")
    leia(km)
    escreva("Consumo (km por litro): ")
    leia(kmPorLitro)
    escreva("Total de pedágios: ")
    leia(pedagios)
    se kmPorLitro > 0 entao
      custo[i] <- km / kmPorLitro * precoLitro + pedagios
      se melhor = 0 entao
        melhor <- i
      senao
        se custo[i] < custo[melhor] entao
          melhor <- i
        fimse
      fimse
    senao
      custo[i] <- -1
    fimse
  fimpara
  para i de 1 ate 3 faca
    se custo[i] >= 0 entao
      escreval(nome[i], ": ", custo[i])
    fimse
  fimpara
  se melhor > 0 entao
    escreval("Menor custo: ", nome[melhor], " — ", custo[melhor])
  senao
    escreval("Nenhuma rota válida.")
  fimse''',
    'Compare três estradas pelo custo total estimado de combustível e pedágios.',
    'Leia preço por litro uma vez. Para cada rota, leia distância, rendimento em quilômetros por litro e total de pedágios em dinheiro. O custo é `(km / kmPorLitro) × preçoLitro + pedágios`.',
    'Combustível: R$ 5/L\nRota A: 100 km, 10 km/L, pedágios R$ 10 → R$ 60\nRota B: 120 km, 12 km/L, pedágios R$ 0 → R$ 50\nRota C: 80 km, 8 km/L, pedágios R$ 20 → R$ 70\nMenor custo: B — 50',
    'Uma rota com rendimento zero ou negativo é descartada para evitar divisão inválida.',
    'O índice `melhor` aponta para o menor custo válido encontrado até o momento.',
    ['Calcule o volume de combustível como distância dividida pelo rendimento.', 'Converta esse volume em custo e some os pedágios.', 'Compare apenas rotas com rendimento positivo.'])

add(18, '''  nomes: vetor[1..5] de caractere
  medias: vetor[1..5] de real
  limpeza, conforto, atendimento, temporario: real
  nomeTemporario: caractere
  i, j: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Hotel ", i, ": ")
    leia(nomes[i])
    escreva("Limpeza (0 a 10): ")
    leia(limpeza)
    escreva("Conforto (0 a 10): ")
    leia(conforto)
    escreva("Atendimento (0 a 10): ")
    leia(atendimento)
    medias[i] <- (limpeza * 4 + conforto * 3 + atendimento * 3) / 10
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se medias[j] > medias[i] entao
        temporario <- medias[i]
        medias[i] <- medias[j]
        medias[j] <- temporario
        nomeTemporario <- nomes[i]
        nomes[i] <- nomes[j]
        nomes[j] <- nomeTemporario
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(i, "º: ", nomes[i], " — média ", medias[i])
  fimpara''',
    'Avalie cinco hotéis por critérios com pesos e gere um ranking decrescente.',
    'Leia notas de limpeza, conforto e atendimento, todas de 0 a 10. Use pesos 4, 3 e 3, respectivamente. Calcule a média ponderada dividindo por 10 e ordene do maior resultado para o menor.',
    'Hotel A: 10, 8, 8 → média 8,8\nHotel B: 8, 10, 10 → média 9,2\nRanking: 1º B; 2º A; demais hotéis conforme as notas',
    'Empates conservam a ordem inicial dos hotéis porque a troca só acontece se outra média for maior.',
    'Ao trocar as médias durante a ordenação, o algoritmo troca também os nomes para manter cada nota ligada ao hotel correto.',
    ['Calcule uma média ponderada com soma dos pesos igual a dez.', 'Ordene de modo decrescente.', 'Mova nome e média juntos em cada troca.'])

add(19, '''  capacidade: vetor[1..3] de inteiro
  pessoas, quantidade, sobra, melhorQuantidade, melhorSobra, melhorCaixa, i: inteiro''', '''  escreva("Pessoas a atender: ")
  leia(pessoas)
  para i de 1 ate 3 faca
    escreva("Garrafas por caixa do tipo ", i, ": ")
    leia(capacidade[i])
  fimpara
  melhorCaixa <- 0
  melhorSobra <- 999999999
  melhorQuantidade <- 999999999
  se pessoas > 0 entao
    para i de 1 ate 3 faca
      se capacidade[i] > 0 entao
        quantidade <- pessoas div capacidade[i]
        se quantidade * capacidade[i] < pessoas entao
          quantidade <- quantidade + 1
        fimse
        sobra <- quantidade * capacidade[i] - pessoas
        se (sobra < melhorSobra) ou ((sobra = melhorSobra) e (quantidade < melhorQuantidade)) entao
          melhorCaixa <- i
          melhorSobra <- sobra
          melhorQuantidade <- quantidade
        fimse
      fimse
    fimpara
  fimse
  se melhorCaixa > 0 entao
    escreval("Tipo de caixa: ", melhorCaixa)
    escreval("Caixas necessárias: ", melhorQuantidade)
    escreval("Garrafas restantes: ", melhorSobra)
  senao
    escreval("Informe pessoas e capacidades positivas.")
  fimse''',
    'Escolha entre três tamanhos de caixa para fornecer ao menos uma garrafa por pessoa com a menor sobra.',
    'Leia o tamanho do grupo e a quantidade de garrafas de cada tipo de caixa. Use apenas um tipo por escolha. Calcule quantas caixas inteiras são necessárias para cobrir o grupo e compare a sobra. Em empate, prefira menos caixas.',
    'Pessoas: 11; capacidades: 4, 6, 8\nTipo 1: 3 caixas, sobra 1; tipo 2: 2 caixas, sobra 1; tipo 3: 2 caixas, sobra 5\nEscolha: tipo 2, duas caixas, sobra 1',
    'Capacidades nulas ou negativas são descartadas. O grupo deve ter pelo menos uma pessoa.',
    'A divisão inteira calcula o mínimo de caixas completas, com acréscimo de uma quando ainda faltam garrafas.',
    ['Para cada tamanho, encontre o menor número inteiro de caixas suficiente.', 'Calcule a sobra após atender o grupo.', 'Compare primeiro a sobra, depois o número de caixas.'])

add(20, '''  nomes: vetor[1..4] de caractere
  pontos: vetor[1..4] de inteiro
  saldo: vetor[1..4] de inteiro
  i, j, golsI, golsJ, posicao: inteiro''', '''  para i de 1 ate 4 faca
    escreva("Equipe ", i, ": ")
    leia(nomes[i])
    pontos[i] <- 0
    saldo[i] <- 0
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      escreva("Gols de ", nomes[i], " contra ", nomes[j], ": ")
      leia(golsI)
      escreva("Gols de ", nomes[j], " contra ", nomes[i], ": ")
      leia(golsJ)
      se (golsI >= 0) e (golsJ >= 0) entao
        saldo[i] <- saldo[i] + golsI - golsJ
        saldo[j] <- saldo[j] + golsJ - golsI
        se golsI > golsJ entao
          pontos[i] <- pontos[i] + 3
        senao
          se golsJ > golsI entao
            pontos[j] <- pontos[j] + 3
          senao
            pontos[i] <- pontos[i] + 1
            pontos[j] <- pontos[j] + 1
          fimse
        fimse
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    posicao <- 1
    para j de 1 ate 4 faca
      se (pontos[j] > pontos[i]) ou ((pontos[j] = pontos[i]) e (saldo[j] > saldo[i])) entao
        posicao <- posicao + 1
      fimse
    fimpara
    escreval(nomes[i], ": posição ", posicao, ", pontos ", pontos[i], ", saldo ", saldo[i])
  fimpara''',
    'Registre todos os confrontos únicos de quatro equipes e calcule uma tabela com pontos e saldo de gols.',
    'Cada par de equipes joga uma vez, em seis jogos ao todo. Vitória vale 3 pontos, empate vale 1 para cada uma. Saldo é gols marcados menos sofridos. Classifique por pontos e depois por saldo; igualdade nos dois critérios mantém empate.',
    'Quatro equipes A, B, C e D; todos os seis jogos terminam 0–0\nCada equipe: 3 pontos, saldo 0, posição 1',
    'Gols negativos tornam aquele jogo inválido e o programa o ignora. Equipes empatadas nos dois critérios exibem a mesma posição.',
    'Os laços `i` e `j` geram cada confronto uma vez. A posição é um mais o número de equipes com pontuação ou saldo superior.',
    ['Percorra apenas pares com `j > i`.', 'Atualize saldo de ambos os lados com sinais opostos.', 'Ordene logicamente usando pontos primeiro e saldo como desempate.'])

add(21, '''  nome: vetor[1..4] de caractere
  contribuicao, peso: vetor[1..4] de real
  total, somaPesos, cota, saldo: real
  i: inteiro''', '''  total <- 0
  somaPesos <- 0
  para i de 1 ate 4 faca
    escreva("Participante ", i, ": ")
    leia(nome[i])
    escreva("Valor que já pagou: ")
    leia(contribuicao[i])
    escreva("Peso da participação: ")
    leia(peso[i])
    total <- total + contribuicao[i]
    somaPesos <- somaPesos + peso[i]
  fimpara
  se somaPesos > 0 entao
    para i de 1 ate 4 faca
      cota <- total * peso[i] / somaPesos
      saldo <- contribuicao[i] - cota
      escreval(nome[i], ": cota ", cota, "; saldo ", saldo)
    fimpara
  senao
    escreval("A soma dos pesos deve ser positiva.")
  fimse''',
    'Rateie despesas pagas por quatro pessoas conforme participações diferentes.',
    'Leia quanto cada pessoa pagou e um peso não negativo para sua participação. A cota individual é o total pago multiplicado pelo peso dividido pela soma dos pesos. Saldo positivo indica crédito; saldo negativo indica valor ainda devido.',
    'Ana pagou 80, peso 1; Bia pagou 0, peso 1; Caio pagou 0, peso 0; Davi pagou 0, peso 0\nCotas: 40, 40, 0, 0\nSaldos: +40, -40, 0, 0',
    'Se a soma dos pesos for zero, o rateio não pode ser calculado.',
    'O total de saldos é zero quando todas as participações são válidas: créditos compensam dívidas.',
    ['Some todos os pagamentos para encontrar a despesa total.', 'Some também os pesos das participações.', 'Para cada pessoa, subtraia a cota proporcional do valor já pago.'])

add(22, '''  altura: vetor[1..12] de real
  i, picos: inteiro''', '''  para i de 1 ate 12 faca
    escreva("Altura da onda ", i, ": ")
    leia(altura[i])
  fimpara
  picos <- 0
  para i de 2 ate 11 faca
    se (altura[i] > altura[i - 1]) e (altura[i] > altura[i + 1]) entao
      escreval("Pico local na medição ", i, ": ", altura[i])
      picos <- picos + 1
    fimse
  fimpara
  escreval("Total de picos: ", picos)''',
    'Identifique picos locais em uma sequência de 12 alturas de onda.',
    'Uma medição é pico somente se supera estritamente a imediatamente anterior e a posterior. As posições 1 e 12 não têm dois vizinhos e ficam fora da busca.',
    'Medições: 1, 3, 2, 4, 1, 1, 2, 1, 0, 0, 1, 0\nPicos locais: posições 2, 4, 7 e 11\nTotal de picos: 4',
    'Um platô de alturas iguais não é pico porque a comparação é estrita.',
    'O vetor permite comparar cada medição interior com seus dois vizinhos sem perder valores já lidos.',
    ['Armazene as 12 medições antes de percorrê-las.', 'Percorra apenas índices com vizinho à esquerda e à direita.', 'Use `>` nas duas comparações.'])

add(23, '''  trechos, i: inteiro
  distancia, variacaoAltura, minutosPausa, totalDistancia, subida, descida, totalPausas: real''', '''  escreva("Número de trechos: ")
  leia(trechos)
  totalDistancia <- 0
  subida <- 0
  descida <- 0
  totalPausas <- 0
  para i de 1 ate trechos faca
    escreva("Distância do trecho ", i, " (km): ")
    leia(distancia)
    escreva("Variação de altura (m): ")
    leia(variacaoAltura)
    escreva("Pausa após o trecho (min): ")
    leia(minutosPausa)
    se (distancia >= 0) e (minutosPausa >= 0) entao
      totalDistancia <- totalDistancia + distancia
      totalPausas <- totalPausas + minutosPausa
      se variacaoAltura >= 0 entao
        subida <- subida + variacaoAltura
      senao
        descida <- descida - variacaoAltura
      fimse
    senao
      escreval("Trecho inválido ignorado.")
    fimse
  fimpara
  escreval("Distância total: ", totalDistancia, " km")
  escreval("Subida acumulada: ", subida, " m")
  escreval("Descida acumulada: ", descida, " m")
  escreval("Pausas: ", totalPausas, " min")''',
    'Resuma uma rota de bicicleta formada por vários trechos.',
    'Leia distância, variação de altura com sinal e duração da pausa após cada trecho. Some distância e pausas; separe ganho de altura e perda de altura para não cancelar subida com descida.',
    'Trecho 1: 5 km, +100 m, pausa 10 min; trecho 2: 3 km, -40 m, pausa 5 min\nDistância total: 8 km\nSubida: 100 m; descida: 40 m; pausas: 15 min',
    'Trechos de distância zero são permitidos. Distância ou pausa negativa torna o trecho inválido.',
    'A variação positiva alimenta `subida`; a negativa tem o sinal invertido para compor `descida` como magnitude positiva.',
    ['Mantenha acumuladores separados.', 'Trate o sinal do desnível.', 'Valide os valores que não podem ser negativos.'])

add(24, '''  capacidade, volume: vetor[1..3] de real
  origem, destino, i, turnos: inteiro
  pedido, transferido: real''', '''  para i de 1 ate 3 faca
    escreva("Capacidade do recipiente ", i, ": ")
    leia(capacidade[i])
    escreva("Volume inicial: ")
    leia(volume[i])
  fimpara
  escreva("Número de transferências: ")
  leia(turnos)
  para i de 1 ate turnos faca
    escreva("Origem (1 a 3): ")
    leia(origem)
    escreva("Destino (1 a 3): ")
    leia(destino)
    escreva("Volume solicitado: ")
    leia(pedido)
    se (origem >= 1) e (origem <= 3) e (destino >= 1) e (destino <= 3) e (origem <> destino) e (pedido > 0) entao
      transferido <- pedido
      se transferido > volume[origem] entao
        transferido <- volume[origem]
      fimse
      se transferido > capacidade[destino] - volume[destino] entao
        transferido <- capacidade[destino] - volume[destino]
      fimse
      se transferido > 0 entao
        volume[origem] <- volume[origem] - transferido
        volume[destino] <- volume[destino] + transferido
      fimse
      escreval("Transferido: ", transferido)
    senao
      escreval("Transferência inválida.")
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Recipiente ", i, ": ", volume[i])
  fimpara''',
    'Simule transferências entre três recipientes sem perder líquido nem exceder capacidade.',
    'Informe capacidade e volume inicial de cada recipiente. Para cada solicitação, transfira o menor entre o volume pedido, o conteúdo da origem e o espaço livre no destino.',
    'Recipiente 1: capacidade 10, volume 8; recipiente 2: capacidade 5, volume 4\nPedido: transferir 3 do 1 para o 2\nTransferido: 1\nVolumes finais: 7 e 5',
    'Origem e destino iguais são rejeitados. Configure volumes iniciais entre zero e a capacidade de cada recipiente.',
    'O mesmo `transferido` é subtraído de um recipiente e acrescentado ao outro, preservando o volume total.',
    ['Calcule o espaço livre no destino.', 'Limite a transferência pelas três restrições.', 'Atualize os dois volumes com a mesma quantidade.'])

add(25, '''  preco: vetor[1..2] de real
  vendidos: vetor[1..2] de inteiro
  capacidade, restantes, tipo, quantidade, i: inteiro
  receita, total: real''', '''  escreva("Capacidade diária: ")
  leia(capacidade)
  para i de 1 ate 2 faca
    escreva("Preço do ingresso tipo ", i, ": ")
    leia(preco[i])
    vendidos[i] <- 0
  fimpara
  restantes <- capacidade
  escreva("Tipo (1 ou 2; 0 encerra): ")
  leia(tipo)
  enquanto tipo <> 0 faca
    se (tipo = 1) ou (tipo = 2) entao
      escreva("Quantidade: ")
      leia(quantidade)
      se (quantidade > 0) e (quantidade <= restantes) entao
        vendidos[tipo] <- vendidos[tipo] + quantidade
        restantes <- restantes - quantidade
      senao
        escreval("Pedido sem capacidade suficiente.")
      fimse
    senao
      escreval("Tipo inválido.")
    fimse
    escreva("Tipo (1 ou 2; 0 encerra): ")
    leia(tipo)
  fimenquanto
  total <- 0
  para i de 1 ate 2 faca
    receita <- vendidos[i] * preco[i]
    escreval("Tipo ", i, ": ", vendidos[i], " vendido(s), receita ", receita)
    total <- total + receita
  fimpara
  escreval("Receita total: ", total)
  escreval("Vagas restantes: ", restantes)''',
    'Controle a capacidade diária de um parque, dois tipos de ingresso e a receita de cada categoria.',
    'Leia a lotação máxima e o preço de cada tipo. Aceite pedidos até o código 0. Uma venda só é concluída se a quantidade for positiva e não ultrapassar as vagas restantes.',
    'Capacidade: 3; preços: tipo 1 R$ 20, tipo 2 R$ 10\nVenda: dois do tipo 1 e um do tipo 2\nReceita tipo 1: 40; tipo 2: 10; total: 50\nVagas restantes: 0',
    'Um pedido maior que as vagas restantes é recusado integralmente.',
    'O estoque é compartilhado entre os tipos; o vetor de vendas permite calcular a receita por categoria no encerramento.',
    ['Mantenha um contador de vagas restantes.', 'Verifique a capacidade antes de registrar a venda.', 'Calcule receita por tipo usando unidades vendidas vezes preço.'])

add(26, '''  probabilidades: vetor[1..7] de real
  limite: real
  i, atual, maior, comecoAtual, comecoMaior: inteiro''', '''  escreva("Limite de risco (%): ")
  leia(limite)
  atual <- 0
  maior <- 0
  para i de 1 ate 7 faca
    escreva("Probabilidade do dia ", i, " (%): ")
    leia(probabilidades[i])
    se probabilidades[i] > limite entao
      se atual = 0 entao
        comecoAtual <- i
      fimse
      atual <- atual + 1
      escreval("Dia ", i, ": risco acima do limite")
      se atual > maior entao
        maior <- atual
        comecoMaior <- comecoAtual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  se maior > 0 entao
    escreval("Maior sequência de risco: dias ", comecoMaior, " a ", comecoMaior + maior - 1)
  senao
    escreval("Nenhum dia acima do limite.")
  fimse''',
    'Marque dias chuvosos e identifique a maior sequência de probabilidades acima de um limite escolhido.',
    'Leia limite e sete probabilidades. Considere arriscado apenas o valor estritamente maior que o limite. Mostre cada dia assim marcado e o intervalo da maior sequência consecutiva.',
    'Limite: 60%; dias: 70, 80, 40, 90, 95, 85, 20%\nDias de risco: 1, 2, 4, 5 e 6\nMaior sequência de risco: dias 4 a 6',
    'Probabilidade exatamente igual ao limite interrompe a sequência.',
    'O contador `atual` mede o trecho em andamento; `maior` conserva a sequência mais longa já observada.',
    ['Use um contador para dias consecutivos.', 'Zere-o quando um dia não superar o limite.', 'Guarde o início da sequência quando o contador passa de zero para um.'])

add(27, '''  nomes: vetor[1..3] de caractere
  medias: vetor[1..3] de real
  nota, soma, menor, maior, tempMedia: real
  tempNome: caractere
  atleta, juiz, outro: inteiro''', '''  para atleta de 1 ate 3 faca
    escreva("Atleta ", atleta, ": ")
    leia(nomes[atleta])
    soma <- 0
    para juiz de 1 ate 7 faca
      escreva("Nota ", juiz, ": ")
      leia(nota)
      soma <- soma + nota
      se (juiz = 1) ou (nota < menor) entao
        menor <- nota
      fimse
      se (juiz = 1) ou (nota > maior) entao
        maior <- nota
      fimse
    fimpara
    medias[atleta] <- (soma - menor - maior) / 5
  fimpara
  para atleta de 1 ate 2 faca
    para outro de atleta + 1 ate 3 faca
      se medias[outro] > medias[atleta] entao
        tempMedia <- medias[atleta]
        medias[atleta] <- medias[outro]
        medias[outro] <- tempMedia
        tempNome <- nomes[atleta]
        nomes[atleta] <- nomes[outro]
        nomes[outro] <- tempNome
      fimse
    fimpara
  fimpara
  para atleta de 1 ate 3 faca
    escreval(atleta, "º: ", nomes[atleta], " — média ", medias[atleta])
  fimpara''',
    'Classifique três atletas por uma média que descarta a maior e a menor de sete notas.',
    'Leia sete notas por atleta. Mesmo se houver notas extremas repetidas, retire apenas uma ocorrência da menor e uma da maior. Divida a soma restante por cinco e ordene as médias do maior para o menor.',
    'Ana: 1, 8, 8, 8, 8, 8, 10 → média 8\nBia: 2, 9, 9, 9, 9, 9, 10 → média 9\nCaio: 1, 7, 7, 7, 7, 7, 10 → média 7\nRanking: Bia, Ana, Caio',
    'Se todas as sete notas forem iguais, a média final será a mesma nota.',
    'Subtrair os dois extremos da soma equivale a descartar exatamente duas avaliações.',
    ['Some as notas enquanto procura mínimo e máximo.', 'Divida por cinco após retirar os dois extremos.', 'Ao ordenar, mova nome e média juntos.'])

add(28, '''  inicioMin, fimMin, intervalo, horario: inteiro''', '''  escreva("Início da janela (minutos): ")
  leia(inicioMin)
  escreva("Fim da janela (minutos): ")
  leia(fimMin)
  escreva("Intervalo entre alertas (minutos): ")
  leia(intervalo)
  se (intervalo > 0) e (fimMin >= inicioMin) e (inicioMin >= 0) e (fimMin <= 1440) entao
    horario <- inicioMin
    enquanto horario <= fimMin faca
      escreval("Alerta às ", horario div 60, "h", horario mod 60)
      horario <- horario + intervalo
    fimenquanto
  senao
    escreval("Janela ou intervalo inválido.")
  fimse''',
    'Gere lembretes em intervalos regulares dentro de uma janela de horário.',
    'Leia início e fim como minutos desde meia-noite e intervalo positivo. Emita o primeiro alerta no início e continue somando o intervalo sem ultrapassar o fim.',
    'Início: 480; fim: 600; intervalo: 60\nAlerta às 8h0\nAlerta às 9h0\nAlerta às 10h0',
    'Quando início e fim são iguais, há um único alerta. Intervalo zero é inválido para evitar repetição infinita.',
    'O laço termina porque `horario` aumenta por um valor positivo em cada volta.',
    ['Converta os horários para minutos.', 'Exija intervalo positivo.', 'Use divisão inteira e resto para exibir hora e minuto.'])

add(29, '''  nome: vetor[1..3] de caractere
  custo: vetor[1..3] de real
  transporte, hospedagem, refeicoes, teto: real
  i, melhor: inteiro''', '''  escreva("Orçamento máximo: ")
  leia(teto)
  melhor <- 0
  para i de 1 ate 3 faca
    escreva("Pacote ", i, ": ")
    leia(nome[i])
    escreva("Transporte: ")
    leia(transporte)
    escreva("Hospedagem: ")
    leia(hospedagem)
    escreva("Refeições: ")
    leia(refeicoes)
    custo[i] <- transporte + hospedagem + refeicoes
    se custo[i] <= teto entao
      se melhor = 0 entao
        melhor <- i
      senao
        se custo[i] < custo[melhor] entao
          melhor <- i
        fimse
      fimse
    fimse
  fimpara
  se melhor > 0 entao
    escreval("Pacote mais barato dentro do teto: ", nome[melhor], " — ", custo[melhor])
  senao
    escreval("Nenhum pacote cabe no orçamento.")
  fimse''',
    'Compare três pacotes de viagem incluindo transporte, hospedagem e refeições sem ultrapassar o orçamento.',
    'Leia o teto de gastos e os três componentes de cada pacote. Some os custos e escolha o pacote de menor total entre os que não excedem o teto.',
    'Teto: 500\nPacote A: 100 + 200 + 100 = 400\nPacote B: 150 + 300 + 100 = 550\nPacote C: 150 + 150 + 50 = 350\nEscolhido: C — 350',
    'Se nenhum pacote couber no teto, informe a ausência de opção. Igualdade com o teto é aceita.',
    'O índice `melhor` só recebe pacotes válidos e é atualizado quando um custo menor aparece.',
    ['Some todos os componentes antes de comparar.', 'Descarte valores acima do orçamento.', 'Guarde o índice do pacote elegível mais barato.'])

add(30, '''  destinatario, mensagem: vetor[1..5] de caractere
  busca, novaMensagem: caractere
  i, encontrado, opcao: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Destinatário ", i, ": ")
    leia(destinatario[i])
    escreva("Mensagem: ")
    leia(mensagem[i])
  fimpara
  escreva("Operação (1 buscar, 2 editar, 0 sair): ")
  leia(opcao)
  enquanto opcao <> 0 faca
    se (opcao = 1) ou (opcao = 2) entao
      escreva("Nome do destinatário: ")
      leia(busca)
      encontrado <- 0
      para i de 1 ate 5 faca
        se destinatario[i] = busca entao
          encontrado <- i
        fimse
      fimpara
      se encontrado > 0 entao
        se opcao = 2 entao
          escreva("Nova mensagem: ")
          leia(novaMensagem)
          mensagem[encontrado] <- novaMensagem
        fimse
        escreval(destinatario[encontrado], ": ", mensagem[encontrado])
      senao
        escreval("Destinatário não encontrado.")
      fimse
    senao
      escreval("Operação inválida.")
    fimse
    escreva("Operação (1 buscar, 2 editar, 0 sair): ")
    leia(opcao)
  fimenquanto''',
    'Cadastre cinco cartões-postais e permita buscar ou editar a mensagem de um destinatário.',
    'Leia pares de destinatário e mensagem. Depois ofereça operações 1 para buscar, 2 para editar e 0 para sair. A busca é exata e diferencia letras maiúsculas de minúsculas.',
    'Cadastro: Ana → Olá; Bia → Até logo; mais três pessoas\nOperação 2, Ana, nova mensagem Saudades\nAna: Saudades\nOperação 1, Ana\nAna: Saudades',
    'Se houver nomes duplicados, a última posição cadastrada é a encontrada. Um nome ausente produz aviso.',
    'Os dois vetores mantêm cada destinatário ligado à sua mensagem; editar substitui somente a posição localizada.',
    ['Use dois vetores paralelos.', 'Procure o nome percorrendo os cinco registros.', 'Na edição, altere a mensagem na posição encontrada.'])

add(31, '''  gastos: vetor[1..21, 1..3] de real
  totalPessoa: vetor[1..3] de real
  totalCategoria: vetor[1..3] de real
  pessoa, dia, categoria, linha: inteiro
  total: real''', '''  para pessoa de 1 ate 3 faca
    totalPessoa[pessoa] <- 0
  fimpara
  para categoria de 1 ate 3 faca
    totalCategoria[categoria] <- 0
  fimpara
  total <- 0
  para pessoa de 1 ate 3 faca
    para dia de 1 ate 7 faca
      linha <- (pessoa - 1) * 7 + dia
      para categoria de 1 ate 3 faca
        escreva("Pessoa ", pessoa, ", dia ", dia, ", categoria ", categoria, ": ")
        leia(gastos[linha, categoria])
        se gastos[linha, categoria] >= 0 entao
          totalPessoa[pessoa] <- totalPessoa[pessoa] + gastos[linha, categoria]
          totalCategoria[categoria] <- totalCategoria[categoria] + gastos[linha, categoria]
          total <- total + gastos[linha, categoria]
        fimse
      fimpara
    fimpara
  fimpara
  para pessoa de 1 ate 3 faca
    escreval("Total da pessoa ", pessoa, ": ", totalPessoa[pessoa])
  fimpara
  para categoria de 1 ate 3 faca
    escreval("Total da categoria ", categoria, ": ", totalCategoria[categoria])
  fimpara
  escreval("Total geral: ", total)''',
    'Consolide uma semana de gastos de três pessoas em três categorias.',
    'Cada linha da matriz representa um par pessoa/dia; as três colunas representam categorias. Leia os 63 valores e some separadamente por pessoa e por categoria, além do total geral. Ignore valores negativos.',
    'Pessoa 1, dia 1, categoria 1: 10; os outros 62 valores: 0\nTotal pessoa 1: 10; pessoas 2 e 3: 0\nTotal categoria 1: 10; categorias 2 e 3: 0\nTotal geral: 10',
    'Um gasto zero é válido. Um gasto negativo não entra nos totais.',
    'A expressão `(pessoa - 1) * 7 + dia` transforma pessoa e dia em uma linha única da matriz.',
    ['Defina claramente o significado de linhas e colunas.', 'Inicie todos os acumuladores com zero.', 'Ao ler um gasto válido, atualize os totais da pessoa, da categoria e geral.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Catalog contains {len(entries)} reviewed challenge solutions")
