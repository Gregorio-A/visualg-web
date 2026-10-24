# Código secreto

**Data:** 6 de abril · **Nível:** Simples

## Objetivo

Verifique se um número de três algarismos tem todos os dígitos iguais.

## Como funciona

Aceite inteiro de 100 a 999 e compare centena, dezena e unidade.

## Exemplo de execução

```text
Número: 777
Todos os dígitos são iguais
```

O valor 707 não tem todos os dígitos iguais.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0406S"
var
numero, centena, dezena, unidade: inteiro
inicio
escreva("Número de três algarismos: ")
  leia(numero)
  se (numero >= 100) e (numero <= 999) entao
    centena <- numero div 100
    dezena <- (numero div 10) mod 10
    unidade <- numero mod 10
    se (centena = dezena) e (dezena = unidade) entao
      escreval("Todos os dígitos são iguais")
    senao
      escreval("Os dígitos não são todos iguais")
    fimse
  senao
    escreval("Informe inteiro de 100 a 999")
  fimse
fimalgoritmo
```

A condição exige igualdade nos dois pares consecutivos de algarismos.
