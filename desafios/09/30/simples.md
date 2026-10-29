# Balanço verde

**Data:** 30 de setembro · **Nível:** Simples

## Objetivo

Some três valores de economia ambiental.

## Como funciona

As três economias devem ser previamente convertidas para a mesma escala de pontos; não some litros diretamente a kWh.

## Exemplo de execução

```text
10, 20 e 30 pontos → balanço de 60 pontos
```

**Como ler o exemplo:** a seta → significa "resulta em".

Valor zero não altera o balanço.

## Dicas para resolução

1. Use unidade comum.
2. Leia três valores.
3. Some.

## Solução

```visualg
algoritmo "Desafio0930S"
var
agua, energia, residuos: real
inicio
escreva("Economia de água em unidade comparável: ")
  leia(agua)
  escreva("Economia de energia na mesma escala de pontos: ")
  leia(energia)
  escreva("Economia de resíduos na mesma escala de pontos: ")
  leia(residuos)
  se (agua < 0) ou (energia < 0) ou (residuos < 0) entao
    escreval("Valor inválido")
  senao
    escreval("Pontos de economia ambiental: ", agua + energia + residuos)
  fimse
fimalgoritmo
```

A soma só faz sentido após as grandezas terem sido expressas em unidade comparável.
