# Painel de metas

**Data:** 29 de dezembro · **Nível:** Avançado

## Objetivo

Acompanhe 12 resultados mensais em vetor e calcule evolução e melhores períodos.

## Como funciona

Cadastre percentuais de 0 a 100 para os 12 meses; apresente média, melhor mês e crescimento entre meses.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Janeiro 40%, dezembro 70% → evolução final de +30 pontos percentuais.
```

**Como ler o exemplo:** a seta → significa "resulta em".

Empate no máximo mantém o primeiro mês encontrado.

## Dicas para resolução

1. Leia 12 percentuais.
2. Acumule a soma e guarde o máximo.
3. Compare vizinhos e extremos.

## Solução

```visualg
algoritmo "Desafio1229A"
var
  resultado: vetor[1..12] de real
  i, melhorMes: inteiro
  soma, maior, evolucao: real
inicio
  soma <- 0
  maior <- -1
  melhorMes <- 0
  para i de 1 ate 12 faca
    repita
      escreva("Resultado do mês ", i, " (0 a 100%): ")
      leia(resultado[i])
    ate (resultado[i] >= 0) e (resultado[i] <= 100)
    soma <- soma+resultado[i]
    se resultado[i] > maior entao
      maior <- resultado[i]
      melhorMes <- i
    fimse
  fimpara
  escreval("Média anual: ", soma/12:0:2, "%")
  escreval("Melhor mês: ", melhorMes, " com ", maior:0:2, "%")
  evolucao <- resultado[12]-resultado[1]
  escreval("Evolução de janeiro a dezembro: ", evolucao:0:2, " ponto(s) percentuais")
  para i de 2 ate 12 faca
    se resultado[i] > resultado[i-1] entao
      escreval("Melhora no mês ", i)
    fimse
  fimpara
fimalgoritmo
```

O vetor permite comparar meses vizinhos e identificar a evolução do início ao fim.
