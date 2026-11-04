# Enigma do espelho

**Data:** 28 de outubro · **Nível:** Simples

## Objetivo

Exiba uma palavra invertida.

## Como funciona

Leia uma palavra sem espaços e exiba os caracteres na ordem inversa.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
GATO → OTAG
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma palavra de um caractere permanece igual.

## Dicas para resolução

1. Use compr para obter o tamanho.
2. Leia caracteres de trás para frente.
3. Acumule na saída.

## Solução

```visualg
algoritmo "Desafio1028S"
var
palavra, invertida: caractere
  i: inteiro
inicio
escreva("Palavra: ")
  leia(palavra)
  invertida <- ""
  para i de compr(palavra) ate 1 passo -1 faca
    invertida <- invertida + copia(palavra, i, 1)
  fimpara
  escreval("Invertida: ", invertida)
fimalgoritmo
```

O laço visita cada posição a partir do último caractere.
