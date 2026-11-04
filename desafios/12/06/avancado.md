# Árvore ASCII

**Data:** 6 de dezembro · **Nível:** Avançado

## Objetivo

Crie árvore simétrica com enfeites posicionados por uma matriz de caracteres.

## Como funciona

A árvore tem cinco linhas e largura nove. Colunas dentro da distância da linha ao centro recebem ramos; centro de linhas pares recebe enfeite “o”.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Topo: “    *    ”; segunda linha: “   *o*   ”.
```

Espaços fora dos ramos preservam a simetria.

## Dicas para resolução

1. Crie matriz de caracteres.
2. Calcule a distância ao centro.
3. Troque o centro das linhas pares por enfeite.

## Solução

```visualg
algoritmo "Desafio1206A"
var
  arvore: vetor[1..5,1..9] de caractere
  linha, coluna, centro, distancia: inteiro
inicio
  centro <- 5
  para linha de 1 ate 5 faca
    para coluna de 1 ate 9 faca
      distancia <- abs(coluna-centro)
      se distancia < linha entao
        se (coluna = centro) e (linha mod 2 = 0) entao
          arvore[linha,coluna] <- "o"
        senao
          arvore[linha,coluna] <- "*"
        fimse
      senao
        arvore[linha,coluna] <- " "
      fimse
    fimpara
  fimpara
  para linha de 1 ate 5 faca
    para coluna de 1 ate 9 faca
      escreva(arvore[linha,coluna])
    fimpara
    escreval("")
  fimpara
fimalgoritmo
```

A distância horizontal ao centro determina se uma célula pertence à árvore.
