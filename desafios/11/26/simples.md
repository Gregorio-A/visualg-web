# Fila de tarefas

**Data:** 26 de novembro · **Nível:** Simples

## Objetivo

Numere N tarefas cadastradas.

## Como funciona

Cadastre N nomes de tarefas e mostre cada um com seu número.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Tarefas estudar, revisar → 1. estudar; 2. revisar
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero tarefa produz lista vazia.

## Dicas para resolução

1. Leia N.
2. Repita a leitura de nome.
3. Imprima i e nome.

## Solução

```visualg
algoritmo "Desafio1126S"
var
tarefas, i: inteiro
  nome: caractere
inicio
escreva("Número de tarefas: ")
  leia(tarefas)
  se tarefas < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate tarefas faca
      escreva("Nome da tarefa ", i, ": ")
      leia(nome)
      escreval(i, ". ", nome)
    fimpara
  fimse
fimalgoritmo
```

O contador do laço fornece a numeração.
