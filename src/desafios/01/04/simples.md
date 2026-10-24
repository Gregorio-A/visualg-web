# Tempo de piscina

**Data:** 4 de janeiro · **Nível:** Simples

## Objetivo

Converta minutos de natação em horas e minutos.

Converta uma duração em minutos para horas completas e minutos restantes.

## Como funciona

Leia um total não negativo. A divisão inteira por 60 fornece as horas; o resto fornece os minutos.

### Palavras úteis

- **div:** É uma divisão que guarda apenas a parte inteira. Por exemplo, 7 div 3 resulta em 2.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
Minutos de natação: 135
2 hora(s) e 15 minuto(s)
```

Uma entrada de 60 minutos produz 1 hora e 0 minutos.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0104S"
var
minutos, horas, restante: inteiro
inicio
escreva("Minutos de natação: ")
  leia(minutos)
  se minutos >= 0 entao
    horas <- minutos div 60
    restante <- minutos mod 60
    escreval(horas, " hora(s) e ", restante, " minuto(s)")
  senao
    escreval("A duração não pode ser negativa.")
  fimse
fimalgoritmo
```

`div` e `mod` separam a parte inteira e o resto da conversão.
