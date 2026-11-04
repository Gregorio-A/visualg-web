# Ritmo programado

**Data:** 5 de fevereiro · **Nível:** Avançado

## Objetivo

Receba uma sequência de batidas e durações e imprima sua repetição em compassos.

## Como funciona

Cadastre de uma a oito batidas com durações inteiras e repita o mesmo padrão pelo número de compassos informado.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Padrão: bum por 1 tempo, tá por 2 tempos; compassos: 2
Compasso 1: bum(1), tá(2)
Compasso 2: bum(1), tá(2)
```

Com zero compassos, o padrão é armazenado mas nenhuma batida é impressa.

## Dicas para resolução

1. Guarde cada batida junto de sua duração.
2. Use um laço para os compassos.
3. Dentro dele, percorra todas as batidas do padrão.

## Solução

```visualg
algoritmo "Desafio0205A"
var
batida: vetor[1..8] de caractere
  duracao: vetor[1..8] de inteiro
  passos, compassos, i, j: inteiro
inicio
escreva("Quantidade de batidas no padrão (1 a 8): ")
  leia(passos)
  se (passos >= 1) e (passos <= 8) entao
    para i de 1 ate passos faca
      escreva("Batida ", i, ": ")
      leia(batida[i])
      escreva("Duração: ")
      leia(duracao[i])
    fimpara
    escreva("Compassos a repetir: ")
    leia(compassos)
    para i de 1 ate compassos faca
      escreval("Compasso ", i)
      para j de 1 ate passos faca
        escreval(batida[j], " por ", duracao[j], " tempo(s)")
      fimpara
    fimpara
  senao
    escreval("Tamanho de padrão inválido.")
  fimse
fimalgoritmo
```

Os vetores guardam som e duração em posições correspondentes; o laço externo repete o padrão completo.
