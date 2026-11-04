# Entrega no prazo

**Data:** 17 de maio · **Nível:** Simples

## Objetivo

Compare dia da entrega com dia previsto.

## Como funciona

Compare números de dia do mesmo período. Informe antecipação, entrega no prazo ou atraso.

## Exemplo de execução

```text
Dia previsto: 10
Dia da entrega: 12
Entrega atrasada em 2 dia(s).
```

Dias iguais representam entrega no prazo.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0517S"
var
prevista, efetiva: inteiro
inicio
escreva("Dia previsto: ")
  leia(prevista)
  escreva("Dia da entrega: ")
  leia(efetiva)
  se efetiva < prevista entao
    escreval("Entrega antecipada.")
  senao
    se efetiva = prevista entao
      escreval("Entrega no prazo.")
    senao
      escreval("Entrega atrasada em ", efetiva - prevista, " dia(s).")
    fimse
  fimse
fimalgoritmo
```

A diferença só é calculada no caso de atraso.
