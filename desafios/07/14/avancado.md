# Roteiro de excursão

**Data:** 14 de julho · **Nível:** Avançado

## Objetivo

Avalie paradas e duração total, incluindo tempos de espera configurados.

## Como funciona

Percorra quatro paradas. Para cada uma, some tempo de viagem e depois de espera ao relógio acumulado.

## Exemplo de execução

```text
Início 480 min, viagem 30 e espera 10 → chegada 510, saída 520
```

**Como ler o exemplo:** a seta → significa "resulta em".

Tempo negativo invalida apenas aquele trecho. Relógio acima de 1440 indica dia seguinte.

## Dicas para resolução

1. Acumule viagem.
2. Registre chegada.
3. Acumule espera e registre saída.

## Solução

```visualg
algoritmo "Desafio0714A"
var
parada: vetor[1..4] de caractere
  viagem, espera: vetor[1..4] de inteiro
  i, relogio: inteiro
inicio
escreva("Hora inicial em minutos desde 00:00: ")
  leia(relogio)
  se relogio < 0 entao
    escreval("Horário inválido")
  senao
    para i de 1 ate 4 faca
      escreva("Parada ", i, ": ")
      leia(parada[i])
      escreva("Minutos de viagem até ela: ")
      leia(viagem[i])
      escreva("Minutos de espera nessa parada: ")
      leia(espera[i])
      se (viagem[i] >= 0) e (espera[i] >= 0) entao
        relogio <- relogio + viagem[i]
        escreval("Chegada a ", parada[i], ": ", relogio, " min")
        relogio <- relogio + espera[i]
        escreval("Saída: ", relogio, " min")
      senao
        escreval("Trecho inválido ignorado")
      fimse
    fimpara
    escreval("Fim do roteiro em ", relogio, " min")
  fimse
fimalgoritmo
```

O mesmo relógio representa a linha do tempo completa do ônibus.
