# Bandeirinhas no ar

**Data:** 1 de junho · **Nível:** Simples

## Objetivo

Calcule o total de bandeirinhas em N fileiras iguais.

## Como funciona

Multiplique o número de fileiras pelo número de bandeirinhas em cada uma.

## Exemplo de execução

```text
3 fileiras de 5 → 15 bandeirinhas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero fileiras produz total zero.

## Dicas para resolução

1. Leia duas quantidades.
2. Use multiplicação.
3. Recuse valores negativos.

## Solução

```visualg
algoritmo "Desafio0601S"
var
fileiras, porFileira: inteiro
inicio
escreva("Fileiras: ")
  leia(fileiras)
  escreva("Bandeirinhas por fileira: ")
  leia(porFileira)
  se (fileiras < 0) ou (porFileira < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Total: ", fileiras * porFileira)
  fimse
fimalgoritmo
```

A multiplicação substitui a soma da mesma quantidade em todas as fileiras.
