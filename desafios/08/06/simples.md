# Senha do jogo

**Data:** 6 de agosto · **Nível:** Simples

## Objetivo

Compare a senha digitada com um código previamente estabelecido.

## Como funciona

Compare exatamente com o código pré-definido dragao42, incluindo maiúsculas e minúsculas.

## Exemplo de execução

```text
dragao42 → acesso permitido
```

**Como ler o exemplo:** a seta → significa "resulta em".

Dragao42 não corresponde ao código.

## Dicas para resolução

1. Guarde a entrada como caractere.
2. Compare com o literal.
3. Exiba o resultado.

## Solução

```visualg
algoritmo "Desafio0806S"
var
senha: caractere
inicio
escreva("Digite a senha do jogo: ")
  leia(senha)
  se senha = "dragao42" entao
    escreval("Acesso permitido")
  senao
    escreval("Senha incorreta")
  fimse
fimalgoritmo
```

A comparação de textos verifica todos os caracteres da senha.
