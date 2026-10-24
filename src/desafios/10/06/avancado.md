# Mapa do cemitério

**Data:** 6 de outubro · **Nível:** Avançado

## Objetivo

Encontre coordenadas com lápides especiais em uma matriz codificada.

## Como funciona

Leia mapa 4×5 codificado com 0 para comum e 1 para especial. Liste todas as coordenadas especiais.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Célula (2,3)=1 → lápide especial em (2,3)
```

**Como ler o exemplo:** a seta → significa "resulta em".

Mapa sem código 1 tem total zero.

## Dicas para resolução

1. Percorra linhas e colunas.
2. Teste código 1.
3. Mostre coordenada e conte.

## Solução

```visualg
algoritmo "Desafio1006A"
var
mapa: vetor[1..4, 1..5] de inteiro
  linha, coluna, especiais: inteiro
inicio
especiais <- 0
  para linha de 1 ate 4 faca
    para coluna de 1 ate 5 faca
      escreva("Código da lápide em ", linha, ",", coluna, " (0 comum, 1 especial): ")
      leia(mapa[linha, coluna])
      se mapa[linha, coluna] = 1 entao
        especiais <- especiais + 1
        escreval("Lápide especial em (", linha, ",", coluna, ")")
      fimse
    fimpara
  fimpara
  escreval("Total de lápides especiais: ", especiais)
fimalgoritmo
```

A varredura usa os índices da matriz como coordenadas de saída.
