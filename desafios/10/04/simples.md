# Morcegos voando

**Data:** 4 de outubro · **Nível:** Simples

## Objetivo

Apresente números pares até um limite.

## Como funciona

Mostre números pares de zero até o limite inclusivo.

### Palavras úteis

- **Resto da divisão:** É o que sobra quando uma divisão inteira não é exata. Por exemplo, 7 dividido por 3 deixa resto 1.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
Limite 5 → 0, 2, 4
```

**Como ler o exemplo:** a seta → significa "resulta em".

Limite zero imprime apenas zero.

## Dicas para resolução

1. Percorra 0 até N.
2. Teste mod 2.
3. Imprima os pares.

## Solução

```visualg
algoritmo "Desafio1004S"
var
limite, i: inteiro
inicio
escreva("Limite: ")
  leia(limite)
  se limite < 0 entao
    escreval("Limite inválido")
  senao
    para i de 0 ate limite faca
      se i mod 2 = 0 entao
        escreval(i)
      fimse
    fimpara
  fimse
fimalgoritmo
```

Um número é par quando o resto da divisão por dois é zero.
