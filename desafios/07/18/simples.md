# Pares de meias

**Data:** 18 de julho · **Nível:** Simples

## Objetivo

Calcule a quantidade de pares completos dado N meias.

## Como funciona

Cada par usa duas meias, sem considerar cores.

### Palavras úteis

- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
7 meias → 3 pares e 1 meia sem par
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero meia produz zero par.

## Dicas para resolução

1. Divida por 2.
2. Use mod para sobra.
3. Mostre ambos.

## Solução

```visualg
algoritmo "Desafio0718S"
var
meias: inteiro
inicio
escreva("Quantidade de meias: ")
  leia(meias)
  se meias < 0 entao
    escreval("Quantidade inválida")
  senao
    escreval("Pares completos: ", meias div 2)
    escreval("Meias sem par: ", meias mod 2)
  fimse
fimalgoritmo
```

Divisão inteira conta pares; módulo conta a peça restante.
