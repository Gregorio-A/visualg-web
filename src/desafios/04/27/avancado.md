# Labirinto de corredores

**Data:** 27 de abril · **Nível:** Avançado

## Objetivo

Receba grade 5×5 e identifique saídas alcançáveis por exploração com fila.

## Como funciona

Leia grade 5 × 5; 0 é corredor e 1 é parede. Comece no centro 3,3 e explore vizinhos ortogonais com fila. Toda célula livre alcançada na borda é uma saída.

## Exemplo de execução

```text
Mapa todo livre → as 16 células da borda são saídas alcançáveis.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma célula é enfileirada uma única vez. Se o centro for parede, não há exploração.

## Dicas para resolução

1. Guarde linha e coluna na fila.
2. Ao retirar uma célula, examine quatro vizinhos.
3. Enfileire apenas células livres ainda não visitadas.

## Solução

```visualg
algoritmo "Desafio0427A"
var
mapa: vetor[1..5, 1..5] de inteiro
  visitado: vetor[1..5, 1..5] de logico
  filaLinha, filaColuna: vetor[1..25] de inteiro
  i, j, frente, fimFila, linha, coluna, novaLinha, novaColuna, direcao, saidas: inteiro
inicio
para i de 1 ate 5 faca
    para j de 1 ate 5 faca
      escreva("Célula ", i, ",", j, " (0 livre, 1 parede): ")
      leia(mapa[i, j])
      visitado[i, j] <- falso
    fimpara
  fimpara
  se mapa[3, 3] = 0 entao
    frente <- 1
    fimFila <- 1
    filaLinha[1] <- 3
    filaColuna[1] <- 3
    visitado[3, 3] <- verdadeiro
    saidas <- 0
    enquanto frente <= fimFila faca
      linha <- filaLinha[frente]
      coluna <- filaColuna[frente]
      frente <- frente + 1
      se (linha = 1) ou (linha = 5) ou (coluna = 1) ou (coluna = 5) entao
        escreval("Saída alcançável: ", linha, ",", coluna)
        saidas <- saidas + 1
      fimse
      para direcao de 1 ate 4 faca
        novaLinha <- linha
        novaColuna <- coluna
        se direcao = 1 entao
          novaLinha <- linha - 1
        fimse
        se direcao = 2 entao
          novaLinha <- linha + 1
        fimse
        se direcao = 3 entao
          novaColuna <- coluna - 1
        fimse
        se direcao = 4 entao
          novaColuna <- coluna + 1
        fimse
        se (novaLinha >= 1) e (novaLinha <= 5) e (novaColuna >= 1) e (novaColuna <= 5) entao
          se (mapa[novaLinha, novaColuna] = 0) e (nao visitado[novaLinha, novaColuna]) entao
            fimFila <- fimFila + 1
            filaLinha[fimFila] <- novaLinha
            filaColuna[fimFila] <- novaColuna
            visitado[novaLinha, novaColuna] <- verdadeiro
          fimse
        fimse
      fimpara
    fimenquanto
    escreval("Total de saídas alcançáveis: ", saidas)
  senao
    escreval("O início 3,3 está bloqueado.")
  fimse
fimalgoritmo
```

A fila realiza busca em largura; `visitado` impede ciclos e garante capacidade máxima de 25 células.
