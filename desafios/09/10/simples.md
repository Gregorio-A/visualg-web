# Ciclovia

**Data:** 10 de setembro · **Nível:** Simples

## Objetivo

Calcule distância de ida e volta de um trajeto.

## Como funciona

O retorno percorre o mesmo trajeto da ida.

## Exemplo de execução

```text
3 km de ida → 6 km no total
```

**Como ler o exemplo:** a seta → significa "resulta em".

Distância zero resulta em zero.

## Dicas para resolução

1. Leia ida.
2. Multiplique por dois.
3. Mostre km.

## Solução

```visualg
algoritmo "Desafio0910S"
var
ida: real
inicio
escreva("Distância da ida em km: ")
  leia(ida)
  se ida < 0 entao
    escreval("Distância inválida")
  senao
    escreval("Ida e volta: ", ida * 2, " km")
  fimse
fimalgoritmo
```

O mesmo percurso é contabilizado duas vezes.
