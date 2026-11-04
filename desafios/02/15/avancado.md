# Coreografia textual

**Data:** 15 de fevereiro · **Nível:** Avançado

## Objetivo

Armazene oito movimentos e permita inverter e repetir trechos de uma sequência.

## Como funciona

Cadastre oito movimentos de dança. Escolha um trecho contínuo, quantas vezes reproduzi-lo e se a ordem será invertida.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.
- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Movimentos: A, B, C, D, E, F, G, H; trecho 2–4; repetir 2; inverter
Rodada 1: D, C, B
Rodada 2: D, C, B
```

Com zero repetições, não há movimentos na saída. Índices fora de 1 a 8 são inválidos.

## Dicas para resolução

1. Valide os extremos do trecho.
2. Use passo negativo para inverter.
3. Repita o laço do trecho no número pedido de rodadas.

## Solução

```visualg
algoritmo "Desafio0215A"
var
movimentos: vetor[1..8] de caractere
  i, inicioTrecho, fimTrecho, vezes, sentido, rodada, j: inteiro
inicio
para i de 1 ate 8 faca
    escreva("Movimento ", i, ": ")
    leia(movimentos[i])
  fimpara
  escreva("Início do trecho (1 a 8): ")
  leia(inicioTrecho)
  escreva("Fim do trecho (1 a 8): ")
  leia(fimTrecho)
  escreva("Repetições: ")
  leia(vezes)
  escreva("Inverter ordem? (1 sim, 0 não): ")
  leia(sentido)
  se (inicioTrecho >= 1) e (fimTrecho <= 8) e (inicioTrecho <= fimTrecho) e (vezes >= 0) entao
    para rodada de 1 ate vezes faca
      escreval("Rodada ", rodada)
      se sentido = 1 entao
        para j de fimTrecho ate inicioTrecho passo -1 faca
          escreval(movimentos[j])
        fimpara
      senao
        para j de inicioTrecho ate fimTrecho faca
          escreval(movimentos[j])
        fimpara
      fimse
    fimpara
  senao
    escreval("Trecho inválido.")
  fimse
fimalgoritmo
```

O laço interno percorre o trecho no sentido pedido; o externo reproduz esse mesmo trecho em cada rodada.
