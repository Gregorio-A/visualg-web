# Plantas regadas

**Data:** 15 de setembro · **Nível:** Simples

## Objetivo

Conte de 1 até N plantas atendidas.

## Como funciona

Numere de 1 até a quantidade de plantas atendidas.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
N=2 → Planta 1 regada; Planta 2 regada
```

**Como ler o exemplo:** a seta → significa "resulta em".

N=0 não imprime planta.

## Dicas para resolução

1. Leia N.
2. Use para.
3. Imprima cada número.

## Solução

```visualg
algoritmo "Desafio0915S"
var
plantas, i: inteiro
inicio
escreva("Plantas regadas: ")
  leia(plantas)
  se plantas < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate plantas faca
      escreval("Planta ", i, " regada")
    fimpara
  fimse
fimalgoritmo
```

O contador do laço fornece a numeração.
