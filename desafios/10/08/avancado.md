# Poção por receita

**Data:** 8 de outubro · **Nível:** Avançado

## Objetivo

Gerencie ingredientes limitados e calcule quantas poções completas podem ser produzidas.

## Como funciona

A receita usa quantidades positivas de quatro ingredientes. Produza o máximo de poções completas com os estoques limitados.

### Palavras úteis

- **Quociente:** É o resultado de uma divisão.

## Exemplo de execução

```text
Estoques 10,8,6,4; usa 2,2,1,1 por poção → quatro poções
```

**Como ler o exemplo:** a seta → significa "resulta em".

Necessidade zero é inválida neste modelo de receita.

## Dicas para resolução

1. Calcule capacidade por ingrediente.
2. Escolha o mínimo.
3. Calcule sobras.

## Solução

```visualg
algoritmo "Desafio1008A"
var
estoque, porPocao: vetor[1..4] de inteiro
  i, quantidade, possiveis, menor: inteiro
inicio
para i de 1 ate 4 faca
    escreva("Estoque do ingrediente ", i, ": ")
    leia(estoque[i])
    escreva("Necessidade por poção: ")
    leia(porPocao[i])
  fimpara
  menor <- 999999
  para i de 1 ate 4 faca
    se (estoque[i] < 0) ou (porPocao[i] <= 0) entao
      menor <- -1
    senao
      possiveis <- estoque[i] div porPocao[i]
      se possiveis < menor entao
        menor <- possiveis
      fimse
    fimse
  fimpara
  se menor < 0 entao
    escreval("Receita inválida")
  senao
    escreval("Poções completas: ", menor)
    para i de 1 ate 4 faca
      escreval("Sobra do ingrediente ", i, ": ", estoque[i] - menor * porPocao[i])
    fimpara
  fimse
fimalgoritmo
```

O menor quociente inteiro entre estoque e necessidade determina a produção.
