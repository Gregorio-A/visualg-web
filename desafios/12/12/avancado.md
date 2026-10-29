# Empilhamento seguro

**Data:** 12 de dezembro · **Nível:** Avançado

## Objetivo

Organize caixas por peso e limite de altura, com regras de estabilidade simplificadas.

## Como funciona

Organize seis caixas da mais pesada para a mais leve. Inclua uma caixa apenas se ela não ultrapassar a altura máxima; caixas ignoradas não entram na pilha.

## Exemplo de execução

```text
Caixas (peso 10, altura 2) e (peso 5, altura 3), limite 4 → entra apenas a primeira.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Limite zero resulta em pilha vazia.

## Dicas para resolução

1. Ordene peso e altura juntos.
2. Percorra do maior peso ao menor.
3. Acrescente apenas se couber.

## Solução

```visualg
algoritmo "Desafio1212A"
var
  peso, altura: vetor[1..6] de real
  i, j, usados: inteiro
  aux, limite, totalAltura, base: real
inicio
  para i de 1 ate 6 faca
    repita
      escreva("Peso e altura da caixa ", i, ": ")
      leia(peso[i], altura[i])
    ate (peso[i] > 0) e (altura[i] > 0)
  fimpara
  escreva("Altura máxima da pilha: ")
  leia(limite)
  para i de 1 ate 5 faca
    para j de i+1 ate 6 faca
      se peso[j] > peso[i] entao
        aux <- peso[i]
        peso[i] <- peso[j]
        peso[j] <- aux
        aux <- altura[i]
        altura[i] <- altura[j]
        altura[j] <- aux
      fimse
    fimpara
  fimpara
  totalAltura <- 0
  usados <- 0
  para i de 1 ate 6 faca
    se totalAltura+altura[i] <= limite entao
      totalAltura <- totalAltura+altura[i]
      usados <- usados+1
      escreval("Na pilha: caixa de peso ", peso[i]:0:2, " e altura ", altura[i]:0:2)
    fimse
  fimpara
  escreval("Caixas empilhadas: ", usados, "; altura: ", totalAltura:0:2)
fimalgoritmo
```

Ordenar pelo peso garante base mais pesada; a soma de alturas controla o limite.
