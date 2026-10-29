# Maratona de filmes

**Data:** 4 de julho · **Nível:** Avançado

## Objetivo

Ordene uma lista por duração e selecione sessões sem ultrapassar um limite.

## Como funciona

Ordene cinco filmes por duração crescente. Selecione em ordem quantos couberem no tempo limite, sem pausas ou sobreposição.

## Exemplo de execução

```text
Limite 120 min; filmes 30, 50, 70 → selecione 30 e 50
```

**Como ler o exemplo:** a seta → significa "resulta em".

Filme maior que o limite não é selecionado. Duração negativa é ignorada.

## Dicas para resolução

1. Ordene por duração.
2. Some apenas se couber no limite.
3. Mantenha nome e duração juntos.

## Solução

```visualg
algoritmo "Desafio0704A"
var
nome: vetor[1..5] de caractere
  duracao: vetor[1..5] de inteiro
  i, j, troca, limite, usado: inteiro
  trocaNome: caractere
inicio
escreva("Limite da maratona em minutos: ")
  leia(limite)
  para i de 1 ate 5 faca
    escreva("Filme ", i, ": ")
    leia(nome[i])
    escreva("Duração em minutos: ")
    leia(duracao[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se duracao[j] < duracao[i] entao
        troca <- duracao[i]
        duracao[i] <- duracao[j]
        duracao[j] <- troca
        trocaNome <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- trocaNome
      fimse
    fimpara
  fimpara
  usado <- 0
  para i de 1 ate 5 faca
    se (duracao[i] >= 0) e (usado + duracao[i] <= limite) entao
      usado <- usado + duracao[i]
      escreval("Selecionado: ", nome[i], " (", duracao[i], " min)")
    fimse
  fimpara
  escreval("Tempo total: ", usado, " min")
fimalgoritmo
```

Escolher os menores primeiro maximiza o número de filmes vistos sob esse modelo.
