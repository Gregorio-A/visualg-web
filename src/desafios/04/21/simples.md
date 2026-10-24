# Senha espelhada

**Data:** 21 de abril · **Nível:** Simples

## Objetivo

Descubra se um número de três dígitos é capicua.

## Como funciona

Um número de três dígitos é capicua se a centena é igual à unidade.

## Exemplo de execução

```text
Número: 121
Capicua
```

O dígito central pode ter qualquer valor.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0421S"
var
numero, centena, unidade: inteiro
inicio
escreva("Número de três dígitos: ")
  leia(numero)
  se (numero >= 100) e (numero <= 999) entao
    centena <- numero div 100
    unidade <- numero mod 10
    se centena = unidade entao
      escreval("Capicua")
    senao
      escreval("Não é capicua")
    fimse
  senao
    escreval("Informe inteiro de 100 a 999")
  fimse
fimalgoritmo
```

A comparação entre primeiro e último dígito basta para um número de três algarismos.
