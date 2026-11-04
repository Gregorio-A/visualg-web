# Moedas virtuais

**Data:** 8 de agosto · **Nível:** Simples

## Objetivo

Calcule saldo depois de uma compra.

## Como funciona

Subtraia o preço somente quando o saldo pagar a compra.

## Exemplo de execução

```text
Saldo 10, preço 7 → saldo 3
```

**Como ler o exemplo:** a seta → significa "resulta em".

Compra acima do saldo é recusada.

## Dicas para resolução

1. Compare preço e saldo.
2. Subtraia se possível.
3. Mantenha o saldo se não puder comprar.

## Solução

```visualg
algoritmo "Desafio0808S"
var
saldo, preco: inteiro
inicio
escreva("Moedas disponíveis: ")
  leia(saldo)
  escreva("Preço da compra: ")
  leia(preco)
  se (saldo < 0) ou (preco < 0) entao
    escreval("Dados inválidos")
  senao
    se preco <= saldo entao
      escreval("Compra efetuada; saldo ", saldo - preco)
    senao
      escreval("Moedas insuficientes; saldo ", saldo)
    fimse
  fimse
fimalgoritmo
```

A validação impede saldo negativo.
