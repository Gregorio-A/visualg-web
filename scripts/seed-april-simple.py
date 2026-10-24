#!/usr/bin/env python3
"""Curated simple April exercises."""

import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "data/challenge-solutions.json"
entries = json.loads(CATALOG.read_text(encoding="utf-8"))
rows = {r["data_mm_dd"]: r for r in csv.DictReader((ROOT / "data/visualg_365_dias_730_desafios.csv").open(encoding="utf-8"))}


def add(day, variables, body, rules, example, edge, explanation):
    date = f"04-{day:02d}"
    prompt = rows[date]["simples_enunciado"]
    code = f'algoritmo "Desafio04{day:02d}S"\nvar\n{variables.strip()}\ninicio\n{body.strip()}\nfimalgoritmo'
    entries[f"{date}/simples"] = dict(
        code=code, objective=prompt[0].upper() + prompt[1:] + " Mostre o resultado no console.",
        rules=rules, example=example, edge=edge, explanation=explanation,
        hints=["Identifique entradas e saída antes de escrever o algoritmo.",
               "Use a operação ou estrutura de controle indicada pelas regras.",
               "Confirme o caso de fronteira e depois compare com a solução."])


add(1, '  numero: real', '''  escreva("Número: ")
  leia(numero)
  se numero > 0 entao
    escreval("Positivo")
  senao
    se numero < 0 entao
      escreval("Negativo")
    senao
      escreval("Zero")
    fimse
  fimse''',
    'Leia um número real e classifique-o em positivo, negativo ou zero.',
    'Número: -4\nNegativo',
    'Zero não pertence a nenhuma das duas classes de sinal e tem saída própria.',
    'As duas comparações estritas deixam o caso zero para o último ramo.')

add(2, '  numero, dezena, unidade: inteiro', '''  escreva("Número de dois dígitos: ")
  leia(numero)
  se (numero >= 10) e (numero <= 99) entao
    dezena <- numero div 10
    unidade <- numero mod 10
    escreval("Soma dos algarismos: ", dezena + unidade)
  senao
    escreval("Informe um inteiro de 10 a 99.")
  fimse''',
    'Aceite um inteiro de 10 a 99. Separe dezena pela divisão inteira e unidade pelo resto da divisão por 10.',
    'Número: 47\nSoma dos algarismos: 11',
    'O número 10 produz soma 1.',
    '`div` e `mod` extraem os dois algarismos sem converter o número para texto.')

add(3, '  primeiro, segundo: real', '''  escreva("Primeiro valor: ")
  leia(primeiro)
  escreva("Segundo valor: ")
  leia(segundo)
  escreval(segundo)
  escreval(primeiro)''',
    'Leia dois valores e apresente primeiro o segundo, depois o primeiro.',
    'Entradas: 4 e 9\n9\n4',
    'Valores iguais aparecem duas vezes, sem alteração.',
    'A ordem da saída é inversa à ordem das leituras.')

add(4, '  numero, resto, invertido: inteiro', '''  escreva("Inteiro não negativo: ")
  leia(numero)
  invertido <- 0
  se numero >= 0 entao
    repita
      resto <- numero mod 10
      invertido <- invertido * 10 + resto
      numero <- numero div 10
    ate numero = 0
    escreval("Dígitos invertidos: ", invertido)
  senao
    escreval("Informe um inteiro não negativo.")
  fimse''',
    'Leia inteiro não negativo. Retire algarismos da direita para a esquerda e forme outro inteiro nessa ordem.',
    'Número: 1234\nDígitos invertidos: 4321',
    'Zeros à esquerda do resultado não aparecem em uma variável inteira: 120 vira 21.',
    'Multiplicar o resultado por 10 antes de acrescentar o próximo algarismo desloca os dígitos já montados.')

