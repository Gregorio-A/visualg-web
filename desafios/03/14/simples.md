# Dúvida rápida

**Data:** 14 de março · **Nível:** Simples

## Objetivo

Diga se um número é par ou ímpar.

## Como funciona

Leia um inteiro e confira o resto da divisão por dois.

### Palavras úteis

- **Resto da divisão:** É o que sobra quando uma divisão inteira não é exata. Por exemplo, 7 dividido por 3 deixa resto 1.

## Exemplo de execução

```text
Número inteiro: 7
Ímpar
```

Zero é par; números negativos também podem ser classificados.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0314S"
var
numero: inteiro
inicio
escreva("Número inteiro: ")
  leia(numero)
  se numero mod 2 = 0 entao
    escreval("Par")
  senao
    escreval("Ímpar")
  fimse
fimalgoritmo
```

Resto zero identifica um múltiplo de dois.
