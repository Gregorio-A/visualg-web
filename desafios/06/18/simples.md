# Pula-fogueira fictício

**Data:** 18 de junho · **Nível:** Simples

## Objetivo

Conte saltos de 1 até N.

## Como funciona

Conte os saltos de 1 até N, um por linha.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
N = 3 → Salto 1, Salto 2, Salto 3
```

**Como ler o exemplo:** a seta → significa "resulta em".

N = 0 não imprime saltos.

## Dicas para resolução

1. Leia N.
2. Repita de 1 até N.
3. Mostre o contador.

## Solução

```visualg
algoritmo "Desafio0618S"
var
saltos, i: inteiro
inicio
escreva("Quantidade de saltos: ")
  leia(saltos)
  se saltos < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate saltos faca
      escreval("Salto ", i)
    fimpara
  fimse
fimalgoritmo
```

O contador do laço representa o número de cada salto.
