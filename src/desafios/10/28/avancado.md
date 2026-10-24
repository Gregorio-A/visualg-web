# Palavra amaldiçoada

**Data:** 28 de outubro · **Nível:** Avançado

## Objetivo

Detecte palíndromos e anagramas dentro de uma coleção de palavras.

## Como funciona

Cadastre cinco palavras apenas com letras minúsculas de a a z. Identifique palíndromos e todos os pares que têm as mesmas frequências de letras.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
arara → palíndromo; amor e roma → anagramas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Palavras de tamanhos diferentes nunca são anagramas; acentos e espaços ficam fora da entrada definida.

## Dicas para resolução

1. Inverta cada palavra.
2. Compare todos os pares.
3. Conte letras de cada par com sinais opostos.

## Solução

```visualg
algoritmo "Desafio1028A"
var
palavras: vetor[1..5] de caractere
  contagem: vetor[1..26] de inteiro
  i, j, k, letra, iguais: inteiro
  inversa: caractere
inicio
para i de 1 ate 5 faca
    escreva("Palavra ", i, " (letras minúsculas, sem acentos): ")
    leia(palavras[i])
    inversa <- ""
    para j de compr(palavras[i]) ate 1 passo -1 faca
      inversa <- inversa + copia(palavras[i], j, 1)
    fimpara
    se palavras[i] = inversa entao
      escreval(palavras[i], " é palíndromo")
    fimse
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se compr(palavras[i]) = compr(palavras[j]) entao
        para k de 1 ate 26 faca
          contagem[k] <- 0
        fimpara
        para k de 1 ate compr(palavras[i]) faca
          letra <- asc(copia(palavras[i], k, 1)) - 96
          se (letra >= 1) e (letra <= 26) entao
            contagem[letra] <- contagem[letra] + 1
          fimse
          letra <- asc(copia(palavras[j], k, 1)) - 96
          se (letra >= 1) e (letra <= 26) entao
            contagem[letra] <- contagem[letra] - 1
          fimse
        fimpara
        iguais <- 1
        para k de 1 ate 26 faca
          se contagem[k] <> 0 entao
            iguais <- 0
          fimse
        fimpara
        se iguais = 1 entao
          escreval(palavras[i], " e ", palavras[j], " são anagramas")
        fimse
      fimse
    fimpara
  fimpara
fimalgoritmo
```

A inversão verifica palíndromo; um vetor de 26 posições compara frequências de letras para anagramas.
