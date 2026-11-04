# Ano novo

**Data:** 31 de dezembro · **Nível:** Simples

## Objetivo

Leia uma meta pessoal e imprima mensagem com ela.

## Como funciona

Inclua a meta informada em uma mensagem personalizada.

## Exemplo de execução

```text
Aprender algoritmos → Feliz ano novo! Sua meta é: Aprender algoritmos
```

**Como ler o exemplo:** a seta → significa "resulta em".

Texto vazio não identifica uma meta.

## Dicas para resolução

1. Leia a meta como texto.
2. Evite mensagem com meta vazia.
3. Inclua a meta na saudação.

## Solução

```visualg
algoritmo "Desafio1231S"
var
  meta: caractere
inicio
  escreva("Sua meta para o ano novo: ")
  leia(meta)
  se compr(meta) = 0 entao
    escreval("Informe uma meta")
  senao
    escreval("Feliz ano novo! Sua meta é: ", meta)
  fimse
fimalgoritmo
```

Leia texto livre e insira-o na saudação.
