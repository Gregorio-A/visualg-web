# Estoque do carrinho

**Data:** 8 de fevereiro · **Nível:** Avançado

## Objetivo

Simule pedidos e reposições de quatro bebidas sem permitir estoque negativo.

## Como funciona

Cadastre o estoque de quatro bebidas. Ação 1 retira unidades se houver saldo suficiente; ação 2 repõe unidades; ação 0 encerra. Bebida e quantidade devem ser válidas.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Estoque da bebida 1: 3
Pedido de 2 → atendido, estoque 1
Pedido de 2 → insuficiente, estoque 1
Reposição de 4 → estoque 5
```

**Como ler o exemplo:** a seta → significa "resulta em".

Um pedido recusado não altera o estoque.

## Dicas para resolução

1. Use um vetor de quatro posições.
2. Verifique saldo antes de atender pedidos.
3. Na reposição, some a quantidade positiva ao saldo atual.

## Solução

```visualg
algoritmo "Desafio0208A"
var
estoque: vetor[1..4] de inteiro
  bebida, quantidade, acao, i: inteiro
inicio
para i de 1 ate 4 faca
    escreva("Estoque inicial da bebida ", i, ": ")
    leia(estoque[i])
  fimpara
  escreva("Ação (1 pedido, 2 reposição, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Bebida (1 a 4): ")
    leia(bebida)
    escreva("Quantidade: ")
    leia(quantidade)
    se (bebida >= 1) e (bebida <= 4) e (quantidade > 0) entao
      se acao = 1 entao
        se quantidade <= estoque[bebida] entao
          estoque[bebida] <- estoque[bebida] - quantidade
          escreval("Pedido atendido.")
        senao
          escreval("Estoque insuficiente.")
        fimse
      senao
        se acao = 2 entao
          estoque[bebida] <- estoque[bebida] + quantidade
          escreval("Reposição registrada.")
        fimse
      fimse
    senao
      escreval("Operação inválida.")
    fimse
    escreva("Ação (1 pedido, 2 reposição, 0 sair): ")
    leia(acao)
  fimenquanto
  para i de 1 ate 4 faca
    escreval("Bebida ", i, ": ", estoque[i])
  fimpara
fimalgoritmo
```

Toda subtração é precedida de uma comparação com o saldo, impedindo estoque negativo.
