# Onda alta

**Data:** 22 de janeiro · **Nível:** Simples

## Objetivo

Compare duas alturas de onda e exiba a maior.

Apresente a maior altura entre duas ondas medidas.

## Como funciona

Leia as duas alturas na mesma unidade e compare os valores.

## Exemplo de execução

```text
Altura da primeira onda: 1.2
Altura da segunda onda: 1.7
Maior altura: 1.7
```

Se as alturas forem iguais, o valor comum será exibido.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma condição `se` para escolher a resposta de acordo com o valor recebido.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0122S"
var
primeira, segunda: real
inicio
escreva("Altura da primeira onda: ")
  leia(primeira)
  escreva("Altura da segunda onda: ")
  leia(segunda)
  se primeira > segunda entao
    escreval("Maior altura: ", primeira)
  senao
    escreval("Maior altura: ", segunda)
  fimse
fimalgoritmo
```

A seleção escolhe a primeira altura somente quando ela é estritamente maior.
