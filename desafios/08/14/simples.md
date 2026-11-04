# Vitórias consecutivas

**Data:** 14 de agosto · **Nível:** Simples

## Objetivo

Exiba PARABÉNS N vezes conforme vitórias.

## Como funciona

Mostre PARABÉNS uma vez para cada vitória.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
2 vitórias → duas linhas PARABÉNS
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero vitória não imprime a frase.

## Dicas para resolução

1. Leia N.
2. Repita N vezes.
3. Use escreval.

## Solução

```visualg
algoritmo "Desafio0814S"
var
vitorias, i: inteiro
inicio
escreva("Vitórias: ")
  leia(vitorias)
  se vitorias < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate vitorias faca
      escreval("PARABÉNS")
    fimpara
  fimse
fimalgoritmo
```

O laço controla o número de repetições.
