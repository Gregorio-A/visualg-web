# Livros nas férias

**Data:** 5 de julho · **Nível:** Simples

## Objetivo

Calcule páginas restantes de um livro.

## Como funciona

Subtraia páginas lidas do total do livro.

## Exemplo de execução

```text
Livro 200, lidas 75 → restam 125
```

**Como ler o exemplo:** a seta → significa "resulta em".

Livro terminado tem zero página restante.

## Dicas para resolução

1. Leia total e lidas.
2. Valide o intervalo.
3. Subtraia.

## Solução

```visualg
algoritmo "Desafio0705S"
var
paginas, lidas: inteiro
inicio
escreva("Páginas do livro: ")
  leia(paginas)
  escreva("Páginas lidas: ")
  leia(lidas)
  se (paginas < 0) ou (lidas < 0) ou (lidas > paginas) entao
    escreval("Dados inválidos")
  senao
    escreval("Restam ", paginas - lidas, " página(s)")
  fimse
fimalgoritmo
```

A diferença mede o que falta ler.
