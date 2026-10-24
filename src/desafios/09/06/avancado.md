# Banco de sementes

**Data:** 6 de setembro · **Nível:** Avançado

## Objetivo

Controle estoque por espécie e validade fictícia por mês numérico.

## Como funciona

Três lotes têm espécie, saldo e mês de validade no mesmo ano. Retire sementes apenas se o mês atual não superar o vencimento e houver saldo.

## Exemplo de execução

```text
Mês atual 5, validade 4 → retirada recusada por vencimento
```

**Como ler o exemplo:** a seta → significa "resulta em".

O exercício assume todas as datas dentro do mesmo ano; o mês de validade ainda é válido durante ele.

## Dicas para resolução

1. Guarde validade por espécie.
2. Cheque mês antes de retirar.
3. Desconte apenas pedido válido.

## Solução

```visualg
algoritmo "Desafio0906A"
var
especie: vetor[1..3] de caractere
  estoque, vencimento: vetor[1..3] de inteiro
  i, mesAtual, acao, tipo, quantidade: inteiro
inicio
escreva("Mês atual (1 a 12): ")
  leia(mesAtual)
  para i de 1 ate 3 faca
    escreva("Espécie ", i, ": ")
    leia(especie[i])
    escreva("Estoque: ")
    leia(estoque[i])
    escreva("Mês de validade (1 a 12): ")
    leia(vencimento[i])
  fimpara
  escreva("Espécie para retirada (1 a 3; 0 encerra): ")
  leia(tipo)
  enquanto tipo <> 0 faca
    escreva("Quantidade: ")
    leia(quantidade)
    se (tipo < 1) ou (tipo > 3) ou (quantidade <= 0) entao
      escreval("Pedido inválido")
    senao
      se vencimento[tipo] < mesAtual entao
        escreval("Lote vencido")
      senao
        se quantidade <= estoque[tipo] entao
          estoque[tipo] <- estoque[tipo] - quantidade
          escreval("Retirada de ", especie[tipo], " autorizada")
        senao
          escreval("Estoque insuficiente")
        fimse
      fimse
    fimse
    escreva("Espécie para retirada (1 a 3; 0 encerra): ")
    leia(tipo)
  fimenquanto
fimalgoritmo
```

A comparação numérica de meses identifica vencimento neste modelo anual.