add(5, '  numero: inteiro', '''  escreva("Número: ")
  leia(numero)
  se numero mod 5 = 0 entao
    escreval("Múltiplo de cinco")
  senao
    escreval("Não é múltiplo de cinco")
  fimse''',
    'Leia um inteiro e confira se seu resto ao dividir por cinco é zero.',
    'Número: 25\nMúltiplo de cinco',
    'Zero é múltiplo de cinco.',
    'O operador `mod` testa divisibilidade sem precisar dividir em número real.')

add(6, '  numero, centena, dezena, unidade: inteiro', '''  escreva("Número de três algarismos: ")
  leia(numero)
  se (numero >= 100) e (numero <= 999) entao
    centena <- numero div 100
    dezena <- (numero div 10) mod 10
    unidade <- numero mod 10
    se (centena = dezena) e (dezena = unidade) entao
      escreval("Todos os dígitos são iguais")
    senao
      escreval("Os dígitos não são todos iguais")
    fimse
  senao
    escreval("Informe inteiro de 100 a 999")
  fimse''',
    'Aceite inteiro de 100 a 999 e compare centena, dezena e unidade.',
    'Número: 777\nTodos os dígitos são iguais',
    'O valor 707 não tem todos os dígitos iguais.',
    'A condição exige igualdade nos dois pares consecutivos de algarismos.')

add(7, '  numero, i: inteiro', '''  escreva("N: ")
  leia(numero)
  para i de numero ate 1 passo -1 faca
    escreval(i)
  fimpara''',
    'Leia N positivo e imprima todos os inteiros de N até 1.',
    'N: 3\n3\n2\n1',
    'Para N igual a zero, não há números a imprimir.',
    'O laço usa passo negativo para diminuir o contador.')

add(8, '  a, b: inteiro', '''  escreva("Primeiro inteiro: ")
  leia(a)
  escreva("Segundo inteiro: ")
  leia(b)
  se ((a mod 2 = 0) e (b mod 2 = 0)) ou ((a mod 2 <> 0) e (b mod 2 <> 0)) entao
    escreval("Mesma paridade")
  senao
    escreval("Paridades diferentes")
  fimse''',
    'Dois inteiros têm a mesma paridade quando ambos são pares ou ambos são ímpares.',
    'Primeiro: 4; segundo: 8\nMesma paridade',
    'Números negativos também são pares ou ímpares; use a comparação entre restos com cuidado.',
    'Comparar os restos por dois identifica se ambos pertencem à mesma classe.')

add(9, '  linhas, i, j: inteiro', '''  escreva("Linhas: ")
  leia(linhas)
  para i de 1 ate linhas faca
    para j de 1 ate i faca
      escreva("#")
    fimpara
    escreval("")
  fimpara''',
    'Leia N e desenhe N linhas: a linha i contém exatamente i sinais #.',
    'Linhas: 3\n#\n##\n###',
    'Com zero linhas, nada é desenhado.',
    'O laço interno depende do número da linha, aumentando o comprimento a cada volta externa.')

add(10, '  a, b, c, menor: real', '''  escreva("Número 1: ")
  leia(a)
  escreva("Número 2: ")
  leia(b)
  escreva("Número 3: ")
  leia(c)
  menor <- a
  se b < menor entao
    menor <- b
  fimse
  se c < menor entao
    menor <- c
  fimse
  escreval("Menor: ", menor)''',
    'Leia três valores e mantenha o menor encontrado até o momento.',
    'Números: 8, 2, 5\nMenor: 2',
    'A comparação funciona também quando todos os números são negativos.',
    'Começar pelo primeiro valor evita escolher zero indevidamente como mínimo.')

add(11, '  dobro, original: real', '''  escreva("Dobro do número: ")
  leia(dobro)
  original <- dobro / 2
  escreval("Número original: ", original)''',
    'Leia o valor que corresponde ao dobro de um número e divida-o por dois.',
    'Dobro: 18\nNúmero original: 9',
    'O dobro pode ser negativo ou fracionário; a divisão continua válida.',
    'Dividir por dois desfaz a multiplicação pelo fator dois.')

