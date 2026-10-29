# Correio elegante

**Data:** 5 de junho · **Nível:** Simples

## Objetivo

Leia remetente e destinatário e imprima um bilhete.

## Como funciona

Receba os dois nomes e monte uma frase que identifique quem envia e quem recebe.

## Exemplo de execução

```text
Ana, Beto → Bilhete de Ana para Beto: feliz festa junina!
```

**Como ler o exemplo:** a seta → significa "resulta em".

Os nomes são tratados como texto; não há cadastro de participantes.

## Dicas para resolução

1. Leia dois textos.
2. Mantenha remetente e destinatário em variáveis diferentes.
3. Monte a frase de saída.

## Solução

```visualg
algoritmo "Desafio0605S"
var
remetente, destinatario: caractere
inicio
escreva("Remetente: ")
  leia(remetente)
  escreva("Destinatário: ")
  leia(destinatario)
  escreval("Bilhete de ", remetente, " para ", destinatario, ": feliz festa junina!")
fimalgoritmo
```

A saída combina textos fixos e os valores lidos.
