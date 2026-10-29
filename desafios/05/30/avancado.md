# Auditoria do caixa

**Data:** 30 de maio · **Nível:** Avançado

## Objetivo

Reconcilie vendas, sangrias e pagamentos e identifique divergências.

## Como funciona

Parta do saldo de abertura. Vendas entram no caixa; sangrias e pagamentos saem. Compare o saldo esperado com o dinheiro contado.

### Palavras úteis

- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
Abertura R$ 100; venda R$ 50; sangria R$ 20; contado R$ 125
Esperado R$ 130; divergência R$ -5
```

Valor negativo é ignorado. Divergência positiva significa sobra de dinheiro.

## Dicas para resolução

1. Some vendas.
2. Subtraia sangrias e pagamentos.
3. Faça contado menos esperado.

## Solução

```visualg
algoritmo "Desafio0530A"
var
i, vendas, retiradas, pagamentos: inteiro
  abertura, valor, esperado, contado, diferenca: real
inicio
escreva("Saldo de abertura: ")
  leia(abertura)
  esperado <- abertura
  escreva("Número de lançamentos: ")
  leia(vendas)
  para i de 1 ate vendas faca
    escreva("Tipo (1 venda, 2 sangria, 3 pagamento): ")
    leia(pagamentos)
    escreva("Valor: ")
    leia(valor)
    se valor < 0 entao
      escreval("Valor inválido ignorado")
    senao
      se pagamentos = 1 entao
        esperado <- esperado + valor
      senao
        se (pagamentos = 2) ou (pagamentos = 3) entao
          esperado <- esperado - valor
        fimse
      fimse
    fimse
  fimpara
  escreva("Saldo contado: ")
  leia(contado)
  diferenca <- contado - esperado
  escreval("Saldo esperado: R$ ", esperado)
  se diferenca = 0 entao
    escreval("Caixa conciliado")
  senao
    escreval("Divergência: R$ ", diferenca)
  fimse
fimalgoritmo
```

O acumulador reproduz o fluxo de entradas e saídas antes da conferência física.
