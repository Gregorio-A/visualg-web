# Primeiro dia de aula

**Data:** 1 de março · **Nível:** Simples

## Objetivo

Leia nome e turma e mostre uma identificação.

## Como funciona

Leia dois textos, nome e turma, e reúna-os em uma identificação de uma linha.

## Exemplo de execução

```text
Nome: Ana
Turma: 7A
Estudante: Ana — turma 7A
```

Uma turma com letras e números deve ser tratada como texto.

## Dicas para resolução

1. Leia os dados pedidos antes de montar a resposta. Guarde cada dado em uma variável.
2. Monte a mensagem de saída com os dados lidos, na ordem pedida.
3. Depois de testar o exemplo, experimente o caso especial descrito acima.

## Solução

```visualg
algoritmo "Desafio0301S"
var
nome, turma: caractere
inicio
escreva("Nome: ")
  leia(nome)
  escreva("Turma: ")
  leia(turma)
  escreval("Estudante: ", nome, " — turma ", turma)
fimalgoritmo
```

As duas variáveis são impressas na mesma ordem em que foram solicitadas.
