# Mapa de neve

**Data:** 15 de julho · **Nível:** Avançado

## Objetivo

Receba matriz de intensidades e conte regiões conectadas acima do limiar.

## Como funciona

Uma região é formada por células de matriz 4×4 com intensidade estritamente acima do limiar, conectadas na vertical ou horizontal. Conte as regiões.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Duas células altas lado a lado formam uma região; separadas por célula baixa formam duas
```

Diagonal sozinha não conecta duas células.

## Dicas para resolução

1. Use matriz de visitados.
2. Inicie uma fila em cada célula alta não visitada.
3. Explore quatro vizinhos por célula.

## Solução

```visualg
algoritmo "Desafio0715A"
var
neve, visitado: vetor[1..4, 1..4] de inteiro
  filaL, filaC: vetor[1..16] de inteiro
  linha, coluna, limiar, regioes, inicioFila, fimFila, atualL, atualC, novoL, novoC, direcao: inteiro
inicio
escreva("Limiar de neve: ")
  leia(limiar)
  para linha de 1 ate 4 faca
    para coluna de 1 ate 4 faca
      escreva("Intensidade em (", linha, ",", coluna, "): ")
      leia(neve[linha, coluna])
      visitado[linha, coluna] <- 0
    fimpara
  fimpara
  regioes <- 0
  para linha de 1 ate 4 faca
    para coluna de 1 ate 4 faca
      se (neve[linha, coluna] > limiar) e (visitado[linha, coluna] = 0) entao
        regioes <- regioes + 1
        inicioFila <- 1
        fimFila <- 1
        filaL[1] <- linha
        filaC[1] <- coluna
        visitado[linha, coluna] <- 1
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
            se (novoL >= 1) e (novoL <= 4) e (novoC >= 1) e (novoC <= 4) entao
              se (neve[novoL, novoC] > limiar) e (visitado[novoL, novoC] = 0) entao
                fimFila <- fimFila + 1
                filaL[fimFila] <- novoL
                filaC[fimFila] <- novoC
                visitado[novoL, novoC] <- 1
              fimse
            fimse
          fimpara
        fimenquanto
      fimse
    fimpara
  fimpara
  escreval("Regiões de neve acima do limiar: ", regioes)
fimalgoritmo
```

A busca em largura marca todas as células da região antes de procurar a próxima origem.
