# Piscina cheia

**Data:** 12 de janeiro · **Nível:** Simples

## Objetivo

Calcule o volume de uma piscina retangular.

Calcule o volume de uma piscina retangular em metros cúbicos.

## Como funciona

Leia comprimento, largura e profundidade em metros e multiplique as três dimensões.

## Exemplo de execução

```text
Comprimento (m): 10
Largura (m): 4
Profundidade (m): 2
Volume (m³): 80
```

Se alguma dimensão for zero, o volume calculado é zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0112S"
var
comprimento, largura, profundidade, volume: real
inicio
escreva("Comprimento (m): ")
  leia(comprimento)
  escreva("Largura (m): ")
  leia(largura)
  escreva("Profundidade (m): ")
  leia(profundidade)
  se (comprimento >= 0) e (largura >= 0) e (profundidade >= 0) entao
    volume <- comprimento * largura * profundidade
    escreval("Volume (m³): ", volume)
  senao
    escreval("As dimensões não podem ser negativas.")
  fimse
fimalgoritmo
```

A fórmula para um prisma retangular é comprimento × largura × profundidade.
