# Árvore iluminada

**Data:** 6 de dezembro · **Nível:** Simples

## Objetivo

Desenhe um triângulo de N linhas com asteriscos.

## Como funciona

A linha i tem i asteriscos; o triângulo é alinhado à esquerda.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
N = 3 → *, **, ***
```

**Como ler o exemplo:** a seta → significa "resulta em".

N = 1 produz um asterisco.

## Dicas para resolução

1. Controle a linha no laço externo.
2. Use o número da linha como limite interno.
3. Quebre a linha após os asteriscos.

## Solução

```visualg
algoritmo "Desafio1206S"
var
  n, linha, coluna: inteiro
inicio
  escreva("Altura (1 a 30): ")
  leia(n)
  se (n < 1) ou (n > 30) entao
    escreval("Altura inválida")
  senao
    para linha de 1 ate n faca
      para coluna de 1 ate linha faca
        escreva("*")
      fimpara
      escreval("")
    fimpara
  fimse
fimalgoritmo
```

O laço externo percorre linhas e o interno desenha cada uma.
