#!/usr/bin/env python3
"""Curated advanced April logic exercises."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "data/challenge-solutions.json"
entries = json.loads(CATALOG.read_text(encoding="utf-8"))
rows = {r["data_mm_dd"]: r for r in csv.DictReader((ROOT / "data/visualg_365_dias_730_desafios.csv").open(encoding="utf-8"))}


def add(day, variables, body, rules, example, edge, explanation, hints):
    date = f"04-{day:02d}"
    prompt = rows[date]["avancado_enunciado"]
    code = f'algoritmo "Desafio04{day:02d}A"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f"{date}/avancado"] = dict(
        code=code, objective=prompt[0].upper() + prompt[1:] + " Informe também quando não houver resposta válida.",
        rules=rules, example=example, edge=edge, explanation=explanation, hints=hints)


add(1, '''  termos: vetor[1..5] de inteiro
  lacuna, diferenca, i: inteiro
  encontrou: logico''', '''  lacuna <- 0
  para i de 1 ate 5 faca
    escreva("Termo ", i, " (-999 para lacuna): ")
    leia(termos[i])
    se termos[i] = -999 entao
      lacuna <- i
    fimse
  fimpara
  encontrou <- falso
  diferenca <- 0
  para i de 1 ate 4 faca
    se (termos[i] <> -999) e (termos[i + 1] <> -999) e (nao encontrou) entao
      diferenca <- termos[i + 1] - termos[i]
      encontrou <- verdadeiro
    fimse
  fimpara
  se (lacuna > 0) e encontrou entao
    se lacuna > 1 entao
      termos[lacuna] <- termos[lacuna - 1] + diferenca
    senao
      termos[lacuna] <- termos[2] - diferenca
    fimse
    escreval("Termo faltante na posição ", lacuna, ": ", termos[lacuna])
  senao
    escreval("Informe exatamente uma lacuna e termos suficientes.")
  fimse''',
    'Leia cinco termos de uma PA, usando -999 no lugar do termo ausente. Determine a diferença a partir de dois termos conhecidos consecutivos e preencha a lacuna.',
    'Termos: 2, 5, -999, 11, 14\nTermo faltante na posição 3: 8',
    'O marcador -999 fica reservado para a lacuna, portanto não pode ser um termo real neste exercício.',
    'Depois de achar a diferença, some-a ao termo anterior ou subtraia-a do segundo termo quando a primeira posição falta.',
    ['Localize o índice da lacuna.', 'Encontre dois termos conhecidos consecutivos para calcular a razão da PA.', 'Use o vizinho para reconstruir o termo ausente.'])

add(2, '''  historico: vetor[1..3] de inteiro
  senha, tentativa, i, feitas: inteiro
  acertou: logico''', '''  senha <- 42
  acertou <- falso
  feitas <- 0
  para i de 1 ate 3 faca
    se nao acertou entao
      escreva("Tentativa ", i, ": ")
      leia(tentativa)
      historico[i] <- tentativa
      feitas <- feitas + 1
      se tentativa = senha entao
        acertou <- verdadeiro
        escreval("Acesso autorizado.")
      senao
        escreval("Código incorreto.")
      fimse
    fimse
  fimpara
  se nao acertou entao
    escreval("Acesso bloqueado após três erros.")
  fimse
  para i de 1 ate feitas faca
    escreval("Histórico ", i, ": ", historico[i])
  fimpara''',
    'A senha fixa é 42. Leia no máximo três tentativas e pare após um acerto. Ao fim, mostre as tentativas registradas; três erros bloqueiam o acesso.',
    'Tentativas: 10, 20, 42\nCódigo incorreto; código incorreto; acesso autorizado',
    'Se acertar na primeira tentativa, as duas restantes não são solicitadas.',
    'O vetor armazena o histórico real de tentativas e a variável lógica impede novas leituras depois do acerto.',
    ['Use um laço com limite de três.', 'Interrompa leituras depois do acerto.', 'Guarde cada tentativa antes de compará-la.'])

add(3, '''  codigos: vetor[1..6] de inteiro
  alvo, i, j, pares: inteiro''', '''  para i de 1 ate 6 faca
    escreva("Código ", i, ": ")
    leia(codigos[i])
  fimpara
  escreva("Código do cadeado: ")
  leia(alvo)
  pares <- 0
  para i de 1 ate 5 faca
    para j de i + 1 ate 6 faca
      se codigos[i] + codigos[j] = alvo entao
        escreval("Par: posições ", i, " e ", j)
        pares <- pares + 1
      fimse
    fimpara
  fimpara
  escreval("Pares encontrados: ", pares)''',
    'Leia seis códigos inteiros e uma soma-alvo. Liste todos os pares de posições diferentes cujos códigos somem o alvo.',
    'Códigos: 2, 3, 4, 5, 6, 7; alvo: 9\nPares: posições 1 e 6, 2 e 5, 3 e 4',
    'Dois códigos iguais podem formar um par se estiverem em posições diferentes.',
    'O índice interno começa depois do externo para não repetir pares nem usar a mesma posição duas vezes.',
    ['Guarde os códigos em vetor.', 'Compare cada posição com as posteriores.', 'Conte todos os pares válidos.'])

add(4, '''  grade: vetor[1..3, 1..3] de caractere
  horizontal, vertical: logico
  i, j: inteiro''', '''  para i de 1 ate 3 faca
    para j de 1 ate 3 faca
      escreva("Símbolo ", i, ",", j, ": ")
      leia(grade[i, j])
    fimpara
  fimpara
  horizontal <- verdadeiro
  vertical <- verdadeiro
  para i de 1 ate 3 faca
    para j de 1 ate 3 faca
      se grade[i, j] <> grade[4 - i, j] entao
        horizontal <- falso
      fimse
      se grade[i, j] <> grade[i, 4 - j] entao
        vertical <- falso
      fimse
    fimpara
  fimpara
  escreval("Simetria horizontal: ", horizontal)
  escreval("Simetria vertical: ", vertical)''',
    'Leia uma grade 3 × 3 de símbolos. Compare posições refletidas em relação ao eixo horizontal e ao vertical.',
    'Grade AAA / ABA / AAA\nSimetria horizontal: verdadeiro\nSimetria vertical: verdadeiro',
    'Uma grade pode ser simétrica em apenas um dos eixos, em ambos ou em nenhum.',
    'A posição refletida horizontalmente tem linha `4 - i`; a refletida verticalmente tem coluna `4 - j`.',
    ['Use matriz 3 × 3.', 'Compare cada célula com a célula espelhada em cada eixo.', 'Mantenha um resultado lógico separado por eixo.'])

add(5, '''  valores: vetor[1..4] de inteiro
  i, j, divisor, comum: inteiro''', '''  para i de 1 ate 4 faca
    escreva("Número suspeito ", i, ": ")
    leia(valores[i])
    escreval("Divisores de ", valores[i], ":")
    para divisor de 1 ate valores[i] faca
      se valores[i] mod divisor = 0 entao
        escreval(divisor)
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    para j de i + 1 ate 4 faca
      comum <- 0
      para divisor de 2 ate valores[i] faca
        se (valores[i] mod divisor = 0) e (valores[j] mod divisor = 0) entao
          comum <- divisor
        fimse
      fimpara
      se comum > 0 entao
        escreval("Números ", i, " e ", j, " compartilham divisor ", comum)
      fimse
    fimpara
  fimpara''',
    'Leia quatro inteiros positivos. Liste os divisores positivos de cada um e indique pares que compartilham algum divisor maior que 1.',
    'Números 6 e 9\nDivisores de 6: 1,2,3,6\nDivisores de 9: 1,3,9\nCompartilham divisor 3',
    'Todos os inteiros positivos compartilham o divisor 1; aqui esse divisor trivial não conta para o agrupamento.',
    'O resto zero identifica um divisor. O segundo bloco procura um divisor comum não trivial para cada par.',
    ['Teste candidatos de 1 até o próprio número.', 'Para cada par, procure divisor comum a partir de 2.', 'Evite repetir pares em ordem inversa.'])

add(6, '''  somaAlvo, primeiro, terceiro, codigo, milhar, centena, dezena, unidade, encontrados: inteiro''', '''  escreva("Soma dos quatro dígitos: ")
  leia(somaAlvo)
  escreva("Primeiro dígito: ")
  leia(primeiro)
  escreva("Terceiro dígito: ")
  leia(terceiro)
  encontrados <- 0
  para codigo de 1000 ate 9999 faca
    milhar <- codigo div 1000
    centena <- (codigo div 100) mod 10
    dezena <- (codigo div 10) mod 10
    unidade <- codigo mod 10
    se (milhar = primeiro) e (dezena = terceiro) e (milhar + centena + dezena + unidade = somaAlvo) entao
      escreval(codigo)
      encontrados <- encontrados + 1
    fimse
  fimpara
  escreval("Códigos compatíveis: ", encontrados)''',
    'Leia soma desejada dos dígitos, primeiro e terceiro dígito. Percorra os códigos de 1000 a 9999 e liste os que satisfazem todas as pistas.',
    'Soma 10; primeiro dígito 1; terceiro dígito 2\nCódigo 1225 é compatível: 1+2+2+5=10.',
    'Se as pistas forem impossíveis, a contagem final será zero.',
    'Divisão inteira e resto extraem dígitos em posições determinadas; a enumeração examina o espaço finito de códigos.',
    ['Extraia cada uma das quatro posições.', 'Cheque as pistas de posição e soma no mesmo `se`.', 'Conte apenas códigos que satisfazem tudo.'])

add(7, '''  mapa: vetor[1..5, 1..5] de inteiro
  linha, coluna, novaLinha, novaColuna, passos, i, j: inteiro
  comando: caractere''', '''  para i de 1 ate 5 faca
    para j de 1 ate 5 faca
      escreva("Mapa ", i, ",", j, " (0 livre, 1 obstáculo): ")
      leia(mapa[i, j])
    fimpara
  fimpara
  linha <- 1
  coluna <- 1
  escreva("Número de movimentos: ")
  leia(passos)
  para i de 1 ate passos faca
    escreva("Movimento N/S/L/O: ")
    leia(comando)
    novaLinha <- linha
    novaColuna <- coluna
    se comando = "N" entao
      novaLinha <- linha - 1
    fimse
    se comando = "S" entao
      novaLinha <- linha + 1
    fimse
    se comando = "L" entao
      novaColuna <- coluna + 1
    fimse
    se comando = "O" entao
      novaColuna <- coluna - 1
    fimse
    se (novaLinha >= 1) e (novaLinha <= 5) e (novaColuna >= 1) e (novaColuna <= 5) entao
      se mapa[novaLinha, novaColuna] = 0 entao
        linha <- novaLinha
        coluna <- novaColuna
      senao
        escreval("Obstáculo: movimento bloqueado.")
      fimse
    senao
      escreval("Borda do mapa: movimento bloqueado.")
    fimse
    escreval("Posição: ", linha, ",", coluna)
  fimpara''',
    'Leia uma grade 5 × 5, com 0 para célula livre e 1 para obstáculo. O personagem começa em 1,1. Execute comandos cardeais, rejeitando saída da grade ou entrada em obstáculo.',
    'Mapa livre, exceto obstáculo em 1,2; comando L\nMovimento bloqueado; posição permanece 1,1',
    'Um movimento bloqueado não muda a posição do personagem.',
    'O algoritmo calcula uma posição candidata antes de atualizar a posição real.',
    ['Modele o mapa por matriz.', 'Calcule linha e coluna candidatas.', 'Valide limites e obstáculo antes de mover.'])

add(8, '''  numeros: vetor[1..6] de inteiro
  alvo, i, j, quantidade: inteiro''', '''  para i de 1 ate 6 faca
    escreva("Número ", i, ": ")
    leia(numeros[i])
  fimpara
  escreva("Soma-alvo: ")
  leia(alvo)
  quantidade <- 0
  para i de 1 ate 5 faca
    para j de i + 1 ate 6 faca
      se numeros[i] + numeros[j] = alvo entao
        escreval("Dupla ", i, "/", j, ": ", numeros[i], "+", numeros[j])
        quantidade <- quantidade + 1
      fimse
    fimpara
  fimpara
  escreval("Duplas encontradas: ", quantidade)''',
    'Leia seis inteiros e uma soma-alvo. Encontre todas as duplas de posições distintas, sem repetir a dupla invertida.',
    'Vetor 1,2,3,4,5,6; alvo 7\nDuplas 1/6, 2/5, 3/4',
    'Valores repetidos em posições diferentes podem formar duplas diferentes.',
    'O índice interno sempre começa em `i + 1`, evitando usar a mesma posição duas vezes.',
    ['Percorra pares de índices, não apenas valores.', 'Comece o segundo índice após o primeiro.', 'Conte cada dupla válida.'])

add(9, '''  altura, linha, espaco, coluna, alternancia: inteiro''', '''  escreva("Altura da pirâmide (1 a 9): ")
  leia(altura)
  escreva("Alternar dígitos 0 e 1? (1 sim, 0 não): ")
  leia(alternancia)
  se (altura >= 1) e (altura <= 9) entao
    para linha de 1 ate altura faca
      para espaco de 1 ate altura - linha faca
        escreva(" ")
      fimpara
      para coluna de 1 ate linha * 2 - 1 faca
        se alternancia = 1 entao
          escreva((linha + coluna) mod 2)
        senao
          escreva(linha)
        fimse
      fimpara
      escreval("")
    fimpara
  senao
    escreval("Altura inválida.")
  fimse''',
    'Leia altura de 1 a 9. Cada linha i contém `2i - 1` dígitos, precedidos por espaços para centralizar. No modo alternado, intercale 0 e 1; no outro, repita o número da linha.',
    'Altura 2, modo não alternado\n 1\n222',
    'A primeira linha tem um dígito e a última tem `2 × altura - 1` dígitos.',
    'O laço de espaços diminui enquanto o laço de dígitos aumenta, criando a forma triangular.',
    ['Use um laço para linhas.', 'Calcule espaços e largura a partir da linha.', 'Escolha o dígito conforme o modo.'])

add(10, '''  nome: vetor[1..5] de caractere
  altura, idade, chave: vetor[1..5] de inteiro
  i, encontrados: inteiro''', '''  para i de 1 ate 5 faca
    escreva("Suspeito ", i, ": ")
    leia(nome[i])
    escreva("Altura (cm): ")
    leia(altura[i])
    escreva("Idade: ")
    leia(idade[i])
    escreva("Possui chave? (1 sim, 0 não): ")
    leia(chave[i])
  fimpara
  encontrados <- 0
  para i de 1 ate 5 faca
    se (altura[i] >= 170) e (idade[i] < 40) e (chave[i] = 1) entao
      escreval("Compatível: ", nome[i])
      encontrados <- encontrados + 1
    fimse
  fimpara
  escreval("Suspeitos compatíveis: ", encontrados)''',
    'Cadastre cinco suspeitos. As três pistas são: altura de pelo menos 170 cm, idade inferior a 40 anos e posse de uma chave.',
    'Ana: 175 cm, 30 anos, chave sim → compatível\nBia: 160 cm, 30 anos, chave sim → não compatível',
    'Apenas quem atende simultaneamente as três pistas aparece na lista.',
    'Os atributos de um suspeito ocupam a mesma posição dos vetores; uma condição com `e` exige as três características.',
    ['Guarde cada característica junto ao nome.', 'Use uma condição composta por três comparações.', 'Conte os nomes apresentados.'])

add(11, '''  a1, b1, c1, a2, b2, c2, determinante, x, y: real''', '''  escreva("a1: ")
  leia(a1)
  escreva("b1: ")
  leia(b1)
  escreva("c1: ")
  leia(c1)
  escreva("a2: ")
  leia(a2)
  escreva("b2: ")
  leia(b2)
  escreva("c2: ")
  leia(c2)
  determinante <- a1 * b2 - a2 * b1
  se determinante <> 0 entao
    x <- (c1 * b2 - c2 * b1) / determinante
    y <- (a1 * c2 - a2 * c1) / determinante
    escreval("Solução única: x=", x, ", y=", y)
  senao
    se ((a1 = 0) e (b1 = 0) e (c1 <> 0)) ou ((a2 = 0) e (b2 = 0) e (c2 <> 0)) entao
      escreval("Sistema sem solução.")
    senao
      se (a1 * c2 = a2 * c1) e (b1 * c2 = b2 * c1) entao
        escreval("Sistema com infinitas soluções.")
      senao
        escreval("Sistema sem solução.")
      fimse
    fimse
  fimse''',
    'Leia coeficientes de `a1*x + b1*y = c1` e `a2*x + b2*y = c2`. Use determinante para achar solução única; se ele for zero, distinga retas coincidentes de incompatíveis.',
    'Equações x+y=3 e x-y=1\nSolução única: x=2, y=1',
    'Duas equações iguais têm infinitas soluções; equações como x+y=1 e x+y=2 não têm solução.',
    'As fórmulas de Cramer calculam x e y quando o determinante principal é não nulo.',
    ['Monte o determinante dos coeficientes.', 'Divida somente quando ele for diferente de zero.', 'Quando for zero, compare proporcionalidade dos termos independentes.'])

add(12, '''  minimo, maximo, palpite, resposta, tentativas: inteiro''', '''  minimo <- 1
  maximo <- 100
  tentativas <- 0
  resposta <- 0
  enquanto (minimo <= maximo) e (resposta <> 3) faca
    palpite <- (minimo + maximo) div 2
    escreval("Palpite: ", palpite)
    escreva("Resposta (1 maior, 2 menor, 3 acertou): ")
    leia(resposta)
    tentativas <- tentativas + 1
    se resposta = 1 entao
      minimo <- palpite + 1
    fimse
    se resposta = 2 entao
      maximo <- palpite - 1
    fimse
    escreval("Intervalo possível: ", minimo, " a ", maximo)
  fimenquanto
  se resposta = 3 entao
    escreval("Encontrado em ", tentativas, " tentativa(s).")
  senao
    escreval("Pistas incompatíveis: intervalo vazio.")
  fimse''',
    'Pense em um número secreto de 1 a 100. O programa escolhe o meio do intervalo e recebe pistas: número maior, menor ou acerto. Atualize os limites até acertar ou esvaziar o intervalo.',
    'Primeiro palpite 50; resposta “maior”\nNovo intervalo: 51 a 100',
    'Pistas contraditórias podem produzir um intervalo vazio.',
    'Cada comparação descarta aproximadamente metade dos candidatos possíveis.',
    ['Guarde limites mínimo e máximo.', 'Calcule palpite pelo ponto médio inteiro.', 'Substitua apenas o limite correspondente à pista.'])

add(13, '''  estado, acao: inteiro''', '''  estado <- 1
  escreval("Estado inicial: FECHADO")
  escreva("Ação (1 abrir, 2 fechar, 3 travar, 4 destravar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se (estado = 1) e (acao = 1) entao
      estado <- 2
    senao
      se (estado = 2) e (acao = 2) entao
        estado <- 1
      senao
        se (estado = 1) e (acao = 3) entao
          estado <- 3
        senao
          se (estado = 3) e (acao = 4) entao
            estado <- 1
          senao
            escreval("Transição não permitida.")
          fimse
        fimse
      fimse
    fimse
    se estado = 1 entao
      escreval("FECHADO")
    fimse
    se estado = 2 entao
      escreval("ABERTO")
    fimse
    se estado = 3 entao
      escreval("TRAVADO")
    fimse
    escreva("Ação (1 abrir, 2 fechar, 3 travar, 4 destravar, 0 sair): ")
    leia(acao)
  fimenquanto''',
    'Modele uma porta com estados FECHADO, ABERTO e TRAVADO. Abrir só é permitido a partir de FECHADO; fechar a partir de ABERTO; travar a partir de FECHADO; destravar a partir de TRAVADO.',
    'Estado inicial FECHADO\nAção travar → TRAVADO\nAção abrir → transição recusada, continua TRAVADO',
    'Uma transição recusada não muda o estado.',
    'A variável `estado` representa o estado atual e cada par estado/ação determina a próxima transição.',
    ['Liste transições permitidas antes de codificar.', 'Altere o estado apenas quando o par atual/ação for válido.', 'Mostre o estado após cada ação.'])

add(14, '''  texto, letra: caractere
  frequencia: vetor[1..26] de inteiro
  i, j, codigo, melhor, primeira, segunda, terceira: inteiro''', '''  escreva("Frase com letras maiúsculas A a Z: ")
  leia(texto)
  para i de 1 ate 26 faca
    frequencia[i] <- 0
  fimpara
  para i de 1 ate compr(texto) faca
    letra <- copia(texto, i, 1)
    codigo <- asc(letra)
    se (codigo >= 65) e (codigo <= 90) entao
      frequencia[codigo - 64] <- frequencia[codigo - 64] + 1
    fimse
  fimpara
  para j de 1 ate 3 faca
    melhor <- 1
    para i de 2 ate 26 faca
      se frequencia[i] > frequencia[melhor] entao
        melhor <- i
      fimse
    fimpara
    escreval(j, "º: ", carac(melhor + 64), " (", frequencia[melhor], ")")
    frequencia[melhor] <- -1
  fimpara''',
    'Leia uma frase com letras maiúsculas A–Z. Conte cada letra, ignore espaços e sinais e mostre as três letras mais frequentes.',
    'Frase: ABACA\n1º A (3), 2º B (1), 3º C (1)',
    'Empates usam a ordem alfabética porque a varredura escolhe o primeiro máximo.',
    'O código ASCII da letra fornece o índice de 1 a 26. Após mostrar uma letra, sua contagem é marcada para não ser escolhida de novo.',
    ['Crie um contador para cada letra.', 'Converta letras em índices.', 'Procure o maior contador três vezes, removendo o escolhido.'])

add(15, '''  valores: vetor[1..7] de inteiro
  i, total, esquerda, indice: inteiro''', '''  total <- 0
  para i de 1 ate 7 faca
    escreva("Valor ", i, ": ")
    leia(valores[i])
    total <- total + valores[i]
  fimpara
  esquerda <- 0
  indice <- 0
  para i de 1 ate 7 faca
    se (indice = 0) e (esquerda = total - esquerda - valores[i]) entao
      indice <- i
    fimse
    esquerda <- esquerda + valores[i]
  fimpara
  se indice > 0 entao
    escreval("Índice de equilíbrio: ", indice)
  senao
    escreval("Nenhum índice de equilíbrio")
  fimse''',
    'Leia sete inteiros. Encontre a primeira posição para a qual a soma dos elementos à esquerda é igual à soma dos elementos à direita, sem incluir a própria posição.',
    'Vetor: 1,2,3,0,3,2,1\nÍndice de equilíbrio: 4',
    'Extremos podem ser índices de equilíbrio se a soma do lado vazio, zero, coincidir com a soma do restante.',
    '`total - esquerda - valores[i]` calcula o lado direito sem fazer uma soma inteira a cada posição.',
    ['Calcule a soma total primeiro.', 'Mantenha um acumulador para o lado esquerdo.', 'Obtenha o lado direito por subtração.'])

add(16, '''  valores: vetor[1..4] de inteiro
  alvo, a, b, c, d, melhor, total: inteiro''', '''  escreva("Valor a formar: ")
  leia(alvo)
  escreva("Quantidade disponível de moedas de 1: ")
  leia(valores[1])
  escreva("Quantidade disponível de moedas de 2: ")
  leia(valores[2])
  escreva("Quantidade disponível de moedas de 5: ")
  leia(valores[3])
  escreva("Quantidade disponível de moedas de 10: ")
  leia(valores[4])
  melhor <- 999999999
  para a de 0 ate valores[1] faca
    para b de 0 ate valores[2] faca
      para c de 0 ate valores[3] faca
        para d de 0 ate valores[4] faca
          se a + 2 * b + 5 * c + 10 * d = alvo entao
            total <- a + b + c + d
            se total < melhor entao
              melhor <- total
            fimse
          fimse
        fimpara
      fimpara
    fimpara
  fimpara
  se melhor < 999999999 entao
    escreval("Menor número de moedas: ", melhor)
  senao
    escreval("Não existe troco exato com as moedas disponíveis.")
  fimse''',
    'Leia valor inteiro e quantidades disponíveis de moedas fictícias de 1, 2, 5 e 10. Teste combinações que formem exatamente o alvo e escolha a de menor número de peças.',
    'Alvo 12; há moedas de 10 e 2\nMenor número de moedas: 2',
    'Se nenhuma combinação formar o alvo, informe que não há troco exato.',
    'A enumeração limitada pela disponibilidade verifica todas as combinações possíveis; `melhor` conserva a menor contagem.',
    ['Percorra todas as quantidades possíveis de cada moeda.', 'Compare o valor total com o alvo.', 'Entre combinações exatas, minimize o número de peças.'])

add(17, '''  desenho: vetor[1..5, 1..5] de caractere
  i, j: inteiro''', '''  para i de 1 ate 5 faca
    para j de 1 ate 5 faca
      se (i = 1) ou (i = 5) ou (j = 1) ou (j = 5) entao
        desenho[i, j] <- "#"
      senao
        se (i = j) e (i + j = 6) entao
          desenho[i, j] <- "X"
        senao
          se (i = j) ou (i + j = 6) entao
            desenho[i, j] <- "*"
          senao
            desenho[i, j] <- " "
          fimse
        fimse
      fimse
      escreva(desenho[i, j])
    fimpara
    escreval("")
  fimpara''',
    'Desenhe uma matriz 5 × 5: borda com #, diagonais internas com * e encontro central das diagonais com X. Borda tem prioridade nos cantos.',
    '#####\n#* *#\n# X #\n#* *#\n#####',
    'A célula central recebe X; interseções entre diagonal e borda continuam #.',
    'A ordem das condições define qual símbolo aparece quando uma célula pertence a mais de uma região.',
    ['Teste primeiro a borda.', 'Depois trate o encontro central.', 'Por fim, trate as duas diagonais.'])

add(18, '''  aberta: vetor[1..100] de logico
  rodada, porta: inteiro''', '''  para porta de 1 ate 100 faca
    aberta[porta] <- falso
  fimpara
  para rodada de 1 ate 100 faca
    para porta de rodada ate 100 passo rodada faca
      aberta[porta] <- nao aberta[porta]
    fimpara
  fimpara
  escreval("Portas abertas:")
  para porta de 1 ate 100 faca
    se aberta[porta] entao
      escreval(porta)
    fimse
  fimpara''',
    'Comece com 100 portas fechadas. Na rodada r, alterne o estado das portas múltiplas de r. Liste as portas abertas ao fim das 100 rodadas.',
    'As primeiras portas abertas são 1, 4, 9 e 16.',
    'Somente índices quadrados perfeitos terminam abertos, pois têm quantidade ímpar de divisores.',
    'O vetor lógico guarda estado; a rodada percorre seus múltiplos e inverte cada estado.',
    ['Inicialize todas as portas como fechadas.', 'Na rodada r, visite r, 2r, 3r e assim por diante.', 'Inverta o estado em cada visita.'])

add(19, '''  soma, diferenca, primeira, segunda: inteiro''', '''  escreva("Soma das idades: ")
  leia(soma)
  escreva("Diferença primeira menos segunda: ")
  leia(diferenca)
  se ((soma + diferenca) mod 2 = 0) e (soma >= 0) entao
    primeira <- (soma + diferenca) div 2
    segunda <- soma - primeira
    se (primeira >= 0) e (segunda >= 0) entao
      escreval("Idades: ", primeira, " e ", segunda)
    senao
      escreval("Não há idades não negativas com essas pistas.")
    fimse
  senao
    escreval("Não há solução inteira.")
  fimse''',
    'Leia soma de duas idades e diferença da primeira menos a segunda. Encontre idades inteiras não negativas que satisfaçam ambas as pistas.',
    'Soma 30; diferença 4\nIdades: 17 e 13',
    'Soma 31 e diferença 4 não admitem solução inteira, pois 35 é ímpar.',
    'Somar as duas equações dá duas vezes a primeira idade; a segunda é obtida pela soma original.',
    ['Escreva as duas equações.', 'Some-as para isolar a primeira idade.', 'Confira paridade e não negatividade.'])

add(20, '''  alvo, termo, soma: inteiro
  i, primeiro: inteiro''', '''  escreva("Alvo da soma acumulada: ")
  leia(alvo)
  soma <- 0
  primeiro <- 0
  para i de 1 ate 10 faca
    termo <- i * i
    soma <- soma + termo
    escreval("Termo ", i, " = ", termo, "; soma ", soma)
    se (primeiro = 0) e (soma > alvo) entao
      primeiro <- i
    fimse
  fimpara
  se primeiro > 0 entao
    escreval("Primeiro termo que supera o alvo: ", primeiro)
  senao
    escreval("Alvo não superado nos dez termos.")
  fimse''',
    'Gere os dez primeiros quadrados 1², 2², …, 10². Mostre cada termo com a soma acumulada e a primeira posição cuja soma supera um alvo informado.',
    'Alvo 5\nSomas: 1, 5, 14, …\nPrimeiro termo que supera o alvo: 3',
    'Igualdade com o alvo ainda não conta como superação.',
    'O índice é registrado apenas na primeira vez em que `soma > alvo`.',
    ['Defina a regra dos termos.', 'Some cada termo ao histórico.', 'Guarde a primeira posição de superação.'])

add(21, '''  numero, limiteInicial, limiteFinal, original, invertido, digitos, resto, tres, quatro: inteiro''', '''  escreva("Início do intervalo: ")
  leia(limiteInicial)
  escreva("Fim do intervalo: ")
  leia(limiteFinal)
  tres <- 0
  quatro <- 0
  se (limiteInicial >= 100) e (limiteFinal <= 9999) e (limiteInicial <= limiteFinal) entao
    para numero de limiteInicial ate limiteFinal faca
      original <- numero
      invertido <- 0
      digitos <- 0
      enquanto original > 0 faca
        resto <- original mod 10
        invertido <- invertido * 10 + resto
        original <- original div 10
        digitos <- digitos + 1
      fimenquanto
      se invertido = numero entao
        escreval("Capicua de ", digitos, " dígitos: ", numero)
        se digitos = 3 entao
          tres <- tres + 1
        senao
          quatro <- quatro + 1
        fimse
      fimse
    fimpara
    escreval("Total de três dígitos: ", tres)
    escreval("Total de quatro dígitos: ", quatro)
  senao
    escreval("Use intervalo dentro de 100 a 9999.")
  fimse''',
    'Consulte um intervalo de inteiros entre 100 e 9999. Liste números iguais à própria inversão e separe as contagens por três e quatro dígitos.',
    'Intervalo 120 a 140\nCapicua de três dígitos: 121, 131',
    'Um número terminado em zero não se iguala à inversão representada como inteiro, exceto zero, fora desta faixa.',
    'O laço interno reconstrói os dígitos invertidos; o contador de dígitos define o grupo do capicua.',
    ['Percorra o intervalo inteiro.', 'Inverta os dígitos por resto e divisão inteira.', 'Classifique capicuas pela quantidade de dígitos.'])

add(22, '''  frase, saida, letra: caractere
  i, codigo, deslocamento: inteiro''', '''  escreva("Frase em letras minúsculas sem acentos: ")
  leia(frase)
  saida <- ""
  para i de 1 ate compr(frase) faca
    letra <- copia(frase, i, 1)
    codigo <- asc(letra)
    se (codigo >= 97) e (codigo <= 122) entao
      deslocamento <- ((i - 1) mod 3) + 1
      saida <- saida + carac(((codigo - 97 + deslocamento) mod 26) + 97)
    senao
      saida <- saida + letra
    fimse
  fimpara
  escreval("Mensagem codificada: ", saida)''',
    'Codifique letras minúsculas com deslocamento que varia por posição: +1 na primeira, +2 na segunda, +3 na terceira e repita o ciclo. Preserve espaços e sinais.',
    'Frase abc\nMensagem codificada: bdf',
    'A posição avança inclusive sobre espaços; eles permanecem inalterados, mas influenciam o deslocamento da letra seguinte.',
    'O resto por três escolhe o deslocamento e o resto por 26 faz o alfabeto voltar ao início.',
    ['Determine o deslocamento pela posição.', 'Transforme somente códigos de a a z.', 'Use módulo 26 para circular após z.'])

add(23, '''  linha, coluna, novaLinha, novaColuna, movimentos, i: inteiro
  comando: caractere''', '''  linha <- 3
  coluna <- 3
  escreva("Quantidade de movimentos: ")
  leia(movimentos)
  para i de 1 ate movimentos faca
    escreva("Comando N/S/L/O: ")
    leia(comando)
    novaLinha <- linha
    novaColuna <- coluna
    se comando = "N" entao
      novaLinha <- linha - 1
    fimse
    se comando = "S" entao
      novaLinha <- linha + 1
    fimse
    se comando = "L" entao
      novaColuna <- coluna + 1
    fimse
    se comando = "O" entao
      novaColuna <- coluna - 1
    fimse
    se (novaLinha < 1) ou (novaLinha > 5) ou (novaColuna < 1) ou (novaColuna > 5) entao
      escreval("Saída detectada no movimento ", i)
    senao
      linha <- novaLinha
      coluna <- novaColuna
      escreval("Posição: ", linha, ",", coluna)
    fimse
  fimpara''',
    'Simule um personagem começando no centro de uma grade 5 × 5. Comandos N/S/L/O mudam uma célula; avise quando a tentativa sair do mapa e mantenha a última posição válida.',
    'Início 3,3; comandos N, N, N\nPosições 2,3; 1,3; saída detectada no movimento 3',
    'Uma saída detectada não desloca o personagem, permitindo continuar com comandos seguintes.',
    'A nova posição só substitui a atual após o teste de limites.',
    ['Guarde linha e coluna atuais.', 'Calcule uma posição candidata para cada comando.', 'Teste limites de 1 a 5 antes de atualizar.'])

add(24, '''  observacao: vetor[1..10] de real
  limiteInferior, limiteSuperior: real
  i, encontrados: inteiro''', '''  escreva("Limite inferior exclusivo: ")
  leia(limiteInferior)
  escreva("Limite superior exclusivo: ")
  leia(limiteSuperior)
  encontrados <- 0
  para i de 1 ate 10 faca
    escreva("Observação ", i, ": ")
    leia(observacao[i])
  fimpara
  para i de 1 ate 10 faca
    se (observacao[i] > limiteInferior) e (observacao[i] < limiteSuperior) entao
      escreval("Observação ", i, " compatível: ", observacao[i])
      encontrados <- encontrados + 1
    fimse
  fimpara
  escreval("Total compatível: ", encontrados)''',
    'Leia dez observações e duas condições numéricas: superar um limite inferior e ficar abaixo de um superior. Mostre apenas observações que atendem às duas.',
    'Limites 10 e 20; observações 9, 10, 15, 20, 21 e mais cinco valores fora\nCompatível: 15',
    'Valores exatamente iguais aos limites não passam no filtro.',
    'As duas comparações são combinadas com `e`; o vetor permite filtrar após todas as leituras.',
    ['Leia os limites antes das observações.', 'Use duas comparações estritas.', 'Conte somente os valores apresentados.'])

add(25, '''  inicioFaixa, fimFaixa, n, termo, quantidade: inteiro''', '''  escreva("Início da faixa: ")
  leia(inicioFaixa)
  escreva("Fim da faixa: ")
  leia(fimFaixa)
  quantidade <- 0
  para n de 1 ate 30 faca
    termo <- n * (n + 1) div 2
    se (termo >= inicioFaixa) e (termo <= fimFaixa) entao
      escreval("Triangular ", n, ": ", termo)
      quantidade <- quantidade + 1
    fimse
  fimpara
  escreval("Triangulares na faixa: ", quantidade)''',
    'Gere os trinta primeiros números triangulares pela fórmula `n(n+1)/2` e mostre os que pertencem a um intervalo inclusivo.',
    'Faixa 5 a 15\nTriangulares: 6, 10, 15',
    'Uma faixa sem termos triangulares produz contagem zero.',
    'Cada termo é calculado diretamente; as comparações inclusivas filtram a faixa.',
    ['Use a fórmula do n-ésimo triangular.', 'Percorra n de 1 a 30.', 'Compare o termo com os dois limites.'])

add(26, '''  pin, d1, d2, d3, d4, aceitos, recusados, i: inteiro''', '''  aceitos <- 0
  recusados <- 0
  para i de 1 ate 5 faca
    escreva("PIN ", i, ": ")
    leia(pin)
    se (pin >= 1000) e (pin <= 9999) entao
      d1 <- pin div 1000
      d2 <- (pin div 100) mod 10
      d3 <- (pin div 10) mod 10
      d4 <- pin mod 10
      se (d1 = d2) e (d2 = d3) e (d3 = d4) entao
        escreval("PIN recusado: dígitos iguais")
        recusados <- recusados + 1
      senao
        se (d2 = d1 + 1) e (d3 = d2 + 1) e (d4 = d3 + 1) entao
          escreval("PIN recusado: sequência crescente")
          recusados <- recusados + 1
        senao
          aceitos <- aceitos + 1
          escreval("PIN aceito")
        fimse
      fimse
    senao
      recusados <- recusados + 1
      escreval("PIN recusado: formato")
    fimse
  fimpara
  escreval("Aceitos: ", aceitos, "; recusados: ", recusados)''',
    'Leia cinco PINs inteiros. Exija quatro dígitos; rejeite quatro dígitos iguais ou quatro consecutivos crescentes; conte aceitos e recusados.',
    'PINs 1234, 7777, 2468\n1234 recusado por sequência; 7777 por repetição; 2468 aceito',
    'Esta regra não rejeita sequências decrescentes; elas ficam disponíveis para uma ampliação do exercício.',
    'Os dígitos são extraídos numericamente; cada PIN incrementa exatamente um dos dois contadores.',
    ['Valide primeiro a faixa de quatro dígitos.', 'Depois extraia e compare os dígitos.', 'Conte cada resultado uma só vez.'])

add(27, '''  mapa: vetor[1..5, 1..5] de inteiro
  visitado: vetor[1..5, 1..5] de logico
  filaLinha, filaColuna: vetor[1..25] de inteiro
  i, j, frente, fimFila, linha, coluna, novaLinha, novaColuna, direcao, saidas: inteiro''', '''  para i de 1 ate 5 faca
    para j de 1 ate 5 faca
      escreva("Célula ", i, ",", j, " (0 livre, 1 parede): ")
      leia(mapa[i, j])
      visitado[i, j] <- falso
    fimpara
  fimpara
  se mapa[3, 3] = 0 entao
    frente <- 1
    fimFila <- 1
    filaLinha[1] <- 3
    filaColuna[1] <- 3
    visitado[3, 3] <- verdadeiro
    saidas <- 0
    enquanto frente <= fimFila faca
      linha <- filaLinha[frente]
      coluna <- filaColuna[frente]
      frente <- frente + 1
      se (linha = 1) ou (linha = 5) ou (coluna = 1) ou (coluna = 5) entao
        escreval("Saída alcançável: ", linha, ",", coluna)
        saidas <- saidas + 1
      fimse
      para direcao de 1 ate 4 faca
        novaLinha <- linha
        novaColuna <- coluna
        se direcao = 1 entao
          novaLinha <- linha - 1
        fimse
        se direcao = 2 entao
          novaLinha <- linha + 1
        fimse
        se direcao = 3 entao
          novaColuna <- coluna - 1
        fimse
        se direcao = 4 entao
          novaColuna <- coluna + 1
        fimse
        se (novaLinha >= 1) e (novaLinha <= 5) e (novaColuna >= 1) e (novaColuna <= 5) entao
          se (mapa[novaLinha, novaColuna] = 0) e (nao visitado[novaLinha, novaColuna]) entao
            fimFila <- fimFila + 1
            filaLinha[fimFila] <- novaLinha
            filaColuna[fimFila] <- novaColuna
            visitado[novaLinha, novaColuna] <- verdadeiro
          fimse
        fimse
      fimpara
    fimenquanto
    escreval("Total de saídas alcançáveis: ", saidas)
  senao
    escreval("O início 3,3 está bloqueado.")
  fimse''',
    'Leia grade 5 × 5; 0 é corredor e 1 é parede. Comece no centro 3,3 e explore vizinhos ortogonais com fila. Toda célula livre alcançada na borda é uma saída.',
    'Mapa todo livre → as 16 células da borda são saídas alcançáveis.',
    'Uma célula é enfileirada uma única vez. Se o centro for parede, não há exploração.',
    'A fila realiza busca em largura; `visitado` impede ciclos e garante capacidade máxima de 25 células.',
    ['Guarde linha e coluna na fila.', 'Ao retirar uma célula, examine quatro vizinhos.', 'Enfileire apenas células livres ainda não visitadas.'])

add(28, '''  pesos: vetor[1..6] de inteiro
  mascara, melhorMascara, i, potencia, somaA, somaB, total, diferenca, melhor: inteiro''', '''  total <- 0
  para i de 1 ate 6 faca
    escreva("Peso ", i, ": ")
    leia(pesos[i])
    total <- total + pesos[i]
  fimpara
  melhor <- 999999999
  melhorMascara <- 0
  para mascara de 0 ate 63 faca
    somaA <- 0
    potencia <- 1
    para i de 1 ate 6 faca
      se (mascara div potencia) mod 2 = 1 entao
        somaA <- somaA + pesos[i]
      fimse
      potencia <- potencia * 2
    fimpara
    somaB <- total - somaA
    diferenca <- somaA - somaB
    se diferenca < 0 entao
      diferenca <- -diferenca
    fimse
    se diferenca < melhor entao
      melhor <- diferenca
      melhorMascara <- mascara
    fimse
  fimpara
  escreval("Menor diferença: ", melhor)
  potencia <- 1
  para i de 1 ate 6 faca
    se (melhorMascara div potencia) mod 2 = 1 entao
      escreval("Peso ", i, " no grupo A")
    senao
      escreval("Peso ", i, " no grupo B")
    fimse
    potencia <- potencia * 2
  fimpara''',
    'Leia seis pesos inteiros. Examine as 64 divisões possíveis entre grupos A e B e escolha uma com menor diferença absoluta entre somas.',
    'Pesos 1,2,3,4,5,5 → total 20; há uma divisão 10/10, diferença 0.',
    'Trocar os nomes dos grupos não muda a diferença; em empate, a primeira máscara testada é mantida.',
    'Cada bit da máscara decide em qual grupo fica um dos seis pesos; todas as 64 máscaras são avaliadas.',
    ['Calcule a soma total.', 'Enumere combinações por bits de 0 a 63.', 'Compare o valor absoluto da diferença das somas.'])

add(29, '''  frase, palavra, normal, invertida, caractereAtual: caractere
  i, j, encontrados: inteiro''', '''  escreva("Frase: ")
  leia(frase)
  palavra <- ""
  encontrados <- 0
  para i de 1 ate compr(frase) + 1 faca
    se i <= compr(frase) entao
      caractereAtual <- copia(frase, i, 1)
    senao
      caractereAtual <- " "
    fimse
    se caractereAtual = " " entao
      se compr(palavra) > 0 entao
        normal <- minusc(palavra)
        invertida <- ""
        para j de compr(normal) ate 1 passo -1 faca
          invertida <- invertida + copia(normal, j, 1)
        fimpara
        se normal = invertida entao
          escreval("Palíndromo: ", palavra)
          encontrados <- encontrados + 1
        fimse
      fimse
      palavra <- ""
    senao
      palavra <- palavra + caractereAtual
    fimse
  fimpara
  escreval("Palavras palíndromas: ", encontrados)''',
    'Leia uma frase cujas palavras são separadas por espaços. Compare cada palavra com sua inversão depois de converter para minúsculas.',
    'Frase: Ana viu osso\nPalíndromos: Ana, osso',
    'Pontuação grudada à palavra faz parte dela neste exercício; escreva a frase sem pontuação para obter apenas palavras.',
    'Um espaço extra ao fim do laço força o processamento da última palavra.',
    ['Acumule caracteres até encontrar espaço.', 'Converta a palavra para minúsculas.', 'Construa a inversão e compare.'])

add(30, '''  pin, alvo, d1, d2, d3, d4, soma: inteiro
  distintos, ordem: logico''', '''  escreva("Soma exigida: ")
  leia(alvo)
  escreva("PIN de quatro dígitos: ")
  leia(pin)
  se (pin >= 1000) e (pin <= 9999) entao
    d1 <- pin div 1000
    d2 <- (pin div 100) mod 10
    d3 <- (pin div 10) mod 10
    d4 <- pin mod 10
    soma <- d1 + d2 + d3 + d4
    distintos <- (d1 <> d2) e (d1 <> d3) e (d1 <> d4) e (d2 <> d3) e (d2 <> d4) e (d3 <> d4)
    ordem <- (d1 < d4) e (d2 < d3)
    se (soma = alvo) e distintos e ordem entao
      escreval("Senha válida")
    senao
      escreval("Senha inválida")
    fimse
  senao
    escreval("Senha inválida: formato")
  fimse''',
    'Leia soma-alvo e PIN inteiro de quatro dígitos. Exija soma exata dos dígitos, todos distintos e duas pistas de ordem: primeiro menor que quarto e segundo menor que terceiro.',
    'Soma 10; PIN 1234 → dígitos distintos, 1<4, 2<3, soma 10: válido',
    'PIN com zero inicial não é um inteiro de quatro dígitos nesta representação.',
    'A condição final reúne as três famílias de requisitos; a verificação de distinção compara todos os seis pares de dígitos.',
    ['Extraia cada dígito.', 'Compare todos os pares para garantir ausência de repetição.', 'Verifique soma e duas relações de ordem.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Catalog contains {len(entries)} reviewed challenge solutions")
