# Joystick em repouso

**Data:** 26 de agosto · **Nível:** Simples

## Objetivo

Verifique se um valor está dentro da zona morta.

## Como funciona

O eixo está em repouso quando seu valor está entre -zona e +zona, inclusive.

## Exemplo de execução

```text
Valor -0,1 e zona 0,2 → em repouso
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valor exatamente no limite ainda está na zona.

## Dicas para resolução

1. Leia valor e limite.
2. Teste os dois extremos.
3. Mostre a situação.

## Solução

```visualg
algoritmo "Desafio0826S"
var
valor, zona: real
inicio
escreva("Valor do eixo do joystick: ")
  leia(valor)
  escreva("Limite absoluto da zona morta: ")
  leia(zona)
  se zona < 0 entao
    escreval("Zona inválida")
  senao
    se (valor >= 0 - zona) e (valor <= zona) entao
      escreval("Em repouso")
    senao
      escreval("Fora da zona morta")
    fimse
  fimse
fimalgoritmo
```

A faixa é simétrica em torno de zero.
