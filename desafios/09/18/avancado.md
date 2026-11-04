# Metas ambientais

**Data:** 18 de setembro · **Nível:** Avançado

## Objetivo

Compare indicadores mensais e calcule quais áreas ficaram abaixo da meta.

## Como funciona

Três áreas registram o mesmo indicador em quatro meses. Compare cada leitura à meta comum e conte meses abaixo por área.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Meta 10; valores 8, 10, 12, 9 → dois meses abaixo
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valor igual à meta a alcança.

## Dicas para resolução

1. Percorra áreas e meses.
2. Compare cada célula com a meta.
3. Conte pendências por área.

## Solução

```visualg
algoritmo "Desafio0918A"
var
area: vetor[1..3] de caractere
  indicador: vetor[1..3, 1..4] de real
  i, mes, abaixo: inteiro
  meta: real
inicio
escreva("Meta mensal do indicador: ")
  leia(meta)
  para i de 1 ate 3 faca
    escreva("Área ", i, ": ")
    leia(area[i])
    abaixo <- 0
    para mes de 1 ate 4 faca
      escreva("Indicador do mês ", mes, ": ")
      leia(indicador[i, mes])
      se indicador[i, mes] < meta entao
        abaixo <- abaixo + 1
        escreval(area[i], " abaixo da meta no mês ", mes)
      fimse
    fimpara
    escreval(area[i], ": ", abaixo, " mês(es) abaixo da meta")
  fimpara
fimalgoritmo
```

A matriz liga área a mês e permite relatórios por linha.
