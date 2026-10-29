# Rodízio de apresentações

**Data:** 27 de março · **Nível:** Avançado

## Objetivo

Gere uma ordem equilibrada de apresentação sem repetir aluno na rodada.

## Como funciona

Cadastre seis alunos e monte três rodadas de apresentação. Em cada rodada, todos aparecem uma vez; o primeiro nome gira uma posição a cada rodada.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
Alunos A,B,C,D,E,F
Rodada 1: A,B,C,D,E,F
Rodada 2: B,C,D,E,F,A
```

Nenhum aluno se repete dentro da mesma rodada.

## Dicas para resolução

1. Guarde os seis nomes.
2. Use deslocamento diferente por rodada.
3. A operação `mod` permite voltar ao primeiro índice.

## Solução

```visualg
algoritmo "Desafio0327A"
var
alunos: vetor[1..6] de caractere
  i, rodada, posicao: inteiro
inicio
para i de 1 ate 6 faca
    escreva("Aluno ", i, ": ")
    leia(alunos[i])
  fimpara
  para rodada de 1 ate 3 faca
    escreval("Rodada ", rodada)
    para posicao de 1 ate 6 faca
      i <- ((posicao + rodada - 2) mod 6) + 1
      escreval(posicao, "º: ", alunos[i])
    fimpara
  fimpara
fimalgoritmo
```

O cálculo com `mod 6` circula pelos seis índices sem sair do vetor.
