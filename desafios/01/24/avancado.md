# Estoque de materiais

**Data:** 24 de janeiro · **Nível:** Avançado

## Objetivo

Gerencie volumes de três recipientes e simule transferências sem derramamento.

Simule transferências entre três recipientes sem perder líquido nem exceder capacidade.

## Como funciona

Informe capacidade e volume inicial de cada recipiente. Para cada solicitação, transfira o menor entre o volume pedido, o conteúdo da origem e o espaço livre no destino.

## Exemplo de execução

```text
Recipiente 1: capacidade 10, volume 8; recipiente 2: capacidade 5, volume 4
Pedido: transferir 3 do 1 para o 2
Transferido: 1
Volumes finais: 7 e 5
```

Origem e destino iguais são rejeitados. Configure volumes iniciais entre zero e a capacidade de cada recipiente.

## Dicas para resolução

1. Calcule o espaço livre no destino.
2. Limite a transferência pelas três restrições.
3. Atualize os dois volumes com a mesma quantidade.

## Solução

```visualg
algoritmo "Desafio0124A"
var
capacidade, volume: vetor[1..3] de real
  origem, destino, i, turnos: inteiro
  pedido, transferido: real
inicio
para i de 1 ate 3 faca
    escreva("Capacidade do recipiente ", i, ": ")
    leia(capacidade[i])
    escreva("Volume inicial: ")
    leia(volume[i])
  fimpara
  escreva("Número de transferências: ")
  leia(turnos)
  para i de 1 ate turnos faca
    escreva("Origem (1 a 3): ")
    leia(origem)
    escreva("Destino (1 a 3): ")
    leia(destino)
    escreva("Volume solicitado: ")
    leia(pedido)
    se (origem >= 1) e (origem <= 3) e (destino >= 1) e (destino <= 3) e (origem <> destino) e (pedido > 0) entao
      transferido <- pedido
      se transferido > volume[origem] entao
        transferido <- volume[origem]
      fimse
      se transferido > capacidade[destino] - volume[destino] entao
        transferido <- capacidade[destino] - volume[destino]
      fimse
      se transferido > 0 entao
        volume[origem] <- volume[origem] - transferido
        volume[destino] <- volume[destino] + transferido
      fimse
      escreval("Transferido: ", transferido)
    senao
      escreval("Transferência inválida.")
    fimse
  fimpara
  para i de 1 ate 3 faca
    escreval("Recipiente ", i, ": ", volume[i])
  fimpara
fimalgoritmo
```

O mesmo `transferido` é subtraído de um recipiente e acrescentado ao outro, preservando o volume total.
