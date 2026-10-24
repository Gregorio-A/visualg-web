# Doce mais caro

**Data:** 26 de outubro · **Nível:** Simples

## Objetivo

Compare preços de três doces e exiba o maior.

## Como funciona

Leia três preços não negativos e exiba o maior.

## Exemplo de execução

```text
R$ 3, R$ 5 e R$ 4 → R$ 5
```

**Como ler o exemplo:** a seta → significa "resulta em".

Empates mostram o mesmo valor máximo.

## Dicas para resolução

1. Guarde o primeiro como maior.
2. Compare com o segundo.
3. Compare com o terceiro.

## Solução

```visualg
algoritmo "Desafio1026S"
var
a, b, c, maior: real
inicio
escreva("Preço do doce 1: ")
  leia(a)
  escreva("Preço do doce 2: ")
  leia(b)
  escreva("Preço do doce 3: ")
  leia(c)
  se (a < 0) ou (b < 0) ou (c < 0) entao
    escreval("Preço inválido")
  senao
    maior <- a
    se b > maior entao
      maior <- b
    fimse
    se c > maior entao
      maior <- c
    fimse
    escreval("Maior preço: R$ ", maior)
  fimse
fimalgoritmo
```

Comece com um preço e substitua o máximo sempre que encontrar um valor superior.
