# Senha par

**Data:** 26 de abril · **Nível:** Simples

## Objetivo

Aceite apenas um PIN numérico com quatro dígitos e último dígito par.

## Como funciona

Aceite um PIN numérico inteiro entre 1000 e 9999 cujo último dígito seja par.

## Exemplo de execução

```text
PIN: 2468
PIN válido
```

Um PIN iniciado por zero não é representável como inteiro de quatro dígitos neste exercício.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0426S"
var
pin: inteiro
inicio
escreva("PIN de quatro dígitos: ")
  leia(pin)
  se (pin >= 1000) e (pin <= 9999) e (pin mod 2 = 0) entao
    escreval("PIN válido")
  senao
    escreval("PIN inválido")
  fimse
fimalgoritmo
```

O último algarismo é par exatamente quando o número inteiro é par.
