# Sequência oculta

**Data:** 1 de abril · **Nível:** Avançado

## Objetivo

Encontre o termo faltante em uma progressão aritmética com uma lacuna.

## Como funciona

Leia cinco termos de uma PA, usando -999 no lugar do termo ausente. Determine a diferença a partir de dois termos conhecidos consecutivos e preencha a lacuna.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Termos: 2, 5, -999, 11, 14
Termo faltante na posição 3: 8
```

O marcador -999 fica reservado para a lacuna, portanto não pode ser um termo real neste exercício.

## Dicas para resolução

1. Localize o índice da lacuna.
2. Encontre dois termos conhecidos consecutivos para calcular a razão da PA.
3. Use o vizinho para reconstruir o termo ausente.

## Solução

```visualg
algoritmo "Desafio0401A"
var
termos: vetor[1..5] de inteiro
  lacuna, diferenca, i: inteiro
  encontrou: logico
inicio
lacuna <- 0
  para i de 1 ate 5 faca
    escreva("Termo ", i, " (-999 para lacuna): ")
    leia(termos[i])
    se termos[i] = -999 entao
      lacuna <- i
    fimse
  fimpara
  encontrou <- falso
  diferenca <- 0
  para i de 1 ate 4 faca
    se (termos[i] <> -999) e (termos[i + 1] <> -999) e (nao encontrou) entao
      diferenca <- termos[i + 1] - termos[i]
      encontrou <- verdadeiro
    fimse
  fimpara
  se (lacuna > 0) e encontrou entao
    se lacuna > 1 entao
      termos[lacuna] <- termos[lacuna - 1] + diferenca
    senao
      termos[lacuna] <- termos[2] - diferenca
    fimse
    escreval("Termo faltante na posição ", lacuna, ": ", termos[lacuna])
  senao
    escreval("Informe exatamente uma lacuna e termos suficientes.")
  fimse
fimalgoritmo
```

Depois de achar a diferença, some-a ao termo anterior ou subtraia-a do segundo termo quando a primeira posição falta.
