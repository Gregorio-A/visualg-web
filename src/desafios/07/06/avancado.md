# Produção de bebidas

**Data:** 6 de julho · **Nível:** Avançado

## Objetivo

Calcule lotes com três tamanhos de copo minimizando sobras de volume.

## Como funciona

Receba volume de 0 a 10000 mL e três tamanhos positivos de copo. Escolha quantidades inteiras sem exceder o volume, minimizando a sobra.

### Palavras úteis

- **Programação dinâmica:** É guardar resultados já calculados para não repetir o mesmo trabalho.
- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Volume 500 mL; tamanhos 200, 150, 100 → cinco copos de 100; sobra zero (outra combinação sem sobra também seria válida).
```

**Como ler o exemplo:** a seta → significa "resulta em".

Volume menor que todos os copos fica inteiramente como sobra.

## Dicas para resolução

1. Marque zero como alcançável.
2. Para cada volume, teste os três tamanhos.
3. Reconstrua a combinação a partir do maior volume alcançável.

## Solução

```visualg
algoritmo "Desafio0706A"
var
tamanhos, quantidades: vetor[1..3] de inteiro
  alcancavel: vetor[1..10001] de logico
  opcao: vetor[1..10001] de inteiro
  i, j, volume, maior, restante, indice: inteiro
inicio
escreva("Volume de bebida em mL (0 a 10000): ")
  leia(volume)
  para i de 1 ate 3 faca
    escreva("Tamanho do copo ", i, " em mL: ")
    leia(tamanhos[i])
  fimpara
  se (volume < 0) ou (volume > 10000) ou (tamanhos[1] <= 0) ou (tamanhos[2] <= 0) ou (tamanhos[3] <= 0) entao
    escreval("Dados inválidos")
  senao
    alcancavel[1] <- verdadeiro
    para i de 1 ate 3 faca
      quantidades[i] <- 0
    fimpara
    para i de 1 ate volume faca
      alcancavel[i+1] <- falso
      opcao[i+1] <- 0
      para j de 1 ate 3 faca
        se i >= tamanhos[j] entao
          se alcancavel[i-tamanhos[j]+1] entao
            alcancavel[i+1] <- verdadeiro
            opcao[i+1] <- j
          fimse
        fimse
      fimpara
    fimpara
    maior <- 0
    para i de 0 ate volume faca
      se alcancavel[i+1] entao
        maior <- i
      fimse
    fimpara
    restante <- maior
    enquanto restante > 0 faca
      indice <- opcao[restante+1]
      quantidades[indice] <- quantidades[indice]+1
      restante <- restante-tamanhos[indice]
    fimenquanto
    para i de 1 ate 3 faca
      escreval("Copos de ", tamanhos[i], " mL: ", quantidades[i])
    fimpara
    escreval("Sobra: ", volume-maior, " mL")
  fimse
fimalgoritmo
```

A programação dinâmica marca volumes que podem ser servidos exatamente; o maior volume alcançável minimiza a sobra. O vetor de escolhas permite reconstruir os copos.
