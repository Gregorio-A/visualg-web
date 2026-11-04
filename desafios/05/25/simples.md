# Hora do almoço

**Data:** 25 de maio · **Nível:** Simples

## Objetivo

Calcule a duração de uma pausa a partir dos minutos de início e fim.

## Como funciona

Leia início e fim da pausa em minutos desde a mesma referência e subtraia.

## Exemplo de execução

```text
Início: 720
Fim: 750
Duração da pausa: 30 minuto(s)
```

Horários iguais produzem pausa de zero minuto.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0525S"
var
inicioMin, fimMin: inteiro
inicio
escreva("Início da pausa (min): ")
  leia(inicioMin)
  escreva("Fim da pausa (min): ")
  leia(fimMin)
  se fimMin >= inicioMin entao
    escreval("Duração da pausa: ", fimMin - inicioMin, " minuto(s)")
  senao
    escreval("Horários inválidos no mesmo dia.")
  fimse
fimalgoritmo
```

A validação rejeita fim anterior ao início no mesmo dia.
