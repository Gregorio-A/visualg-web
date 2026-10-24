# Diário de despesas

**Data:** 14 de janeiro · **Nível:** Avançado

## Objetivo

Registre dez gastos categorizados e mostre totais por categoria e saldo.

Organize dez gastos de viagem por categoria e mostre quanto resta do orçamento.

## Como funciona

Use três categorias fixas: transporte, alimentação e lazer. Leia categoria e valor de dez lançamentos; descarte categoria desconhecida ou valor negativo. Some cada categoria e subtraia o gasto total do orçamento.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.
- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
Orçamento: 100; gastos válidos: transporte 20, alimentação 15, lazer 5; outros sete gastos de 0
Transporte: 20
Alimentação: 15
Lazer: 5
Saldo: 60
```

O saldo pode ser negativo se os gastos válidos ultrapassarem o orçamento.

## Dicas para resolução

1. Defina códigos fixos para as categorias.
2. Inicialize o vetor de totais com zero.
3. Some ao total da categoria e ao gasto geral após validar o lançamento.

## Solução

```visualg
algoritmo "Desafio0114A"
var
totais: vetor[1..3] de real
  i, categoria: inteiro
  valor, orcamento, gasto: real
inicio
escreva("Orçamento inicial: ")
  leia(orcamento)
  para i de 1 ate 3 faca
    totais[i] <- 0
  fimpara
  gasto <- 0
  para i de 1 ate 10 faca
    escreva("Categoria do gasto ", i, " (1 transporte, 2 alimentação, 3 lazer): ")
    leia(categoria)
    escreva("Valor: ")
    leia(valor)
    se (categoria >= 1) e (categoria <= 3) e (valor >= 0) entao
      totais[categoria] <- totais[categoria] + valor
      gasto <- gasto + valor
    senao
      escreval("Gasto inválido desconsiderado.")
    fimse
  fimpara
  escreval("Transporte: ", totais[1])
  escreval("Alimentação: ", totais[2])
  escreval("Lazer: ", totais[3])
  escreval("Saldo: ", orcamento - gasto)
fimalgoritmo
```

O código da categoria é usado como índice do vetor de totais; o acumulador geral permite calcular o saldo.
