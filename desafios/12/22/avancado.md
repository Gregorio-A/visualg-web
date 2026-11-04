# Relatório de mensagens

**Data:** 22 de dezembro · **Nível:** Avançado

## Objetivo

Identifique dia de maior envio e média semanal a partir de vetor.

## Como funciona

Considere uma semana de sete dias. Em empate pelo maior envio, escolha o primeiro dia.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Valores 1,2,3,4,5,6,7 → total 28, média 4, maior no dia 7.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se todos forem zero, o primeiro dia é o maior por convenção.

## Dicas para resolução

1. Use um vetor de sete posições.
2. Some e compare durante a leitura.
3. Divida o total por sete.

## Solução

```visualg
algoritmo "Desafio1222A"
var
  mensagens: vetor[1..7] de inteiro
  i, total, maior, dia: inteiro
  media: real
inicio
  total <- 0
  maior <- -1
  dia <- 0
  para i de 1 ate 7 faca
    repita
      escreva("Mensagens no dia ", i, ": ")
      leia(mensagens[i])
    ate mensagens[i] >= 0
    total <- total+mensagens[i]
    se mensagens[i] > maior entao
      maior <- mensagens[i]
      dia <- i
    fimse
  fimpara
  media <- total/7
  escreval("Total semanal: ", total)
  escreval("Média diária: ", media:0:2)
  escreval("Maior envio: dia ", dia, " com ", maior)
fimalgoritmo
```

Acumule as sete contagens e atualize o máximo enquanto percorre o vetor.
