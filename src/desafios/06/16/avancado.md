# Controle da bebida

**Data:** 16 de junho · **Nível:** Avançado

## Objetivo

Simule preparo em lotes e distribuição por consumo previsto.

## Como funciona

Produza lotes inteiros de tamanho fixo suficientes para o consumo previsto. Simule a entrega de um copo por pessoa e mostre a sobra.

## Exemplo de execução

```text
Previsão 11 copos, lote 5 → três lotes, 15 copos preparados, sobra 4
```

**Como ler o exemplo:** a seta → significa "resulta em".

Previsão zero produz zero lotes.

## Dicas para resolução

1. Arredonde lotes para cima.
2. Multiplique pela capacidade.
3. Subtraia um por consumidor.

## Solução

```visualg
algoritmo "Desafio0616A"
var
capacidade, previsto, lotes, preparado, restante, i: inteiro
inicio
escreva("Consumo previsto em copos: ")
  leia(previsto)
  escreva("Copos produzidos por lote: ")
  leia(capacidade)
  se (previsto < 0) ou (capacidade <= 0) entao
    escreval("Dados inválidos")
  senao
    lotes <- previsto div capacidade
    se previsto mod capacidade <> 0 entao
      lotes <- lotes + 1
    fimse
    preparado <- lotes * capacidade
    restante <- preparado
    escreval("Preparar ", lotes, " lote(s), total ", preparado, " copos")
    para i de 1 ate previsto faca
      restante <- restante - 1
    fimpara
    escreval("Distribuídos: ", previsto, "; sobra: ", restante)
  fimse
fimalgoritmo
```

O teto da divisão determina os lotes; a simulação reduz o estoque a cada copo distribuído.
