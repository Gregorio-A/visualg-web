# Idades combinadas

**Data:** 19 de abril · **Nível:** Avançado

## Objetivo

Encontre idades inteiras que atendam soma e diferença fornecidas.

## Como funciona

Leia soma de duas idades e diferença da primeira menos a segunda. Encontre idades inteiras não negativas que satisfaçam ambas as pistas.

## Exemplo de execução

```text
Soma 30; diferença 4
Idades: 17 e 13
```

Soma 31 e diferença 4 não admitem solução inteira, pois 35 é ímpar.

## Dicas para resolução

1. Escreva as duas equações.
2. Some-as para isolar a primeira idade.
3. Confira paridade e não negatividade.

## Solução

```visualg
algoritmo "Desafio0419A"
var
soma, diferenca, primeira, segunda: inteiro
inicio
escreva("Soma das idades: ")
  leia(soma)
  escreva("Diferença primeira menos segunda: ")
  leia(diferenca)
  se ((soma + diferenca) mod 2 = 0) e (soma >= 0) entao
    primeira <- (soma + diferenca) div 2
    segunda <- soma - primeira
    se (primeira >= 0) e (segunda >= 0) entao
      escreval("Idades: ", primeira, " e ", segunda)
    senao
      escreval("Não há idades não negativas com essas pistas.")
    fimse
  senao
    escreval("Não há solução inteira.")
  fimse
fimalgoritmo
```

Somar as duas equações dá duas vezes a primeira idade; a segunda é obtida pela soma original.
