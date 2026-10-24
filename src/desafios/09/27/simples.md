# Caminho das formigas

**Data:** 27 de setembro · **Nível:** Simples

## Objetivo

Calcule percurso total de N idas iguais.

## Como funciona

Conte apenas as idas mencionadas, todas com a mesma distância.

## Exemplo de execução

```text
5 idas de 2 m → 10 m
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero ida produz percurso zero.

## Dicas para resolução

1. Leia idas.
2. Leia metros por ida.
3. Multiplique.

## Solução

```visualg
algoritmo "Desafio0927S"
var
viagens: inteiro
  metrosPorIda: real
inicio
escreva("Número de idas: ")
  leia(viagens)
  escreva("Metros por ida: ")
  leia(metrosPorIda)
  se (viagens < 0) ou (metrosPorIda < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Percurso total: ", viagens * metrosPorIda, " m")
  fimse
fimalgoritmo
```

Multiplicação soma deslocamentos iguais.
