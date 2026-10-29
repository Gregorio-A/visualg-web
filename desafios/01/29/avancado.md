# Pacote de viagem

**Data:** 29 de janeiro · **Nível:** Avançado

## Objetivo

Compare pacotes com transporte, hospedagem e refeições, respeitando um teto de gastos.

Compare três pacotes de viagem incluindo transporte, hospedagem e refeições sem ultrapassar o orçamento.

## Como funciona

Leia o teto de gastos e os três componentes de cada pacote. Some os custos e escolha o pacote de menor total entre os que não excedem o teto.

### Palavras úteis

- **Índice:** É o número da posição de um item em uma lista.

## Exemplo de execução

```text
Teto: 500
Pacote A: 100 + 200 + 100 = 400
Pacote B: 150 + 300 + 100 = 550
Pacote C: 150 + 150 + 50 = 350
Escolhido: C — 350
```

Se nenhum pacote couber no teto, informe a ausência de opção. Igualdade com o teto é aceita.

## Dicas para resolução

1. Some todos os componentes antes de comparar.
2. Descarte valores acima do orçamento.
3. Guarde o índice do pacote elegível mais barato.

## Solução

```visualg
algoritmo "Desafio0129A"
var
nome: vetor[1..3] de caractere
  custo: vetor[1..3] de real
  transporte, hospedagem, refeicoes, teto: real
  i, melhor: inteiro
inicio
escreva("Orçamento máximo: ")
  leia(teto)
  melhor <- 0
  para i de 1 ate 3 faca
    escreva("Pacote ", i, ": ")
    leia(nome[i])
    escreva("Transporte: ")
    leia(transporte)
    escreva("Hospedagem: ")
    leia(hospedagem)
    escreva("Refeições: ")
    leia(refeicoes)
    custo[i] <- transporte + hospedagem + refeicoes
    se custo[i] <= teto entao
      se melhor = 0 entao
        melhor <- i
      senao
        se custo[i] < custo[melhor] entao
          melhor <- i
        fimse
      fimse
    fimse
  fimpara
  se melhor > 0 entao
    escreval("Pacote mais barato dentro do teto: ", nome[melhor], " — ", custo[melhor])
  senao
    escreval("Nenhum pacote cabe no orçamento.")
  fimse
fimalgoritmo
```

O índice `melhor` só recebe pacotes válidos e é atualizado quando um custo menor aparece.
