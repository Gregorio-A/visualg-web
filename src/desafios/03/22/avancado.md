# Grade de horários

**Data:** 22 de março · **Nível:** Avançado

## Objetivo

Cadastre aulas e detecte conflitos de sala e professor.

## Como funciona

Cadastre cinco aulas com sala, professor, início e fim em minutos. Compare todos os pares: horários sobrepostos geram conflito se compartilham sala ou professor.

## Exemplo de execução

```text
Aula 1: sala A, Ana, 600–650; aula 2: sala A, Bia, 630–680
Conflito de sala entre aulas 1 e 2
```

Aulas adjacentes, com início de uma igual ao fim da outra, não conflitam.

## Dicas para resolução

1. Percorra pares sem repetir a ordem inversa.
2. Detecte sobreposição de horários antes de comparar nomes.
3. Informe sala e professor de forma independente.

## Solução

```visualg
algoritmo "Desafio0322A"
var
sala, professor: vetor[1..5] de caractere
  inicioMin, fimMin: vetor[1..5] de inteiro
  i, j: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Sala da aula ", i, ": ")
    leia(sala[i])
    escreva("Professor: ")
    leia(professor[i])
    escreva("Início em minutos: ")
    leia(inicioMin[i])
    escreva("Fim em minutos: ")
    leia(fimMin[i])
  fimpara
  para i de 1 ate 4 faca
    para j de i + 1 ate 5 faca
      se (inicioMin[i] < fimMin[j]) e (inicioMin[j] < fimMin[i]) entao
        se sala[i] = sala[j] entao
          escreval("Conflito de sala entre aulas ", i, " e ", j)
        fimse
        se professor[i] = professor[j] entao
          escreval("Conflito de professor entre aulas ", i, " e ", j)
        fimse
      fimse
    fimpara
  fimpara
fimalgoritmo
```

O par de intervalos cruza quando cada início precede o fim do outro; só então se comparam recursos.
