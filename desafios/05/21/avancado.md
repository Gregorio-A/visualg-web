# Planejamento de produção

**Data:** 21 de maio · **Nível:** Avançado

## Objetivo

Distribua encomendas em dias respeitando capacidade diária máxima.

## Como funciona

Leia encomendas na ordem recebida. Uma encomenda não é fracionada; coloque-a no dia atual se couber, senão abra o próximo dia.

## Exemplo de execução

```text
Capacidade 10; encomendas 6, 5, 3
Dia 1: 6; dia 2: 8 unidades
```

Encomenda maior que a capacidade diária é recusada sem alterar o planejamento.

## Dicas para resolução

1. Mantenha carga do dia atual.
2. Teste se a próxima encomenda cabe.
3. Feche o dia antes de exceder a capacidade.

## Solução

```visualg
algoritmo "Desafio0521A"
var
i, j, pedidos, capacidade, quantidade, dia, carga: inteiro
inicio
escreva("Capacidade por dia: ")
  leia(capacidade)
  escreva("Número de encomendas: ")
  leia(pedidos)
  se (capacidade <= 0) ou (pedidos < 0) entao
    escreval("Dados inválidos")
  senao
    dia <- 1
    carga <- 0
    para i de 1 ate pedidos faca
      escreva("Unidades da encomenda ", i, ": ")
      leia(quantidade)
      se (quantidade <= 0) ou (quantidade > capacidade) entao
        escreval("Encomenda ", i, " não cabe em um dia")
      senao
        se carga + quantidade > capacidade entao
          escreval("Dia ", dia, ": ", carga, " unidade(s)")
          dia <- dia + 1
          carga <- 0
        fimse
        carga <- carga + quantidade
        escreval("Encomenda ", i, " atribuída ao dia ", dia)
      fimse
    fimpara
    se carga > 0 entao
      escreval("Dia ", dia, ": ", carga, " unidade(s)")
    fimse
  fimse
fimalgoritmo
```

A soma do dia nunca supera a capacidade porque a mudança de dia ocorre antes de incluir a encomenda.
