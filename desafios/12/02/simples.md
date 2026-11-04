# Luzes decorativas

**Data:** 2 de dezembro · **Nível:** Simples

## Objetivo

Calcule a quantidade total de lâmpadas em N cordões iguais.

## Como funciona

Todos os cordões têm a mesma quantidade de lâmpadas.

## Exemplo de execução

```text
4 cordões de 15 → 60 lâmpadas
```

**Como ler o exemplo:** a seta → significa "resulta em".

Sem cordões, o total é zero.

## Dicas para resolução

1. Descubra quantos cordões existem.
2. Leia a quantidade igual em cada cordão.
3. Multiplique as duas contagens.

## Solução

```visualg
algoritmo "Desafio1202S"
var
  cordoes, lampadas: inteiro
inicio
  escreva("Cordões: ")
  leia(cordoes)
  escreva("Lâmpadas por cordão: ")
  leia(lampadas)
  se (cordoes < 0) ou (lampadas < 0) entao
    escreval("Quantidade inválida")
  senao
    escreval("Total: ", cordoes * lampadas)
  fimse
fimalgoritmo
```

Multiplique cordões por lâmpadas em cada cordão.
