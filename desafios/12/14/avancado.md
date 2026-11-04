# Sorteio controlado

**Data:** 14 de dezembro · **Nível:** Avançado

## Objetivo

Valide uma sequência de vencedores sem repetição a partir de números informados.

## Como funciona

Leia oito vencedores entre 1 e 99; nenhum número pode aparecer duas vezes.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
3, 8, 3 → o terceiro 3 é recusado e precisa ser informado novamente.
```

**Como ler o exemplo:** a seta → significa "resulta em".

A procura por repetição considera somente posições já preenchidas.

## Dicas para resolução

1. Use vetor de vencedores.
2. Percorra apenas índices menores que o atual.
3. Repita a leitura até ser válido.

## Solução

```visualg
algoritmo "Desafio1214A"
var
  vencedor: vetor[1..8] de inteiro
  i, j, numero: inteiro
  repetido: logico
inicio
  para i de 1 ate 8 faca
    repita
      escreva("Número vencedor ", i, " (1 a 99): ")
      leia(numero)
      repetido <- falso
      para j de 1 ate i-1 faca
        se vencedor[j] = numero entao
          repetido <- verdadeiro
        fimse
      fimpara
      se (numero < 1) ou (numero > 99) ou repetido entao
        escreval("Número inválido ou repetido")
      fimse
    ate (numero >= 1) e (numero <= 99) e (nao repetido)
    vencedor[i] <- numero
  fimpara
  escreval("Sequência válida:")
  para i de 1 ate 8 faca
    escreva(vencedor[i], " ")
  fimpara
  escreval("")
fimalgoritmo
```

Antes de guardar cada número, compare-o com os vencedores anteriores.
