# Coreografia da quadrilha

**Data:** 3 de junho · **Nível:** Avançado

## Objetivo

Armazene comandos de movimento e simule posições dos pares numa grade.

## Como funciona

Simule dois pares numa grade 5×5 por até dez comandos. Cada comando escolhe o par e uma das quatro direções; movimentos fora da grade são ignorados.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Par 1 começa em (2,2); direita → (2,3)
```

**Como ler o exemplo:** a seta → significa "resulta em".

Comando zero encerra antes dos dez passos. Dois pares podem ocupar a mesma célula nesta versão.

## Dicas para resolução

1. Guarde linha e coluna dos dois pares.
2. Associe direção à coordenada.
3. Confira limite 1–5 antes da mudança.

## Solução

```visualg
algoritmo "Desafio0603A"
var
comando: vetor[1..10] de inteiro
  pares: vetor[1..2, 1..2] de inteiro
  i, par, movimento: inteiro
inicio
pares[1, 1] <- 2
  pares[1, 2] <- 2
  pares[2, 1] <- 4
  pares[2, 2] <- 4
  escreval("Grade 5x5; pares em (2,2) e (4,4)")
  para i de 1 ate 10 faca
    escreva("Comando ", i, " (0 parar; 1 cima, 2 direita, 3 baixo, 4 esquerda): ")
    leia(comando[i])
    se comando[i] = 0 entao
      escreval("Coreografia encerrada")
      interrompa
    fimse
    escreva("Par (1 ou 2): ")
    leia(par)
    se (par >= 1) e (par <= 2) entao
      escolha comando[i]
        caso 1
          se pares[par, 1] > 1 entao
            pares[par, 1] <- pares[par, 1] - 1
          fimse
        caso 2
          se pares[par, 2] < 5 entao
            pares[par, 2] <- pares[par, 2] + 1
          fimse
        caso 3
          se pares[par, 1] < 5 entao
            pares[par, 1] <- pares[par, 1] + 1
          fimse
        caso 4
          se pares[par, 2] > 1 entao
            pares[par, 2] <- pares[par, 2] - 1
          fimse
      fimescolha
      escreval("Par ", par, " em (", pares[par, 1], ",", pares[par, 2], ")")
    fimse
  fimpara
fimalgoritmo
```

A matriz guarda linha e coluna de cada par; a direção altera só uma coordenada dentro dos limites.
