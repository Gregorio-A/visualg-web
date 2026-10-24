# Verificador de bingo

**Data:** 12 de junho · **Nível:** Avançado

## Objetivo

Analise cartela marcada e detecte linha, coluna ou diagonal completa.

## Como funciona

Leia uma matriz 5×5 de zeros e uns. Um trajeto completo contém cinco marcas; verifique cinco linhas, cinco colunas e duas diagonais.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Diagonal:** É uma sequência de posições que atravessa uma tabela de um canto a outro.

## Exemplo de execução

```text
Primeira linha com cinco valores 1 → linha 1 completa
```

**Como ler o exemplo:** a seta → significa "resulta em".

A entrada deve conter somente 0 e 1; outros números são fora do modelo.

## Dicas para resolução

1. Some cada linha.
2. Some cada coluna.
3. Confira as duas diagonais.

## Solução

```visualg
algoritmo "Desafio0612A"
var
marcado: vetor[1..5, 1..5] de inteiro
  linha, coluna, completas, somaLinha, somaColuna, diagonal1, diagonal2: inteiro
inicio
para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      escreva("Casa ", linha, ",", coluna, " marcada? (0/1): ")
      leia(marcado[linha, coluna])
    fimpara
  fimpara
  completas <- 0
  diagonal1 <- 0
  diagonal2 <- 0
  para linha de 1 ate 5 faca
    somaLinha <- 0
    somaColuna <- 0
    para coluna de 1 ate 5 faca
      somaLinha <- somaLinha + marcado[linha, coluna]
      somaColuna <- somaColuna + marcado[coluna, linha]
    fimpara
    se somaLinha = 5 entao
      escreval("Linha ", linha, " completa")
      completas <- completas + 1
    fimse
    se somaColuna = 5 entao
      escreval("Coluna ", linha, " completa")
      completas <- completas + 1
    fimse
    diagonal1 <- diagonal1 + marcado[linha, linha]
    diagonal2 <- diagonal2 + marcado[linha, 6 - linha]
  fimpara
  se diagonal1 = 5 entao
    escreval("Diagonal principal completa")
    completas <- completas + 1
  fimse
  se diagonal2 = 5 entao
    escreval("Diagonal secundária completa")
    completas <- completas + 1
  fimse
  escreval("Trajetos completos: ", completas)
fimalgoritmo
```

As somas de linhas, colunas e diagonais detectam todos os trajetos possíveis.
