# Dano crítico

**Data:** 21 de agosto · **Nível:** Simples

## Objetivo

Calcule dano base acrescido de bônus percentual.

## Como funciona

Aplique o bônus percentual ao dano base.

## Exemplo de execução

```text
Dano 20, bônus 50% → dano 30
```

**Como ler o exemplo:** a seta → significa "resulta em".

Bônus zero mantém o dano base.

## Dicas para resolução

1. Divida o percentual por 100.
2. Some 1.
3. Multiplique pelo dano base.

## Solução

```visualg
algoritmo "Desafio0821S"
var
base, bonus, finalDano: real
inicio
escreva("Dano base: ")
  leia(base)
  escreva("Bônus crítico em %: ")
  leia(bonus)
  se (base < 0) ou (bonus < 0) entao
    escreval("Dados inválidos")
  senao
    finalDano <- base * (1 + bonus / 100)
    escreval("Dano crítico: ", finalDano)
  fimse
fimalgoritmo
```

Um mais a taxa em fração multiplica o valor original.
