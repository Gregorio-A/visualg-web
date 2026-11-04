# Encerramento do mês

**Data:** 28 de fevereiro · **Nível:** Simples

## Objetivo

Some a participação registrada em quatro festas.

## Como funciona

Some as participações registradas em quatro festas.

### Palavras úteis

- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
Participantes: 10, 20, 15, 5
Participação total: 50
```

Uma festa com zero participantes contribui com zero. Valor negativo é ignorado.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0228S"
var
participacao, total: inteiro
  i: inteiro
inicio
total <- 0
  para i de 1 ate 4 faca
    escreva("Participantes da festa ", i, ": ")
    leia(participacao)
    se participacao >= 0 entao
      total <- total + participacao
    senao
      escreval("Quantidade inválida ignorada.")
    fimse
  fimpara
  escreval("Participação total: ", total)
fimalgoritmo
```

O acumulador `total` começa em zero e recebe cada contagem válida.
