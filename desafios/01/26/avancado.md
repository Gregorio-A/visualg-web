# Previsão semanal

**Data:** 26 de janeiro · **Nível:** Avançado

## Objetivo

Leia probabilidades de chuva e marque sequências de dias com risco acima do limite.

Marque dias chuvosos e identifique a maior sequência de probabilidades acima de um limite escolhido.

## Como funciona

Leia limite e sete probabilidades. Considere arriscado apenas o valor estritamente maior que o limite. Mostre cada dia assim marcado e o intervalo da maior sequência consecutiva.

## Exemplo de execução

```text
Limite: 60%; dias: 70, 80, 40, 90, 95, 85, 20%
Dias de risco: 1, 2, 4, 5 e 6
Maior sequência de risco: dias 4 a 6
```

Probabilidade exatamente igual ao limite interrompe a sequência.

## Dicas para resolução

1. Use um contador para dias consecutivos.
2. Zere-o quando um dia não superar o limite.
3. Guarde o início da sequência quando o contador passa de zero para um.

## Solução

```visualg
algoritmo "Desafio0126A"
var
probabilidades: vetor[1..7] de real
  limite: real
  i, atual, maior, comecoAtual, comecoMaior: inteiro
inicio
escreva("Limite de risco (%): ")
  leia(limite)
  atual <- 0
  maior <- 0
  para i de 1 ate 7 faca
    escreva("Probabilidade do dia ", i, " (%): ")
    leia(probabilidades[i])
    se probabilidades[i] > limite entao
      se atual = 0 entao
        comecoAtual <- i
      fimse
      atual <- atual + 1
      escreval("Dia ", i, ": risco acima do limite")
      se atual > maior entao
        maior <- atual
        comecoMaior <- comecoAtual
      fimse
    senao
      atual <- 0
    fimse
  fimpara
  se maior > 0 entao
    escreval("Maior sequência de risco: dias ", comecoMaior, " a ", comecoMaior + maior - 1)
  senao
    escreval("Nenhum dia acima do limite.")
  fimse
fimalgoritmo
```

O contador `atual` mede o trecho em andamento; `maior` conserva a sequência mais longa já observada.
