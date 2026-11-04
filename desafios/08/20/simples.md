# Downloads restantes

**Data:** 20 de agosto · **Nível:** Simples

## Objetivo

Subtraia dados baixados do total de um arquivo.

## Como funciona

Os dois tamanhos devem estar na mesma unidade.

## Exemplo de execução

```text
100 MB totais, 40 MB baixados → faltam 60 MB
```

**Como ler o exemplo:** a seta → significa "resulta em".

Download concluído deixa zero.

## Dicas para resolução

1. Leia tamanho total.
2. Leia progresso.
3. Subtraia após validar.

## Solução

```visualg
algoritmo "Desafio0820S"
var
total, baixados: real
inicio
escreva("Tamanho total do arquivo: ")
  leia(total)
  escreva("Dados já baixados: ")
  leia(baixados)
  se (total < 0) ou (baixados < 0) ou (baixados > total) entao
    escreval("Dados inválidos")
  senao
    escreval("Restam: ", total - baixados)
  fimse
fimalgoritmo
```

A diferença mede dados ainda pendentes.
