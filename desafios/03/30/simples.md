# Desempenho do mês

**Data:** 30 de março · **Nível:** Simples

## Objetivo

Some os exercícios concluídos em quatro semanas.

## Como funciona

Leia quatro contagens semanais e some apenas valores não negativos.

### Palavras úteis

- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
Semanas: 3, 4, 5, 2
Total do mês: 14
```

Semana com zero exercícios é válida.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0330S"
var
concluidos, total, semana: inteiro
inicio
total <- 0
  para semana de 1 ate 4 faca
    escreva("Exercícios concluídos na semana ", semana, ": ")
    leia(concluidos)
    se concluidos >= 0 entao
      total <- total + concluidos
    senao
      escreval("Contagem inválida ignorada.")
    fimse
  fimpara
  escreval("Total do mês: ", total)
fimalgoritmo
```

O acumulador `total` reúne as quatro semanas sem guardar cada contagem depois de somá-la.
