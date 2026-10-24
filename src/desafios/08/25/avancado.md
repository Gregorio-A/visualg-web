# Compactador fictício

**Data:** 25 de agosto · **Nível:** Avançado

## Objetivo

Agrupe arquivos por extensão e estime redução com taxas diferentes.

## Como funciona

Classifique cinco arquivos por extensão. Estime redução de 30% para JPG, 10% para MP4 e 0% para outras extensões.

## Exemplo de execução

```text
JPG de 10 MB → 7 MB estimados; economia 3 MB
```

**Como ler o exemplo:** a seta → significa "resulta em".

Tamanho negativo é ignorado nos totais.

## Dicas para resolução

1. Classifique extensão.
2. Aplique a taxa adequada.
3. Acumule original e reduzido.

## Solução

```visualg
algoritmo "Desafio0825A"
var
extensao: vetor[1..5] de caractere
  tamanho: vetor[1..5] de real
  i, fotos, videos, outros: inteiro
  original, reduzido, taxa: real
inicio
original <- 0
  reduzido <- 0
  fotos <- 0
  videos <- 0
  outros <- 0
  para i de 1 ate 5 faca
    escreva("Extensão do arquivo ", i, " (jpg, mp4 ou outra): ")
    leia(extensao[i])
    escreva("Tamanho em MB: ")
    leia(tamanho[i])
    taxa <- 0
    se minusc(extensao[i]) = "jpg" entao
      taxa <- 0.3
      fotos <- fotos + 1
    senao
      se minusc(extensao[i]) = "mp4" entao
        taxa <- 0.1
        videos <- videos + 1
      senao
        outros <- outros + 1
      fimse
    fimse
    se tamanho[i] >= 0 entao
      original <- original + tamanho[i]
      reduzido <- reduzido + tamanho[i] * (1 - taxa)
    fimse
  fimpara
  escreval("JPG: ", fotos, "; MP4: ", videos, "; outros: ", outros)
  escreval("Original: ", original, " MB; estimado: ", reduzido, " MB; economia: ", original - reduzido, " MB")
fimalgoritmo
```

A taxa depende da extensão e o tamanho estimado é calculado arquivo por arquivo.
