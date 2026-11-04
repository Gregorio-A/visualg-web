# Sobremesa dividida

**Data:** 16 de dezembro · **Nível:** Simples

## Objetivo

Calcule a quantidade de fatias por pessoa e a sobra.

## Como funciona

Distribua fatias inteiras de forma igual.

### Palavras úteis

- **div:** É uma divisão que guarda apenas a parte inteira. Por exemplo, 7 div 3 resulta em 2.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
17 fatias para 5 pessoas → 3 cada e sobram 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Sem pessoas a divisão é inválida.

## Dicas para resolução

1. Evite divisão por zero.
2. Use div para fatias inteiras por pessoa.
3. Use mod para as fatias restantes.

## Solução

```visualg
algoritmo "Desafio1216S"
var
  fatias, pessoas: inteiro
inicio
  escreva("Fatias: ")
  leia(fatias)
  escreva("Pessoas: ")
  leia(pessoas)
  se (fatias < 0) ou (pessoas <= 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Por pessoa: ", fatias div pessoas)
    escreval("Sobra: ", fatias mod pessoas)
  fimse
fimalgoritmo
```

Divisão inteira dá a cota; módulo dá a sobra.
