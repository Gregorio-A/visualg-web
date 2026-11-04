# Impressão de páginas

**Data:** 8 de novembro · **Nível:** Simples

## Objetivo

Calcule folhas necessárias para impressão frente e verso.

## Como funciona

Cada folha recebe até duas páginas, uma em cada face.

## Exemplo de execução

```text
5 páginas → 3 folhas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero página exige zero folha.

## Dicas para resolução

1. Divida por dois.
2. Confira resto.
3. Arredonde para cima.

## Solução

```visualg
algoritmo "Desafio1108S"
var
paginas, folhas: inteiro
inicio
escreva("Páginas a imprimir: ")
  leia(paginas)
  se paginas < 0 entao
    escreval("Quantidade inválida")
  senao
    folhas <- paginas div 2
    se paginas mod 2 <> 0 entao
      folhas <- folhas + 1
    fimse
    escreval("Folhas necessárias: ", folhas)
  fimse
fimalgoritmo
```

Resto na divisão por dois exige folha adicional.
