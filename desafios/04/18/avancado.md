# Cem portas

**Data:** 18 de abril · **Nível:** Avançado

## Objetivo

Simule a alternância de portas feita em rodadas de múltiplos e liste as abertas.

## Como funciona

Comece com 100 portas fechadas. Na rodada r, alterne o estado das portas múltiplas de r. Liste as portas abertas ao fim das 100 rodadas.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].
- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
As primeiras portas abertas são 1, 4, 9 e 16.
```

Somente índices quadrados perfeitos terminam abertos, pois têm quantidade ímpar de divisores.

## Dicas para resolução

1. Inicialize todas as portas como fechadas.
2. Na rodada r, visite r, 2r, 3r e assim por diante.
3. Inverta o estado em cada visita.

## Solução

```visualg
algoritmo "Desafio0418A"
var
aberta: vetor[1..100] de logico
  rodada, porta: inteiro
inicio
para porta de 1 ate 100 faca
    aberta[porta] <- falso
  fimpara
  para rodada de 1 ate 100 faca
    para porta de rodada ate 100 passo rodada faca
      aberta[porta] <- nao aberta[porta]
    fimpara
  fimpara
  escreval("Portas abertas:")
  para porta de 1 ate 100 faca
    se aberta[porta] entao
      escreval(porta)
    fimse
  fimpara
fimalgoritmo
```

O vetor lógico guarda estado; a rodada percorre seus múltiplos e inverte cada estado.
