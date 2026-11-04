# Competição de voltas

**Data:** 19 de julho · **Nível:** Avançado

## Objetivo

Registre tempos em matriz e encontre volta mais rápida e média por atleta.

## Como funciona

Registre quatro tempos positivos de três atletas. Calcule média de cada atleta e encontre a volta mais rápida de toda a matriz.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.

## Exemplo de execução

```text
Atleta 1: 10, 11, 12, 11 s → média 11 s
```

**Como ler o exemplo:** a seta → significa "resulta em".

Tempos devem ser positivos; entrada não positiva precisa ser corrigida antes de interpretar a média.

## Dicas para resolução

1. Some as quatro voltas por atleta.
2. Divida por quatro.
3. Atualize o mínimo global.

## Solução

```visualg
algoritmo "Desafio0719A"
var
tempo: vetor[1..3, 1..4] de real
  atleta, volta, melhorAtleta, melhorVolta: inteiro
  menor, soma: real
inicio
menor <- 999999999
  para atleta de 1 ate 3 faca
    soma <- 0
    para volta de 1 ate 4 faca
      escreva("Tempo do atleta ", atleta, " volta ", volta, " (s): ")
      leia(tempo[atleta, volta])
      se tempo[atleta, volta] > 0 entao
        soma <- soma + tempo[atleta, volta]
        se tempo[atleta, volta] < menor entao
          menor <- tempo[atleta, volta]
          melhorAtleta <- atleta
          melhorVolta <- volta
        fimse
      fimse
    fimpara
    escreval("Média do atleta ", atleta, ": ", soma / 4, " s")
  fimpara
  se menor < 999999999 entao
    escreval("Volta mais rápida: atleta ", melhorAtleta, " volta ", melhorVolta, " (", menor, " s)")
  fimse
fimalgoritmo
```

A matriz identifica atleta e volta; um mínimo global acompanha a leitura.
