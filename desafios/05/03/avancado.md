# Metas dos vendedores

**Data:** 3 de maio · **Nível:** Avançado

## Objetivo

Guarde vendas por profissional em vetor e gere ranking por metas atingidas.

## Como funciona

Registre vendas e meta de cinco profissionais. Compare desempenho pelo percentual da meta alcançado e mostre posição em ranking decrescente.

### Palavras úteis

- **Vetor:** É uma lista de valores com posições numeradas, como notas[1] e notas[2].

## Exemplo de execução

```text
Ana vendeu 100 para meta 100 → 100%; Bia vendeu 90 para meta 60 → 150%
Bia fica à frente de Ana
```

**Como ler o exemplo:** a seta → significa "resulta em".

Meta zero não permite razão; neste exercício recebe desempenho percentual zero.

## Dicas para resolução

1. Calcule venda dividida pela meta.
2. Use taxa percentual para comparar metas distintas.
3. Conte quantos desempenhos superam cada profissional.

## Solução

```visualg
algoritmo "Desafio0503A"
var
nome: vetor[1..5] de caractere
  vendas, meta: vetor[1..5] de real
  taxa: vetor[1..5] de real
  i, j, posicao: inteiro
inicio
para i de 1 ate 5 faca
    escreva("Vendedor ", i, ": ")
    leia(nome[i])
    escreva("Vendas: ")
    leia(vendas[i])
    escreva("Meta: ")
    leia(meta[i])
    se meta[i] > 0 entao
      taxa[i] <- vendas[i] * 100 / meta[i]
    senao
      taxa[i] <- 0
    fimse
  fimpara
  para i de 1 ate 5 faca
    posicao <- 1
    para j de 1 ate 5 faca
      se taxa[j] > taxa[i] entao
        posicao <- posicao + 1
      fimse
    fimpara
    escreval(nome[i], ": posição ", posicao, ", meta atingida ", taxa[i], "%")
  fimpara
fimalgoritmo
```

A posição é um mais a quantidade de profissionais com taxa estritamente superior, mantendo empates.
