# Fantasma na tela

**Data:** 1 de outubro · **Nível:** Simples

## Objetivo

Imprima BOO! a quantidade de vezes solicitada.

## Como funciona

Mostre BOO! uma vez por aparição solicitada.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
3 → BOO! em três linhas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Zero aparição não imprime BOO!.

## Dicas para resolução

1. Leia N.
2. Use para.
3. Imprima em cada passagem.

## Solução

```visualg
algoritmo "Desafio1001S"
var
vezes, i: inteiro
inicio
escreva("Quantas aparições? ")
  leia(vezes)
  se vezes < 0 entao
    escreval("Quantidade inválida")
  senao
    para i de 1 ate vezes faca
      escreval("BOO!")
    fimpara
  fimse
fimalgoritmo
```

O laço repete a mesma saída a quantidade pedida.
