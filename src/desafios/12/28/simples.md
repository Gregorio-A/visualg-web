# Contando os dias

**Data:** 28 de dezembro · **Nível:** Simples

## Objetivo

Calcule quantos dias faltam para o dia 31 de dezembro.

## Como funciona

Considere apenas dias válidos de dezembro.

## Exemplo de execução

```text
Dia 28 → faltam 3 dias
```

**Como ler o exemplo:** a seta → significa "resulta em".

No dia 31 faltam zero.

## Dicas para resolução

1. Considere apenas dezembro.
2. Valide um dia de 1 a 31.
3. Subtraia o dia de 31.

## Solução

```visualg
algoritmo "Desafio1228S"
var
  dia: inteiro
inicio
  escreva("Dia de dezembro: ")
  leia(dia)
  se (dia < 1) ou (dia > 31) entao
    escreval("Dia inválido")
  senao
    escreval("Faltam ", 31-dia, " dia(s)")
  fimse
fimalgoritmo
```

Subtraia o dia de 31.
