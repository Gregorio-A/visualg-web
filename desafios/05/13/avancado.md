# Entregas em regiões

**Data:** 13 de maio · **Nível:** Avançado

## Objetivo

Calcule taxas por distância e agrupe pedidos por rota definida.

## Como funciona

Use distância inteira positiva: rota 1 até 5 km (R$ 5), rota 2 até 15 km (R$ 10), rota 3 acima de 15 km (R$ 18). Zero encerra.

## Exemplo de execução

```text
Distâncias 4, 12 e 19 km
Uma entrega em cada rota; taxas R$ 5, R$ 10 e R$ 18
```

Distância negativa é ignorada e não altera os totais.

## Dicas para resolução

1. Crie três contadores.
2. Classifique cada distância por faixa.
3. Some a taxa na rota correspondente.

## Solução

```visualg
algoritmo "Desafio0513A"
var
pedidos: vetor[1..3] de inteiro
  receita: vetor[1..3] de real
  i, rota, distancia: inteiro
  taxa: real
inicio
para i de 1 ate 3 faca
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
  fimpara
fimalgoritmo
```

A faixa determina simultaneamente o grupo da rota e a taxa fixa acumulada.
