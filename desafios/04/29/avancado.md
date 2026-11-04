# Frases simétricas

**Data:** 29 de abril · **Nível:** Avançado

## Objetivo

Encontre todas as palavras palíndromas de uma frase sem diferenciar caixa.

## Como funciona

Leia uma frase cujas palavras são separadas por espaços. Compare cada palavra com sua inversão depois de converter para minúsculas.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Frase: Ana viu osso
Palíndromos: Ana, osso
```

Pontuação grudada à palavra faz parte dela neste exercício; escreva a frase sem pontuação para obter apenas palavras.

## Dicas para resolução

1. Acumule caracteres até encontrar espaço.
2. Converta a palavra para minúsculas.
3. Construa a inversão e compare.

## Solução

```visualg
algoritmo "Desafio0429A"
var
frase, palavra, normal, invertida, caractereAtual: caractere
  i, j, encontrados: inteiro
inicio
escreva("Frase: ")
  leia(frase)
  palavra <- ""
  encontrados <- 0
  para i de 1 ate compr(frase) + 1 faca
    se i <= compr(frase) entao
      caractereAtual <- copia(frase, i, 1)
    senao
      caractereAtual <- " "
    fimse
    se caractereAtual = " " entao
      se compr(palavra) > 0 entao
        normal <- minusc(palavra)
        invertida <- ""
        para j de compr(normal) ate 1 passo -1 faca
          invertida <- invertida + copia(normal, j, 1)
        fimpara
        se normal = invertida entao
          escreval("Palíndromo: ", palavra)
          encontrados <- encontrados + 1
        fimse
      fimse
      palavra <- ""
    senao
      palavra <- palavra + caractereAtual
    fimse
  fimpara
  escreval("Palavras palíndromas: ", encontrados)
fimalgoritmo
```

Um espaço extra ao fim do laço força o processamento da última palavra.
