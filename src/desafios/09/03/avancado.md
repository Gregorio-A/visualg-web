# Consumo residencial

**Data:** 3 de setembro · **Nível:** Avançado

## Objetivo

Compare medições de água e localize aumentos anormais entre períodos.

## Como funciona

Leia oito consumos de água. Compare períodos vizinhos e marque aumento percentual estritamente acima do limite informado.

## Exemplo de execução

```text
Consumo 100 seguido de 130, limite 20% → aumento anormal de 30%
```

**Como ler o exemplo:** a seta → significa "resulta em".

Consumo anterior zero não pode ser base percentual e é ignorado.

## Dicas para resolução

1. Compare vizinhos.
2. Divida diferença pelo anterior.
3. Conte os valores acima do limite.

## Solução

```visualg
algoritmo "Desafio0903A"
var
leitura: vetor[1..8] de real
  i, picos: inteiro
  limite, aumento, maior: real
inicio
escreva("Aumento anormal mínimo em %: ")
  leia(limite)
  para i de 1 ate 8 faca
    escreva("Consumo do período ", i, ": ")
    leia(leitura[i])
  fimpara
  picos <- 0
  maior <- 0
  para i de 2 ate 8 faca
    se (leitura[i - 1] > 0) e (leitura[i] >= 0) entao
      aumento <- 100 * (leitura[i] - leitura[i - 1]) / leitura[i - 1]
      se aumento > maior entao
        maior <- aumento
      fimse
      se aumento > limite entao
        picos <- picos + 1
        escreval("Aumento anormal entre períodos ", i - 1, " e ", i, ": ", aumento, "%")
      fimse
    fimse
  fimpara
  escreval("Aumentos anormais: ", picos, "; maior aumento: ", maior, "%")
fimalgoritmo
```

A variação percentual usa a leitura anterior como denominador.
