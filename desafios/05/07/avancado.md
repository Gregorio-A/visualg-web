# Clube de benefícios

**Data:** 7 de maio · **Nível:** Avançado

## Objetivo

Acumule pontos e permita resgate obedecendo saldo e regras de pontos.

## Como funciona

Cada R$ 10 inteiros em uma compra rendem um ponto. Permita acumular compras e resgatar quantidade positiva de pontos que não exceda o saldo.

## Exemplo de execução

```text
Compra de R$ 35 → 3 pontos
Resgate de 2 → saldo 1
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma compra de R$ 9 rende zero ponto. Um resgate maior que o saldo é recusado.

## Dicas para resolução

1. Use um saldo acumulado.
2. Calcule pontos por divisão inteira.
3. Confira saldo antes de resgatar.

## Solução

```visualg
algoritmo "Desafio0507A"
var
pontos, compra, resgate, acao: inteiro
inicio
pontos <- 0
  escreva("Ação (1 compra, 2 resgate, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se acao = 1 entao
      escreva("Valor inteiro da compra: ")
      leia(compra)
      se compra > 0 entao
        pontos <- pontos + compra div 10
      fimse
    senao
      se acao = 2 entao
        escreva("Pontos a resgatar: ")
        leia(resgate)
        se (resgate > 0) e (resgate <= pontos) entao
          pontos <- pontos - resgate
          escreval("Resgate autorizado.")
        senao
          escreval("Resgate recusado.")
        fimse
      fimse
    fimse
    escreval("Saldo de pontos: ", pontos)
    escreva("Ação (1 compra, 2 resgate, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Divisão inteira calcula pontos ganhos; o saldo só diminui após validar o resgate.
