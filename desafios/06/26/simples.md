# Noite fria

**Data:** 26 de junho · **Nível:** Simples

## Objetivo

Diga se a temperatura está abaixo do limite escolhido.

## Como funciona

Compare a temperatura medida ao limite escolhido.

## Exemplo de execução

```text
12 °C, limite 15 °C → abaixo do limite
```

**Como ler o exemplo:** a seta → significa "resulta em".

Temperatura igual ao limite não está abaixo dele.

## Dicas para resolução

1. Leia duas temperaturas.
2. Use <.
3. Mostre o resultado.

## Solução

```visualg
algoritmo "Desafio0626S"
var
temperatura, limite: real
inicio
escreva("Temperatura atual: ")
  leia(temperatura)
  escreva("Limite de frio: ")
  leia(limite)
  se temperatura < limite entao
    escreval("Abaixo do limite")
  senao
    escreval("No limite ou acima")
  fimse
fimalgoritmo
```

A comparação estrita < separa os dois casos.
