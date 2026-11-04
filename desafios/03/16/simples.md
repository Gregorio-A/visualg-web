# Aluno aprovado

**Data:** 16 de março · **Nível:** Simples

## Objetivo

Classifique a média como aprovado ou reprovado.

## Como funciona

Leia a média alcançada e o mínimo necessário. Use comparação inclusiva para aprovar.

## Exemplo de execução

```text
Média do aluno: 7
Média mínima: 6
Aprovado
```

Média exatamente igual ao mínimo é aprovada.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0316S"
var
media, minima: real
inicio
escreva("Média do aluno: ")
  leia(media)
  escreva("Média mínima para aprovação: ")
  leia(minima)
  se media >= minima entao
    escreval("Aprovado")
  senao
    escreval("Reprovado")
  fimse
fimalgoritmo
```

A condição `>=` traduz “alcançar a média mínima”.
