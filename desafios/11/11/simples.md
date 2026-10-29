# Percentual da bateria

**Data:** 11 de novembro · **Nível:** Simples

## Objetivo

Diga se o percentual está abaixo de 20.

## Como funciona

A condição usa menos de 20%, sem incluir 20%.

## Exemplo de execução

```text
19% → abaixo; 20% → não abaixo
```

**Como ler o exemplo:** a seta → significa "resulta em".

Percentual fora de 0–100 é inválido.

## Dicas para resolução

1. Valide percentual.
2. Use <20.
3. Mostre o estado.

## Solução

```visualg
algoritmo "Desafio1111S"
var
percentual: real
inicio
escreva("Percentual de bateria: ")
  leia(percentual)
  se (percentual < 0) ou (percentual > 100) entao
    escreval("Percentual inválido")
  senao
    se percentual < 20 entao
      escreval("Abaixo de 20%")
    senao
      escreval("20% ou mais")
    fimse
  fimse
fimalgoritmo
```

A comparação estrita exclui o limite.
