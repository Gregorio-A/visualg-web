# Som da bateria

**Data:** 5 de fevereiro · **Nível:** Simples

## Objetivo

Repita uma palavra quatro vezes em linhas separadas.

## Como funciona

Leia uma palavra uma vez e mostre-a quatro vezes, cada ocorrência em uma linha.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Palavra: tum
tum
tum
tum
tum
```

O laço executa exatamente quatro iterações.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Use uma repetição para executar a mesma tarefa várias vezes.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0205S"
var
palavra: caractere
  i: inteiro
inicio
escreva("Palavra: ")
  leia(palavra)
  para i de 1 ate 4 faca
    escreval(palavra)
  fimpara
fimalgoritmo
```

A entrada é guardada antes do laço; cada iteração reutiliza a mesma palavra.
