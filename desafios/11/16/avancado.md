# Escalonamento de interface

**Data:** 16 de novembro · **Nível:** Avançado

## Objetivo

Calcule tamanho e posição de componentes após mudar resolução.

## Como funciona

Reescale posição e tamanho de um componente de uma resolução para outra, usando fatores horizontal e vertical independentes.

## Exemplo de execução

```text
800×600 para 1600×1200; componente (10,20) de 100×50 → (20,40) de 200×100
```

**Como ler o exemplo:** a seta → significa "resulta em".

Resolução de dimensão zero é inválida.

## Dicas para resolução

1. Calcule fatores de escala.
2. Multiplique X e largura por escala X.
3. Multiplique Y e altura por escala Y.

## Solução

```visualg
algoritmo "Desafio1116A"
var
larguraAntiga, alturaAntiga, larguraNova, alturaNova: real
  x, y, largura, altura, escalaX, escalaY: real
inicio
escreva("Resolução antiga, largura e altura: ")
  leia(larguraAntiga, alturaAntiga)
  escreva("Nova resolução, largura e altura: ")
  leia(larguraNova, alturaNova)
  escreva("Componente original: X, Y, largura, altura: ")
  leia(x, y, largura, altura)
  se (larguraAntiga <= 0) ou (alturaAntiga <= 0) ou (larguraNova <= 0) ou (alturaNova <= 0) entao
    escreval("Resolução inválida")
  senao
    escalaX <- larguraNova / larguraAntiga
    escalaY <- alturaNova / alturaAntiga
    escreval("Nova posição: (", x * escalaX, ",", y * escalaY, ")")
    escreval("Novo tamanho: ", largura * escalaX, " × ", altura * escalaY)
  fimse
fimalgoritmo
```

Cada coordenada horizontal usa escala X e cada vertical usa escala Y.
