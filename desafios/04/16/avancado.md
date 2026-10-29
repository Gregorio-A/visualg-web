# Troco exato

**Data:** 16 de abril · **Nível:** Avançado

## Objetivo

Encontre a combinação de moedas que totaliza um valor com menor número de peças.

## Como funciona

Leia valor inteiro e quantidades disponíveis de moedas fictícias de 1, 2, 5 e 10. Teste combinações que formem exatamente o alvo e escolha a de menor número de peças.

## Exemplo de execução

```text
Alvo 12; há moedas de 10 e 2
Menor número de moedas: 2
```

Se nenhuma combinação formar o alvo, informe que não há troco exato.

## Dicas para resolução

1. Percorra todas as quantidades possíveis de cada moeda.
2. Compare o valor total com o alvo.
3. Entre combinações exatas, minimize o número de peças.

## Solução

```visualg
algoritmo "Desafio0416A"
var
valores: vetor[1..4] de inteiro
  alvo, a, b, c, d, melhor, total: inteiro
inicio
escreva("Valor a formar: ")
  leia(alvo)
  escreva("Quantidade disponível de moedas de 1: ")
  leia(valores[1])
  escreva("Quantidade disponível de moedas de 2: ")
  leia(valores[2])
  escreva("Quantidade disponível de moedas de 5: ")
  leia(valores[3])
  escreva("Quantidade disponível de moedas de 10: ")
  leia(valores[4])
  melhor <- 999999999
  para a de 0 ate valores[1] faca
    para b de 0 ate valores[2] faca
      para c de 0 ate valores[3] faca
        para d de 0 ate valores[4] faca
          se a + 2 * b + 5 * c + 10 * d = alvo entao
            total <- a + b + c + d
            se total < melhor entao
              melhor <- total
            fimse
          fimse
        fimpara
      fimpara
    fimpara
  fimpara
  se melhor < 999999999 entao
    escreval("Menor número de moedas: ", melhor)
  senao
    escreval("Não existe troco exato com as moedas disponíveis.")
  fimse
fimalgoritmo
```

A enumeração limitada pela disponibilidade verifica todas as combinações possíveis; `melhor` conserva a menor contagem.
