# Dado digital

**Data:** 10 de agosto · **Nível:** Simples

## Objetivo

Indique se um número informado está entre 1 e 6.

## Como funciona

Um dado comum tem faces numeradas de 1 a 6.

## Exemplo de execução

```text
6 → válido; 7 → inválido
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero não é face válida.

## Dicas para resolução

1. Leia um inteiro.
2. Compare os dois limites.
3. Exiba a classificação.

## Solução

```visualg
algoritmo "Desafio0810S"
var
dado: inteiro
inicio
escreva("Resultado do dado: ")
  leia(dado)
  se (dado >= 1) e (dado <= 6) entao
    escreval("Face válida")
  senao
    escreval("Face inválida")
  fimse
fimalgoritmo
```

As duas desigualdades delimitam o intervalo permitido.
