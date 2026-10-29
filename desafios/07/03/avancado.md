# Distribuição de cobertores

**Data:** 3 de julho · **Nível:** Avançado

## Objetivo

Aloque itens a grupos segundo necessidade e estoque limitado.

## Como funciona

Atenda quatro grupos em ordem de cadastro, entregando até o necessário para cada um enquanto houver estoque.

## Exemplo de execução

```text
Estoque 5; grupos pedem 3 e 4 → recebem 3 e 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Pedido negativo é tratado como zero.

## Dicas para resolução

1. Use o mínimo entre necessidade e estoque.
2. Desconte cada entrega.
3. Mostre a falta por grupo.

## Solução

```visualg
algoritmo "Desafio0703A"
var
grupo: vetor[1..4] de caractere
  pedido, entregue: vetor[1..4] de inteiro
  i, estoque, repasse: inteiro
inicio
escreva("Cobertores disponíveis: ")
  leia(estoque)
  se estoque < 0 entao
    escreval("Estoque inválido")
  senao
    para i de 1 ate 4 faca
      escreva("Grupo ", i, ": ")
      leia(grupo[i])
      escreva("Cobertores necessários: ")
      leia(pedido[i])
      se pedido[i] < 0 entao
        pedido[i] <- 0
      fimse
      repasse <- pedido[i]
      se repasse > estoque entao
        repasse <- estoque
      fimse
      entregue[i] <- repasse
      estoque <- estoque - repasse
    fimpara
    para i de 1 ate 4 faca
      escreval(grupo[i], ": entregue ", entregue[i], ", faltam ", pedido[i] - entregue[i])
    fimpara
    escreval("Estoque restante: ", estoque)
  fimse
fimalgoritmo
```

O saldo diminui após cada grupo; o relatório separa entrega e demanda pendente.
