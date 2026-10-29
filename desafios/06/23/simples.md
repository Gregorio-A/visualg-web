# Maçã do amor

**Data:** 23 de junho · **Nível:** Simples

## Objetivo

Aplique percentual de lucro ao custo unitário.

## Como funciona

O lucro percentual é aplicado sobre o custo unitário.

## Exemplo de execução

```text
Custo R$ 5 e lucro 20% → preço R$ 6
```

**Como ler o exemplo:** a seta → significa "resulta em".

Lucro de 0% mantém o preço no custo.

## Dicas para resolução

1. Divida o percentual por 100.
2. Some 1.
3. Multiplique pelo custo.

## Solução

```visualg
algoritmo "Desafio0623S"
var
custo, lucroPct: real
inicio
escreva("Custo unitário: ")
  leia(custo)
  escreva("Lucro desejado em % do custo: ")
  leia(lucroPct)
  se (custo < 0) ou (lucroPct < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Preço de venda: R$ ", custo * (1 + lucroPct / 100))
  fimse
fimalgoritmo
```

Somar 1 à taxa em fração produz o multiplicador do preço de venda.
