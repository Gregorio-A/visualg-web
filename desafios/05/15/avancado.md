# Cotação de compra

**Data:** 15 de maio · **Nível:** Avançado

## Objetivo

Compare propostas com preço, prazo e desconto, gerando ranking ponderado.

## Como funciona

Para três propostas, calcule pontuação = preço após desconto + R$ 5 por dia de prazo. Menor pontuação vence; propostas inválidas ficam fora do ranking.

## Exemplo de execução

```text
A: R$ 100, 10%, 2 dias → 100 pontos; B: R$ 90, 0%, 1 dia → 95 pontos
B à frente de A
```

**Como ler o exemplo:** a seta → significa "resulta em".

Desconto acima de 100% ou negativo invalida a proposta. Empates mantêm a ordem de cadastro.

## Dicas para resolução

1. Desconte o preço primeiro.
2. Some a penalidade do prazo.
3. Ordene nomes e pontuações juntos.

## Solução

```visualg
algoritmo "Desafio0515A"
var
nome: vetor[1..3] de caractere
  pontuacao: vetor[1..3] de real
  i, j, prazo: inteiro
  preco, desconto, efetivo, troca: real
  nomeTroca: caractere
inicio
para i de 1 ate 3 faca
    escreva("Proposta ", i, ": ")
    leia(nome[i])
    escreva("Preço: ")
    leia(preco)
    escreva("Desconto percentual: ")
    leia(desconto)
    escreva("Prazo em dias: ")
    leia(prazo)
    se (preco < 0) ou (desconto < 0) ou (desconto > 100) ou (prazo < 0) entao
      pontuacao[i] <- -1
    senao
      efetivo <- preco * (1 - desconto / 100)
      pontuacao[i] <- efetivo + prazo * 5
    fimse
  fimpara
  para i de 1 ate 2 faca
    para j de i + 1 ate 3 faca
      se (pontuacao[i] < 0) ou ((pontuacao[j] >= 0) e (pontuacao[j] < pontuacao[i])) entao
        troca <- pontuacao[i]
        pontuacao[i] <- pontuacao[j]
        pontuacao[j] <- troca
        nomeTroca <- nome[i]
        nome[i] <- nome[j]
        nome[j] <- nomeTroca
      fimse
    fimpara
  fimpara
  para i de 1 ate 3 faca
    se pontuacao[i] >= 0 entao
      escreval(i, "º ", nome[i], ": pontuação ", pontuacao[i])
    fimse
  fimpara
fimalgoritmo
```

O peso de R$ 5 por dia explicita o compromisso entre custo e prazo.
