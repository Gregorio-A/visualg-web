# Desenho da fogueira

**Data:** 10 de junho · **Nível:** Avançado

## Objetivo

Crie arte ASCII com altura configurável e distribuição simétrica de chamas.

## Como funciona

Desenhe triângulo de chamas com altura de 1 a 10. A linha n tem 2n−1 asteriscos e espaços à esquerda para centralizar.

## Exemplo de execução

```text
Altura 3:
  *
 ***
*****
```

Altura fora de 1–10 é recusada para manter o desenho legível.

## Dicas para resolução

1. Calcule espaços como altura menos linha.
2. Calcule chamas como 2×linha−1.
3. Monte e imprima cada linha.

## Solução

```visualg
algoritmo "Desafio0610A"
var
altura, linha, espacos, chamas: inteiro
  texto: caractere
inicio
escreva("Altura da fogueira (1 a 10): ")
  leia(altura)
  se (altura < 1) ou (altura > 10) entao
    escreval("Altura inválida")
  senao
    para linha de 1 ate altura faca
      texto <- ""
      para espacos de 1 ate altura - linha faca
        texto <- texto + " "
      fimpara
      para chamas de 1 ate 2 * linha - 1 faca
        texto <- texto + "*"
      fimpara
      escreval(texto)
    fimpara
    escreval("Fogueira com ", altura, " linha(s)")
  fimse
fimalgoritmo
```

A quantidade ímpar de asteriscos e os espaços decrescentes formam a simetria.
