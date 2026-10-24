# Mesa de atendimento

**Data:** 18 de maio · **Nível:** Simples

## Objetivo

Mostre uma mensagem para cada cliente de 1 a N.

## Como funciona

Leia N e mostre uma mensagem de atendimento para cada cliente numerado de 1 a N.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Clientes: 2
Cliente 1: atendimento iniciado
Cliente 2: atendimento iniciado
```

Com zero clientes, nenhuma mensagem é emitida.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0518S"
var
clientes, i: inteiro
inicio
escreva("Clientes: ")
  leia(clientes)
  para i de 1 ate clientes faca
    escreval("Cliente ", i, ": atendimento iniciado")
  fimpara
fimalgoritmo
```

O laço executa uma vez por cliente.
