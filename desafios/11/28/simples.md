# Atualização de sistema

**Data:** 28 de novembro · **Nível:** Simples

## Objetivo

Calcule o progresso percentual a partir de blocos concluídos.

## Como funciona

Divida blocos concluídos pelo total e multiplique por cem.

## Exemplo de execução

```text
25 de 100 blocos → 25%
```

**Como ler o exemplo:** a seta → significa "resulta em".

Total zero impede cálculo.

## Dicas para resolução

1. Valide o total.
2. Divida.
3. Multiplique por cem.

## Solução

```visualg
algoritmo "Desafio1128S"
var
concluidos, total: inteiro
inicio
escreva("Blocos totais: ")
  leia(total)
  escreva("Blocos concluídos: ")
  leia(concluidos)
  se (total <= 0) ou (concluidos < 0) ou (concluidos > total) entao
    escreval("Dados inválidos")
  senao
    escreval("Progresso: ", 100 * concluidos / total, "%")
  fimse
fimalgoritmo
```

A razão concluído/total expressa a fração concluída.
