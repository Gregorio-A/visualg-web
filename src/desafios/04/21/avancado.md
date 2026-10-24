# Palíndromos em lote

**Data:** 21 de abril · **Nível:** Avançado

## Objetivo

Percorra um intervalo e agrupe números capicuas por quantidade de dígitos.

## Como funciona

Consulte um intervalo de inteiros entre 100 e 9999. Liste números iguais à própria inversão e separe as contagens por três e quatro dígitos.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Intervalo 120 a 140
Capicua de três dígitos: 121, 131
```

Um número terminado em zero não se iguala à inversão representada como inteiro, exceto zero, fora desta faixa.

## Dicas para resolução

1. Percorra o intervalo inteiro.
2. Inverta os dígitos por resto e divisão inteira.
3. Classifique capicuas pela quantidade de dígitos.

## Solução

```visualg
algoritmo "Desafio0421A"
var
numero, limiteInicial, limiteFinal, original, invertido, digitos, resto, tres, quatro: inteiro
inicio
escreva("Início do intervalo: ")
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
  fimse
fimalgoritmo
```

O laço interno reconstrói os dígitos invertidos; o contador de dígitos define o grupo do capicua.
