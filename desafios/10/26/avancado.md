# Loja macabra

**Data:** 26 de outubro · **Nível:** Avançado

## Objetivo

Monte carrinho, aplique promoções por quantidade e controle estoque.

## Como funciona

Cadastre estoque e preço de três doces. Cada entrada do carrinho compra uma quantidade de um doce; três ou mais unidades na mesma entrada recebem 10% de desconto.

### Palavras úteis

- **Vetores paralelos:** São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa.

## Exemplo de execução

```text
Doce a R$ 5; compra de 3 → subtotal R$ 13,50 e estoque reduzido em 3
```

**Como ler o exemplo:** a seta → significa "resulta em".

Pedido superior ao estoque é recusado e não altera total nem estoque.

## Dicas para resolução

1. Use vetores paralelos para preço e estoque.
2. Valide quantidade.
3. Aplique a promoção antes de somar.

## Solução

```visualg
algoritmo "Desafio1026A"
var
estoque: vetor[1..3] de inteiro
  preco: vetor[1..3] de real
  i, item, quantidade: inteiro
  subtotal, total: real
inicio
para i de 1 ate 3 faca
    escreva("Estoque do doce ", i, ": ")
    leia(estoque[i])
    escreva("Preço unitário: ")
    leia(preco[i])
  fimpara
  total <- 0
  escreva("Doce (1 a 3; 0 fecha carrinho): ")
  leia(item)
  enquanto item <> 0 faca
    se (item >= 1) e (item <= 3) entao
      escreva("Quantidade: ")
      leia(quantidade)
      se (quantidade > 0) e (quantidade <= estoque[item]) e (preco[item] >= 0) entao
        subtotal <- quantidade * preco[item]
        se quantidade >= 3 entao
          subtotal <- subtotal * 0.9
        fimse
        total <- total + subtotal
        estoque[item] <- estoque[item] - quantidade
        escreval("Subtotal: R$ ", subtotal, "; estoque restante: ", estoque[item])
      senao
        escreval("Item indisponível ou quantidade inválida")
      fimse
    senao
      escreval("Doce desconhecido")
    fimse
    escreva("Doce (1 a 3; 0 fecha carrinho): ")
    leia(item)
  fimenquanto
  escreval("Total do carrinho: R$ ", total)
fimalgoritmo
```

O desconto é calculado antes de somar o subtotal, e o estoque muda apenas após validar a compra.
