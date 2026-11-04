# Torneio de corrida

**Data:** 13 de janeiro · **Nível:** Avançado

## Objetivo

Leia tempos de oito participantes e gere classificação com posições e empates.

Classifique oito participantes pelo tempo de corrida, atribuindo a mesma posição a tempos empatados.

## Como funciona

Leia nomes e tempos. Para cada participante, sua posição é um mais a quantidade de tempos estritamente menores. Assim, dois tempos iguais recebem a mesma posição; a posição seguinte pode ser saltada.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Tempos: Ana 10; Bia 11; Caio 11; Davi 12; outros acima de 12
Ana: posição 1
Bia: posição 2
Caio: posição 2
Davi: posição 4
```

Se todos tiverem o mesmo tempo, todos ficam na posição 1.

## Dicas para resolução

1. Guarde nomes e tempos na mesma posição.
2. Compare cada tempo com todos os outros.
3. Use `<` em vez de `<=` para dar a mesma posição a empates.

## Solução

```visualg
algoritmo "Desafio0113A"
var
nome: vetor[1..8] de caractere
  tempo: vetor[1..8] de real
  posicao: vetor[1..8] de inteiro
  i, j: inteiro
inicio
para i de 1 ate 8 faca
    escreva("Participante ", i, ": ")
    leia(nome[i])
    escreva("Tempo: ")
    leia(tempo[i])
  fimpara
  para i de 1 ate 8 faca
    posicao[i] <- 1
    para j de 1 ate 8 faca
      se tempo[j] < tempo[i] entao
        posicao[i] <- posicao[i] + 1
      fimse
    fimpara
  fimpara
  para i de 1 ate 8 faca
    escreval(nome[i], ": posição ", posicao[i], " — tempo ", tempo[i])
  fimpara
fimalgoritmo
```

Contar tempos menores calcula o ranking com empates sem precisar alterar a ordem dos vetores.
