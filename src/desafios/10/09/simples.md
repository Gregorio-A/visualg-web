# Poção de força

**Data:** 9 de outubro · **Nível:** Simples

## Objetivo

Aumente um atributo em porcentagem informada.

## Como funciona

O aumento incide sobre o atributo original.

### Palavras úteis

- **Porcentagem:** É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100.

## Exemplo de execução

```text
Força 20 com bônus 25% → 25
```

**Como ler o exemplo:** a seta → significa "resulta em".

Bônus zero mantém o atributo.

## Dicas para resolução

1. Converta percentual.
2. Some um.
3. Multiplique pelo atributo.

## Solução

```visualg
algoritmo "Desafio1009S"
var
atributo, bonus: real
inicio
escreva("Atributo inicial: ")
  leia(atributo)
  escreva("Aumento percentual: ")
  leia(bonus)
  se (atributo < 0) ou (bonus < 0) entao
    escreval("Dados inválidos")
  senao
    escreval("Atributo fortalecido: ", atributo * (1 + bonus / 100))
  fimse
fimalgoritmo
```

Um mais a taxa em fração é o fator de multiplicação.
