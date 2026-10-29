# Banco de horas

**Data:** 14 de maio · **Nível:** Avançado

## Objetivo

Controle créditos e débitos de horas em vários dias e feche o saldo.

## Como funciona

Registre sete variações diárias em minutos; números positivos são créditos e negativos são débitos. Mostre o saldo após cada dia e o fechamento.

### Palavras úteis

- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
+30, -10, 0, 0, 0, 0, 0
Crédito final de 20 min
```

Saldo zero deve ser exibido como banco de horas zerado.

## Dicas para resolução

1. Use um acumulador com sinal.
2. Some cada variação.
3. Classifique o saldo ao final.

## Solução

```visualg
algoritmo "Desafio0514A"
var
i, minutos, saldo: inteiro
inicio
saldo <- 0
  para i de 1 ate 7 faca
    escreva("Variação do dia ", i, " em minutos (+ crédito, - débito): ")
    leia(minutos)
    saldo <- saldo + minutos
    escreval("Saldo após dia ", i, ": ", saldo, " min")
  fimpara
  se saldo > 0 entao
    escreval("Crédito final de ", saldo, " min")
  senao
    se saldo < 0 entao
      escreval("Débito final de ", 0 - saldo, " min")
    senao
      escreval("Banco de horas zerado")
    fimse
  fimse
fimalgoritmo
```

O sinal do saldo final indica se há horas a compensar ou a receber.
