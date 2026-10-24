# LED piscante

**Data:** 5 de novembro · **Nível:** Simples

## Objetivo

Mostre LIGADO e DESLIGADO cinco vezes.

## Como funciona

Repita o par de palavras cinco vezes, na ordem LIGADO e DESLIGADO.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Primeiro ciclo: LIGADO, DESLIGADO
```

O programa não requer entrada.

## Dicas para resolução

1. Use para 1 até 5.
2. Imprima as duas palavras.
3. Mantenha a ordem.

## Solução

```visualg
algoritmo "Desafio1105S"
var
i: inteiro
inicio
para i de 1 ate 5 faca
    escreval("LIGADO")
    escreval("DESLIGADO")
  fimpara
fimalgoritmo
```

Cada passagem do laço escreve as duas linhas.
