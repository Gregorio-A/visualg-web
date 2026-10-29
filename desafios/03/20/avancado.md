# Mapa de lugares

**Data:** 20 de março · **Nível:** Avançado

## Objetivo

Represente a sala em matriz e permita trocar alunos de posição.

## Como funciona

Represente nove assentos em uma matriz 3 × 3. Leia nomes, escolha duas posições válidas e troque os estudantes dessas posições.

### Palavras úteis

- **Matriz:** É uma tabela de linhas e colunas; cada posição guarda um valor.
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Posição 1,1: Ana; posição 2,2: Bia
Troca entre 1,1 e 2,2
Novo 1,1: Bia; novo 2,2: Ana
```

Trocar uma posição com ela mesma preserva a sala. Índices fora de 1 a 3 são recusados.

## Dicas para resolução

1. Use linha e coluna para localizar cada assento.
2. Valide os quatro índices antes de acessar a matriz.
3. Troque usando uma variável auxiliar.

## Solução

```visualg
algoritmo "Desafio0320A"
var
sala: vetor[1..3, 1..3] de caractere
  nomeAuxiliar: caractere
  linhaA, colunaA, linhaB, colunaB, i, j: inteiro
inicio
para i de 1 ate 3 faca
    para j de 1 ate 3 faca
      escreva("Aluno da posição ", i, ",", j, ": ")
      leia(sala[i, j])
    fimpara
  fimpara
  escreva("Linha do primeiro assento: ")
  leia(linhaA)
  escreva("Coluna do primeiro assento: ")
  leia(colunaA)
  escreva("Linha do segundo assento: ")
  leia(linhaB)
  escreva("Coluna do segundo assento: ")
  leia(colunaB)
  se (linhaA >= 1) e (linhaA <= 3) e (colunaA >= 1) e (colunaA <= 3) e (linhaB >= 1) e (linhaB <= 3) e (colunaB >= 1) e (colunaB <= 3) entao
    nomeAuxiliar <- sala[linhaA, colunaA]
    sala[linhaA, colunaA] <- sala[linhaB, colunaB]
    sala[linhaB, colunaB] <- nomeAuxiliar
    para i de 1 ate 3 faca
      para j de 1 ate 3 faca
        escreval(i, ",", j, ": ", sala[i, j])
      fimpara
    fimpara
  senao
    escreval("Posição inválida.")
  fimse
fimalgoritmo
```

Uma variável auxiliar guarda o nome da primeira posição enquanto a segunda é movida para ela.
