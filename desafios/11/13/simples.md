# Temperatura do processador

**Data:** 13 de novembro · **Nível:** Simples

## Objetivo

Compare leitura com limite configurado.

## Como funciona

Classifique a leitura em abaixo, igual ou acima do limite.

## Exemplo de execução

```text
Leitura 5, limite 5 → exatamente no limite
```

**Como ler o exemplo:** a seta → significa "resulta em".

Leituras negativas são comparáveis.

## Dicas para resolução

1. Compare >.
2. Compare <.
3. Trate igualdade.

## Solução

```visualg
algoritmo "Desafio1113S"
var
leitura, limite: real
inicio
escreva("Leitura do sensor: ")
  leia(leitura)
  escreva("Limite configurado: ")
  leia(limite)
  se leitura > limite entao
    escreval("Acima do limite")
  senao
    se leitura < limite entao
      escreval("Abaixo do limite")
    senao
      escreval("Exatamente no limite")
    fimse
  fimse
fimalgoritmo
```

Três relações possíveis cobrem qualquer par numérico.
