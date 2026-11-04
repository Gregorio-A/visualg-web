# Contagem para a festa

**Data:** 1 de dezembro · **Nível:** Simples

## Objetivo

Faça contagem regressiva de N até 0.

## Como funciona

Leia N não negativo; imprima N até zero, inclusive.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
3 → 3, 2, 1, 0
```

**Como ler o exemplo:** a seta → significa "resulta em".

Se N = 0, imprima apenas 0.

## Dicas para resolução

1. Leia um inteiro não negativo.
2. Percorra os valores em ordem decrescente.
3. Inclua zero na saída.

## Solução

```visualg
algoritmo "Desafio1201S"
var
  n, i: inteiro
inicio
  escreva("Iniciar em: ")
  leia(n)
  se n < 0 entao
    escreval("Valor inválido")
  senao
    para i de n ate 0 passo -1 faca
      escreval(i)
    fimpara
  fimse
fimalgoritmo
```

O laço usa passo -1 e inclui o zero.
