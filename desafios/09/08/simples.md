# Temperatura da estufa

**Data:** 8 de setembro · **Nível:** Simples

## Objetivo

Classifique uma leitura como abaixo, dentro ou acima da faixa ideal.

## Como funciona

Os limites inferior e superior fazem parte da faixa ideal.

## Exemplo de execução

```text
Faixa 18–25 °C, leitura 20 → dentro
```

**Como ler o exemplo:** a seta → significa "resulta em".

Leitura igual a qualquer limite está dentro.

## Dicas para resolução

1. Leia três valores.
2. Confira a ordem dos limites.
3. Compare a leitura.

## Solução

```visualg
algoritmo "Desafio0908S"
var
leitura, minimo, maximo: real
inicio
escreva("Temperatura mínima ideal: ")
  leia(minimo)
  escreva("Temperatura máxima ideal: ")
  leia(maximo)
  escreva("Leitura da estufa: ")
  leia(leitura)
  se minimo > maximo entao
    escreval("Faixa inválida")
  senao
    se leitura < minimo entao
      escreval("Abaixo da faixa")
    senao
      se leitura > maximo entao
        escreval("Acima da faixa")
      senao
        escreval("Dentro da faixa")
      fimse
    fimse
  fimse
fimalgoritmo
```

Duas comparações separam abaixo, dentro e acima.
