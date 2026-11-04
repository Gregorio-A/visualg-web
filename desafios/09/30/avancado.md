# Relatório ambiental

**Data:** 30 de setembro · **Nível:** Avançado

## Objetivo

Combine indicadores por setor e apresente metas atingidas e pendências.

## Como funciona

Três setores possuem indicadores de economia de água, energia e resíduos. Cada indicador é comparado à sua própria meta; reporte atingidas e pendências.

## Exemplo de execução

```text
Metas 10,20,30; setor obtém 10,15,35 → 2 metas atingidas, energia pendente
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade alcança a meta.

## Dicas para resolução

1. Guarde três metas.
2. Compare cada setor por dimensão.
3. Conte pendências e atingidas.

## Solução

```visualg
algoritmo "Desafio0930A"
var
setor: vetor[1..3] de caractere
  agua, energia, residuos: vetor[1..3] de real
  i, pendencias: inteiro
  metaAgua, metaEnergia, metaResiduos: real
inicio
escreva("Metas de água, energia e resíduos: ")
  leia(metaAgua, metaEnergia, metaResiduos)
  para i de 1 ate 3 faca
    escreva("Setor ", i, ": ")
    leia(setor[i])
    escreva("Economia de água, energia e resíduos: ")
    leia(agua[i], energia[i], residuos[i])
    pendencias <- 0
    se agua[i] < metaAgua entao
      pendencias <- pendencias + 1
      escreval(setor[i], ": água abaixo da meta")
    fimse
    se energia[i] < metaEnergia entao
      pendencias <- pendencias + 1
      escreval(setor[i], ": energia abaixo da meta")
    fimse
    se residuos[i] < metaResiduos entao
      pendencias <- pendencias + 1
      escreval(setor[i], ": resíduos abaixo da meta")
    fimse
    escreval(setor[i], ": ", 3 - pendencias, " meta(s) atingida(s), ", pendencias, " pendência(s)")
  fimpara
fimalgoritmo
```

Comparar separadamente cada dimensão evita somar unidades diferentes.
