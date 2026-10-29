# Solo úmido

**Data:** 28 de setembro · **Nível:** Simples

## Objetivo

Diga se a umidade ultrapassa o mínimo necessário.

## Como funciona

A umidade atende ao mínimo quando é maior ou igual a ele.

## Exemplo de execução

```text
40% com mínimo 35% → suficiente
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade é suficiente.

## Dicas para resolução

1. Valide percentuais.
2. Compare >=.
3. Mostre o estado.

## Solução

```visualg
algoritmo "Desafio0928S"
var
umidade, minimo: real
inicio
escreva("Umidade medida em %: ")
  leia(umidade)
  escreva("Mínimo necessário em %: ")
  leia(minimo)
  se (umidade < 0) ou (umidade > 100) ou (minimo < 0) ou (minimo > 100) entao
    escreval("Dados inválidos")
  senao
    se umidade >= minimo entao
      escreval("Umidade suficiente")
    senao
      escreval("Umidade insuficiente")
    fimse
  fimse
fimalgoritmo
```

A comparação >= inclui o limite necessário.
