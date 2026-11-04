# Noites frias

**Data:** 8 de julho · **Nível:** Simples

## Objetivo

Conte de 1 até N noites com um laço.

## Como funciona

Numere as noites de 1 até N usando repetição.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
N=3 → Noite 1, Noite 2, Noite 3
```

**Como ler o exemplo:** a seta → significa "resulta em".

N=0 não imprime nenhuma noite.

## Dicas para resolução

1. Leia N.
2. Use para.
3. Imprima o contador.

## Solução

```visualg
algoritmo "Desafio0708S"
var
noites, i: inteiro
inicio
escreva("Número de noites: ")
  leia(noites)
  se noites < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate noites faca
      escreval("Noite ", i)
    fimpara
  fimse
fimalgoritmo
```

O contador do laço coincide com o número da noite.
