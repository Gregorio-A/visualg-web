# Preparando a virada

**Data:** 30 de dezembro · **Nível:** Simples

## Objetivo

Converta segundos restantes em minutos e segundos.

## Como funciona

Mostre minutos completos e segundos restantes.

## Exemplo de execução

```text
125 segundos → 2 minutos e 5 segundos
```

**Como ler o exemplo:** a seta → significa "resulta em".

59 segundos → 0 minuto e 59 segundos.

## Dicas para resolução

1. Divisão inteira por 60 dá minutos.
2. Resto por 60 dá segundos.
3. Mostre ambas as partes.

## Solução

```visualg
algoritmo "Desafio1230S"
var
  segundos: inteiro
inicio
  escreva("Segundos restantes: ")
  leia(segundos)
  se segundos < 0 entao
    escreval("Tempo inválido")
  senao
    escreval(segundos div 60, " minuto(s) e ", segundos mod 60, " segundo(s)")
  fimse
fimalgoritmo
```

Divisão inteira dá os minutos; resto dá os segundos.
