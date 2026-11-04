# Porta do castelo

**Data:** 13 de outubro · **Nível:** Simples

## Objetivo

Informe ABERTA quando uma senha correta for digitada.

## Como funciona

A senha correta estabelecida é lua123, sensível a maiúsculas.

## Exemplo de execução

```text
lua123 → ABERTA
```

**Como ler o exemplo:** a seta → significa "resulta em".

LUA123 não abre a porta.

## Dicas para resolução

1. Leia uma string.
2. Compare com o literal.
3. Mostre o estado.

## Solução

```visualg
algoritmo "Desafio1013S"
var
senha: caractere
inicio
escreva("Senha da porta: ")
  leia(senha)
  se senha = "lua123" entao
    escreval("ABERTA")
  senao
    escreval("FECHADA")
  fimse
fimalgoritmo
```

A igualdade de textos compara a entrada ao código previsto.
