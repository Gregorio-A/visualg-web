# Iluminação do cemitério

**Data:** 27 de outubro · **Nível:** Avançado

## Objetivo

Simule interruptores para conjuntos de lâmpadas em matriz.

## Como funciona

Organize 12 lâmpadas apagadas em matriz 3×4. Cada interruptor alterna as quatro lâmpadas de uma linha; zero encerra e mostra o estado.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Acione linha 2 uma vez → quatro lâmpadas acesas; duas vezes → zero
```

**Como ler o exemplo:** a seta → significa "resulta em".

Interruptor fora de 1 a 3 não altera a matriz.

## Dicas para resolução

1. Inicie a matriz com zeros.
2. Percorra as colunas da linha selecionada.
3. Some os estados ao final.

## Solução

```visualg
algoritmo "Desafio1027A"
var
lampada: vetor[1..3, 1..4] de inteiro
  linha, coluna, acao, total: inteiro
inicio
para linha de 1 ate 3 faca
    para coluna de 1 ate 4 faca
      lampada[linha, coluna] <- 0
    fimpara
  fimpara
  escreva("Linha a alternar (1 a 3; 0 encerra): ")
  leia(acao)
  enquanto acao <> 0 faca
    se (acao >= 1) e (acao <= 3) entao
      para coluna de 1 ate 4 faca
        lampada[acao, coluna] <- 1 - lampada[acao, coluna]
      fimpara
    senao
      escreval("Interruptor inválido")
    fimse
    escreva("Linha a alternar (1 a 3; 0 encerra): ")
    leia(acao)
  fimenquanto
  total <- 0
  para linha de 1 ate 3 faca
    para coluna de 1 ate 4 faca
      escreva(lampada[linha, coluna], " ")
      total <- total + lampada[linha, coluna]
    fimpara
    escreval("")
  fimpara
  escreval("Lâmpadas acesas: ", total)
fimalgoritmo
```

A expressão 1 menos estado alterna 0 para 1 e 1 para 0.
