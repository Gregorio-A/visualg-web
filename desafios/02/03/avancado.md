# Controle de acesso

**Data:** 3 de fevereiro · **Nível:** Avançado

## Objetivo

Registre entrada e saída por faixa etária e impeça exceder a lotação.

## Como funciona

Leia a lotação máxima. Cada evento representa uma pessoa adulta ou criança entrando ou saindo. Recuse entrada se o total atingir a lotação e recuse saída se não houver pessoa naquela faixa.

## Exemplo de execução

```text
Lotação: 2
Entrada adulto → total 1
Entrada criança → total 2
Entrada adulto → recusada, total 2
```

**Como ler o exemplo:** a seta → significa "resulta em".

Uma saída válida libera uma vaga para uma entrada posterior.

## Dicas para resolução

1. Use um contador por faixa etária.
2. Confira a lotação antes de registrar entrada.
3. Confira presença na faixa antes de registrar saída.

## Solução

```visualg
algoritmo "Desafio0203A"
var
presentes: vetor[1..2] de inteiro
  lotacao, total, faixa, acao: inteiro
inicio
escreva("Lotação máxima: ")
  leia(lotacao)
  presentes[1] <- 0
  presentes[2] <- 0
  total <- 0
  escreva("Ação (1 entrada, 2 saída, 0 encerrar): ")
  leia(acao)
  enquanto acao <> 0 faca
    escreva("Faixa etária (1 adulto, 2 criança): ")
    leia(faixa)
    se (faixa >= 1) e (faixa <= 2) entao
      se acao = 1 entao
        se total < lotacao entao
          presentes[faixa] <- presentes[faixa] + 1
          total <- total + 1
        senao
          escreval("Entrada recusada: lotação atingida.")
        fimse
      senao
        se (acao = 2) e (presentes[faixa] > 0) entao
          presentes[faixa] <- presentes[faixa] - 1
          total <- total - 1
        senao
          escreval("Saída inválida.")
        fimse
      fimse
    senao
      escreval("Faixa etária inválida.")
    fimse
    escreval("Adultos: ", presentes[1], "; crianças: ", presentes[2], "; total: ", total)
    escreva("Ação (1 entrada, 2 saída, 0 encerrar): ")
    leia(acao)
  fimenquanto
fimalgoritmo
```

Os contadores por faixa somam o total presente; toda atualização preserva o intervalo de zero à lotação.
