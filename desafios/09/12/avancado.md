# Histórico de nebulosidade

**Data:** 12 de setembro · **Nível:** Avançado

## Objetivo

Processe 14 dias e identifique séries de dias acima de 70%.

## Como funciona

Leia catorze percentuais e identifique blocos consecutivos de dias com nebulosidade estritamente maior que 70%.

## Exemplo de execução

```text
75,80,60,90 → duas séries; maior tem 2 dias
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valor exatamente 70% interrompe a série.

## Dicas para resolução

1. Compare >70.
2. Conte início de bloco.
3. Guarde o maior comprimento.

## Solução

```visualg
algoritmo "Desafio0912A"
var
nebulosidade: vetor[1..14] de real
  i, atual, maior, inicioAtual, inicioMaior, series: inteiro
inicio
atual <- 0
  maior <- 0
  series <- 0
  para i de 1 ate 14 faca
    escreva("Nebulosidade do dia ", i, " (%): ")
    leia(nebulosidade[i])
    se nebulosidade[i] > 70 entao
      se atual = 0 entao
        inicioAtual <- i
        series <- series + 1
      fimse
      atual <- atual + 1
      se atual > maior entao
        maior <- atual
        inicioMaior <- inicioAtual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  escreval("Séries acima de 70%: ", series)
  se maior > 0 entao
    escreval("Maior série: dias ", inicioMaior, " a ", inicioMaior + maior - 1, " (", maior, ")")
  fimse
fimalgoritmo
```

Cada transição de fora para dentro da faixa abre uma nova série.
