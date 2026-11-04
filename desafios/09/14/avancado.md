# Irrigação por setores

**Data:** 14 de setembro · **Nível:** Avançado

## Objetivo

Represente canteiros em matriz e calcule água necessária por tipo de planta.

## Como funciona

Matriz 3×4 representa canteiros. Planta tipo 1 precisa 1 L, tipo 2 precisa 2 L, tipo 3 precisa 3 L; tipo desconhecido recebe zero.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Um setor com tipos 1,2,3,1 precisa 7 L
```

Canteiro com tipo inválido deve ser corrigido se o plano precisar ser completo.

## Dicas para resolução

1. Associe tipo a litros.
2. Some células para o total geral.
3. Some cada linha para o setor.

## Solução

```visualg
algoritmo "Desafio0914A"
var
tipo: vetor[1..3, 1..4] de inteiro
  litros: vetor[1..3, 1..4] de real
  setor, canteiro, total: inteiro
  agua: real
inicio
agua <- 0
  para setor de 1 ate 3 faca
    para canteiro de 1 ate 4 faca
      escreva("Tipo da planta em ", setor, ",", canteiro, " (1, 2 ou 3): ")
      leia(tipo[setor, canteiro])
      escolha tipo[setor, canteiro]
        caso 1
          litros[setor, canteiro] <- 1
        caso 2
          litros[setor, canteiro] <- 2
        caso 3
          litros[setor, canteiro] <- 3
        outrocaso
          litros[setor, canteiro] <- 0
      fimescolha
      agua <- agua + litros[setor, canteiro]
    fimpara
  fimpara
  escreval("Água total necessária: ", agua, " L")
  para setor de 1 ate 3 faca
    agua <- 0
    para canteiro de 1 ate 4 faca
      agua <- agua + litros[setor, canteiro]
    fimpara
    escreval("Setor ", setor, ": ", agua, " L")
  fimpara
fimalgoritmo
```

Uma segunda matriz guarda água por canteiro para calcular totais de cada setor.
