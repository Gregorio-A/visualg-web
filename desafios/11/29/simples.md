# Estado da conexão

**Data:** 29 de novembro · **Nível:** Simples

## Objetivo

Indique ONLINE ou OFFLINE conforme uma entrada booleana.

## Como funciona

Use entrada lógica verdadeira ou falsa.

### Palavras úteis

- **Variável lógica:** Guarda apenas verdadeiro ou falso, como uma resposta de sim ou não.

## Exemplo de execução

```text
verdadeiro → ONLINE; falso → OFFLINE
```

**Como ler o exemplo:** a seta → significa "resulta em".

Outros textos não são entradas lógicas válidas.

## Dicas para resolução

1. Declare variável lógica.
2. Leia o estado.
3. Use se.

## Solução

```visualg
algoritmo "Desafio1129S"
var
conectado: logico
inicio
escreva("Conectado? (verdadeiro/falso): ")
  leia(conectado)
  se conectado entao
    escreval("ONLINE")
  senao
    escreval("OFFLINE")
  fimse
fimalgoritmo
```

A condição testa diretamente o valor booleano.
