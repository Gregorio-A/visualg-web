# Montagem de kits

**Data:** 9 de junho · **Nível:** Avançado

## Objetivo

Forme kits com itens de estoques diferentes maximizando quantidade de kits completos.

## Como funciona

Um kit usa quantidades positivas de três itens. O máximo de kits completos é limitado pelo item com menor estoque dividido por necessidade.

### Palavras úteis

- **Quociente:** É o resultado de uma divisão.

## Exemplo de execução

```text
Estoques 10, 8, 7; necessidade 2, 2, 1 → 4 kits
```

**Como ler o exemplo:** a seta → significa "resulta em".

Necessidade zero é inválida para esta receita de kit.

## Dicas para resolução

1. Divida estoque pela necessidade de cada item.
2. Escolha o menor quociente.
3. Calcule as sobras após montar os kits.

## Solução

```visualg
algoritmo "Desafio0609A"
var
estoque: vetor[1..3] de inteiro
  necessidade: vetor[1..3] de inteiro
  i, kits, possiveis: inteiro
inicio
para i de 1 ate 3 faca
    escreva("Estoque do item ", i, ": ")
    leia(estoque[i])
    escreva("Unidades do item por kit: ")
    leia(necessidade[i])
  fimpara
  kits <- 999999
  para i de 1 ate 3 faca
    se (estoque[i] < 0) ou (necessidade[i] <= 0) entao
      kits <- -1
    senao
      possiveis <- estoque[i] div necessidade[i]
      se possiveis < kits entao
        kits <- possiveis
      fimse
    fimse
  fimpara
  se kits < 0 entao
    escreval("Dados inválidos")
  senao
    escreval("Kits completos: ", kits)
    para i de 1 ate 3 faca
      escreval("Sobra do item ", i, ": ", estoque[i] - kits * necessidade[i])
    fimpara
  fimse
fimalgoritmo
```

O mínimo dos três quocientes inteiros determina quantos kits podem ser montados.
