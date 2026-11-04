# Kits de agasalhos

**Data:** 27 de julho · **Nível:** Avançado

## Objetivo

Escolha peças de diferentes categorias dentro de um orçamento por kit.

## Como funciona

Há três categorias de agasalho, cada uma com três opções de preço. Monte um kit com exatamente uma peça de cada categoria, maximizando o uso do orçamento sem ultrapassá-lo.

### Palavras úteis

- **Laço:** É um trecho do algoritmo que se repete.

## Exemplo de execução

```text
Teto R$ 30; opções escolhidas de R$ 10, R$ 12 e R$ 8 → kit R$ 30
```

**Como ler o exemplo:** a seta → significa "resulta em".

Preço negativo torna a opção inválida.

## Dicas para resolução

1. Escolha uma opção por categoria.
2. Some os três preços.
3. Guarde a melhor soma dentro do teto.

## Solução

```visualg
algoritmo "Desafio0727A"
var
preco: vetor[1..3, 1..3] de real
  a, b, c: inteiro
  teto, custo, melhor: real
  melhorA, melhorB, melhorC: inteiro
inicio
escreva("Orçamento por kit: ")
  leia(teto)
  para a de 1 ate 3 faca
    para b de 1 ate 3 faca
      escreva("Preço da categoria ", a, " opção ", b, ": ")
      leia(preco[a, b])
    fimpara
  fimpara
  melhor <- -1
  para a de 1 ate 3 faca
    para b de 1 ate 3 faca
      para c de 1 ate 3 faca
        custo <- preco[1, a] + preco[2, b] + preco[3, c]
        se (preco[1, a] >= 0) e (preco[2, b] >= 0) e (preco[3, c] >= 0) e (custo <= teto) entao
          se custo > melhor entao
            melhor <- custo
            melhorA <- a
            melhorB <- b
            melhorC <- c
          fimse
        fimse
      fimpara
    fimpara
  fimpara
  se melhor < 0 entao
    escreval("Nenhum kit cabe no orçamento")
  senao
    escreval("Kit: opções ", melhorA, ", ", melhorB, ", ", melhorC, "; custo R$ ", melhor, "; saldo R$ ", teto - melhor)
  fimse
fimalgoritmo
```

Os três laços examinam as 27 combinações possíveis e retêm a mais cara ainda acessível.
