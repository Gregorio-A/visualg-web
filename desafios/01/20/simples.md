# Jogos de praia

**Data:** 20 de janeiro · **Nível:** Simples

## Objetivo

Receba partidas ganhas e perdidas e calcule o total.

Calcule quantas partidas foram jogadas somando vitórias e derrotas.

## Como funciona

Leia duas quantidades inteiras não negativas e apresente a soma.

## Exemplo de execução

```text
Partidas ganhas: 4
Partidas perdidas: 2
Total de partidas: 6
```

Com zero vitórias e zero derrotas, o total é zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0120S"
var
ganhas, perdidas, total: inteiro
inicio
escreva("Partidas ganhas: ")
  leia(ganhas)
  escreva("Partidas perdidas: ")
  leia(perdidas)
  se (ganhas >= 0) e (perdidas >= 0) entao
    total <- ganhas + perdidas
    escreval("Total de partidas: ", total)
  senao
    escreval("Quantidades inválidas.")
  fimse
fimalgoritmo
```

O total é a soma das duas categorias informadas no enunciado.
