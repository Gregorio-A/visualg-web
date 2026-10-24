# Monte de neve fictício

**Data:** 15 de julho · **Nível:** Simples

## Objetivo

Calcule a área de um círculo a partir do raio.

## Como funciona

Calcule A = πr² usando π aproximado por 3,14159.

## Exemplo de execução

```text
Raio 2 → área aproximada 12,56636
```

**Como ler o exemplo:** a seta → significa "resulta em".

Raio zero produz área zero.

## Dicas para resolução

1. Multiplique raio por ele mesmo.
2. Multiplique por π.
3. Mostre a aproximação.

## Solução

```visualg
algoritmo "Desafio0715S"
var
raio, area: real
inicio
escreva("Raio do círculo: ")
  leia(raio)
  se raio < 0 entao
    escreval("Raio inválido")
  senao
    area <- 3.14159 * raio * raio
    escreval("Área: ", area)
  fimse
fimalgoritmo
```

O quadrado do raio é multiplicado pela constante aproximada.
