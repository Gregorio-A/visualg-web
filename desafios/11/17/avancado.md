# Conversor de cores

**Data:** 17 de novembro · **Nível:** Avançado

## Objetivo

Converta RGB para hexadecimal e compare luminosidade estimada de amostras.

## Como funciona

Leia duas amostras RGB inteiras de 0 a 255. Converta cada canal em dois dígitos hexadecimais e estime luminosidade por 0,2126R+0,7152G+0,0722B.

### Palavras úteis

- **Quociente:** É o resultado de uma divisão.

## Exemplo de execução

```text
RGB (255,0,0) → #FF0000; luminosidade estimada 54,213
```

**Como ler o exemplo:** a seta → significa "resulta em".

Canais fora de 0–255 precisam ser corrigidos antes da conversão.

## Dicas para resolução

1. Separe cada canal em partes de 16.
2. Use uma tabela de dígitos hexadecimais.
3. Compare luminosidades ponderadas.

## Solução

```visualg
algoritmo "Desafio1117A"
var
r, g, b: vetor[1..2] de inteiro
  i, canal, alto, baixo, resto: inteiro
  hex, paleta: caractere
  luminosidade: vetor[1..2] de real
inicio
paleta <- "0123456789ABCDEF"
  para i de 1 ate 2 faca
    escreva("Amostra ", i, ": R, G, B (0 a 255): ")
    leia(r[i], g[i], b[i])
    hex <- "#"
    para canal de 1 ate 3 faca
      escolha canal
        caso 1
          resto <- r[i]
        caso 2
          resto <- g[i]
        caso 3
          resto <- b[i]
      fimescolha
      alto <- resto div 16 + 1
      baixo <- resto mod 16 + 1
      hex <- hex + copia(paleta, alto, 1) + copia(paleta, baixo, 1)
    fimpara
    luminosidade[i] <- 0.2126 * r[i] + 0.7152 * g[i] + 0.0722 * b[i]
    escreval("Hexadecimal: ", hex, "; luminosidade estimada: ", luminosidade[i])
  fimpara
  se luminosidade[1] > luminosidade[2] entao
    escreval("Amostra 1 mais luminosa")
  senao
    se luminosidade[2] > luminosidade[1] entao
      escreval("Amostra 2 mais luminosa")
    senao
      escreval("Luminosidades iguais")
    fimse
  fimse
fimalgoritmo
```

Quociente e resto por 16 formam os dois dígitos de cada canal.
