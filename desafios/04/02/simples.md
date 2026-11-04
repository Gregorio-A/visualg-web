# Cofre de dois dígitos

**Data:** 2 de abril · **Nível:** Simples

## Objetivo

Some os algarismos de um número de dois dígitos.

## Como funciona

Aceite um inteiro de 10 a 99. Separe dezena pela divisão inteira e unidade pelo resto da divisão por 10.

### Palavras úteis

- **Resto da divisão:** É o que sobra quando uma divisão inteira não é exata. Por exemplo, 7 dividido por 3 deixa resto 1.
- **div:** É uma divisão que guarda apenas a parte inteira. Por exemplo, 7 div 3 resulta em 2.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
Número: 47
Soma dos algarismos: 11
```

O número 10 produz soma 1.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0402S"
var
numero, dezena, unidade: inteiro
inicio
escreva("Número de dois dígitos: ")
  leia(numero)
  se (numero >= 10) e (numero <= 99) entao
    dezena <- numero div 10
    unidade <- numero mod 10
    escreval("Soma dos algarismos: ", dezena + unidade)
  senao
    escreval("Informe um inteiro de 10 a 99.")
  fimse
fimalgoritmo
```

`div` e `mod` extraem os dois algarismos sem converter o número para texto.
