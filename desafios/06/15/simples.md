# Canjica da receita

**Data:** 15 de junho · **Nível:** Simples

## Objetivo

Multiplique ingredientes por fator de porções.

## Como funciona

Ajuste proporcionalmente um ingrediente da receita ao novo número de porções.

## Exemplo de execução

```text
2 xícaras para 4 porções; 10 porções → 5 xícaras
```

**Como ler o exemplo:** a seta → significa "resulta em".

Porções originais zero tornam a razão indefinida.

## Dicas para resolução

1. Calcule quantidade por porção.
2. Multiplique pelas porções desejadas.
3. Valide a divisão.

## Solução

```visualg
algoritmo "Desafio0615S"
var
porcoesBase, porcoesDesejadas: inteiro
  ingredienteBase: real
inicio
escreva("Porções da receita original: ")
  leia(porcoesBase)
  escreva("Quantidade original do ingrediente: ")
  leia(ingredienteBase)
  escreva("Porções desejadas: ")
  leia(porcoesDesejadas)
  se (porcoesBase <= 0) ou (ingredienteBase < 0) ou (porcoesDesejadas < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Quantidade necessária: ", ingredienteBase * porcoesDesejadas / porcoesBase)
  fimse
fimalgoritmo
```

A quantidade por porção é multiplicada pelo novo número de porções.
