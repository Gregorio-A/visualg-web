# Caixa da barraca

**Data:** 2 de junho · **Nível:** Avançado

## Objetivo

Registre vendas por produto e quantidades com estoque limitado.

## Como funciona

Cadastre três produtos, cada um com estoque e preço. Registre vendas até informar zero; uma venda só passa se houver quantidade suficiente.

### Palavras úteis

- **Vetores paralelos:** São listas em que a mesma posição fala do mesmo item. Por exemplo, nome[2] e nota[2] pertencem à mesma pessoa.

## Exemplo de execução

```text
Estoque 5, preço R$ 4; venda 2 → caixa R$ 8 e estoque 3
```

**Como ler o exemplo:** a seta → significa "resulta em".

Quantidade zero ou superior ao estoque é recusada.

## Dicas para resolução

1. Use vetores paralelos.
2. Valide estoque antes de vender.
3. Atualize caixa e estoque juntos.

## Solução

```visualg
algoritmo "Desafio0602A"
var
nome: vetor[1..3] de caractere
  estoque: vetor[1..3] de inteiro
  preco: vetor[1..3] de real
  i, item, quantidade: inteiro
  caixa: real
inicio
para i de 1 ate 3 faca
    escreva("Produto ", i, ": ")
    leia(nome[i])
    escreva("Estoque: ")
    leia(estoque[i])
    escreva("Preço unitário: ")
    leia(preco[i])
  fimpara
  caixa <- 0
  escreva("Produto vendido (1 a 3; 0 encerra): ")
  leia(item)
  enquanto item <> 0 faca
    se (item >= 1) e (item <= 3) entao
      escreva("Quantidade: ")
      leia(quantidade)
      se (quantidade > 0) e (quantidade <= estoque[item]) e (preco[item] >= 0) entao
        estoque[item] <- estoque[item] - quantidade
        caixa <- caixa + preco[item] * quantidade
        escreval("Venda de ", nome[item], " registrada")
      senao
        escreval("Venda recusada")
      fimse
    senao
      escreval("Produto inválido")
    fimse
    escreva("Produto vendido (1 a 3; 0 encerra): ")
    leia(item)
  fimenquanto
  escreval("Caixa: R$ ", caixa)
  para i de 1 ate 3 faca
    escreval(nome[i], ": ", estoque[i], " unidade(s) restantes")
  fimpara
fimalgoritmo
```

A mesma posição dos vetores associa nome, saldo e preço do produto.
