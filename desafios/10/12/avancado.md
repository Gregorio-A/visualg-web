# Teia geométrica

**Data:** 12 de outubro · **Nível:** Avançado

## Objetivo

Desenhe padrões em matriz com linhas, diagonais e pontos de interseção.

## Como funciona

Desenhe teia 7×7: linha e coluna centrais e as duas diagonais recebem asterisco; o cruzamento central recebe O.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Diagonal:** É uma sequência de posições que atravessa uma tabela de um canto a outro.

## Exemplo de execução

```text
*  *  *
 * * *
  ***
***O***
  ***
 * * *
*  *  *
Interseção central: 1
```

Células que pertencem a mais de uma linha são impressas uma só vez na matriz.

## Dicas para resolução

1. Percorra matriz 7×7.
2. Teste eixos e diagonais.
3. Marque o centro por último.

## Solução

```visualg
algoritmo "Desafio1012A"
var
teia: vetor[1..7, 1..7] de caractere
  linha, coluna, intersecoes: inteiro
inicio
intersecoes <- 0
  para linha de 1 ate 7 faca
    para coluna de 1 ate 7 faca
      teia[linha, coluna] <- " "
      se (linha = 4) ou (coluna = 4) ou (linha = coluna) ou (linha + coluna = 8) entao
        teia[linha, coluna] <- "*"
      fimse
      se (linha = 4) e (coluna = 4) entao
        teia[linha, coluna] <- "O"
        intersecoes <- intersecoes + 1
      fimse
      escreva(teia[linha, coluna])
    fimpara
    escreval("")
  fimpara
  escreval("Interseção central: ", intersecoes)
fimalgoritmo
```

Condições de linha, coluna e diagonais determinam os pontos da figura.
