#!/usr/bin/env python3
"""Curated advanced May exercises."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "data/challenge-solutions.json"
entries = json.loads(CATALOG.read_text(encoding="utf-8"))
rows = {r["data_mm_dd"]: r for r in csv.DictReader((ROOT / "data/visualg_365_dias_730_desafios.csv").open(encoding="utf-8"))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f"05-{day:02d}"
    prompt = rows[date]["avancado_enunciado"]
    code = f'algoritmo "Desafio05{day:02d}A"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f"{date}/avancado"] = dict(
        code=code, objective=prompt[0].upper() + prompt[1:] + " Ao final, apresente os valores necessários para conferir o resultado.",
        rules=rules, example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '''  nome: vetor[1..4] de caractere
  entrada, saida, contratada, tolerancia, trabalhado, extras, atraso, i: inteiro''', '''  escreva("Jornada contratada (min): ")
  leia(contratada)
  escreva("Horário padrão de entrada (min): ")
  leia(tolerancia)
  para i de 1 ate 4 faca
    escreva("Funcionário ", i, ": ")
    leia(nome[i])
    escreva("Entrada (min): ")
    leia(entrada)
    escreva("Saída (min): ")
    leia(saida)
    se saida >= entrada entao
      trabalhado <- saida - entrada
      extras <- trabalhado - contratada
      se extras < 0 entao
        extras <- 0
      fimse
      atraso <- entrada - tolerancia
      se atraso < 0 entao
        atraso <- 0
      fimse
      escreval(nome[i], ": trabalhado ", trabalhado, ", extra ", extras, ", atraso ", atraso, " min")
    senao
      escreval("Horários inválidos para ", nome[i])
    fimse
  fimpara''',
    'Leia jornada contratada e entrada padrão, ambos em minutos. Para quatro funcionários, calcule tempo trabalhado, extra acima da jornada e atraso em relação à entrada padrão.',
    'Padrão 480, jornada 480; Ana entrou 490 e saiu 1000\nTrabalhou 510 min, fez 30 min extras e atrasou 10 min',
    'Horário de saída anterior ao de entrada é inválido neste modelo de mesmo dia.',
    'As duas diferenças são limitadas a zero quando não há extra nem atraso.',
    ['Use minutos como escala comum.', 'Calcule saída menos entrada.', 'Compare separadamente jornada trabalhada e horário de chegada.'])

add(2, '''  nome: vetor[1..5] de caractere
  preco: vetor[1..5] de real
  vendidos: vetor[1..5] de inteiro
  i, produto, quantidade, clientes: inteiro
  faturamento, ticket: real''', '''  para i de 1 ate 5 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    escreva("Preço: ")
    leia(preco[i])
    vendidos[i] <- 0
  fimpara
  clientes <- 0
  escreva("Produto vendido (1 a 5; 0 encerra): ")
  leia(produto)
  enquanto produto <> 0 faca
    se (produto >= 1) e (produto <= 5) entao
      escreva("Quantidade: ")
      leia(quantidade)
      se quantidade > 0 entao
        vendidos[produto] <- vendidos[produto] + quantidade
        clientes <- clientes + 1
      fimse
    fimse
    escreva("Produto vendido (1 a 5; 0 encerra): ")
    leia(produto)
  fimenquanto
  faturamento <- 0
  para i de 1 ate 5 faca
    escreval(nome[i], ": ", vendidos[i], " unidade(s)")
    faturamento <- faturamento + vendidos[i] * preco[i]
  fimpara
  escreval("Faturamento: ", faturamento)
  se clientes > 0 entao
    ticket <- faturamento / clientes
    escreval("Ticket médio por pedido: ", ticket)
  senao
    escreval("Ticket médio indisponível: sem pedidos.")
  fimse''',
    'Cadastre cinco produtos. Cada registro de venda contém um produto e uma quantidade; o código 0 encerra. Calcule unidades por produto, faturamento e ticket médio por pedido válido.',
    'Produto A custa 10; dois pedidos, 1 unidade e 2 unidades\nFaturamento 30; ticket médio 15',
    'Sem pedidos, o ticket médio não é calculado para evitar divisão por zero.',
    'O total faturado é a soma de unidades vendidas vezes preço; o ticket divide esse total pela quantidade de pedidos válidos.',
    ['Guarde preços e quantidades em vetores paralelos.', 'Conte pedidos válidos separadamente das unidades.', 'Calcule ticket só se houve pedido.'])

add(3, '''  nome: vetor[1..5] de caractere
  vendas, meta: vetor[1..5] de real
  taxa: vetor[1..5] de real
  i, j, posicao: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Vendedor ", i, ": ")
    leia(nome[i])
    escreva("Vendas: ")
    leia(vendas[i])
    escreva("Meta: ")
    leia(meta[i])
    se meta[i] > 0 entao
      taxa[i] <- vendas[i] * 100 / meta[i]
    senao
      taxa[i] <- 0
    fimse
  fimpara
  para i de 1 ate 5 faca
    posicao <- 1
    para j de 1 ate 5 faca
      se taxa[j] > taxa[i] entao
        posicao <- posicao + 1
      fimse
    fimpara
    escreval(nome[i], ": posição ", posicao, ", meta atingida ", taxa[i], "%")
  fimpara''',
    'Registre vendas e meta de cinco profissionais. Compare desempenho pelo percentual da meta alcançado e mostre posição em ranking decrescente.',
    'Ana vendeu 100 para meta 100 → 100%; Bia vendeu 90 para meta 60 → 150%\nBia fica à frente de Ana',
    'Meta zero não permite razão; neste exercício recebe desempenho percentual zero.',
    'A posição é um mais a quantidade de profissionais com taxa estritamente superior, mantendo empates.',
    ['Calcule venda dividida pela meta.', 'Use taxa percentual para comparar metas distintas.', 'Conte quantos desempenhos superam cada profissional.'])

add(4, '''  nome: vetor[1..10] de caractere
  categoria: vetor[1..10] de inteiro
  preco, margem: vetor[1..10] de real
  i: inteiro''', '''  para i de 1 ate 10 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    escreva("Categoria (1, 2 ou 3): ")
    leia(categoria[i])
    escreva("Preço atual: ")
    leia(preco[i])
    se categoria[i] = 1 entao
      margem[i] <- 5
    senao
      se categoria[i] = 2 entao
        margem[i] <- 10
      senao
        margem[i] <- 15
      fimse
    fimse
    preco[i] <- preco[i] * (100 + margem[i]) / 100
    escreval(nome[i], ": novo preço ", preco[i])
  fimpara''',
    'Cadastre dez produtos. A categoria 1 recebe aumento de 5%, a 2 de 10% e a 3 de 15%. Mostre o preço atualizado de cada produto.',
    'Produto de categoria 2 custa R$ 100\nNovo preço: R$ 110',
    'As categorias válidas são 1, 2 e 3; informe apenas esses códigos.',
    'A margem é escolhida pela categoria e aplicada ao preço original por multiplicação percentual.',
    ['Relacione categoria a uma margem fixa.', 'Calcule preço × (100 + margem)/100.', 'Mostre o resultado de cada produto.'])

add(5, '''  notas: vetor[1..4] de inteiro
  valores: vetor[1..4] de inteiro
  troco, restante, i, a, b, c, d: inteiro
  melhorA, melhorB, melhorC, melhorD, achou: inteiro''', '''  valores[1] <- 20
  valores[2] <- 10
  valores[3] <- 5
  valores[4] <- 1
  escreva("Troco inteiro a entregar: ")
  leia(troco)
  para i de 1 ate 4 faca
    escreva("Notas/moedas disponíveis de ", valores[i], ": ")
    leia(notas[i])
  fimpara
  achou <- 0
  se (troco < 0) ou (notas[1] < 0) ou (notas[2] < 0) ou (notas[3] < 0) ou (notas[4] < 0) entao
    escreval("Dados inválidos")
  senao
    para a de 0 ate notas[1] faca
      para b de 0 ate notas[2] faca
        para c de 0 ate notas[3] faca
          restante <- troco - 20 * a - 10 * b - 5 * c
          se (restante >= 0) e (restante <= notas[4]) entao
            achou <- 1
            melhorA <- a
            melhorB <- b
            melhorC <- c
            melhorD <- restante
          fimse
        fimpara
      fimpara
    fimpara
    se achou = 1 entao
      escreval("Troco completo: ", melhorA, " de 20, ", melhorB, " de 10, ", melhorC, " de 5, ", melhorD, " de 1")
    senao
      escreval("Não há combinação exata com o estoque disponível")
    fimse
  fimse''',
    'Use cédulas/moedas de 20, 10, 5 e 1 em quantidades limitadas. Procure uma combinação exata dentro do estoque.',
    'Troco 26; disponíveis: 1 de 20, 0 de 10, 1 de 5, 1 de 1\nUsar 20+5+1; troco completo',
    'Troco negativo e quantidades negativas são recusados. Se nenhuma combinação exata existir, informe a impossibilidade.',
    'O programa examina as quantidades disponíveis de 20, 10 e 5; o resto determina quantas moedas de 1 seriam necessárias.',
    ['Teste as quantidades disponíveis de cada cédula.', 'Calcule o valor ainda necessário.', 'Veja se as moedas de 1 completam a quantia.'])

add(6, '''  nome: vetor[1..5] de caractere
  estoque, minimo: vetor[1..5] de inteiro
  produto, quantidade, acao, i: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    escreva("Estoque inicial: ")
    leia(estoque[i])
    escreva("Estoque mínimo: ")
    leia(minimo[i])
  fimpara
  escreva("Ação (1 entrada, 2 saída, 0 encerrar): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Produto (1 a 5): ")
    leia(produto)
    escreva("Quantidade: ")
    leia(quantidade)
    se (produto >= 1) e (produto <= 5) e (quantidade > 0) entao
      se acao = 1 entao
        estoque[produto] <- estoque[produto] + quantidade
      senao
        se (acao = 2) e (quantidade <= estoque[produto]) entao
          estoque[produto] <- estoque[produto] - quantidade
        senao
          escreval("Saída recusada.")
        fimse
      fimse
    fimse
    escreva("Ação (1 entrada, 2 saída, 0 encerrar): ")
    leia(acao)
  fimenquanto
  para i de 1 ate 5 faca
    escreval(nome[i], ": saldo ", estoque[i])
    se estoque[i] < minimo[i] entao
      escreval("Repor ", minimo[i] - estoque[i], " unidade(s)")
    fimse
  fimpara''',
    'Cadastre estoque e mínimo de cinco produtos. Registre entradas e saídas válidas; ao encerrar, informe quanto repor para produtos abaixo do mínimo.',
    'Estoque 3, mínimo 5; saída válida de 1\nSaldo 2; repor 3 unidades',
    'Saída maior que o saldo é recusada sem tornar o estoque negativo.',
    'O relatório usa a diferença mínimo menos saldo somente quando ela é positiva.',
    ['Associe saldos e mínimos pelo índice do produto.', 'Valide saídas antes de subtrair.', 'Mostre reposição para os saldos abaixo da meta.'])

add(7, '''  pontos, compra, resgate, acao: inteiro''', '''  pontos <- 0
  escreva("Ação (1 compra, 2 resgate, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se acao = 1 entao
      escreva("Valor inteiro da compra: ")
      leia(compra)
      se compra > 0 entao
        pontos <- pontos + compra div 10
      fimse
    senao
      se acao = 2 entao
        escreva("Pontos a resgatar: ")
        leia(resgate)
        se (resgate > 0) e (resgate <= pontos) entao
          pontos <- pontos - resgate
          escreval("Resgate autorizado.")
        senao
          escreval("Resgate recusado.")
        fimse
      fimse
    fimse
    escreval("Saldo de pontos: ", pontos)
    escreva("Ação (1 compra, 2 resgate, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Cada R$ 10 inteiros em uma compra rendem um ponto. Permita acumular compras e resgatar quantidade positiva de pontos que não exceda o saldo.',
    'Compra de R$ 35 → 3 pontos\nResgate de 2 → saldo 1',
    'Uma compra de R$ 9 rende zero ponto. Um resgate maior que o saldo é recusado.',
    'Divisão inteira calcula pontos ganhos; o saldo só diminui após validar o resgate.',
    ['Use um saldo acumulado.', 'Calcule pontos por divisão inteira.', 'Confira saldo antes de resgatar.'])

add(8, '''  nome: vetor[1..5] de caractere
  inicioMin, fimMin, turno: vetor[1..5] de inteiro
  i, j: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Funcionário ", i, ": ")
    leia(nome[i])
    escreva("Turno (1 manhã, 2 tarde): ")
    leia(turno[i])
    escreva("Disponível de (min): ")
    leia(inicioMin[i])
    escreva("Disponível até (min): ")
    leia(fimMin[i])
    se (turno[i] = 1) e ((inicioMin[i] > 720) ou (fimMin[i] < 480)) entao
      escreval(nome[i], ": conflito com turno da manhã")
    fimse
    se (turno[i] = 2) e ((inicioMin[i] > 1080) ou (fimMin[i] < 720)) entao
      escreval(nome[i], ": conflito com turno da tarde")
    fimse
  fimpara''',
    'Associe cinco funcionários a manhã (8h–12h) ou tarde (12h–18h), com disponibilidade informada em minutos. Marque conflito se a disponibilidade não tocar o turno designado.',
    'Ana no turno manhã, disponível 780–1000 min\nConflito com turno da manhã',
    'Disponibilidade que toca apenas uma extremidade do turno é tratada como compatível nesta versão.',
    'Cada turno possui faixa fixa; o código compara a janela pessoal à faixa atribuída.',
    ['Converta horários para minutos.', 'Defina as faixas dos turnos.', 'Compare início e fim disponíveis com a faixa escolhida.'])

add(9, '''  setor: vetor[1..3, 1..4] de inteiro
  linha, coluna, ocupadas: inteiro''', '''  ocupadas <- 0
  para linha de 1 ate 3 faca
    para coluna de 1 ate 4 faca
      escreva("Posição ", linha, ",", coluna, " (0 livre, 1 ocupada): ")
      leia(setor[linha, coluna])
      se setor[linha, coluna] = 1 entao
        escreval("Ocupada: corredor ", linha, ", posição ", coluna)
        ocupadas <- ocupadas + 1
      fimse
    fimpara
  fimpara
  escreval("Posições ocupadas: ", ocupadas)''',
    'Use matriz de três corredores e quatro posições. Valor 1 significa ocupado e 0, livre. Liste todas as posições ocupadas e mostre o total.',
    'Somente a célula 2,3 contém 1\nOcupada: corredor 2, posição 3\nTotal: 1',
    'Uma matriz inteiramente livre produz total zero.',
    'Os índices da matriz são usados diretamente na identificação da posição.',
    ['Use dois laços aninhados.', 'Confira o valor de cada célula.', 'Conte somente posições ocupadas.'])

add(10, '''  producao: vetor[1..7] de inteiro
  meta, i, atual, maior, inicioAtual, inicioMaior: inteiro''', '''  escreva("Meta diária: ")
  leia(meta)
  atual <- 0
  maior <- 0
  para i de 1 ate 7 faca
    escreva("Produção do dia ", i, ": ")
    leia(producao[i])
    se producao[i] > meta entao
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
  escreval("Maior sequência acima da meta: ", maior)
  se maior > 0 entao
    escreval("Dias ", inicioMaior, " a ", inicioMaior + maior - 1)
  fimse''',
    'Leia meta e sete produções. Destaque a maior sequência de dias consecutivos com produção estritamente acima da meta.',
    'Meta 10; dias 11,12,8,13,14,15,7\nMaior sequência: 3 dias, do dia 4 ao 6',
    'Dia exatamente igual à meta interrompe a sequência.',
    'O contador de sequência atual zera fora da meta; o maior preserva o melhor trecho.',
    ['Compare cada dia com a meta.', 'Conte apenas dias consecutivos acima dela.', 'Guarde o início da melhor sequência.'])

add(11, '''  fornecedor: vetor[1..3] de caractere
  preco, frete: vetor[1..3] de real
  i, melhor: inteiro
  quantidade: inteiro
  total, menor: real''', '''  escreva("Quantidade de unidades: ")
  leia(quantidade)
  se quantidade <= 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate 3 faca
      escreva("Fornecedor: ")
      leia(fornecedor[i])
      escreva("Preço unitário: ")
      leia(preco[i])
      escreva("Frete total: ")
      leia(frete[i])
    fimpara
    melhor <- 0
    para i de 1 ate 3 faca
      se (preco[i] >= 0) e (frete[i] >= 0) entao
        total <- preco[i] * quantidade + frete[i]
        escreval(fornecedor[i], ": R$ ", total)
        se (melhor = 0) ou (total < menor) entao
          melhor <- i
          menor <- total
        fimse
      fimse
    fimpara
    se melhor = 0 entao
      escreval("Nenhuma proposta válida")
    senao
      escreval("Melhor compra: ", fornecedor[melhor], " por R$ ", menor)
    fimse
  fimse''',
    'Compare três propostas para a mesma quantidade de um item. Some preço unitário vezes quantidade e frete fixo. Ignore propostas com preço ou frete negativo.',
    '10 unidades; A: R$ 8 + R$ 15 de frete; B: R$ 9 + R$ 0\nA: R$ 95; B: R$ 90; escolha B',
    'Empates preservam a primeira proposta. Quantidade não positiva é recusada.',
    'A decisão usa o custo completo do pedido, inclusive frete, para cada fornecedor.',
    ['Calcule o custo total de cada proposta.', 'Guarde o menor custo encontrado.', 'Mostre também o fornecedor vencedor.'])

add(12, '''  codigo, quantidade: vetor[1..3, 1..4] de inteiro
  linha, coluna, procurado, encontrados, total: inteiro''', '''  para linha de 1 ate 3 faca
    para coluna de 1 ate 4 faca
      escreva("Código da caixa ", linha, ",", coluna, ": ")
      leia(codigo[linha, coluna])
      escreva("Quantidade: ")
      leia(quantidade[linha, coluna])
    fimpara
  fimpara
  escreva("Código procurado: ")
  leia(procurado)
  encontrados <- 0
  total <- 0
  para linha de 1 ate 3 faca
    para coluna de 1 ate 4 faca
      se codigo[linha, coluna] = procurado entao
        escreval("Prateleira ", linha, ", posição ", coluna, ": ", quantidade[linha, coluna], " unidade(s)")
        encontrados <- encontrados + 1
        total <- total + quantidade[linha, coluna]
      fimse
    fimpara
  fimpara
  escreval("Caixas localizadas: ", encontrados, "; unidades: ", total)''',
    'Cadastre código e quantidade nas doze posições de uma matriz 3×4. Procure todas as caixas de um código e informe posição e soma das unidades.',
    'Código 7 nas posições (1,2) com 3 e (3,4) com 5\nDuas caixas; 8 unidades',
    'Se o código não existir, mostre zero caixas e zero unidades.',
    'A varredura da matriz encontra inclusive códigos repetidos em prateleiras diferentes.',
    ['Guarde código e quantidade na mesma posição de duas matrizes.', 'Percorra linhas e colunas.', 'Acumule todas as correspondências.'])

add(13, '''  pedidos: vetor[1..3] de inteiro
  receita: vetor[1..3] de real
  i, rota, distancia: inteiro
  taxa: real''', '''  para i de 1 ate 3 faca
    pedidos[i] <- 0
    receita[i] <- 0
  fimpara
  escreva("Distância do pedido em km (0 encerra): ")
  leia(distancia)
  enquanto distancia <> 0 faca
    se distancia < 0 entao
      escreval("Distância inválida")
    senao
      se distancia <= 5 entao
        rota <- 1
        taxa <- 5
      senao
        se distancia <= 15 entao
          rota <- 2
          taxa <- 10
        senao
          rota <- 3
          taxa <- 18
        fimse
      fimse
      pedidos[rota] <- pedidos[rota] + 1
      receita[rota] <- receita[rota] + taxa
      escreval("Rota ", rota, "; taxa R$ ", taxa)
    fimse
    escreva("Distância do pedido em km (0 encerra): ")
    leia(distancia)
  fimenquanto
  para i de 1 ate 3 faca
    escreval("Rota ", i, ": ", pedidos[i], " pedido(s), R$ ", receita[i])
  fimpara''',
    'Use distância inteira positiva: rota 1 até 5 km (R$ 5), rota 2 até 15 km (R$ 10), rota 3 acima de 15 km (R$ 18). Zero encerra.',
    'Distâncias 4, 12 e 19 km\nUma entrega em cada rota; taxas R$ 5, R$ 10 e R$ 18',
    'Distância negativa é ignorada e não altera os totais.',
    'A faixa determina simultaneamente o grupo da rota e a taxa fixa acumulada.',
    ['Crie três contadores.', 'Classifique cada distância por faixa.', 'Some a taxa na rota correspondente.'])

add(14, '''  i, minutos, saldo: inteiro''', '''  saldo <- 0
  para i de 1 ate 7 faca
    escreva("Variação do dia ", i, " em minutos (+ crédito, - débito): ")
    leia(minutos)
    saldo <- saldo + minutos
    escreval("Saldo após dia ", i, ": ", saldo, " min")
  fimpara
  se saldo > 0 entao
    escreval("Crédito final de ", saldo, " min")
  senao
    se saldo < 0 entao
      escreval("Débito final de ", 0 - saldo, " min")
    senao
      escreval("Banco de horas zerado")
    fimse
  fimse''',
    'Registre sete variações diárias em minutos; números positivos são créditos e negativos são débitos. Mostre o saldo após cada dia e o fechamento.',
    '+30, -10, 0, 0, 0, 0, 0\nCrédito final de 20 min',
    'Saldo zero deve ser exibido como banco de horas zerado.',
    'O sinal do saldo final indica se há horas a compensar ou a receber.',
    ['Use um acumulador com sinal.', 'Some cada variação.', 'Classifique o saldo ao final.'])

add(15, '''  nome: vetor[1..3] de caractere
  pontuacao: vetor[1..3] de real
  i, j, prazo: inteiro
  preco, desconto, efetivo, troca: real
  nomeTroca: caractere''', '''  para i de 1 ate 3 faca
    escreva("Proposta ", i, ": ")
    leia(nome[i])
    escreva("Preço: ")
    leia(preco)
    escreva("Desconto percentual: ")
    leia(desconto)
    escreva("Prazo em dias: ")
    leia(prazo)
    se (preco < 0) ou (desconto < 0) ou (desconto > 100) ou (prazo < 0) entao
      pontuacao[i] <- -1
    senao
      efetivo <- preco * (1 - desconto / 100)
      pontuacao[i] <- efetivo + prazo * 5
    fimse
  fimpara
  para i de 1 ate 2 faca
    para j de i + 1 ate 3 faca
      se (pontuacao[i] < 0) ou ((pontuacao[j] >= 0) e (pontuacao[j] < pontuacao[i])) entao
        troca <- pontuacao[i]
        pontuacao[i] <- pontuacao[j]
        pontuacao[j] <- troca
        nomeTroca <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- nomeTroca
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    se pontuacao[i] >= 0 entao
      escreval(i, "º ", nome[i], ": pontuação ", pontuacao[i])
    fimse
  fimpara''',
    'Para três propostas, calcule pontuação = preço após desconto + R$ 5 por dia de prazo. Menor pontuação vence; propostas inválidas ficam fora do ranking.',
    'A: R$ 100, 10%, 2 dias → 100 pontos; B: R$ 90, 0%, 1 dia → 95 pontos\nB à frente de A',
    'Desconto acima de 100% ou negativo invalida a proposta. Empates mantêm a ordem de cadastro.',
    'O peso de R$ 5 por dia explicita o compromisso entre custo e prazo.',
    ['Desconte o preço primeiro.', 'Some a penalidade do prazo.', 'Ordene nomes e pontuações juntos.'])

add(16, '''  i, pacotes, totalPacotes: inteiro
  area, cobertura, usado, sobra: real''', '''  escreva("Cobertura de cada pacote (m2): ")
  leia(cobertura)
  se cobertura <= 0 entao
    escreval("Cobertura inválida")
  senao
    totalPacotes <- 0
    usado <- 0
    para i de 1 ate 3 faca
      escreva("Área do cômodo ", i, " (m2): ")
      leia(area)
      se area >= 0 entao
        pacotes <- int(area / cobertura)
        se pacotes * cobertura < area entao
          pacotes <- pacotes + 1
        fimse
        sobra <- pacotes * cobertura - area
        escreval("Cômodo ", i, ": ", pacotes, " pacote(s); sobra ", sobra, " m2")
        totalPacotes <- totalPacotes + pacotes
        usado <- usado + area
      fimse
    fimpara
    escreval("Total comprado: ", totalPacotes, " pacote(s); sobra total ", totalPacotes * cobertura - usado, " m2")
  fimse''',
    'Três cômodos são cobertos separadamente com pacotes inteiros de rendimento fixo. Arredonde cada cômodo para cima e reporte sobra por cômodo e total.',
    'Cobertura 2 m²; áreas 3, 4 e 1 m²\n2, 2 e 1 pacotes; total 5; sobra total 2 m²',
    'Área zero usa zero pacote. Cobertura não positiva impede o cálculo.',
    'O arredondamento é feito em cada cômodo, pois sobras não são reaproveitadas entre eles.',
    ['Divida a área pela cobertura.', 'Adicione um pacote quando restar fração.', 'Some as sobras calculadas.'])

add(17, '''  codigo: vetor[1..5] de inteiro
  previsto, entregue: vetor[1..5] de inteiro
  i, busca, achado: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Código do pedido: ")
    leia(codigo[i])
    escreva("Data prevista (AAAAMMDD): ")
    leia(previsto[i])
    escreva("Data de entrega (AAAAMMDD; 0 pendente): ")
    leia(entregue[i])
  fimpara
  escreva("Código para consulta: ")
  leia(busca)
  achado <- 0
  para i de 1 ate 5 faca
    se codigo[i] = busca entao
      achado <- i
    fimse
  fimpara
  se achado = 0 entao
    escreval("Pedido não localizado")
  senao
    se entregue[achado] = 0 entao
      escreval("Pedido pendente")
    senao
      se entregue[achado] > previsto[achado] entao
        escreval("Entregue com atraso")
      senao
        escreval("Entregue no prazo")
      fimse
    fimse
  fimse''',
    'Cadastre cinco pedidos por código único, data prevista e data real no formato AAAAMMDD. Data real zero significa pendente. Consulte um código.',
    'Pedido 42: previsão 20260510, entrega 20260512\nEntregue com atraso',
    'O formato numérico pressupõe datas válidas; validar calendário real não faz parte desta atividade.',
    'No formato AAAAMMDD, uma comparação numérica preserva a ordem cronológica das datas válidas.',
    ['Guarde os três atributos no mesmo índice.', 'Procure o código.', 'Compare entrega e previsão só para pedidos concluídos.'])

add(18, '''  comum, prioridade: vetor[1..20] de inteiro
  ic, fc, ip, fp, acao, numero, vez: inteiro''', '''  ic <- 1
  fc <- 0
  ip <- 1
  fp <- 0
  vez <- 1
  escreva("Ação (1 senha comum, 2 prioritária, 3 atender, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se acao = 1 entao
      se fc < 20 entao
        fc <- fc + 1
        escreva("Número: ")
        leia(numero)
        comum[fc] <- numero
      senao
        escreval("Fila comum cheia")
      fimse
    senao
      se acao = 2 entao
        se fp < 20 entao
          fp <- fp + 1
          escreva("Número: ")
          leia(numero)
          prioridade[fp] <- numero
        senao
          escreval("Fila prioritária cheia")
        fimse
      senao
        se acao = 3 entao
          se (vez = 1) e (ip <= fp) entao
            escreval("Prioritária ", prioridade[ip])
            ip <- ip + 1
            vez <- 2
          senao
            se ic <= fc entao
              escreval("Comum ", comum[ic])
              ic <- ic + 1
              vez <- 1
            senao
              se ip <= fp entao
                escreval("Prioritária ", prioridade[ip])
                ip <- ip + 1
                vez <- 2
              senao
                escreval("Nenhuma senha pendente")
              fimse
            fimse
          fimse
        fimse
      fimse
    fimse
    escreva("Ação (1 comum, 2 prioritária, 3 atender, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Cadastre até vinte senhas de cada classe. Em cada chamada, alterne prioritária e comum; se a classe da vez estiver vazia, atenda a outra.',
    'Cadastre P1, P2, C3; chame três vezes\nP1, C3, P2',
    'Quando ambas as filas estão vazias, informe que não há senhas pendentes.',
    'Dois índices de leitura e dois de escrita preservam a ordem FIFO de cada fila.',
    ['Use dois vetores como filas.', 'Mantenha índices de entrada e saída.', 'Troque a classe preferida após atendimento.'])

add(19, '''  quant: vetor[1..3] de inteiro
  somaTempo, somaCusto: vetor[1..3] de real
  i, tipo, status, tempo: inteiro
  custo: real''', '''  para i de 1 ate 3 faca
    quant[i] <- 0
    somaTempo[i] <- 0
    somaCusto[i] <- 0
  fimpara
  para i de 1 ate 6 faca
    escreva("Tipo da ordem (1 mecânica, 2 elétrica, 3 pintura): ")
    leia(tipo)
    escreva("Status (1 concluída, 2 aberta): ")
    leia(status)
    se (tipo >= 1) e (tipo <= 3) e (status = 1) entao
      escreva("Tempo em horas: ")
      leia(tempo)
      escreva("Custo R$: ")
      leia(custo)
      se (tempo >= 0) e (custo >= 0) entao
        quant[tipo] <- quant[tipo] + 1
        somaTempo[tipo] <- somaTempo[tipo] + tempo
        somaCusto[tipo] <- somaCusto[tipo] + custo
      fimse
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Tipo ", i, ": ", quant[i], " concluída(s), custo R$ ", somaCusto[i])
    se quant[i] > 0 entao
      escreval("Tempo médio: ", somaTempo[i] / quant[i], " h")
    fimse
  fimpara''',
    'Cadastre seis ordens por tipo e status. Calcule custo total e tempo médio apenas das concluídas de cada tipo.',
    'Mecânica concluída em 2 h/R$ 30 e 4 h/R$ 50\nTempo médio 3 h; custo R$ 80',
    'Tipo sem ordem concluída apresenta quantidade e custo zero, sem dividir por zero.',
    'Vetores acumulam separadamente quantidade, tempo e custo de cada categoria.',
    ['Associe tipo a um índice.', 'Ignore ordens abertas nas médias.', 'Divida tempo somado pela quantidade concluída.'])

add(20, '''  i, itens: inteiro
  peso, precoKg, desconto, subtotal, total: real''', '''  total <- 0
  escreva("Número de itens: ")
  leia(itens)
  se itens <= 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate itens faca
      escreva("Peso do item ", i, " (kg): ")
      leia(peso)
      escreva("Preço por kg: ")
      leia(precoKg)
      escreva("Desconto percentual: ")
      leia(desconto)
      se (peso >= 0) e (precoKg >= 0) e (desconto >= 0) e (desconto <= 100) entao
        subtotal <- peso * precoKg * (1 - desconto / 100)
        total <- total + subtotal
        escreval("Subtotal: R$ ", subtotal)
      senao
        escreval("Item inválido ignorado")
      fimse
    fimpara
    escreval("Total da compra: R$ ", total)
  fimse''',
    'Para cada item, leia peso em kg, preço por kg e desconto percentual. Some apenas itens com valores válidos e mostre cada subtotal.',
    '2 kg a R$ 10/kg com 10% de desconto; 1 kg a R$ 5/kg sem desconto\nR$ 18 + R$ 5 = R$ 23',
    'Desconto fora de 0–100% ou preço/peso negativo invalida somente aquele item.',
    'O desconto é aplicado ao valor de cada pesagem antes da soma da compra.',
    ['Multiplique peso por preço por kg.', 'Aplique o desconto de cada item.', 'Acumule os subtotais válidos.'])

add(21, '''  i, j, pedidos, capacidade, quantidade, dia, carga: inteiro''', '''  escreva("Capacidade por dia: ")
  leia(capacidade)
  escreva("Número de encomendas: ")
  leia(pedidos)
  se (capacidade <= 0) ou (pedidos < 0) entao
    escreval("Dados inválidos")
  senao
    dia <- 1
    carga <- 0
    para i de 1 ate pedidos faca
      escreva("Unidades da encomenda ", i, ": ")
      leia(quantidade)
      se (quantidade <= 0) ou (quantidade > capacidade) entao
        escreval("Encomenda ", i, " não cabe em um dia")
      senao
        se carga + quantidade > capacidade entao
          escreval("Dia ", dia, ": ", carga, " unidade(s)")
          dia <- dia + 1
          carga <- 0
        fimse
        carga <- carga + quantidade
        escreval("Encomenda ", i, " atribuída ao dia ", dia)
      fimse
    fimpara
    se carga > 0 entao
      escreval("Dia ", dia, ": ", carga, " unidade(s)")
    fimse
  fimse''',
    'Leia encomendas na ordem recebida. Uma encomenda não é fracionada; coloque-a no dia atual se couber, senão abra o próximo dia.',
    'Capacidade 10; encomendas 6, 5, 3\nDia 1: 6; dia 2: 8 unidades',
    'Encomenda maior que a capacidade diária é recusada sem alterar o planejamento.',
    'A soma do dia nunca supera a capacidade porque a mudança de dia ocorre antes de incluir a encomenda.',
    ['Mantenha carga do dia atual.', 'Teste se a próxima encomenda cabe.', 'Feche o dia antes de exceder a capacidade.'])

add(22, '''  nome: vetor[1..3] de caractere
  custo: vetor[1..3] de real
  prazo: vetor[1..3] de inteiro
  i, melhor, limite: inteiro
  peso, fixo, porKg, menor: real''', '''  escreva("Peso total em kg: ")
  leia(peso)
  escreva("Prazo máximo em dias: ")
  leia(limite)
  se (peso < 0) ou (limite < 0) entao
    escreval("Dados inválidos")
  senao
    melhor <- 0
    para i de 1 ate 3 faca
      escreva("Transportadora ", i, ": ")
      leia(nome[i])
      escreva("Taxa fixa: ")
      leia(fixo)
      escreva("Preço por kg: ")
      leia(porKg)
      escreva("Prazo em dias: ")
      leia(prazo[i])
      custo[i] <- fixo + porKg * peso
      escreval(nome[i], ": R$ ", custo[i], "; ", prazo[i], " dia(s)")
      se (fixo >= 0) e (porKg >= 0) e (prazo[i] >= 0) e (prazo[i] <= limite) entao
        se (melhor = 0) ou (custo[i] < menor) entao
          melhor <- i
          menor <- custo[i]
        fimse
      fimse
    fimpara
    se melhor = 0 entao
      escreval("Nenhuma atende ao prazo")
    senao
      escreval("Escolha: ", nome[melhor], " por R$ ", menor)
    fimse
  fimse''',
    'Compare três empresas por taxa fixa + peso × preço/kg. Entre as que cumprem o prazo máximo, selecione a mais barata.',
    'Peso 2 kg, limite 3 dias; A: 5 + 2/kg em 2 dias; B: 4 + 1/kg em 5 dias\nEscolha A (R$ 9)',
    'Uma empresa barata fora do prazo não concorre. Empates mantêm a primeira.',
    'O algoritmo mostra todas as propostas e usa custo e prazo conjuntamente para escolher.',
    ['Calcule o frete completo.', 'Descarte prazos fora do limite.', 'Atualize o menor custo elegível.'])

add(23, '''  nome: vetor[1..5] de caractere
  emUso: vetor[1..5] de inteiro
  i, opcao, item, total: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Ferramenta ", i, ": ")
    leia(nome[i])
    emUso[i] <- 0
  fimpara
  escreva("Ação (1 emprestar, 2 devolver, 3 listar, 0 sair): ")
  leia(opcao)
  enquanto opcao <> 0 faca
    se (opcao = 1) ou (opcao = 2) entao
      escreva("Número da ferramenta (1 a 5): ")
      leia(item)
      se (item < 1) ou (item > 5) entao
        escreval("Número inválido")
      senao
        se (opcao = 1) e (emUso[item] = 0) entao
          emUso[item] <- 1
          escreval("Empréstimo registrado: ", nome[item])
        senao
          se (opcao = 2) e (emUso[item] = 1) entao
            emUso[item] <- 0
            escreval("Devolução registrada: ", nome[item])
          senao
            escreval("Operação incompatível com o estado atual")
          fimse
        fimse
      fimse
    senao
      se opcao = 3 entao
        total <- 0
        para i de 1 ate 5 faca
          se emUso[i] = 1 entao
            escreval(nome[i], " em uso")
            total <- total + 1
          fimse
        fimpara
        escreval("Total em uso: ", total)
      fimse
    fimse
    escreva("Ação (1 emprestar, 2 devolver, 3 listar, 0 sair): ")
    leia(opcao)
  fimenquanto''',
    'Cadastre cinco ferramentas. Empréstimo só é aceito quando disponível; devolução só quando em uso. A consulta lista os itens emprestados.',
    'Empreste a ferramenta 2 e consulte\nFerramenta 2 em uso; total 1',
    'Empréstimo duplicado e devolução sem empréstimo são recusados.',
    'Um vetor de estados guarda a situação de cada item entre operações.',
    ['Use 0 para disponível e 1 para em uso.', 'Valide número e estado antes de mudar.', 'Percorra o vetor para listar empréstimos.'])

add(24, '''  i, equipe: inteiro
  base, bonusPct, descontoPct, bruto, liquido, total: real''', '''  escreva("Número de funcionários: ")
  leia(equipe)
  escreva("Bônus percentual: ")
  leia(bonusPct)
  escreva("Desconto percentual: ")
  leia(descontoPct)
  se (equipe < 0) ou (bonusPct < 0) ou (descontoPct < 0) ou (descontoPct > 100) entao
    escreval("Parâmetros inválidos")
  senao
    total <- 0
    para i de 1 ate equipe faca
      escreva("Salário-base do funcionário ", i, ": ")
      leia(base)
      se base >= 0 entao
        bruto <- base * (1 + bonusPct / 100)
        liquido <- bruto * (1 - descontoPct / 100)
        total <- total + liquido
        escreval("Funcionário ", i, ": bruto R$ ", bruto, "; líquido R$ ", liquido)
      senao
        escreval("Salário-base inválido")
      fimse
    fimpara
    escreval("Folha líquida: R$ ", total)
  fimse''',
    'Use um percentual de bônus e um de desconto comuns à equipe. Aplique o desconto sobre o valor após o bônus e some os salários líquidos.',
    'Base R$ 1000, bônus 10%, desconto 10%\nBruto R$ 1100; líquido R$ 990',
    'Salário-base negativo é ignorado. Desconto acima de 100% invalida os parâmetros.',
    'A ordem das operações importa: primeiro o bônus, depois o desconto sobre o bruto.',
    ['Transforme percentuais em frações.', 'Calcule bruto antes de líquido.', 'Acumule os líquidos da equipe.'])

add(25, '''  pessoas, minimo, grupos, i, pausas, restantes: inteiro''', '''  escreva("Pessoas no turno: ")
  leia(pessoas)
  escreva("Mínimo que deve permanecer: ")
  leia(minimo)
  se (pessoas < 0) ou (minimo < 0) ou (minimo > pessoas) entao
    escreval("Dados inválidos")
  senao
    pausas <- pessoas - minimo
    se pausas = 0 entao
      escreval("Não há pessoas livres para pausa simultânea")
    senao
      grupos <- pessoas div pausas
      se grupos * pausas < pessoas entao
        grupos <- grupos + 1
      fimse
      restantes <- pessoas
      para i de 1 ate grupos faca
        se restantes >= pausas entao
          escreval("Rodada ", i, ": ", pausas, " pessoa(s) em pausa")
          restantes <- restantes - pausas
        senao
          escreval("Rodada ", i, ": ", restantes, " pessoa(s) em pausa")
          restantes <- 0
        fimse
      fimpara
    fimse
  fimse''',
    'Distribua uma pausa para cada pessoa em rodadas. No máximo pessoas menos mínimo podem pausar ao mesmo tempo; informe o tamanho de cada rodada.',
    '8 pessoas, mínimo 5\nRodadas de 3, 3 e 2 pessoas',
    'Se mínimo for igual ao total, nenhuma pausa simultânea é possível nesta escala.',
    'A capacidade de pausa por rodada preserva automaticamente o mínimo em serviço.',
    ['Calcule quantas podem sair simultaneamente.', 'Agrupe pessoas até esse limite.', 'Trate o grupo final menor.'])

add(26, '''  producao, perdas: vetor[1..3, 1..2] de inteiro
  maquina, turno, bom, totalBom, totalPerdas: inteiro''', '''  totalBom <- 0
  totalPerdas <- 0
  para maquina de 1 ate 3 faca
    bom <- 0
    para turno de 1 ate 2 faca
      escreva("Produção da máquina ", maquina, " turno ", turno, ": ")
      leia(producao[maquina, turno])
      escreva("Perdas: ")
      leia(perdas[maquina, turno])
      se (producao[maquina, turno] >= 0) e (perdas[maquina, turno] >= 0) e (perdas[maquina, turno] <= producao[maquina, turno]) entao
        bom <- bom + producao[maquina, turno] - perdas[maquina, turno]
        totalPerdas <- totalPerdas + perdas[maquina, turno]
      senao
        escreval("Registro inválido ignorado")
      fimse
    fimpara
    escreval("Máquina ", maquina, ": ", bom, " peças boas")
    totalBom <- totalBom + bom
  fimpara
  escreval("Total bom: ", totalBom, "; perdas: ", totalPerdas)''',
    'Registre três máquinas em dois turnos. Peças boas = produção menos perdas. Mostre peças boas por máquina e totais da fábrica.',
    'Máquina 1: turnos 10/1 e 12/2 (produção/perdas)\n19 peças boas',
    'Perda maior que produção invalida somente a célula correspondente.',
    'Matrizes associam cada registro ao par máquina e turno.',
    ['Percorra máquina e turno.', 'Subtraia perdas em cada célula válida.', 'Acumule por máquina e no total.'])

add(27, '''  nome: vetor[1..3] de caractere
  preco: vetor[1..3, 1..4] de real
  i, semana, melhorProduto, melhorSemana: inteiro
  queda, maior: real''', '''  maior <- -1
  para i de 1 ate 3 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    para semana de 1 ate 4 faca
      escreva("Preço da semana ", semana, ": ")
      leia(preco[i, semana])
    fimpara
  fimpara
  para i de 1 ate 3 faca
    para semana de 2 ate 4 faca
      se (preco[i, semana - 1] > 0) e (preco[i, semana] >= 0) entao
        queda <- 100 * (preco[i, semana - 1] - preco[i, semana]) / preco[i, semana - 1]
        se queda > maior entao
          maior <- queda
          melhorProduto <- i
          melhorSemana <- semana
        fimse
      fimse
    fimpara
  fimpara
  se maior < 0 entao
    escreval("Nenhum par válido para comparação")
  senao
    se maior <= 0 entao
      escreval("Nenhuma queda de preço")
    senao
      escreval("Maior queda: ", nome[melhorProduto], ", semana ", melhorSemana - 1, " para ", melhorSemana, ": ", maior, "%")
    fimse
  fimse''',
    'Leia quatro preços semanais de três produtos. Compare semanas consecutivas e encontre a maior queda percentual positiva.',
    'Produto A: 100, 80, 80, 60\nMaior queda: 25%, da semana 3 para 4',
    'Preço anterior zero não pode servir como divisor e é ignorado.',
    'A porcentagem usa o preço da semana anterior como base, por isso quedas absolutas iguais podem ter percentuais distintos.',
    ['Compare semanas adjacentes.', 'Divida a diferença pelo preço anterior.', 'Guarde produto e semana da maior queda.'])

add(28, '''  livre: vetor[1..2] de inteiro
  i, chegada, duracao, doca, inicioDescarga: inteiro''', '''  livre[1] <- 0
  livre[2] <- 0
  para i de 1 ate 5 faca
    escreva("Chegada da carga ", i, " em minutos: ")
    leia(chegada)
    escreva("Duração de descarga em minutos: ")
    leia(duracao)
    se (chegada < 0) ou (duracao < 0) entao
      escreval("Carga inválida")
    senao
      doca <- 1
      se livre[2] < livre[1] entao
        doca <- 2
      fimse
      inicioDescarga <- chegada
      se livre[doca] > inicioDescarga entao
        inicioDescarga <- livre[doca]
      fimse
      livre[doca] <- inicioDescarga + duracao
      escreval("Carga ", i, ": doca ", doca, ", inicia ", inicioDescarga, ", libera ", livre[doca])
    fimse
  fimpara''',
    'Simule cinco cargas informadas em ordem de chegada. Atribua cada uma à doca que ficará livre primeiro; início é o máximo entre chegada e liberação da doca.',
    'Docas livres em 0; cargas (0,10), (0,5), (2,3)\nCargas nas docas 1, 2 e 2; terceira inicia em 5 e libera em 8',
    'Empate entre docas escolhe a doca 1. Duração zero libera imediatamente.',
    'O vetor de horários representa a próxima disponibilidade de cada doca.',
    ['Guarde o horário livre de cada doca.', 'Escolha o menor horário.', 'Atualize liberação após a descarga.'])

add(29, '''  nome: vetor[1..5] de caractere
  economia: vetor[1..5] de real
  i, j: inteiro
  preco, desconto, limite, troca: real
  nomeTroca: caractere''', '''  escreva("Desconto mínimo percentual: ")
  leia(limite)
  para i de 1 ate 5 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    escreva("Preço: ")
    leia(preco)
    escreva("Desconto percentual: ")
    leia(desconto)
    economia[i] <- -1
    se (preco >= 0) e (desconto >= limite) e (desconto <= 100) e (desconto >= 0) entao
      economia[i] <- preco * desconto / 100
    fimse
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se economia[j] > economia[i] entao
        troca <- economia[i]
        economia[i] <- economia[j]
        economia[j] <- troca
        nomeTroca <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- nomeTroca
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    se economia[i] >= 0 entao
      escreval(nome[i], ": economia R$ ", economia[i])
    fimse
  fimpara''',
    'Filtre cinco produtos por desconto percentual mínimo e ordene os elegíveis pela economia em reais, da maior para a menor.',
    'Mínimo 10%; A: R$ 100 com 20% → R$ 20; B: R$ 300 com 10% → R$ 30\nB aparece antes de A',
    'Preço negativo ou desconto fora de 0–100% exclui o produto.',
    'O filtro usa percentual; a ordenação usa o dinheiro efetivamente economizado.',
    ['Calcule economia = preço × desconto/100.', 'Marque inelegíveis.', 'Ordene economia e nome juntos.'])

add(30, '''  i, vendas, retiradas, pagamentos: inteiro
  abertura, valor, esperado, contado, diferenca: real''', '''  escreva("Saldo de abertura: ")
  leia(abertura)
  esperado <- abertura
  escreva("Número de lançamentos: ")
  leia(vendas)
  para i de 1 ate vendas faca
    escreva("Tipo (1 venda, 2 sangria, 3 pagamento): ")
    leia(pagamentos)
    escreva("Valor: ")
    leia(valor)
    se valor < 0 entao
      escreval("Valor inválido ignorado")
    senao
      se pagamentos = 1 entao
        esperado <- esperado + valor
      senao
        se (pagamentos = 2) ou (pagamentos = 3) entao
          esperado <- esperado - valor
        fimse
      fimse
    fimse
  fimpara
  escreva("Saldo contado: ")
  leia(contado)
  diferenca <- contado - esperado
  escreval("Saldo esperado: R$ ", esperado)
  se diferenca = 0 entao
    escreval("Caixa conciliado")
  senao
    escreval("Divergência: R$ ", diferenca)
  fimse''',
    'Parta do saldo de abertura. Vendas entram no caixa; sangrias e pagamentos saem. Compare o saldo esperado com o dinheiro contado.',
    'Abertura R$ 100; venda R$ 50; sangria R$ 20; contado R$ 125\nEsperado R$ 130; divergência R$ -5',
    'Valor negativo é ignorado. Divergência positiva significa sobra de dinheiro.',
    'O acumulador reproduz o fluxo de entradas e saídas antes da conferência física.',
    ['Some vendas.', 'Subtraia sangrias e pagamentos.', 'Faça contado menos esperado.'])

add(31, '''  resultado: vetor[1..3, 1..4] de real
  equipe, semana, melhor: inteiro
  soma, media, maior: real''', '''  maior <- -999999999
  para equipe de 1 ate 3 faca
    soma <- 0
    para semana de 1 ate 4 faca
      escreva("Resultado da equipe ", equipe, " semana ", semana, ": ")
      leia(resultado[equipe, semana])
      soma <- soma + resultado[equipe, semana]
    fimpara
    media <- soma / 4
    escreval("Equipe ", equipe, ": total ", soma, "; média ", media)
    se media > maior entao
      maior <- media
      melhor <- equipe
    fimse
  fimpara
  escreval("Melhor média mensal: equipe ", melhor, " com ", maior)''',
    'Registre quatro resultados semanais de cada uma das três equipes. Mostre soma, média e a equipe com melhor média.',
    'Equipe 1: 1,2,3,4 → média 2,5; equipe 2: 4,4,4,4 → média 4\nEquipe 2 supera equipe 1',
    'Resultados negativos são permitidos. Empate preserva a equipe de menor número.',
    'A matriz mantém cada semana ligada à sua equipe; a média permite comparar equipes na mesma escala.',
    ['Use matriz 3×4.', 'Some as quatro semanas de cada linha.', 'Atualize o maior valor médio.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Catalogued {len(entries)} challenge solutions')
