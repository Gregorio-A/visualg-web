# Fechamento do caixa

**Data:** 2 de maio · **Nível:** Avançado

## Objetivo

Registre vendas de cinco produtos e emita faturamento, quantidades e ticket médio.

## Como funciona

Cadastre cinco produtos. Cada registro de venda contém um produto e uma quantidade; o código 0 encerra. Calcule unidades por produto, faturamento e ticket médio por pedido válido.

### Palavras úteis

- **Vetores paralelos:** São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa.

## Exemplo de execução

```text
Produto A custa 10; dois pedidos, 1 unidade e 2 unidades
Faturamento 30; ticket médio 15
```

Sem pedidos, o ticket médio não é calculado para evitar divisão por zero.

## Dicas para resolução

1. Guarde preços e quantidades em vetores paralelos.
2. Conte pedidos válidos separadamente das unidades.
3. Calcule ticket só se houve pedido.

## Solução

```visualg
algoritmo "Desafio0502A"
var
nome: vetor[1..5] de caractere
  preco: vetor[1..5] de real
  vendidos: vetor[1..5] de inteiro
  i, produto, quantidade, clientes: inteiro
  faturamento, ticket: real
inicio
para i de 1 ate 5 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    escreva("Preço: ")
    leia(preco[i])
    vendidos[i] <- 0
  fimpara
  clientes <- 0
  escreva("Produto vendido (1 a 5; 0 encerra): ")
  leia(produto)
  enquanto produto <> 0 faca
    se (produto >= 1) e (produto <= 5) entao
      escreva("Quantidade: ")
      leia(quantidade)
      se quantidade > 0 entao
        vendidos[produto] <- vendidos[produto] + quantidade
        clientes <- clientes + 1
      fimse
    fimse
    escreva("Produto vendido (1 a 5; 0 encerra): ")
    leia(produto)
  fimenquanto
  faturamento <- 0
  para i de 1 ate 5 faca
    escreval(nome[i], ": ", vendidos[i], " unidade(s)")
    faturamento <- faturamento + vendidos[i] * preco[i]
  fimpara
  escreval("Faturamento: ", faturamento)
  se clientes > 0 entao
    ticket <- faturamento / clientes
    escreval("Ticket médio por pedido: ", ticket)
  senao
    escreval("Ticket médio indisponível: sem pedidos.")
  fimse
fimalgoritmo
```

O total faturado é a soma de unidades vendidas vezes preço; o ticket divide esse total pela quantidade de pedidos válidos.
