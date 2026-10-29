# Código ASCII

**Data:** 23 de agosto · **Nível:** Simples

## Objetivo

Leia um código numérico e informe se representa dígito entre 48 e 57.

## Como funciona

No ASCII, os caracteres 0 a 9 usam os códigos 48 a 57.

## Exemplo de execução

```text
48 → dígito; 65 → não dígito
```

**Como ler o exemplo:** a seta → significa "resulta em".

Os extremos 48 e 57 estão incluídos.

## Dicas para resolução

1. Leia o código inteiro.
2. Compare os dois limites.
3. Exiba a classificação.

## Solução

```visualg
algoritmo "Desafio0823S"
var
codigo: inteiro
inicio
escreva("Código ASCII: ")
  leia(codigo)
  se (codigo >= 48) e (codigo <= 57) entao
    escreval("Representa um dígito")
  senao
    escreval("Não representa um dígito")
  fimse
fimalgoritmo
```

A condição testa se o código está no intervalo inclusivo.
