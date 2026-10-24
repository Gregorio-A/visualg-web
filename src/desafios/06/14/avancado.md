# Cronograma de apresentações

**Data:** 14 de junho · **Nível:** Avançado

## Objetivo

Ordene atrações por hora de início e sinalize conflitos.

## Como funciona

Cadastre cinco atrações com início e fim em minutos do mesmo dia. Ordene pelo início e sinalize qualquer sobreposição entre pares de intervalos válidos.

## Exemplo de execução

```text
A 60–90 e B 80–100 → conflito; B 90–100 → sem conflito
```

**Como ler o exemplo:** a seta → significa "resulta em".

Intervalo com fim anterior ao início é inválido e deve ser corrigido antes de usar o relatório.

## Dicas para resolução

1. Ordene por início.
2. Mantenha os campos ligados ao nome.
3. Sobreposição exige início de um antes do fim do outro.

## Solução

```visualg
algoritmo "Desafio0614A"
var
nome: vetor[1..5] de caractere
  comeco, termino: vetor[1..5] de inteiro
  i, j, troca: inteiro
  nomeTroca: caractere
inicio
para i de 1 ate 5 faca
    escreva("Atração ", i, ": ")
    leia(nome[i])
    escreva("Início em minutos: ")
    leia(comeco[i])
    escreva("Fim em minutos: ")
    leia(termino[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se comeco[j] < comeco[i] entao
        troca <- comeco[i]
        comeco[i] <- comeco[j]
        comeco[j] <- troca
        troca <- termino[i]
        termino[i] <- termino[j]
        termino[j] <- troca
        nomeTroca <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- nomeTroca
      fimse
    fimpara
  fimpara
  para i de 1 ate 5 faca
    escreval(nome[i], ": ", comeco[i], "–", termino[i], " min")
    se termino[i] < comeco[i] entao
      escreval("Intervalo inválido")
    fimse
    se i > 1 entao
      para j de 1 ate i - 1 faca
        se (comeco[i] < termino[j]) e (termino[i] > comeco[j]) entao
          escreval("Conflito com ", nome[j])
        fimse
      fimpara
    fimse
  fimpara
fimalgoritmo
```

A ordenação move nome e horários juntos; a checagem compara cada atração com as anteriores.
