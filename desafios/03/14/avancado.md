# Quiz de lógica

**Data:** 14 de março · **Nível:** Avançado

## Objetivo

Faça cinco perguntas, atribua pontos e mostre revisão de erros.

## Como funciona

Cadastre o gabarito de cinco perguntas e leia cinco respostas. Cada acerto vale um ponto. Ao final, mostre somente as questões erradas para revisão.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Gabarito A,B,C,A,B; respostas A,B,A,A,B
Pontuação: 4/5
Rever questão 3: sua resposta A, correta C
```

Se tudo estiver correto, não haverá linhas de revisão.

## Dicas para resolução

1. Guarde gabarito e respostas separadamente.
2. Conte igualdade posição a posição.
3. Depois percorra de novo para explicar os erros.

## Solução

```visualg
algoritmo "Desafio0314A"
var
gabarito, resposta: vetor[1..5] de caractere
  i, acertos: inteiro
inicio
acertos <- 0
  para i de 1 ate 5 faca
    escreva("Gabarito da questão ", i, " (A/B/C): ")
    leia(gabarito[i])
  fimpara
  para i de 1 ate 5 faca
    escreva("Resposta da questão ", i, ": ")
    leia(resposta[i])
    se resposta[i] = gabarito[i] entao
      acertos <- acertos + 1
    fimse
  fimpara
  escreval("Pontuação: ", acertos, "/5")
  para i de 1 ate 5 faca
    se resposta[i] <> gabarito[i] entao
      escreval("Rever questão ", i, ": sua resposta ", resposta[i], ", correta ", gabarito[i])
    fimse
  fimpara
fimalgoritmo
```

Os vetores permitem comparar as mesmas posições novamente após calcular a pontuação.
