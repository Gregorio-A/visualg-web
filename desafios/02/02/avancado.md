# Pacotes de confete

**Data:** 2 de fevereiro · **Nível:** Avançado

## Objetivo

Distribua quantidades entre equipes com capacidades distintas e reporte sobras.

## Como funciona

Informe a capacidade de três equipes e uma quantidade a distribuir. Preencha equipes na ordem 1, 2, 3 sem exceder suas capacidades; reporte o restante não alocado.

## Exemplo de execução

```text
Capacidades: 3, 5, 2; quantidade: 12
Equipe 1: 3
Equipe 2: 5
Equipe 3: 2
Sobra: 2
```

Se a quantidade for menor que a primeira capacidade, as outras equipes recebem zero.

## Dicas para resolução

1. Mantenha uma variável para a quantidade ainda não distribuída.
2. Nunca atribua mais que a capacidade de uma equipe.
3. Exiba a sobra depois de examinar todas as equipes.

## Solução

```visualg
algoritmo "Desafio0202A"
var
capacidade: vetor[1..3] de inteiro
  alocado: vetor[1..3] de inteiro
  i, quantidade, disponivel, sobra: inteiro
inicio
para i de 1 ate 3 faca
    escreva("Capacidade da equipe ", i, ": ")
    leia(capacidade[i])
    alocado[i] <- 0
  fimpara
  escreva("Quantidade a distribuir: ")
  leia(quantidade)
  sobra <- quantidade
  para i de 1 ate 3 faca
    disponivel <- capacidade[i]
    se disponivel > sobra entao
      disponivel <- sobra
    fimse
    se disponivel > 0 entao
      alocado[i] <- disponivel
      sobra <- sobra - disponivel
    fimse
    escreval("Equipe ", i, ": ", alocado[i])
  fimpara
  escreval("Sobra: ", sobra)
fimalgoritmo
```

A cada equipe, o valor atribuído é o menor entre sua capacidade e a quantidade restante.
