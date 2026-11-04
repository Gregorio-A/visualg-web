# Litros economizados

**Data:** 3 de setembro · **Nível:** Simples

## Objetivo

Calcule economia de água por dia durante N dias.

## Como funciona

A economia diária permanece constante ao longo do período.

## Exemplo de execução

```text
2,5 L por dia durante 4 dias → 10 L
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero dia gera economia zero.

## Dicas para resolução

1. Leia taxa diária.
2. Leia dias.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0903S"
var
litrosDia: real
  dias: inteiro
inicio
escreva("Litros economizados por dia: ")
  leia(litrosDia)
  escreva("Número de dias: ")
  leia(dias)
  se (litrosDia < 0) ou (dias < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Economia total: ", litrosDia * dias, " L")
  fimse
fimalgoritmo
```

Multiplicar a economia de um dia pelo número de dias dá o total.
