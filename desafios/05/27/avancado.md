# Monitor de preços

**Data:** 27 de maio · **Nível:** Avançado

## Objetivo

Guarde histórico semanal e encontre maior queda percentual por produto.

## Como funciona

Leia quatro preços semanais de três produtos. Compare semanas consecutivas e encontre a maior queda percentual positiva.

### Palavras úteis

- **Porcentagem:** É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100.

## Exemplo de execução

```text
Produto A: 100, 80, 80, 60
Maior queda: 25%, da semana 3 para 4
```

Preço anterior zero não pode servir como divisor e é ignorado.

## Dicas para resolução

1. Compare semanas adjacentes.
2. Divida a diferença pelo preço anterior.
3. Guarde produto e semana da maior queda.

## Solução

```visualg
algoritmo "Desafio0527A"
var
nome: vetor[1..3] de caractere
  preco: vetor[1..3, 1..4] de real
  i, semana, melhorProduto, melhorSemana: inteiro
  queda, maior: real
inicio
maior <- -1
  para i de 1 ate 3 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    para semana de 1 ate 4 faca
      escreva("Preço da semana ", semana, ": ")
      leia(preco[i, semana])
    fimpara
  fimpara
  para i de 1 ate 3 faca
    para semana de 2 ate 4 faca
      se (preco[i, semana - 1] > 0) e (preco[i, semana] >= 0) entao
        queda <- 100 * (preco[i, semana - 1] - preco[i, semana]) / preco[i, semana - 1]
        se queda > maior entao
          maior <- queda
          melhorProduto <- i
          melhorSemana <- semana
        fimse
      fimse
    fimpara
  fimpara
  se maior < 0 entao
    escreval("Nenhum par válido para comparação")
  senao
    se maior <= 0 entao
      escreval("Nenhuma queda de preço")
    senao
      escreval("Maior queda: ", nome[melhorProduto], ", semana ", melhorSemana - 1, " para ", melhorSemana, ": ", maior, "%")
    fimse
  fimse
fimalgoritmo
```

A porcentagem usa o preço da semana anterior como base, por isso quedas absolutas iguais podem ter percentuais distintos.
