# Convites restantes

**Data:** 21 de fevereiro · **Nível:** Simples

## Objetivo

Subtraia os convites entregues dos impressos.

## Como funciona

Leia impressos e entregues; calcule quantos convites ainda podem ser distribuídos.

## Exemplo de execução

```text
Convites impressos: 100
Convites entregues: 35
Convites restantes: 65
```

Entregar exatamente todos os convites deixa saldo zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0221S"
var
impressos, entregues, restantes: inteiro
inicio
escreva("Convites impressos: ")
  leia(impressos)
  escreva("Convites entregues: ")
  leia(entregues)
  se (impressos >= 0) e (entregues >= 0) e (entregues <= impressos) entao
    restantes <- impressos - entregues
    escreval("Convites restantes: ", restantes)
  senao
    escreval("Quantidades inválidas.")
  fimse
fimalgoritmo
```

A validação impede entregar mais convites do que foram impressos.
