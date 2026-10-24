# Controle de volume

**Data:** 15 de agosto · **Nível:** Simples

## Objetivo

Limite um valor numérico entre 0 e 100.

## Como funciona

Limite o volume ao intervalo de 0 a 100.

## Exemplo de execução

```text
120 → 100; -5 → 0
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valores já dentro da faixa permanecem iguais.

## Dicas para resolução

1. Compare com zero.
2. Compare com cem.
3. Mostre o resultado limitado.

## Solução

```visualg
algoritmo "Desafio0815S"
var
volume: inteiro
inicio
escreva("Volume solicitado: ")
  leia(volume)
  se volume < 0 entao
    volume <- 0
  fimse
  se volume > 100 entao
    volume <- 100
  fimse
  escreval("Volume aplicado: ", volume)
fimalgoritmo
```

Dois limites sucessivos fazem a saturação do valor.
