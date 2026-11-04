# Loja virtual fictícia

**Data:** 8 de agosto · **Nível:** Avançado

## Objetivo

Gerencie saldo, itens, inventário e operações de compra e venda.

## Como funciona

Compre itens inteiros se houver estoque e moedas. Venda itens da mochila à metade do preço de tabela, arredondada para baixo.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Item custa 10 moedas: compra por 10, venda por 5
```

Compra sem saldo ou venda sem item é recusada sem alterar inventário.

## Dicas para resolução

1. Valide saldo para comprar.
2. Valide inventário para vender.
3. Atualize moedas e quantidades juntos.

## Solução

```visualg
algoritmo "Desafio0808A"
var
saldo, estoque, inventario: vetor[1..3] de inteiro
  preco: vetor[1..3] de inteiro
  i, moedas, acao, item, quantidade, valor: inteiro
inicio
escreva("Moedas iniciais: ")
  leia(moedas)
  para i de 1 ate 3 faca
    escreva("Preço do item ", i, ": ")
    leia(preco[i])
    escreva("Estoque da loja: ")
    leia(estoque[i])
    inventario[i] <- 0
  fimpara
  escreva("Ação (1 comprar, 2 vender, 3 consultar, 0 sair): ")
  leia(acao)
  enquanto acao <> 0 faca
    se (acao = 1) ou (acao = 2) entao
      escreva("Item (1 a 3): ")
      leia(item)
      escreva("Quantidade: ")
      leia(quantidade)
      se (item < 1) ou (item > 3) ou (quantidade <= 0) entao
        escreval("Pedido inválido")
      senao
        valor <- preco[item] * quantidade
        se (acao = 1) e (quantidade <= estoque[item]) e (valor <= moedas) e (preco[item] >= 0) entao
          moedas <- moedas - valor
          estoque[item] <- estoque[item] - quantidade
          inventario[item] <- inventario[item] + quantidade
          escreval("Compra concluída")
        senao
          se (acao = 2) e (quantidade <= inventario[item]) e (preco[item] >= 0) entao
            moedas <- moedas + valor div 2
            inventario[item] <- inventario[item] - quantidade
            estoque[item] <- estoque[item] + quantidade
            escreval("Venda concluída por ", valor div 2, " moeda(s)")
          senao
            escreval("Operação recusada")
          fimse
        fimse
      fimse
    senao
      se acao = 3 entao
        escreval("Moedas: ", moedas)
        para i de 1 ate 3 faca
          escreval("Item ", i, ": loja ", estoque[i], ", mochila ", inventario[i])
        fimpara
      fimse
    fimse
    escreva("Ação (1 comprar, 2 vender, 3 consultar, 0 sair): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Três vetores acompanham preço, estoque da loja e inventário do jogador.
