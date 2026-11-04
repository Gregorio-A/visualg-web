# Vampiro dorminhoco

**Data:** 11 de outubro · **Nível:** Simples

## Objetivo

Calcule quantas horas faltam até um horário informado.

## Como funciona

Considere o próximo horário de despertar, que pode ocorrer no dia seguinte.

## Exemplo de execução

```text
Agora 22 h, despertar 6 h → faltam 8 h
```

**Como ler o exemplo:** a seta → significa "resulta em".

Horas iguais significam 24 h até a próxima ocorrência.

## Dicas para resolução

1. Subtraia horas.
2. Ajuste com 24.
3. Mostre a duração.

## Solução

```visualg
algoritmo "Desafio1011S"
var
agora, despertar, faltam: inteiro
inicio
escreva("Hora atual (0 a 23): ")
  leia(agora)
  escreva("Hora de despertar (0 a 23): ")
  leia(despertar)
  se (agora < 0) ou (agora > 23) ou (despertar < 0) ou (despertar > 23) entao
    escreval("Hora inválida")
  senao
    faltam <- despertar - agora
    se faltam <= 0 entao
      faltam <- faltam + 24
    fimse
    escreval("Faltam ", faltam, " hora(s)")
  fimse
fimalgoritmo
```

Somar 24 à diferença não positiva ajusta a virada do dia.
