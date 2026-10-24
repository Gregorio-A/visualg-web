# Cartela de bingo

**Data:** 11 de junho · **Nível:** Avançado

## Objetivo

Armazene cartela 5×5 e marque números sem contar repetidos.

## Como funciona

Cadastre uma cartela 5×5 com números únicos. Leia dez sorteios e marque cada casa no máximo uma vez, mesmo se o número sair repetido.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Cartela contém 7 uma vez; sorteios 7 e 7 → uma casa marcada
```

**Como ler o exemplo:** a seta → significa "resulta em".

Número ausente não aumenta os acertos.

## Dicas para resolução

1. Use uma matriz para números.
2. Use outra para marcas.
3. Conte somente a passagem de 0 para 1.

## Solução

```visualg
algoritmo "Desafio0611A"
var
numero, marcado: vetor[1..5, 1..5] de inteiro
  linha, coluna, sorteio, rodada, acertos: inteiro
inicio
para linha de 1 ate 5 faca
    para coluna de 1 ate 5 faca
      escreva("Número da cartela ", linha, ",", coluna, ": ")
      leia(numero[linha, coluna])
      marcado[linha, coluna] <- 0
    fimpara
  fimpara
  acertos <- 0
  para rodada de 1 ate 10 faca
    escreva("Número sorteado ", rodada, ": ")
    leia(sorteio)
    para linha de 1 ate 5 faca
      para coluna de 1 ate 5 faca
        se (numero[linha, coluna] = sorteio) e (marcado[linha, coluna] = 0) entao
          marcado[linha, coluna] <- 1
          acertos <- acertos + 1
          escreval("Marcado em (", linha, ",", coluna, ")")
        fimse
      fimpara
    fimpara
  fimpara
  escreval("Casas marcadas: ", acertos)
fimalgoritmo
```

A segunda matriz registra o estado de cada casa e evita contagem duplicada.
