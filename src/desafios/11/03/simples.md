# Circuito ligado

**Data:** 3 de novembro · **Nível:** Simples

## Objetivo

Exiba LIGADO quando uma entrada for 1.

## Como funciona

A saída LIGADO ocorre somente para entrada igual a 1.

## Exemplo de execução

```text
1 → LIGADO
```

**Como ler o exemplo:** a seta → significa "resulta em".

Qualquer outro valor não ativa a saída.

## Dicas para resolução

1. Leia um inteiro.
2. Compare com 1.
3. Mostre o estado.

## Solução

```visualg
algoritmo "Desafio1103S"
var
entrada: inteiro
inicio
escreva("Estado (1 ligado, 0 desligado): ")
  leia(entrada)
  se entrada = 1 entao
    escreval("LIGADO")
  senao
    escreval("Não ligado")
  fimse
fimalgoritmo
```

Uma comparação exata decide o estado.
