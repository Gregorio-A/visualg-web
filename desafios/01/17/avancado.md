# Comparativo de estradas

**Data:** 17 de janeiro · **Nível:** Avançado

## Objetivo

Avalie rotas por quilômetros, consumo e pedágios e selecione menor custo total.

Compare três estradas pelo custo total estimado de combustível e pedágios.

## Como funciona

Leia preço por litro uma vez. Para cada rota, leia distância, rendimento em quilômetros por litro e total de pedágios em dinheiro. O custo é `(km / kmPorLitro) × preçoLitro + pedágios`.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Combustível: R$ 5/L
Rota A: 100 km, 10 km/L, pedágios R$ 10 → R$ 60
Rota B: 120 km, 12 km/L, pedágios R$ 0 → R$ 50
Rota C: 80 km, 8 km/L, pedágios R$ 20 → R$ 70
Menor custo: B — 50
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma rota com rendimento zero ou negativo é descartada para evitar divisão inválida.

## Dicas para resolução

1. Calcule o volume de combustível como distância dividida pelo rendimento.
2. Converta esse volume em custo e some os pedágios.
3. Compare apenas rotas com rendimento positivo.

## Solução

```visualg
algoritmo "Desafio0117A"
var
nome: vetor[1..3] de caractere
  custo: vetor[1..3] de real
  km, kmPorLitro, precoLitro, pedagios: real
  i, melhor: inteiro
inicio
escreva("Preço do combustível por litro: ")
  leia(precoLitro)
  melhor <- 0
  para i de 1 ate 3 faca
    escreva("Rota ", i, ": ")
    leia(nome[i])
    escreva("Distância (km): ")
    leia(km)
    escreva("Consumo (km por litro): ")
    leia(kmPorLitro)
    escreva("Total de pedágios: ")
    leia(pedagios)
    se kmPorLitro > 0 entao
      custo[i] <- km / kmPorLitro * precoLitro + pedagios
      se melhor = 0 entao
        melhor <- i
      senao
        se custo[i] < custo[melhor] entao
          melhor <- i
        fimse
      fimse
    senao
      custo[i] <- -1
    fimse
  fimpara
  para i de 1 ate 3 faca
    se custo[i] >= 0 entao
      escreval(nome[i], ": ", custo[i])
    fimse
  fimpara
  se melhor > 0 entao
    escreval("Menor custo: ", nome[melhor], " — ", custo[melhor])
  senao
    escreval("Nenhuma rota válida.")
  fimse
fimalgoritmo
```

O índice `melhor` aponta para o menor custo válido encontrado até o momento.
