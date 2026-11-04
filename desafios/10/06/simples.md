# Cemitério numérico

**Data:** 6 de outubro · **Nível:** Simples

## Objetivo

Conte de N até zero.

## Como funciona

Faça contagem regressiva do número informado até zero, inclusive.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
N=3 → 3, 2, 1, 0
```

**Como ler o exemplo:** a seta → significa "resulta em".

N=0 imprime apenas zero.

## Dicas para resolução

1. Comece em N.
2. Use passo -1.
3. Pare em zero.

## Solução

```visualg
algoritmo "Desafio1006S"
var
numero, i: inteiro
inicio
escreva("Número inicial: ")
  leia(numero)
  se numero < 0 entao
    escreval("Número inválido")
  senao
    para i de numero ate 0 passo -1 faca
      escreval(i)
    fimpara
  fimse
fimalgoritmo
```

O laço decrescente reduz uma unidade por passagem.
