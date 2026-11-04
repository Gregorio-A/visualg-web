# Robô contador

**Data:** 9 de novembro · **Nível:** Simples

## Objetivo

Conte de 0 até um número informado.

## Como funciona

Conte de zero até o inteiro informado, inclusive.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
N=3 → 0,1,2,3
```

**Como ler o exemplo:** a seta → significa "resulta em".

N=0 imprime somente zero.

## Dicas para resolução

1. Comece em zero.
2. Termine em N.
3. Imprima cada valor.

## Solução

```visualg
algoritmo "Desafio1109S"
var
limite, i: inteiro
inicio
escreva("Contar até: ")
  leia(limite)
  se limite < 0 entao
    escreval("Limite inválido")
  senao
    para i de 0 ate limite faca
      escreval(i)
    fimpara
  fimse
fimalgoritmo
```

O contador do laço percorre o intervalo.
