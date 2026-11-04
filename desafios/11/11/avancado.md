# Monitor de baterias

**Data:** 11 de novembro · **Nível:** Avançado

## Objetivo

Simule vários dispositivos com consumos diferentes por rodada.

## Como funciona

Três dispositivos têm carga e consumo fixo próprios. Simule dez rodadas, limite cargas a zero e identifique o primeiro que esgota.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Cargas 20 e 30, consumos 10 e 5 → primeiro esgota na rodada 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Consumos devem ser não negativos. Empate na rodada privilegia menor índice.

## Dicas para resolução

1. Guarde carga e consumo por índice.
2. Subtraia a cada rodada.
3. Registre o primeiro saldo que chega a zero.

## Solução

```visualg
algoritmo "Desafio1111A"
var
carga, consumo: vetor[1..3] de inteiro
  i, rodada, primeiro: inteiro
inicio
para i de 1 ate 3 faca
    escreva("Carga do dispositivo ", i, " (0 a 100): ")
    leia(carga[i])
    escreva("Consumo por rodada: ")
    leia(consumo[i])
  fimpara
  primeiro <- 0
  para rodada de 1 ate 10 faca
    para i de 1 ate 3 faca
      se carga[i] > 0 entao
        carga[i] <- carga[i] - consumo[i]
        se carga[i] <= 0 entao
          carga[i] <- 0
          se primeiro = 0 entao
            primeiro <- i
            escreval("Primeiro a esgotar: dispositivo ", i, " na rodada ", rodada)
          fimse
        fimse
      fimse
      escreval("Dispositivo ", i, ": ", carga[i], "%")
    fimpara
  fimpara
  se primeiro = 0 entao
    escreval("Nenhum dispositivo esgotou em dez rodadas")
  fimse
fimalgoritmo
```

Cada dispositivo mantém seu próprio saldo entre rodadas.
