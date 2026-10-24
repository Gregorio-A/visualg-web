# Cobertor suficiente

**Data:** 3 de julho · **Nível:** Simples

## Objetivo

Diga se a quantidade de cobertores atende à demanda.

## Como funciona

A demanda é atendida quando a disponibilidade é maior ou igual ao necessário.

## Exemplo de execução

```text
Disponíveis 7, demanda 5 → suficiente
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade é suficiente.

## Dicas para resolução

1. Leia estoque e demanda.
2. Use >=.
3. Subtraia para saber a falta.

## Solução

```visualg
algoritmo "Desafio0703S"
var
cobertores, demanda: inteiro
inicio
escreva("Cobertores disponíveis: ")
  leia(cobertores)
  escreva("Cobertores necessários: ")
  leia(demanda)
  se (cobertores < 0) ou (demanda < 0) entao
    escreval("Quantidade inválida")
  senao
    se cobertores >= demanda entao
      escreval("Quantidade suficiente")
    senao
      escreval("Faltam ", demanda - cobertores, " cobertor(es)")
    fimse
  fimse
fimalgoritmo
```

A comparação informa a situação e a diferença mede a falta.
