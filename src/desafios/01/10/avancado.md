# Quadro de horários

**Data:** 10 de janeiro · **Nível:** Avançado

## Objetivo

Receba cinco atividades com duração e organize o cronograma sem ultrapassar o dia.

Organize cinco atividades em sequência sem ultrapassar o tempo disponível no dia.

## Como funciona

Leia o limite em minutos e depois nome e duração de cada atividade. Mantenha a ordem informada; encaixe a atividade apenas se sua duração couber. Mostre início e fim relativos ao começo da programação.

### Palavras úteis

- **Acumulador:** É uma variável que guarda um total e recebe novos valores aos poucos.

## Exemplo de execução

```text
Minutos disponíveis: 120
Atividades: natação 60, leitura 45, passeio 30, descanso 10, foto 5
Natação: 0–60; leitura: 60–105; passeio não cabe; descanso: 105–115; foto: 115–120
```

Duração igual ao tempo restante cabe exatamente. Duração negativa é rejeitada.

## Dicas para resolução

1. Some apenas as durações das atividades aceitas.
2. Teste se `usado + duracao <= limite` antes de alterar o acumulador.
3. Mostre o intervalo de cada atividade aceita.

## Solução

```visualg
algoritmo "Desafio0110A"
var
atividade: vetor[1..5] de caractere
  duracao: vetor[1..5] de inteiro
  i, limite, usado: inteiro
inicio
escreva("Minutos disponíveis no dia: ")
  leia(limite)
  usado <- 0
  para i de 1 ate 5 faca
    escreva("Atividade ", i, ": ")
    leia(atividade[i])
    escreva("Duração (minutos): ")
    leia(duracao[i])
    se (duracao[i] >= 0) e (usado + duracao[i] <= limite) entao
      escreval(atividade[i], ": do minuto ", usado, " ao ", usado + duracao[i])
      usado <- usado + duracao[i]
    senao
      escreval(atividade[i], " não cabe no dia.")
    fimse
  fimpara
  escreval("Minutos ocupados: ", usado)
fimalgoritmo
```

O acumulador `usado` representa o início da próxima atividade incluída e nunca excede o limite.
