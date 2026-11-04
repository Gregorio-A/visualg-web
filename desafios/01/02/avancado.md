# Histórico de calor

**Data:** 2 de janeiro · **Nível:** Avançado

## Objetivo

Leia sete temperaturas em vetor e informe média, máxima e dias acima da média.

Analise sete temperaturas diárias e informe média, valor máximo e quantidade de dias acima da média.

## Como funciona

Guarde as sete medições. Calcule soma e máxima na leitura. Faça uma segunda passagem depois de obter a média para contar apenas valores estritamente acima dela.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Temperaturas: 20, 22, 24, 26, 28, 30, 32
Média: 26
Máxima: 32
Dias acima da média: 3
```

Valores iguais à média não entram na contagem. Todas as temperaturas podem ser negativas.

## Dicas para resolução

1. Armazene os sete valores em vetor.
2. Calcule a média com a soma dividida por sete.
3. Percorra o vetor novamente e conte apenas `temperaturas[i] > media`.

## Solução

```visualg
algoritmo "Desafio0102A"
var
temperaturas: vetor[1..7] de real
  soma, media, maxima: real
  i, acima: inteiro
inicio
soma <- 0
  para i de 1 ate 7 faca
    escreva("Temperatura do dia ", i, ": ")
    leia(temperaturas[i])
    soma <- soma + temperaturas[i]
    se (i = 1) ou (temperaturas[i] > maxima) entao
      maxima <- temperaturas[i]
    fimse
  fimpara
  media <- soma / 7
  acima <- 0
  para i de 1 ate 7 faca
    se temperaturas[i] > media entao
      acima <- acima + 1
    fimse
  fimpara
  escreval("Média: ", media)
  escreval("Máxima: ", maxima)
  escreval("Dias acima da média: ", acima)
fimalgoritmo
```

A segunda passagem é necessária porque a média só fica conhecida após a leitura de todos os dias.
