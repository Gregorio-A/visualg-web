# Fogueira acesa

**Data:** 10 de junho · **Nível:** Simples

## Objetivo

Mostre a palavra FOGO por N linhas.

## Como funciona

Mostre a palavra FOGO uma vez em cada linha solicitada.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
3 linhas → FOGO
FOGO
FOGO
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero linhas não imprime a palavra.

## Dicas para resolução

1. Leia N.
2. Repita N vezes.
3. Use escreval para mudar de linha.

## Solução

```visualg
algoritmo "Desafio0610S"
var
linhas, i: inteiro
inicio
escreva("Número de linhas: ")
  leia(linhas)
  se linhas < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate linhas faca
      escreval("FOGO")
    fimpara
  fimse
fimalgoritmo
```

O laço repete a mesma saída N vezes.
