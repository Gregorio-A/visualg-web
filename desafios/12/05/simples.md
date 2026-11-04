# Cartão de boas-festas

**Data:** 5 de dezembro · **Nível:** Simples

## Objetivo

Leia nome e imprima mensagem personalizada.

## Como funciona

Inclua o nome lido na saudação.

## Exemplo de execução

```text
Ana → Boas festas, Ana!
```

**Como ler o exemplo:** a seta → significa "resulta em".

Nome vazio precisa ser informado novamente.

## Dicas para resolução

1. Leia o nome como caractere.
2. Confira se há algum texto.
3. Junte o nome à saudação.

## Solução

```visualg
algoritmo "Desafio1205S"
var
  nome: caractere
inicio
  escreva("Nome: ")
  leia(nome)
  se compr(nome) = 0 entao
    escreval("Informe um nome")
  senao
    escreval("Boas festas, ", nome, "!")
  fimse
fimalgoritmo
```

O comando escreval junta texto fixo e o nome.
