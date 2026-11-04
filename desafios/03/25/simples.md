# Número da carteira

**Data:** 25 de março · **Nível:** Simples

## Objetivo

Verifique se uma carteira está em intervalo válido.

## Como funciona

Leia o número de carteira e as extremidades inclusivas de uma faixa válida.

## Exemplo de execução

```text
Carteira: 12; intervalo: 1 a 30
Carteira dentro do intervalo.
```

Os dois extremos pertencem ao intervalo.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0325S"
var
carteira, inicioFaixa, fimFaixa: inteiro
inicio
escreva("Número da carteira: ")
  leia(carteira)
  escreva("Primeira carteira válida: ")
  leia(inicioFaixa)
  escreva("Última carteira válida: ")
  leia(fimFaixa)
  se (inicioFaixa <= fimFaixa) e (carteira >= inicioFaixa) e (carteira <= fimFaixa) entao
    escreval("Carteira dentro do intervalo.")
  senao
    escreval("Carteira fora do intervalo.")
  fimse
fimalgoritmo
```

O programa verifica simultaneamente limite inferior, superior e ordem da faixa.
