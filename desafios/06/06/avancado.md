# Montador de lanches

**Data:** 6 de junho · **Nível:** Avançado

## Objetivo

Combine adicionais, calcule custo e controle ingredientes disponíveis.

## Como funciona

O lanche base custa R$ 8; queijo R$ 2, milho R$ 1 e molho R$ 1. Cada adicional é opcional e exige uma unidade em estoque.

## Exemplo de execução

```text
Lanche com queijo e molho → R$ 11; estoque desses dois cai em um
```

**Como ler o exemplo:** a seta → significa "resulta em".

Pedido com ingrediente esgotado é recusado inteiro, sem consumir os outros.

## Dicas para resolução

1. Leia opções 0/1.
2. Confira todos os estoques.
3. Desconte ingredientes só após validar.

## Solução

```visualg
algoritmo "Desafio0606A"
var
estoque: vetor[1..3] de inteiro
  i, pedidos, queijo, milho, molho: inteiro
  custo, total: real
inicio
para i de 1 ate 3 faca
    escreva("Estoque do adicional ", i, " (1 queijo, 2 milho, 3 molho): ")
    leia(estoque[i])
  fimpara
  escreva("Número de lanches: ")
  leia(pedidos)
  total <- 0
  se pedidos > 0 entao
    para i de 1 ate pedidos faca
      escreva("Adicionar queijo? (0/1): ")
      leia(queijo)
      escreva("Adicionar milho? (0/1): ")
      leia(milho)
      escreva("Adicionar molho? (0/1): ")
      leia(molho)
      se (queijo < 0) ou (queijo > 1) ou (milho < 0) ou (milho > 1) ou (molho < 0) ou (molho > 1) entao
        escreval("Opção inválida")
      senao
        se (queijo > estoque[1]) ou (milho > estoque[2]) ou (molho > estoque[3]) entao
          escreval("Ingrediente indisponível")
        senao
          estoque[1] <- estoque[1] - queijo
          estoque[2] <- estoque[2] - milho
          estoque[3] <- estoque[3] - molho
          custo <- 8 + 2 * queijo + milho + molho
          total <- total + custo
          escreval("Lanche ", i, ": R$ ", custo)
        fimse
      fimse
    fimpara
  fimse
  escreval("Total recebido: R$ ", total)
fimalgoritmo
```

O pedido é validado como um conjunto antes de subtrair estoques e calcular o preço.
