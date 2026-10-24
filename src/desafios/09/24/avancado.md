# Observação de fauna

**Data:** 24 de setembro · **Nível:** Avançado

## Objetivo

Processe contagens de espécies em parcelas e calcule diversidade por riqueza de espécies.

## Como funciona

Três parcelas registram contagens de quatro espécies. Riqueza é o número de espécies com pelo menos um indivíduo em cada parcela.

## Exemplo de execução

```text
Contagens 3,0,2,0 → 5 indivíduos e riqueza 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Contagem zero não aumenta riqueza. Entrada negativa é ignorada.

## Dicas para resolução

1. Conte indivíduos positivos.
2. Some indivíduos.
3. Incremente riqueza uma vez por espécie presente.

## Solução

```visualg
algoritmo "Desafio0924A"
var
contagem: vetor[1..3, 1..4] de inteiro
  parcela, especie, riqueza, total: inteiro
inicio
para parcela de 1 ate 3 faca
    riqueza <- 0
    total <- 0
    para especie de 1 ate 4 faca
      escreva("Parcela ", parcela, " espécie ", especie, " indivíduos: ")
      leia(contagem[parcela, especie])
      se contagem[parcela, especie] > 0 entao
        riqueza <- riqueza + 1
        total <- total + contagem[parcela, especie]
      fimse
    fimpara
    escreval("Parcela ", parcela, ": ", total, " indivíduos, riqueza de ", riqueza, " espécie(s)")
  fimpara
fimalgoritmo
```

A riqueza mede presença de tipos, não quantidade total de animais.
