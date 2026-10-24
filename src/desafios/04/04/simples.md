# Sala dos espelhos

**Data:** 4 de abril · **Nível:** Simples

## Objetivo

Apresente um número inteiro com seus dígitos invertidos.

## Como funciona

Leia inteiro não negativo. Retire algarismos da direita para a esquerda e forme outro inteiro nessa ordem.

## Exemplo de execução

```text
Número: 1234
Dígitos invertidos: 4321
```

Zeros à esquerda do resultado não aparecem em uma variável inteira: 120 vira 21.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0404S"
var
numero, resto, invertido: inteiro
inicio
escreva("Inteiro não negativo: ")
  leia(numero)
  invertido <- 0
  se numero >= 0 entao
    repita
      resto <- numero mod 10
      invertido <- invertido * 10 + resto
      numero <- numero div 10
    ate numero = 0
    escreval("Dígitos invertidos: ", invertido)
  senao
    escreval("Informe um inteiro não negativo.")
  fimse
fimalgoritmo
```

Multiplicar o resultado por 10 antes de acrescentar o próximo algarismo desloca os dígitos já montados.