add(12, '  numero: real', '''  escreva("Número: ")
  leia(numero)
  se (numero >= 10) e (numero <= 20) entao
    escreval("Entre 10 e 20")
  senao
    escreval("Fora de 10 a 20")
  fimse''',
    'Considere o intervalo fechado de 10 até 20, inclusive as duas extremidades.',
    'Número: 15\nEntre 10 e 20',
    'Os valores 10 e 20 pertencem ao intervalo.',
    'As duas comparações são ligadas por `e` porque ambas precisam valer.')

add(13, '  opcaoBotao: inteiro', '''  escreva("Botão (1 a 3): ")
  leia(opcaoBotao)
  se opcaoBotao = 1 entao
    escreval("Função 1: acender a luz")
  senao
    se opcaoBotao = 2 entao
      escreval("Função 2: abrir a porta")
    senao
      se opcaoBotao = 3 entao
        escreval("Função 3: tocar o alarme")
      senao
        escreval("Botão inválido")
      fimse
    fimse
  fimse''',
    'Associe os números 1, 2 e 3 a funções fixas da máquina e rejeite qualquer outro número.',
    'Botão: 2\nFunção 2: abrir a porta',
    'Entrada zero ou quatro não aciona nenhuma função.',
    'As condições escolhem somente a mensagem correspondente ao botão informado.')

add(14, '  palavra: caractere', '''  escreva("Palavra: ")
  leia(palavra)
  se compr(palavra) > 0 entao
    escreval("Primeira letra: ", copia(palavra, 1, 1))
  senao
    escreval("Palavra vazia")
  fimse''',
    'Leia um texto e apresente somente o primeiro caractere.',
    'Palavra: segredo\nPrimeira letra: s',
    'Uma entrada vazia não possui primeira letra.',
    '`copia` extrai um caractere a partir da posição 1.')

add(15, '  numero: real', '''  escreva("Número: ")
  leia(numero)
  se numero < 0 entao
    numero <- -numero
  fimse
  escreval("Valor não negativo: ", numero)''',
    'Leia um número. Se for negativo, troque seu sinal; caso contrário, mantenha o valor.',
    'Número: -7\nValor não negativo: 7',
    'Zero permanece zero.',
    'A negação aritmética substitui uma função pronta de valor absoluto.')

add(16, '  valor: inteiro', '''  escreva("Valor inteiro em reais: ")
  leia(valor)
  se valor >= 0 entao
    escreval("Moedas de R$ 1 necessárias: ", valor)
  senao
    escreval("Valor inválido")
  fimse''',
    'Leia um valor inteiro não negativo em reais. Cada moeda de R$ 1 cobre exatamente uma unidade.',
    'Valor: 7\nMoedas de R$ 1 necessárias: 7',
    'Valor zero exige zero moeda.',
    'A quantidade de moedas é numericamente igual ao valor inteiro.')

add(17, '  lado, linha, coluna: inteiro', '''  escreva("Lado do quadrado: ")
  leia(lado)
  para linha de 1 ate lado faca
    para coluna de 1 ate lado faca
      escreva("#")
    fimpara
    escreval("")
  fimpara''',
    'Leia N e imprima N linhas de N sinais # para formar um quadrado preenchido.',
    'Lado: 3\n###\n###\n###',
    'Com lado zero, nenhuma linha aparece.',
    'Os dois laços controlam linhas e colunas independentemente.')

add(18, '  quantidade, i: inteiro', '''  escreva("Número de portas: ")
  leia(quantidade)
  para i de 1 ate quantidade faca
    se i mod 2 = 0 entao
      escreval("Porta ", i, ": ABERTA")
    senao
      escreval("Porta ", i, ": FECHADA")
    fimse
  fimpara''',
    'Leia N e mostre estado de cada índice de porta de 1 a N: pares abertos, ímpares fechados.',
    'Número de portas: 3\nPorta 1: FECHADA\nPorta 2: ABERTA\nPorta 3: FECHADA',
    'A porta 1 é ímpar e deve aparecer fechada.',
    'O resto por dois identifica índices pares.')

