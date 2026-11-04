# Criador de salas

**Data:** 29 de agosto · **Nível:** Avançado

## Objetivo

Distribua jogadores por salas de capacidade fixa e sinalize salas incompletas.

## Como funciona

Distribua jogadores em salas de capacidade fixa, preenchendo cada sala antes de abrir a próxima. Informe quais ficaram incompletas.

## Exemplo de execução

```text
10 jogadores, capacidade 4 → salas 4, 4 e 2; faltam 2 na última
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero jogador cria zero sala.

## Dicas para resolução

1. Calcule quantas salas são necessárias.
2. Preencha até a capacidade.
3. Sinalize a última sala parcial.

## Solução

```visualg
algoritmo "Desafio0829A"
var
jogadores, capacidade, sala, ocupacao, salas: inteiro
inicio
escreva("Jogadores disponíveis: ")
  leia(jogadores)
  escreva("Capacidade por sala: ")
  leia(capacidade)
  se (jogadores < 0) ou (capacidade <= 0) entao
    escreval("Dados inválidos")
  senao
    salas <- jogadores div capacidade
    se jogadores mod capacidade <> 0 entao
      salas <- salas + 1
    fimse
    para sala de 1 ate salas faca
      ocupacao <- capacidade
      se jogadores < capacidade entao
        ocupacao <- jogadores
      fimse
      jogadores <- jogadores - ocupacao
      se ocupacao = capacidade entao
        escreval("Sala ", sala, ": completa com ", ocupacao)
      senao
        escreval("Sala ", sala, ": incompleta com ", ocupacao, "; faltam ", capacidade - ocupacao)
      fimse
    fimpara
  fimse
fimalgoritmo
```

O número de salas é a divisão arredondada para cima; a distribuição consome a quantidade restante.
