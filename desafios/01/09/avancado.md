# Caixa da lanchonete

**Data:** 9 de janeiro · **Nível:** Avançado

## Objetivo

Monte um menu de pedidos, controle estoque de cinco itens e calcule troco.

Monte um caixa de lanchonete com cinco produtos, estoque e cálculo de troco.

## Como funciona

Cadastre nome, preço e estoque de cinco itens. Leia pedidos até código 0; somente pedidos com quantidade positiva e estoque suficiente reduzem unidades e entram no total. Depois leia o pagamento.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Produto 1: suco, preço 5, estoque 3
Pedido: produto 1, quantidade 2; depois 0
Total: 10
Valor pago: 20
Troco: 10
```

Um pedido de quantidade superior ao estoque é recusado integralmente. Pagamento menor que total mostra quanto falta.

## Dicas para resolução

1. Guarde preço e estoque em vetores indexados pelo número do produto.
2. Valide o índice antes de acessar um vetor.
3. Diminua o estoque só depois de conferir a quantidade.

## Solução

```visualg
algoritmo "Desafio0109A"
var
nome: vetor[1..5] de caractere
  preco: vetor[1..5] de real
  estoque: vetor[1..5] de inteiro
  i, opcao, quantidade: inteiro
  total, pago: real
inicio
para i de 1 ate 5 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    escreva("Preço: ")
    leia(preco[i])
    escreva("Estoque: ")
    leia(estoque[i])
  fimpara
  total <- 0
  escreva("Produto desejado (1 a 5; 0 encerra): ")
  leia(opcao)
  enquanto opcao <> 0 faca
    se (opcao >= 1) e (opcao <= 5) entao
      escreva("Quantidade: ")
      leia(quantidade)
      se (quantidade > 0) e (quantidade <= estoque[opcao]) entao
        estoque[opcao] <- estoque[opcao] - quantidade
        total <- total + quantidade * preco[opcao]
      senao
        escreval("Quantidade inválida ou estoque insuficiente.")
      fimse
    senao
      escreval("Produto inválido.")
    fimse
    escreva("Produto desejado (1 a 5; 0 encerra): ")
    leia(opcao)
  fimenquanto
  escreval("Total: ", total)
  escreva("Valor pago: ")
  leia(pago)
  se pago >= total entao
    escreval("Troco: ", pago - total)
  senao
    escreval("Pagamento insuficiente; faltam: ", total - pago)
  fimse
fimalgoritmo
```

Cada venda atualiza o estoque e a compra no mesmo passo, impedindo vender a mesma unidade mais de uma vez.