add(19, '  idade, dobro, anos: inteiro', '''  escreva("Idade atual: ")
  leia(idade)
  se idade >= 0 entao
    dobro <- idade * 2
    anos <- dobro - idade
    escreval("Daqui a ", anos, " ano(s) terá ", dobro, " anos")
  senao
    escreval("Idade inválida")
  fimse''',
    'Leia idade atual e determine quantos anos devem transcorrer para que a idade seja o dobro da atual.',
    'Idade atual: 12\nDaqui a 12 anos terá 24 anos',
    'Para idade atual zero, o dobro também é zero e a diferença é zero ano.',
    'Dobro menos idade atual é igual à própria idade atual.')

add(20, '  limite, i, soma: inteiro', '''  escreva("N: ")
  leia(limite)
  soma <- 0
  para i de 1 ate limite faca
    soma <- soma + i
  fimpara
  escreval("Soma: ", soma)''',
    'Leia N não negativo e some todos os inteiros de 1 até N.',
    'N: 4\nSoma: 10',
    'Para N zero, a soma permanece zero.',
    'O acumulador recebe cada número visitado pelo laço.')

add(21, '  numero, centena, unidade: inteiro', '''  escreva("Número de três dígitos: ")
  leia(numero)
  se (numero >= 100) e (numero <= 999) entao
    centena <- numero div 100
    unidade <- numero mod 10
    se centena = unidade entao
      escreval("Capicua")
    senao
      escreval("Não é capicua")
    fimse
  senao
    escreval("Informe inteiro de 100 a 999")
  fimse''',
    'Um número de três dígitos é capicua se a centena é igual à unidade.',
    'Número: 121\nCapicua',
    'O dígito central pode ter qualquer valor.',
    'A comparação entre primeiro e último dígito basta para um número de três algarismos.')

add(22, '  letra: caractere\n  codigo: inteiro', '''  escreva("Letra maiúscula: ")
  leia(letra)
  se compr(letra) = 1 entao
    codigo <- asc(letra)
    se (codigo >= 65) e (codigo <= 90) entao
      se letra = "Z" entao
        escreval("A")
      senao
        escreval(carac(codigo + 1))
      fimse
    senao
      escreval("Não é letra maiúscula de A a Z")
    fimse
  senao
    escreval("Informe exatamente uma letra")
  fimse''',
    'Leia uma letra maiúscula de A a Z e mostre a próxima no alfabeto, com Z retornando a A.',
    'Letra: Z\nA',
    'Um texto de mais de uma letra é rejeitado.',
    'O código do caractere seguinte é uma unidade maior, exceto na volta de Z a A.')

add(23, '  direcao: caractere', '''  escreva("Comando (N/S/L/O): ")
  leia(direcao)
  se direcao = "N" entao
    escreval("Norte")
  senao
    se direcao = "S" entao
      escreval("Sul")
    senao
      se direcao = "L" entao
        escreval("Leste")
      senao
        se direcao = "O" entao
          escreval("Oeste")
        senao
          escreval("Comando inválido")
        fimse
      fimse
    fimse
  fimse''',
    'Traduza os códigos N, S, L e O para os nomes completos dos pontos cardeais.',
    'Comando: L\nLeste',
    'Uma letra diferente dos quatro códigos não indica direção válida.',
    'Cada ramo corresponde a um dos códigos possíveis.')

add(24, '  numero, positivos, i: inteiro', '''  positivos <- 0
  para i de 1 ate 5 faca
    escreva("Número ", i, ": ")
    leia(numero)
    se numero > 0 entao
      positivos <- positivos + 1
    fimse
  fimpara
  escreval("Positivos: ", positivos)''',
    'Leia cinco inteiros e conte somente os estritamente maiores que zero.',
    'Números: -1, 0, 2, 3, 4\nPositivos: 3',
    'Zero não é positivo.',
    'O contador começa em zero e aumenta apenas após a comparação positiva.')

