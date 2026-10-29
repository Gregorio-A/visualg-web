# Analisador de partidas

**Data:** 14 de agosto · **Nível:** Avançado

## Objetivo

Encontre maior sequência de vitórias e taxa de aproveitamento em histórico.

## Como funciona

Em dez partidas, 1 significa vitória e 0 derrota. Conte vitórias, a maior sequência consecutiva e o percentual de aproveitamento.

## Exemplo de execução

```text
Resultados 1,1,0,1 → maior sequência 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Entrada diferente de 1 é tratada como derrota.

## Dicas para resolução

1. Conte vitórias totais.
2. Reinicie a sequência na derrota.
3. Compare com o máximo.

## Solução

```visualg
algoritmo "Desafio0814A"
var
resultado: vetor[1..10] de inteiro
  i, vitorias, atual, maior: inteiro
inicio
vitorias <- 0
  atual <- 0
  maior <- 0
  para i de 1 ate 10 faca
    escreva("Partida ", i, " (1 vitória, 0 derrota): ")
    leia(resultado[i])
    se resultado[i] = 1 entao
      vitorias <- vitorias + 1
      atual <- atual + 1
      se atual > maior entao
        maior <- atual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  escreval("Maior sequência de vitórias: ", maior)
  escreval("Aproveitamento: ", vitorias * 10, "%")
fimalgoritmo
```

Cada vitória em dez partidas representa dez pontos percentuais de aproveitamento.
