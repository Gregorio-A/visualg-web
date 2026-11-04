# Desenho de bandeirinhas

**Data:** 1 de junho · **Nível:** Avançado

## Objetivo

Gere padrão alternado de cores em uma matriz e conte peças por cor.

## Como funciona

Monte quatro fileiras de seis bandeirinhas. Use A quando linha + coluna for par e Z caso contrário; conte cada cor.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Primeira fileira: A Z A Z A Z
Total: 12 amarelas e 12 azuis
```

As cores alternam também na passagem de uma linha para a próxima.

## Dicas para resolução

1. Use matriz 4×6.
2. Teste a paridade de linha + coluna.
3. Conte as duas cores.

## Solução

```visualg
algoritmo "Desafio0601A"
var
bandeira: vetor[1..4, 1..6] de inteiro
  linha, coluna, amarelas, azuis: inteiro
inicio
amarelas <- 0
  azuis <- 0
  para linha de 1 ate 4 faca
    para coluna de 1 ate 6 faca
      se (linha + coluna) mod 2 = 0 entao
        bandeira[linha, coluna] <- 1
        amarelas <- amarelas + 1
        escreva("A ")
      senao
        bandeira[linha, coluna] <- 2
        azuis <- azuis + 1
        escreva("Z ")
      fimse
    fimpara
    escreval("")
  fimpara
  escreval("Amarelas: ", amarelas, "; azuis: ", azuis)
fimalgoritmo
```

A paridade da soma dos índices gera o padrão de tabuleiro em toda a matriz.
