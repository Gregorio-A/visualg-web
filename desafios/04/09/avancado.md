# Pirâmide criptográfica

**Data:** 9 de abril · **Nível:** Avançado

## Objetivo

Desenhe uma pirâmide textual de dígitos com padrão alternado configurável.

## Como funciona

Leia altura de 1 a 9. Cada linha i contém `2i - 1` dígitos, precedidos por espaços para centralizar. No modo alternado, intercale 0 e 1; no outro, repita o número da linha.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Altura 2, modo não alternado
 1
222
```

A primeira linha tem um dígito e a última tem `2 × altura - 1` dígitos.

## Dicas para resolução

1. Use um laço para linhas.
2. Calcule espaços e largura a partir da linha.
3. Escolha o dígito conforme o modo.

## Solução

```visualg
algoritmo "Desafio0409A"
var
altura, linha, espaco, coluna, alternancia: inteiro
inicio
escreva("Altura da pirâmide (1 a 9): ")
  leia(altura)
  escreva("Alternar dígitos 0 e 1? (1 sim, 0 não): ")
  leia(alternancia)
  se (altura >= 1) e (altura <= 9) entao
    para linha de 1 ate altura faca
      para espaco de 1 ate altura - linha faca
        escreva(" ")
      fimpara
      para coluna de 1 ate linha * 2 - 1 faca
        se alternancia = 1 entao
          escreva((linha + coluna) mod 2)
        senao
          escreva(linha)
        fimse
      fimpara
      escreval("")
    fimpara
  senao
    escreval("Altura inválida.")
  fimse
fimalgoritmo
```

O laço de espaços diminui enquanto o laço de dígitos aumenta, criando a forma triangular.
