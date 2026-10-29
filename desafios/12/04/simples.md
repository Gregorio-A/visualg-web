# Embrulho necessário

**Data:** 4 de dezembro · **Nível:** Simples

## Objetivo

Calcule a área de papel para uma face retangular.

## Como funciona

Calcule apenas uma face retangular; as duas medidas usam a mesma unidade.

## Exemplo de execução

```text
2 m × 3 m → 6 m²
```

**Como ler o exemplo:** a seta → significa "resulta em".

Medida zero não forma retângulo.

## Dicas para resolução

1. Use medidas na mesma unidade.
2. Multiplique largura por comprimento.
3. Identifique a unidade quadrada.

## Solução

```visualg
algoritmo "Desafio1204S"
var
  largura, comprimento: real
inicio
  escreva("Largura: ")
  leia(largura)
  escreva("Comprimento: ")
  leia(comprimento)
  se (largura <= 0) ou (comprimento <= 0) entao
    escreval("Medida inválida")
  senao
    escreval("Área: ", largura * comprimento:0:2)
  fimse
fimalgoritmo
```

A área é largura multiplicada por comprimento.
