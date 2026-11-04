# Intervalo de aulas

**Data:** 22 de março · **Nível:** Simples

## Objetivo

Calcule a duração entre início e fim em minutos.

## Como funciona

Leia início e fim em minutos do mesmo dia e subtraia o início do fim.

## Exemplo de execução

```text
Início: 480
Fim: 530
Duração: 50 minuto(s)
```

Horários iguais produzem duração zero; fim anterior ao início é inválido.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0322S"
var
inicioMin, fimMin: inteiro
inicio
escreva("Início (minutos): ")
  leia(inicioMin)
  escreva("Fim (minutos): ")
  leia(fimMin)
  se fimMin >= inicioMin entao
    escreval("Duração: ", fimMin - inicioMin, " minuto(s)")
  senao
    escreval("Intervalo inválido no mesmo dia.")
  fimse
fimalgoritmo
```

A diferença entre dois horários na mesma escala fornece o tempo transcorrido.
