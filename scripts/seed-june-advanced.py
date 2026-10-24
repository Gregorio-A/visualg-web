#!/usr/bin/env python3
"""Curated advanced June exercises based on the challenge CSV."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'data/challenge-solutions.json'
entries = json.loads(CATALOG.read_text(encoding='utf-8'))
rows = {r['data_mm_dd']: r for r in csv.DictReader((ROOT / 'data/visualg_365_dias_730_desafios.csv').open(encoding='utf-8'))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f'06-{day:02d}'
    prompt = rows[date]['avancado_enunciado']
    code = f'algoritmo "Desafio06{day:02d}A"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f'{date}/avancado'] = dict(code=code, objective=prompt[0].upper() + prompt[1:], rules=rules,
                                      example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '''  bandeira: vetor[1..4, 1..6] de inteiro
  linha, coluna, amarelas, azuis: inteiro''', '''  amarelas <- 0
  azuis <- 0
  para linha de 1 ate 4 faca
    para coluna de 1 ate 6 faca
      se (linha + coluna) mod 2 = 0 entao
        bandeira[linha, coluna] <- 1
        amarelas <- amarelas + 1
        escreva("A ")
      senao
        bandeira[linha, coluna] <- 2
        azuis <- azuis + 1
        escreva("Z ")
      fimse
    fimpara
    escreval("")
  fimpara
  escreval("Amarelas: ", amarelas, "; azuis: ", azuis)''',
    'Monte quatro fileiras de seis bandeirinhas. Use A quando linha + coluna for par e Z caso contrário; conte cada cor.',
    'Primeira fileira: A Z A Z A Z\nTotal: 12 amarelas e 12 azuis',
    'As cores alternam também na passagem de uma linha para a próxima.',
    'A paridade da soma dos índices gera o padrão de tabuleiro em toda a matriz.',
    ['Use matriz 4×6.', 'Teste a paridade de linha + coluna.', 'Conte as duas cores.'])

add(2, '''  nome: vetor[1..3] de caractere
  estoque: vetor[1..3] de inteiro
  preco: vetor[1..3] de real
  i, item, quantidade: inteiro
  caixa: real''', '''  para i de 1 ate 3 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    escreva("Estoque: ")
    leia(estoque[i])
    escreva("Preço unitário: ")
    leia(preco[i])
  fimpara
  caixa <- 0
  escreva("Produto vendido (1 a 3; 0 encerra): ")
  leia(item)
  enquanto item <> 0 faca
    se (item >= 1) e (item <= 3) entao
      escreva("Quantidade: ")
      leia(quantidade)
      se (quantidade > 0) e (quantidade <= estoque[item]) e (preco[item] >= 0) entao
        estoque[item] <- estoque[item] - quantidade
        caixa <- caixa + preco[item] * quantidade
        escreval("Venda de ", nome[item], " registrada")
      senao
        escreval("Venda recusada")
      fimse
    senao
      escreval("Produto inválido")
    fimse
    escreva("Produto vendido (1 a 3; 0 encerra): ")
    leia(item)
  fimenquanto
  escreval("Caixa: R$ ", caixa)
  para i de 1 ate 3 faca
    escreval(nome[i], ": ", estoque[i], " unidade(s) restantes")
  fimpara''',
    'Cadastre três produtos, cada um com estoque e preço. Registre vendas até informar zero; uma venda só passa se houver quantidade suficiente.',
    'Estoque 5, preço R$ 4; venda 2 → caixa R$ 8 e estoque 3',
    'Quantidade zero ou superior ao estoque é recusada.',
    'A mesma posição dos vetores associa nome, saldo e preço do produto.',
    ['Use vetores paralelos.', 'Valide estoque antes de vender.', 'Atualize caixa e estoque juntos.'])

add(3, '''  comando: vetor[1..10] de inteiro
  pares: vetor[1..2, 1..2] de inteiro
  i, par, movimento: inteiro''', '''  pares[1, 1] <- 2
  pares[1, 2] <- 2
  pares[2, 1] <- 4
  pares[2, 2] <- 4
  escreval("Grade 5x5; pares em (2,2) e (4,4)")
  para i de 1 ate 10 faca
    escreva("Comando ", i, " (0 parar; 1 cima, 2 direita, 3 baixo, 4 esquerda): ")
    leia(comando[i])
    se comando[i] = 0 entao
      escreval("Coreografia encerrada")
      interrompa
    fimse
    escreva("Par (1 ou 2): ")
    leia(par)
    se (par >= 1) e (par <= 2) entao
      escolha comando[i]
        caso 1
          se pares[par, 1] > 1 entao
            pares[par, 1] <- pares[par, 1] - 1
          fimse
        caso 2
          se pares[par, 2] < 5 entao
            pares[par, 2] <- pares[par, 2] + 1
          fimse
        caso 3
          se pares[par, 1] < 5 entao
            pares[par, 1] <- pares[par, 1] + 1
          fimse
        caso 4
          se pares[par, 2] > 1 entao
            pares[par, 2] <- pares[par, 2] - 1
          fimse
      fimescolha
      escreval("Par ", par, " em (", pares[par, 1], ",", pares[par, 2], ")")
    fimse
  fimpara''',
    'Simule dois pares numa grade 5×5 por até dez comandos. Cada comando escolhe o par e uma das quatro direções; movimentos fora da grade são ignorados.',
    'Par 1 começa em (2,2); direita → (2,3)',
    'Comando zero encerra antes dos dez passos. Dois pares podem ocupar a mesma célula nesta versão.',
    'A matriz guarda linha e coluna de cada par; a direção altera só uma coordenada dentro dos limites.',
    ['Guarde linha e coluna dos dois pares.', 'Associe direção à coordenada.', 'Confira limite 1–5 antes da mudança.'])

add(4, '''  premio: vetor[1..3] de caractere
  estoque, usado: vetor[1..3] de inteiro
  rodada, sorteio, total: inteiro''', '''  premio[1] <- "adesivo"
  premio[2] <- "lápis"
  premio[3] <- "brinquedo"
  para rodada de 1 ate 3 faca
    escreva("Estoque de ", premio[rodada], ": ")
    leia(estoque[rodada])
    usado[rodada] <- 0
  fimpara
  para rodada de 1 ate 5 faca
    escreva("Sorteio pré-definido da rodada ", rodada, " (1 a 3): ")
    leia(sorteio)
    se (sorteio < 1) ou (sorteio > 3) entao
      escreval("Sorteio inválido")
    senao
      se usado[sorteio] = 1 entao
        escreval("Prêmio já saiu; rodada sem entrega")
      senao
        se estoque[sorteio] <= 0 entao
          escreval("Prêmio esgotado")
        senao
          estoque[sorteio] <- estoque[sorteio] - 1
          usado[sorteio] <- 1
          escreval("Entregue: ", premio[sorteio])
        fimse
      fimse
    fimse
  fimpara''',
    'Leia estoque dos três prêmios e cinco sorteios já definidos. Cada tipo de prêmio só pode ser entregue uma vez no conjunto de rodadas.',
    'Estoque de lápis 2; sorteios 2 e 2 → primeira entrega lápis, segunda sem entrega',
    'Um prêmio esgotado não é marcado como usado, mas continua sem entrega até haver estoque, que não é reposto aqui.',
    'O vetor de usados impede repetição de tipo; o de estoque impede entrega sem unidade.',
    ['Associe número a prêmio.', 'Confira se já foi usado.', 'Confira saldo antes de entregar.'])

add(5, '''  remetente, destinatario, mensagem: vetor[1..10] de caractere
  i, n, encontrados: inteiro
  busca: caractere''', '''  escreva("Número de bilhetes (0 a 10): ")
  leia(n)
  se (n < 0) ou (n > 10) entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate n faca
      escreva("Remetente: ")
      leia(remetente[i])
      escreva("Destinatário: ")
      leia(destinatario[i])
      escreva("Mensagem curta: ")
      leia(mensagem[i])
    fimpara
    escreva("Destinatário a buscar: ")
    leia(busca)
    encontrados <- 0
    para i de 1 ate n faca
      se minusc(destinatario[i]) = minusc(busca) entao
        escreval(remetente[i], " para ", destinatario[i], ": ", mensagem[i])
        encontrados <- encontrados + 1
      fimse
    fimpara
    escreval("Mensagens para ", busca, ": ", encontrados)
  fimse''',
    'Cadastre até dez bilhetes com remetente, destinatário e mensagem. Busque por destinatário, ignorando maiúsculas e minúsculas.',
    'Bilhetes para Ana e Beto; busca Ana → mostra o bilhete de Ana e conta 1',
    'Nenhuma correspondência produz contagem zero.',
    'Vetores paralelos preservam cada bilhete; a busca percorre todos os destinatários.',
    ['Guarde três campos por bilhete.', 'Normalize os nomes na comparação.', 'Conte todas as correspondências.'])

add(6, '''  estoque: vetor[1..3] de inteiro
  i, pedidos, queijo, milho, molho: inteiro
  custo, total: real''', '''  para i de 1 ate 3 faca
    escreva("Estoque do adicional ", i, " (1 queijo, 2 milho, 3 molho): ")
    leia(estoque[i])
  fimpara
  escreva("Número de lanches: ")
  leia(pedidos)
  total <- 0
  se pedidos > 0 entao
    para i de 1 ate pedidos faca
      escreva("Adicionar queijo? (0/1): ")
      leia(queijo)
      escreva("Adicionar milho? (0/1): ")
      leia(milho)
      escreva("Adicionar molho? (0/1): ")
      leia(molho)
      se (queijo < 0) ou (queijo > 1) ou (milho < 0) ou (milho > 1) ou (molho < 0) ou (molho > 1) entao
        escreval("Opção inválida")
      senao
        se (queijo > estoque[1]) ou (milho > estoque[2]) ou (molho > estoque[3]) entao
          escreval("Ingrediente indisponível")
        senao
          estoque[1] <- estoque[1] - queijo
          estoque[2] <- estoque[2] - milho
          estoque[3] <- estoque[3] - molho
          custo <- 8 + 2 * queijo + milho + molho
          total <- total + custo
          escreval("Lanche ", i, ": R$ ", custo)
        fimse
      fimse
    fimpara
  fimse
  escreval("Total recebido: R$ ", total)''',
    'O lanche base custa R$ 8; queijo R$ 2, milho R$ 1 e molho R$ 1. Cada adicional é opcional e exige uma unidade em estoque.',
    'Lanche com queijo e molho → R$ 11; estoque desses dois cai em um',
    'Pedido com ingrediente esgotado é recusado inteiro, sem consumir os outros.',
    'O pedido é validado como um conjunto antes de subtrair estoques e calcular o preço.',
    ['Leia opções 0/1.', 'Confira todos os estoques.', 'Desconte ingredientes só após validar.'])

add(7, '''  nome: vetor[1..5] de caractere
  duracao: vetor[1..5] de inteiro
  i, n, horario, tempo: inteiro''', '''  escreva("Quantidade de receitas (0 a 5): ")
  leia(n)
  escreva("Início do forno em minutos: ")
  leia(horario)
  se (n < 0) ou (n > 5) ou (horario < 0) entao
    escreval("Dados inválidos")
  senao
    para i de 1 ate n faca
      escreva("Nome da receita ", i, ": ")
      leia(nome[i])
      escreva("Duração em minutos: ")
      leia(duracao[i])
    fimpara
    para i de 1 ate n faca
      tempo <- duracao[i]
      se tempo < 0 entao
        tempo <- 0
      fimse
      escreval(nome[i], ": de ", horario, " a ", horario + tempo, " min")
      horario <- horario + tempo
    fimpara
    escreval("Forno livre em ", horario, " min")
  fimse''',
    'Programe até cinco receitas em ordem de cadastro num forno único. Cada receita começa quando a anterior termina.',
    'Início 60 min; receitas de 20 e 15 min → 60–80 e 80–95',
    'Duração negativa é tratada como zero; nenhuma receita deixa o horário de liberação igual ao inicial.',
    'O relógio acumulado nunca sobrepõe duas receitas no mesmo forno.',
    ['Guarde duração de cada receita.', 'Mostre início e fim atuais.', 'Avance o relógio ao fim de cada lote.'])

add(8, '''  vendido, ordem: vetor[1..3] de inteiro
  categoria, quantidade, i, j, troca: inteiro
  preco, desconto, descontos: real''', '''  para i de 1 ate 3 faca
    vendido[i] <- 0
    ordem[i] <- i
  fimpara
  descontos <- 0
  para i de 1 ate 6 faca
    escreva("Categoria da venda (1 a 3): ")
    leia(categoria)
    escreva("Quantidade: ")
    leia(quantidade)
    escreva("Preço unitário: ")
    leia(preco)
    escreva("Desconto percentual: ")
    leia(desconto)
    se (categoria >= 1) e (categoria <= 3) e (quantidade > 0) e (preco >= 0) e (desconto >= 0) e (desconto <= 100) entao
      vendido[categoria] <- vendido[categoria] + quantidade
      descontos <- descontos + quantidade * preco * desconto / 100
    senao
      escreval("Venda inválida ignorada")
    fimse
  fimpara
  para i de 1 ate 2 faca
    para j de i + 1 ate 3 faca
      se vendido[ordem[j]] > vendido[ordem[i]] entao
        troca <- ordem[i]
        ordem[i] <- ordem[j]
        ordem[j] <- troca
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    escreval(i, "º categoria ", ordem[i], ": ", vendido[ordem[i]], " unidade(s)")
  fimpara
  escreval("Descontos concedidos: R$ ", descontos)''',
    'Registre seis vendas em três categorias. Conte unidades por categoria, ordene o ranking e some o valor em reais dos descontos.',
    '2 itens de R$ 10 com 10% de desconto → R$ 2 de descontos',
    'Empate entre categorias preserva a menor categoria.',
    'Vetores acumulam unidades por categoria; outro vetor ordena os índices sem perder os totais.',
    ['Conte quantidades por categoria.', 'Calcule desconto vezes quantidade.', 'Ordene os índices pelo total de unidades.'])

add(9, '''  estoque: vetor[1..3] de inteiro
  necessidade: vetor[1..3] de inteiro
  i, kits, possiveis: inteiro''', '''  para i de 1 ate 3 faca
    escreva("Estoque do item ", i, ": ")
    leia(estoque[i])
    escreva("Unidades do item por kit: ")
    leia(necessidade[i])
  fimpara
  kits <- 999999
  para i de 1 ate 3 faca
    se (estoque[i] < 0) ou (necessidade[i] <= 0) entao
      kits <- -1
    senao
      possiveis <- estoque[i] div necessidade[i]
      se possiveis < kits entao
        kits <- possiveis
      fimse
    fimse
  fimpara
  se kits < 0 entao
    escreval("Dados inválidos")
  senao
    escreval("Kits completos: ", kits)
    para i de 1 ate 3 faca
      escreval("Sobra do item ", i, ": ", estoque[i] - kits * necessidade[i])
    fimpara
  fimse''',
    'Um kit usa quantidades positivas de três itens. O máximo de kits completos é limitado pelo item com menor estoque dividido por necessidade.',
    'Estoques 10, 8, 7; necessidade 2, 2, 1 → 4 kits',
    'Necessidade zero é inválida para esta receita de kit.',
    'O mínimo dos três quocientes inteiros determina quantos kits podem ser montados.',
    ['Divida estoque pela necessidade de cada item.', 'Escolha o menor quociente.', 'Calcule as sobras após montar os kits.'])

add(10, '''  altura, linha, espacos, chamas: inteiro
  texto: caractere''', '''  escreva("Altura da fogueira (1 a 10): ")
  leia(altura)
  se (altura < 1) ou (altura > 10) entao
    escreval("Altura inválida")
  senao
    para linha de 1 ate altura faca
      texto <- ""
      para espacos de 1 ate altura - linha faca
        texto <- texto + " "
      fimpara
      para chamas de 1 ate 2 * linha - 1 faca
        texto <- texto + "*"
      fimpara
      escreval(texto)
    fimpara
    escreval("Fogueira com ", altura, " linha(s)")
  fimse''',
    'Desenhe triângulo de chamas com altura de 1 a 10. A linha n tem 2n−1 asteriscos e espaços à esquerda para centralizar.',
    'Altura 3:\n  *\n ***\n*****',
    'Altura fora de 1–10 é recusada para manter o desenho legível.',
    'A quantidade ímpar de asteriscos e os espaços decrescentes formam a simetria.',
    ['Calcule espaços como altura menos linha.', 'Calcule chamas como 2×linha−1.', 'Monte e imprima cada linha.'])

add(11, '''  numero, marcado: vetor[1..5, 1..5] de inteiro
  linha, coluna, sorteio, rodada, acertos: inteiro''', '''  para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      escreva("Número da cartela ", linha, ",", coluna, ": ")
      leia(numero[linha, coluna])
      marcado[linha, coluna] <- 0
    fimpara
  fimpara
  acertos <- 0
  para rodada de 1 ate 10 faca
    escreva("Número sorteado ", rodada, ": ")
    leia(sorteio)
    para linha de 1 ate 5 faca
      para coluna de 1 ate 5 faca
        se (numero[linha, coluna] = sorteio) e (marcado[linha, coluna] = 0) entao
          marcado[linha, coluna] <- 1
          acertos <- acertos + 1
          escreval("Marcado em (", linha, ",", coluna, ")")
        fimse
      fimpara
    fimpara
  fimpara
  escreval("Casas marcadas: ", acertos)''',
    'Cadastre uma cartela 5×5 com números únicos. Leia dez sorteios e marque cada casa no máximo uma vez, mesmo se o número sair repetido.',
    'Cartela contém 7 uma vez; sorteios 7 e 7 → uma casa marcada',
    'Número ausente não aumenta os acertos.',
    'A segunda matriz registra o estado de cada casa e evita contagem duplicada.',
    ['Use uma matriz para números.', 'Use outra para marcas.', 'Conte somente a passagem de 0 para 1.'])

add(12, '''  marcado: vetor[1..5, 1..5] de inteiro
  linha, coluna, completas, somaLinha, somaColuna, diagonal1, diagonal2: inteiro''', '''  para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      escreva("Casa ", linha, ",", coluna, " marcada? (0/1): ")
      leia(marcado[linha, coluna])
    fimpara
  fimpara
  completas <- 0
  diagonal1 <- 0
  diagonal2 <- 0
  para linha de 1 ate 5 faca
    somaLinha <- 0
    somaColuna <- 0
    para coluna de 1 ate 5 faca
      somaLinha <- somaLinha + marcado[linha, coluna]
      somaColuna <- somaColuna + marcado[coluna, linha]
    fimpara
    se somaLinha = 5 entao
      escreval("Linha ", linha, " completa")
      completas <- completas + 1
    fimse
    se somaColuna = 5 entao
      escreval("Coluna ", linha, " completa")
      completas <- completas + 1
    fimse
    diagonal1 <- diagonal1 + marcado[linha, linha]
    diagonal2 <- diagonal2 + marcado[linha, 6 - linha]
  fimpara
  se diagonal1 = 5 entao
    escreval("Diagonal principal completa")
    completas <- completas + 1
  fimse
  se diagonal2 = 5 entao
    escreval("Diagonal secundária completa")
    completas <- completas + 1
  fimse
  escreval("Trajetos completos: ", completas)''',
    'Leia uma matriz 5×5 de zeros e uns. Um trajeto completo contém cinco marcas; verifique cinco linhas, cinco colunas e duas diagonais.',
    'Primeira linha com cinco valores 1 → linha 1 completa',
    'A entrada deve conter somente 0 e 1; outros números são fora do modelo.',
    'As somas de linhas, colunas e diagonais detectam todos os trajetos possíveis.',
    ['Some cada linha.', 'Some cada coluna.', 'Confira as duas diagonais.'])

add(13, '''  jogador: vetor[1..20] de inteiro
  n, passoContagem, restantes, indice, i, eliminados: inteiro''', '''  escreva("Jogadores (1 a 20): ")
  leia(n)
  escreva("Passos por eliminação: ")
  leia(passoContagem)
  se (n < 1) ou (n > 20) ou (passoContagem < 1) entao
    escreval("Dados inválidos")
  senao
    para i de 1 ate n faca
      jogador[i] <- i
    fimpara
    restantes <- n
    indice <- 1
    enquanto restantes > 1 faca
      indice <- (indice + passoContagem - 2) mod restantes + 1
      escreval("Eliminado: jogador ", jogador[indice])
      para i de indice ate restantes - 1 faca
        jogador[i] <- jogador[i + 1]
      fimpara
      restantes <- restantes - 1
      se indice > restantes entao
        indice <- 1
      fimse
    fimenquanto
    escreval("Vencedor: jogador ", jogador[1])
  fimse''',
    'Jogadores numerados de 1 a N formam um círculo. Conte K pessoas a partir da posição atual, elimine a Kª e continue da próxima.',
    '3 jogadores, contagem 2 → elimina 2, depois 1; vence 3',
    'Com um jogador, ele vence sem eliminações.',
    'O índice modular localiza a próxima eliminação no vetor compacto dos sobreviventes.',
    ['Guarde os jogadores restantes.', 'Use mod para circular.', 'Remova o eliminado deslocando o vetor.'])

add(14, '''  nome: vetor[1..5] de caractere
  comeco, termino: vetor[1..5] de inteiro
  i, j, troca: inteiro
  nomeTroca: caractere''', '''  para i de 1 ate 5 faca
    escreva("Atração ", i, ": ")
    leia(nome[i])
    escreva("Início em minutos: ")
    leia(comeco[i])
    escreva("Fim em minutos: ")
    leia(termino[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se comeco[j] < comeco[i] entao
        troca <- comeco[i]
        comeco[i] <- comeco[j]
        comeco[j] <- troca
        troca <- termino[i]
        termino[i] <- termino[j]
        termino[j] <- troca
        nomeTroca <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- nomeTroca
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(nome[i], ": ", comeco[i], "–", termino[i], " min")
    se termino[i] < comeco[i] entao
      escreval("Intervalo inválido")
    fimse
    se i > 1 entao
      para j de 1 ate i - 1 faca
        se (comeco[i] < termino[j]) e (termino[i] > comeco[j]) entao
          escreval("Conflito com ", nome[j])
        fimse
      fimpara
    fimse
  fimpara''',
    'Cadastre cinco atrações com início e fim em minutos do mesmo dia. Ordene pelo início e sinalize qualquer sobreposição entre pares de intervalos válidos.',
    'A 60–90 e B 80–100 → conflito; B 90–100 → sem conflito',
    'Intervalo com fim anterior ao início é inválido e deve ser corrigido antes de usar o relatório.',
    'A ordenação move nome e horários juntos; a checagem compara cada atração com as anteriores.',
    ['Ordene por início.', 'Mantenha os campos ligados ao nome.', 'Sobreposição exige início de um antes do fim do outro.'])

add(15, '''  nome: vetor[1..6] de caractere
  total: vetor[1..6] de real
  i, receita, ingrediente, encontrado: inteiro
  quantidade, fator: real
  busca: caractere''', '''  para i de 1 ate 6 faca
    nome[i] <- ""
    total[i] <- 0
  fimpara
  para receita de 1 ate 3 faca
    escreva("Fator de porções da receita ", receita, ": ")
    leia(fator)
    para ingrediente de 1 ate 2 faca
      escreva("Ingrediente (sem espaços): ")
      leia(busca)
      escreva("Quantidade base: ")
      leia(quantidade)
      encontrado <- 0
      para i de 1 ate 6 faca
        se nome[i] = busca entao
          encontrado <- i
        fimse
      fimpara
      se encontrado = 0 entao
        para i de 6 ate 1 passo -1 faca
          se nome[i] = "" entao
            encontrado <- i
          fimse
        fimpara
      fimse
      se (encontrado > 0) e (fator >= 0) e (quantidade >= 0) entao
        nome[encontrado] <- busca
        total[encontrado] <- total[encontrado] + quantidade * fator
      senao
        escreval("Ingrediente inválido ou lista cheia")
      fimse
    fimpara
  fimpara
  para i de 1 ate 6 faca
    se nome[i] <> "" entao
      escreval(nome[i], ": ", total[i], " unidade(s)")
    fimse
  fimpara''',
    'Cadastre três receitas, cada uma com fator de porções e dois ingredientes. Consolide até seis ingredientes distintos, usando a mesma unidade de medida por nome.',
    'Receita A: milho 2 × fator 2; receita B: milho 3 × fator 1 → milho 7',
    'Se os seis ingredientes forem diferentes, todos cabem na lista; nomes iguais são somados.',
    'Cada quantidade ajustada é somada à posição correspondente ao mesmo ingrediente.',
    ['Multiplique quantidade pelo fator.', 'Procure o nome na lista consolidada.', 'Some na mesma posição.'])

add(16, '''  capacidade, previsto, lotes, preparado, restante, i: inteiro''', '''  escreva("Consumo previsto em copos: ")
  leia(previsto)
  escreva("Copos produzidos por lote: ")
  leia(capacidade)
  se (previsto < 0) ou (capacidade <= 0) entao
    escreval("Dados inválidos")
  senao
    lotes <- previsto div capacidade
    se previsto mod capacidade <> 0 entao
      lotes <- lotes + 1
    fimse
    preparado <- lotes * capacidade
    restante <- preparado
    escreval("Preparar ", lotes, " lote(s), total ", preparado, " copos")
    para i de 1 ate previsto faca
      restante <- restante - 1
    fimpara
    escreval("Distribuídos: ", previsto, "; sobra: ", restante)
  fimse''',
    'Produza lotes inteiros de tamanho fixo suficientes para o consumo previsto. Simule a entrega de um copo por pessoa e mostre a sobra.',
    'Previsão 11 copos, lote 5 → três lotes, 15 copos preparados, sobra 4',
    'Previsão zero produz zero lotes.',
    'O teto da divisão determina os lotes; a simulação reduz o estoque a cada copo distribuído.',
    ['Arredonde lotes para cima.', 'Multiplique pela capacidade.', 'Subtraia um por consumidor.'])

add(17, '''  nome: vetor[1..4] de caractere
  pontos: vetor[1..4] de inteiro
  i, j, tentativa, troca: inteiro
  nomeTroca: caractere''', '''  para i de 1 ate 4 faca
    escreva("Participante ", i, ": ")
    leia(nome[i])
    pontos[i] <- 0
    para j de 1 ate 3 faca
      escreva("Acertou a tentativa ", j, "? (0/1): ")
      leia(tentativa)
      se tentativa = 1 entao
        pontos[i] <- pontos[i] + 10
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      se pontos[j] > pontos[i] entao
        troca <- pontos[i]
        pontos[i] <- pontos[j]
        pontos[j] <- troca
        nomeTroca <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- nomeTroca
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval(i, "º ", nome[i], ": ", pontos[i], " pontos")
  fimpara''',
    'Quatro participantes fazem três tentativas. Cada acerto vale dez pontos. Classifique por pontuação decrescente, com empate pela ordem original de cadastro.',
    'Ana acerta 2 e Beto acerta 1 → Ana 20 pontos, Beto 10',
    'Entrada diferente de 1 é tratada como não acerto.',
    'A ordenação estável preserva o desempate por ordem de cadastro porque só troca pontuações estritamente maiores.',
    ['Conte acertos.', 'Multiplique por dez.', 'Ordene nome e pontos juntos.'])

add(18, '''  i, acerto, sequencia, pontos: inteiro''', '''  pontos <- 0
  sequencia <- 0
  para i de 1 ate 8 faca
    escreva("Salto ", i, " correto? (0/1): ")
    leia(acerto)
    se acerto = 1 entao
      sequencia <- sequencia + 1
      pontos <- pontos + 10
      se sequencia >= 3 entao
        pontos <- pontos + 5
      fimse
    senao
      sequencia <- 0
    fimse
    escreval("Pontuação após o salto: ", pontos)
  fimpara
  escreval("Pontuação final: ", pontos)''',
    'Oito saltos: acerto vale 10 pontos. A partir do terceiro acerto consecutivo, cada novo acerto da sequência recebe bônus de 5.',
    'Acertos 1,1,1 → 10 + 10 + 15 = 35 pontos',
    'Erro zera a sequência, sem retirar pontos já ganhos.',
    'O contador consecutivo determina se o acerto atual recebe bônus.',
    ['Conte acertos seguidos.', 'Some dez por acerto.', 'Dê bônus a partir do terceiro consecutivo.'])

add(19, '''  estado: vetor[1..10] de inteiro
  i, acao, jogador, presos: inteiro''', '''  para i de 1 ate 10 faca
    estado[i] <- 0
  fimpara
  escreva("Ação (1 capturar, 2 libertar, 3 consultar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se (acao = 1) ou (acao = 2) entao
      escreva("Jogador (1 a 10): ")
      leia(jogador)
      se (jogador < 1) ou (jogador > 10) entao
        escreval("Jogador inválido")
      senao
        se (acao = 1) e (estado[jogador] = 0) entao
          estado[jogador] <- 1
          escreval("Capturado")
        senao
          se (acao = 2) e (estado[jogador] = 1) entao
            estado[jogador] <- 0
            escreval("Libertado")
          senao
            escreval("Operação sem mudança")
          fimse
        fimse
      fimse
    senao
      se acao = 3 entao
        presos <- 0
        para i de 1 ate 10 faca
          se estado[i] = 1 entao
            presos <- presos + 1
          fimse
        fimpara
        escreval("Presos: ", presos, "; livres: ", 10 - presos)
      fimse
    fimse
    escreva("Ação (1 capturar, 2 libertar, 3 consultar, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Dez jogadores começam livres. Capture somente quem está livre; liberte somente quem está preso. A consulta mostra quantos estão em cada estado.',
    'Capture jogador 2; consulte → 1 preso, 9 livres; liberte 2 → 0 presos',
    'Operação repetida sobre o mesmo estado não altera contagens.',
    'Um vetor de zeros e uns guarda o estado de cada jogador.',
    ['Inicialize todos livres.', 'Valide o número do jogador.', 'Mude estado só quando fizer sentido.'])

add(20, '''  vendido: vetor[1..100] de inteiro
  i, acao, numero, total: inteiro''', '''  para i de 1 ate 100 faca
    vendido[i] <- 0
  fimpara
  total <- 0
  escreva("Número de bilhete (1 a 100; 0 encerra): ")
  leia(numero)
  enquanto numero <> 0 faca
    se (numero < 1) ou (numero > 100) entao
      escreval("Número inválido")
    senao
      se vendido[numero] = 1 entao
        escreval("Bilhete já vendido")
      senao
        vendido[numero] <- 1
        total <- total + 1
        escreval("Venda registrada")
      fimse
    fimse
    escreva("Número de bilhete (1 a 100; 0 encerra): ")
    leia(numero)
  fimenquanto
  escreval("Bilhetes vendidos: ", total)
  escreval("Ainda disponíveis: ", 100 - total)''',
    'Bilhetes são numerados de 1 a 100. Cada venda informa um número; recuse números fora da faixa e duplicatas. Zero encerra.',
    'Entradas 5, 5, 0 → uma venda, uma duplicata, 99 disponíveis',
    'Bilhete 101 é inválido e não altera o lote.',
    'A posição do vetor corresponde ao número do bilhete e registra sua situação.',
    ['Use vetor de 100 estados.', 'Valide a faixa antes de acessar.', 'Conte somente novas vendas.'])

add(21, '''  nome: vetor[1..4] de caractere
  usado: vetor[1..4] de inteiro
  participante, sorteio, restante, i: inteiro''', '''  para i de 1 ate 4 faca
    escreva("Prenda ", i, ": ")
    leia(nome[i])
    usado[i] <- 0
  fimpara
  restante <- 4
  para participante de 1 ate 6 faca
    se restante = 0 entao
      para i de 1 ate 4 faca
        usado[i] <- 0
      fimpara
      restante <- 4
      escreval("Nova rodada de prendas")
    fimse
    escreva("Número da prenda para participante ", participante, " (1 a 4): ")
    leia(sorteio)
    se (sorteio < 1) ou (sorteio > 4) entao
      escreval("Número inválido")
    senao
      se usado[sorteio] = 1 entao
        escreval("Prenda já atribuída nesta rodada; tente outro número")
      senao
        usado[sorteio] <- 1
        restante <- restante - 1
        escreval("Participante ", participante, ": ", nome[sorteio])
      fimse
    fimse
  fimpara''',
    'Cadastre quatro prendas. Em seis solicitações, um número válido só pode ser atribuído uma vez por rodada; quando as quatro forem usadas, reinicie a lista.',
    'Prendas 1,2,3,4 são atribuídas; a próxima solicitação inicia nova rodada',
    'Solicitação repetida consome a vez do participante sem atribuição; ele pode tentar novamente fora desta simulação fixa.',
    'Um vetor registra prendas já usadas; ao esgotar as quatro, ele é zerado.',
    ['Marque cada prenda entregue.', 'Recuse repetição na rodada.', 'Reinicie após usar todas.'])

add(22, '''  larguraTecido, alturaTecido, larguraRecorte, alturaRecorte: real
  horizontal, vertical, total: inteiro''', '''  escreva("Largura e altura do tecido: ")
  leia(larguraTecido, alturaTecido)
  escreva("Largura e altura do recorte retangular: ")
  leia(larguraRecorte, alturaRecorte)
  se (larguraTecido < 0) ou (alturaTecido < 0) ou (larguraRecorte <= 0) ou (alturaRecorte <= 0) entao
    escreval("Medidas inválidas")
  senao
    horizontal <- int(larguraTecido / larguraRecorte)
    vertical <- int(alturaTecido / alturaRecorte)
    total <- horizontal * vertical
    escreval("Recortes sem rotação: ", total)
    escreval("Sobras: ", larguraTecido - horizontal * larguraRecorte, " de largura; ", alturaTecido - vertical * alturaRecorte, " de altura")
  fimse''',
    'Cada bandeira triangular será cortada de um retângulo próprio. Calcule quantos retângulos cabem em uma peça de tecido, sem rotação e sem reaproveitar sobras.',
    'Tecido 10×6, recorte 3×2 → 3 colunas × 3 linhas = 9 recortes',
    'Recorte maior que o tecido em qualquer dimensão resulta em zero bandeiras.',
    'A divisão inteira em largura e altura determina a grade de recortes.',
    ['Divida largura por largura.', 'Divida altura por altura.', 'Multiplique as quantidades inteiras.'])

add(23, '''  i, produtos: inteiro
  custo, perdasPct, margemPct, custoAjustado, preco: real''', '''  escreva("Quantidade de produtos: ")
  leia(produtos)
  se produtos <= 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate produtos faca
      escreva("Custo unitário do produto ", i, ": ")
      leia(custo)
      escreva("Perda estimada em %: ")
      leia(perdasPct)
      escreva("Margem desejada em % do custo ajustado: ")
      leia(margemPct)
      se (custo < 0) ou (perdasPct < 0) ou (perdasPct >= 100) ou (margemPct < 0) entao
        escreval("Parâmetros inválidos")
      senao
        custoAjustado <- custo / (1 - perdasPct / 100)
        preco <- custoAjustado * (1 + margemPct / 100)
        escreval("Preço sugerido: R$ ", preco)
      fimse
    fimpara
  fimse''',
    'Para cada produto, informe custo, perda percentual estimada e margem percentual sobre o custo ajustado. A perda aumenta o custo por unidade vendável.',
    'Custo R$ 9, perda 10%, margem 20% → custo ajustado R$ 10, preço R$ 12',
    'Perda de 100% impossibilita venda e é recusada.',
    'Dividir pelo percentual aproveitável cobre perdas; a margem é aplicada em seguida.',
    ['Calcule a fração vendável.', 'Divida custo por ela.', 'Aplique a margem ao custo ajustado.'])

add(24, '''  publico: vetor[1..3] de inteiro
  consumo: vetor[1..3] de real
  i, reservaPct, pratos, total: inteiro
  estimativa: real''', '''  total <- 0
  escreva("Reserva de segurança em %: ")
  leia(reservaPct)
  se reservaPct < 0 entao
    escreval("Reserva inválida")
  senao
    para i de 1 ate 3 faca
      escreva("Público da faixa ", i, ": ")
      leia(publico[i])
      escreva("Pratos estimados por pessoa: ")
      leia(consumo[i])
      se (publico[i] >= 0) e (consumo[i] >= 0) entao
        estimativa <- publico[i] * consumo[i] * (1 + reservaPct / 100)
        pratos <- int(estimativa)
        se pratos < estimativa entao
          pratos <- pratos + 1
        fimse
        total <- total + pratos
        escreval("Faixa ", i, ": ", pratos, " pratos")
      fimse
    fimpara
    escreval("Total com reserva: ", total)
  fimse''',
    'Três faixas de público têm consumo médio próprio. Aplique a mesma reserva percentual a cada faixa e arredonde pratos para cima.',
    '10 pessoas × 1,5 prato com 20% de reserva → 18 pratos',
    'Faixa de público zero exige zero pratos.',
    'O arredondamento em cada faixa assegura cobertura mesmo com previsão fracionária.',
    ['Multiplique público por consumo médio.', 'Inclua a reserva.', 'Arredonde para cima antes de somar.'])

add(25, '''  pontos: vetor[1..4] de inteiro
  nome: vetor[1..4] de caractere
  i, rodada, valor, j, troca: inteiro
  nomeTroca: caractere''', '''  para i de 1 ate 4 faca
    escreva("Jogador ", i, ": ")
    leia(nome[i])
    pontos[i] <- 0
    para rodada de 1 ate 3 faca
      escreva("Pontos da rodada ", rodada, ": ")
      leia(valor)
      se valor >= 0 entao
        pontos[i] <- pontos[i] + valor
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      se pontos[j] > pontos[i] entao
        troca <- pontos[i]
        pontos[i] <- pontos[j]
        pontos[j] <- troca
        nomeTroca <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- nomeTroca
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval(i, "º ", nome[i], ": ", pontos[i], " pontos")
  fimpara''',
    'Quatro jogadores disputam três rodadas. Some pontos não negativos de cada rodada e ordene o ranking do maior para o menor.',
    'Ana faz 2+3+4=9; Beto faz 1+2+3=6 → Ana à frente',
    'Pontuação negativa de uma rodada é ignorada. Empate preserva cadastro.',
    'O vetor de totais acumula rodadas; a ordenação move nome e total juntos.',
    ['Some pontos por jogador.', 'Ignore valores negativos.', 'Ordene os totais com seus nomes.'])

add(26, '''  temperatura: vetor[1..8] de real
  i, atual, maior, inicioAtual, inicioMaior: inteiro''', '''  atual <- 0
  maior <- 0
  para i de 1 ate 8 faca
    escreva("Temperatura da medição ", i, ": ")
    leia(temperatura[i])
    se i > 1 entao
      se temperatura[i] < temperatura[i - 1] entao
        se atual = 0 entao
          inicioAtual <- i - 1
          atual <- 2
        senao
          atual <- atual + 1
        fimse
        se atual > maior entao
          maior <- atual
          inicioMaior <- inicioAtual
        fimse
      senao
        atual <- 0
      fimse
    fimse
  fimpara
  se maior = 0 entao
    escreval("Nenhuma queda contínua")
  senao
    escreval("Maior queda contínua: medições ", inicioMaior, " a ", inicioMaior + maior - 1, " (", maior, " leituras)")
  fimse''',
    'Leia oito temperaturas. Encontre a maior sequência de medições em que cada valor seja estritamente menor que o anterior.',
    '20,18,16,17,15,14 → maior queda nas medições 1–3, com 3 leituras',
    'Valores iguais interrompem uma sequência de queda.',
    'O contador acompanha a sequência atual e preserva a maior, com seu início.',
    ['Compare leituras consecutivas.', 'Reinicie quando a temperatura não cair.', 'Guarde o melhor intervalo.'])

add(27, '''  turma: vetor[1..4] de caractere
  pedido, entregue: vetor[1..4] de inteiro
  i, lote, repasse, pendente: inteiro''', '''  escreva("Convites disponíveis para distribuição: ")
  leia(lote)
  se lote < 0 entao
    escreval("Lote inválido")
  senao
    para i de 1 ate 4 faca
      escreva("Turma ", i, ": ")
      leia(turma[i])
      escreva("Convites pedidos: ")
      leia(pedido[i])
      se pedido[i] < 0 entao
        pedido[i] <- 0
      fimse
      repasse <- pedido[i]
      se repasse > lote entao
        repasse <- lote
      fimse
      entregue[i] <- repasse
      lote <- lote - repasse
    fimpara
    pendente <- 0
    para i de 1 ate 4 faca
      escreval(turma[i], ": entregue ", entregue[i], "; pendente ", pedido[i] - entregue[i])
      pendente <- pendente + pedido[i] - entregue[i]
    fimpara
    escreval("Lote restante: ", lote, "; pendências totais: ", pendente)
  fimse''',
    'Distribua um lote de convites a quatro turmas na ordem de cadastro. Cada turma recebe até o que pediu ou o que restou.',
    'Lote 7; turmas pedem 5 e 4 → entregues 5 e 2; segunda fica com pendência 2',
    'Pedido negativo é tratado como zero.',
    'O lote diminui após cada entrega; relatório mostra diferenças entre pedido e recebido.',
    ['Guarde pedidos por turma.', 'Entregue o mínimo entre pedido e saldo.', 'Calcule pendência por diferença.'])

add(28, '''  nome: vetor[1..5] de caractere
  custo: vetor[1..5] de real
  prioridade: vetor[1..5] de inteiro
  i, j, trocaI: inteiro
  trocaR, teto, gasto: real
  trocaNome: caractere''', '''  escreva("Teto disponível: ")
  leia(teto)
  para i de 1 ate 5 faca
    escreva("Item ", i, ": ")
    leia(nome[i])
    escreva("Custo: ")
    leia(custo[i])
    escreva("Prioridade (1 mais alta): ")
    leia(prioridade[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se prioridade[j] < prioridade[i] entao
        trocaI <- prioridade[i]
        prioridade[i] <- prioridade[j]
        prioridade[j] <- trocaI
        trocaR <- custo[i]
        custo[i] <- custo[j]
        custo[j] <- trocaR
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  gasto <- 0
  para i de 1 ate 5 faca
    se (custo[i] >= 0) e (gasto + custo[i] <= teto) entao
      gasto <- gasto + custo[i]
      escreval("Aprovado: ", nome[i], "; gasto R$ ", gasto)
    senao
      escreval("Fora do orçamento: ", nome[i])
    fimse
  fimpara
  escreval("Saldo: R$ ", teto - gasto)''',
    'Cadastre cinco itens com custo e prioridade numérica. Considere primeiro a menor prioridade numérica e aprove itens que caibam no teto restante.',
    'Teto R$ 10; item prioritário custa R$ 7 e próximo R$ 5 → primeiro aprovado, segundo fora do orçamento',
    'Custo negativo é recusado. Empate na prioridade conserva ordem de cadastro.',
    'A ordenação define precedência; cada aprovação reduz o orçamento disponível.',
    ['Ordene custo, prioridade e nome juntos.', 'Mantenha gasto acumulado.', 'Aprove só se não exceder teto.'])

add(29, '''  parceiro: vetor[1..4] de inteiro
  rodada, i, j, anterior: inteiro''', '''  para i de 1 ate 4 faca
    parceiro[i] <- 0
  fimpara
  para rodada de 1 ate 3 faca
    escreval("Rodada ", rodada)
    para i de 1 ate 4 faca
      j <- ((i + rodada - 2) mod 4) + 5
      escreval("Pessoa ", i, " com pessoa ", j)
      parceiro[i] <- j
    fimpara
  fimpara''',
    'Forme quatro duplas entre pessoas 1–4 e 5–8 em três rodadas. A cada rodada, gire a associação do segundo grupo para evitar repetir parceria consecutiva.',
    'Pessoa 1 faz dupla com 5 na rodada 1, 6 na rodada 2 e 7 na rodada 3',
    'São necessários pelo menos dois grupos de quatro pessoas; a escala aqui é fixa para oito.',
    'A rotação modular produz uma permutação em cada rodada sem parceiro repetido para qualquer pessoa.',
    ['Separe os dois grupos.', 'Use deslocamento por rodada.', 'Faça a posição voltar ao início com mod.'])

add(30, '''  nome: vetor[1..3] de caractere
  receita, despesa: vetor[1..3] de real
  i: inteiro
  lucro, total: real''', '''  total <- 0
  para i de 1 ate 3 faca
    escreva("Barraca ", i, ": ")
    leia(nome[i])
    escreva("Receita: ")
    leia(receita[i])
    escreva("Despesa: ")
    leia(despesa[i])
    se (receita[i] >= 0) e (despesa[i] >= 0) entao
      lucro <- receita[i] - despesa[i]
      total <- total + lucro
      escreval(nome[i], ": resultado R$ ", lucro)
    senao
      escreval("Dados inválidos ignorados")
    fimse
  fimpara
  escreval("Resultado geral: R$ ", total)''',
    'Para três barracas, calcule receita menos despesa. Some os resultados para obter o balanço geral.',
    'Barraca A: receita R$ 100, despesa R$ 40 → lucro R$ 60',
    'Resultado negativo representa prejuízo e continua entrando na soma geral.',
    'O resultado de cada barraca é calculado separadamente e depois consolidado.',
    ['Subtraia despesa da receita.', 'Permita lucro negativo.', 'Some os três resultados.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Catalogued {len(entries)} challenge solutions')