add(25, '  limite, i, total: inteiro', '''  escreva("N: ")
  leia(limite)
  total <- 0
  para i de 1 ate limite faca
    total <- total + i
  fimpara
  escreval("1 + ... + N = ", total)''',
    'Leia N e calcule a soma dos inteiros consecutivos de 1 até N.',
    'N: 5\n1 + ... + N = 15',
    'Para N zero, a soma é zero.',
    'O acumulador recebe cada termo da série uma vez.')

add(26, '  pin: inteiro', '''  escreva("PIN de quatro dígitos: ")
  leia(pin)
  se (pin >= 1000) e (pin <= 9999) e (pin mod 2 = 0) entao
    escreval("PIN válido")
  senao
    escreval("PIN inválido")
  fimse''',
    'Aceite um PIN numérico inteiro entre 1000 e 9999 cujo último dígito seja par.',
    'PIN: 2468\nPIN válido',
    'Um PIN iniciado por zero não é representável como inteiro de quatro dígitos neste exercício.',
    'O último algarismo é par exatamente quando o número inteiro é par.')

add(27, '  tamanho, i: inteiro', '''  escreva("Comprimento da parede: ")
  leia(tamanho)
  para i de 1 ate tamanho faca
    escreva("#")
  fimpara
  escreval("")''',
    'Leia N e desenhe uma única linha com N sinais #.',
    'Comprimento: 4\n####',
    'Para N zero, a linha é vazia.',
    '`escreva` mantém todos os caracteres na mesma linha; `escreval` a encerra.')

add(28, '  a, b, c, d, somaA, somaB: real', '''  escreva("Valor A1: ")
  leia(a)
  escreva("Valor A2: ")
  leia(b)
  escreva("Valor B1: ")
  leia(c)
  escreva("Valor B2: ")
  leia(d)
  somaA <- a + b
  somaB <- c + d
  se somaA > somaB entao
    escreval("Primeira soma é maior: ", somaA)
  senao
    se somaB > somaA entao
      escreval("Segunda soma é maior: ", somaB)
    senao
      escreval("As duas somas são iguais: ", somaA)
    fimse
  fimse''',
    'Leia dois pares de números. Some cada par e compare os dois resultados.',
    'Primeiro par: 2 e 5; segundo par: 3 e 1\nPrimeira soma é maior: 7',
    'Somas iguais devem produzir mensagem de empate.',
    'Comparar as somas depois de calculadas evita confundir valores individuais com os totais.')

add(29, '  palavra: caractere\n  i: inteiro', '''  escreva("Palavra: ")
  leia(palavra)
  para i de compr(palavra) ate 1 passo -1 faca
    escreva(copia(palavra, i, 1))
  fimpara
  escreval("")''',
    'Leia uma palavra e imprima seus caracteres do último para o primeiro.',
    'Palavra: mapa\napam',
    'Uma palavra de um caractere não muda.',
    '`compr` fornece a posição final e `copia` extrai um caractere em cada passo decrescente.')

add(30, '  numero, algarismo, soma: inteiro', '''  escreva("Inteiro positivo: ")
  leia(numero)
  soma <- 0
  se numero > 0 entao
    enquanto numero > 0 faca
      algarismo <- numero mod 10
      soma <- soma + algarismo
      numero <- numero div 10
    fimenquanto
    escreval("Soma dos algarismos: ", soma)
  senao
    escreval("Informe inteiro positivo")
  fimse''',
    'Leia um inteiro positivo e some todos os seus dígitos decimais.',
    'Número: 2034\nSoma dos algarismos: 9',
    'Zeros internos contribuem com zero. O valor de entrada deve ser maior que zero.',
    'O resto por dez extrai o último dígito; a divisão inteira o remove antes da próxima iteração.')

CATALOG.write_text(json.dumps(entries, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
print(f"Catalog contains {len(entries)} reviewed challenge solutions")
