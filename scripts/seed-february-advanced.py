#!/usr/bin/env python3
"""Curated advanced February exercises."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "data/challenge-solutions.json"
entries = json.loads(CATALOG.read_text(encoding="utf-8"))
rows = {r["data_mm_dd"]: r for r in csv.DictReader((ROOT / "data/visualg_365_dias_730_desafios.csv").open(encoding="utf-8"))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f"02-{day:02d}"
    prompt = rows[date]["avancado_enunciado"]
    code = f'algoritmo "Desafio02{day:02d}A"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f"{date}/avancado"] = dict(
        code=code, objective=prompt[0].upper() + prompt[1:] + " O programa deve apresentar resultados que permitam conferir os registros feitos.",
        rules=rules, example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '''  pedidos: vetor[1..3, 1..3] de inteiro
  cor, tamanho, quantidade, i, j, total: inteiro''', '''  para i de 1 ate 3 faca
    para j de 1 ate 3 faca
      pedidos[i, j] <- 0
    fimpara
  fimpara
  escreva("Quantidade de pedidos: ")
  leia(total)
  para i de 1 ate total faca
    escreva("Cor (1 a 3): ")
    leia(cor)
    escreva("Tamanho (1 a 3): ")
    leia(tamanho)
    escreva("Unidades: ")
    leia(quantidade)
    se (cor >= 1) e (cor <= 3) e (tamanho >= 1) e (tamanho <= 3) e (quantidade > 0) entao
      pedidos[cor, tamanho] <- pedidos[cor, tamanho] + quantidade
    senao
      escreval("Pedido inválido.")
    fimse
  fimpara
  para i de 1 ate 3 faca
    para j de 1 ate 3 faca
      escreval("Cor ", i, ", tamanho ", j, ": ", pedidos[i, j])
    fimpara
  fimpara''',
    'Use três cores e três tamanhos identificados por números de 1 a 3. Cada pedido informa uma combinação e uma quantidade positiva. A célula da matriz acumula pedidos iguais.',
    'Pedidos: cor 1/tamanho 2/3 unidades; cor 1/tamanho 2/2 unidades\nTotal da combinação cor 1/tamanho 2: 5',
    'Uma combinação nunca pedida permanece com total zero.',
    'A posição `[cor, tamanho]` da matriz representa exatamente uma combinação e é incrementada a cada pedido válido.',
    ['Inicialize as nove células da matriz.', 'Valide cor e tamanho antes de usar como índices.', 'Some novas unidades à célula já existente.'])

add(2, '''  capacidade: vetor[1..3] de inteiro
  alocado: vetor[1..3] de inteiro
  i, quantidade, disponivel, sobra: inteiro''', '''  para i de 1 ate 3 faca
    escreva("Capacidade da equipe ", i, ": ")
    leia(capacidade[i])
    alocado[i] <- 0
  fimpara
  escreva("Quantidade a distribuir: ")
  leia(quantidade)
  sobra <- quantidade
  para i de 1 ate 3 faca
    disponivel <- capacidade[i]
    se disponivel > sobra entao
      disponivel <- sobra
    fimse
    se disponivel > 0 entao
      alocado[i] <- disponivel
      sobra <- sobra - disponivel
    fimse
    escreval("Equipe ", i, ": ", alocado[i])
  fimpara
  escreval("Sobra: ", sobra)''',
    'Informe a capacidade de três equipes e uma quantidade a distribuir. Preencha equipes na ordem 1, 2, 3 sem exceder suas capacidades; reporte o restante não alocado.',
    'Capacidades: 3, 5, 2; quantidade: 12\nEquipe 1: 3\nEquipe 2: 5\nEquipe 3: 2\nSobra: 2',
    'Se a quantidade for menor que a primeira capacidade, as outras equipes recebem zero.',
    'A cada equipe, o valor atribuído é o menor entre sua capacidade e a quantidade restante.',
    ['Mantenha uma variável para a quantidade ainda não distribuída.', 'Nunca atribua mais que a capacidade de uma equipe.', 'Exiba a sobra depois de examinar todas as equipes.'])

add(3, '''  presentes: vetor[1..2] de inteiro
  lotacao, total, faixa, acao: inteiro''', '''  escreva("Lotação máxima: ")
  leia(lotacao)
  presentes[1] <- 0
  presentes[2] <- 0
  total <- 0
  escreva("Ação (1 entrada, 2 saída, 0 encerrar): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Faixa etária (1 adulto, 2 criança): ")
    leia(faixa)
    se (faixa >= 1) e (faixa <= 2) entao
      se acao = 1 entao
        se total < lotacao entao
          presentes[faixa] <- presentes[faixa] + 1
          total <- total + 1
        senao
          escreval("Entrada recusada: lotação atingida.")
        fimse
      senao
        se (acao = 2) e (presentes[faixa] > 0) entao
          presentes[faixa] <- presentes[faixa] - 1
          total <- total - 1
        senao
          escreval("Saída inválida.")
        fimse
      fimse
    senao
      escreval("Faixa etária inválida.")
    fimse
    escreval("Adultos: ", presentes[1], "; crianças: ", presentes[2], "; total: ", total)
    escreva("Ação (1 entrada, 2 saída, 0 encerrar): ")
    leia(acao)
  fimenquanto''',
    'Leia a lotação máxima. Cada evento representa uma pessoa adulta ou criança entrando ou saindo. Recuse entrada se o total atingir a lotação e recuse saída se não houver pessoa naquela faixa.',
    'Lotação: 2\nEntrada adulto → total 1\nEntrada criança → total 2\nEntrada adulto → recusada, total 2',
    'Uma saída válida libera uma vaga para uma entrada posterior.',
    'Os contadores por faixa somam o total presente; toda atualização preserva o intervalo de zero à lotação.',
    ['Use um contador por faixa etária.', 'Confira a lotação antes de registrar entrada.', 'Confira presença na faixa antes de registrar saída.'])

add(4, '''  nome: vetor[1..3] de caractere
  receita, precoProduto: vetor[1..3] de real
  preco, desconto, subtotal, temp: real
  quantidade, i, j, categoria, pedidos: inteiro
  tempNome: caractere''', '''  para i de 1 ate 3 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    escreva("Preço unitário: ")
    leia(preco)
    precoProduto[i] <- preco
    receita[i] <- 0
  fimpara
  escreva("Quantidade de vendas: ")
  leia(pedidos)
  para i de 1 ate pedidos faca
    escreva("Categoria/produto (1 a 3): ")
    leia(categoria)
    escreva("Quantidade: ")
    leia(quantidade)
    escreva("Desconto (%): ")
    leia(desconto)
    se (categoria >= 1) e (categoria <= 3) e (quantidade > 0) e (desconto >= 0) e (desconto <= 100) entao
      subtotal <- precoProduto[categoria] * quantidade * (100 - desconto) / 100
      receita[categoria] <- receita[categoria] + subtotal
      escreval("Venda: ", subtotal)
    senao
      escreval("Venda inválida.")
    fimse
  fimpara
  para i de 1 ate 2 faca
    para j de i + 1 ate 3 faca
      se receita[j] > receita[i] entao
        temp <- receita[i]
        receita[i] <- receita[j]
        receita[j] <- temp
        tempNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- tempNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    escreval(i, "º: ", nome[i], " — receita ", receita[i])
  fimpara''',
    'Cadastre três produtos com preço. Leia vendas informando produto, quantidade e percentual de desconto; acumule receita por produto e apresente ranking decrescente.',
    'Produto A: R$ 10; venda de 2 unidades com desconto de 20%\nVenda: R$ 16\nRanking: A — receita 16; produtos sem venda — receita 0',
    'Desconto de 100% torna a venda gratuita. Quantidade zero é inválida.',
    'O subtotal multiplica preço por quantidade e aplica o desconto; a receita acumulada define o ranking.',
    ['Associe cada produto a um código.', 'Acumule os subtotais por produto.', 'Ordene receita e nome juntos.'])

add(5, '''  batida: vetor[1..8] de caractere
  duracao: vetor[1..8] de inteiro
  passos, compassos, i, j: inteiro''', '''  escreva("Quantidade de batidas no padrão (1 a 8): ")
  leia(passos)
  se (passos >= 1) e (passos <= 8) entao
    para i de 1 ate passos faca
      escreva("Batida ", i, ": ")
      leia(batida[i])
      escreva("Duração: ")
      leia(duracao[i])
    fimpara
    escreva("Compassos a repetir: ")
    leia(compassos)
    para i de 1 ate compassos faca
      escreval("Compasso ", i)
      para j de 1 ate passos faca
        escreval(batida[j], " por ", duracao[j], " tempo(s)")
      fimpara
    fimpara
  senao
    escreval("Tamanho de padrão inválido.")
  fimse''',
    'Cadastre de uma a oito batidas com durações inteiras e repita o mesmo padrão pelo número de compassos informado.',
    'Padrão: bum por 1 tempo, tá por 2 tempos; compassos: 2\nCompasso 1: bum(1), tá(2)\nCompasso 2: bum(1), tá(2)',
    'Com zero compassos, o padrão é armazenado mas nenhuma batida é impressa.',
    'Os vetores guardam som e duração em posições correspondentes; o laço externo repete o padrão completo.',
    ['Guarde cada batida junto de sua duração.', 'Use um laço para os compassos.', 'Dentro dele, percorra todas as batidas do padrão.'])

add(6, '''  nome: vetor[1..3] de caractere
  media: vetor[1..3] de real
  nota, soma, menor, maior, temp: real
  i, j, avaliador: inteiro
  tempNome: caractere''', '''  para i de 1 ate 3 faca
    escreva("Fantasia ", i, ": ")
    leia(nome[i])
    soma <- 0
    para avaliador de 1 ate 5 faca
      escreva("Nota do jurado ", avaliador, ": ")
      leia(nota)
      soma <- soma + nota
      se (avaliador = 1) ou (nota < menor) entao
        menor <- nota
      fimse
      se (avaliador = 1) ou (nota > maior) entao
        maior <- nota
      fimse
    fimpara
    media[i] <- (soma - menor - maior) / 3
  fimpara
  para i de 1 ate 2 faca
    para j de i + 1 ate 3 faca
      se media[j] > media[i] entao
        temp <- media[i]
        media[i] <- media[j]
        media[j] <- temp
        tempNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- tempNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    escreval(i, "º: ", nome[i], " — média ", media[i])
  fimpara''',
    'Para cada uma de três fantasias, leia cinco notas. Descarte exatamente uma maior e uma menor nota; calcule a média das três restantes e classifique as fantasias da maior média para a menor.',
    'Fantasia A: 1, 8, 8, 8, 10 → média 8\nFantasia B: 1, 9, 9, 9, 10 → média 9\nFantasia C: 1, 7, 7, 7, 10 → média 7\nRanking: B, A, C',
    'Extremos empatados ainda são descartados uma única vez cada.',
    'Subtrair maior e menor da soma de cinco notas deixa três avaliações; o ranking troca nomes junto com médias.',
    ['Some as cinco notas enquanto procura extremos.', 'Divida a soma restante por três.', 'Na ordenação, mantenha o nome ligado à média.'])

add(7, '''  codigos: vetor[1..20] de inteiro
  quantidade, codigo, tentativas, i, j: inteiro
  repetido: logico''', '''  quantidade <- 0
  escreva("Número de tentativas de entrada: ")
  leia(tentativas)
  para i de 1 ate tentativas faca
    escreva("Código da pulseira: ")
    leia(codigo)
    repetido <- falso
    se codigo <= 0 entao
      repetido <- verdadeiro
    fimse
    para j de 1 ate quantidade faca
      se codigos[j] = codigo entao
        repetido <- verdadeiro
      fimse
    fimpara
    se repetido entao
      escreval("Entrada rejeitada.")
    senao
      se quantidade < 20 entao
        quantidade <- quantidade + 1
        codigos[quantidade] <- codigo
        escreval("Entrada aceita.")
      senao
        escreval("Cadastro cheio.")
      fimse
    fimse
  fimpara''',
    'Leia códigos numéricos positivos de ingresso e aceite cada código apenas na primeira utilização. O cadastro comporta vinte códigos distintos.',
    'Entradas: código 123, código 456, código 123\nAceita, aceita, rejeitada',
    'Código zero ou negativo é inválido; código já utilizado não dá nova entrada.',
    'O vetor guarda códigos já aceitos; cada nova entrada deve ser comparada a todos os registros anteriores.',
    ['Use uma variável diferente do código para percorrer os registros.', 'Procure o novo código no vetor antes de gravá-lo.', 'Grave somente depois de verificar que não é repetido.'])

add(8, '''  estoque: vetor[1..4] de inteiro
  bebida, quantidade, acao, i: inteiro''', '''  para i de 1 ate 4 faca
    escreva("Estoque inicial da bebida ", i, ": ")
    leia(estoque[i])
  fimpara
  escreva("Ação (1 pedido, 2 reposição, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Bebida (1 a 4): ")
    leia(bebida)
    escreva("Quantidade: ")
    leia(quantidade)
    se (bebida >= 1) e (bebida <= 4) e (quantidade > 0) entao
      se acao = 1 entao
        se quantidade <= estoque[bebida] entao
          estoque[bebida] <- estoque[bebida] - quantidade
          escreval("Pedido atendido.")
        senao
          escreval("Estoque insuficiente.")
        fimse
      senao
        se acao = 2 entao
          estoque[bebida] <- estoque[bebida] + quantidade
          escreval("Reposição registrada.")
        fimse
      fimse
    senao
      escreval("Operação inválida.")
    fimse
    escreva("Ação (1 pedido, 2 reposição, 0 sair): ")
    leia(acao)
  fimenquanto
  para i de 1 ate 4 faca
    escreval("Bebida ", i, ": ", estoque[i])
  fimpara''',
    'Cadastre o estoque de quatro bebidas. Ação 1 retira unidades se houver saldo suficiente; ação 2 repõe unidades; ação 0 encerra. Bebida e quantidade devem ser válidas.',
    'Estoque da bebida 1: 3\nPedido de 2 → atendido, estoque 1\nPedido de 2 → insuficiente, estoque 1\nReposição de 4 → estoque 5',
    'Um pedido recusado não altera o estoque.',
    'Toda subtração é precedida de uma comparação com o saldo, impedindo estoque negativo.',
    ['Use um vetor de quatro posições.', 'Verifique saldo antes de atender pedidos.', 'Na reposição, some a quantidade positiva ao saldo atual.'])

add(9, '''  fila: vetor[1..20] de caractere
  primeiro, ultimo, acao: inteiro
  nome: caractere''', '''  primeiro <- 1
  ultimo <- 0
  escreva("Ação (1 entrar, 2 chamar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se acao = 1 entao
      se ultimo < 20 entao
        escreva("Nome: ")
        leia(nome)
        ultimo <- ultimo + 1
        fila[ultimo] <- nome
      senao
        escreval("Fila cheia.")
      fimse
    senao
      se acao = 2 entao
        se primeiro <= ultimo entao
          escreval("Chamado: ", fila[primeiro])
          primeiro <- primeiro + 1
        senao
          escreval("Fila vazia.")
        fimse
      fimse
    fimse
    escreval("Aguardando: ", ultimo - primeiro + 1)
    escreva("Ação (1 entrar, 2 chamar, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Use uma fila de até vinte entradas. Ação 1 acrescenta uma pessoa ao fim; ação 2 chama a mais antiga ainda aguardando. Ação 0 encerra o atendimento.',
    'Entradas Ana, Bia; chamada → Ana; chamada → Bia; nova chamada → fila vazia',
    'Chamar uma fila vazia não altera os índices. Depois de vinte entradas totais, esta implementação exige reiniciar para cadastrar novas pessoas.',
    'Os índices `primeiro` e `ultimo` mantêm ordem de chegada sem deslocar os nomes no vetor.',
    ['Use um índice para a primeira pessoa ainda na fila.', 'Use outro para a última posição ocupada.', 'Ao chamar, avance apenas o índice da frente.'])

add(10, '''  convidados: vetor[1..20] de caractere
  quantidade, i, j, acao: inteiro
  nome, prefixo: caractere
  duplicado: logico''', '''  quantidade <- 0
  escreva("Ação (1 cadastrar, 2 buscar prefixo, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se acao = 1 entao
      escreva("Nome: ")
      leia(nome)
      duplicado <- falso
      para i de 1 ate quantidade faca
        se convidados[i] = nome entao
          duplicado <- verdadeiro
        fimse
      fimpara
      se duplicado entao
        escreval("Nome já cadastrado.")
      senao
        se quantidade < 20 entao
          quantidade <- quantidade + 1
          convidados[quantidade] <- nome
        senao
          escreval("Lista cheia.")
        fimse
      fimse
    senao
      se acao = 2 entao
        escreva("Prefixo: ")
        leia(prefixo)
        para i de 1 ate quantidade faca
          se copia(convidados[i], 1, compr(prefixo)) = prefixo entao
            escreval(convidados[i])
          fimse
        fimpara
      fimse
    fimse
    escreva("Ação (1 cadastrar, 2 buscar prefixo, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Cadastre até vinte nomes distintos. Na busca, leia um prefixo e mostre todos os nomes cadastrados que começam exatamente por ele.',
    'Cadastre Ana e Anabela; tentar Ana outra vez → duplicata\nBusca por An → Ana, Anabela',
    'A comparação é sensível a maiúsculas e minúsculas. Um prefixo sem correspondências não mostra nomes.',
    '`copia` extrai do começo de cada nome tantos caracteres quantos existirem no prefixo.',
    ['Compare um novo nome com todos os já cadastrados.', 'Não incremente o total em caso de duplicata.', 'Na busca, compare o início de cada nome com o prefixo.'])

add(11, '''  bloco: vetor[1..5] de caractere
  inicioMin, duracao: vetor[1..5] de inteiro
  i, j, tempInteiro: inteiro
  tempNome: caractere''', '''  para i de 1 ate 5 faca
    escreva("Bloco ", i, ": ")
    leia(bloco[i])
    escreva("Início em minutos: ")
    leia(inicioMin[i])
    escreva("Duração em minutos: ")
    leia(duracao[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se inicioMin[j] < inicioMin[i] entao
        tempInteiro <- inicioMin[i]
        inicioMin[i] <- inicioMin[j]
        inicioMin[j] <- tempInteiro
        tempInteiro <- duracao[i]
        duracao[i] <- duracao[j]
        duracao[j] <- tempInteiro
        tempNome <- bloco[i]
        bloco[i] <- bloco[j]
        bloco[j] <- tempNome
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(bloco[i], ": ", inicioMin[i], " a ", inicioMin[i] + duracao[i])
    se i > 1 entao
      se inicioMin[i] < inicioMin[i - 1] + duracao[i - 1] entao
        escreval("Conflito com ", bloco[i - 1])
      fimse
    fimse
  fimpara''',
    'Leia nome, início e duração de cinco blocos. Ordene por horário inicial e mostre avisos quando um bloco começar antes do término do anterior.',
    'Bloco A: 600–660; Bloco B: 640–700; demais após 700\nConflito entre A e B',
    'Blocos adjacentes, como 600–660 e 660–700, não conflitam.',
    'A ordenação põe os inícios em ordem. Após isso, o término do bloco anterior é suficiente para detectar um conflito imediato.',
    ['Mova nome, início e duração juntos na ordenação.', 'Compare o início atual com o fim anterior.', 'Use comparação estrita para permitir horários adjacentes.'])

add(12, '''  canal: vetor[1..3, 1..8] de inteiro
  tamanho, repeticoes, c, etapa, volta: inteiro''', '''  escreva("Passos por padrão (1 a 8): ")
  leia(tamanho)
  se (tamanho >= 1) e (tamanho <= 8) entao
    para c de 1 ate 3 faca
      para etapa de 1 ate tamanho faca
        escreva("Canal ", c, ", passo ", etapa, " (0/1): ")
        leia(canal[c, etapa])
      fimpara
    fimpara
    escreva("Repetições: ")
    leia(repeticoes)
    para volta de 1 ate repeticoes faca
      para etapa de 1 ate tamanho faca
        escreval("Passo ", etapa, ": ", canal[1, etapa], ", ", canal[2, etapa], ", ", canal[3, etapa])
      fimpara
    fimpara
  senao
    escreval("Tamanho inválido.")
  fimse''',
    'Cadastre um padrão binário para cada um de três canais de luz. Leia o número de passos do padrão e de repetições; mostre o estado simultâneo dos três canais em cada passo.',
    'Padrões: canal 1 [1,0]; canal 2 [0,1]; canal 3 [1,1]\nPasso 1: 1, 0, 1\nPasso 2: 0, 1, 1',
    'Com zero repetições, nenhuma saída de luz é mostrada.',
    'Cada linha da matriz pertence a um canal e cada coluna a um instante do padrão.',
    ['Use uma matriz para canais e passos.', 'Leia o padrão uma vez.', 'Repita a impressão do padrão no laço externo.'])

add(13, '''  fantasia: vetor[1..5] de caractere
  media: vetor[1..5] de real
  peso1, peso2, peso3, nota1, nota2, nota3, temp: real
  tempNome: caractere
  i, j: inteiro''', '''  escreva("Peso do critério 1: ")
  leia(peso1)
  escreva("Peso do critério 2: ")
  leia(peso2)
  escreva("Peso do critério 3: ")
  leia(peso3)
  se peso1 + peso2 + peso3 > 0 entao
    para i de 1 ate 5 faca
      escreva("Fantasia ", i, ": ")
      leia(fantasia[i])
      escreva("Nota 1: ")
      leia(nota1)
      escreva("Nota 2: ")
      leia(nota2)
      escreva("Nota 3: ")
      leia(nota3)
      media[i] <- (nota1 * peso1 + nota2 * peso2 + nota3 * peso3) / (peso1 + peso2 + peso3)
    fimpara
    para i de 1 ate 4 faca
      para j de i + 1 ate 5 faca
        se media[j] > media[i] entao
          temp <- media[i]
          media[i] <- media[j]
          media[j] <- temp
          tempNome <- fantasia[i]
          fantasia[i] <- fantasia[j]
          fantasia[j] <- tempNome
        fimse
      fimpara
    fimpara
    para i de 1 ate 5 faca
      escreval(i, "º: ", fantasia[i], " — ", media[i])
    fimpara
  senao
    escreval("A soma dos pesos deve ser positiva.")
  fimse''',
    'Leia três pesos e as três notas de cada uma de cinco fantasias. Calcule a média ponderada e ordene as fantasias por pontuação decrescente.',
    'Pesos: 2, 1, 1\nFantasia A: notas 8, 10, 10 → média 9\nFantasia B: notas 10, 10, 10 → média 10\nB aparece antes de A no ranking',
    'Com soma dos pesos igual a zero não há média válida. Empates mantêm a ordem inicial.',
    'A soma ponderada é dividida pela soma dos pesos; nome e média são trocados juntos na ordenação.',
    ['Valide a soma dos pesos.', 'Calcule a média de cada fantasia antes de ordenar.', 'Ordene média e nome juntos.'])

add(14, '''  cores: vetor[1..12] de caractere
  tamanho, ciclo, i: inteiro
  valido: logico''', '''  escreva("Quantidade de cores (1 a 12): ")
  leia(tamanho)
  se (tamanho >= 1) e (tamanho <= 12) entao
    para i de 1 ate tamanho faca
      escreva("Cor ", i, ": ")
      leia(cores[i])
    fimpara
    ciclo <- 1
    valido <- falso
    enquanto (ciclo <= tamanho) e (nao valido) faca
      valido <- verdadeiro
      para i de ciclo + 1 ate tamanho faca
        se cores[i] <> cores[((i - 1) mod ciclo) + 1] entao
          valido <- falso
        fimse
      fimpara
      se nao valido entao
        ciclo <- ciclo + 1
      fimse
    fimenquanto
    escreval("Menor ciclo: ", ciclo)
  senao
    escreval("Quantidade inválida.")
  fimse''',
    'Leia de uma a doze cores e encontre o menor padrão inicial que, repetido, reproduz toda a sequência. A última repetição pode ser parcial.',
    'Sequência: azul, amarelo, azul, amarelo, azul\nMenor ciclo: 2',
    'Uma sequência sem repetição tem ciclo igual ao seu próprio tamanho.',
    'Para cada tamanho candidato, compare cada posição com a posição correspondente dentro do prefixo repetido.',
    ['Experimente comprimentos de ciclo a partir de um.', 'Use o resto da divisão para localizar a posição equivalente no prefixo.', 'Pare no primeiro comprimento que reproduz todas as cores.'])

add(15, '''  movimentos: vetor[1..8] de caractere
  i, inicioTrecho, fimTrecho, vezes, sentido, rodada, j: inteiro''', '''  para i de 1 ate 8 faca
    escreva("Movimento ", i, ": ")
    leia(movimentos[i])
  fimpara
  escreva("Início do trecho (1 a 8): ")
  leia(inicioTrecho)
  escreva("Fim do trecho (1 a 8): ")
  leia(fimTrecho)
  escreva("Repetições: ")
  leia(vezes)
  escreva("Inverter ordem? (1 sim, 0 não): ")
  leia(sentido)
  se (inicioTrecho >= 1) e (fimTrecho <= 8) e (inicioTrecho <= fimTrecho) e (vezes >= 0) entao
    para rodada de 1 ate vezes faca
      escreval("Rodada ", rodada)
      se sentido = 1 entao
        para j de fimTrecho ate inicioTrecho passo -1 faca
          escreval(movimentos[j])
        fimpara
      senao
        para j de inicioTrecho ate fimTrecho faca
          escreval(movimentos[j])
        fimpara
      fimse
    fimpara
  senao
    escreval("Trecho inválido.")
  fimse''',
    'Cadastre oito movimentos de dança. Escolha um trecho contínuo, quantas vezes reproduzi-lo e se a ordem será invertida.',
    'Movimentos: A, B, C, D, E, F, G, H; trecho 2–4; repetir 2; inverter\nRodada 1: D, C, B\nRodada 2: D, C, B',
    'Com zero repetições, não há movimentos na saída. Índices fora de 1 a 8 são inválidos.',
    'O laço interno percorre o trecho no sentido pedido; o externo reproduz esse mesmo trecho em cada rodada.',
    ['Valide os extremos do trecho.', 'Use passo negativo para inverter.', 'Repita o laço do trecho no número pedido de rodadas.'])

add(16, '''  nome: vetor[1..4] de caractere
  consumo: vetor[1..4] de real
  comum, somaConsumo, individual, cota: real
  i: inteiro''', '''  somaConsumo <- 0
  para i de 1 ate 4 faca
    escreva("Participante ", i, ": ")
    leia(nome[i])
    escreva("Consumo individual: ")
    leia(consumo[i])
    somaConsumo <- somaConsumo + consumo[i]
  fimpara
  escreva("Despesa comum: ")
  leia(comum)
  cota <- comum / 4
  para i de 1 ate 4 faca
    individual <- consumo[i] + cota
    escreval(nome[i], " paga ", individual)
  fimpara
  escreval("Total do evento: ", somaConsumo + comum)''',
    'Cada uma de quatro pessoas paga o próprio consumo mais um quarto das despesas comuns.',
    'Ana consome 10; Bia 20; Caio 0; Davi 0; despesa comum 40\nPagamentos: 20, 30, 10, 10\nTotal do evento: 70',
    'Uma pessoa com consumo zero ainda paga sua parte da despesa comum.',
    'A cota comum é igual para todos, enquanto o consumo individual permanece diferente.',
    ['Some os consumos para conferir o total.', 'Divida a despesa comum por quatro.', 'Adicione a cota ao consumo de cada pessoa.'])

add(17, '''  estoque: vetor[1..3] de inteiro
  pedido, falta, i: inteiro''', '''  para i de 1 ate 3 faca
    escreva("Estoque do tamanho ", i, " (1 P, 2 M, 3 G): ")
    leia(estoque[i])
  fimpara
  para i de 1 ate 3 faca
    escreva("Pedidos do tamanho ", i, ": ")
    leia(pedido)
    se pedido < 0 entao
      escreval("Pedido inválido.")
      falta <- 0
    senao
      se pedido > estoque[i] entao
      falta <- pedido - estoque[i]
      estoque[i] <- 0
      senao
        falta <- 0
        estoque[i] <- estoque[i] - pedido
      fimse
    fimse
    escreval("Tamanho ", i, ": falta ", falta, ", saldo ", estoque[i])
  fimpara''',
    'Use códigos 1 P, 2 M e 3 G. Leia o estoque e os pedidos de cada tamanho; calcule a falta sem permitir saldo negativo.',
    'Estoque P/M/G: 2/4/1; pedidos: 3/2/1\nFaltas: P 1, M 0, G 0\nSaldos: P 0, M 2, G 0',
    'Pedido igual ao estoque zera o saldo e não cria falta.',
    'A falta é o excesso de pedidos sobre o estoque; quando há excesso, o saldo disponível passa a zero.',
    ['Armazene estoques por tamanho.', 'Compare demanda e disponibilidade em cada posição.', 'Calcule a falta antes de zerar um estoque insuficiente.'])

add(18, '''  estoque, consumo, reposicao: inteiro
  turnos, i, primeiraNecessidade: inteiro''', '''  escreva("Balões iniciais: ")
  leia(estoque)
  escreva("Número de turnos: ")
  leia(turnos)
  primeiraNecessidade <- 0
  para i de 1 ate turnos faca
    escreva("Consumo previsto do turno ", i, ": ")
    leia(consumo)
    se consumo < 0 entao
      escreval("Consumo inválido.")
    senao
      se consumo > estoque entao
      se primeiraNecessidade = 0 entao
        primeiraNecessidade <- i
      fimse
      escreval("Reposição necessária no turno ", i, ": ", consumo - estoque)
      estoque <- 0
      senao
        estoque <- estoque - consumo
      fimse
    fimse
    escreva("Reposição após o turno: ")
    leia(reposicao)
    se reposicao > 0 entao
      estoque <- estoque + reposicao
    fimse
  fimpara
  escreval("Primeiro turno com necessidade de reposição: ", primeiraNecessidade)
  escreval("Estoque final: ", estoque)''',
    'Leia estoque inicial e, por turno, consumo previsto e reposição posterior. Registre o primeiro turno cujo consumo excede o estoque disponível e quanto faltou.',
    'Estoque inicial 5; turno 1 consome 3, repõe 0; turno 2 pede 4\nPrimeiro turno com necessidade: 2\nFalta no turno 2: 2',
    'Se todos os turnos forem atendidos, o índice da primeira necessidade fica zero.',
    'O programa consome somente o estoque disponível e mostra a quantidade que precisaria ser reposta para atender integralmente o turno.',
    ['Compare consumo com estoque antes de subtrair.', 'Guarde o primeiro turno insuficiente.', 'Aplique reposições somente depois de cada turno.'])

add(19, '''  medidas: vetor[1..8] de real
  limite: real
  i, comeco: inteiro
  aberto: logico''', '''  escreva("Limite de volume: ")
  leia(limite)
  aberto <- falso
  para i de 1 ate 8 faca
    escreva("Medição no horário ", i, ": ")
    leia(medidas[i])
    se medidas[i] > limite entao
      se nao aberto entao
        comeco <- i
        aberto <- verdadeiro
      fimse
    senao
      se aberto entao
        escreval("Período acima do limite: horários ", comeco, " a ", i - 1)
        aberto <- falso
      fimse
    fimse
  fimpara
  se aberto entao
    escreval("Período acima do limite: horários ", comeco, " a 8")
  fimse''',
    'Leia oito medições em ordem temporal. Um período de alerta contém horários consecutivos com valores estritamente acima do limite.',
    'Limite: 80; medições: 70, 90, 95, 80, 85, 60, 60, 60\nPeríodos: horários 2 a 3; horário 5 a 5',
    'Valor igual ao limite encerra um período de alerta.',
    '`aberto` indica se existe uma sequência ativa; ela é fechada no primeiro valor não alto ou ao fim das oito medições.',
    ['Guarde o início da sequência quando entrar em alerta.', 'Finalize ao encontrar um valor no limite ou abaixo.', 'Trate o caso em que a sequência chega ao último horário.'])

add(20, '''  ocupante: vetor[1..5] de inteiro
  tentativas: vetor[1..5] de inteiro
  codigo, armario, acao, i: inteiro''', '''  para i de 1 ate 5 faca
    ocupante[i] <- 0
    tentativas[i] <- 0
  fimpara
  escreva("Ação (1 ocupar, 2 liberar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Armário (1 a 5): ")
    leia(armario)
    escreva("Código positivo: ")
    leia(codigo)
    se (armario >= 1) e (armario <= 5) e (codigo > 0) entao
      se tentativas[armario] >= 3 entao
        escreval("Armário bloqueado por tentativas.")
      senao
        se (acao = 1) e (ocupante[armario] = 0) entao
          ocupante[armario] <- codigo
          tentativas[armario] <- 0
          escreval("Armário ocupado.")
        senao
          se (acao = 2) e (ocupante[armario] = codigo) entao
            ocupante[armario] <- 0
            tentativas[armario] <- 0
            escreval("Armário liberado.")
          senao
            tentativas[armario] <- tentativas[armario] + 1
            escreval("Acesso recusado. Tentativas: ", tentativas[armario])
          fimse
        fimse
      fimse
    senao
      escreval("Dados inválidos.")
    fimse
    escreva("Ação (1 ocupar, 2 liberar, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Gerencie cinco armários. Um código positivo ocupa um armário livre. Para liberar, informe o mesmo código; três tentativas malsucedidas bloqueiam novas ações naquele armário até reiniciar o programa.',
    'Ocupar armário 2 com código 123 → ocupado\nLiberar com 456 → recusado, tentativa 1\nLiberar com 123 → liberado',
    'Não é permitido ocupar um armário já ocupado. O bloqueio é independente para cada armário.',
    'Vetores separados guardam o código ocupante e o número de tentativas malsucedidas de cada armário.',
    ['Use zero para representar armário livre.', 'Compare o código antes de liberar.', 'Mantenha o contador de tentativas por armário.'])

add(21, '''  saldo: vetor[1..3] de inteiro
  estoque, equipe, quantidade, acao, i, distribuidos: inteiro''', '''  escreva("Convites disponíveis: ")
  leia(estoque)
  para i de 1 ate 3 faca
    saldo[i] <- 0
  fimpara
  escreva("Ação (1 entregar lote, 2 devolver, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Equipe (1 a 3): ")
    leia(equipe)
    escreva("Quantidade: ")
    leia(quantidade)
    se (equipe >= 1) e (equipe <= 3) e (quantidade > 0) entao
      se (acao = 1) e (quantidade <= estoque) entao
        estoque <- estoque - quantidade
        saldo[equipe] <- saldo[equipe] + quantidade
      senao
        se (acao = 2) e (quantidade <= saldo[equipe]) entao
          saldo[equipe] <- saldo[equipe] - quantidade
          estoque <- estoque + quantidade
        senao
          escreval("Operação sem saldo suficiente.")
        fimse
      fimse
    senao
      escreval("Dados inválidos.")
    fimse
    escreva("Ação (1 entregar lote, 2 devolver, 0 sair): ")
    leia(acao)
  fimenquanto
  distribuidos <- 0
  para i de 1 ate 3 faca
    distribuidos <- distribuidos + saldo[i]
    escreval("Equipe ", i, " possui ", saldo[i])
  fimpara
  escreval("Depósito: ", estoque, "; com equipes: ", distribuidos, "; total: ", estoque + distribuidos)''',
    'Entrega diminui o depósito e aumenta o saldo da equipe. Devolução faz o inverso, limitada ao saldo daquela equipe. Mostre os saldos e a soma final.',
    'Depósito inicial: 10; entregar 4 à equipe 1; devolver 1\nDepósito: 7; equipe 1: 3; total: 10',
    'Uma devolução superior ao saldo da equipe é rejeitada por inteiro.',
    'Cada transferência altera dois saldos em sentidos opostos, preservando o total de convites.',
    ['Guarde um saldo por equipe.', 'Valide o saldo antes de entregar ou devolver.', 'Confira que depósito mais saldos das equipes permanece constante.'])

add(22, '''  trecho: vetor[1..6] de real
  i, maiorIndice: inteiro
  total: real''', '''  total <- 0
  maiorIndice <- 1
  para i de 1 ate 6 faca
    escreva("Distância do trecho ", i, ": ")
    leia(trecho[i])
    total <- total + trecho[i]
    escreval("Distância acumulada: ", total)
    se (i = 1) ou (trecho[i] > trecho[maiorIndice]) entao
      maiorIndice <- i
    fimse
  fimpara
  escreval("Maior trecho: ", maiorIndice, " com ", trecho[maiorIndice])
  escreval("Distância total: ", total)''',
    'Leia seis distâncias de trechos. Após cada leitura, mostre a distância acumulada; ao final, destaque o trecho mais longo.',
    'Trechos: 2, 5, 1, 1, 1, 1\nAcumulado após o segundo: 7\nMaior trecho: 2 com 5\nDistância total: 11',
    'Em empate de maior distância, o primeiro trecho com esse valor é preservado.',
    'O vetor conserva as distâncias; o acumulador soma o trajeto e o índice aponta para a maior distância individual.',
    ['Some cada trecho ao total à medida que é lido.', 'Guarde o índice do maior valor.', 'Não confunda maior trecho com distância total.'])

add(23, '''  vendas: vetor[1..3, 1..2] de real
  setor, turno, melhorSetor, melhorTurno: inteiro
  totalSetor, maiorSetor, maiorCelula, total: real''', '''  maiorCelula <- -1
  maiorSetor <- -1
  melhorSetor <- 0
  melhorTurno <- 0
  total <- 0
  para setor de 1 ate 3 faca
    totalSetor <- 0
    para turno de 1 ate 2 faca
      escreva("Vendas do setor ", setor, ", turno ", turno, ": ")
      leia(vendas[setor, turno])
      totalSetor <- totalSetor + vendas[setor, turno]
      total <- total + vendas[setor, turno]
      se vendas[setor, turno] > maiorCelula entao
        maiorCelula <- vendas[setor, turno]
        melhorSetor <- setor
        melhorTurno <- turno
      fimse
    fimpara
    escreval("Total do setor ", setor, ": ", totalSetor)
    se totalSetor > maiorSetor entao
      maiorSetor <- totalSetor
    fimse
  fimpara
  escreval("Total geral: ", total)
  escreval("Maior setor/turno: ", melhorSetor, "/", melhorTurno, " com ", maiorCelula)''',
    'Registre vendas de três setores em dois turnos por uma matriz. Mostre total de cada setor, total geral e a célula de maior venda.',
    'Setor 1: 10 e 20; setor 2: 5 e 15; setor 3: 0 e 10\nTotal geral: 60\nMaior setor/turno: 1/2 com 20',
    'Em empate de maior célula, a primeira na ordem de leitura permanece selecionada.',
    'Cada linha da matriz representa um setor e cada coluna um turno.',
    ['Percorra as duas dimensões da matriz.', 'Some as duas colunas para o total de cada setor.', 'Compare cada célula para localizar o maior valor.'])

add(24, '''  grupo: vetor[1..4] de inteiro
  capacidadeCoberta, capacidadeAberta, fechado, i, coberto, aberto: inteiro''', '''  escreva("Capacidade do ambiente coberto: ")
  leia(capacidadeCoberta)
  escreva("Capacidade da área aberta: ")
  leia(capacidadeAberta)
  escreva("Área aberta fechou? (1 sim, 0 não): ")
  leia(fechado)
  coberto <- 0
  aberto <- 0
  para i de 1 ate 4 faca
    escreva("Pessoas do grupo ", i, ": ")
    leia(grupo[i])
    se grupo[i] < 0 entao
      escreval("Grupo inválido")
    senao
      se grupo[i] <= capacidadeCoberta - coberto entao
      coberto <- coberto + grupo[i]
      escreval("Grupo ", i, " no ambiente coberto")
      senao
        se (fechado = 0) e (grupo[i] <= capacidadeAberta - aberto) entao
        aberto <- aberto + grupo[i]
        escreval("Grupo ", i, " na área aberta")
        senao
          escreval("Grupo ", i, " sem espaço")
        fimse
      fimse
    fimse
  fimpara
  escreval("Coberto: ", coberto, "; aberto: ", aberto)''',
    'Leia as capacidades de dois ambientes e quatro grupos. Priorize o espaço coberto; se não couber, use a área aberta somente quando estiver disponível. Não divida um grupo entre ambientes.',
    'Coberto: 5 vagas; aberto: 10 vagas; área aberta fechada\nGrupos de 3 e 4 pessoas\nGrupo 1 no coberto; grupo 2 sem espaço',
    'Um grupo que cabe exatamente nas vagas restantes pode entrar. Grupo maior que a capacidade restante não é dividido.',
    'A variável `fechado` bloqueia a alocação na área externa; os contadores mantêm a ocupação de cada ambiente.',
    ['Calcule vagas restantes antes de alocar.', 'Considere o fechamento do ambiente externo.', 'Preserve grupos inteiros.'])

add(25, '''  mensagem, transformada, letra: caractere
  deslocamento, opcao, i, codigo: inteiro''', '''  escreva("Mensagem (letras minúsculas sem acentos): ")
  leia(mensagem)
  escreva("Deslocamento (0 a 25): ")
  leia(deslocamento)
  escreva("Operação (1 codificar, 2 decodificar): ")
  leia(opcao)
  transformada <- ""
  se (deslocamento >= 0) e (deslocamento <= 25) e ((opcao = 1) ou (opcao = 2)) entao
    para i de 1 ate compr(mensagem) faca
      letra <- copia(mensagem, i, 1)
      codigo <- asc(letra)
      se (codigo >= 97) e (codigo <= 122) entao
        se opcao = 1 entao
          codigo <- ((codigo - 97 + deslocamento) mod 26) + 97
        senao
          codigo <- ((codigo - 97 - deslocamento + 26) mod 26) + 97
        fimse
        transformada <- transformada + carac(codigo)
      senao
        transformada <- transformada + letra
      fimse
    fimpara
    escreval("Resultado: ", transformada)
  senao
    escreval("Parâmetros inválidos.")
  fimse''',
    'Use uma cifra de César com deslocamento configurável de 0 a 25. Codificação avança letras; decodificação recua. Preserve espaços e sinais.',
    'Mensagem: abc xyz; deslocamento: 2; operação: codificar\nResultado: cde zab',
    'O exercício trabalha com letras minúsculas sem acentos. Deslocamento zero conserva a mensagem.',
    'Os códigos ASCII 97 a 122 correspondem a `a` até `z`; `mod 26` faz a volta após `z` ou antes de `a`.',
    ['Trabalhe com o código de cada caractere.', 'Use resto da divisão por 26 para circular pelo alfabeto.', 'Preserve caracteres que não sejam letras minúsculas.'])

add(26, '''  disponiveis, retirados, depositoPorCopo, emAberto, saldoDeposito: inteiro
  acao, quantidade: inteiro''', '''  escreva("Copos disponíveis: ")
  leia(disponiveis)
  escreva("Depósito reembolsável por copo: ")
  leia(depositoPorCopo)
  emAberto <- 0
  saldoDeposito <- 0
  escreva("Ação (1 retirar, 2 devolver, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Quantidade: ")
    leia(quantidade)
    se quantidade > 0 entao
      se (acao = 1) e (quantidade <= disponiveis) entao
        disponiveis <- disponiveis - quantidade
        emAberto <- emAberto + quantidade
        saldoDeposito <- saldoDeposito + quantidade * depositoPorCopo
        escreval("Depósito cobrado: ", quantidade * depositoPorCopo)
      senao
        se (acao = 2) e (quantidade <= emAberto) entao
          emAberto <- emAberto - quantidade
          disponiveis <- disponiveis + quantidade
          saldoDeposito <- saldoDeposito - quantidade * depositoPorCopo
          escreval("Depósito devolvido: ", quantidade * depositoPorCopo)
        senao
          escreval("Operação sem saldo suficiente.")
        fimse
      fimse
    fimse
    escreva("Ação (1 retirar, 2 devolver, 0 sair): ")
    leia(acao)
  fimenquanto
  escreval("Copos disponíveis: ", disponiveis)
  escreval("Copos em uso: ", emAberto)
  escreval("Depósito em aberto: ", saldoDeposito)''',
    'Simule retirada e devolução de copos reutilizáveis. Cada retirada cobra depósito por copo; cada devolução o reembolsa. Não retire além do estoque nem devolva além dos copos em uso.',
    'Estoque 10; depósito R$ 2\nRetirar 3 → cobra 6, estoque 7\nDevolver 2 → reembolsa 4, estoque 9\nDepósito em aberto: 2',
    'Uma operação recusada não altera copos ou depósito.',
    'Os contadores de disponíveis e em uso movem unidades em sentidos contrários, e o depósito acompanha o número de copos em uso.',
    ['Mantenha dois saldos de copos.', 'Valide o saldo correspondente antes de cada operação.', 'Atualize o depósito pelo produto quantidade × valor por copo.'])

add(27, '''  nome: vetor[1..3] de caractere
  pontos, desempate: vetor[1..3] de inteiro
  i, prova, nota, posicao, j: inteiro''', '''  para i de 1 ate 3 faca
    escreva("Grupo ", i, ": ")
    leia(nome[i])
    pontos[i] <- 0
    para prova de 1 ate 4 faca
      escreva("Pontos da prova ", prova, ": ")
      leia(nota)
      pontos[i] <- pontos[i] + nota
      se prova = 4 entao
        desempate[i] <- nota
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    posicao <- 1
    para j de 1 ate 3 faca
      se (pontos[j] > pontos[i]) ou ((pontos[j] = pontos[i]) e (desempate[j] > desempate[i])) entao
        posicao <- posicao + 1
      fimse
    fimpara
    escreval(nome[i], ": posição ", posicao, ", total ", pontos[i], ", última prova ", desempate[i])
  fimpara''',
    'Leia pontos de três grupos em quatro provas. Classifique pelo total e use a pontuação da quarta prova como critério secundário.',
    'Grupo A: 5,5,5,5 → total 20, última 5\nGrupo B: 6,6,2,6 → total 20, última 6\nB fica à frente de A',
    'Se total e quarta prova forem iguais, os grupos dividem a mesma posição.',
    'A posição é calculada contando quantos grupos superam o atual pelo par de critérios.',
    ['Some todas as provas.', 'Guarde a nota da última prova separadamente.', 'Compare total primeiro; só em empate compare a última prova.'])

add(28, '''  nome: vetor[1..4] de caractere
  receita, custo, capacidade, presentes: real
  i, melhorLucro, melhorOcupacao: inteiro
  lucro, ocupacao, maxLucro, maxOcupacao: real''', '''  melhorLucro <- 0
  melhorOcupacao <- 0
  para i de 1 ate 4 faca
    escreva("Evento ", i, ": ")
    leia(nome[i])
    escreva("Receita: ")
    leia(receita)
    escreva("Custo: ")
    leia(custo)
    escreva("Capacidade: ")
    leia(capacidade)
    escreva("Presentes: ")
    leia(presentes)
    lucro <- receita - custo
    se capacidade > 0 entao
      ocupacao <- presentes * 100 / capacidade
      escreval(nome[i], ": lucro ", lucro, ", ocupação ", ocupacao, "%")
      se (melhorLucro = 0) ou (lucro > maxLucro) entao
        maxLucro <- lucro
        melhorLucro <- i
      fimse
      se (melhorOcupacao = 0) ou (ocupacao > maxOcupacao) entao
        maxOcupacao <- ocupacao
        melhorOcupacao <- i
      fimse
    senao
      escreval("Capacidade inválida.")
    fimse
  fimpara
  se melhorLucro > 0 entao
    escreval("Maior lucro: evento ", melhorLucro)
    escreval("Maior ocupação: evento ", melhorOcupacao)
  fimse''',
    'Compare quatro eventos por resultado financeiro e taxa de ocupação. Lucro é receita menos custo; ocupação é presentes divididos pela capacidade vezes 100.',
    'Evento A: receita 100, custo 40, 5 presentes de 10 vagas → lucro 60, ocupação 50%\nEvento B: receita 90, custo 20, 8 presentes de 10 vagas → lucro 70, ocupação 80%\nB lidera nos dois critérios',
    'Capacidade zero torna a ocupação indefinida; esse evento é ignorado nas escolhas de destaque.',
    'Os índices dos dois destaques são independentes porque maior lucro e maior ocupação podem pertencer a eventos diferentes.',
    ['Calcule lucro e ocupação separadamente.', 'Não divida por capacidade zero.', 'Mantenha uma referência para cada critério de destaque.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Catalog contains {len(entries)} reviewed challenge solutions")
