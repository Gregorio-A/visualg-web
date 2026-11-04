# Chuva inesperada

**Data:** 26 de janeiro · **Nível:** Simples

## Objetivo

Diga se deve levar guarda-chuva a partir de uma porcentagem limite.

Decida se deve levar guarda-chuva comparando a chance de chuva com um limite escolhido.

## Como funciona

Leia dois percentuais de 0 a 100. Recomende guarda-chuva quando a probabilidade alcançar ou ultrapassar o limite.

## Exemplo de execução

```text
Probabilidade de chuva (%): 70
Limite para levar guarda-chuva (%): 60
Leve guarda-chuva.
```

Probabilidade igual ao limite também aciona a recomendação.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0126S"
var
probabilidade, limite: real
inicio
escreva("Probabilidade de chuva (%): ")
  leia(probabilidade)
  escreva("Limite para levar guarda-chuva (%): ")
  leia(limite)
  se (probabilidade < 0) ou (probabilidade > 100) ou (limite < 0) ou (limite > 100) entao
    escreval("Percentual inválido.")
  senao
    se probabilidade >= limite entao
      escreval("Leve guarda-chuva.")
    senao
      escreval("Guarda-chuva opcional.")
    fimse
  fimse
fimalgoritmo
```

A comparação inclusiva permite que o próprio aluno escolha o ponto de corte.
