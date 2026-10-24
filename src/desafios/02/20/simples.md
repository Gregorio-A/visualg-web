# Cadeado do armário

**Data:** 20 de fevereiro · **Nível:** Simples

## Objetivo

Leia uma senha numérica e compare com a senha fixa.

## Como funciona

Leia um número inteiro e compare-o com a senha fixa 2468 deste exercício.

## Exemplo de execução

```text
Senha numérica: 2468
Senha correta.
```

Uma diferença de apenas um dígito torna a senha incorreta.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0220S"
var
senha: inteiro
inicio
escreva("Senha numérica: ")
  leia(senha)
  se senha = 2468 entao
    escreval("Senha correta.")
  senao
    escreval("Senha incorreta.")
  fimse
fimalgoritmo
```

O operador `=` verifica igualdade numérica.
