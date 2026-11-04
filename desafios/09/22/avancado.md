# Painel de qualidade do ar

**Data:** 22 de setembro · **Nível:** Avançado

## Objetivo

Consolide sensores e identifique medições fora do limite por região.

## Como funciona

Três regiões possuem quatro sensores cada. Calcule média por região e conte leituras estritamente acima do limite.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Região com 10,20,30,40 e limite 25 → média 25; dois sensores acima
```

**Como ler o exemplo:** a seta → significa "resulta em".

Leitura exatamente no limite não é marcada.

## Dicas para resolução

1. Use matriz região×sensor.
2. Some para média.
3. Conte leituras acima do limite.

## Solução

```visualg
algoritmo "Desafio0922A"
var
leitura: vetor[1..3, 1..4] de real
  regiao, sensor, fora: inteiro
  limite, soma: real
inicio
escreva("Limite máximo de qualidade do ar: ")
  leia(limite)
  para regiao de 1 ate 3 faca
    fora <- 0
    soma <- 0
    para sensor de 1 ate 4 faca
      escreva("Região ", regiao, " sensor ", sensor, ": ")
      leia(leitura[regiao, sensor])
      soma <- soma + leitura[regiao, sensor]
      se leitura[regiao, sensor] > limite entao
        fora <- fora + 1
        escreval("Sensor acima do limite")
      fimse
    fimpara
    escreval("Região ", regiao, ": média ", soma / 4, "; ", fora, " sensor(es) acima do limite")
  fimpara
fimalgoritmo
```

Cada linha da matriz contém sensores de uma região.
