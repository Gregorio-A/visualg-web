# Organizador da mala

**Data:** 7 de janeiro · **Nível:** Avançado

## Objetivo

Escolha itens de uma lista por prioridade sem exceder um peso máximo.

Selecione itens para uma mala por ordem de prioridade sem ultrapassar o limite de peso.

## Como funciona

Cadastre cinco itens com peso e prioridade; números menores são mais urgentes. Examine os itens nessa ordem e inclua cada um se couber no peso ainda disponível. Empates conservam a ordem de cadastro.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Capacidade: 4 kg
Itens: livro 2 kg prioridade 2; roupa 3 kg prioridade 1; cinco itens ao todo
Incluído: roupa
Fora da mala: livro
Peso usado: 3 kg
```

Um item pesado pode ficar fora enquanto outro de prioridade menor ainda cabe. O método é guloso e respeita a prioridade informada.

## Dicas para resolução

1. Defina claramente o sentido do número de prioridade.
2. A cada passo, escolha o item ainda não examinado com menor prioridade numérica.
3. Inclua somente quando `acumulado + peso <= capacidade`.

## Solução

```visualg
algoritmo "Desafio0107A"
var
nome: vetor[1..5] de caractere
  peso: vetor[1..5] de real
  prioridade: vetor[1..5] de inteiro
  usado: vetor[1..5] de logico
  capacidade, acumulado: real
  i, j, escolhido, melhorPrioridade: inteiro
inicio
escreva("Peso máximo da mala: ")
  leia(capacidade)
  para i de 1 ate 5 faca
    escreva("Item ", i, ": ")
    leia(nome[i])
    escreva("Peso: ")
    leia(peso[i])
    escreva("Prioridade (menor número = mais importante): ")
    leia(prioridade[i])
    usado[i] <- falso
  fimpara
  acumulado <- 0
  para i de 1 ate 5 faca
    escolhido <- 0
    melhorPrioridade <- 999999999
    para j de 1 ate 5 faca
      se (nao usado[j]) e (prioridade[j] < melhorPrioridade) entao
        escolhido <- j
        melhorPrioridade <- prioridade[j]
      fimse
    fimpara
    se escolhido > 0 entao
      usado[escolhido] <- verdadeiro
      se (peso[escolhido] >= 0) e (acumulado + peso[escolhido] <= capacidade) entao
        acumulado <- acumulado + peso[escolhido]
        escreval("Incluído: ", nome[escolhido])
      senao
        escreval("Fora da mala: ", nome[escolhido])
      fimse
    fimse
  fimpara
  escreval("Peso usado: ", acumulado)
fimalgoritmo
```

O vetor `usado` evita selecionar o mesmo item duas vezes; `acumulado` nunca passa da capacidade.
