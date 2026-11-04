# Rota das casas

**Data:** 18 de outubro · **Nível:** Avançado

## Objetivo

Acompanhe visitas a uma lista de casas e impeça contagem de repetidas.

## Como funciona

Doze tentativas de visita escolhem casas numeradas 1–10. Conte doces somente da primeira visita válida a cada casa.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Casa 3 oferece 5 doces na primeira e 5 na segunda → total contado 5
```

**Como ler o exemplo:** a seta → significa "resulta em".

Número fora de 1–10 não acessa o vetor.

## Dicas para resolução

1. Valide o número da casa.
2. Consulte se já foi visitada.
3. Some doces apenas na primeira vez.

## Solução

```visualg
algoritmo "Desafio1018A"
var
casa: vetor[1..10] de inteiro
  i, numero, doces, total: inteiro
inicio
para i de 1 ate 10 faca
    casa[i] <- 0
  fimpara
  total <- 0
  para i de 1 ate 12 faca
    escreva("Casa visitada (1 a 10): ")
    leia(numero)
    escreva("Doces oferecidos: ")
    leia(doces)
    se (numero >= 1) e (numero <= 10) e (doces >= 0) entao
      se casa[numero] = 0 entao
        casa[numero] <- 1
        total <- total + doces
        escreval("Visita registrada")
      senao
        escreval("Casa repetida; doces não contados")
      fimse
    fimse
  fimpara
  escreval("Doces contabilizados: ", total)
fimalgoritmo
```

Um vetor de estados marca casas já visitadas para impedir contagem duplicada.
