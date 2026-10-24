# Número suspeito

**Data:** 5 de abril · **Nível:** Simples

## Objetivo

Verifique se um número é múltiplo de cinco.

## Como funciona

Leia um inteiro e confira se seu resto ao dividir por cinco é zero.

### Palavras úteis

- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
Número: 25
Múltiplo de cinco
```

Zero é múltiplo de cinco.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0405S"
var
numero: inteiro
inicio
escreva("Número: ")
  leia(numero)
  se numero mod 5 = 0 entao
    escreval("Múltiplo de cinco")
  senao
    escreval("Não é múltiplo de cinco")
  fimse
fimalgoritmo
```

O operador `mod` testa divisibilidade sem precisar dividir em número real.
