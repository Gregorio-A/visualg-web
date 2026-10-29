# Cifra variável

**Data:** 22 de abril · **Nível:** Avançado

## Objetivo

Codifique uma frase usando deslocamento alfabético diferente para cada posição.

## Como funciona

Codifique letras minúsculas com deslocamento que varia por posição: +1 na primeira, +2 na segunda, +3 na terceira e repita o ciclo. Preserve espaços e sinais.

## Exemplo de execução

```text
Frase abc
Mensagem codificada: bdf
```

A posição avança inclusive sobre espaços; eles permanecem inalterados, mas influenciam o deslocamento da letra seguinte.

## Dicas para resolução

1. Determine o deslocamento pela posição.
2. Transforme somente códigos de a a z.
3. Use módulo 26 para circular após z.

## Solução

```visualg
algoritmo "Desafio0422A"
var
frase, saida, letra: caractere
  i, codigo, deslocamento: inteiro
inicio
escreva("Frase em letras minúsculas sem acentos: ")
  leia(frase)
  saida <- ""
  para i de 1 ate compr(frase) faca
    letra <- copia(frase, i, 1)
    codigo <- asc(letra)
    se (codigo >= 97) e (codigo <= 122) entao
      deslocamento <- ((i - 1) mod 3) + 1
      saida <- saida + carac(((codigo - 97 + deslocamento) mod 26) + 97)
    senao
      saida <- saida + letra
    fimse
  fimpara
  escreval("Mensagem codificada: ", saida)
fimalgoritmo
```

O resto por três escolhe o deslocamento e o resto por 26 faz o alfabeto voltar ao início.
