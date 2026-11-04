# Dia ensolarado

**Data:** 12 de setembro · **Nível:** Simples

## Objetivo

Diga se uma porcentagem de nebulosidade fica abaixo do limite.

## Como funciona

Dia ensolarado exige nebulosidade estritamente abaixo do limite definido.

### Palavras úteis

- **Porcentagem:** É uma quantidade em cada 100. Por exemplo, 25% significa 25 em 100.

## Exemplo de execução

```text
20% com limite 40% → ensolarado
```

**Como ler o exemplo:** a seta → significa "resulta em".

Igualdade não fica abaixo.

## Dicas para resolução

1. Valide 0–100%.
2. Compare <.
3. Exiba a classificação.

## Solução

```visualg
algoritmo "Desafio0912S"
var
nebulosidade, limite: real
inicio
escreva("Nebulosidade em %: ")
  leia(nebulosidade)
  escreva("Limite para dia ensolarado em %: ")
  leia(limite)
  se (nebulosidade < 0) ou (nebulosidade > 100) ou (limite < 0) ou (limite > 100) entao
    escreval("Percentual inválido")
  senao
    se nebulosidade < limite entao
      escreval("Dia ensolarado")
    senao
      escreval("Nebulosidade no limite ou acima")
    fimse
  fimse
fimalgoritmo
```

A comparação estrita evita incluir o limite no resultado positivo.
