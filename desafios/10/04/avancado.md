# Enxame de morcegos

**Data:** 4 de outubro · **Nível:** Avançado

## Objetivo

Simule posições em matriz e conte criaturas em cada quadrante.

## Como funciona

Matriz 6×6 representa morcegos por célula. Divida em quatro quadrantes 3×3 e some as criaturas de cada um.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Um morcego em (1,1) entra no quadrante 1; dois em (5,5) no quadrante 4
```

Número negativo de morcegos é tratado como zero.

## Dicas para resolução

1. Use matriz 6×6.
2. Calcule quadrante pela linha e coluna.
3. Acumule a contagem.

## Solução

```visualg
algoritmo "Desafio1004A"
var
morcego: vetor[1..6, 1..6] de inteiro
  contagem: vetor[1..4] de inteiro
  linha, coluna, quadrante, i: inteiro
inicio
para i de 1 ate 4 faca
    contagem[i] <- 0
  fimpara
  para linha de 1 ate 6 faca
    para coluna de 1 ate 6 faca
      escreva("Morcegos na célula ", linha, ",", coluna, ": ")
      leia(morcego[linha, coluna])
      quadrante <- 1
      se coluna > 3 entao
        quadrante <- quadrante + 1
      fimse
      se linha > 3 entao
        quadrante <- quadrante + 2
      fimse
      se morcego[linha, coluna] > 0 entao
        contagem[quadrante] <- contagem[quadrante] + morcego[linha, coluna]
      fimse
    fimpara
  fimpara
  para i de 1 ate 4 faca
    escreval("Quadrante ", i, ": ", contagem[i], " morcego(s)")
  fimpara
fimalgoritmo
```

A posição relativa à terceira linha e coluna determina o quadrante.
