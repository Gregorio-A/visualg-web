# Cadeia caipira

**Data:** 19 de junho · **Nível:** Simples

## Objetivo

Mostre uma mensagem para um número de participante.

## Como funciona

Leia o número de um participante e apresente uma mensagem de brincadeira identificando-o.

## Exemplo de execução

```text
Número 4 → Participante 4: você foi capturado na brincadeira!
```

**Como ler o exemplo:** a seta → significa "resulta em".

Número não positivo é inválido.

## Dicas para resolução

1. Leia o número.
2. Valide se é positivo.
3. Inclua-o no texto.

## Solução

```visualg
algoritmo "Desafio0619S"
var
participante: inteiro
inicio
escreva("Número do participante: ")
  leia(participante)
  se participante <= 0 entao
    escreval("Número inválido")
  senao
    escreval("Participante ", participante, ": você foi capturado na brincadeira!")
  fimse
fimalgoritmo
```

O número lido é inserido na mensagem personalizada.
