# Painel das férias

**Data:** 31 de janeiro · **Nível:** Avançado

## Objetivo

Consolide gastos diários em matriz por pessoa e categoria e apresente totais.

Consolide uma semana de gastos de três pessoas em três categorias.

## Como funciona

Cada linha da matriz representa um par pessoa/dia; as três colunas representam categorias. Leia os 63 valores e some separadamente por pessoa e por categoria, além do total geral. Ignore valores negativos.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
Pessoa 1, dia 1, categoria 1: 10; os outros 62 valores: 0
Total pessoa 1: 10; pessoas 2 e 3: 0
Total categoria 1: 10; categorias 2 e 3: 0
Total geral: 10
```

Um gasto zero é válido. Um gasto negativo não entra nos totais.

## Dicas para resolução

1. Defina claramente o significado de linhas e colunas.
2. Inicie todos os acumuladores com zero.
3. Ao ler um gasto válido, atualize os totais da pessoa, da categoria e geral.

## Solução

```visualg
algoritmo "Desafio0131A"
var
gastos: vetor[1..21, 1..3] de real
  totalPessoa: vetor[1..3] de real
  totalCategoria: vetor[1..3] de real
  pessoa, dia, categoria, linha: inteiro
  total: real
inicio
para pessoa de 1 ate 3 faca
    totalPessoa[pessoa] <- 0
  fimpara
  para categoria de 1 ate 3 faca
    totalCategoria[categoria] <- 0
  fimpara
  total <- 0
  para pessoa de 1 ate 3 faca
    para dia de 1 ate 7 faca
      linha <- (pessoa - 1) * 7 + dia
      para categoria de 1 ate 3 faca
        escreva("Pessoa ", pessoa, ", dia ", dia, ", categoria ", categoria, ": ")
        leia(gastos[linha, categoria])
        se gastos[linha, categoria] >= 0 entao
          totalPessoa[pessoa] <- totalPessoa[pessoa] + gastos[linha, categoria]
          totalCategoria[categoria] <- totalCategoria[categoria] + gastos[linha, categoria]
          total <- total + gastos[linha, categoria]
        fimse
      fimpara
    fimpara
  fimpara
  para pessoa de 1 ate 3 faca
    escreval("Total da pessoa ", pessoa, ": ", totalPessoa[pessoa])
  fimpara
  para categoria de 1 ate 3 faca
    escreval("Total da categoria ", categoria, ": ", totalCategoria[categoria])
  fimpara
  escreval("Total geral: ", total)
fimalgoritmo
```

A expressão `(pessoa - 1) * 7 + dia` transforma pessoa e dia em uma linha única da matriz.
