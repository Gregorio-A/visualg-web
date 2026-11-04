# Distribuição de brindes

**Data:** 13 de dezembro · **Nível:** Avançado

## Objetivo

Atribua modelos de brinde a grupos, com limites de estoque.

## Como funciona

Cada grupo pede um modelo e recebe todos os brindes solicitados ou nenhum; não substitua por outro modelo.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Estoque 5 do modelo 1, grupo de 3 e depois grupo de 4 → primeiro atendido, segundo rejeitado.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Grupo com zero pessoas não consome estoque.

## Dicas para resolução

1. Guarde estoque por modelo.
2. Compare pedido com saldo.
3. Subtraia somente quando atender.

## Solução

```visualg
algoritmo "Desafio1213A"
var
  grupo: vetor[1..3] de inteiro
  estoque: vetor[1..3] de inteiro
  modelo, pessoas, i, atendidos: inteiro
inicio
  para i de 1 ate 3 faca
    escreva("Estoque do modelo ", i, ": ")
    leia(estoque[i])
    se estoque[i] < 0 entao
      estoque[i] <- 0
    fimse
    grupo[i] <- 0
  fimpara
  atendidos <- 0
  para i de 1 ate 6 faca
    repita
      escreva("Grupo ", i, " (modelo 1–3) e pessoas: ")
      leia(modelo, pessoas)
    ate (modelo >= 1) e (modelo <= 3) e (pessoas >= 0)
    se estoque[modelo] >= pessoas entao
      estoque[modelo] <- estoque[modelo]-pessoas
      grupo[modelo] <- grupo[modelo]+pessoas
      atendidos <- atendidos+pessoas
      escreval("Grupo atendido")
    senao
      escreval("Estoque insuficiente para este grupo; faltam ", pessoas-estoque[modelo])
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Modelo ", i, ": distribuídos ", grupo[i], "; estoque ", estoque[i])
  fimpara
  escreval("Pessoas atendidas: ", atendidos)
fimalgoritmo
```

O vetor de estoque é atualizado apenas quando a demanda inteira cabe.
