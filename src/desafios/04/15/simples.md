# Inversão de sinais

**Data:** 15 de abril · **Nível:** Simples

## Objetivo

Transforme um número negativo em positivo sem função pronta de valor absoluto.

## Como funciona

Leia um número. Se for negativo, troque seu sinal; caso contrário, mantenha o valor.

### Palavras úteis

- **Função:** É um bloco de comandos com nome que devolve um valor.

## Exemplo de execução

```text
Número: -7
Valor não negativo: 7
```

Zero permanece zero.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0415S"
var
numero: real
inicio
escreva("Número: ")
  leia(numero)
  se numero < 0 entao
    numero <- -numero
  fimse
  escreval("Valor não negativo: ", numero)
fimalgoritmo
```

A negação aritmética substitui uma função pronta de valor absoluto.
