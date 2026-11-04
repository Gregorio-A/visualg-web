# Cozinha de festas

**Data:** 7 de dezembro · **Nível:** Avançado

## Objetivo

Consolide ingredientes de receitas para diferentes quantidades de porções.

## Como funciona

Três receitas usam farinha, açúcar e leite; informe o consumo por porção e a quantidade de porções de cada receita. Mantenha unidade consistente para cada ingrediente.

## Exemplo de execução

```text
Duas receitas usam 100 g e 50 g de farinha por porção, com 2 porções cada → 300 g de farinha (terceira usa 0).
```

**Como ler o exemplo:** a seta → significa "resulta em".

Quantidade negativa é tratada como zero neste exemplo.

## Dicas para resolução

1. Use linhas para receitas e colunas para ingredientes.
2. Multiplique taxa por porções.
3. Some por ingrediente.

## Solução

```visualg
algoritmo "Desafio1207A"
var
  porcao: vetor[1..3,1..3] de real
  total: vetor[1..3] de real
  nomes: vetor[1..3] de caractere
  i, j, quantidade: inteiro
inicio
  nomes[1] <- "farinha"
  nomes[2] <- "açúcar"
  nomes[3] <- "leite"
  para j de 1 ate 3 faca
    total[j] <- 0
  fimpara
  para i de 1 ate 3 faca
    escreva("Porções da receita ", i, ": ")
    leia(quantidade)
    se quantidade < 0 entao
      quantidade <- 0
    fimse
    para j de 1 ate 3 faca
      escreva(nomes[j], " por porção: ")
      leia(porcao[i,j])
      se porcao[i,j] < 0 entao
        porcao[i,j] <- 0
      fimse
      total[j] <- total[j] + porcao[i,j] * quantidade
    fimpara
  fimpara
  para j de 1 ate 3 faca
    escreval(nomes[j], ": ", total[j]:0:2)
  fimpara
fimalgoritmo
```

Acumule para cada ingrediente o consumo por porção multiplicado pelas porções.
