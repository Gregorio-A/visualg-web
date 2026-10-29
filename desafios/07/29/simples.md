# Contador de férias

**Data:** 29 de julho · **Nível:** Simples

## Objetivo

Calcule dias restantes até uma data do mesmo mês.

## Como funciona

As duas datas estão no mesmo mês de julho e a data final não é anterior à atual.

## Exemplo de execução

```text
Dia 10 até dia 20 → 10 dias restantes
```

**Como ler o exemplo:** a seta → significa "resulta em".

Datas iguais dão zero dia restante.

## Dicas para resolução

1. Leia dois dias.
2. Valide 1–31 e a ordem.
3. Subtraia.

## Solução

```visualg
algoritmo "Desafio0729S"
var
hoje, fimDia: inteiro
inicio
escreva("Dia atual de julho: ")
  leia(hoje)
  escreva("Dia de término das férias em julho: ")
  leia(fimDia)
  se (hoje < 1) ou (hoje > 31) ou (fimDia < hoje) ou (fimDia > 31) entao
    escreval("Datas inválidas ou fora do mesmo mês")
  senao
    escreval("Dias restantes: ", fimDia - hoje)
  fimse
fimalgoritmo
```

No mesmo mês, a diferença entre dias do mês mede o intervalo.
