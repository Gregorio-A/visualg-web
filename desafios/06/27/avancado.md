# Convites por grupo

**Data:** 27 de junho · **Nível:** Avançado

## Objetivo

Divida lotes entre turmas e gere relatório de entregas e pendências.

## Como funciona

Distribua um lote de convites a quatro turmas na ordem de cadastro. Cada turma recebe até o que pediu ou o que restou.

## Exemplo de execução

```text
Lote 7; turmas pedem 5 e 4 → entregues 5 e 2; segunda fica com pendência 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Pedido negativo é tratado como zero.

## Dicas para resolução

1. Guarde pedidos por turma.
2. Entregue o mínimo entre pedido e saldo.
3. Calcule pendência por diferença.

## Solução

```visualg
algoritmo "Desafio0627A"
var
turma: vetor[1..4] de caractere
  pedido, entregue: vetor[1..4] de inteiro
  i, lote, repasse, pendente: inteiro
inicio
escreva("Convites disponíveis para distribuição: ")
  leia(lote)
  se lote < 0 entao
    escreval("Lote inválido")
  senao
    para i de 1 ate 4 faca
      escreva("Turma ", i, ": ")
      leia(turma[i])
      escreva("Convites pedidos: ")
      leia(pedido[i])
      se pedido[i] < 0 entao
        pedido[i] <- 0
      fimse
      repasse <- pedido[i]
      se repasse > lote entao
        repasse <- lote
      fimse
      entregue[i] <- repasse
      lote <- lote - repasse
    fimpara
    pendente <- 0
    para i de 1 ate 4 faca
      escreval(turma[i], ": entregue ", entregue[i], "; pendente ", pedido[i] - entregue[i])
      pendente <- pendente + pedido[i] - entregue[i]
    fimpara
    escreval("Lote restante: ", lote, "; pendências totais: ", pendente)
  fimse
fimalgoritmo
```

O lote diminui após cada entrega; relatório mostra diferenças entre pedido e recebido.
