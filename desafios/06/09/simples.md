# Paçocas para todos

**Data:** 9 de junho · **Nível:** Simples

## Objetivo

Calcule quantas paçocas sobram após divisão igual.

## Como funciona

Distribua as paçocas igualmente e informe o resto.

### Palavras úteis

- **div:** É uma divisão que guarda apenas a parte inteira. Por exemplo, 7 div 3 resulta em 2.
- **mod:** Mostra o resto de uma divisão inteira. Por exemplo, 7 mod 3 resulta em 1.

## Exemplo de execução

```text
17 paçocas para 5 pessoas → 3 por pessoa e 2 sobrando
```

**Como ler o exemplo:** a seta → significa "resulta em".

Não divida por zero pessoas.

## Dicas para resolução

1. Use div para a cota.
2. Use mod para o resto.
3. Valide pessoas.

## Solução

```visualg
algoritmo "Desafio0609S"
var
pacocas, pessoas: inteiro
inicio
escreva("Paçocas: ")
  leia(pacocas)
  escreva("Pessoas: ")
  leia(pessoas)
  se (pacocas < 0) ou (pessoas <= 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Cada pessoa recebe ", pacocas div pessoas)
    escreval("Sobram ", pacocas mod pessoas, " paçoca(s)")
  fimse
fimalgoritmo
```

A divisão inteira encontra a cota; o módulo encontra o que sobra.
