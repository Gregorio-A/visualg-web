# Política de bônus

**Data:** 19 de março · **Nível:** Avançado

## Objetivo

Aplique regras de bonificação a uma lista de notas e registre alterações.

## Como funciona

Aplique uma política de bônus a cinco notas: abaixo de 5 ganham 2 pontos; de 5 a menos de 8 ganham 1; de 8 em diante não ganham bônus. Teto final: 10.

## Exemplo de execução

```text
Notas originais 4, 6, 9 → notas finais 6, 7, 9
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma nota 5 recebe um ponto; uma nota 8 não recebe bônus.

## Dicas para resolução

1. Separe faixas sem sobreposição.
2. Aplique o teto depois de somar bônus.
3. Mostre antes e depois de cada posição.

## Solução

```visualg
algoritmo "Desafio0319A"
var
notas: vetor[1..5] de real
  i: inteiro
  antes: real
inicio
para i de 1 ate 5 faca
    escreva("Nota original ", i, ": ")
    leia(notas[i])
    antes <- notas[i]
    se notas[i] < 5 entao
      notas[i] <- notas[i] + 2
    senao
      se notas[i] < 8 entao
        notas[i] <- notas[i] + 1
      fimse
    fimse
    se notas[i] > 10 entao
      notas[i] <- 10
    fimse
    escreval("Nota ", i, ": ", antes, " -> ", notas[i])
  fimpara
fimalgoritmo
```

O programa guarda cada valor original antes da alteração para mostrar a mudança feita.
