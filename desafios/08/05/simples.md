# Memória livre

**Data:** 5 de agosto · **Nível:** Simples

## Objetivo

Subtraia memória usada da capacidade total.

## Como funciona

A capacidade e o uso devem estar na mesma unidade.

## Exemplo de execução

```text
16 GB totais, 6 GB usados → 10 GB livres
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uso igual à capacidade deixa zero livre.

## Dicas para resolução

1. Leia os dois valores.
2. Confira se uso não supera capacidade.
3. Subtraia.

## Solução

```visualg
algoritmo "Desafio0805S"
var
capacidade, usada: real
inicio
escreva("Capacidade de memória: ")
  leia(capacidade)
  escreva("Memória usada: ")
  leia(usada)
  se (capacidade < 0) ou (usada < 0) ou (usada > capacidade) entao
    escreval("Dados inválidos")
  senao
    escreval("Memória livre: ", capacidade - usada)
  fimse
fimalgoritmo
```

A diferença entre capacidade e uso é o espaço livre.
