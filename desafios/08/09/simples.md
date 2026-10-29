# Nível do personagem

**Data:** 9 de agosto · **Nível:** Simples

## Objetivo

Diga se pontos atingem o limite do próximo nível.

## Como funciona

O próximo nível está disponível quando pontos alcançam ou superam o limite.

## Exemplo de execução

```text
90 pontos, limite 100 → faltam 10
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade já libera o nível.

## Dicas para resolução

1. Use >=.
2. Subtraia para o caso incompleto.
3. Mostre a situação.

## Solução

```visualg
algoritmo "Desafio0809S"
var
pontos, limite: inteiro
inicio
escreva("Experiência atual: ")
  leia(pontos)
  escreva("Experiência exigida para o próximo nível: ")
  leia(limite)
  se (pontos < 0) ou (limite < 0) entao
    escreval("Dados inválidos")
  senao
    se pontos >= limite entao
      escreval("Próximo nível disponível")
    senao
      escreval("Faltam ", limite - pontos, " pontos")
    fimse
  fimse
fimalgoritmo
```

A diferença informa a quantidade ainda necessária.
