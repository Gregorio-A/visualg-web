# Luzes piscantes

**Data:** 12 de fevereiro · **Nível:** Simples

## Objetivo

Alterne as palavras LIGADO e DESLIGADO por dez rodadas.

## Como funciona

Execute dez rodadas numeradas, alternando LIGADO nas ímpares e DESLIGADO nas pares.

### Palavras úteis

- **Resto da divisão:** É o que sobra quando uma divisão inteira não é exata. Por exemplo, 7 dividido por 3 deixa resto 1.

## Exemplo de execução

```text
1: LIGADO
2: DESLIGADO
3: LIGADO
...
10: DESLIGADO
```

A décima e última rodada deve mostrar DESLIGADO.

## Dicas para resolução

1. Este exercício não pede entrada. Prepare os valores que o próprio programa usará.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0212S"
var
rodada: inteiro
inicio
para rodada de 1 ate 10 faca
    se rodada mod 2 = 1 entao
      escreval(rodada, ": LIGADO")
    senao
      escreval(rodada, ": DESLIGADO")
    fimse
  fimpara
fimalgoritmo
```

O resto da divisão por dois determina se o número da rodada é ímpar ou par.
