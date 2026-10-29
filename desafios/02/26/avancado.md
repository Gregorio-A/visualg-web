# Logística de copos

**Data:** 26 de fevereiro · **Nível:** Avançado

## Objetivo

Simule retiradas e devoluções com depósito reembolsável.

## Como funciona

Simule retirada e devolução de copos reutilizáveis. Cada retirada cobra depósito por copo; cada devolução o reembolsa. Não retire além do estoque nem devolva além dos copos em uso.

## Exemplo de execução

```text
Estoque 10; depósito R$ 2
Retirar 3 → cobra 6, estoque 7
Devolver 2 → reembolsa 4, estoque 9
Depósito em aberto: 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma operação recusada não altera copos ou depósito.

## Dicas para resolução

1. Mantenha dois saldos de copos.
2. Valide o saldo correspondente antes de cada operação.
3. Atualize o depósito pelo produto quantidade × valor por copo.

## Solução

```visualg
algoritmo "Desafio0226A"
var
disponiveis, retirados, depositoPorCopo, emAberto, saldoDeposito: inteiro
  acao, quantidade: inteiro
inicio
escreva("Copos disponíveis: ")
  leia(disponiveis)
  escreva("Depósito reembolsável por copo: ")
  leia(depositoPorCopo)
  emAberto <- 0
  saldoDeposito <- 0
  escreva("Ação (1 retirar, 2 devolver, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Quantidade: ")
    leia(quantidade)
    se quantidade > 0 entao
      se (acao = 1) e (quantidade <= disponiveis) entao
        disponiveis <- disponiveis - quantidade
        emAberto <- emAberto + quantidade
        saldoDeposito <- saldoDeposito + quantidade * depositoPorCopo
        escreval("Depósito cobrado: ", quantidade * depositoPorCopo)
      senao
        se (acao = 2) e (quantidade <= emAberto) entao
          emAberto <- emAberto - quantidade
          disponiveis <- disponiveis + quantidade
          saldoDeposito <- saldoDeposito - quantidade * depositoPorCopo
          escreval("Depósito devolvido: ", quantidade * depositoPorCopo)
        senao
          escreval("Operação sem saldo suficiente.")
        fimse
      fimse
    fimse
    escreva("Ação (1 retirar, 2 devolver, 0 sair): ")
    leia(acao)
  fimenquanto
  escreval("Copos disponíveis: ", disponiveis)
  escreval("Copos em uso: ", emAberto)
  escreval("Depósito em aberto: ", saldoDeposito)
fimalgoritmo
```

Os contadores de disponíveis e em uso movem unidades em sentidos contrários, e o depósito acompanha o número de copos em uso.
