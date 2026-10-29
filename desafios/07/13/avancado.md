# Estoque do acampamento

**Data:** 13 de julho · **Nível:** Avançado

## Objetivo

Simule consumo diário de recursos e avise o primeiro dia de falta.

## Como funciona

Simule até N dias com três recursos. Cada dia exige a mesma quantidade de cada recurso; pare o consumo no primeiro dia em que faltar algum.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Estoque 5 de um recurso, uso diário 2 → falta no dia 3
```

**Como ler o exemplo:** a seta → significa "resulta em".

Consumo zero não esgota o recurso. Dias zero não consomem nada.

## Dicas para resolução

1. Guarde estoque e consumo em vetores.
2. Confira todos os recursos a cada dia.
3. Registre o primeiro dia insuficiente.

## Solução

```visualg
algoritmo "Desafio0713A"
var
recurso: vetor[1..3] de inteiro
  consumo: vetor[1..3] de inteiro
  dia, i, dias, primeiro: inteiro
inicio
para i de 1 ate 3 faca
    escreva("Estoque inicial do recurso ", i, ": ")
    leia(recurso[i])
    escreva("Consumo diário: ")
    leia(consumo[i])
  fimpara
  escreva("Dias de acampamento: ")
  leia(dias)
  primeiro <- 0
  se dias > 0 entao
    para dia de 1 ate dias faca
      se primeiro = 0 entao
        para i de 1 ate 3 faca
          se (recurso[i] < consumo[i]) ou (consumo[i] < 0) entao
            primeiro <- dia
            escreval("Falta do recurso ", i, " no dia ", dia)
          fimse
        fimpara
        se primeiro = 0 entao
          para i de 1 ate 3 faca
            recurso[i] <- recurso[i] - consumo[i]
          fimpara
        fimse
      fimse
    fimpara
  fimse
  se primeiro = 0 entao
    escreval("Estoque suficiente para todos os dias")
  fimse
fimalgoritmo
```

A checagem dos três estoques ocorre antes de descontar os consumos do dia.
