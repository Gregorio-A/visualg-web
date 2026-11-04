# Distribuição de convites

**Data:** 21 de fevereiro · **Nível:** Avançado

## Objetivo

Atribua lotes a equipes, controle devoluções e confira saldo total.

## Como funciona

Entrega diminui o depósito e aumenta o saldo da equipe. Devolução faz o inverso, limitada ao saldo daquela equipe. Mostre os saldos e a soma final.

## Exemplo de execução

```text
Depósito inicial: 10; entregar 4 à equipe 1; devolver 1
Depósito: 7; equipe 1: 3; total: 10
```

Uma devolução superior ao saldo da equipe é rejeitada por inteiro.

## Dicas para resolução

1. Guarde um saldo por equipe.
2. Valide o saldo antes de entregar ou devolver.
3. Confira que depósito mais saldos das equipes permanece constante.

## Solução

```visualg
algoritmo "Desafio0221A"
var
saldo: vetor[1..3] de inteiro
  estoque, equipe, quantidade, acao, i, distribuidos: inteiro
inicio
escreva("Convites disponíveis: ")
  leia(estoque)
  para i de 1 ate 3 faca
    saldo[i] <- 0
  fimpara
  escreva("Ação (1 entregar lote, 2 devolver, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Equipe (1 a 3): ")
    leia(equipe)
    escreva("Quantidade: ")
    leia(quantidade)
    se (equipe >= 1) e (equipe <= 3) e (quantidade > 0) entao
      se (acao = 1) e (quantidade <= estoque) entao
        estoque <- estoque - quantidade
        saldo[equipe] <- saldo[equipe] + quantidade
      senao
        se (acao = 2) e (quantidade <= saldo[equipe]) entao
          saldo[equipe] <- saldo[equipe] - quantidade
          estoque <- estoque + quantidade
        senao
          escreval("Operação sem saldo suficiente.")
        fimse
      fimse
    senao
      escreval("Dados inválidos.")
    fimse
    escreva("Ação (1 entregar lote, 2 devolver, 0 sair): ")
    leia(acao)
  fimenquanto
  distribuidos <- 0
  para i de 1 ate 3 faca
    distribuidos <- distribuidos + saldo[i]
    escreval("Equipe ", i, " possui ", saldo[i])
  fimpara
  escreval("Depósito: ", estoque, "; com equipes: ", distribuidos, "; total: ", estoque + distribuidos)
fimalgoritmo
```

Cada transferência altera dois saldos em sentidos opostos, preservando o total de convites.
