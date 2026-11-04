# Editor ASCII

**Data:** 19 de agosto · **Nível:** Avançado

## Objetivo

Represente imagem em matriz de caracteres e implemente preenchimento de área conexa.

## Como funciona

Leia imagem 5×5 de letras. A partir de um pixel, substitua a cor de toda a área conexa da mesma cor por outra letra; conexão é vertical ou horizontal.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Pixels A em (1,1) e (1,2) mudam juntos para B; A apenas diagonal não muda
```

Se a nova cor já for igual à original, nenhuma célula muda.

## Dicas para resolução

1. Guarde cor original.
2. Explore quatro vizinhos válidos.
3. Pinte ao inserir na fila.

## Solução

```visualg
algoritmo "Desafio0819A"
var
imagem: vetor[1..5, 1..5] de caractere
  filaL, filaC: vetor[1..25] de inteiro
  linha, coluna, inicioFila, fimFila, atualL, atualC, novoL, novoC, direcao, total: inteiro
  original, novaCor: caractere
inicio
para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      escreva("Pixel (", linha, ",", coluna, ") como letra: ")
      leia(imagem[linha, coluna])
    fimpara
  fimpara
  escreva("Linha e coluna iniciais: ")
  leia(linha, coluna)
  escreva("Nova letra de cor: ")
  leia(novaCor)
  total <- 0
  se (linha >= 1) e (linha <= 5) e (coluna >= 1) e (coluna <= 5) entao
    original <- imagem[linha, coluna]
    se original <> novaCor entao
      inicioFila <- 1
      fimFila <- 1
      filaL[1] <- linha
      filaC[1] <- coluna
      imagem[linha, coluna] <- novaCor
      total <- 1
      enquanto inicioFila <= fimFila faca
        atualL <- filaL[inicioFila]
        atualC <- filaC[inicioFila]
        inicioFila <- inicioFila + 1
        para direcao de 1 ate 4 faca
          novoL <- atualL
          novoC <- atualC
          escolha direcao
            caso 1
              novoL <- novoL - 1
            caso 2
              novoL <- novoL + 1
            caso 3
              novoC <- novoC - 1
            caso 4
              novoC <- novoC + 1
          fimescolha
          se (novoL >= 1) e (novoL <= 5) e (novoC >= 1) e (novoC <= 5) entao
            se imagem[novoL, novoC] = original entao
              imagem[novoL, novoC] <- novaCor
              fimFila <- fimFila + 1
              filaL[fimFila] <- novoL
              filaC[fimFila] <- novoC
              total <- total + 1
            fimse
          fimse
        fimpara
      fimenquanto
    fimse
  fimse
  para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      escreva(imagem[linha, coluna])
    fimpara
    escreval("")
  fimpara
  escreval("Pixels alterados: ", total)
fimalgoritmo
```

Uma fila percorre a região e pinta cada pixel antes de inseri-lo para não visitá-lo duas vezes.
