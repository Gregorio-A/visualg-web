# Calendário de provas

**Data:** 29 de março · **Nível:** Avançado

## Objetivo

Valide datas e detecte duas avaliações na mesma data para uma turma.

## Como funciona

Cadastre cinco avaliações com turma, dia e mês. Avise se a mesma turma tiver duas avaliações na mesma data.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.
- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Avaliações 1 e 3: turma 7A em 10/05
Conflito para turma 7A entre avaliações 1 e 3
```

Turmas diferentes podem ter prova na mesma data. A validação de datas deste exercício verifica apenas faixas gerais, não dias específicos de cada mês.

## Dicas para resolução

1. Guarde turma e data em vetores da mesma posição.
2. Compare pares com índices diferentes.
3. Exija igualdade de turma, dia e mês para marcar conflito.

## Solução

```visualg
algoritmo "Desafio0329A"
var
turma: vetor[1..5] de caractere
  dia, mes: vetor[1..5] de inteiro
  i, j: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Turma da avaliação ", i, ": ")
    leia(turma[i])
    escreva("Dia: ")
    leia(dia[i])
    escreva("Mês: ")
    leia(mes[i])
    se (dia[i] < 1) ou (dia[i] > 31) ou (mes[i] < 1) ou (mes[i] > 12) entao
      escreval("Data fora da faixa geral.")
    fimse
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se (turma[i] = turma[j]) e (dia[i] = dia[j]) e (mes[i] = mes[j]) entao
        escreval("Conflito para turma ", turma[i], " entre avaliações ", i, " e ", j)
      fimse
    fimpara
  fimpara
fimalgoritmo
```

O laço interno compara cada avaliação somente com as posteriores para evitar avisos duplicados.
