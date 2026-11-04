# Volume do alto-falante

**Data:** 20 de novembro · **Nível:** Simples

## Objetivo

Aplique aumento de dez unidades com limite de 100.

## Como funciona

Some dez unidades e limite o resultado a cem.

## Exemplo de execução

```text
95 → 100; 70 → 80
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valor inicial fora de 0–100 é inválido.

## Dicas para resolução

1. Some dez.
2. Compare com cem.
3. Ajuste se ultrapassar.

## Solução

```visualg
algoritmo "Desafio1120S"
var
valor: inteiro
inicio
escreva("Valor atual (0 a 100): ")
  leia(valor)
  se (valor < 0) ou (valor > 100) entao
    escreval("Valor inicial inválido")
  senao
    valor <- valor + 10
    se valor > 100 entao
      valor <- 100
    fimse
    escreval("Valor após aumento: ", valor)
  fimse
fimalgoritmo
```

O teto impede que o aumento extrapole a escala.
