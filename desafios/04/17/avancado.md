# Quadrado vazado

**Data:** 17 de abril · **Nível:** Avançado

## Objetivo

Desenhe bordas e diagonais em matriz, tratando encontros de símbolos.

## Como funciona

Desenhe uma matriz 5 × 5: borda com #, diagonais internas com * e encontro central das diagonais com X. Borda tem prioridade nos cantos.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Diagonal:** É uma sequência de posições que atravessa uma tabela de um canto a outro.

## Exemplo de execução

```text
#####
#* *#
# X #
#* *#
#####
```

A célula central recebe X; interseções entre diagonal e borda continuam #.

## Dicas para resolução

1. Teste primeiro a borda.
2. Depois trate o encontro central.
3. Por fim, trate as duas diagonais.

## Solução

```visualg
algoritmo "Desafio0417A"
var
desenho: vetor[1..5, 1..5] de caractere
  i, j: inteiro
inicio
para i de 1 ate 5 faca
    para j de 1 ate 5 faca
      se (i = 1) ou (i = 5) ou (j = 1) ou (j = 5) entao
        desenho[i, j] <- "#"
      senao
        se (i = j) e (i + j = 6) entao
          desenho[i, j] <- "X"
        senao
          se (i = j) ou (i + j = 6) entao
            desenho[i, j] <- "*"
          senao
            desenho[i, j] <- " "
          fimse
        fimse
      fimse
      escreva(desenho[i, j])
    fimpara
    escreval("")
  fimpara
fimalgoritmo
```

A ordem das condições define qual símbolo aparece quando uma célula pertence a mais de uma região.
