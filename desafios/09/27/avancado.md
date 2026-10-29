# Colônia de formigas

**Data:** 27 de setembro · **Nível:** Avançado

## Objetivo

Simule deslocamentos em grade e conte visitas a cada posição.

## Como funciona

A formiga começa no centro de uma grade 5×5. Leia doze movimentos; movimentos fora da grade são ignorados. Mostre quantas vezes cada posição foi visitada.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
De (3,3), direita e esquerda → (3,3) visitada duas vezes, (3,4) uma
```

**Como ler o exemplo:** a seta → significa "resulta em".

Comando diferente de 1–4 não altera a posição, mas a posição atual já foi contada.

## Dicas para resolução

1. Inicialize a matriz com zero.
2. Valide o movimento proposto.
3. Incremente a célula após mover.

## Solução

```visualg
algoritmo "Desafio0927A"
var
visita: vetor[1..5, 1..5] de inteiro
  linha, coluna, novaL, novaC, i, tecla: inteiro
inicio
para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      visita[linha, coluna] <- 0
    fimpara
  fimpara
  linha <- 3
  coluna <- 3
  visita[linha, coluna] <- 1
  para i de 1 ate 12 faca
    escreva("Movimento ", i, " (1 cima, 2 direita, 3 baixo, 4 esquerda): ")
    leia(tecla)
    novaL <- linha
    novaC <- coluna
    escolha tecla
      caso 1
        novaL <- novaL - 1
      caso 2
        novaC <- novaC + 1
      caso 3
        novaL <- novaL + 1
      caso 4
        novaC <- novaC - 1
    fimescolha
    se (novaL >= 1) e (novaL <= 5) e (novaC >= 1) e (novaC <= 5) entao
      linha <- novaL
      coluna <- novaC
      visita[linha, coluna] <- visita[linha, coluna] + 1
    fimse
  fimpara
  para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      escreva(visita[linha, coluna], " ")
    fimpara
    escreval("")
  fimpara
fimalgoritmo
```

A matriz registra o número de chegadas em cada célula, incluindo a posição inicial.
