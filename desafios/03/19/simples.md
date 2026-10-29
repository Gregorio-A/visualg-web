# Notas extras

**Data:** 19 de março · **Nível:** Simples

## Objetivo

Adicione um ponto de bônus sem ultrapassar dez.

## Como funciona

Some um ponto de bônus à nota, mas limite o resultado a dez.

## Exemplo de execução

```text
Nota antes do bônus: 9.5
Nota final: 10
```

Nota 10 continua 10 após o bônus.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0319S"
var
nota, final: real
inicio
escreva("Nota antes do bônus: ")
  leia(nota)
  final <- nota + 1
  se final > 10 entao
    final <- 10
  fimse
  escreval("Nota final: ", final)
fimalgoritmo
```

A comparação posterior à soma impede nota superior ao teto.
