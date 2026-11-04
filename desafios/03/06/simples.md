# Tarefa entregue

**Data:** 6 de março · **Nível:** Simples

## Objetivo

Exiba ENTREGUE ou PENDENTE a partir de uma resposta.

## Como funciona

Leia uma resposta SIM ou NÃO. Mostre ENTREGUE para SIM e PENDENTE para NÃO.

## Exemplo de execução

```text
Tarefa entregue? (SIM/NÃO): NÃO
PENDENTE
```

Texto diferente das respostas esperadas é sinalizado como inválido.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0306S"
var
resposta: caractere
inicio
escreva("Tarefa entregue? (SIM/NÃO): ")
  leia(resposta)
  se (resposta = "SIM") ou (resposta = "sim") entao
    escreval("ENTREGUE")
  senao
    se (resposta = "NÃO") ou (resposta = "não") ou (resposta = "NAO") ou (resposta = "nao") entao
      escreval("PENDENTE")
    senao
      escreval("Resposta inválida")
    fimse
  fimse
fimalgoritmo
```

As duas respostas reconhecidas têm saídas distintas e explícitas.
