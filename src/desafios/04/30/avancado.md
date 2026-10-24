# Cofre final

**Data:** 30 de abril · **Nível:** Avançado

## Objetivo

Valide uma senha por soma de dígitos, ausência de repetições e ordem parcial.

## Como funciona

Leia soma-alvo e PIN inteiro de quatro dígitos. Exija soma exata dos dígitos, todos distintos e duas pistas de ordem: primeiro menor que quarto e segundo menor que terceiro.

## Exemplo de execução

```text
Soma 10; PIN 1234 → dígitos distintos, 1<4, 2<3, soma 10: válido
```

**Como ler o exemplo:** a seta → significa "resulta em".

PIN com zero inicial não é um inteiro de quatro dígitos nesta representação.

## Dicas para resolução

1. Extraia cada dígito.
2. Compare todos os pares para garantir ausência de repetição.
3. Verifique soma e duas relações de ordem.

## Solução

```visualg
algoritmo "Desafio0430A"
var
pin, alvo, d1, d2, d3, d4, soma: inteiro
  distintos, ordem: logico
inicio
escreva("Soma exigida: ")
  leia(alvo)
  escreva("PIN de quatro dígitos: ")
  leia(pin)
  se (pin >= 1000) e (pin <= 9999) entao
    d1 <- pin div 1000
    d2 <- (pin div 100) mod 10
    d3 <- (pin div 10) mod 10
    d4 <- pin mod 10
    soma <- d1 + d2 + d3 + d4
    distintos <- (d1 <> d2) e (d1 <> d3) e (d1 <> d4) e (d2 <> d3) e (d2 <> d4) e (d3 <> d4)
    ordem <- (d1 < d4) e (d2 < d3)
    se (soma = alvo) e distintos e ordem entao
      escreval("Senha válida")
    senao
      escreval("Senha inválida")
    fimse
  senao
    escreval("Senha inválida: formato")
  fimse
fimalgoritmo
```

A condição final reúne as três famílias de requisitos; a verificação de distinção compara todos os seis pares de dígitos.
