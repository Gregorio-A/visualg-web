# Bingo de números

**Data:** 11 de junho · **Nível:** Simples

## Objetivo

Diga se um número informado aparece em três números sorteados.

## Como funciona

Compare o número procurado aos três sorteios.

### Palavras úteis

- **Variável lógica:** Guarda apenas verdadeiro ou falso, como uma resposta de sim ou não.

## Exemplo de execução

```text
Procura 7; sorteios 2, 7, 9 → apareceu
```

**Como ler o exemplo:** a seta → significa "resulta em".

Repetição do número sorteado mantém o resultado positivo.

## Dicas para resolução

1. Comece com falso.
2. Compare cada sorteio.
3. Mostre o estado final.

## Solução

```visualg
algoritmo "Desafio0611S"
var
numero, sorteado, i: inteiro
  apareceu: logico
inicio
escreva("Número procurado: ")
  leia(numero)
  apareceu <- falso
  para i de 1 ate 3 faca
    escreva("Número sorteado ", i, ": ")
    leia(sorteado)
    se sorteado = numero entao
      apareceu <- verdadeiro
    fimse
  fimpara
  se apareceu entao
    escreval("O número apareceu")
  senao
    escreval("O número não apareceu")
  fimse
fimalgoritmo
```

A variável lógica registra se houve ao menos uma correspondência.
