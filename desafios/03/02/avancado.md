# Lista de materiais

**Data:** 2 de março · **Nível:** Avançado

## Objetivo

Gerencie compras por categoria e destaque itens acima do orçamento.

## Como funciona

Cadastre cinco materiais com preço e categoria 1, 2 ou 3. Mostre os totais por categoria, itens que sozinhos excedem o orçamento e quanto o conjunto excede o orçamento.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Orçamento 50; caderno categoria 1 custa 30, estojo categoria 2 custa 25, demais itens custam 0
Total: 55
Compras acima do orçamento em 5
```

Uma compra exatamente igual ao orçamento não gera alerta.

## Dicas para resolução

1. Guarde preço e categoria do mesmo item no mesmo índice.
2. Compare itens isolados e total geral separadamente.
3. Some os preços de cada categoria em outra passagem.

## Solução

```visualg
algoritmo "Desafio0302A"
var
nome: vetor[1..5] de caractere
  preco: vetor[1..5] de real
  categoria: vetor[1..5] de inteiro
  orcamento, total, totalCategoria: real
  i, j: inteiro
inicio
escreva("Orçamento total: ")
  leia(orcamento)
  total <- 0
  para i de 1 ate 5 faca
    escreva("Material ", i, ": ")
    leia(nome[i])
    escreva("Categoria (1 a 3): ")
    leia(categoria[i])
    escreva("Preço: ")
    leia(preco[i])
    total <- total + preco[i]
    se preco[i] > orcamento entao
      escreval("Item isolado acima do orçamento: ", nome[i])
    fimse
  fimpara
  para j de 1 ate 3 faca
    totalCategoria <- 0
    para i de 1 ate 5 faca
      se categoria[i] = j entao
        totalCategoria <- totalCategoria + preco[i]
      fimse
    fimpara
    escreval("Categoria ", j, ": ", totalCategoria)
  fimpara
  escreval("Total: ", total)
  se total > orcamento entao
    escreval("Compras acima do orçamento em ", total - orcamento)
  fimse
fimalgoritmo
```

Os vetores guardam itens para a soma por categoria; o total geral é acumulado durante o cadastro.
