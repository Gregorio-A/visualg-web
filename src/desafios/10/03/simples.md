# Doces ou travessuras

**Data:** 3 de outubro · **Nível:** Simples

## Objetivo

Divida uma quantidade de doces igualmente entre crianças.

## Como funciona

Distribua igualmente, sem partir doces.

### Palavras úteis

- **div:** É uma divisão que guarda apenas a parte inteira. Por exemplo, 7 div 3 resulta em 2.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
17 doces para 5 crianças → 3 para cada e sobra 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero criança impede divisão.

## Dicas para resolução

1. Use div.
2. Use mod.
3. Valide número de crianças.

## Solução

```visualg
algoritmo "Desafio1003S"
var
doces, criancas: inteiro
inicio
escreva("Doces disponíveis: ")
  leia(doces)
  escreva("Crianças: ")
  leia(criancas)
  se (doces < 0) ou (criancas <= 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Doces por criança: ", doces div criancas)
    escreval("Sobra: ", doces mod criancas)
  fimse
fimalgoritmo
```

Divisão inteira dá a cota e módulo dá o restante.
