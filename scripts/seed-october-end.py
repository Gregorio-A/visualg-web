#!/usr/bin/env python3
"""Daily challenges for October 24–31, beginning with the current day."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / 'data/challenge-solutions.json'
entries = json.loads(CATALOG.read_text(encoding='utf-8'))
rows = {r['data_mm_dd']: r for r in csv.DictReader((ROOT / 'data/visualg_365_dias_730_desafios.csv').open(encoding='utf-8'))}


def add(day, level, variables, body, rules, example, edge, explanation, hints):
    date = f'10-{day:02d}'
    prompt = rows[date][f'{level}_enunciado']
    code = f'algoritmo "Desafio10{day:02d}{"S" if level == "simples" else "A"}"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f'{date}/{level}'] = dict(code=code, objective=prompt[0].upper() + prompt[1:], rules=rules,
                                     example=example, edge=edge, explanation=explanation, hints=hints)


add(24, 'simples', '  numero: inteiro', '''  escreva("Número da caveira: ")
  leia(numero)
  se ((numero >= 100) e (numero <= 999)) ou ((numero <= -100) e (numero >= -999)) entao
    escreval("Possui três dígitos")
  senao
    escreval("Não possui três dígitos")
  fimse''',
    'Considere apenas os algarismos do valor absoluto; o sinal negativo não conta como dígito.',
    '-321 → possui três dígitos; 99 → não possui',
    'Zero tem um dígito. 1000 tem quatro.',
    'As duas faixas contemplam números positivos e negativos de três algarismos.',
    ['Identifique a faixa 100–999.', 'Inclua a faixa negativa equivalente.', 'Use ou para juntar as condições.'])

add(24, 'avancado', '  resposta: vetor[1..5] de inteiro\n  i, tentativa, acertos: inteiro', '''  resposta[1] <- 12
  resposta[2] <- 7
  resposta[3] <- 25
  resposta[4] <- 9
  resposta[5] <- 14
  acertos <- 0
  para i de 1 ate 5 faca
    escolha i
      caso 1
        escreval("Enigma 1: 3 vezes 4?")
      caso 2
        escreval("Enigma 2: 10 menos 3?")
      caso 3
        escreval("Enigma 3: 5 ao quadrado?")
      caso 4
        escreval("Enigma 4: metade de 18?")
      caso 5
        escreval("Enigma 5: 2 vezes 7?")
    fimescolha
    escreva("Resposta: ")
    leia(tentativa)
    se tentativa = resposta[i] entao
      acertos <- acertos + 1
      escreval("Acertou")
    senao
      escreval("Errou; resposta: ", resposta[i])
    fimse
  fimpara
  escreval("Acertos: ", acertos, " de 5")''',
    'Apresente cinco enigmas numéricos fixos, cada um com uma única resposta inteira. Aceite uma tentativa por enigma e conte acertos.',
    'Para 3 vezes 4, resposta 12 → acertou; 11 → errou',
    'Cinco respostas erradas produzem zero acertos.',
    'O índice liga o enigma apresentado à resposta no vetor; cada tentativa é comparada uma vez.',
    ['Defina as cinco respostas.', 'Percorra os enigmas.', 'Some um acerto por resposta correta.'])

add(25, 'simples', '  minutos: inteiro\n  velocidade: real', '''  escreva("Minutos de corrida: ")
  leia(minutos)
  escreva("Velocidade em metros por minuto: ")
  leia(velocidade)
  se (minutos < 0) ou (velocidade < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Distância: ", minutos * velocidade, " metros")
  fimse''',
    'Assuma velocidade constante e multiplique o tempo em minutos pela velocidade em metros por minuto.',
    '5 min a 12 m/min → 60 m', 'Zero minuto produz zero metro.',
    'Unidades compatíveis resultam em distância em metros.',
    ['Leia tempo e velocidade.', 'Multiplique.', 'Mostre metros.'])

add(25, 'avancado', '  perseguidor, fugitivo, vp, vf, turnos, i: inteiro\n  alcancou: logico', '''  escreva("Posição inicial do perseguidor: ")
  leia(perseguidor)
  escreva("Posição inicial do fugitivo: ")
  leia(fugitivo)
  escreva("Velocidade por turno do perseguidor: ")
  leia(vp)
  escreva("Velocidade por turno do fugitivo: ")
  leia(vf)
  escreva("Quantidade máxima de turnos: ")
  leia(turnos)
  se (vp < 0) ou (vf < 0) ou (turnos < 0) entao
    escreval("Dados inválidos")
  senao
    alcancou <- perseguidor >= fugitivo
    i <- 0
    enquanto (i < turnos) e (nao alcancou) faca
      i <- i + 1
      perseguidor <- perseguidor + vp
      fugitivo <- fugitivo + vf
      escreval("Turno ", i, ": perseguidor ", perseguidor, "; fugitivo ", fugitivo)
      se perseguidor >= fugitivo entao
        alcancou <- verdadeiro
      fimse
    fimenquanto
    se alcancou entao
      escreval("Alcançado no turno ", i)
    senao
      escreval("Não alcançado em ", turnos, " turnos")
    fimse
  fimse''',
    'Ambos correm na direção crescente da reta. A cada turno, some a velocidade à posição. A captura ocorre quando o perseguidor iguala ou ultrapassa o fugitivo.',
    'P=0, F=6, velocidades 3 e 1 → captura no turno 3',
    'Se já começa à frente ou na mesma posição, a captura é no turno zero.',
    'O laço termina ao alcançar ou ao atingir o limite de turnos.',
    ['Guarde duas posições.', 'Atualize as duas em cada turno.', 'Confira se houve alcance.'])

add(26, 'simples', '  a, b, c, maior: real', '''  escreva("Preço do doce 1: ")
  leia(a)
  escreva("Preço do doce 2: ")
  leia(b)
  escreva("Preço do doce 3: ")
  leia(c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Preço inválido")
  senao
    maior <- a
    se b > maior entao
      maior <- b
    fimse
    se c > maior entao
      maior <- c
    fimse
    escreval("Maior preço: R$ ", maior)
  fimse''',
    'Leia três preços não negativos e exiba o maior.',
    'R$ 3, R$ 5 e R$ 4 → R$ 5', 'Empates mostram o mesmo valor máximo.',
    'Comece com um preço e substitua o máximo sempre que encontrar um valor superior.',
    ['Guarde o primeiro como maior.', 'Compare com o segundo.', 'Compare com o terceiro.'])

add(26, 'avancado', '  estoque: vetor[1..3] de inteiro\n  preco: vetor[1..3] de real\n  i, item, quantidade: inteiro\n  subtotal, total: real', '''  para i de 1 ate 3 faca
    escreva("Estoque do doce ", i, ": ")
    leia(estoque[i])
    escreva("Preço unitário: ")
    leia(preco[i])
  fimpara
  total <- 0
  escreva("Doce (1 a 3; 0 fecha carrinho): ")
  leia(item)
  enquanto item <> 0 faca
    se (item >= 1) e (item <= 3) entao
      escreva("Quantidade: ")
      leia(quantidade)
      se (quantidade > 0) e (quantidade <= estoque[item]) e (preco[item] >= 0) entao
        subtotal <- quantidade * preco[item]
        se quantidade >= 3 entao
          subtotal <- subtotal * 0.9
        fimse
        total <- total + subtotal
        estoque[item] <- estoque[item] - quantidade
        escreval("Subtotal: R$ ", subtotal, "; estoque restante: ", estoque[item])
      senao
        escreval("Item indisponível ou quantidade inválida")
      fimse
    senao
      escreval("Doce desconhecido")
    fimse
    escreva("Doce (1 a 3; 0 fecha carrinho): ")
    leia(item)
  fimenquanto
  escreval("Total do carrinho: R$ ", total)''',
    'Cadastre estoque e preço de três doces. Cada entrada do carrinho compra uma quantidade de um doce; três ou mais unidades na mesma entrada recebem 10% de desconto.',
    'Doce a R$ 5; compra de 3 → subtotal R$ 13,50 e estoque reduzido em 3',
    'Pedido superior ao estoque é recusado e não altera total nem estoque.',
    'O desconto é calculado antes de somar o subtotal, e o estoque muda apenas após validar a compra.',
    ['Use vetores paralelos para preço e estoque.', 'Valide quantidade.', 'Aplique a promoção antes de somar.'])

add(27, 'simples', '  fileiras, velasPorFileira: inteiro', '''  escreva("Fileiras: ")
  leia(fileiras)
  escreva("Velas por fileira: ")
  leia(velasPorFileira)
  se (fileiras < 0) ou (velasPorFileira < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Total de velas: ", fileiras * velasPorFileira)
  fimse''',
    'Considere fileiras iguais e multiplique número de fileiras por velas em cada uma.',
    '4 fileiras de 6 → 24 velas', 'Zero fileiras resulta em zero velas.',
    'A multiplicação soma a mesma quantidade de velas em cada fileira.',
    ['Leia duas quantidades.', 'Multiplique.', 'Mostre o total.'])

add(27, 'avancado', '  lampada: vetor[1..3, 1..4] de inteiro\n  linha, coluna, acao, total: inteiro', '''  para linha de 1 ate 3 faca
    para coluna de 1 ate 4 faca
      lampada[linha, coluna] <- 0
    fimpara
  fimpara
  escreva("Linha a alternar (1 a 3; 0 encerra): ")
  leia(acao)
  enquanto acao <> 0 faca
    se (acao >= 1) e (acao <= 3) entao
      para coluna de 1 ate 4 faca
        lampada[acao, coluna] <- 1 - lampada[acao, coluna]
      fimpara
    senao
      escreval("Interruptor inválido")
    fimse
    escreva("Linha a alternar (1 a 3; 0 encerra): ")
    leia(acao)
  fimenquanto
  total <- 0
  para linha de 1 ate 3 faca
    para coluna de 1 ate 4 faca
      escreva(lampada[linha, coluna], " ")
      total <- total + lampada[linha, coluna]
    fimpara
    escreval("")
  fimpara
  escreval("Lâmpadas acesas: ", total)''',
    'Organize 12 lâmpadas apagadas em matriz 3×4. Cada interruptor alterna as quatro lâmpadas de uma linha; zero encerra e mostra o estado.',
    'Acione linha 2 uma vez → quatro lâmpadas acesas; duas vezes → zero',
    'Interruptor fora de 1 a 3 não altera a matriz.',
    'A expressão 1 menos estado alterna 0 para 1 e 1 para 0.',
    ['Inicie a matriz com zeros.', 'Percorra as colunas da linha selecionada.', 'Some os estados ao final.'])

add(28, 'simples', '  palavra, invertida: caractere\n  i: inteiro', '''  escreva("Palavra: ")
  leia(palavra)
  invertida <- ""
  para i de compr(palavra) ate 1 passo -1 faca
    invertida <- invertida + copia(palavra, i, 1)
  fimpara
  escreval("Invertida: ", invertida)''',
    'Leia uma palavra sem espaços e exiba os caracteres na ordem inversa.',
    'GATO → OTAG', 'Uma palavra de um caractere permanece igual.',
    'O laço visita cada posição a partir do último caractere.',
    ['Use compr para obter o tamanho.', 'Leia caracteres de trás para frente.', 'Acumule na saída.'])

add(28, 'avancado', '  palavras: vetor[1..5] de caractere\n  contagem: vetor[1..26] de inteiro\n  i, j, k, letra, iguais: inteiro\n  inversa: caractere', '''  para i de 1 ate 5 faca
    escreva("Palavra ", i, " (letras minúsculas, sem acentos): ")
    leia(palavras[i])
    inversa <- ""
    para j de compr(palavras[i]) ate 1 passo -1 faca
      inversa <- inversa + copia(palavras[i], j, 1)
    fimpara
    se palavras[i] = inversa entao
      escreval(palavras[i], " é palíndromo")
    fimse
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se compr(palavras[i]) = compr(palavras[j]) entao
        para k de 1 ate 26 faca
          contagem[k] <- 0
        fimpara
        para k de 1 ate compr(palavras[i]) faca
          letra <- asc(copia(palavras[i], k, 1)) - 96
          se (letra >= 1) e (letra <= 26) entao
            contagem[letra] <- contagem[letra] + 1
          fimse
          letra <- asc(copia(palavras[j], k, 1)) - 96
          se (letra >= 1) e (letra <= 26) entao
            contagem[letra] <- contagem[letra] - 1
          fimse
        fimpara
        iguais <- 1
        para k de 1 ate 26 faca
          se contagem[k] <> 0 entao
            iguais <- 0
          fimse
        fimpara
        se iguais = 1 entao
          escreval(palavras[i], " e ", palavras[j], " são anagramas")
        fimse
      fimse
    fimpara
  fimpara''',
    'Cadastre cinco palavras apenas com letras minúsculas de a a z. Identifique palíndromos e todos os pares que têm as mesmas frequências de letras.',
    'arara → palíndromo; amor e roma → anagramas',
    'Palavras de tamanhos diferentes nunca são anagramas; acentos e espaços ficam fora da entrada definida.',
    'A inversão verifica palíndromo; um vetor de 26 posições compara frequências de letras para anagramas.',
    ['Inverta cada palavra.', 'Compare todos os pares.', 'Conte letras de cada par com sinais opostos.'])

add(29, 'simples', '  preco, desconto: real', '''  escreva("Preço da fantasia: ")
  leia(preco)
  escreva("Desconto percentual: ")
  leia(desconto)
  se (preco < 0) ou (desconto < 0) ou (desconto > 100) entao
    escreval("Dados inválidos")
  senao
    escreval("Preço final: R$ ", preco * (1 - desconto / 100))
  fimse''',
    'Calcule o valor a pagar depois do desconto percentual.',
    'R$ 50 com 20% de desconto → R$ 40', 'Desconto de 100% resulta em preço zero.',
    'A fração restante do preço é um menos o desconto dividido por cem.',
    ['Converta percentual em fração.', 'Subtraia de 1.', 'Multiplique pelo preço.'])

add(29, 'avancado', '  estoque: vetor[1..3] de inteiro\n  i, tamanho, participantes, atendidos: inteiro', '''  para i de 1 ate 3 faca
    escreva("Peças do tamanho ", i, " (1 P, 2 M, 3 G): ")
    leia(estoque[i])
    se estoque[i] < 0 entao
      estoque[i] <- 0
    fimse
  fimpara
  escreva("Participantes: ")
  leia(participantes)
  atendidos <- 0
  se participantes > 0 entao
    para i de 1 ate participantes faca
      escreva("Tamanho pedido (1 P, 2 M, 3 G): ")
      leia(tamanho)
      se (tamanho >= 1) e (tamanho <= 3) entao
        se estoque[tamanho] > 0 entao
          estoque[tamanho] <- estoque[tamanho] - 1
          atendidos <- atendidos + 1
          escreval("Peça entregue ao participante ", i)
        senao
          escreval("Tamanho esgotado")
        fimse
      senao
        escreval("Tamanho inválido")
      fimse
    fimpara
  fimse
  escreval("Atendidos: ", atendidos)
  para i de 1 ate 3 faca
    escreval("Restante tamanho ", i, ": ", estoque[i])
  fimpara''',
    'Cada participante pede uma peça P, M ou G; entregue apenas quando houver estoque naquele tamanho. Informe atendidos e saldo por tamanho.',
    'Estoque P=1; dois pedidos P → primeiro atendido, segundo sem peça',
    'Tamanho desconhecido não altera estoque.',
    'O tamanho é usado como índice do estoque e cada entrega subtrai uma unidade.',
    ['Associe P, M e G a 1, 2 e 3.', 'Valide índice e saldo.', 'Decremente somente após a entrega.'])

add(30, 'simples', '  primeiro, segundo, terceiro: inteiro', '''  escreva("Convidados do grupo 1: ")
  leia(primeiro)
  escreva("Convidados do grupo 2: ")
  leia(segundo)
  escreva("Convidados do grupo 3: ")
  leia(terceiro)
  se (primeiro < 0) ou (segundo < 0) ou (terceiro < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Total de convidados: ", primeiro + segundo + terceiro)
  fimse''',
    'Some os convidados de três grupos.',
    '3, 5 e 2 → 10 convidados', 'Grupo vazio contribui com zero.',
    'O total reúne as três quantidades independentes.',
    ['Leia os três grupos.', 'Some.', 'Mostre o total.'])

add(30, 'avancado', '  convite, dentro: vetor[1..20] de inteiro\n  i, codigo, quantidade, lotacao, ocupacao, acao, posicao: inteiro', '''  escreva("Lotação máxima: ")
  leia(lotacao)
  escreva("Convites emitidos (máximo 20): ")
  leia(quantidade)
  se (lotacao < 0) ou (quantidade < 0) ou (quantidade > 20) entao
    escreval("Dados inválidos")
  senao
    para i de 1 ate quantidade faca
      escreva("Código do convite ", i, ": ")
      leia(convite[i])
      dentro[i] <- 0
    fimpara
    ocupacao <- 0
    escreva("Ação (1 entrada, 2 saída, 3 histórico atual, 0 encerra): ")
    leia(acao)
    enquanto acao <> 0 faca
      se (acao = 1) ou (acao = 2) entao
        escreva("Código: ")
        leia(codigo)
        posicao <- 0
        para i de 1 ate quantidade faca
          se convite[i] = codigo entao
            posicao <- i
          fimse
        fimpara
        se posicao = 0 entao
          escreval("Convite inexistente")
        senao
          se acao = 1 entao
            se (dentro[posicao] = 0) e (ocupacao < lotacao) entao
              dentro[posicao] <- 1
              ocupacao <- ocupacao + 1
              escreval("Entrada autorizada: ", codigo)
            senao
              escreval("Entrada negada")
            fimse
          senao
            se dentro[posicao] = 1 entao
              dentro[posicao] <- 0
              ocupacao <- ocupacao - 1
              escreval("Saída registrada: ", codigo)
            senao
              escreval("Saída negada")
            fimse
          fimse
        fimse
      senao
        se acao = 3 entao
          escreval("Ocupação: ", ocupacao, "/", lotacao)
          para i de 1 ate quantidade faca
            escreval("Convite ", convite[i], ": estado ", dentro[i])
          fimpara
        fimse
      fimse
      escreva("Ação (1 entrada, 2 saída, 3 histórico atual, 0 encerra): ")
      leia(acao)
    fimenquanto
  fimse''',
    'Cadastre até vinte códigos únicos de convite. Entradas respeitam lotação e impedem uso simultâneo do mesmo convite. Saídas liberam a vaga.',
    'Lotação 1; convite 10 entra; convite 11 tenta entrar → negado; 10 sai; 11 entra',
    'O cadastro pressupõe códigos distintos. Saída sem presença é recusada.',
    'O vetor de estados registra quem está dentro; o contador atualiza ocupação em cada evento autorizado.',
    ['Procure o código do convite.', 'Confira estado e lotação.', 'Atualize presença e ocupação juntos.'])

add(31, 'simples', '  desenho: caractere', '''  escreval("  /\\  ")
  escreval(" (^^) ")
  escreval("  \\/  ")''',
    'Imprima três linhas fixas de arte em texto representando uma abóbora estilizada.',
    '  /\\  \n (^^) \n  \\/  ', 'Não é necessária entrada do usuário.',
    'Cada chamada a escreval produz uma linha do desenho.',
    ['Planeje as três linhas.', 'Use uma saída por linha.', 'Confira barras invertidas nas strings.'])

add(31, 'avancado', '  sala, acao, chave, mapa, venceu: inteiro', '''  sala <- 1
  chave <- 0
  mapa <- 0
  venceu <- 0
  enquanto venceu = 0 faca
    escreval("Sala atual: ", sala, " (1 entrada, 2 biblioteca, 3 torre, 4 portão)")
    escolha sala
      caso 1
        escreval("Um corredor leva à biblioteca e ao portão.")
      caso 2
        escreval("Um livro antigo guarda um mapa.")
      caso 3
        escreval("A chave do portão está na torre.")
      caso 4
        escreval("O portão exige a chave.")
    fimescolha
    escreva("Ação (1 biblioteca, 2 torre, 3 portão, 4 explorar, 0 sair): ")
    leia(acao)
    se acao = 0 entao
      escreval("Aventura encerrada")
      venceu <- 2
    senao
      se acao = 1 entao
        sala <- 2
      senao
        se acao = 2 entao
          se mapa = 1 entao
            sala <- 3
          senao
            escreval("A torre está escondida. Procure um mapa.")
          fimse
        senao
          se acao = 3 entao
            sala <- 4
            se chave = 1 entao
              escreval("Você abriu o portão e escapou!")
              venceu <- 1
            senao
              escreval("Portão trancado")
            fimse
          senao
            se acao = 4 entao
              se sala = 2 entao
                mapa <- 1
                escreval("Mapa encontrado: a torre agora é acessível")
              senao
                se sala = 3 entao
                  chave <- 1
                  escreval("Chave encontrada")
                senao
                  escreval("Nenhum objeto aqui")
                fimse
              fimse
            fimse
          fimse
        fimse
      fimse
    fimse
  fimenquanto''',
    'Explore quatro salas. Pegue o mapa na biblioteca para encontrar a torre; pegue a chave na torre e abra o portão. Zero encerra sem vitória.',
    'Biblioteca → explorar (mapa) → torre → explorar (chave) → portão → escapou',
    'Visitar o portão sem chave não vence; o jogador pode continuar explorando.',
    'Variáveis de estado guardam sala, mapa e chave. A condição de vitória exige a chave ao usar o portão.',
    ['Guarde estados dos objetos.', 'Associe opções às salas.', 'Teste a chave para vencer.'])

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Catalogued {len(entries)} challenge solutions')
