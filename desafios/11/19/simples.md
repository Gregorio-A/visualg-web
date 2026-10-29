# Pasta de projetos

**Data:** 19 de novembro · **Nível:** Simples

## Objetivo

Calcule total de pastas e subpastas informadas.

## Como funciona

Conte pastas e subpastas como diretórios distintos.

## Exemplo de execução

```text
3 pastas e 5 subpastas → 8 diretórios
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero subpasta é válido.

## Dicas para resolução

1. Leia ambas as quantidades.
2. Some.
3. Mostre total.

## Solução

```visualg
algoritmo "Desafio1119S"
var
pastas, subpastas: inteiro
inicio
escreva("Pastas principais: ")
  leia(pastas)
  escreva("Subpastas: ")
  leia(subpastas)
  se (pastas < 0) ou (subpastas < 0) entao
    escreval("Contagem inválida")
  senao
    escreval("Total de pastas: ", pastas + subpastas)
  fimse
fimalgoritmo
```

A soma fornece o total de diretórios.
